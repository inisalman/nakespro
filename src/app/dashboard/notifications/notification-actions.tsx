import { Button } from "@/components/ui/button";
import { markAllNotificationsRead, markNotificationRead, markNotificationUnread } from "@/lib/notifications/actions";

export function MarkAllReadButton({ disabled }: { disabled?: boolean }) {
  return (
    <form action={markAllNotificationsRead}>
      <Button type="submit" variant="secondary" disabled={disabled}>
        Tandai semua dibaca
      </Button>
    </form>
  );
}

export function NotificationReadToggle({ notificationId, isRead }: { notificationId: string; isRead: boolean }) {
  return (
    <form action={isRead ? markNotificationUnread : markNotificationRead}>
      <input type="hidden" name="notificationId" value={notificationId} />
      <Button type="submit" variant="ghost" className="h-9 px-3">
        {isRead ? "Tandai unread" : "Tandai dibaca"}
      </Button>
    </form>
  );
}
