export function format_currency(
  amount: number,
  currencyCode: string,
  locale: string,
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "symbol",
  }).format(amount);
}

export function get_currency_symbole(
  currency_code: string,
  locale: string,
) {
  return (0).toLocaleString(locale, {
    style: "currency",
    currency: currency_code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).replace(/\d/g, "").trim();
}
