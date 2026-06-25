export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("af-ZA", {
    style: "currency",
    currency: "ZAR",
  }).format(cents);
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "Nog nie vasgestel nie";
  return new Intl.DateTimeFormat("af-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
