import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="w-screen h-screen fixed flex flex-col">
      <header className="flex flex-col px-8 py-4 bg-primary-foreground text-primary gap-1">
        <h1 className="text-4xl font-bold">cafecito</h1>
        <nav className="flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            home
          </Link>{" "}
          <Link to="/about" className="[&.active]:font-bold">
            about
          </Link>
          <Link to="/create" className="[&.active]:font-bold">
            create
          </Link>
        </nav>
      </header>
      <hr />
      <main className="bg-primary-foreground overflow-hidden h-full">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  ),
});
