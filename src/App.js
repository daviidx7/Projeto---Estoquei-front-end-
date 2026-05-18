import { useState, useEffect } from "react";
const API = "https://estoquei-backend-daviidx7-production.up.railway.app";
const PLANS = [
  { name: "Básico", price: "R$ 49", desc: "Ideal para autônomos e MEI", features: ["Até 200 produtos", "1 usuário", "Alertas de estoque baixo", "Relatórios básicos"], highlight: false, link: "https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=a984113c814a43c8859852580e069600" },
  { name: "Profissional", price: "R$ 119", desc: "Para pequenas empresas", features: ["Produtos ilimitados", "Até 5 usuários", "Relatórios avançados", "Exportar para Excel", "Suporte prioritário"], highlight: true, link: "https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=e252c750eb2c42c6b6af6d7d11d4f1b8" },
  { name: "Empresarial", price: "R$ 249", desc: "Para múltiplas filiais", features: ["Tudo do Profissional", "Usuários ilimitados", "Multi-filial", "API de integração", "Gerente de conta dedicado"], highlight: false, link: "https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=9d5bce546f304063ae7b8844f654cba0" },
];
async function apiFetch(path, method = "GET", body = null, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { method, headers, body: body ? JSON.stringify(body) : null });
  return res.json();
}
const inputStyle = { display: "block", width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 14, marginBottom: 12, boxSizing: "border-box", outline: "none" };

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return isMobile;
}

function BlockedPage({ type, onLogout }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ minHeight: "100vh", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 40, width: isMobile ? "90%" : 500, boxShadow: "0 8px 32px rgba(0,0,0,0.08)", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>{type === "trial_expired" ? "⏰" : "🔒"}</div>
        <h2 style={{ fontWeight: 800, fontSize: 24, color: "#0A2540", marginBottom: 8 }}>
          {type === "trial_expired" ? "Seu período grátis acabou!" : "Assinatura expirada!"}
        </h2>
        <p style={{ color: "#64748B", fontSize: 15, marginBottom: 32 }}>
          {type === "trial_expired" ? "Seus 5 dias grátis terminaram. Escolha um plano para continuar." : "Sua assinatura expirou. Renove para continuar acessando seu estoque."}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
          {PLANS.map(p => (
            <div key={p.name} style={{ background: p.highlight ? "#0F4C81" : "#F8FAFC", borderRadius: 12, padding: 20, border: p.highlight ? "none" : "1px solid #E2E8F0" }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: p.highlight ? "#fff" : "#0A2540", marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontWeight: 800, fontSize: 24, color: p.highlight ? "#F97316" : "#0F4C81", marginBottom: 12 }}>{p.price}<span style={{ fontSize: 12, fontWeight: 400, opacity: 0.7 }}>/mês</span></div>
              <button onClick={() => window.open(p.link, "_blank")} style={{ width: "100%", padding: "10px 0", borderRadius: 8, border: "none", background: p.highlight ? "#F97316" : "#0F4C81", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Assinar agora</button>
            </div>
          ))}
        </div>
        <button onClick={onLogout} style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer", fontSize: 13 }}>Sair da conta</button>
      </div>
    </div>
  );
}

