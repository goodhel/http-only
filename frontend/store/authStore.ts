import create from "zustand";
import { persist } from "zustand/middleware";

const authStore = (set: any) => ({
    userProfile: null,
    token: null,

    addToken: (token: string) => set({ token }),
    addProfile: (profile: any) => set({ userProfile: profile }),
    removeToken: () => set({ token: null }),
})

const useAuthStore = create(
    persist(authStore, {
        name: 'auth',
    })
)

export default useAuthStore
