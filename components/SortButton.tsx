"use client";
import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function Sorting() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { setTheme } = useTheme();

  // Imposta il tema scuro solo al primo render
  React.useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  const [sortBy, setSortBy] = React.useState(
    searchParams.get("sortBy") || "default",
  );
  const [order, setOrder] = React.useState(searchParams.get("order") || "asc");

  const handleSortChange = (value: string) => {
    setSortBy(value);
    if (value === "default") {
      updateURL(null, null); // Rimuove sia sortBy che order per il reset
    } else {
      updateURL(value, order);
    }
  };

  const toggleOrder = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
    updateURL(sortBy, newOrder);
  };

  const updateURL = (sortBy: string | null, order: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortBy && sortBy !== "default") {
      params.set("sortBy", sortBy);
    } else {
      params.delete("sortBy");
    }

    if (order) {
      params.set("order", order);
    } else {
      params.delete("order");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center">
      <Select value={sortBy} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px] rounded-r-none border-gray-400 focus:border-gray-400 focus:ring-0">
          <SelectValue placeholder="Ordina per" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Ordina per</SelectItem>{" "}
          <SelectItem value="avgSalePerSqM">Vendita €/MQ</SelectItem>
          <SelectItem value="avgRentPerSqM">Affitto €/MQ</SelectItem>
          <SelectItem value="pollutionScore">Inquinamento pm25</SelectItem>
        </SelectContent>
      </Select>

      {sortBy !== "default" && (
        <Button
          variant="outline"
          onClick={toggleOrder}
          className="flex items-center justify-center rounded-l-none border-gray-400 p-2 hover:border-gray-400 focus:border-gray-400 focus:ring-0"
          aria-label={`Ordina in ordine ${order === "asc" ? "crescente" : "decrescente"}`}
        >
          {order === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  );
}
