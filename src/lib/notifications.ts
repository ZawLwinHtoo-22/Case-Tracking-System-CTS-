export type NotificationItem = {
  notificationNo: string;
  proposalNo?: string | null;
  sender?: string;
  category?: string;
  description?: string;
  createdAt: string; // ISO
};

const STORAGE_KEY = "cts_notifications_v1";

export function getNotifications(): NotificationItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as NotificationItem[];
  } catch (e) {
    console.error("Failed to read notifications", e);
    return [];
  }
}

export function addNotification(item: NotificationItem) {
  try {
    const list = getNotifications();
    list.unshift(item); // newest first
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Failed to store notification", e);
  }
}

export function findNotificationByProposal(proposalNo?: string | null) {
  if (!proposalNo) return undefined;
  return getNotifications().find(n => n.proposalNo === proposalNo);
}
