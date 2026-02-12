import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");

  const loadProducts = async () => {
    const response = await api.get("/products");
    setProducts(response.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async () => {
    if (!name.trim()) return;

    await api.post("/products", { name });
    setName("");
    loadProducts();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Products</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product name"
      />
      <button onClick={addProduct}>Add</button>

      <ul>
        {products.map((p) => (
            <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
