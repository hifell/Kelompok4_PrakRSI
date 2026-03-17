"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  const login = async () => {
    const res = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Palpalah",
        password: "12345",
      }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-20 px-10 bg-white dark:bg-black sm:items-start">

        {/* Logo */}
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        {/* TEXT + LOGIN */}
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">

          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            Frontend Login
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400">
            Klik tombol di bawah untuk mencoba login ke backend.
          </p>

          {/* BUTTON LOGIN */}
          <button
            onClick={login}
            className="px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black"
          >
            Login
          </button>

          {/* HASIL RESPONSE */}
          {message && (
            <p className="text-green-600 dark:text-green-400">
              {message}
            </p>
          )}
        </div>

        {/* FOOTER BUTTON (tetap dari template lama) */}
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 items-center justify-center rounded-full bg-foreground px-5 text-background hover:bg-[#383838]"
            href="https://vercel.com/new"
            target="_blank"
          >
            Deploy Now
          </a>

          <a
            className="flex h-12 items-center justify-center rounded-full border px-5 hover:bg-black/[.04]"
            href="https://nextjs.org/docs"
            target="_blank"
          >
            Documentation
          </a>
        </div>

      </main>
    </div>
  );
}