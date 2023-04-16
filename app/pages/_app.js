import "@/styles/globals.css";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css';

export default function App({ Component, pageProps }) {
  return (
    <I18nextProvider i18n={i18n}>
      <Component {...pageProps} />
      <ToastContainer />
    </I18nextProvider>
  );
}
