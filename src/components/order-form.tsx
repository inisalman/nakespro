"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/content";

export function OrderForm() {
  const [form, setForm] = useState({
    nama: "",
    kontak: "",
    jenis: "",
    paket: "Custom",
    pesan: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = encodeURIComponent(
      `Halo NakesPro.id, saya tertarik membuat website.\n\n` +
        `Nama: ${form.nama}\n` +
        `Kontak: ${form.kontak}\n` +
        `Jenis Praktik: ${form.jenis}\n` +
        `Paket: ${form.paket}\n` +
        `Pesan: ${form.pesan}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Nama
          </label>
          <input
            required
            type="text"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            className={inputClass}
            placeholder="Nama lengkap Anda"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            WhatsApp / Email
          </label>
          <input
            required
            type="text"
            value={form.kontak}
            onChange={(e) => setForm({ ...form, kontak: e.target.value })}
            className={inputClass}
            placeholder="08xx atau email"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Jenis Praktik
          </label>
          <input
            type="text"
            value={form.jenis}
            onChange={(e) => setForm({ ...form, jenis: e.target.value })}
            className={inputClass}
            placeholder="Perawat luka, bidan, fisioterapis..."
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Paket Diminati
          </label>
          <select
            value={form.paket}
            onChange={(e) => setForm({ ...form, paket: e.target.value })}
            className={inputClass}
          >
            <option value="Custom">Custom (Rp2.000.000)</option>
            <option value="Template">Template (Rp20.000/bulan)</option>
            <option value="Belum tahu">Masih bingung, mau konsultasi</option>
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Pesan
        </label>
        <textarea
          value={form.pesan}
          onChange={(e) => setForm({ ...form, pesan: e.target.value })}
          className={inputClass}
          rows={4}
          placeholder="Ceritakan kebutuhan website Anda..."
        />
      </div>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal px-6 py-3.5 font-semibold text-white transition-all hover:bg-teal/90 md:w-auto"
      >
        <Send className="h-4 w-4" />
        Kirim via WhatsApp
      </button>
    </form>
  );
}
