"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

function PricingPage() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold leading-7">Pricing</h2>
        <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Choose the Plan that Works for You
        </p>

        <div className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl">
          {/* FREE */}
          <div className="h-fit rounded-3xl p-8 pb-12 ring-1">
            <h3 className="text-lg font-semibold leading-8">Starter Plan</h3>
            <p className="mt-4 text-sm leading-6">
              Explore Core Features at No Cost
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight">Free</span>
            </p>

            {/* Feature List */}
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6">
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none" />
                Documents
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none" />
                Up to 3 messages per document
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none" />
                Try out the AI Chat Functionality
              </li>
            </ul>
          </div>

          {/* PRO */}
          <div className="rounded-3xl p-8 ring-2">
            <h3 className="text-lg font-semibold leading-8">Pro Plan</h3>
            <p className="mt-4 text-sm font-bold leading-6">
              Pro Features for Power Users
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight">$10.99</span>
              <span className="text-sm font-semibold leading-6">/mo</span>
            </p>
            <Button className="focus-visible:white mt-6 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 shadow-sm hover:bg-green-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
              Upgrade to Pro
            </Button>
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6">
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none" />
                Documents
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none" />
                Up to 3 messages per document
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none" />
                Try out the AI Chat Functionality
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
