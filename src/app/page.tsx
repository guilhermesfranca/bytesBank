"use client";

import Image from "next/image";
import logo from "/public/logo.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/utils/functions";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (login(email, password)) {
      setError("");
      router.push("/wallet");
    } else {
      setError("Login ou Senha inválidos");
    }
  };

  return (
    <div className="relative h-full w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/bg.png"
          alt="background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 h-full flex flex-col items-center p-6">
        {/* Logo no topo */}
        <div >
          <Image src={logo} alt="logo" width={200} height={50} />
        </div>
        <div className="w-full">
          <h1 className="text-white text-4xl font-sans font-semibold ml-4 text-left">
            Login
          </h1>
        </div>

        {/* Inputs */}
        <div className="my-8 w-full">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-[#ffffffc2]"
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Insira aqui seu email"
            className="w-full px-4 py-3 rounded-lg border-2 mb-2 border-white focus:border-[#04f4a9] focus:outline-none text-white bg-[#04f4a875]"
          />
          <label className="block mb-2 text-sm font-medium text-[#ffffffc2]">
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Insira aqui sua senha"
            className="w-full px-4 py-3 rounded-lg border-2 border-white focus:border-[#04f4a9] focus:outline-none text-white bg-[#04f4a875]"
          />
        </div>
        <div className="w-full">
          <button
            onClick={handleLogin}
            className="w-full px-4 py-3 rounded-lg border-2 border-white hover:border-[#04f4a9] focus:outline-none text-white bg-[#04f4a875] cursor-pointer transition-all hover:bg-[#04f4a8]"
          >
            Entrar
          </button>
          <div className="w-full flex justify-end">
            <p className="text-left p-2 text-white">Esqueceu a senha?</p>
          </div>
          {/* Mensagem de erro */}
          {error && (
            <p className="text-white text-sm mt-2 text-center font-medium">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}