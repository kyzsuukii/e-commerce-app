import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import SiteHeader from "@/components/site-header";

type RouterContext = {
  session: string;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  loader: async ({ context: { session } }) => {
    return session;
  },
  component: Root,
});

function Root() {
  const session = Route.useLoaderData();
  return (
    <>
      {session && <SiteHeader />}
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
