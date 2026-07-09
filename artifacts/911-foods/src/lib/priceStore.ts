const MENU_KEY = "911foods_menu_prices";
const DEAL_KEY = "911foods_deal_prices";

export function getMenuPrices(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(MENU_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveMenuPrices(prices: Record<string, number>) {
  localStorage.setItem(MENU_KEY, JSON.stringify(prices));
}

export function getDealPrices(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(DEAL_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveDealPrices(prices: Record<string, number>) {
  localStorage.setItem(DEAL_KEY, JSON.stringify(prices));
}
