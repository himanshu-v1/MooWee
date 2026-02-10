import Image from "next/image";
import logo from "@public/logo.svg";
import logo2 from "@public/logo2.svg";
import "./footer.scss";

export default function Footer() {
  const mailbody = {
    email: 'himanshu.st6@gmail.com',
    subject: 'Regarding MooWee',
    body: 'Hello MooWee Team,\n\nI would like to get in touch with you regarding...'
  }

  return (
    <div className="footer">
      <div className="logo-wrapper">
        <Image className="logo-main" width={108} height={60} src={logo} alt="Logo" />
        <Image className="logo-text" width={58} height={30} src={logo2} alt="Logo" />
      </div>
      <h1>
        <a href={`mailto:${mailbody.email}?subject=${encodeURIComponent(mailbody.subject)}&body=${encodeURIComponent(mailbody.body)}`}>
          {'< MooWee >'}<sup>&copy;</sup>{' Inc.'}
        </a>
      </h1>
    </div>
  );
}