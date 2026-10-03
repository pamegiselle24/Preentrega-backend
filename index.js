const BASE_URL = "https://fakestoreapi.com";
const [method, result, title, price, category] = process.argv.slice(2);

const getProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/${result}`);
    if (!res.ok) throw new Error(`Error del servidor: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("No se pudo cargar la página: ", error.message);
  } finally {
    console.log("Proceso terminado");
  }
};

const createProduct = async () => {
  try {
    const res = await fetch(`${BASE_URL}/${result}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        price: Number(price),
        category: category,
      }),
    });

    if (!res.ok) throw new Error(`Error en la solicitud: ${res.status}`);

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("Error al enviar el producto: ", error.message);
  } finally {
    console.log("Proceso terminado");
  }
};

const deleteProduct = async () => {
  try {
    const res = await fetch(`${BASE_URL}/${result}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error(`Error en la solicitud: ${res.status}`);

    const data = await res.json();
    console.log("Producto eliminado: ", data);
  } catch (error) {
    console.error("Error al eliminar el producto: ", error.message);
  } finally {
    console.log("Proceso terminado");
  }
};

if (method === "GET") {
  console.log(await getProducts());
} else if (method === "POST") {
  await createProduct();
} else if (method === "DELETE") {
  await deleteProduct();
}
