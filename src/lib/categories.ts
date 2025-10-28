const STORAGE_KEY = "notificationCategories";

const DEFAULT_CATEGORIES = [
  "Urgent Follow-up",
  "Document Required",
  "Approval Pending",
  "Survey Scheduled",
  "Payment Required",
];

export function getCategories(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CATEGORIES));
      return DEFAULT_CATEGORIES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_CATEGORIES;
    return parsed;
  } catch (e) {
    console.error("Failed to read categories from storage", e);
    return DEFAULT_CATEGORIES;
  }
}

export function setCategories(categories: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  } catch (e) {
    console.error("Failed to save categories to storage", e);
  }
}

export function addCategory(category: string) {
  const cats = getCategories();
  if (!cats.includes(category)) {
    cats.push(category);
    setCategories(cats);
  }
}

export function removeCategory(category: string) {
  const cats = getCategories().filter((c) => c !== category);
  setCategories(cats);
}

export default {
  getCategories,
  setCategories,
  addCategory,
  removeCategory,
};
