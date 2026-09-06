"use client";

import { Provider, useSelector } from "react-redux";
import { persistor, store } from "@lib/store";
import { PersistGate } from "redux-persist/integration/react";
import "./globals.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Script from "next/script";
import { RootState } from "@/lib/root.reducer";
import HelpCenter from "./components/Helpcenter/HelpCenter";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body
        suppressHydrationWarning={true}
        style={{ overflow: "auto", paddingRight: "0" }}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeWrapper>
              <ToastContainer />

              {children}
              <HelpCenter />
              <ScrollToTopButton />
            </ThemeWrapper>
          </PersistGate>
        </Provider>

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const mode = useSelector((state: RootState) => state.accessibility.theme);
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  // useEffect(() => {
  //   // re-initialize animations on static/dynamic toggle
  //   AOS.refreshHard(); // or AOS.init() depending on your AOS version
  // }, [isStatic]);

  return <>{children}</>;
}
