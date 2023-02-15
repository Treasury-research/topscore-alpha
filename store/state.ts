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
  effects_UNSTABLE: [persistAtom],
});

export const profileListState = atom({
  key: "profileList",
  default: [],
});

export const loadingProfileListState = atom({
  key: "loadingProfileList",
  default: true,
});

export const knn3TokenValidState = atom({
  key: "knn3TokenValid",
  default: false,
});
