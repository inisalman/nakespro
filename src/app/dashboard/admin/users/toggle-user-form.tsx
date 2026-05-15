import { Button } from "@/components/ui/button";
import { toggleUserActive } from "@/lib/admin/actions";

export function ToggleUserForm({ userId, isActive, disabled }: { userId: string; isActive: boolean; disabled?: boolean }) {
  return (
    <form action={toggleUserActive}>
      <input type="hidden" name="userId" value={userId} />
      <Button type="submit" variant={isActive ? "danger" : "secondary"} disabled={disabled} className="h-9 px-3">
        {isActive ? "Nonaktifkan" : "Aktifkan"}
      </Button>
    </form>
  );
}
