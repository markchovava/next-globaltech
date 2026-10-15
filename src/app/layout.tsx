import type { Metadata } from "next";
import { MontserratRegular } from "@/_assets/fonts/montserrat/_MontserratFont";
import "./globals.css";
import Footer from "@/_components/footers/Footer";
/* ToastContainer */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuoteModal from "@/_components/modals/QuoteModal";
import HeaderMain from "@/_components/headers/HeaderMain";
import { appInfoViewAction } from "./admin/_data/actions/AppInfoActions";
import { AppInfoData } from "@/_data/sample/AppinfoData";
import { serviceAllAction } from "./admin/_data/actions/ServiceActions";


export const metadata: Metadata = {
  title: AppInfoData.name,
  description: AppInfoData.intro,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [appData] = await Promise.all([
    appInfoViewAction()
  ])


  return (
    <html
      lang="en"
      className={`h-full antialiased`}>
      <body className={`${MontserratRegular.className} min-h-full flex flex-col text-gray-800`}>
        <HeaderMain appData={appData} />
        {children}

        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <QuoteModal />
      </body>
    </html>
  );
}
