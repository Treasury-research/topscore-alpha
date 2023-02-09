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


export const knn3TokenValidState = atom({
  key: 'knn3TokenValid',
  default: false,
})