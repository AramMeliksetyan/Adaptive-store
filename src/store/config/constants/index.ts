export const EBaseUrl = {
  API: import.meta.env.VITE_BASE_URL,
};

export enum ELocalStorage {
  token = "token",
  refreshToken = "refreshToken",
  expDate = "expDate",
  tabId = "tabId",
}

export enum ETheme {
  Light = "Light",
  Dark = "Dark",
}

export const DATE_FORMAT = "dd/MM/yyyy";
export const DATE_FORMAT_OPTIONAL = "MM/dd/yyyy";
export const HOUR_FORMAT = "HH:mm ";
