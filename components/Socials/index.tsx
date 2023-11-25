import React from "react";
import Image from "next/image";

import IconKnn3 from "../../statics/socials/knn3.svg";
import IconLenster from "../../statics/socials/lenster.png";
import IconTwitter from "../../statics/socials/twitter.svg";
import IconDiscord from "../../statics/socials/discord.svg";

import IconLightKnn3 from "../../statics/socials/knn3-light.svg";
import IconLightLenster from "../../statics/socials/lenster-light.png";
import IconLightTwitter from "../../statics/socials/twitter-light.svg";
import IconLightDiscord from "../../statics/socials/discord-light.svg";

import {
  themeState
} from "../../store/state";
import { useRecoilState } from "recoil";

import trace from "../../api/trace";

const list = [
  {
    link: "https://www.knn3.xyz/",
  },
  {
    link: "https://lenster.xyz/u/knn3_network",
  },
  {
    link: "https://twitter.com/Knn3Network",
  },
  {
    link: "https://discord.com/invite/UKzFVpHk4J",
  },
];

const traceSocial = ['KNN3-Homepage','KNN3-Lenster','KNN3-Twitter','KNN3-Discord']

const lightIcons = [IconLightKnn3,IconLightLenster,IconLightTwitter,IconLightDiscord]

const darkIcons = [IconKnn3,IconLenster,IconTwitter,IconDiscord]

export default function Socials() {
  const [theme, setTheme] = useRecoilState(themeState);

  const toLink = (href:any,i) => {
    window.open(`${href}`, '_blank')
    trace(traceSocial[i])
  }

  return (
    <div className="flex items-center justify-center pb-4">
      {list.map((item: any, index: number) => (
        <a onClick={() => toLink(item.link,index)} key={index} className={`hover:-translate-y-1 transition-all rounded-[50%] cursor-pointer ${index == 3 ? 'scale-110' : ''}`}>
          <Image alt={item.link} src={theme === 'light' ? lightIcons[index] : darkIcons[index]} className={`${index == 1 ? 'w-6 h-6' : 'w-8 h-8'} mr-2`} />
        </a>
      ))}
    </div>
  );
}
