"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const API_URL = "http://127.0.0.1:8000/items";

  const fetchItems = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setItems(data.items);
    } catch (err) {
      console.error(err);
    }
  };

  const addItem = async () => {
    if (!input) return;
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: input }),
    });
    setInput("");
    fetchItems();
  };

  const deleteItem = async (index: number) => {
    await fetch(`${API_URL}/${index}`, {
      method: "DELETE",
    });
    fetchItems();
  };

  const updateItem = async (index: number) => {
    const newName = prompt("Masukkan nama baru:");
    if (!newName) return;
    await fetch(`${API_URL}/${index}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-blue text-white">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white p-4 shadow-md flex justify-between">
        <h1 className="text-xl font-bold">Kelompok 4 App</h1>
        <button className="bg-white text-black px-4 py-1 rounded">Login</button>
      </nav>

      {/* Content */}
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Manajemen Items</h2>

        {/* Input + Button */}
        <div className="flex gap-2 mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Masukkan item"
            className="flex-1 p-2 border rounded text-white"
          />
          <button
            onClick={addItem}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Tambah
          </button>
        </div>

        {/* List Items */}
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="bg-gray-800 p-3 rounded shadow flex justify-between items-center"
            >
              <span>{item}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => updateItem(index)}
                  className="bg-yellow-400 text-black px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
