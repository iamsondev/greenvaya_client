import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  name?: string
  email: string
  role: "MEMBER" | "ADMIN" | "MODERATOR"
  profileImage?: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  setAuth: (user: User, accessToken: string) => void
  setAccessToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAuth: (user, accessToken) => set({ user, accessToken }),
      setAccessToken: (token) => set({ accessToken: token }),
      logout: () => {
        set({ user: null, accessToken: null })
        localStorage.removeItem("auth-storage")
      },
    }),
    {
      name: "auth-storage",
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Migrate 'token' to 'accessToken'
          if (persistedState.token) {
            persistedState.accessToken = persistedState.token
            delete persistedState.token
          }
        }
        return persistedState
      },
    }
  )
)
