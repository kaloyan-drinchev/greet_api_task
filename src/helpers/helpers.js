async function fetchData(apiLink) {
  try {
    const res = await fetch(apiLink);
    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

async function getAllCategories() {
  try {
    const res = await fetchData(
      "https://greet.bg/wp-json/wc/store/products?page=1"
    );

    if (Array.isArray(res)) {
      const allCategories = [];
      res.forEach((person) => {
        person.categories.forEach((category) => {
          allCategories.push(category.name);
        });
      });
      const uniqueCategories = [...new Set(allCategories)];

      return uniqueCategories;
    }
  } catch (error) {
    console.log(error);
  }
}

export { fetchData, getAllCategories };
