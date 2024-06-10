"use client";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { CommandLoading } from "cmdk";
import { LocateIcon, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode, useRef, useState } from "react";
import { Loading } from "../loading";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { CommandDialog, CommandEmpty, CommandList, CommandGroup, CommandItem } from "@/components/ui/command";
import { SearchWeather } from "@/interface/search-weather.entity";
import { searchLocations } from "@/app/action";
import { AnimatePresence } from "framer-motion";

interface Props {
  searching: boolean;
}

export const SearchLocation = ({ searching }: Props) => {
  const refTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ReactNode[]>();

  const onSearchChange = (value?: string) => {
    setLoading(false);
    if (!value || value === search) {
      if (value?.trim().length === 0) {
        setResults([]);
      }
      return;
    }

    setSearch(value);
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
    }
    const timeout = setTimeout(() => {
      setLoading(true);
      searchLocations(value).then(data => {
        setResults(data);
        setLoading(false);
      });
    }, 500);

    refTimeout.current = timeout;
  };

  const onClose = () => {
    setResults([]);
    const params = new URLSearchParams(searchParams);

    params.delete("search");

    router.replace(`/?${params.toString()}`);
  };

  const onOpen = () => {
    const params = new URLSearchParams(searchParams);

    params.set("search", "");

    router.replace(`/?${params.toString()}`);
  };

  return (
    <>
      <div className="flex h-9 flex-row items-center justify-between">
        <Button
          variant="outline"
          onClick={onOpen}
          className={cn("flex w-[80%] flex-row items-center justify-between bg-background px-4 py-2 text-muted-foreground")}
        >
          <span>Buscar lugares...</span>
          <Search className="h-4 w-4 md:ml-2" />
        </Button>
        <Button
          size={"icon"}
          variant={"outline"}
          className="h-9 w-9"
          onClick={async () => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(async position => {
                const { latitude, longitude } = position.coords;
                const params = new URLSearchParams(searchParams);

                params.set("location", `${latitude},${longitude}`);

                if (!params.has("format")) {
                  params.set("format", "c");
                }

                if (!params.has("period")) {
                  params.set("period", "today");
                }

                router.replace(`/?${params.toString()}`);
              });
            }
          }}
        >
          <LocateIcon className="h-4 w-4" />
        </Button>
      </div>
      <CommandDialog
        open={searching}
        onOpenChange={value => {
          if (!value) {
            onClose();
          }
        }}
        modal
      >
        <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
          <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <input
            className={cn(
              "flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            )}
            onChange={e => onSearchChange(e.currentTarget.value)}
          />
        </div>
        <CommandList>
          {loading ? (
            <CommandLoading className="mx-auto flex items-center justify-center py-6 text-center text-sm">
              <Loading />
            </CommandLoading>
          ) : (
            <CommandEmpty>Sin resultados.</CommandEmpty>
          )}
          <AnimatePresence>{results && !loading && results}</AnimatePresence>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export const SearchItem = ({ heading, results }: { heading: string; results: SearchWeather[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <CommandGroup heading={heading}>
      {results.map((result, index) => (
        <CommandItem
          key={index}
          value={result.id.toString()}
          onSelect={() => {
            const params = new URLSearchParams(searchParams);

            params.set("location", result.url);

            if (!params.has("format")) {
              params.set("format", "c");
            }

            if (!params.has("period")) {
              params.set("period", "today");
            }

            params.delete("search");

            router.replace(`/?${params.toString()}`);
          }}
        >
          {result.name}, {result.region}, {result.country}
        </CommandItem>
      ))}
    </CommandGroup>
  );
};
