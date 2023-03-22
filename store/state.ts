import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const currentProfileState = atom({
  key: "currentProfile",
  default: {
    address: "",
    handle: "",
    imageURI: "",
    metadata: "",
    profileId: "",
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

export const loadingProfileListState = atom({
  key: "loadingProfileList",
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
