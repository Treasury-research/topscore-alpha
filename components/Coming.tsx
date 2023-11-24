import Logo from "../statics/coming/logo.png";
import LogoSquare from "../statics/coming/logo-square.png";
import Image from "next/image";
import Socials from "./Socials";

export default function Coming() {
  return (
    <div className="py-4 px-3 text-white bg-black absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center">
      <Image
        alt="logo"
        src={Logo}
        width={180}
        height={40}
        className="absolute top-4 left-4"
      />

      <div className="m-auto text-center">
        <Image
          alt="logo"
          src={LogoSquare}
          width={80}
          height={80}
          className="mb-5 mx-auto"
        />
        <div className="mb-4 text-4xl font-bold">We'll be back</div>
        <div className=" text-2xl mb-8">
          We are performing scheduled maintance
          <br />
          Please check back soon
        </div>
        <Socials />
      </div>
    </div>
  );
}
