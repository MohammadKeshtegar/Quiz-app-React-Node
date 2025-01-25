import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  username: "",
  age: 0,
  photo: "",
  role: "",
  active: false,
  rank: 0,
  friends: [],
  confirmedQuiz: [],
  chatGroups: [],
  createdQuiz: 0,
  points: 0,
  coins: 0,
  telegram: "",
  discord: "",
  reddit: "",
  twitter: "",
  instagram: "",
  linkedin: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.age = action.payload.age;
      state.photo = action.payload.photo;
      state.role = action.payload.role;
      state.active = action.payload.active;
      state.friends = action.payload.friends;
      state.confirmedQuiz = action.payload.confirmedQuiz;
      state.chatGroups = action.payload.chats;
      state.createdQuiz = action.payload.createdQuiz;
      state.points = action.payload.points;
      state.telegram = action.payload.telegram;
      state.discord = action.payload.discord;
      state.twitter = action.payload.twitter;
      state.reddit = action.payload.reddit;
      state.instagram = action.payload.instagram;
      state.linkedin = action.payload.linkedin;
      state.coins = action.payload.coins;
      state.id = action.payload._id;
    },
    setUserUpdate(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.photo = action.payload.photo;
      state.confirmedQuiz = action.payload.confirmedQuiz;
      state.createdQuiz = action.payload.createdQuiz;
      state.points = action.payload.points;
      state.telegram = action.payload.telegram;
      state.chatGroups = action.payload.chats;
      state.discord = action.payload.discord;
      state.twitter = action.payload.twitter;
      state.reddit = action.payload.reddit;
      state.instagram = action.payload.instagram;
      state.linkedin = action.payload.linkedin;
      state.coins = action.payload.coins;
    },
    setUserLogout(state) {
      state.name = "";
      state.email = "";
      state.username = "";
      state.age = 0;
      state.photo = "";
      state.role = "";
      state.active = false;
      state.rank = 0;
      state.friends = [];
      state.confirmedQuiz = [];
      state.chatGroups = [];
      state.createdQuiz = 0;
      state.points = 0;
      state.coins = 0;
    },
    setUserConfirmedQuiz(state, action) {
      state.confirmedQuiz = action.payload.confirmedQuiz;
      state.points = action.payload.points + state.points;
    },
  },
});

export const { setUserData, setUserUpdate, setUserLogout, setUserConfirmedQuiz } = userSlice.actions;

export default userSlice.reducer;
