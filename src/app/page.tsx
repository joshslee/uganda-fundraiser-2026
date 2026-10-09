type Drink = {
  name: string;
  subtitle: string;
  description: string;
  cloudtop?: boolean;
};

type Section = {
  title: string;
  oatmilk?: boolean;
  drinks: Drink[];
};

const sections: Section[] = [
  {
    title: "Espresso Based Drinks",
    oatmilk: true,
    drinks: [
      {
        name: "The Pearl",
        subtitle: "Iced Ugandan Vanilla Latte",
        description:
          "Flash-chilled espresso with Ugandan vanilla bean syrup and your choice of lactose-free or oat milk. Finished with nutmeg and orange zest.",
        cloudtop: true,
      },
      {
        name: "Lake Victoria Fizz",
        subtitle: "Iced Peach Cold Brew Tonic",
        description:
          "Bright, fruit-forward cold brew layered with peach purée, a splash of yuzu, and crisp Fever-Tree tonic. Finished with osmanthus petals.",
      },
    ],
  },
  {
    title: "Matcha Based Drinks",
    oatmilk: true,
    drinks: [
      {
        name: "Mabira Forest",
        subtitle: "Iced Matcha Latte",
        description:
          "Velvety ceremonial-grade matcha, lightly sweetened with honey or agave, with your choice of lactose-free or oat milk. Finished with buttery toffee bits.",
        cloudtop: true,
      },
      {
        name: "Nile Bloom",
        subtitle: "Iced Honey Yuzu Matcha Tonic",
        description:
          "Ceremonial-grade matcha with bright yuzu, honey, and crisp Fever-Tree tonic. Finished with candied yuzu peel.",
      },
    ],
  },
  {
    title: "Non-Caffeinated Drink",
    drinks: [
      {
        name: "Kampala Breeze",
        subtitle: "Sparkling Blackberry Citrus Refresher",
        description:
          "Blackberry purée and fresh citrus topped with sparkling club soda. Bright, fruity, and caffeine-free.",
      },
    ],
  },
];

function Flower({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M50 12c7-10 20-8 20 4 0 4-2 7-4 10 4-1 8-1 11 1 10 6 6 19-6 19-4 0-7-1-10-3 2 4 3 8 2 12-2 12-16 14-20 3-1-4 0-8 2-12-3 2-6 3-10 3-12 0-16-13-6-19 3-2 7-2 11-1-2-3-4-6-4-10 0-12 13-14 14-7z" />
      <path d="M50 12v12M66 24l-9 9M72 46H58M60 70l-7-9M50 86V72M34 70l7-9M28 46h14M34 24l9 9" />
      <circle cx="50" cy="48" r="7" />
    </svg>
  );
}

function SectionHeader({ title, oatmilk }: { title: string; oatmilk?: boolean }) {
  return (
    <div className="relative mt-10 mb-8">
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-brown" />
        <span className="font-mono text-[11px] sm:text-xs font-bold tracking-wide">
          {title}
        </span>
        <span className="h-px flex-1 bg-brown" />
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
      <p className="mt-1 font-mono text-[11px] sm:text-xs">({drink.subtitle})</p>
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

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-white text-brown">
      <div className="relative mx-auto w-full max-w-xl flex-1 px-5 pt-10 pb-40 sm:px-8">
        <header className="text-center">
          <h1 className="font-display text-7xl sm:text-8xl leading-none tracking-wide">
            Drink Menu
          </h1>
          <div className="mx-auto mt-5 max-w-sm border-2 border-brown px-4 py-3 text-[13px] sm:text-sm leading-snug">
            <p>
              Give what you can! <strong className="font-bold">$5 suggested price.</strong>
            </p>
            <p>100% of proceeds go toward the Missions Fund.</p>
          </div>
        </header>

        {sections.map((section) => (
          <section key={section.title}>
            <SectionHeader title={section.title} oatmilk={section.oatmilk} />
            <div className="space-y-10">
              {section.drinks.map((drink) => (
                <DrinkItem key={drink.name} drink={drink} />
              ))}
            </div>
          </section>
        ))}

        <Flower className="pointer-events-none absolute bottom-4 right-4 h-24 w-24 rotate-12 sm:right-0 sm:h-28 sm:w-28" />
      </div>

      <footer className="bg-brown py-4 text-white">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <Flower className="h-6 w-6" />
            <span className="font-display text-xl tracking-widest leading-none">
              Common Grounds
            </span>
          </div>
          <p className="font-mono text-[9px] tracking-widest opacity-80">
            ANDREWS &nbsp;·&nbsp; 2026
          </p>
        </div>
      </footer>
    </main>
  );
}
