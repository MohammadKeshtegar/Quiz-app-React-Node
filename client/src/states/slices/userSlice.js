const initialState = {
  name: "",
  email: "",
  username: "",
  age: 0,
  photo: "",
  role: "",
  active: false,
  friends: [],
  confirmedQuiz: [],
  chatGroups: [],
  createdQuiz: 0,
  points: 0,
  telegram: "",
  discord: "",
  reddit: "",
  twitter: "",
  instagram: "",
  linkedin: "",
  id: "",
};

export const createUserSlice = (set, get) => ({
  user: initialState,
  setUserData: (userData) => set({ user: userData }),
  setUpdateUser: (userUpdates) => set((state) => ({ user: { ...state.user, ...userUpdates } })),
  logoutUser: () => set({ user: initialState }),
  addConfirmedQuiz: (quizData) =>
    set((state) => ({
      user: {
        ...state.user,
        confirmedQuiz: [...state.user.confirmedQuiz, quizData],
        points: state.user.points + quizData.points,
      },
    })),
  setUserLogout: () =>
    set({
      user: {
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
      },
    }),
  setUserConfirmedQuiz: () =>
    set((state) => ({
      confirmedQuiz: state.confirmedQuiz,
      points: state.points + get().points,
    })),
});
