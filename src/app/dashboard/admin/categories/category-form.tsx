"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createServiceCategory, updateServiceCategory, type AdminActionState } from "@/lib/admin/actions";

type Category = { id: string; name: string; slug: string; description: string | null; isActive: boolean };
const initialState: AdminActionState = {};

export function CategoryForm({ category }: { category?: Category }) {
  const [state, action, pending] = useActionState(category ? updateServiceCategory : createServiceCategory, initialState);
  return (
    <form action={action} className="grid gap-5">
      {category ? <input type="hidden" name="categoryId" value={category.id} /> : null}
      <div><label className="mb-2 block text-sm font-semibold text-slate-700">Nama kategori</label><Input name="name" defaultValue={category?.name ?? ""} required />{state.errors?.name ? <p className="mt-2 text-sm text-red-600">{state.errors.name[0]}</p> : null}</div>
      <div><label className="mb-2 block text-sm font-semibold text-slate-700">Slug</label><Input name="slug" defaultValue={category?.slug ?? ""} placeholder="perawat-home-care" required />{state.errors?.slug ? <p className="mt-2 text-sm text-red-600">{state.errors.slug[0]}</p> : null}</div>
      <div><label className="mb-2 block text-sm font-semibold text-slate-700">Deskripsi</label><Textarea name="description" defaultValue={category?.description ?? ""} /></div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700"><input type="checkbox" name="isActive" defaultChecked={category?.isActive ?? true} className="h-4 w-4 rounded border-slate-300" /> Aktif</label>
      {state.message ? <p className="text-sm text-red-600">{state.message}</p> : null}
      <Button type="submit" disabled={pending} className="w-fit">Simpan kategori</Button>
    </form>
  );
}
