import { axiosBase } from "@/configs/axios.config";
import ENV_CONFIG from "@/configs/env.config";
import { IAxiosResponseSuccess } from "@/types/response.type";
import {
  IUser,
  SocialMediaType,
} from "@/features/authentication/types/user.type";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type Type = {
  user: IUser | null;
  isLoggedIn: boolean;
  signinWithSocialMedia: (type: SocialMediaType) => void;
  signinPassportSuccess: () => Promise<IAxiosResponseSuccess<IUser>>;
  signout: () => Promise<IAxiosResponseSuccess>;
  getMe: () => Promise<IAxiosResponseSuccess<IUser>>;
  updateMe: (data: FormData) => Promise<IAxiosResponseSuccess<IUser>>;
};

export const useAuthStore = create<Type>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoggedIn: false,
        signinWithSocialMedia: (type) => {
          const newWindowTab = window.open(
            ENV_CONFIG.URL_SERVER + `passport/${type}`,
            "targetWindow",
            `width=600,height=400`
          );
          newWindowTab?.addEventListener("unload", function () {
            this.close();
            window.location.reload();
          });
        },
        signinPassportSuccess: async () => {
          const url = `passport/signin-passport/success`;
          const response = await axiosBase.get(url);
          console.log(response.data);

          set({ user: response.data?.data?.user, isLoggedIn: true });

          return response.data;
        },
        signout: async () => {
          const url = `auth/signout`;
          const response = await axiosBase.delete(url);
          set({ user: null, isLoggedIn: false });

          return response.data;
        },

        getMe: async () => {
          const url = `auth/get-me`;
          const response = await axiosBase.get(url);
          set({ user: response.data?.data });
          return response.data;
        },
        updateMe: async (data) => {
          const url = `auth/update-me`;

          const response = await axiosBase.put(url, data);

          set({ user: response.data?.data });
          return response?.data;
        },
      }),
      {
        name: "authStore",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
