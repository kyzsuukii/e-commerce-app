export const config = {
  SERVER_API_URL: import.meta.env.VITE_SERVER_API_URL,
  RECAPTHA_SITE_KEY: import.meta.env.VITE_RECAPTHA_SITE_KEY,
  SESSION: window !== undefined ? localStorage.getItem("session") : null,
};
