"use client";

import Image from "next/image";
import { useState } from "react";
import { drinkSections, giveUrl, pastries, type Drink } from "@/data/menu";
import { Flower } from "./Flower";
import { ThemeToggle } from "./ThemeToggle";

type View = "all" | "drinks" | "pastries";

const views: { id: View; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pastries", label: "Pastries" },
  { id: "drinks", label: "Drinks" },
];

function SectionHeader({
  title,
  oatmilk,
}: {
  title: string;
  oatmilk?: boolean;
}) {
  return (
    <div className="relative mt-10 mb-8">
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-foreground" />
        <span className="font-mono text-[11px] sm:text-xs font-bold tracking-wide">
          {title}
        </span>
        <span className="h-px flex-1 bg-foreground" />
      </div>
      {oatmilk && (
        <p className="absolute right-0 top-full mt-1 font-mono text-[9px] sm:text-[10px] font-bold">
          **Oatmilk is available upon request
        </p>
      )}
    </div>
  );
}

function DrinkItem({ drink }: { drink: Drink }) {
  return (
    <article className="mx-auto max-w-md text-center">
      <h2 className="font-display text-3xl sm:text-4xl tracking-wider leading-none">
        {drink.name}
      </h2>
      <p className="mt-1 font-mono text-[11px] sm:text-xs">
        ({drink.subtitle})
      </p>
      <p className="mt-3 text-sm sm:text-[15px] leading-snug sm:text-justify sm:[text-align-last:center]">
        {drink.description}
      </p>
      {drink.cloudtop && (
        <p className="mt-2 text-sm sm:text-[15px]">
          <span aria-hidden="true">✻ </span>[Cloudtop upon request]
        </p>
      )}
    </article>
  );
}

function ViewToggle({
  view,
  onChange,
}: {
  view: View;
  onChange: (v: View) => void;
}) {
  const index = views.findIndex((v) => v.id === view);
  return (
    <div
      role="tablist"
      aria-label="Menu sections"
      className="relative mx-auto mt-6 grid w-full max-w-sm grid-cols-3 border-2 border-foreground font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-foreground transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(${index * 100}%)` }}
      />
      {views.map((v) => {
        const active = v.id === view;
        return (
          <button
            key={v.id}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(v.id)}
            className={`relative z-10 cursor-pointer border-l-2 border-foreground px-2 py-2 text-center transition-colors duration-300 first:border-l-0 ${
              active ? "text-background" : "text-foreground hover:bg-foreground/10"
            }`}
          >
            {v.label}
          </button>
        );
      })}
    </div>
  );
}

function GiveButton() {
  const hasUrl = giveUrl.length > 0;
  return (
    <a
      href={hasUrl ? giveUrl : "#"}
      onClick={(e) => {
        if (!hasUrl) e.preventDefault();
      }}
      className="inline-flex h-10 cursor-pointer items-center gap-1.5 bg-foreground px-4 font-display text-lg leading-none tracking-widest text-background transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none"
    >
      <Flower className="w-4" />
      Give
    </a>
  );
}

function LivingWayMark() {
  return (
    <a
      href="https://livingway.la/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LivingWay"
      className="absolute left-5 top-5 z-20 block text-foreground opacity-90 transition-opacity hover:opacity-100 sm:left-6 sm:top-6"
    >
      <span
        aria-hidden="true"
        className="block h-10 w-[101px] bg-current"
        style={{
          maskImage: "url(/livingway.png)",
          WebkitMaskImage: "url(/livingway.png)",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "left center",
          WebkitMaskPosition: "left center",
        }}
      />
    </a>
  );
}

export function Menu() {
  const [view, setView] = useState<View>("all");
  const showDrinks = view !== "pastries";
  const showPastries = view !== "drinks";

  return (
    <main className="relative flex flex-1 flex-col bg-background text-foreground">
      <LivingWayMark />
      <div className="absolute right-5 top-5 z-20 flex items-center gap-2 sm:right-6 sm:top-6">
        <ThemeToggle />
        <GiveButton />
      </div>
      <div className="relative mx-auto w-full max-w-xl flex-1 px-5 pt-16 pb-40 sm:px-8 sm:pt-10">
        <header className="flex flex-col items-center text-center">
          <h1 className="font-display text-7xl sm:text-8xl leading-none tracking-wide">
            Menu
          </h1>
          <div className="mx-auto mt-5 max-w-sm border-2 border-foreground px-4 py-3 text-[13px] sm:text-sm leading-snug">
            <p>
              Give what you can!{" "}
              <strong className="font-bold">$5 suggested price.</strong>
            </p>
            <p>100% of proceeds go toward the Missions Fund.</p>
          </div>
          <ViewToggle view={view} onChange={setView} />
        </header>

        <div key={view} className="menu-fade-in">
          {showPastries && (
            <section>
              <SectionHeader title="Pastries" />
              <ul className="mx-auto grid max-w-md grid-cols-1 gap-x-6 gap-y-5 text-center sm:grid-cols-2">
                {pastries.map((p) => (
                  <li key={p.name}>
                    <h2 className="font-display text-2xl sm:text-[1.75rem] tracking-wider leading-none">
                      {p.name}
                    </h2>
                    {p.note && (
                      <p className="mt-1 font-mono text-[11px] sm:text-xs">
                        ({p.note})
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mx-auto mt-8 max-w-md text-center font-mono text-[11px] sm:text-xs">
                Courtesy of the Uganda Mission Team and Sarah Shin
              </p>
            </section>
          )}

          {showDrinks &&
            drinkSections.map((section) => (
              <section key={section.title}>
                <SectionHeader
                  title={section.title}
                  oatmilk={section.oatmilk}
                />
                <div className="space-y-10">
                  {section.drinks.map((drink) => (
                    <DrinkItem key={drink.name} drink={drink} />
                  ))}
                </div>
              </section>
            ))}
        </div>

        <Flower className="pointer-events-none absolute bottom-4 right-4 w-24 rotate-12 sm:right-0 sm:w-28" />
      </div>

      <footer className="relative border-t border-white/15 bg-brown text-white">
        <div className="flex w-full flex-col items-center gap-3 px-5 py-4 sm:px-8">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <Flower className="w-6" />
              <span className="font-display text-xl tracking-widest leading-none">
                Common Grounds
              </span>
            </div>
            <p className="font-mono text-[9px] tracking-widest opacity-80">
              <a
                href="https://livingway.la/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:underline"
              >
                LIVINGWAY
              </a>
              &nbsp;·&nbsp; 2026
            </p>
          </div>
          <a
            href="https://livingway.la/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LivingWay"
            className="self-start opacity-90 transition-opacity hover:opacity-100 sm:absolute sm:left-6 sm:top-1/2 sm:-translate-y-1/2"
          >
            <Image
              src="/livingway.png"
              alt="LivingWay"
              width={498}
              height={196}
              className="h-10 w-auto sm:h-11"
            />
          </a>
        </div>
      </footer>
    </main>
  );
}
