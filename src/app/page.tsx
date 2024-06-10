import { Dashboard } from "@/components/dashboard";
import { HeaderPanel } from "@/components/header-panel";
import { Loading } from "@/components/loading";
import { SearchLocation } from "@/components/search-location";
import { Weather } from "@/components/weather";
import { getCurrentWeather } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import { RedirectType, redirect } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  if (searchParams.location) {
    const data = await getCurrentWeather(searchParams.location);
    return {
      title: `${data.location.name}, ${data.location.region}, ${data.location.country}`,
      description: `El clima en ${data.location.name}, ${data.location.region}, ${data.location.country} es de ${data.current.feelslike_c}°C con ${data.current.condition.text}`,
      icons: {
        icon: [
          {
            url: `/weather-icons/${data.current.is_day === 1 ? "day" : "night"}/${data.current.condition.icon.split("/").pop()?.split(".")[0]}@3x.png`
          }
        ]
      },
      authors: [
        {
          name: "emirchus",
          url: "https://emirchus.dev.ar"
        }
      ],
      creator: "emirchus",

      openGraph: {
        title: `${data.location.name}, ${data.location.region}, ${data.location.country}`,
        description: `El clima en ${data.location.name}, ${data.location.region}, ${data.location.country} es de ${data.current.feelslike_c}°C con ${data.current.condition.text}`,
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/og?location=${searchParams.location}`,
            width: 200,
            height: 200,
            alt: `Weather icon for ${data.current.condition.text}`
          }
        ],
        siteName: "Mi Clima",
        type: "website",
        locale: "es_AR",
        url: process.env.NEXT_PUBLIC_VERCEL_URL,
        countryName: data.location.country
      },
      twitter: {
        card: "summary_large_image",
        site: "https://x.com/emirchus",
        creatorId: "@emirchus",
        title: `${data.location.name}, ${data.location.region}, ${data.location.country}`,
        description: `El clima en ${data.location.name}, ${data.location.region}, ${data.location.country} es de ${data.current.feelslike_c}°C con ${data.current.condition.text}`,
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/og?location=${searchParams.location}`,
            width: 200,
            height: 200,
            alt: `Weather icon for ${data.current.condition.text}`
          }
        ],
        creator: "@emirchus"
      }
    };
  }

  return {
    title: "Inicio",
    authors: [
      {
        name: "emirchus",
        url: "https://emirchus.dev.ar"
      }
    ],
    creator: "emirchus",
    openGraph: {
      title: `Emirchus Weather App`,
      description: "La mejor app de clima",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/og.png`,
          width: 200,
          height: 200,
          alt: `Weather icon `
        }
      ],
      siteName: "Mi Clima",
      type: "website",
      locale: "es_AR",
      url: process.env.NEXT_PUBLIC_VERCEL_URL
    },
    twitter: {
      card: "summary_large_image",
      site: "https://x.com/emirchus",
      creatorId: "@emirchus",
      title: `Emirchus Weather App`,
      description: "La mejor app de clima",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/og.png`,
          width: 200,
          height: 200,
          alt: `Weather icon `
        }
      ],
      creator: "@emirchus"
    }
  };
}

interface Props {
  searchParams: {
    location?: string;
    period?: "today" | "week";
    format?: "c" | "f";
    date?: string;
    search?: string;
  };
}

export default function HomePage({ searchParams }: Props) {
  const requiredParams = ["location", "period", "format"];
  const params = new URLSearchParams(searchParams);
  if (searchParams.location && !requiredParams.every(param => params.has(param))) {
    if (!searchParams.period) {
      params.set("period", "today");
    }

    if (!searchParams.format) {
      params.set("format", "c");
    }

    redirect(`/?${params.toString()}`, RedirectType.replace);
  }

  return (
    <main className="flex w-full flex-col border contain-inline-size md:h-full md:flex-row md:rounded-md md:shadow-rg">
      <div
        className={cn("flex flex-col p-5 transition-all duration-300 ease-in-out", {
          "w-full border-b md:w-1/4 md:border-b-0 md:border-r": searchParams.location,
          "w-full md:w-full": !searchParams.location
        })}
      >
        <SearchLocation searching={searchParams.search === ""}/>
        {searchParams.location ? (
          <Suspense
            fallback={
              <div className="flex h-full w-full flex-col items-center justify-center">
                <Loading />
              </div>
            }
            key={searchParams.location}
          >
            <Weather location={searchParams.location} format={searchParams.format || "c"} />
          </Suspense>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
            <Image alt="No location selected" height={100} src="/no-location.png" width={100} />
            <p className="p-4 text-center text-xl font-bold">No se seleccionó una ubicación</p>
          </div>
        )}
      </div>

      {searchParams.location && (
        <div
          className={cn("flex h-full flex-col bg-muted/30 contain-inline-size", {
            "w-0": !searchParams.location,
            "md:w-3/4": searchParams.location
          })}
        >
          <HeaderPanel period={searchParams.period || "today"} format={searchParams.format || "c"} />
          <Suspense
            fallback={
              <div className="flex h-full w-full flex-col items-center justify-center bg-muted/40 md:w-3/4">
                <Loading />
              </div>
            }
            key={`${searchParams.period}-${searchParams.location}-${searchParams.period}`}
          >
            <Dashboard
              location={searchParams.location}
              format={searchParams.format || "c"}
              period={searchParams.period || "today"}
              date={searchParams.date}
            />
          </Suspense>
        </div>
      )}
    </main>
  );
}
