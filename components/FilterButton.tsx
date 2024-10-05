"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// Definiamo il tipo per le regioni e le città
type Region = {
  label: string;
  searchKey: string;
  urlTag: keyof typeof cities; // Assicuriamoci che urlTag sia una delle chiavi di cities
};

type City = {
  label: string;
  searchKey: string;
  urlTag: string;
};

// Definiamo le regioni e le città come oggetti con label, chiave di ricerca e tag per l'URL
const regions: Region[] = [
  { label: "Lombardia", searchKey: "lombardia", urlTag: "lomb" },
  { label: "Lazio", searchKey: "lazio", urlTag: "laz" },
  { label: "Campania", searchKey: "campania", urlTag: "camp" },
];

const cities: Record<string, City[]> = {
  lomb: [
    { label: "Milano", searchKey: "milano", urlTag: "mil" },
    { label: "Bergamo", searchKey: "bergamo", urlTag: "berg" },
    { label: "Brescia", searchKey: "brescia", urlTag: "bres" },
  ],
  laz: [
    { label: "Roma", searchKey: "roma", urlTag: "rom" },
    { label: "Viterbo", searchKey: "viterbo", urlTag: "vit" },
    { label: "Latina", searchKey: "latina", urlTag: "lat" },
  ],
  camp: [
    { label: "Napoli", searchKey: "napoli", urlTag: "nap" },
    { label: "Salerno", searchKey: "salerno", urlTag: "sal" },
    { label: "Caserta", searchKey: "caserta", urlTag: "cas" },
  ],
};

export default function FilterButton() {
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [zoneSearch, setZoneSearch] = useState("");
  const debouncedZoneSearch = useDebounce(zoneSearch, 300);
  const [open, setOpen] = useState(false);
  // Stati per controllare la visibilità del menu
  const [isRegionMenuOpen, setIsRegionMenuOpen] = useState(false);
  const [isCityMenuOpen, setIsCityMenuOpen] = useState(false);

  // Riferimenti per gestire il focus e il blur
  const regionInputRef = useRef<HTMLInputElement | null>(null);
  const cityInputRef = useRef<HTMLInputElement | null>(null);

  // Aggiorna i parametri dell'URL quando i filtri cambiano
  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (selectedRegion) queryParams.set("region", selectedRegion.urlTag);
    if (selectedCity) queryParams.set("city", selectedCity.urlTag);
    if (debouncedZoneSearch) {
      queryParams.set("zone", debouncedZoneSearch);
    } else {
      queryParams.delete("zone");
    }

    router.push(`?${queryParams.toString()}`);
  }, [selectedRegion, selectedCity, debouncedZoneSearch]);

  // Funzione per gestire la chiusura del menu con un ritardo per evitare conflitti
  const handleBlurWithDelay = (setMenuOpen: (open: boolean) => void) => {
    setTimeout(() => {
      setMenuOpen(false);
    }, 200); // Ritardo per permettere la selezione con il mouse
  };
  const resetFilters = () => {
    setSelectedRegion(null);
    setSelectedCity(null);
    setZoneSearch("");
    router.push("?"); // Resetta l'URL
  };
  const handleApplyFilters = () => {
    setOpen(false);
    // Qui puoi aggiungere altra logica se necessario
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center border-gray-400 focus:border-gray-400 focus:ring-0"
        >
          <HiAdjustmentsHorizontal className="h-5 w-5" />
          <span className="ml-2 hidden sm:inline">Cerca</span>{" "}
          {/* Testo nascosto su schermi piccoli */}
        </Button>
      </DialogTrigger>
      <DialogContent>
        {/* <DialogHeader sr-only>
          <DialogTitle sr-only>Cerca/Filtra</DialogTitle>
        </DialogHeader> */}
        <div className="space-y-4">
          <div>
            <Input
              id="zone"
              placeholder="Cerca la zona"
              value={zoneSearch}
              onChange={(e) => setZoneSearch(e.target.value)}
            />
          </div>
          {/* Selezione della regione con Command */}
          <div>
            <Command className="rounded-lg border shadow-md">
              <CommandInput
                ref={regionInputRef}
                placeholder={
                  selectedRegion ? selectedRegion.label : "Seleziona Regione"
                }
                onFocus={() => setIsRegionMenuOpen(true)} // Mostra il menu quando l'input è focalizzato
                onBlur={() => handleBlurWithDelay(setIsRegionMenuOpen)} // Nascondi il menu con un ritardo
              />
              {isRegionMenuOpen && (
                <CommandList>
                  <CommandEmpty>Nessuna regione trovata.</CommandEmpty>
                  <CommandGroup heading="Regioni">
                    {regions.map((region) => (
                      <CommandItem
                        key={region.urlTag}
                        onSelect={() => {
                          setSelectedRegion(region);
                          setSelectedCity(null); // Reset della città quando cambia la regione
                          setIsRegionMenuOpen(false); // Chiudi il menu dopo la selezione
                          regionInputRef.current?.blur(); // Rimuovi il focus dall'input
                        }}
                      >
                        <span>{region.label}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              )}
            </Command>
          </div>

          {/* Selezione della città con Command */}
          <div>
            <Command className="rounded-lg border shadow-md">
              <CommandInput
                ref={cityInputRef}
                placeholder={
                  selectedCity ? selectedCity.label : "Seleziona Città"
                }
                onFocus={() => setIsCityMenuOpen(true)} // Mostra il menu quando l'input è focalizzato
                onBlur={() => handleBlurWithDelay(setIsCityMenuOpen)} // Nascondi il menu con un ritardo
              />
              {isCityMenuOpen && selectedRegion && (
                <CommandList>
                  <CommandEmpty>Nessuna città trovata.</CommandEmpty>
                  <CommandGroup heading="Città">
                    {cities[selectedRegion.urlTag].map((city) => (
                      <CommandItem
                        key={city.urlTag}
                        onSelect={() => {
                          setSelectedCity(city);
                          setIsCityMenuOpen(false); // Chiudi il menu dopo la selezione
                          cityInputRef.current?.blur(); // Rimuovi il focus dall'input
                        }}
                      >
                        <span>{city.label}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              )}
            </Command>
          </div>
        </div>
        <DialogFooter className="sticky bottom-0 p-4">
          <div className="flex w-full flex-row justify-between gap-2">
            <Button variant="outline" onClick={resetFilters} className="flex-1">
              Reset filtri
            </Button>
            <Button
              type="submit"
              onClick={handleApplyFilters}
              className="flex-1"
            >
              Applica filtri
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
