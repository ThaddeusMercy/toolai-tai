import { useEffect } from 'react';
import '../styles/globals.css'
import { ThemeProvider } from "next-themes";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from 'next/script';
import ContextProvider from '../context';

// <!-- Google tag (gtag.js) -->
{/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q0SZQE7CST"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Q0SZQE7CST');
</script> */}

export default function App({ Component, pageProps }) {
    useEffect(() => {
      AOS.init();
      AOS.refresh();
    }, []);
   return (
     <ContextProvider cookies={null}>
       <ThemeProvider enableSystem={false} attribute="class">
         <Component {...pageProps} />
         <ToastContainer
           position="top-right"
           autoClose={8000}
           hideProgressBar={false}
           newestOnTop={false}
           draggable={false}
           pauseOnVisibilityChange
           closeOnClick
           pauseOnHover
         />
         <Script
           id="google"
           src={`https://www.googletagmanager.com/gtag/js?id=G-${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
           type="text/javascript"
           strategy="lazyOnload"
         />
         <Script strategy="lazyOnload" id="googler">
           {` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config','G-W6FXH2Z651' );`}
         </Script>
       </ThemeProvider>
     </ContextProvider>
   );
}
