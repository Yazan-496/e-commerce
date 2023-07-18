import React from "react";

const HTMLRenderer = ({ htmlContent }) => {
  return (
    <div
      className="overflow-y-scroll max-h-[300px]"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default HTMLRenderer;
