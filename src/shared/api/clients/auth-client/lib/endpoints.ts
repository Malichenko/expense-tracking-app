const FIREBASE_AUTH_ENDPOINTS = {
  signUp: "https://identitytoolkit.googleapis.com/v1/accounts:signUp",
  signIn:
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
  refreshToken: "https://securetoken.googleapis.com/v1/token",
  lookup: "https://identitytoolkit.googleapis.com/v1/accounts:lookup",
} as const;

type EndpointKey = keyof typeof FIREBASE_AUTH_ENDPOINTS;

const createAuthEndpointUrl = (endpoint: EndpointKey): string => {
  const url = new URL(FIREBASE_AUTH_ENDPOINTS[endpoint]);
  url.searchParams.set("key", process.env.EXPO_PUBLIC_FIREBASE_API_KEY);

  return url.toString();
};

export const authEndpoints = {
  signUp: createAuthEndpointUrl("signUp"),
  signIn: createAuthEndpointUrl("signIn"),
  refreshToken: createAuthEndpointUrl("refreshToken"),
  lookup: createAuthEndpointUrl("lookup"),
} as const;
