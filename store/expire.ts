import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useExpireStore:any = create<any>()(
  persist(
    (set, get) => ({
      expire: '',
      setExpire: (expire:string) => {
        set({ expire })
      }
    }),
    {
      name: 'useExpireStore',
    }
  )
)