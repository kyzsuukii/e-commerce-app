import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export default function DashboardNav() {
  const data = [
    {
      title: "Products",
      to: "/dashboard/products",
    },
    {
      title: "Upload",
      to: "/dashboard/upload",
    },
  ];

  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/" className="mr-6 flex items-center gap-2">
        <ArrowLeft size={20} />
        Back
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
