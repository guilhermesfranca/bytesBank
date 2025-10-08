"use client";

import Image from "next/image";
import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Card {
  id: number;
  name: string;
  number: string;
  expiry: string;
  color: string;
  brand: string;
}

const API = "http://localhost:3001/wallet";

export default function Wallet() {
  const router = useRouter();

  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal / form state
  const [selectedCard, setSelectedCard] = useState<Card | null>(null); // se editar
  const [adding, setAdding] = useState(false); // se adicionar
  const [form, setForm] = useState<Partial<Card>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCards();
  }, []);

  async function fetchCards() {
    try {
      setLoading(true);
      const res = await fetch(API);
      const data = await res.json();
      setCards(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar cartões.");
    } finally {
      setLoading(false);
    }
  }

  // CREATE
  async function createCard(newCard: Partial<Card>) {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCard),
      });
      const created = await res.json();
      setCards((prev) => [created, ...prev]);
      closeModal();
    } catch (err) {
      console.error(err);
      setError("Erro ao criar cartão.");
    }
  }

  // UPDATE
  async function updateCard(id: number, updatedFields: Partial<Card>) {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      const updated = await res.json();
      setCards((prev) => prev.map((c) => (c.id === id ? updated : c)));
      closeModal();
    } catch (err) {
      console.error(err);
      setError("Erro ao atualizar cartão.");
    }
  }

  // DELETE
  async function deleteCard(id: number) {
    try {
      if (!confirm("Tem certeza que deseja excluir este cartão?")) return;
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setCards((prev) => prev.filter((c) => c.id !== id));
      closeModal();
    } catch (err) {
      console.error(err);
      setError("Erro ao excluir cartão.");
    }
  }

  // Abrir modal para editar
  const openModal = (card: Card) => {
    setSelectedCard(card);
    setAdding(false);
    setForm(card);
  };

  // Abrir modal para adicionar
  const openAddModal = () => {
    setSelectedCard(null);
    setAdding(true);
    setForm({
      name: "",
      number: "",
      expiry: "",
      color: "#111827",
      brand: "visa",
    });
  };

  const closeModal = () => {
    setSelectedCard(null);
    setAdding(false);
    setForm({});
    setError(null);
  };

  const handleChange = (key: keyof Card, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const getBrandIcon = (brand: string) => {
    const icons: Record<string, JSX.Element> = {
      visa: (
        <svg className="w-12 h-8" viewBox="0 0 48 32" fill="white" xmlns="http://www.w3.org/2000/svg">
          <text x="2" y="20" fontSize="14" fontWeight="bold">VISA</text>
        </svg>
      ),
      mastercard: (
        <svg className="w-12 h-8" viewBox="0 0 48 32" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="16" r="10" fill="#EB001B" />
          <circle cx="33" cy="16" r="10" fill="#F79E1B" />
        </svg>
      ),
      amex: (
        <svg className="w-12 h-8" viewBox="0 0 48 32" fill="white" xmlns="http://www.w3.org/2000/svg">
          <text x="2" y="20" fontSize="12" fontWeight="bold">AMEX</text>
        </svg>
      ),
    };
    return icons[brand] ?? null;
  };

  return (
    <div className="relative h-full w-full">
      {/* Background */}
      <div className="absolute inset-0">
        <Image src="/wbg.png" alt="background" fill className="object-cover" priority />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 h-full overflow-y-auto p-6">
        {/* Top bar: Voltar - Título - Adicionar */}
        
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.push("/")}
            className="px-3 py-2 rounded bg-white/10 text-[#22312c75] hover:bg-white/20"
          >
            ← Voltar
          </button>

          

          <button
            onClick={openAddModal}
            className="px-4 py-2 rounded-2xl bg-[#04f4a875] text-[#22312c75] hover:bg-[#04f4a9]"
          >
            +
          </button>
        </div>
        <h1 className="text-[#22312c75] text-center mb-2 text-3xl font-bold">Meus Cartões</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-white text-lg">Carregando...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="relative w-full h-48 rounded-2xl p-6 shadow-2xl transform transition-all hover:scale-105 cursor-pointer"
                style={{ backgroundColor: card.color }}
                onClick={() => openModal(card)}
              >
                <div className="absolute top-4 right-4">{getBrandIcon(card.brand)}</div>

                <div className="w-12 h-10 bg-yellow-400 rounded-md mt-4 mb-6 opacity-80"></div>

                <p className="text-white text-xl font-mono tracking-wider mb-4">{card.number}</p>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white/70 text-xs mb-1">Nome</p>
                    <p className="text-white font-semibold text-sm uppercase mb-1">{card.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/70 text-xs mb-1">Validade</p>
                    <p className="text-white font-semibold text-sm mb-1">{card.expiry}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && <p className="mt-4 text-red-400">{error}</p>}
      </div>

      {/* MODAL (Edit ou Add) */}
      {(selectedCard || adding) && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50">
          <div className="bg-[#1a1a1a] rounded-2xl p-6 w-[90%] max-w-md text-white space-y-4 shadow-2xl">
            <h2 className="text-2xl font-bold text-center">
              {adding ? "Adicionar Cartão" : "Editar Cartão"}
            </h2>

            <div className="space-y-3">
              <input
                value={form.name ?? ""}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Nome"
                className="w-full px-3 py-2 rounded bg-white/10 text-white"
              />
              <input
                value={form.number ?? ""}
                onChange={(e) => handleChange("number", e.target.value)}
                placeholder="Número do Cartão"
                className="w-full px-3 py-2 rounded bg-white/10 text-white"
              />
              <div className="flex gap-2">
                <input
                  value={form.expiry ?? ""}
                  onChange={(e) => handleChange("expiry", e.target.value)}
                  placeholder="Validade (MM/AA)"
                  className="w-full px-3 py-2 rounded bg-white/10 text-white"
                />
                <input
                  type="color"
                  value={form.color ?? "#111827"}
                  onChange={(e) => handleChange("color", e.target.value)}
                  className="rounded w-12 h-10 border-none"
                />
              </div>
              <select
                value={form.brand ?? "visa"}
                onChange={(e) => handleChange("brand", e.target.value)}
                className="w-full px-3 py-2 rounded bg-blue-700 text-white"
              >
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="amex">Amex</option>
              </select>
            </div>

            <div className="flex justify-between mt-6 gap-2">
              <button
                onClick={() => {
                  if (adding) {
                    // validação mínima antes de criar
                    if (!form.number || !form.name) {
                      setError("Preencha nome e número.");
                      return;
                    }
                    createCard(form);
                  } else if (selectedCard) {
                    updateCard(selectedCard.id, form);
                  }
                }}
                className="flex-1 px-4 py-2 bg-green-500 rounded-lg font-semibold"
              >
                {adding ? "Criar" : "Salvar"}
              </button>

              {!adding && selectedCard && (
                <button
                  onClick={() => deleteCard(selectedCard.id)}
                  className="px-4 py-2 bg-red-500 rounded-lg font-semibold"
                >
                  Excluir
                </button>
              )}

              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-700 rounded-lg font-semibold"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
