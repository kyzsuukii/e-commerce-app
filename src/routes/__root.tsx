import {
  createRootRouteWithContext,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import SiteHeader from "@/components/site-header";
import DashboardHeader from "@/components/dashboard-header";

type RouterContext = {
  session: string;
  isAdmin: string;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  loader: async ({ context: { session } }) => {
    return session;
  },
  component: Root,
});

function Root() {
  const session = Route.useLoaderData();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      {session && pathname.includes("/dashboard") ? (
        <DashboardHeader />
      ) : (
        <SiteHeader />
      )}
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
