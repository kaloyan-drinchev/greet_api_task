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

export async function getProducts(page, type, order) {
  try {
    return await fetchData(
      `https://greet.bg/wp-json/wc/store/products?page=${page}&orderby=${type}&order=${order}`
    );
  } catch (error) {
    console.error(error);
  }
}

export async function getAllCategories() {
  const categories = [];
  try {
    const res = await fetchData(
      "https://greet.bg/wp-json/wc/store/products/categories?orderby=count&order=asc"
    );
    if (Array.isArray(res)) {
      res.forEach((person) => {
        person.map((category) => {
          categories.push(category.name);
        });
      });
      return [...new Set(...categories)];
    }
  } catch (error) {
    console.error(error);
  }
}
