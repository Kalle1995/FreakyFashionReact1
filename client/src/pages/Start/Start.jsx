import "./Start.css";
import Header from "../../Components/Header/Header";
import Main from "../../Components/Main/Main";
import Footer from "../../Components/Footer/Footer";
import { useEffect } from "react";

function Start() {
    useEffect(() => {
    document.title = "Freaky Fashion";
  }, []);
    return (
        <>  
        <Header />

        <Main />

        <Footer />
        </>
    );
}
export default Start;
