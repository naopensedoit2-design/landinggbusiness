import { useState } from "react";
import {
  getMergedConfig,
  saveAdminConfig,
  getAdminPass,
  setAdminPass,
  DEFAULT_CONFIG,
} from "../lib/sharedConfig";

function GoogleDots() {
  return (
    <span style={{ fontWeight: 800, fontSize: "1.05em" }}>
      <span style={{ color: "#4285F4" }}>G</span>
      <span style={{ color: "#EA4335" }}>o</span>
      <span style={{ color: "#FBBC05" }}>o</span>
      <span style={{ color: "#4285F4" }}>g</span>
      <span style={{ color: "#34A853" }}>l</span>
      <span style={{ color: "#EA4335" }}>e</span>
    </span>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [passError, setPassError] = useState(false);

  const cfg = getMergedConfig();
  const [totalPrice, setTotalPrice] = useState(String(cfg.totalPrice));
  const [entryPrice, setEntryPrice] = useState(String(cfg.entryPrice));
  const [deliveryPrice, setDeliveryPrice] = useState(String(cfg.deliveryPrice));
  const [anchorPrice, setAnchorPrice] = useState(String(cfg.anchorPrice));
  const [saved, setSaved] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [passSaved, setPassSaved] = useState(false);

  function login() {
    if (passInput === getAdminPass()) {
      setAuthed(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  }

  function handleSave() {
    const total = parseFloat(totalPrice) || DEFAULT_CONFIG.totalPrice;
    const entry = parseFloat(entryPrice) || DEFAULT_CONFIG.entryPrice;
    const delivery = parseFloat(deliveryPrice) || DEFAULT_CONFIG.deliveryPrice;
    const anchor = parseFloat(anchorPrice) || DEFAULT_CONFIG.anchorPrice;
    saveAdminConfig({ totalPrice: total, entryPrice: entry, deliveryPrice: delivery, anchorPrice: anchor });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handlePassSave() {
    if (newPass.length >= 4) {
      setAdminPass(newPass);
      setNewPass("");
      setPassSaved(true);
      setTimeout(() => setPassSaved(false), 3000);
    }
  }

  function handleReset() {
    saveAdminConfig({
      totalPrice: DEFAULT_CONFIG.totalPrice,
      entryPrice: DEFAULT_CONFIG.entryPrice,
      deliveryPrice: DEFAULT_CONFIG.deliveryPrice,
      anchorPrice: DEFAULT_CONFIG.anchorPrice,
    });
    setTotalPrice(String(DEFAULT_CONFIG.totalPrice));
    setEntryPrice(String(DEFAULT_CONFIG.entryPrice));
    setDeliveryPrice(String(DEFAULT_CONFIG.deliveryPrice));
    setAnchorPrice(String(DEFAULT_CONFIG.anchorPrice));
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 14px", fontSize: 16, fontWeight: 600,
    border: "1.5px solid var(--line)", borderRadius: 10,
    background: "white", color: "var(--ink)", fontFamily: "inherit",
    outline: "none", boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 700, color: "var(--ink-faint)",
    textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6, display: "block",
  };

  const entryNum = parseFloat(entryPrice) || 0;
  const deliveryNum = parseFloat(deliveryPrice) || 0;
  const totalNum = parseFloat(totalPrice) || 0;
  const anchorNum = parseFloat(anchorPrice) || 0;
  const splitMismatch = Math.abs((entryNum + deliveryNum) - totalNum) > 0.01;

  if (!authed) {
    return (
      <div style={{
        minHeight: "100vh", background: "var(--surface)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      }}>
        <div style={{
          background: "white", borderRadius: 24, padding: "40px 32px",
          width: "100%", maxWidth: 400,
          border: "1.5px solid var(--line)",
          boxShadow: "0 8px 48px rgba(0,0,0,0.08)",
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>
              <GoogleDots /> Admin
            </div>
            <p style={{ fontSize: 14, color: "var(--ink-faint)" }}>Painel de controle · Google Business Profile</p>
          </div>

          <label style={labelStyle}>Senha</label>
          <input
            type="password"
            value={passInput}
            onChange={(e) => { setPassInput(e.target.value); setPassError(false); }}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="••••••••"
            style={{ ...inputStyle, borderColor: passError ? "#EA4335" : "var(--line)", marginBottom: 8 }}
            autoFocus
          />
          {passError && (
            <div style={{ color: "#EA4335", fontSize: 13, marginBottom: 12 }}>Senha incorreta. Tente novamente.</div>
          )}

          <button
            onClick={login}
            style={{
              width: "100%", padding: "13px", borderRadius: 12, border: "none",
              background: "#4285F4", color: "white", fontWeight: 700, fontSize: 15,
              cursor: "pointer", fontFamily: "inherit", marginTop: 4,
            }}
          >
            Entrar
          </button>

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <a href="/" style={{ fontSize: 13, color: "var(--ink-faint)", textDecoration: "none" }}>← Voltar para a Home</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface)", padding: "clamp(20px,5vw,48px) 16px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>
              <GoogleDots /> Admin
            </h1>
            <p style={{ fontSize: 14, color: "var(--ink-faint)" }}>Configurações de preço para Home 1 e Home 2</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <a href="/" style={{ padding: "8px 16px", borderRadius: 10, border: "1.5px solid var(--line)", background: "white", color: "var(--ink-soft)", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>Home 1</a>
            <a href="/home2" style={{ padding: "8px 16px", borderRadius: 10, border: "1.5px solid var(--line)", background: "white", color: "var(--ink-soft)", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>Home 2</a>
            <button onClick={() => setAuthed(false)} style={{ padding: "8px 16px", borderRadius: 10, border: "1.5px solid #EA433530", background: "#FEF2F2", color: "#EA4335", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Sair</button>
          </div>
        </div>

        {/* Prices card */}
        <div style={{ background: "white", borderRadius: 20, padding: "28px 24px", border: "1.5px solid var(--line)", marginBottom: 20 }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 6 }}>💰 Valores da proposta</h2>
          <p style={{ fontSize: 13, color: "var(--ink-faint)", marginBottom: 24, lineHeight: 1.5 }}>
            Esses valores aparecem em ambas as páginas (Home 1 e Home 2). Atualizações são instantâneas — sem necessidade de recarregar.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={labelStyle}>Preço de ancoragem (riscado)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-faint)", fontWeight: 600 }}>R$</span>
                <input
                  type="number" value={anchorPrice}
                  onChange={(e) => setAnchorPrice(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: 36 }}
                  min="0"
                />
              </div>
              <div style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 4 }}>Valor "de" que aparece riscado (ex: 890)</div>
            </div>

            <div>
              <label style={labelStyle}>Preço total</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-faint)", fontWeight: 600 }}>R$</span>
                <input
                  type="number" value={totalPrice}
                  onChange={(e) => setTotalPrice(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: 36 }}
                  min="0"
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Entrada (1ª parcela)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-faint)", fontWeight: 600 }}>R$</span>
                <input
                  type="number" value={entryPrice}
                  onChange={(e) => setEntryPrice(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: 36, borderColor: splitMismatch ? "#FBBC05" : "var(--line)" }}
                  min="0"
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Na entrega (2ª parcela)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-faint)", fontWeight: 600 }}>R$</span>
                <input
                  type="number" value={deliveryPrice}
                  onChange={(e) => setDeliveryPrice(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: 36, borderColor: splitMismatch ? "#FBBC05" : "var(--line)" }}
                  min="0"
                />
              </div>
            </div>
          </div>

          {splitMismatch && (
            <div style={{ marginTop: 12, padding: "10px 14px", background: "#FFF8E1", borderRadius: 10, border: "1.5px solid #FBBC0540", fontSize: 13, color: "#B8860B" }}>
              ⚠️ Atenção: entrada ({entryPrice}) + entrega ({deliveryPrice}) = R$ {(entryNum + deliveryNum).toFixed(2)}, mas o preço total está em R$ {totalPrice}. Verifique os valores.
            </div>
          )}

          {/* Preview */}
          <div style={{ marginTop: 20, padding: "16px", background: "var(--surface)", borderRadius: 12, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Pré-visualização:</div>
            {anchorNum > totalNum && (
              <span style={{ fontSize: 14, color: "var(--ink-faint)", textDecoration: "line-through" }}>R$ {anchorNum}</span>
            )}
            <span style={{ fontSize: 22, fontWeight: 800, color: "#4285F4" }}>R$ {totalPrice || "—"}</span>
            <span style={{ fontSize: 13, color: "var(--ink-faint)" }}>em 2x: R$ {entryPrice} + R$ {deliveryPrice}</span>
          </div>

          <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={handleSave}
              style={{
                padding: "12px 28px", borderRadius: 12, border: "none",
                background: saved ? "#34A853" : "#4285F4",
                color: "white", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit",
                transition: "background 0.3s", flex: 1,
              }}
            >
              {saved ? "✓ Salvo com sucesso!" : "Salvar alterações"}
            </button>
            <button
              onClick={handleReset}
              style={{
                padding: "12px 20px", borderRadius: 12,
                border: "1.5px solid var(--line)", background: "white",
                color: "var(--ink-soft)", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit",
              }}
            >
              Restaurar padrões
            </button>
          </div>
        </div>

        {/* Password change */}
        <div style={{ background: "white", borderRadius: 20, padding: "28px 24px", border: "1.5px solid var(--line)", marginBottom: 20 }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, marginBottom: 6 }}>🔑 Alterar senha de acesso</h2>
          <p style={{ fontSize: 13, color: "var(--ink-faint)", marginBottom: 20 }}>A senha é salva neste dispositivo.</p>

          <label style={labelStyle}>Nova senha (mínimo 4 caracteres)</label>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              type="password" value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Nova senha"
              style={{ ...inputStyle, flex: 1 }}
            />
            <button
              onClick={handlePassSave}
              disabled={newPass.length < 4}
              style={{
                padding: "12px 20px", borderRadius: 10, border: "none",
                background: passSaved ? "#34A853" : "#4285F4",
                color: "white", fontWeight: 700, fontSize: 14, cursor: newPass.length >= 4 ? "pointer" : "not-allowed",
                fontFamily: "inherit", opacity: newPass.length < 4 ? 0.5 : 1, transition: "all 0.3s", flexShrink: 0,
              }}
            >
              {passSaved ? "✓" : "Salvar"}
            </button>
          </div>
        </div>

        {/* Info card */}
        <div style={{ background: "#EDF2FF", borderRadius: 16, padding: "18px 20px", border: "1.5px solid #4285F420" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#4285F4", marginBottom: 6 }}>ℹ️ Como funciona</div>
          <ul style={{ fontSize: 13, color: "#4285F4", lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
            <li>Os preços são salvos neste navegador e aplicados imediatamente.</li>
            <li>Para usar em outro dispositivo, acesse <code>/admin</code> e configure novamente.</li>
            <li>A chave PIX e o WhatsApp são configurados no código (arquivo <code>sharedConfig.ts</code>).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
