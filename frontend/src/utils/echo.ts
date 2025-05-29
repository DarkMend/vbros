import Echo from "laravel-echo";
import Pusher from "pusher-js";
import Cookies from "js-cookie";

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo;
  }
}

const initEcho = () => {
  if (typeof window !== "undefined") {
    window.Pusher = Pusher;
    window.Echo = new Echo({
      broadcaster: "reverb",
      key: import.meta.env.VITE_REVERB_APP_KEY,
      wsHost: import.meta.env.VITE_REVERB_HOST,
      wsPort: parseInt(import.meta.env.VITE_REVERB_PORT || "8080"),
      wssPort: parseInt(import.meta.env.VITE_REVERB_PORT || "8080"),
      forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https",
      enabledTransports: ["ws", "wss"],
      auth: {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      },
      authEndpoint: `${import.meta.env.VITE_APP_URL_API}broadcasting/auth`,
    });
  }
  return window.Echo;
};

export const echo = initEcho();
