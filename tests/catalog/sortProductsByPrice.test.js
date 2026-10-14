const products = require("../../src/data/products");
const { sortProductsByPrice } = require("../../src/catalog");

describe("sortProductsByPrice", () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    const sortedProducts = sortProductsByPrice(products, "asc").map(
      (product) => product.id,
    );

    expect(sortedProducts).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("все товары без направления сортируются как [3, 6, 5, 4, 2, 1]", () => {
    const sortedProducts = sortProductsByPrice(products).map(
      (product) => product.id,
    );

    expect(sortedProducts).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const filteredProducts = products.filter((product) =>
      [1, 3, 4].includes(product.id),
    );
    const sortedProducts = sortProductsByPrice(filteredProducts, "asc").map(
      (product) => product.id,
    );

    expect(sortedProducts).toEqual([3, 4, 1]);
  });

  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    const sortedProducts = sortProductsByPrice(products, "desc").map(
      (product) => product.id,
    );

    expect(sortedProducts).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const filteredProducts = products.filter((product) =>
      [3, 1, 4].includes(product.id),
    );
    const sortedProducts = sortProductsByPrice(filteredProducts, "desc").map(
      (product) => product.id,
    );

    expect(sortedProducts).toEqual([1, 4, 3]);
  });

  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const filteredProducts = products.filter((product) =>
      [5, 2, 6].includes(product.id),
    );
    const sortedProducts = sortProductsByPrice(filteredProducts, "desc").map(
      (product) => product.id,
    );

    expect(sortedProducts).toEqual([2, 5, 6]);
  });

  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const filteredProducts = products.filter((product) =>
      [1, 3, 4].includes(product.id),
    );
    const filteredProductsCopy = JSON.parse(JSON.stringify(filteredProducts));

    sortProductsByPrice(filteredProducts, "asc");

    expect(filteredProducts).toEqual(filteredProductsCopy);
  });

  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const filteredProducts = products.filter((product) =>
      [1, 3, 4].includes(product.id),
    );
    const filteredProductsCopy = JSON.parse(JSON.stringify(filteredProducts));

    sortProductsByPrice(filteredProducts, "desc");

    expect(filteredProducts).toEqual(filteredProductsCopy);
  });

  test("направление по умолчанию не меняет исходный массив всех товаров", () => {
    const productsCopy = JSON.parse(JSON.stringify(products));

    sortProductsByPrice(products, "asc");

    expect(products).toEqual(productsCopy);
  });
});
