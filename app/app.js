"use client";
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
import { persistor, store } from "@/store/index";
import "../styles/Loading.css";
import "../styles/spinner.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import { useEffect, useState, Suspense } from "react";
import i18n from "../i18n";
import {useRouter, usePathname, useSearchParams, useParams} from 'next/navigation'
import "react-toastify/dist/ReactToastify.css";
import { Inter } from 'next/font/google'
import Register from "./_register";
import {I18nextProvider} from "react-i18next";
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";

import { PersistGate } from "redux-persist/integration/react";
const inter = Inter({ subsets: ['latin'] })



export default function App({children}) {
    const [sitting, setSitting] = useState(null);
    useEffect(() => {
        const sitting = JSON.parse(localStorage.getItem("SITTING"));
        if (sitting) {
            setSitting(sitting?.sitting);
        } else {
            store.dispatch({ type: "SETTING" });
        }

        const unsubscribe = store.subscribe(() => {
            const updatedSitting = JSON.parse(localStorage.getItem("SITTING"));
            if (updatedSitting) {
                setSitting(updatedSitting?.sitting);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const router = useRouter();
    useEffect(() => {
        const language = i18n.language;
        // console.log(language, "language");
        const savedLanguage = localStorage.getItem("language");
        if (language && language !== savedLanguage) {
            localStorage.setItem("language", language);
            i18n.changeLanguage(language);
            router.refresh();
        }
    }, [router]);

    const defaultTitle = "Welcome To Clearance";


    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Register />
                <I18nextProvider i18n={i18n}>
                    {children}
                    <ToastContainer />
                </I18nextProvider>
            </PersistGate>
        </Provider>
    )
}
