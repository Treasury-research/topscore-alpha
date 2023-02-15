import React from "react";
import Image from "next/image";
import IconKnn3 from "../../statics/socials/knn3.svg";
import IconLenster from "../../statics/socials/lenster.svg";
import IconTwitter from "../../statics/socials/twitter.svg";
import IconDiscord from "../../statics/socials/discord.svg";

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

export default function Socials() {
  return (
    <div className="flex items-center justify-center pb-4">
      {list.map((item: any, index: number) => (
        <a href={item.link} target="_blank" key={index} className="hover:-translate-y-1 transition-all">
          <Image alt={item.link} src={item.icon} className="w-12" />
        </a>
      ))}
    </div>
  );
}
