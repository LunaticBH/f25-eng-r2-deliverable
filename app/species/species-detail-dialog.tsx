"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";
import { useState } from "react";

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesDetailDialog({ species }: { species: Species }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-3 w-full">Learn More</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{species.scientific_name}</DialogTitle>
          <DialogDescription>{species.common_name}</DialogDescription>
        </DialogHeader>
        <div className="grid w-full gap-4">
          <div>
            <h3 className="font-semibold">Scientific Name</h3>
            <p className="text-sm text-gray-600">{species.scientific_name}</p>
          </div>
          <div>
            <h3 className="font-semibold">Common Name</h3>
            <p className="text-sm text-gray-600">{species.common_name ?? "N/A"}</p>
          </div>
          <div>
            <h3 className="font-semibold">Kingdom</h3>
            <p className="text-sm text-gray-600">{species.kingdom}</p>
          </div>
          <div>
            <h3 className="font-semibold">Total Population</h3>
            <p className="text-sm text-gray-600">
              {species.total_population ? species.total_population.toLocaleString() : "Unknown"}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Description</h3>
            <p className="text-sm text-gray-600">{species.description ?? "No description available"}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
