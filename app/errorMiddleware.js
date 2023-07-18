import UAParser from "ua-parser-js";

const errorMiddleware = async (err, req, res, next) => {
  const UserAgent =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("ally-supports-cache"))?.userAgent
      : "";
  const time =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("ally-supports-cache"))?.time
      : "";
  const userAgentString = UserAgent;
  const parser = new UAParser();
  const result = parser.setUA(userAgentString).getResult();
  const deviceType = result.device.type;
  try {
    const errorEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL_1}api/v10/mobile_error_log/store`;

    const errorData = {
      message: err.message,
      stack: err.stack,
      filename: err.filename,
      lineno: err.lineno,
      timeStamp: time,
      deviceType: deviceType,
      userAgent: UserAgent,
    };
    console.log(err, "errorData");
    await fetch(errorEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(errorData),
    });
  } catch (error) {
    console.error("حدث خطأ أثناء إرسال الخطأ إلى الخلفية", error);
  }

  next(err);
};

export default errorMiddleware;
