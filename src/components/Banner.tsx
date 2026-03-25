"use client";

import { useState, useEffect } from "react";

export default function Banner() {
  const [text, setText] = useState("");
  const fullText = "Hi, I'm Lenard Palce — your Web Developer.";

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) clearInterval(interval);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f1115]"></div>

      <div className="relative z-10 mt-20">

        {/* Typing Animation */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {text}
          <span className="border-r-2 border-green-400 animate-pulse ml-1"></span>
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          I build modern, scalable, and clean web applications with a strong user experience.
        </p>

        <a
          href="#contact"
          className="px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-semibold rounded-md transition"
        >
          Let’s Work Together
        </a>

      </div>
    </section>
  );
}
