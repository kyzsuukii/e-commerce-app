import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@fontsource/open-sauce-one";
import { CartProvider } from "react-use-cart";
import "@fontsource/geist-sans";
import { ThemeProvider } from "./components/theme-provider";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { config } from "./lib/config";

const router = createRouter({
  routeTree,
  context: {
    session: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();
const session = localStorage.getItem("session") || undefined;

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <GoogleReCaptchaProvider reCaptchaKey={config.RECAPTHA_SITE_KEY}>
              <RouterProvider router={router} context={{ session }} />
            </GoogleReCaptchaProvider>
          </ThemeProvider>
        </CartProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
