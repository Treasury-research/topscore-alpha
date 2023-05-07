import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const themeState = atom({
  key: "theme",
  default: 'dark'
});

export const currentProfileState = atom({
  key: "currentProfile",
  default: {
    address: '',
    handle: '',
    imageURI: '',
    metadata: '',
    profileId: '',
    name: '',
  },
  // effects_UNSTABLE: [persistAtom],
});

export const currentLoginProfileState = atom({
  key: "currentLoginProfile",
  default: {
    address: "",
    handle: "",
    imageURI: "",
    metadata: "",
    profileId: "",
  },
  // effects_UNSTABLE: [persistAtom],
});

export const loadingProfileListState = atom({
  key: "loadingProfileList",
  default: false
});

export const profileListState = atom({
  key: "profileList",
  default: [],
});

export const commendProfileListState = atom({
  key: "commendProfileList",
  default: [],
});

export const routerHandleState = atom({
  key: "loadingRouterHandle",
  default: false,
});

export const knn3TokenValidState = atom({
  key: "knn3TokenValid",
  default: false,
});

export const autoConnectState = atom({
  key: "autoConnect",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const isHaveNftState = atom({
  key: "isHaveNft",
  default: false
});

export const isHaveLensNftState = atom({
  key: "isHaveLensNft",
  default: false
});

export const topRecentState = atom({
  key: "topRecent",
  default: false
});

export const postSwitchState = atom({
  key: "postSwitch",
  default: false
});

