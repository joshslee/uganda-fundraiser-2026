"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { drinkSections, giveUrl, pastries, type Drink } from "@/data/menu";
import { Flower } from "./Flower";
import { ThemeToggle } from "./ThemeToggle";

type View = "all" | "drinks" | "pastries";

// Static class list so Tailwind can see every order utility we might use.
const DESKTOP_ORDER = [
  "sm:order-1",
  "sm:order-2",
  "sm:order-3",
  "sm:order-4",
  "sm:order-5",
  "sm:order-6",
  "sm:order-7",
  "sm:order-8",
  "sm:order-9",
  "sm:order-10",
  "sm:order-11",
  "sm:order-12",
];

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
              active
                ? "text-background"
                : "text-foreground hover:bg-foreground/10"
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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const hasUrl = giveUrl.length > 0;
  const buttonClass =
    "inline-flex h-10 cursor-pointer items-center gap-1.5 bg-foreground px-4 font-display text-lg leading-none tracking-widest text-background transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-none";

  if (hasUrl) {
    return (
      <a
        href={giveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
      >
        <Flower className="w-4" />
        Give
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className={buttonClass}
      >
        <Flower className="w-4" />
        Give
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby="give-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="give-dialog m-auto w-[calc(100%-2.5rem)] max-w-md border-2 border-foreground bg-background p-0 text-foreground backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex flex-col items-center px-6 py-8 text-center sm:px-8">
          <Flower className="w-12" />
          <h2
            id="give-title"
            className="mt-4 font-display text-4xl tracking-wider leading-none"
          >
            Thank You
          </h2>
          <p className="mt-3 text-sm sm:text-[15px] leading-snug">
            Thank you for your heart to give toward the Uganda Missions Fund.
            Our giving link will be added soon, so please check back shortly.
          </p>
          <div className="my-6 flex w-full items-center gap-3">
            <span className="h-px flex-1 bg-foreground/40" />
            <Flower className="w-3 opacity-60" />
            <span className="h-px flex-1 bg-foreground/40" />
          </div>
          <blockquote className="text-sm sm:text-[15px] italic leading-relaxed">
            &ldquo;Go therefore and make disciples of all nations, baptizing
            them in the name of the Father and of the Son and of the Holy
            Spirit, teaching them to observe all that I have commanded you. And
            behold, I am with you always, to the end of the age.&rdquo;
          </blockquote>
          <p className="mt-2 font-mono text-[11px] sm:text-xs">
            Matthew 28:19&ndash;20 (ESV)
          </p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="mt-7 inline-flex h-10 cursor-pointer items-center justify-center border-2 border-foreground px-6 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background"
          >
            Close
          </button>
        </div>
      </dialog>
    </>
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
      <div className="relative flex-1">
        <Flower className="pointer-events-none absolute bottom-4 right-7 w-24 rotate-12 sm:right-[34px] sm:w-28" />
        <div className="mx-auto w-full max-w-xl px-5 pt-16 pb-40 sm:px-8 sm:pt-10">
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
                  {pastries.map((p, i) => (
                    <li
                      key={p.name}
                      className={DESKTOP_ORDER[(p.desktopOrder ?? i + 1) - 1]}
                    >
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
        </div>
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
