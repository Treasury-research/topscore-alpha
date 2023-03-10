import React, { useState, useEffect } from "react";
import api from "../../api";
import log from "../../lib/log";
import Image from 'next/image'
import Mastermind from "../../statics/img/dark-character/Mastermind.png";
import Pioneer from "../../statics/img/dark-character/Pioneer.png";
import Artist from "../../statics/img/dark-character/Artist.png";
import Conductor from "../../statics/img/dark-character/Conductor.png";
import Actor from "../../statics/img/dark-character/Actor.png";
import Antiquer from "../../statics/img/dark-character/Antiquer.png";
import Spy from "../../statics/img/dark-character/Spy.png";
import Magician from "../../statics/img/dark-character/Magician.png";
import Healer from "../../statics/img/dark-character/Healer.png";
import Volcanologist from "../../statics/img/dark-character/Volcanologist.png";
import Photographer from "../../statics/img/dark-character/Photographer.png";
import Designer from "../../statics/img/dark-character/Designer.png";
import Architect from "../../statics/img/dark-character/Architect.png";
import Engineer from "../../statics/img/dark-character/Engineer.png";
import Promotor from "../../statics/img/dark-character/Promotor.png";
import Supervisor from "../../statics/img/dark-character/Supervisor.png";
import Mobilizer from "../../statics/img/dark-character/Mobilizer.png";
import Counselor from "../../statics/img/dark-character/Counselor.png";
import Musician from "../../statics/img/dark-character/Musician.png";
import Motivator from "../../statics/img/dark-character/Motivator.png";
import Demonstrator from "../../statics/img/dark-character/Demonstrator.png";

import MastermindP from "../../statics/img/character-noShare/Mastermind.png";
import PioneerP from "../../statics/img/character-noShare/Pioneer.png";
import ArtistP from "../../statics/img/character-noShare/Artist.png";
import ConductorP from "../../statics/img/character-noShare/Conductor.png";
import ActorP from "../../statics/img/character-noShare/Actor.png";
import AntiquerP from "../../statics/img/character-noShare/Antiquer.png";
import SpyP from "../../statics/img/character-noShare/SPY.png";
import MagicianP from "../../statics/img/character-noShare/Magician.png";
import HealerP from "../../statics/img/character-noShare/Healer.png";
import VolcanologistP from "../../statics/img/character-noShare/Volcanologist.png";
import PhotographerP from "../../statics/img/character-noShare/Photographer.png";
import DesignerP from "../../statics/img/character-noShare/Designer.png";
import ArchitectP from "../../statics/img/character-noShare/Architect.png";
import EngineerP from "../../statics/img/character-noShare/Engineer.png";
import PromotorP from "../../statics/img/character-noShare/Promotor.png";
import SupervisorP from "../../statics/img/character-noShare/Supervisor.png";
import MobilizerP from "../../statics/img/character-noShare/Mobilizer.png";
import CounselorP from "../../statics/img/character-noShare/Counselor.png";
import MusicianP from "../../statics/img/character-noShare/Musician.png";
import MotivatorP from "../../statics/img/character-noShare/Motivator.png";
import DemonstratorP from "../../statics/img/character-noShare/Demonstrator.png";

import IconTwiter from "../../statics/img/share-twiter.png";
import IconLenster from "../../statics/img/share-lenst.png";
import { TwitterOutlined } from "@ant-design/icons";
import useWeb3Context from "../../hooks/useWeb3Context";
import BN from "bignumber.js";

const haveSharePic = {
    Mastermind: Mastermind,
    Pioneer: Pioneer,
    Artist: Artist,
    Conductor: Conductor,
    Actor: Actor,
    Antiquer: Antiquer,
    Spy: Spy,
    Magician: Magician,
    Healer: Healer,
    Volcanologist: Volcanologist,
    Photographer: Photographer,
    Designer: Designer,
    Architect: Architect,
    Engineer: Engineer,
    Promotor: Promotor,
    Supervisor: Supervisor,
    Mobilizer: Mobilizer,
    Counselor: Counselor,
    Musician: Musician,
    Motivator: Motivator,
    Demonstrator: Demonstrator,
    NoImg:''
}

const noSharePic:any = {
    Mastermind: MastermindP,
    Pioneer: PioneerP,
    Artist: ArtistP,
    Conductor: ConductorP,
    Actor: ActorP,
    Antiquer: AntiquerP,
    Spy: SpyP,
    Magician: MagicianP,
    Healer: HealerP,
    Volcanologist: VolcanologistP,
    Photographer: PhotographerP,
    Designer: DesignerP,
    Architect: ArchitectP,
    Engineer: EngineerP,
    Promotor: PromotorP,
    Supervisor: SupervisorP,
    Mobilizer: MobilizerP,
    Counselor: CounselorP,
    Musician: MusicianP,
    Motivator: MotivatorP,
    Demonstrator: DemonstratorP,
    NoImg:''
}

