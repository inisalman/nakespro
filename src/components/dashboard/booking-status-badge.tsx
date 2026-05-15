import { Badge } from "@/components/ui/badge";
import { BookingStatus } from "@/generated/prisma/enums";

const labelMap: Record<BookingStatus, { label: string; variant: "teal" | "blue" | "amber" | "slate" }> = {
  PENDING: { label: "Menunggu", variant: "amber" },
  ACCEPTED: { label: "Diterima", variant: "blue" },
  IN_PROGRESS: { label: "Berlangsung", variant: "teal" },
  COMPLETED: { label: "Selesai", variant: "teal" },
  REJECTED: { label: "Ditolak", variant: "slate" },
  CANCELLED_BY_PATIENT: { label: "Dibatalkan", variant: "slate" },
  CANCELLED_BY_PRACTITIONER: { label: "Dibatalkan", variant: "slate" },
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const meta = labelMap[status] ?? { label: status, variant: "slate" as const };
  return <Badge variant={meta.variant}>{meta.label}</Badge>;
}
