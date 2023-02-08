import { atom } from 'recoil'

export const currentProfileState = atom({
  key: 'currentProfile',
  default: { 
    url: ""
  },
})

export const profileListState = atom({
  key: 'profileList',
  default:[]
})