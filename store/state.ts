import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import initHandle from './../config/initHandle'
const { persistAtom } = recoilPersist();

export const currentProfileState = atom({
  key: "currentProfile",
  default: {
    address: initHandle.address,
    handle: initHandle.handle,
    imageURI: initHandle.imageURI,
    metadata: initHandle.metadata,
    profileId: initHandle.profileId,
    name: initHandle.name,
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

export const profileListState = atom({
  key: "profileList",
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
