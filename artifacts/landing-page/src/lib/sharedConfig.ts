import { useState, useEffect } from "react";

export const DEFAULT_CONFIG = {
      currency: "BRL",
      symbol: "R$",
      totalPrice: 470,
      entryPrice: 235,
      deliveryPrice: 235,
      anchorPrice: 890,
      paymentMethod: "pix" as "pix" | "transfer" | "cash" | "card",
      paymentKey: "005.173.370-61",
      whatsapp: "+5551985556993",
      city: "",
      country: "Brasil",
      salesName: "Leonardo",
};

export type AppConfig = typeof DEFAULT_CONFIG;

const BIN_ID = "69d7250336566621a8928d32";
const API_KEY = "$2a$10$ZFOZm7rwHfh7FlShxfePVOoHK1nJy44DsYs5rQOV9n46NsUWm9FoO";
const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const HEADERS = { "Content-Type": "application/json", "X-Master-Key": API_KEY };

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

export async function fetchCloudConfig(): Promise<Partial<AppConfig>> {
      try {
              const res = await fetch(`${BIN_URL}/latest`, { headers: { "X-Master-Key": API_KEY } });
              if (!res.ok) return {};
              const data = await res.json();
              return data.record || {};
      } catch {
              return {};
      }
}

export async function saveAdminConfig(updates: Partial<AppConfig>): Promise<void> {
      try {
              const current = getMergedConfig();
              const merged = { ...current, ...updates };
              localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
              window.dispatchEvent(new Event("gbp_config_update"));
              await fetch(BIN_URL, {
                        method: "PUT",
                        headers: HEADERS,
                        body: JSON.stringify(merged),
              });
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
          fetchCloudConfig().then((cloud) => {
                    if (Object.keys(cloud).length > 0) {
                                const merged = { ...DEFAULT_CONFIG, ...cloud };
                                localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
                                setConfig(merged as AppConfig);
                    }
          });
  }, []);

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
      return fallback;
}
