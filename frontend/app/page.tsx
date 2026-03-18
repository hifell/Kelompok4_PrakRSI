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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      
      {/* Navbar */}
      <nav className="bg-gray-900 text-white p-4 shadow-md flex justify-between">
        <h1 className="text-xl font-bold">Kelompok 4 App</h1>
        <button className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition">
          Login
        </button>
      </nav>

      {/* Content */}
      <div className="p-6 max-w-xl mx-auto">
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700">

          <h2 className="text-2xl font-semibold mb-2">Manajemen Items</h2>

          {/* Statistik */}
          <p className="text-gray-400 mb-4">
            Total Items:{" "}
            <span className="text-white font-semibold">{items.length}</span>
          </p>

          {/* Input + Button */}
          <div className="flex gap-2 mb-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Masukkan item"
              className="flex-1 p-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addItem}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 transition"
            >
              Tambah
            </button>
          </div>

          {/* List / Empty State */}
          {items.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">
              <p className="text-lg">📭 Belum ada item</p>
              <p className="text-sm">Tambahkan item pertama kamu di atas</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="bg-gray-800 p-4 rounded-xl shadow flex justify-between items-center hover:bg-gray-700 transition duration-300"
                >
                  <span className="text-lg">{item}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateItem(index)}
                      className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

        </div>
      </div>
    </div>
  );
}