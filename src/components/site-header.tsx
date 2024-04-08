import * as React from "react";
import { BiCart } from "react-icons/bi";
import MainNav from "./main-nav";
import { Button } from "./ui/button";
import { useCart } from "react-use-cart";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import { Link, useRouter } from "@tanstack/react-router";
import { ModeToggle } from "./mode-toggle";
import { MobileNav } from "./mobile-nav";
import { CircleUser, LogOut } from "lucide-react";
import { config } from "@/lib/config";

export default function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const { totalUniqueItems, items } = useCart();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost">
                <BiCart style={{ fontSize: "1.6em" }} />
                {totalUniqueItems > 0 && `(${totalUniqueItems})`}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
                <SheetDescription>
                  {totalUniqueItems === 0
                    ? "You have no items in your cart"
                    : `Items in your cart: ${totalUniqueItems}`}
                </SheetDescription>
                <ScrollArea className="my-4 h-[calc(100vh-8rem)]">
                  {items.map((item: any) => (
                    <Link
                      key={item.id}
                      to="/product/$productId"
                      params={{ productId: item.id }}
                    >
                      <div className="flex items-center space-x-2 my-4 mr-4">
                        <img
                          className="h-12 w-12 object-cover rounded"
                          src={`${config.SERVER_API_URL}/${item.thumbnail}`}
                          alt={item.name}
                        />
                        <div>
                          <div>
                            <div className="font-semibold">{item.name}</div>
                            <div className="text-sm text-muted-foreground/80">
                              Quantity: {item.quantity}
                            </div>
                          </div>
                          <div>${item.price}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </ScrollArea>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/profile">
              <CircleUser />
            </Link>
          </Button>
          <ModeToggle />
          <Button
            variant="destructive"
            size="icon"
            onClick={async () => {
              localStorage.clear();
              router.invalidate();
              window.location.reload();
            }}
          >
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
}
