import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/main.scss";
import "../node_modules/react-credit-cards/es/styles-compiled.css"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {Provider} from "react-redux";
import store from "../store";
import SimpleBottomNavigation from "../components/mobilenav"
import { useRouter } from 'next/router';
import {useState,useEffect} from "react"
import loaders from "../components/loader"
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
      const handleStart = () => { setPageLoading(true); };
      const handleComplete = () => { setPageLoading(false); };
  
      router.events.on('routeChangeStart', handleStart);
      router.events.on('routeChangeComplete', handleComplete);
      router.events.on('routeChangeError', handleComplete);
    }, [router]);
    console.log(pageLoading)
  return (
    <>
    <Provider store={store}>
    {pageLoading&&<div className="loaders"><div class="spinner-border spinner-border-lg"  role="status"></div></div>}
      <Navbar/>
      <Component {...pageProps} />
      <Footer />
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
        crossOrigin="anonymous"
      ></script>
      <div className="mobile-nav">
        <div className="fixed-bottom">
     <SimpleBottomNavigation/>
     </div>
      </div>
      </Provider>
    </>
  );
}

export default MyApp;
