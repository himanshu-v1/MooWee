import Footer from "@/ui/footer/footer";
import Header from "@/ui/header/header";
import styles from "./movies.module.css";

export default function Layout({children}:{children:React.ReactNode}) {
    return (
        <>
            <Header />
            <div className={styles.page}>
                {children}
            </div>
            <Footer />
        </>
    )
}