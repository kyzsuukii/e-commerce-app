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
  component: Root,
});

function Root() {
  const { session } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      {session ? (
        pathname.includes("/dashboard") ? (
          <DashboardHeader />
        ) : (
          <SiteHeader />
        )
      ) : null}
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
