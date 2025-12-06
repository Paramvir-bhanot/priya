import Navbar from "../components/UI/navbar";
import Footer from "../components/UI/footer";

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
