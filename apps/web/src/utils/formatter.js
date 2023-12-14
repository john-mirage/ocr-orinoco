export const formatLocale = "fr-FR";

export const formatOptions = {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
}

export function formatProductPrice(cameraPrice) {
  if (typeof cameraPrice === "number") {
    const price = cameraPrice / 100;
    const numberFormatter = new Intl.NumberFormat(formatLocale, formatOptions);
    return numberFormatter.format(price);
  } else {
    throw new Error("The camera price must be a number");
  }
}