'use client';
import Image from "next/image";
import Button from "../button/button";
import Nav from "../nav/nav";
import logo from "@public/logo.svg";
import logo2 from "@public/logo2.svg";
import "./header.scss";

export default function Header() {

  const handleClick = () => {
    console.log("Redirect to login page!");
  }

  return (
    <div className="header">
      <section tabIndex={0} className="logo" onClick={() => {window.location.href = "/";}}>
        <Image className="logo-main" width={58} height={30} src={logo} alt="Logo" />
        <Image className="logo-text" width={58} height={30} src={logo2} alt="Logo" />
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