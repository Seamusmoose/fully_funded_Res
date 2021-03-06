import styles from "../Layout/Layout.module.css";
import Link from "next/link";
import Head from "next/head";
import NavBar from "../navBar/NavBar";
import Footer from "../Footer/Footer";

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Head></Head>
      <header>
        <title>Fully Funded Recidencies</title>
        <link rel="icon" href="/favicon.ico" />
      </header>
      <div className="page-content">
        <NavBar />
        {children}
        <Footer />
      </div>
    </div>
  );
}
