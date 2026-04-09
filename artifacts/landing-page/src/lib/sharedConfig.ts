import { useState, useEffect } from "react";
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
