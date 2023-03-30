import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Meta from "@/components/Meta";

const theme = createTheme();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" position="top-right" autoClose={2000} draggable={false} closeOnClick />
      <CssBaseline />
      <Meta />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
