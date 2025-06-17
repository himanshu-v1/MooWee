import Image from "next/image";
import Button from "../button/button";
import "./header.scss";
import Nav from "../nav/nav";

export default function Header() {
  const handleClick = () => {
    console.log("Redirect to login page!");
  }

  return (
    <div className="header">
      <section className="logo">
        <Image width={58} height={30} src="/images/logo.png" alt="Logo" />
      </section>
      <section className="nav">
        <Nav />
      </section>
      <section className="login">
        <Button type="secondary" onClick={handleClick} isSmall isTransition>
          <div>
            <i className="fa-solid fa-right-to-bracket"></i>
          </div>
          <div>Sign In</div>
        </Button>
      </section>
    </div>
  );
}