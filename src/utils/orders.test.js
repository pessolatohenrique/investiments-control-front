import { orderByText, orderByListFloat, orderByListDate } from "./orders";

describe("Order helper", () => {
  it("should order by text", () => {
    const list = [
      { name: "Sherlock Homes", category: "Suspense" },
      { name: "Morte no nilo", category: "Suspense" },
      { name: "Harry Potter e a pedra filosofal", category: "Fantasia" },
      { name: "Harry Potter e a câmera secreta", category: "Fantasia" },
      { name: "Harry Potter e o prisioneiro de Azkaban", category: "Fantasia" },
    ];

    const orderedList = orderByText(list, "name");
    expect(orderedList[0].name).toBe("Harry Potter e a câmera secreta");
    expect(orderedList[4].name).toBe("Sherlock Homes");
  });

  it("should order by number", () => {
    const list = [
      { name: "Sherlock Homes", category: "Suspense", pages: 500 },
      { name: "Morte no nilo", category: "Suspense", pages: 255 },
      {
        name: "Harry Potter e a pedra filosofal",
        category: "Fantasia",
        pages: 298,
      },
      {
        name: "Harry Potter e a câmera secreta",
        category: "Fantasia",
        pages: 251,
      },
      {
        name: "Harry Potter e o prisioneiro de Azkaban",
        category: "Fantasia",
        pages: 317,
      },
    ];

    const orderedList = orderByListFloat(list, "pages");
    expect(orderedList[0].name).toBe("Sherlock Homes");
    expect(orderedList[4].name).toBe("Harry Potter e a câmera secreta");
  });

  it("should order by date", () => {
    const list = [
      {
        name: "Sherlock Homes",
        category: "Suspense",
        released_at: "1995-05-26",
      },
      {
        name: "Morte no nilo",
        category: "Suspense",
        released_at: "2000-12-30",
      },
      {
        name: "Harry Potter e a pedra filosofal",
        category: "Fantasia",
        released_at: "1998-04-01",
      },
      {
        name: "Harry Potter e a câmera secreta",
        category: "Fantasia",
        released_at: "1999-09-29",
      },
      {
        name: "Harry Potter e o prisioneiro de Azkaban",
        category: "Fantasia",
        released_at: "2001-08-25",
      },
    ];

    const orderedList = orderByListDate(list, "pages");
    expect(orderedList[0].name).toBe("Sherlock Homes");
    expect(orderedList[4].name).toBe("Harry Potter e o prisioneiro de Azkaban");
  });
});
