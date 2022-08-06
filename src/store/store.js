import { createState, useState } from "@hookstate/core";

const store = createState({
  user: {
    id: "",
    name: "",
    email: "",
    isSignupComplete: false,
  },
  isLoggedIn: false,
});

const useGlobalState = () => {
  const state = useState(store);

  return {
    updateUser(data) {
      if (data) {
        state.merge({ isLoggedIn: true });
      }
      state.merge({ user: data });
    },
    updateLoggedIn(data) {
      state.merge({ isLoggedIn: data });
    },
    get getUser() {
      return state.get();
    },
    get getLoggedIn() {
      return state.get()?.isLoggedIn;
    },
    clearUser() {
      state.merge({
        user: {
          name: "",
          email: "",
          isSignupComplete: false,
        },
      });
    },
  };
};

export default useGlobalState;
