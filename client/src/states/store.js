import { create } from "zustand";
import { createUserSlice } from "./slices/userSlice";
import { createChatSlice } from "./slices/chatSlice";
import { persist } from "zustand/middleware";

export const useUserStorage = create(persist((...a) => ({ ...createUserSlice(...a) }), { name: "user" }));
export const useChatStorage = create((...a) => ({ ...createChatSlice(...a) }));
export const useSocketStorage = create()(
  persist((set, get) => ({ socket: null, setSocket: (socket) => set({ socket }) })),
  { name: "socket" }
);
