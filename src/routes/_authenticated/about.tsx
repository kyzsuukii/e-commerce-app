import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/about")({
  component: About,
});

function About() {
  return (
    <div className="my-12 container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_600px] items-start gap-6">
        <div className="space-y-8">
          <h1 className="text-3xl font-bold mb-6">
            Welcome to our Ecommerce Web App!
          </h1>
          <p className="mb-4">
            Our web app is a place where you can buy and sell products online.
            Our mission is to provide a user-friendly and secure platform for
            buying and selling. Our values include quality, customer
            satisfaction, transparency, and innovation.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">Our Mission</h2>
          <p className="mb-4">
            Our mission is to provide a platform that is easy to use and secure
            for buying and selling.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">Our Values</h2>
          <ul className="list-disc pl-8 mb-4">
            <li>Quality</li>
            <li>Customer Satisfaction</li>
            <li>Transparency</li>
            <li>Innovation</li>
          </ul>
        </div>
        <div className="w-full">
          <img src="/about.jpg" alt="About Us" className="w-full rounded" />
        </div>
      </div>
    </div>
  );
}
