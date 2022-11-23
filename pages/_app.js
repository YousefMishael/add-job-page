import "../styles/globals.css";
import GlobalContext from "../components/GlobalContext/GlobalContext";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContext>
      <Component {...pageProps} />
    </GlobalContext>
  );
}

export default MyApp;
