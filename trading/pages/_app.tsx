import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import CNavbar from 'react-bootstrap/Navbar';
import CContainer from 'react-bootstrap/Container'
import CNavbarBrand from 'react-bootstrap/NavbarBrand'


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp

