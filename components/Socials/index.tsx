import React from "react";
import Image from "next/image";
import IconKnn3 from "../../statics/socials/knn3.svg";
import IconLenster from "../../statics/socials/lenster.svg";
import IconTwitter from "../../statics/socials/twitter.svg";
import IconDiscord from "../../statics/socials/discord.svg";
import trace from "../../api/trace";

const list = [
  {
    icon: IconKnn3,
    link: "https://www.knn3.xyz/",
  },
  {
    icon: IconLenster,
    link: "https://lenster.xyz/u/knn3_network",
  },
  {
    icon: IconTwitter,
    link: "https://twitter.com/Knn3Network",
  },
  {
    icon: IconDiscord,
    link: "https://discord.com/invite/UKzFVpHk4J",
  },
];

const traceSocial = ['KNN3-Homepage','KNN3-Lenster','KNN3-Twitter','KNN3-Discord']

export default function Socials() {

  const toLink = (href:any,i) => {
    window.open(`${href}`, '_blank')
    trace(traceSocial[i])
  }

  return (
    <div className="flex items-center justify-center pb-4">
      {list.map((item: any, index: number) => (
        <a onClick={() => toLink(item.link,index)} key={index} className="hover:-translate-y-1 transition-all">
          <Image alt={item.link} src={item.icon} className="w-12" />
        </a>
      ))}
    </div>
  );
}
