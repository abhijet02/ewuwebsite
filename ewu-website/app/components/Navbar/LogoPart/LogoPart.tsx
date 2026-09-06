"use client";

import Link from "next/link";
import "./LogoPart.scss";
import Image from "next/image";
import logoLight from "@/app/assets/logo-light.png";
import logoBrand from "@/app/assets/mobile-logo-dark.png";


const LogoPart: React.FC = () => {
  return (
    <div className="logo-part">
      <div className="logo-img">
        <Image
          src={logoLight}
          width={300}
          height={200}
          className="logo logo-bg"
          alt="EWU Logo Wrapper"
        />
        <div className="logo-img-inside">
          <Link href="/pages/landing-page">
            <Image
              src={logoBrand}
              width={300}
              height={200}
              className="logo"
              alt="EWU Logo"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogoPart;
