import React, { useState, useEffect } from "react";
import api from "../../api";
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
import IconLenster from "../../statics/img/g5.svg";
import { TwitterOutlined } from "@ant-design/icons";
import useWeb3Context from "../../hooks/useWeb3Context";
import { useRouter } from "next/router";
import { useRecoilState } from 'recoil';
import { currenProfile } from '../../store/state'
import BN from "bignumber.js";

const background = {
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
}



const Character = (props: any) => {

    const [imgUrl, setImgUrl] = useState<any>("");

    const [userInfo, setUserInfo] = useState<any>("");

    const { account } = useWeb3Context();

    const [isSelf, setIsSelf] = useState<boolean>(false);

    const router = useRouter();

    const { address, queryProfileId } = router.query;

    const [currenProfileBase, setCurrenProfileBase] = useRecoilState<any>(currenProfile);

    const getRadar = async () => {
        console.log(props.profileId)
        const res: any = await api.get(`/lens/scores/${props.profileId}`);
        console.log(res)
        let arr = [
            { type: 'influReda', score: res.data.influReda * 1.05 },
            { type: 'campaignReda', score: res.data.campaignReda * 1.09 },
            { type: 'engagementReda', score: res.data.engagementReda * 1.07 },
            { type: 'collectReda', score: res.data.collectReda * 1.06 },
            { type: 'creationReda', score: res.data.creationReda * 1.08 },
            { type: 'curationReda', score: res.data.curationReda * 1.1 },
        ];
        arr.sort((a: any, b: any) => { return b.score - a.score })
        const img = getImg(arr);
        setImgUrl(img)
    };

    const getIndicators = async () => {
        const res: any = await api.get(`/lens/indicators/${currenProfileBase.profileId}`);
        setUserInfo((prev: any) => ({
            ...prev,
            ...res.data,
        }));
    };

    useEffect(() => {
        if (currenProfileBase.profileId) {
            getRadar();
            getIndicators();
        }
    }, [currenProfileBase]);

    useEffect(() => {
        if (!address || !account) {
            return;
        }

        setIsSelf(address === account);
    }, [address, account]);

    const shareUrl = `https://topscore.staging.knn3.xyz/user/${account}?queryProfileId=${currenProfileBase.profileId}`

    const getImg = (arr: any) => {
        if (arr[0].score - arr[1].score > 1.6) {
            switch (arr[0].type) {
                case 'curationReda': //灰色
                    return background['Mastermind'];
                case 'campaignReda': //蓝色
                    return background['Pioneer'];
                case 'creationReda': //紫色
                    return background['Artist'];
                case 'influReda': // 红色
                    return background['Conductor'];
                case 'engagementReda': // 橘色
                    return background['Actor'];
                case 'collectReda': //绿色
                    return background['Antiquer'];
            }
        } else {
            if (
                (arr[0].type === 'collectReda' && arr[1].type === 'curationReda') ||
                (arr[0].type === 'curationReda' && arr[1].type === 'collectReda')
            ) {
                return background['Spy'];
            }
            if (
                (arr[0].type === 'creationReda' && arr[1].type === 'curationReda') ||
                (arr[0].type === 'curationReda' && arr[1].type === 'creationReda')
            ) {
                return background['Magician'];
            }
            if (
                (arr[0].type === 'creationReda' && arr[1].type === 'collectReda') ||
                (arr[0].type === 'collectReda' && arr[1].type === 'creationReda')
            ) {
                return background['Healer'];
            }
            if (
                (arr[0].type === 'engagementReda' && arr[1].type === 'curationReda') ||
                (arr[0].type === 'curationReda' && arr[1].type === 'engagementReda')
            ) {
                return background['Volcanologist'];
            }
            if (
                (arr[0].type === 'engagementReda' && arr[1].type === 'collectReda') ||
                (arr[0].type === 'collectReda' && arr[1].type === 'engagementReda')
            ) {
                return background['Photographer'];
            }
            if (
                (arr[0].type === 'engagementReda' && arr[1].type === 'creationReda') ||
                (arr[0].type === 'creationReda' && arr[1].type === 'engagementReda')
            ) {
                return background['Designer'];
            }
            if (
                (arr[0].type === 'campaignReda' && arr[1].type === 'curationReda') ||
                (arr[0].type === 'curationReda' && arr[1].type === 'campaignReda')
            ) {
                return background['Architect'];
            }
            if (
                (arr[0].type === 'campaignReda' && arr[1].type === 'collectReda') ||
                (arr[0].type === 'collectReda' && arr[1].type === 'campaignReda')
            ) {
                return background['Engineer'];
            }
            if (
                (arr[0].type === 'campaignReda' && arr[1].type === 'creationReda') ||
                (arr[0].type === 'creationReda' && arr[1].type === 'campaignReda')
            ) {
                return background['Promotor'];
            }
            if (
                (arr[0].type === 'campaignReda' && arr[1].type === 'engagementReda') ||
                (arr[0].type === 'engagementReda' && arr[1].type === 'campaignReda')
            ) {
                return background['Supervisor'];
            }
            if (
                (arr[0].type === 'influReda' && arr[1].type === 'curationReda') ||
                (arr[0].type === 'curationReda' && arr[1].type === 'influReda')
            ) {
                return background['Mobilizer'];
            }
            if (
                (arr[0].type === 'influReda' && arr[1].type === 'collectReda') ||
                (arr[0].type === 'collectReda' && arr[1].type === 'influReda')
            ) {
                return background['Counselor'];
            }
            if (
                (arr[0].type === 'influReda' && arr[1].type === 'creationReda') ||
                (arr[0].type === 'creationReda' && arr[1].type === 'influReda')
            ) {
                return background['Musician'];
            }
            if (
                (arr[0].type === 'influReda' && arr[1].type === 'campaignReda') ||
                (arr[0].type === 'campaignReda' && arr[1].type === 'influReda')
            ) {
                return background['Motivator'];
            }
            if (
                (arr[0].type === 'influReda' && arr[1].type === 'engagementReda') ||
                (arr[0].type === 'engagementReda' && arr[1].type === 'influReda')
            ) {
                return background['Demonstrator'];
            }
        }
    }

    const LensterShareButton = ({ title, url, hashtags, children }: any) => {
        return (
            <a
                target="_blank"
                rel="noreferrer"
                href={`https://lenster.xyz/?text=${encodeURIComponent(title)}&url=${url}&hashtags=${hashtags}&preview=true`}
            >
                {children}
            </a>
        );
    };

    const TwitterShareButton2 = ({ title, url, hashtags, children }: any) => {
        return (
            <a
                target="_blank"
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
                imgUrl &&
                <>
                    <Image src={imgUrl} alt=""/>
                    <div className="character-rank">{currenProfileBase.rank}</div>
                    <div className="character-lens">{currenProfileBase.handle}</div>
                    <div className="character-score">{new BN(currenProfileBase.score).toFixed(2)}</div>
                    {
                        isSelf && account ?
                            (<div className="char-share-btnGroup">
                                <div>
                                    <LensterShareButton
                                        title={`🔥 Unlock your web3 social presence with #TopScore! Stand out from the crowd & explore your self-building potential! 🔗：@KNN3Network #Lens`}
                                        url={`https://topscore.knn3.xyz/user/${account}/${currenProfileBase.profileId}`}
                                        hashtags="@knn3_network #Lens"
                                    >
                                        <Image src={IconLenster} alt="" />
                                    </LensterShareButton>
                                </div>
                                <div>
                                    <TwitterShareButton2
                                        url={shareUrl}
                                        hashtags={["@KNN3Network #Lens"]}
                                        title={`🔥 Unlock your web3 social presence with #TopScore! Stand out from the crowd & explore your self-building potential! 🔗：@knn3_network #Lens`}
                                    >
                                        <TwitterOutlined className="twitter-icon" />
                                    </TwitterShareButton2>
                                </div>
                            </div>) :
                            (
                                <div className="clear-btn-group"></div>
                            )
                    }
                </>
            }

        </div>
    );
};

export default Character;
