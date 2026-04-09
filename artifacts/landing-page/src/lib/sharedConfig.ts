import { useState, useEffect } from "react";

export const DEFAULT_CONFIG = {
  currency: "BRL",
  symbol: "R$",
  totalPrice: 350,
  entryPrice: 175,
  deliveryPrice: 175,
  anchorPrice: 890,
  paymentMethod: "pix" as "pix" | "transfer" | "cash" | "card",
  paymentKey: "005.173.370-61",
  whatsapp: "[SEU_WHATSAPP]",
  city: "[SUA_CIDADE]",
  country: "Brasil",
  salesName: "[SEU_NOME_OU_EMPRESA]",
};

export type AppConfig = typeof DEFAULT_CONFIG;

const STORAGE_KEY = "gbp_admin_config";
export const ADMIN_PASS_KEY = "gbp_admin_pass";
export const DEFAULT_ADMIN_PASS = "admin123";

export function getStoredConfig(): Partial<AppConfig> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {};
}

export function getMergedConfig(): AppConfig {
  return { ...DEFAULT_CONFIG, ...getStoredConfig() };
}

export function saveAdminConfig(updates: Partial<AppConfig>): void {
  try {
    const current = getStoredConfig();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...updates }));
    window.dispatchEvent(new Event("gbp_config_update"));
  } catch {}
}

export function getAdminPass(): string {
  return localStorage.getItem(ADMIN_PASS_KEY) || DEFAULT_ADMIN_PASS;
}

export function setAdminPass(pass: string): void {
  localStorage.setItem(ADMIN_PASS_KEY, pass);
}

export function useConfig(): AppConfig {
  const [config, setConfig] = useState<AppConfig>(getMergedConfig);
  useEffect(() => {
    const handler = () => setConfig(getMergedConfig());
    window.addEventListener("gbp_config_update", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("gbp_config_update", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return config;
}

export function useGeoCity(fallback: string): string {
  const [city, setCity] = useState(fallback);
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.city) setCity(data.city);
      })
      .catch(() => {});
  }, []);
  return city;
}
