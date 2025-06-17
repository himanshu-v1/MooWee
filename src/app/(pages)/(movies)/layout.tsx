import Footer from "@/ui/footer/footer";
import Header from "@/ui/header/header";
import "./movies.scss";
// import styles from "./movies.module.scss";

export default function Layout({children}:{children:React.ReactNode}) {
    return (
        <>
            <Header />
            <div className={`landing page`}>
                {children}
            </div>
            <Footer />
        </>
    )
}