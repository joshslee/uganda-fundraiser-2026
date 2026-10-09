"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  drinkSections,
  giveUrl,
  pastryGroups,
  type Drink,
  type PastryGroup,
} from "@/data/menu";
import { DrinkName } from "./DrinkName";
import { Flower } from "./Flower";
import { ThemeToggle } from "./ThemeToggle";
import { ZelleQr } from "./ZelleQr";

type View = "all" | "drinks" | "pastries";

const views: { id: View; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pastries", label: "Pastries" },
  { id: "drinks", label: "Drinks" },
];

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mt-10 mb-8 flex items-center gap-3">
      <span className="h-px flex-1 bg-foreground" />
      <span className="font-mono text-[11px] sm:text-xs font-bold tracking-wide">
        {title}
      </span>
      <span className="h-px flex-1 bg-foreground" />
    </div>
  );
}

function DrinkItem({ drink }: { drink: Drink }) {
  return (
    <article className="mx-auto max-w-md text-center">
      <DrinkName name={drink.name} story={drink.story} />
      <span
        aria-hidden="true"
        className="mx-auto mt-2.5 block h-px w-6 bg-foreground/50"
      />
      <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] opacity-75 sm:text-[11px]">
        {drink.subtitle}
      </p>
      <p className="mt-3 text-sm sm:text-[15px] leading-snug sm:text-justify sm:[text-align-last:center]">
        {drink.description}
      </p>
      {drink.cloudtop && (
        <p className="mt-3">
          <span className="inline-flex items-center gap-1.5 border border-foreground/40 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]">
            <Flower className="w-3 opacity-80" />
            Cloudtop upon request
          </span>
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
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-foreground transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none"
        style={{
          transform: `translateX(${index * 100}%)`,
          boxShadow: "0 0 0 1px var(--color-foreground)",
        }}
      />
      {views.map((v, i) => {
        const active = v.id === view;
        return (
          <button
            key={v.id}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(v.id)}
            className={`relative z-10 tab-lux cursor-pointer px-2 py-2 text-center ${i === 0 ? "" : "border-l-2 border-foreground"} ${
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

function MajorHeader({ title }: { title: string }) {
  return (
    <div className="mt-14 mb-2 flex items-center gap-4 sm:gap-5">
      <span className="h-px flex-1 bg-foreground" />
      <h2 className="flex items-center gap-3 font-display text-3xl tracking-[0.12em] leading-none sm:text-4xl">
        <Flower className="w-5 opacity-80 sm:w-6" />
        {title}
        <Flower className="w-5 opacity-80 sm:w-6" />
      </h2>
      <span className="h-px flex-1 bg-foreground" />
    </div>
  );
}

function GroupHeader({ title }: { title: string }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="h-px flex-1 bg-foreground/50" />
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
        {title}
      </span>
      <span className="h-px flex-1 bg-foreground/50" />
    </div>
  );
}

function PastryGroupList({ group }: { group: PastryGroup }) {
  return (
    <div>
      <GroupHeader title={group.title} />
      <ul className="space-y-3 text-center">
        {group.items.map((p) => (
          <li key={p.name}>
            <h2 className="font-display text-2xl tracking-wider leading-none">
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
    </div>
  );
}

const pastryColumns: PastryGroup[][] = [
  pastryGroups.slice(0, 2),
  pastryGroups.slice(2),
];

function GiveButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [flip, setFlip] = useState<"qr" | "front" | null>(null);
  const showQr = flip === "qr";
  const hasUrl = giveUrl.length > 0;
  const buttonClass =
    "btn-lux inline-flex h-10 cursor-pointer items-center gap-1.5 bg-foreground px-4 font-display text-lg leading-none tracking-widest text-background";

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
        onClose={() => setFlip(null)}
        className="give-dialog m-auto w-[calc(100%-2.5rem)] max-w-md overflow-hidden border-2 border-foreground bg-background p-0 text-foreground backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="stage" data-state={flip ?? undefined}>
          {/* front: message + verse */}
          <div
            className="panel panel-front flex flex-col items-center px-6 py-8 text-center sm:px-8"
            aria-hidden={showQr}
          >
            <Flower className="w-12" />
            <h2
              id="give-title"
              className="mt-4 font-display text-4xl tracking-wider leading-none"
            >
              Thank You
            </h2>
            <p className="mt-3 text-sm sm:text-[15px] leading-snug">
              {hasUrl
                ? "Thank you for your heart to give toward the Uganda Missions Fund. Give securely with Zelle to Living Way Community Church."
                : "Thank you for your heart to give toward the Uganda Missions Fund. Our giving link will be added soon, so please check back shortly."}
            </p>
            {hasUrl && (
              <p className="mt-3 border border-foreground/30 px-3 py-2 font-mono text-[11px] sm:text-xs leading-snug">
                Please add{" "}
                <strong className="font-bold">
                  &ldquo;Uganda Fundraiser 2026&rdquo;
                </strong>{" "}
                to the memo or description.
              </p>
            )}
            <div className="my-6 flex w-full items-center gap-3">
              <span className="h-px flex-1 bg-foreground/40" />
              <Flower className="w-3 opacity-60" />
              <span className="h-px flex-1 bg-foreground/40" />
            </div>
            <blockquote className="text-sm sm:text-[15px] italic leading-relaxed">
              &ldquo;Go therefore and make disciples of all nations, baptizing
              them in the name of the Father and of the Son and of the Holy
              Spirit, teaching them to observe all that I have commanded you.
              And behold, I am with you always, to the end of the age.&rdquo;
            </blockquote>
            <p className="mt-2 font-mono text-[11px] sm:text-xs">
              Matthew 28:19&ndash;20 (ESV)
            </p>
            <div className="mt-7 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
              {hasUrl && (
                <a
                  href={giveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={showQr ? -1 : 0}
                  className="btn-lux inline-flex h-11 cursor-pointer items-center justify-center gap-2 bg-foreground px-6 font-display text-xl leading-none tracking-widest text-background"
                >
                  <Flower className="w-4" />
                  Give with Zelle
                </a>
              )}
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                tabIndex={showQr ? -1 : 0}
                className="btn-lux inline-flex h-11 cursor-pointer items-center justify-center border-2 border-foreground px-6 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-foreground hover:text-background"
              >
                Close
              </button>
            </div>
            {hasUrl && (
              <button
                type="button"
                onClick={() => setFlip("qr")}
                tabIndex={showQr ? -1 : 0}
                className="link-lux mt-5 cursor-pointer font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider opacity-80 hover:opacity-100"
              >
                Show QR
              </button>
            )}
          </div>

          {/* back: QR */}
          <div
            className="panel panel-qr flex flex-col items-center justify-center px-6 py-8 text-center sm:px-8"
            aria-hidden={!showQr}
          >
            <h2 className="font-display text-4xl tracking-wider leading-none">
              Scan to Give
            </h2>
            <p className="mt-2 font-mono text-[11px] sm:text-xs">
              Zelle &middot; Living Way Community Church
            </p>
            <ZelleQr className="mt-5 w-full max-w-[260px]" />
            <p className="mt-4 font-mono text-[11px] sm:text-xs leading-snug">
              Add{" "}
              <strong className="font-bold">
                &ldquo;Uganda Fundraiser 2026&rdquo;
              </strong>{" "}
              to the memo.
            </p>
            <div className="mt-6 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setFlip("front")}
                tabIndex={showQr ? 0 : -1}
                className="btn-lux inline-flex h-11 cursor-pointer items-center justify-center border-2 border-foreground px-6 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-foreground hover:text-background"
              >
                Back
              </button>
            </div>
          </div>
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
                <strong className="font-bold">$7 suggested for drinks.</strong>
              </p>
              <p>100% of proceeds go toward the Missions Fund.</p>
            </div>
            <ViewToggle view={view} onChange={setView} />
          </header>

          <div key={view} className="menu-fade-in min-h-[50vh]">
            {showPastries && (
              <section>
                <MajorHeader title="Pastries" />
                <div className="mx-auto mt-8 grid max-w-lg grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-10">
                  {pastryColumns.map((column, i) => (
                    <div key={i} className="flex flex-col gap-10">
                      {column.map((group) => (
                        <PastryGroupList key={group.title} group={group} />
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {showDrinks && (
              <section>
                <MajorHeader title="Drinks" />
              </section>
            )}

            {showDrinks &&
              drinkSections.map((section) => (
                <section key={section.title}>
                  <SectionHeader title={section.title} />
                  <div className="space-y-10">
                    {section.drinks.map((drink) => (
                      <DrinkItem key={drink.name} drink={drink} />
                    ))}
                  </div>
                </section>
              ))}
          </div>
          <section className="mt-20 flex flex-col items-center text-center">
            <div className="flex w-full max-w-xs items-center gap-3">
              <span className="h-px flex-1 bg-foreground/50" />
              <Flower className="w-5 opacity-80" />
              <span className="h-px flex-1 bg-foreground/50" />
            </div>
            <h2 className="mt-6 font-display text-3xl tracking-[0.12em] leading-none sm:text-4xl">
              Thank You
            </h2>
            <p className="mt-4 max-w-sm text-sm sm:text-[15px] leading-relaxed">
              Thank you for being here. Every dollar donated, every cup poured,
              and every pastry shared helps carry love and hope to Uganda. We
              are so grateful for you.
            </p>
            <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] opacity-75 sm:text-[11px]">
              With love, the Uganda Missions Team
            </p>
          </section>
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
