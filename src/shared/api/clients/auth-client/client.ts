import axios from "axios";
import { authEndpoints } from "./lib";

export const authApiClient = {
  signUp: axios.create({ baseURL: authEndpoints.signUp }),
  signIn: axios.create({ baseURL: authEndpoints.signIn }),
  refreshToken: axios.create({ baseURL: authEndpoints.refreshToken }),
  lookup: axios.create({ baseURL: authEndpoints.lookup }),
};
