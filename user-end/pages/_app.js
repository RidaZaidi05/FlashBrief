import "@/styles/globals.css";
import { UserProvider } from "@/store/context";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router =  useRouter();
  const isLogin = router.pathname === '/';
  return( 
    <UserProvider>
      {/* {!isLogin && <Navbar />} */}
      <Component {...pageProps} />
    </UserProvider>
  );
}