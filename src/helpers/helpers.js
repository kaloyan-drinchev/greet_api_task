export async function fetchData(apiLink) {
  try {
    const res = await fetch(apiLink);
    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getProducts(page, type, sort) {
  try {
    return await fetchData(
      `https://greet.bg/wp-json/wc/store/products?page=${page}${
        type ? `&orderby=${type}` : ""
      }${sort ? `&order=${sort}` : ""}`
    );
  } catch (error) {
    console.error(error);
  }
}

export async function getAllCategories() {
  const categories = [];
  try {
    const res = await fetchData(
      "https://greet.bg/wp-json/wc/store/products?page=1"
    );
    if (Array.isArray(res)) {
      res.forEach((product) => {
        product.categories.map((category) => {
          categories.push(category.name);
        });
      });
      return [...new Set(categories)];
    }
  } catch (error) {
    console.error(error);
  }
}
