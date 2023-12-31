import "@/styles/globals.css";
import "@/styles/login.css";
import "@/styles/mobile.css";
import "@/styles/flashsale.css";
import "@/styles/login-mobile.css";
import "rc-slider/assets/index.css";
import "@/styles/card.css";
import "@/styles/root.css";
import "@/styles/payment.css";
import "@/styles/about-us.css";
import "@/styles/product-details.css";
import "swiper/swiper-bundle.css";
import "swiper/css/autoplay";
import "swiper/swiper.min.css";
import "swiper/css/pagination";
import "../styles/Loading.css";
import "../styles/spinner.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from 'next/font/google'
import App from "./app.js";
import {Provider} from "react-redux";
import Register from "./_register";
import {Suspense} from "react";
import Loading from "./loading";
import {ToastContainer} from "react-toastify";
import store, {persistor} from "../store";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Welcome TO Clearance',
  description: 'Generated by create next app',
    icons: {
        icon: "https://www.clearance.ae/storage/company/2022-04-24-62659f15aff38.png",
    }
}

export default function RootLayout({ Component, children  }) {

  return (
      <html>
      <body>
      <App >
      <Suspense fallback={<Loading/>}>
              {children}
            </Suspense></App>
      </body>
    </html>
  )
}
