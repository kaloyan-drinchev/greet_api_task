async function fetchData() {
  try {
    const res = await fetch(
      "https://greet.bg/wp-json/wc/store/products?page=1"
    );
    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

export { fetchData };
