"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createPractitionerService, updatePractitionerService, type PractitionerActionState } from "@/lib/practitioner/actions";

type Category = { id: string; name: string };
type Service = { id: string; categoryId: string; name: string; description: string | null; price: number; durationMinutes: number };

const initialState: PractitionerActionState = {};

export function ServiceForm({ categories, service }: { categories: Category[]; service?: Service }) {
  const actionFn = service ? updatePractitionerService : createPractitionerService;
  const [state, action, pending] = useActionState(actionFn, initialState);

  return (
    <form action={action} className="grid gap-5">
      {service ? <input type="hidden" name="serviceId" value={service.id} /> : null}
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Kategori</label>
        <Select name="categoryId" defaultValue={service?.categoryId ?? ""} required>
          <option value="">Pilih kategori</option>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </Select>
        {state.errors?.categoryId ? <p className="mt-2 text-sm text-red-600">{state.errors.categoryId[0]}</p> : null}
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Nama layanan</label>
        <Input name="name" defaultValue={service?.name ?? ""} required />
        {state.errors?.name ? <p className="mt-2 text-sm text-red-600">{state.errors.name[0]}</p> : null}
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Deskripsi</label>
        <Textarea name="description" defaultValue={service?.description ?? ""} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Harga</label>
          <Input name="price" type="number" min={1000} defaultValue={service?.price ?? ""} required />
          {state.errors?.price ? <p className="mt-2 text-sm text-red-600">{state.errors.price[0]}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Durasi (menit)</label>
          <Input name="durationMinutes" type="number" min={15} defaultValue={service?.durationMinutes ?? ""} required />
          {state.errors?.durationMinutes ? <p className="mt-2 text-sm text-red-600">{state.errors.durationMinutes[0]}</p> : null}
        </div>
      </div>
      {state.message ? <p className="text-sm text-red-600">{state.message}</p> : null}
      <Button type="submit" disabled={pending} className="w-fit">Simpan Layanan</Button>
    </form>
  );
}
