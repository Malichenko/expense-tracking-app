import axios from "axios";

const URL_DICTIONARY = {
  signUp: "https://identitytoolkit.googleapis.com/v1/accounts:signUp",
  signIn:
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
  refreshToken: "https://securetoken.googleapis.com/v1/token",
  lookup: "https://identitytoolkit.googleapis.com/v1/accounts:lookup",
};

const signUpURL = new URL(URL_DICTIONARY.signUp);
signUpURL.searchParams.set("key", process.env.EXPO_PUBLIC_FIREBASE_API_KEY);

const signInURL = new URL(URL_DICTIONARY.signIn);
signInURL.searchParams.set("key", process.env.EXPO_PUBLIC_FIREBASE_API_KEY);

const refreshTokenURL = new URL(URL_DICTIONARY.refreshToken);
refreshTokenURL.searchParams.set(
  "key",
  process.env.EXPO_PUBLIC_FIREBASE_API_KEY
);

const lookupURL = new URL(URL_DICTIONARY.lookup);
lookupURL.searchParams.set("key", process.env.EXPO_PUBLIC_FIREBASE_API_KEY);

export const authApiClient = {
  signUp: axios.create({
    baseURL: signUpURL.toString(),
  }),
  signIn: axios.create({
    baseURL: signInURL.toString(),
  }),
  refreshToken: axios.create({
    baseURL: refreshTokenURL.toString(),
  }),
  lookup: axios.create({
    baseURL: lookupURL.toString(),
  }),
};
