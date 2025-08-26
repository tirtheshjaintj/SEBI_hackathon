import { languageType } from "@/src/types/constants";
import { create, StateCreator } from "zustand";

export interface AuthSliceInterface {
  streak: boolean;
  user: any | null;
  language: languageType | null;
  location: string | null;
  isLogged: boolean;
  logout: () => void;
  setUser: (payload: { user: any }) => void;
  setLanguage: (payload: { language: languageType | null }) => void;
  setLocation: (payload: { location: string | null }) => void;
  setStreak: (payload: { streak: boolean }) => void;
}

export const createUserAuthSlice: StateCreator<
  AuthSliceInterface,
  [],
  [],
  AuthSliceInterface
> = (set) => ({
  streak: false,
  user: null,
  isLogged: false,
  language: null,
  location: null,

  logout: () => {
    set(() => ({
      user: null,
      isLogged: false,
    }));
  },

  setUser: ({ user }: { user: any }) => {
    set(() => ({
      user,
      isLogged: true,
    }));
  },

  setLanguage: ({ language }: { language: languageType | null }) => {
    set(() => ({
      language,
    }));
  },

  setLocation: ({ location }: { location: string | null }) => {
    set(() => ({
      location,
    }));
  },

  setStreak: ({ streak }: { streak: boolean }) => {
    set(() => ({
      streak,
    }));
  },
});

const useAuthStore = create<AuthSliceInterface>()(createUserAuthSlice);

export default useAuthStore;