function LandingPage({ onGoToRegister, onGoToLogin }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ fontFamily: "sans-serif", background: "#F8FAFC", minHeight: "100vh" }}>
      <nav style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, zIndex: 100 }}>
        <span style={{ fontWeight: 800, fontSize: 22, color: "#0F4C81" }}>estoquei</span>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onGoToLogin} style={{ background: "transparent", color: "#0F4C81", border: "1.5px solid #0F4C81", borderRadius: 8, padding: "8px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Entrar</button>
          <button onClick={onGoToRegister} style={{ background: "#F97316", color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Criar conta grátis</button>
        </div>
      </nav>
      <section style={{ padding: "80px 5%", textAlign: "center" }}>
        <h1 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 800, color: "#0A2540", marginBottom: 16 }}>Controle seu <span style={{ color: "#F97316" }}>estoque</span> sem complicação.</h1>
        <p style={{ fontSize: 18, color: "#64748B", marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>Sistema de gestão para pequenos e médios negócios. Evite perdas e nunca fique sem produto.</p>
        <button onClick={onGoToRegister} style={{ background: "#F97316", color: "#fff", border: "none", borderRadius: 10, padding: "16px 36px", fontWeight: 700, fontSize: 18, cursor: "pointer" }}>Começar grátis por 5 dias →</button>
        <p style={{ fontSize: 13, color: "#64748B", marginTop: 12 }}>✓ Sem cartão de crédito &nbsp;&nbsp; ✓ Cancela quando quiser</p>
      </section>
      <section style={{ padding: "60px 5%", background: "#fff" }}>
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 48, color: "#0A2540" }}>Planos simples, sem surpresas</h2>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 24, maxWidth: 1000, margin: "0 auto" }}>
          {PLANS.map(p => (
            <div key={p.name} style={{ background: p.highlight ? "#0F4C81" : "#fff", color: p.highlight ? "#fff" : "#0A2540", borderRadius: 16, border: p.highlight ? "none" : "1px solid #E2E8F0", padding: 32, boxShadow: p.highlight ? "0 12px 40px rgba(15,76,129,0.25)" : "none", transform: p.highlight ? "scale(1.03)" : "none", position: "relative" }}>
              {p.highlight && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#F97316", color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 16px", borderRadius: 20 }}>MAIS POPULAR</div>}
              <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 4 }}>{p.name}</h3>
              <p style={{ fontSize: 13, opacity: 0.7, marginBottom: 16 }}>{p.desc}</p>
              <div style={{ fontWeight: 800, fontSize: 36, marginBottom: 4 }}>{p.price}</div>
              <p style={{ fontSize: 13, opacity: 0.6, marginBottom: 24 }}>/mês por empresa</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10 }}>
                {p.features.map(f => <li key={f} style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}><span style={{ color: p.highlight ? "#6EE7B7" : "#16A34A", fontWeight: 700 }}>✓</span>{f}</li>)}
              </ul>
              <button onClick={onGoToRegister} style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: p.highlight ? "none" : "1.5px solid #0F4C81", background: p.highlight ? "#F97316" : "transparent", color: p.highlight ? "#fff" : "#0F4C81", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Começar grátis</button>
            </div>
          ))}
        </div>
      </section>
      <footer style={{ background: "#0A2540", color: "#94A3B8", padding: "40px 5%", textAlign: "center", marginTop: 60 }}>
        <div style={{ fontWeight: 800, fontSize: 20, color: "#fff", marginBottom: 12 }}>estoquei</div>
        <p style={{ fontSize: 13 }}>© 2025 Estoquei. Todos os direitos reservados.</p>
        <p style={{ fontSize: 13, marginTop: 8 }}>Feito por <a href="https://instagram.com/daviiddev" target="_blank" rel="noreferrer" style={{ color: "#94A3B8", fontWeight: 700 }}>@daviiddev</a></p>
      </footer>
    </div>
  );
}

