import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Menu } from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";

export function DashboardMobileNav() {
  const [open, setOpen] = useState(false);

  const data = [
    {
      title: "Products",
      to: "/dashboard/products",
    },
    {
      title: "Users",
      to: "/dashboard/users",
    },
    {
      title: "Orders",
      to: "/dashboard/orders",
    },
    {
      title: "Upload",
      to: "/dashboard/upload",
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          to="/"
          className="flex items-center gap-2"
          onOpenChange={setOpen}
        >
          <Home className="h-4 w-4" />
          <span className="font-bold">Home</span>
        </MobileLink>
        <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {data.map((nav, index) => (
              <MobileLink key={index} to={nav.to} onOpenChange={setOpen}>
                {nav.title}
              </MobileLink>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps {
  to: any;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  to,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      to={to}
      onClick={() => {
        router.navigate({ to: to.toString() });
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
