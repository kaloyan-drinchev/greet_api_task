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

export async function getAllCategories(data) {
  const categories = [];
  if (Array.isArray(data)) {
    data.forEach((product) => {
      product.categories.map((category) => {
        categories.push(category.name);
      });
    });
    const categoryNames = [...new Set(categories)];

    const allCategories = categoryNames.map((category, index) => ({
      id: index + 1,
      name: category,
      data: { name: category, status: false },
    }));

    return allCategories;
  }
}
