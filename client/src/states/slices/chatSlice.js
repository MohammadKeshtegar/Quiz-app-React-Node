const initialState = {
  id: null,
  name: "",
  picture: "",
  admin: "",
  chatSize: 0,
  members: [],
  messages: [],
  createdAt: "",
  updatedAt: "",
};

export const createChatSlice = (set, get) => ({
  chat: initialState,
  setSelectedChatData: (chatData) =>
    set({
      chat: {
        id: chatData._id,
        name: chatData.name,
        picture: chatData.picture,
        admin: chatData.admin,
        chatSize: chatData.chatSize,
        members: chatData.members,
        createdAt: chatData.createdAt,
        updatedAt: chatData.updatedAt,
      },
    }),
  addMessage: (message) => {
    const prevMessages = get().chat.messages;
    set((state) => ({ chat: { ...state.chat, messages: [prevMessages, message] } }));
  },
  setSelectedChatMessages: (messages) => set((state) => ({ chat: { ...state.chat, messages: messages } })),
  removeSelectedChatData: () =>
    set({
      id: null,
      name: "",
      picture: "",
      chatSize: 1,
      members: [],
      messages: [],
      createdAt: "",
      updatedAt: "",
    }),
});