const Character = (props: any) => {

    const { account } = useWeb3Context();

    const { activeProfile, activeAddress } = props

    const [imgUrl, setImgUrl] = useState<any>("");

    const [userInfo, setUserInfo] = useState<any>("");

    const [showShareBtn, setShowShareBtn] = useState(true);

    const [showPic, setShowPic] = useState(false);

    const getRadar = async (profileId: string) => {
        const res: any = await api.get(`/lens/scores/${profileId}`);
        if(!res || !res.data) return false;
        let arr = [
            { type: 'influReda', score: res.data.influReda * 1.05 },
            { type: 'campaignReda', score: res.data.campaignReda * 1.09 },
            { type: 'engagementReda', score: res.data.engagementReda * 1.07 },
            { type: 'collectReda', score: res.data.collectReda * 1.06 },
            { type: 'creationReda', score: res.data.creationReda * 1.08 },
            { type: 'curationReda', score: res.data.curationReda * 1.1 },
        ];
        arr.sort((a: any, b: any) => { return b.score - a.score })
        const str = getImg(arr);
        if (profileId === '101548') {
            setImgUrl(noSharePic[str || 'NoImg'])
        } else {
            setImgUrl(haveSharePic[str || 'NoImg'])
        }
        setTimeout(() => {
            setShowPic(true)
        },500)
    };

    const getIndicators = async (profileId: string) => {
        const res: any = await api.get(`/lens/indicators/${profileId}`);
        if(res && res.data){
            setUserInfo((prev: any) => ({
                ...prev,
                ...res.data,
            }));
        }
    };

    const getPublication = async (profileId: string) => {
        const res: any = await api.get(`/lens/publication/${profileId}`);
        if(res && res.data){
            setUserInfo((prev: any) => ({
                ...prev,
                ...res.data,
            }));
        }
    };

    useEffect(() => {
        if (activeProfile && activeProfile.profileId) {
            getRadar(activeProfile.profileId);
            getIndicators(activeProfile.profileId);
            //getPublication(activeProfile.profileId);
            setShowShareBtn(true);
        } else {
            getRadar('101548');
            getIndicators('101548');
            // getPublication('101548');
            setShowShareBtn(false);
        }
    }, [activeProfile]);

    const shareUrl = `https://topscore.knn3.xyz/nft/${activeAddress}?profileId=${activeProfile && activeProfile.profileId ? activeProfile.profileId : ''}`

    const getImg = (arr: any) => {
        if (arr[0].score - arr[1].score > 1.6) {
            switch (arr[0].type) {
                case 'curationReda': //??????
                    return 'Mastermind';
                case 'campaignReda': //??????
                    return 'Pioneer';
                case 'creationReda': //??????
                    return 'Artist';
                case 'influReda': // ??????
                    return 'Conductor';
                case 'engagementReda': // ??????
                    return 'Actor';
                case 'collectReda': //??????
                    return 'Antiquer';
            }
        } else {
            if (
                (arr[0].type === 'collectReda' && arr[1].type === 'curationReda') ||
                (arr[0].type === 'curationReda' && arr[1].type === 'collectReda')
            ) {
                return 'Spy';
            }
            if (
                (arr[0].type === 'creationReda' && arr[1].type === 'curationReda') ||
                (arr[0].type === 'curationReda' && arr[1].type === 'creationReda')
            ) {
                return 'Magician';
            }
            if (
                (arr[0].type === 'creationReda' && arr[1].type === 'collectReda') ||
                (arr[0].type === 'collectReda' && arr[1].type === 'creationReda')
            ) {
                return 'Healer';
            }
            if (
                (arr[0].type === 'engagementReda' && arr[1].type === 'curationReda') ||
                (arr[0].type === 'curationReda' && arr[1].type === 'engagementReda')
            ) {
                return 'Volcanologist';
            }
            if (
                (arr[0].type === 'engagementReda' && arr[1].type === 'collectReda') ||
                (arr[0].type === 'collectReda' && arr[1].type === 'engagementReda')
            ) {
                return 'Photographer';
            }
            if (
                (arr[0].type === 'engagementReda' && arr[1].type === 'creationReda') ||
                (arr[0].type === 'creationReda' && arr[1].type === 'engagementReda')
            ) {
                return 'Designer';
            }
            if (
                (arr[0].type === 'campaignReda' && arr[1].type === 'curationReda') ||
                (arr[0].type === 'curationReda' && arr[1].type === 'campaignReda')
            ) {
                return 'Architect';
            }
            if (
                (arr[0].type === 'campaignReda' && arr[1].type === 'collectReda') ||
                (arr[0].type === 'collectReda' && arr[1].type === 'campaignReda')
            ) {
                return 'Engineer';
            }
            if (
                (arr[0].type === 'campaignReda' && arr[1].type === 'creationReda') ||
                (arr[0].type === 'creationReda' && arr[1].type === 'campaignReda')
            ) {
                return 'Promotor';
            }
            if (
                (arr[0].type === 'campaignReda' && arr[1].type === 'engagementReda') ||
                (arr[0].type === 'engagementReda' && arr[1].type === 'campaignReda')
            ) {
                return 'Supervisor';
            }
            if (
                (arr[0].type === 'influReda' && arr[1].type === 'curationReda') ||
                (arr[0].type === 'curationReda' && arr[1].type === 'influReda')
            ) {
                return 'Mobilizer';
            }
            if (
                (arr[0].type === 'influReda' && arr[1].type === 'collectReda') ||
                (arr[0].type === 'collectReda' && arr[1].type === 'influReda')
            ) {
                return 'Counselor';
            }
            if (
                (arr[0].type === 'influReda' && arr[1].type === 'creationReda') ||
                (arr[0].type === 'creationReda' && arr[1].type === 'influReda')
            ) {
                return 'Musician';
            }
            if (
                (arr[0].type === 'influReda' && arr[1].type === 'campaignReda') ||
                (arr[0].type === 'campaignReda' && arr[1].type === 'influReda')
            ) {
                return 'Motivator';
            }
            if (
                (arr[0].type === 'influReda' && arr[1].type === 'engagementReda') ||
                (arr[0].type === 'engagementReda' && arr[1].type === 'influReda')
            ) {
                return 'Demonstrator';
            }
        }
    }

    const LensterShareButton = ({ title, url, hashtags, children }: any) => {
        return (
            <a
                target="_blank"
                onClick={() => log('share_lenster', account)}
                rel="noreferrer"
                href={`https://lenster.xyz/?text=${encodeURIComponent(title)}&url=${url}&hashtags=${hashtags}&preview=true`}
            >
                {children}
            </a>
        );
    };

    const TwitterShareButton2 = ({ title, hashtags, children }: any) => {
        return (
            <a
                target="_blank"
                onClick={() => log('share_twitter', account)}
                rel="noreferrer"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&hashtags=${hashtags}&preview=true`}
            >
                {children}
            </a>
        );
    };

    return (
        <div className="char-pic-default">
            {
                activeAddress && imgUrl &&
                <div className="h-[800px]">
                    <Image src={imgUrl} alt="" className={`${showPic ? '' : 'hidden'}`}/>
                    <div className={`character-rank text-[30px] ${showPic ? '' : 'hidden'}`}>{userInfo.rank}</div>
                    <div className={`character-lens text-[30px] ${showPic ? '' : 'hidden'}`}>{activeProfile && activeProfile.handle ? activeProfile.handle : 'knn3_network.lens'}</div>
                    <div className={`character-score text-[30px] ${showPic ? '' : 'hidden'}`}>{new BN(userInfo.score).toFixed(2)}</div>
                    {
                        showShareBtn && activeAddress ?
                            (<div className={`char-share-btnGroup ${showPic ? '' : 'hidden'}`}>
                                <div>
                                    <LensterShareButton
                                        title={`???? Unlock your web3 social presence with #TopScore! Stand out from the crowd & explore your self-building potential! ???????@knn3_network #Lens`}
                                        url={shareUrl}
                                        hashtags="KNN3Network #Lens"
                                    >
                                        <Image src={IconLenster} alt="" />
                                    </LensterShareButton>
                                </div>
                                <div>
                                    <TwitterShareButton2
                                        // url={shareUrl}
                                        hashtags={["KNN3Network #Lens"]}
                                        title={`???? Unlock your web3 social presence with #TopScore! Stand out from the crowd & explore your self-building potential! ???????${shareUrl} @Knn3Network #Lens`}
                                    >
                                        <Image src={IconTwiter} alt="" />
                                    </TwitterShareButton2>
                                </div>
                            </div>) :
                            (
                                <></>
                            )
                    }
                </div>
            }
        </div>
    );
};

export default Character;
