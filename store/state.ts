import { atom } from 'recoil'

export const currenProfile = atom({
  key: 'currenProfile',
  default: { 
    url: ""
  },
})