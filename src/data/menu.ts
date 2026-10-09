export type Drink = {
  name: string;
  subtitle: string;
  description: string;
  cloudtop?: boolean;
};

export type DrinkSection = {
  title: string;
  oatmilk?: boolean;
  drinks: Drink[];
};

export type Pastry = {
  name: string;
  note?: string;
};

export type PastryGroup = {
  title: string;
  items: Pastry[];
};

export const drinkSections: DrinkSection[] = [
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

/** Grouped for display. On desktop the first two groups form the left
 *  column and the last two the right, so keep the counts balanced. */
export const pastryGroups: PastryGroup[] = [
  {
    title: "Breads & Loaves",
    items: [
      { name: "Hot Honey Sourdough Bread" },
      { name: "Chocolate Chip Sourdough Bread" },
      { name: "Pumpkin Chocolate Chip Loaves" },
      { name: "Sourdough Loaves" },
      { name: "Banana Bread" },
      { name: "Cornbread Cake" },
    ],
  },
  {
    title: "Cookies",
    items: [
      { name: "Chocolate Chip Cookies" },
      { name: "Chocolate Chunk Cookies" },
      { name: "Pumpkin Cookies" },
    ],
  },
  {
    title: "Cakes & Sweets",
    items: [
      { name: "Financier" },
      { name: "Madeleine" },
      { name: "Cube Cake" },
      { name: "Banana Pudding" },
      { name: "Brownies" },
      { name: "Cream Puffs" },
    ],
  },
  {
    title: "Scones & Rolls",
    items: [
      { name: "Blueberry Lemon Scones" },
      { name: "Jalapeño Cheddar Scones" },
      { name: "Cinnamon Rolls" },
    ],
  },
];

/** Zelle payment link for Living Way Community Church (donate@lwccla.org). */
export const giveUrl =
  "https://enroll.zellepay.com/qr-codes/?data=eyJuYW1lIjoiTElWSU5HIFdBWSBDT01NVU5JVFkgQ0hVUkNIIE9GIExPUyIsInRva2VuIjoiZG9uYXRlQGx3Y2NsYS5vcmciLCJhY3Rpb24iOiJwYXltZW50In0=";