function AuthPage({ onLogin, onBack, initialMode }) {
  const [mode, setMode] = useState(initialMode || "login");
  const [form, setForm] = useState({ name: "", email: "", password: "", companyName: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit() {
    setError("");
    if (!form.email || !form.password) { setError("Preencha o e-mail e a senha."); return; }
    if (mode === "register" && (!form.name || !form.companyName)) { setError("Preencha todos os campos."); return; }
    setLoading(true);
    try {
      const data = await apiFetch(mode === "login" ? "/api/login" : "/api/register", "POST", form);
      if (data.error) { setError(data.error); setLoading(false); return; }
      if (!data.token || !data.user) { setError("Erro ao autenticar. Tente novamente."); setLoading(false); return; }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessStatus", data.accessStatus || "ok");
      onLogin(data.token, data.user, data.accessStatus || "ok");
    } catch { setError("Erro de conexão. Verifique sua internet."); }
    setLoading(false);
  }
  return (
    <div style={{ minHeight: "100vh", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 40, width: 400, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <h1 style={{ color: "#0F4C81", fontSize: 28, margin: 0 }}>estoquei</h1>
          <span onClick={onBack} style={{ fontSize: 13, color: "#64748B", cursor: "pointer" }}>← Voltar</span>
        </div>
        <h2 style={{ fontSize: 20, marginBottom: 6 }}>{mode === "login" ? "Entrar na sua conta" : "Criar conta grátis"}</h2>
        <p style={{ color: "#64748B", fontSize: 14, marginBottom: 24 }}>{mode === "register" ? "✓ 5 dias grátis, sem cartão de crédito!" : "Bem-vindo de volta!"}</p>
        {mode === "register" && <>
          <input placeholder="Seu nome" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} />
          <input placeholder="Nome da empresa / loja" value={form.companyName} onChange={e => setForm(f => ({ ...f, companyName: e.target.value }))} style={inputStyle} />
        </>}
        <input placeholder="E-mail" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} />
        <input placeholder="Senha" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleSubmit()} style={inputStyle} />
        {error && <div style={{ background: "#FEF2F2", color: "#DC2626", borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>{error}</div>}
        <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "13px 0", borderRadius: 10, border: "none", background: loading ? "#94A3B8" : "#0F4C81", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer", marginBottom: 16 }}>
          {loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar conta grátis"}
        </button>
        <p style={{ textAlign: "center", fontSize: 14, color: "#64748B" }}>
          {mode === "login" ? "Não tem conta? " : "Já tem conta? "}
          <span onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }} style={{ color: "#0F4C81", fontWeight: 700, cursor: "pointer" }}>
            {mode === "login" ? "Cadastre-se grátis" : "Entrar"}
          </span>
        </p>
      </div>
    </div>
  );
}

function Dashboard({ token, user, onLogout, onBlocked }) {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [summary, setSummary] = useState({ total: 0, outOfStock: 0, lowStock: 0, totalValue: 0 });
  const [alerts, setAlerts] = useState([]);
  const [daysLeft, setDaysLeft] = useState(null);
  const [search, setSearch] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddMovement, setShowAddMovement] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", category: "", quantity: "", minQty: "", price: "" });
  const [newMovement, setNewMovement] = useState({ productId: "", type: "entrada", quantity: "" });
  const [toast, setToast] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  useEffect(() => { loadAll(); }, [token]); // eslint-disable-line react-hooks/exhaustive-deps
  async function loadAll() {
    setLoadingData(true);
    const status = await apiFetch("/api/status", "GET", null, token);
    if (!status || status.error === "Token invalido" || status.error === "Nao autorizado") { onLogout(); return; }
    if (status.accessStatus === "trial_expired" || status.accessStatus === "subscription_expired") { onBlocked(status.accessStatus); return; }
    setDaysLeft(status.daysLeft);
    const [p, m, s, a] = await Promise.all([apiFetch("/api/products","GET",null,token), apiFetch("/api/movements","GET",null,token), apiFetch("/api/summary","GET",null,token), apiFetch("/api/alerts","GET",null,token)]);
    if (p.error === "trial_expired" || p.error === "subscription_expired") { onBlocked(p.error); return; }
    if (Array.isArray(p)) setProducts(p);
    if (Array.isArray(m)) setMovements(m);
    if (s.total !== undefined) setSummary(s);
    if (Array.isArray(a)) setAlerts(a);
    setLoadingData(false);
  }
  function showToast(msg, type = "success") { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); }
  async function handleAddProduct() {
    if (!newProduct.name) return;
    const data = await apiFetch("/api/products", "POST", newProduct, token);
    if (data.error) { showToast(data.error, "error"); return; }
    setShowAddProduct(false); setNewProduct({ name: "", category: "", quantity: "", minQty: "", price: "" });
    showToast("Produto adicionado!"); loadAll();
  }
  async function handleDeleteProduct(id) {
    if (!window.confirm("Apagar este produto?")) return;
    await apiFetch(`/api/products/${id}`, "DELETE", null, token);
    showToast("Produto removido!"); loadAll();
  }
  async function handleAddMovement() {
    if (!newMovement.productId || !newMovement.quantity) return;
    const data = await apiFetch("/api/movements", "POST", newMovement, token);
    if (data.error) { showToast(data.error, "error"); return; }
    setShowAddMovement(false); setNewMovement({ productId: "", type: "entrada", quantity: "" });
    showToast("Movimentação registrada!"); loadAll();
  }
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || (p.category||"").toLowerCase().includes(search.toLowerCase()));
  const getStatus = p => p.quantity === 0 ? "out" : p.quantity <= p.minQty ? "low" : "ok";
  const navItems = [{ key: "overview", label: "Visão Geral", icon: "⊞" }, { key: "products", label: "Produtos", icon: "📦" }, { key: "movements", label: "Movimentações", icon: "↕️" }, { key: "alerts", label: "Alertas", icon: "🔔", badge: alerts.length }];
  return (
    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", height: "100vh", fontFamily: "sans-serif", background: "#F1F5F9" }}>
      {isMobile ? (
        <>
          <div style={{ background: "#0A2540", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>estoquei</span>
            <button onClick={() => setShowMenu(!showMenu)} style={{ background: "none", border: "none", color: "#fff", fontSize: 24, cursor: "pointer" }}>☰</button>
          </div>
          {showMenu && (
            <div style={{ background: "#0A2540", padding: "8px 12px" }}>
              {navItems.map(item => (
                <button key={item.key} onClick={() => { setActiveTab(item.key); setShowMenu(false); }} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", background: activeTab === item.key ? "rgba(255,255,255,0.1)" : "transparent", color: activeTab === item.key ? "#fff" : "#94A3B8", cursor: "pointer", fontSize: 14, marginBottom: 2, textAlign: "left" }}>
                  {item.icon} {item.label}
                  {item.badge > 0 && <span style={{ marginLeft: "auto", background: "#DC2626", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 10, padding: "2px 6px" }}>{item.badge}</span>}
                </button>
              ))}
              <button onClick={onLogout} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", background: "transparent", color: "#475569", cursor: "pointer", fontSize: 13, textAlign: "left" }}>🚪 Sair</button>
            </div>
          )}
        </>
      ) : (
        <aside style={{ width: 220, background: "#0A2540", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 20 }}>estoquei</div>
            <div style={{ marginTop: 10, fontSize: 13, color: "#94A3B8" }}>{user.company}</div>
            <div style={{ fontSize: 11, color: "#475569" }}>{user.name}</div>
            {daysLeft !== null && daysLeft <= 5 && (
              <div style={{ marginTop: 10, background: daysLeft <= 2 ? "#DC2626" : "#D97706", borderRadius: 6, padding: "4px 8px", fontSize: 11, color: "#fff", fontWeight: 700 }}>
                ⚠️ {daysLeft} dia(s) restantes
              </div>
            )}
          </div>
          <nav style={{ flex: 1, padding: "16px 12px" }}>
            {navItems.map(item => (
              <button key={item.key} onClick={() => setActiveTab(item.key)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", background: activeTab === item.key ? "rgba(255,255,255,0.1)" : "transparent", color: activeTab === item.key ? "#fff" : "#94A3B8", cursor: "pointer", fontSize: 14, marginBottom: 2, textAlign: "left" }}>
                {item.icon} {item.label}
                {item.badge > 0 && <span style={{ marginLeft: "auto", background: "#DC2626", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 10, padding: "2px 6px" }}>{item.badge}</span>}
              </button>
            ))}
          </nav>
          <div style={{ padding: "12px 12px 20px" }}>
            <button onClick={onLogout} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", background: "transparent", color: "#475569", cursor: "pointer", fontSize: 13, textAlign: "left" }}>🚪 Sair</button>
          </div>
        </aside>
      )}
      <main style={{ flex: 1, overflow: "auto" }}>
        <div style={{ background: "#fff", borderBottom: "1px solid #E2E8F0", padding: "0 16px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>{activeTab === "overview" && "Visão Geral"}{activeTab === "products" && "Produtos"}{activeTab === "movements" && "Movimentações"}{activeTab === "alerts" && "Alertas"}</h1>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {activeTab === "products" && <><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." style={{ padding: "7px 10px", borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 13, outline: "none", width: isMobile ? 100 : 160 }} /><button onClick={() => setShowAddProduct(true)} style={{ background: "#0F4C81", color: "#fff", border: "none", borderRadius: 8, padding: "8px 12px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>+ Produto</button></>}
            {activeTab === "movements" && <button onClick={() => setShowAddMovement(true)} style={{ background: "#0F4C81", color: "#fff", border: "none", borderRadius: 8, padding: "8px 12px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>+ Movimentação</button>}
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#0F4C81", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>{user.name?.[0]?.toUpperCase()}</div>
          </div>
        </div>
        <div style={{ padding: isMobile ? 16 : 28 }}>
          {loadingData && <div style={{ textAlign: "center", padding: 60, color: "#64748B" }}>Carregando...</div>}
          {!loadingData && activeTab === "overview" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
                {[{ label: "Produtos", value: summary.total, color: "#0F4C81", icon: "📦" }, { label: "Valor em Estoque", value: `R$ ${Number(summary.totalValue).toLocaleString("pt-BR",{minimumFractionDigits:2})}`, color: "#16A34A", icon: "💰" }, { label: "Estoque Baixo", value: summary.lowStock, color: "#D97706", icon: "⚠️" }, { label: "Esgotados", value: summary.outOfStock, color: "#DC2626", icon: "🚫" }].map(s => (
                  <div key={s.label} style={{ background: "#fff", borderRadius: 12, padding: "16px", border: "1px solid #E2E8F0" }}>
                    <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                    <div style={{ fontWeight: 800, fontSize: isMobile ? 18 : 24, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: 20 }}>
                <h3 style={{ fontWeight: 700, fontSize: 15, margin: "0 0 18px" }}>Últimas movimentações</h3>
                {movements.length === 0 && <p style={{ color: "#64748B" }}>Nenhuma movimentação ainda.</p>}
                {movements.slice(0,5).map(m => (
                  <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #E2E8F0" }}>
                    <div><div style={{ fontWeight: 500, fontSize: 14 }}>{m.product?.name}</div><div style={{ fontSize: 12, color: "#64748B" }}>{new Date(m.createdAt).toLocaleString("pt-BR")} · {m.user?.name}</div></div>
                    <span style={{ fontWeight: 700, fontSize: 13, color: m.type==="entrada"?"#16A34A":"#DC2626", background: m.type==="entrada"?"#F0FDF4":"#FEF2F2", padding: "3px 10px", borderRadius: 6 }}>{m.type==="entrada"?"+":"-"}{m.quantity} un.</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!loadingData && activeTab === "products" && (
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "auto" }}>
              {filtered.length === 0 ? <div style={{ padding: 40, textAlign: "center", color: "#64748B" }}>{products.length === 0 ? "Nenhum produto ainda. Clique em + Produto!" : "Nenhum encontrado."}</div> :
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
                  <thead><tr style={{ background: "#F8FAFC" }}>{["Produto","Categoria","Qtd.","Mín.","Preço","Status",""].map(h => <th key={h} style={{ padding: "12px 16px", fontSize: 12, fontWeight: 700, color: "#64748B", textAlign: "left", borderBottom: "1px solid #E2E8F0", textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
                  <tbody>{filtered.map((p,i) => { const st = getStatus(p); return (
                    <tr key={p.id} style={{ background: i%2===0?"#fff":"#FAFAFA" }}>
                      <td style={{ padding: "12px 16px", fontWeight: 500 }}>{p.name}</td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "#64748B" }}>{p.category||"-"}</td>
                      <td style={{ padding: "12px 16px", fontWeight: 700, color: st==="out"?"#DC2626":st==="low"?"#D97706":"#0A2540" }}>{p.quantity}</td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "#64748B" }}>{p.minQty}</td>
                      <td style={{ padding: "12px 16px", fontSize: 13 }}>R$ {Number(p.price).toFixed(2).replace(".",",")}</td>
                      <td style={{ padding: "12px 16px" }}><span style={{ background: st==="out"?"#FEF2F2":st==="low"?"#FFFBEB":"#F0FDF4", color: st==="out"?"#DC2626":st==="low"?"#D97706":"#16A34A", borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>{st==="out"?"Esgotado":st==="low"?"Baixo":"Normal"}</span></td>
                      <td style={{ padding: "12px 16px" }}><button onClick={() => handleDeleteProduct(p.id)} style={{ background: "none", border: "none", color: "#DC2626", cursor: "pointer", fontSize: 16 }}>🗑</button></td>
                    </tr>
                  )})}</tbody>
                </table>}
            </div>
          )}
          {!loadingData && activeTab === "movements" && (
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: 20 }}>
              {movements.length === 0 && <p style={{ color: "#64748B", textAlign: "center", padding: 40 }}>Nenhuma movimentação ainda.</p>}
              {movements.map(m => (
                <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: "1px solid #E2E8F0" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: m.type==="entrada"?"#F0FDF4":"#FEF2F2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{m.type==="entrada"?"⬆️":"⬇️"}</div>
                  <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 14 }}>{m.product?.name}</div><div style={{ fontSize: 12, color: "#64748B" }}>{new Date(m.createdAt).toLocaleString("pt-BR")} · {m.user?.name}</div></div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: m.type==="entrada"?"#16A34A":"#DC2626" }}>{m.type==="entrada"?"+":"-"}{m.quantity} un.</div>
                </div>
              ))}
            </div>
          )}
          {!loadingData && activeTab === "alerts" && (
            <div>
              {alerts.length === 0 ? <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: 40, textAlign: "center", color: "#64748B" }}>✅ Estoque em dia!</div> :
                alerts.map(p => { const st = getStatus(p); return (
                  <div key={p.id} style={{ background: "#fff", borderRadius: 12, border: `1.5px solid ${st==="out"?"#FCA5A5":"#FCD34D"}`, padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}><span style={{ fontSize: 24 }}>{st==="out"?"🚫":"⚠️"}</span><div><div style={{ fontWeight: 600, fontSize: 15 }}>{p.name}</div><div style={{ fontSize: 13, color: "#64748B" }}>Mínimo: {p.minQty} unidades</div></div></div>
                    <div style={{ textAlign: "right" }}><div style={{ fontWeight: 700, fontSize: 18, color: st==="out"?"#DC2626":"#D97706" }}>{p.quantity} un.</div><div style={{ fontSize: 12, fontWeight: 600, color: st==="out"?"#DC2626":"#D97706" }}>{st==="out"?"ESGOTADO":"ESTOQUE BAIXO"}</div></div>
                  </div>
                );})}
            </div>
          )}
        </div>
      </main>
      {showAddProduct && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 420 }}>
            <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 24 }}>Novo Produto</h2>
            {[["Nome do produto *","name","text"],["Categoria","category","text"],["Quantidade atual *","quantity","number"],["Estoque mínimo","minQty","number"],["Preço unitário (ex: 10.50)","price","number"]].map(([label,key,type]) => (
              <input key={key} type={type} placeholder={label} value={newProduct[key]} onChange={e => setNewProduct(p => ({ ...p, [key]: e.target.value }))} style={inputStyle} />
            ))}
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowAddProduct(false)} style={{ flex: 1, padding: 11, borderRadius: 8, border: "1px solid #E2E8F0", background: "transparent", cursor: "pointer", fontWeight: 600, color: "#64748B" }}>Cancelar</button>
              <button onClick={handleAddProduct} style={{ flex: 1, padding: 11, borderRadius: 8, border: "none", background: "#0F4C81", color: "#fff", cursor: "pointer", fontWeight: 700 }}>Salvar</button>
            </div>
          </div>
        </div>
      )}
      {showAddMovement && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 420 }}>
            <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 24 }}>Nova Movimentação</h2>
            <select value={newMovement.productId} onChange={e => setNewMovement(m => ({ ...m, productId: e.target.value }))} style={inputStyle}>
              <option value="">Selecione o produto *</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <select value={newMovement.type} onChange={e => setNewMovement(m => ({ ...m, type: e.target.value }))} style={inputStyle}>
              <option value="entrada">Entrada (chegou mercadoria)</option>
              <option value="saída">Saída (vendeu / usou)</option>
            </select>
            <input type="number" placeholder="Quantidade *" value={newMovement.quantity} onChange={e => setNewMovement(m => ({ ...m, quantity: e.target.value }))} style={inputStyle} />
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowAddMovement(false)} style={{ flex: 1, padding: 11, borderRadius: 8, border: "1px solid #E2E8F0", background: "transparent", cursor: "pointer", fontWeight: 600, color: "#64748B" }}>Cancelar</button>
              <button onClick={handleAddMovement} style={{ flex: 1, padding: 11, borderRadius: 8, border: "none", background: "#0F4C81", color: "#fff", cursor: "pointer", fontWeight: 700 }}>Registrar</button>
            </div>
          </div>
        </div>
      )}
      {toast && <div style={{ position: "fixed", bottom: 28, right: 28, background: toast.type==="error"?"#DC2626":"#16A34A", color: "#fff", padding: "12px 20px", borderRadius: 10, fontWeight: 600, fontSize: 14, zIndex: 1000 }}>{toast.type==="error"?"❌":"✅"} {toast.msg}</div>}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("landing");
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem("user")); } catch { return null; } });
  const [accessStatus, setAccessStatus] = useState(() => localStorage.getItem("accessStatus") || "ok");
  function handleLogin(t, u, status) { setToken(t); setUser(u); setAccessStatus(status); setPage("dashboard"); }
  function handleLogout() { localStorage.clear(); setToken(null); setUser(null); setAccessStatus("ok"); setPage("landing"); }
  function handleBlocked(status) { setAccessStatus(status); }
  if (token && user && (accessStatus === "trial_expired" || accessStatus === "subscription_expired")) return <BlockedPage type={accessStatus} onLogout={handleLogout} />;
  if (token && user) return <Dashboard token={token} user={user} onLogout={handleLogout} onBlocked={handleBlocked} />;
  if (page === "auth") return <AuthPage onLogin={handleLogin} onBack={() => setPage("landing")} initialMode="login" />;
  if (page === "register") return <AuthPage onLogin={handleLogin} onBack={() => setPage("landing")} initialMode="register" />;
  return <LandingPage onGoToRegister={() => setPage("register")} onGoToLogin={() => setPage("auth")} />;
}