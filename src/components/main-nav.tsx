import { Link } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { useEffect, useState } from "react";

export default function MainNav() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAdmin = localStorage.getItem("isAdmin");
      if (isAdmin === "true") {
        setIsAdmin(true);
      }
    }
  }, [isAdmin]);
  const data = [
    {
      title: "Products",
      to: "/products",
    },
    {
      title: "Search",
      to: "/search",
    },
    {
      title: "Cart",
      to: "/cart",
    },
    {
      title: "Order",
      to: "/order",
    },
    {
      title: "About",
      to: "/about",
    },
  ];

  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <Store />
        <span className="hidden font-bold sm:inline-block">FakeStore</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {data.map((nav, index) => (
          <Link
            key={index}
            to={nav.to}
            className="transition-colors text-foreground/60 hover:text-foreground/80 [&.active]:text-foreground"
          >
            {nav.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
