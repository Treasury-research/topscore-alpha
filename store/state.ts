import { atom } from "recoil";

export const currentProfileState = atom({
  key: "currentProfile",
  default: {
    address: "",
    handle: "",
    imageURI: "",
    metadata: "",
    profileId: "",
  },
});

export const profileListState = atom({
  key: "profileList",
  default: [],
});
