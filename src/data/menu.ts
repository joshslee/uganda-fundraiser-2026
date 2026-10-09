export type Drink = {
  name: string;
  subtitle: string;
  description: string;
  /** Where the name comes from; shown as a tooltip on the drink name. */
  story: string;
  cloudtop?: boolean;
};

export type DrinkSection = {
  title: string;
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
    drinks: [
      {
        name: "The Pearl",
        subtitle: "Iced Ugandan Vanilla Latte",
        description:
          "Flash-chilled espresso with Ugandan vanilla bean syrup and your choice of lactose-free or oat milk. Finished with nutmeg and orange zest.",
        story:
          "Named for Uganda’s enduring nickname, “The Pearl of Africa,” and centered around vanilla grown in Uganda.",
        cloudtop: true,
      },
      {
        name: "Lake Victoria Fizz",
        subtitle: "Iced Peach Cold Brew Tonic",
        description:
          "Bright, fruit-forward cold brew layered with peach purée, a splash of yuzu, and crisp Fever-Tree tonic. Finished with osmanthus petals.",
        story:
          "Named for Lake Victoria, Africa’s largest lake, whose northern shore is Uganda’s. Bright and effervescent, like light on the water.",
      },
    ],
  },
  {
    title: "Matcha Based Drinks",
    drinks: [
      {
        name: "Mabira Forest",
        subtitle: "Iced Matcha Latte",
        description:
          "Velvety ceremonial-grade matcha, lightly sweetened with honey or agave, with your choice of lactose-free or oat milk. Finished with buttery toffee bits.",
        story:
          "Named for Mabira, the rainforest between Kampala and Jinja. Deep green and velvety, like the canopy and the matcha.",
        cloudtop: true,
      },
      {
        name: "Nile Bloom",
        subtitle: "Iced Honey Yuzu Matcha Tonic",
        description:
          "Ceremonial-grade matcha with bright yuzu, honey, and crisp Fever-Tree tonic. Finished with candied yuzu peel.",
        story:
          "Named for the Nile, which begins its long journey at Jinja, Uganda. Honey and yuzu bloom over the matcha the way the river opens from the lake.",
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
        story:
          "Named for Kampala, Uganda’s capital built across seven hills. Light, cool, and caffeine-free, like an evening breeze over the city.",
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
      { name: "Cornbread" },
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
      { name: "Cornbread Cake" },
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
