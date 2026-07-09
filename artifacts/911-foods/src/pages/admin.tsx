import { useState, useEffect } from "react";
import { Link } from "wouter";
import { getMenuPrices, saveMenuPrices, getDealPrices, saveDealPrices } from "@/lib/priceStore";

const ADMIN_PASSWORD = "911admin";

const MENU_DATA: { category: string; items: { name: string; defaultPrice: number }[] }[] = [
  {
    category: "Burger",
    items: [
      { name: "Burger Viande", defaultPrice: 300 },
      { name: "Burger Crispy", defaultPrice: 400 },
      { name: "Burger Double", defaultPrice: 500 },
      { name: "Burger 911", defaultPrice: 600 },
    ],
  },
  {
    category: "Pizza",
    items: [
      { name: "Pizza Marguerite", defaultPrice: 300 },
      { name: "Pizza Poulet", defaultPrice: 500 },
      { name: "Pizza Viande", defaultPrice: 500 },
      { name: "Pizza Thon", defaultPrice: 500 },
      { name: "Pizza Poulet Fumée", defaultPrice: 600 },
      { name: "Pizza Pepperoni", defaultPrice: 600 },
      { name: "Pizza 04 Season", defaultPrice: 700 },
      { name: "Pizza 04 Fromage", defaultPrice: 800 },
      { name: "Pizza Chèvre Miel", defaultPrice: 1000 },
    ],
  },
  {
    category: "Tacos",
    items: [
      { name: "Tacos Chawerma", defaultPrice: 450 },
      { name: "Tacos Viande", defaultPrice: 450 },
      { name: "Tacos Crispy", defaultPrice: 550 },
      { name: "Tacos Foie", defaultPrice: 550 },
      { name: "Tacos Mix", defaultPrice: 600 },
    ],
  },
  {
    category: "Pasta",
    items: [
      { name: "Pasta Poulet", defaultPrice: 600 },
      { name: "Pasta Crispy", defaultPrice: 700 },
      { name: "Pasta 04 Fromage", defaultPrice: 800 },
    ],
  },
  {
    category: "Calzone",
    items: [
      { name: "Calzone Poulet", defaultPrice: 600 },
      { name: "Calzone Viande", defaultPrice: 600 },
      { name: "Calzone Foie", defaultPrice: 700 },
      { name: "Calzone Thon", defaultPrice: 600 },
    ],
  },
  {
    category: "Panuazzo",
    items: [
      { name: "Panuazzo Poulet", defaultPrice: 600 },
      { name: "Panuazzo Viande", defaultPrice: 600 },
      { name: "Panuazzo Crispy", defaultPrice: 600 },
      { name: "Panuazzo Foie", defaultPrice: 700 },
    ],
  },
  {
    category: "Tunisiens",
    items: [
      { name: "Tunisien Chawerma", defaultPrice: 400 },
      { name: "Tunisien Viande", defaultPrice: 400 },
      { name: "Tunisien Crispy", defaultPrice: 500 },
      { name: "Tunisien Foie", defaultPrice: 500 },
      { name: "Tunisien Mixt", defaultPrice: 550 },
    ],
  },
  {
    category: "Malfouf",
    items: [
      { name: "Malfouf Chawerma", defaultPrice: 350 },
      { name: "Malfouf Viande", defaultPrice: 350 },
      { name: "Malfouf Crispy", defaultPrice: 450 },
      { name: "Malfouf Foie", defaultPrice: 450 },
      { name: "Malfouf Mix", defaultPrice: 500 },
    ],
  },
  {
    category: "Magloub",
    items: [
      { name: "Magloub Chawerma", defaultPrice: 500 },
      { name: "Magloub Viande", defaultPrice: 500 },
      { name: "Magloub Crispy", defaultPrice: 600 },
      { name: "Magloub Foie", defaultPrice: 700 },
    ],
  },
  {
    category: "Poutine",
    items: [
      { name: "Poutine Chawerma", defaultPrice: 450 },
      { name: "Poutine Viande", defaultPrice: 450 },
      { name: "Poutine Crispy", defaultPrice: 550 },
    ],
  },
  {
    category: "Boissons",
    items: [
      { name: "Farha فرحة — 33cl", defaultPrice: 50 },
      { name: "Farha فرحة — 1L", defaultPrice: 100 },
      { name: "Hamoud حمود — 33cl", defaultPrice: 60 },
      { name: "Hamoud حمود — 1L", defaultPrice: 120 },
      { name: "Jus عصير — 33cl", defaultPrice: 70 },
      { name: "Coca-Cola كوكا كولا", defaultPrice: 150 },
    ],
  },
];

const DEAL_DATA = [
  { title: "Emergency Combo", defaultPrice: 650 },
  { title: "Pizza Double Mission", defaultPrice: 1600 },
  { title: "Tacos + Pasta Pack", defaultPrice: 950 },
];

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("911admin_auth") === "1");
  const [password, setPassword] = useState("");
  const [menuPrices, setMenuPrices] = useState<Record<string, number>>({});
  const [dealPrices, setDealPrices] = useState<Record<string, number>>({});
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("menu");

  useEffect(() => {
    if (authed) {
      setMenuPrices(getMenuPrices());
      setDealPrices(getDealPrices());
    }
  }, [authed]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("911admin_auth", "1");
      setAuthed(true);
    } else {
      alert("❌ كلمة المرور غير صحيحة");
    }
  }

  function handleMenuPrice(name: string, value: string) {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 0) {
      setMenuPrices((p) => ({ ...p, [name]: num }));
    }
  }

  function handleDealPrice(title: string, value: string) {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 0) {
      setDealPrices((p) => ({ ...p, [title]: num }));
    }
  }

  function handleSave() {
    saveMenuPrices(menuPrices);
    saveDealPrices(dealPrices);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleReset() {
    if (!confirm("هل تريد إعادة تعيين كل الأسعار إلى القيم الافتراضية؟")) return;
    setMenuPrices({});
    setDealPrices({});
    saveMenuPrices({});
    saveDealPrices({});
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function handleLogout() {
    sessionStorage.removeItem("911admin_auth");
    setAuthed(false);
  }

  // ── LOGIN ──
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(20,15%,7%)] px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-sm mb-4"
              style={{ background: "hsl(0,55%,35%)", boxShadow: "0 0 30px hsl(0,55%,35%,0.4)" }}
            >
              <span className="font-bebas text-white text-2xl tracking-widest">911</span>
            </div>
            <h1 className="font-bebas text-3xl tracking-widest text-white">ADMIN PANEL</h1>
            <p className="text-[hsl(38,15%,45%)] text-xs uppercase tracking-widest mt-1">911 Foods — Biskra</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div
              className="flex items-center rounded-sm overflow-hidden"
              style={{ background: "hsl(20,12%,12%)", border: "1px solid hsl(20,12%,22%)" }}
            >
              <input
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 px-4 py-3 bg-transparent text-white text-sm focus:outline-none placeholder:opacity-40"
                dir="rtl"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 font-bebas text-lg tracking-widest text-white rounded-sm transition-all"
              style={{ background: "hsl(0,55%,35%)", boxShadow: "0 4px 20px hsl(0,55%,35%,0.3)" }}
            >
              دخول — LOGIN
            </button>
          </form>

          <div className="text-center mt-6">
            <Link href="/" className="text-xs text-[hsl(38,15%,35%)] hover:text-[hsl(38,15%,55%)] transition-colors uppercase tracking-widest">
              ← العودة للموقع
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── ADMIN PANEL ──
  return (
    <div className="min-h-screen bg-[hsl(20,15%,7%)]">
      {/* Header */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "hsl(20,12%,9%)", borderBottom: "1px solid hsl(20,12%,16%)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0"
            style={{ background: "hsl(0,55%,35%)" }}
          >
            <span className="font-bebas text-white text-sm tracking-widest">911</span>
          </div>
          <div>
            <div className="font-bebas text-xl tracking-widest text-white leading-none">ADMIN PANEL</div>
            <div className="text-[10px] uppercase tracking-widest text-[hsl(38,15%,40%)]">لوحة التحكم</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs uppercase tracking-widest px-3 py-1.5 rounded-sm transition-colors"
            style={{ color: "hsl(38,15%,55%)", border: "1px solid hsl(20,12%,22%)" }}
          >
            الموقع ←
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs uppercase tracking-widest px-3 py-1.5 rounded-sm transition-colors"
            style={{ color: "hsl(0,55%,55%)", border: "1px solid hsl(0,55%,25%)" }}
          >
            خروج
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: "menu", label: "قائمة الطعام" },
            { id: "deals", label: "NOS BOXES" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-5 py-2.5 font-bebas tracking-widest text-sm rounded-sm transition-all"
              style={
                activeTab === tab.id
                  ? { background: "hsl(0,55%,35%)", color: "white" }
                  : { background: "hsl(20,12%,12%)", color: "hsl(38,15%,55%)", border: "1px solid hsl(20,12%,20%)" }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── MENU PRICES ── */}
        {activeTab === "menu" && (
          <div className="space-y-6">
            {MENU_DATA.map((section) => (
              <div
                key={section.category}
                className="rounded-sm overflow-hidden"
                style={{ background: "hsl(20,12%,11%)", border: "1px solid hsl(20,12%,18%)" }}
              >
                <div
                  className="px-5 py-3 font-bebas text-lg tracking-widest"
                  style={{ background: "hsl(20,12%,14%)", borderBottom: "1px solid hsl(20,12%,18%)", color: "hsl(0,55%,55%)" }}
                >
                  {section.category}
                </div>
                <div className="divide-y divide-[hsl(20,12%,16%)]">
                  {section.items.map((item) => {
                    const current = menuPrices[item.name] ?? item.defaultPrice;
                    return (
                      <div key={item.name} className="flex items-center justify-between px-5 py-3 gap-4">
                        <span className="text-sm flex-1" style={{ color: "hsl(38,30%,80%)" }}>
                          {item.name}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          <input
                            type="number"
                            min={0}
                            value={current}
                            onChange={(e) => handleMenuPrice(item.name, e.target.value)}
                            className="w-24 text-right px-3 py-1.5 text-sm rounded-sm focus:outline-none font-bebas"
                            style={{
                              background: "hsl(20,12%,8%)",
                              border: "1px solid hsl(20,12%,24%)",
                              color: "hsl(25,55%,58%)",
                            }}
                            onFocus={(e) =>
                              (e.currentTarget.style.borderColor = "hsl(0,55%,40%)")
                            }
                            onBlur={(e) =>
                              (e.currentTarget.style.borderColor = "hsl(20,12%,24%)")
                            }
                          />
                          <span className="text-xs uppercase tracking-wider" style={{ color: "hsl(38,15%,40%)" }}>
                            DA
                          </span>
                          {menuPrices[item.name] !== undefined && menuPrices[item.name] !== item.defaultPrice && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: "hsl(0,55%,20%)", color: "hsl(0,55%,60%)" }}>
                              modifié
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── DEALS PRICES ── */}
        {activeTab === "deals" && (
          <div
            className="rounded-sm overflow-hidden"
            style={{ background: "hsl(20,12%,11%)", border: "1px solid hsl(20,12%,18%)" }}
          >
            <div
              className="px-5 py-3 font-bebas text-lg tracking-widest"
              style={{ background: "hsl(20,12%,14%)", borderBottom: "1px solid hsl(20,12%,18%)", color: "hsl(0,55%,55%)" }}
            >
              NOS BOXES — أسعار العروض
            </div>
            <div className="divide-y divide-[hsl(20,12%,16%)]">
              {DEAL_DATA.map((deal) => {
                const current = dealPrices[deal.title] ?? deal.defaultPrice;
                return (
                  <div key={deal.title} className="flex items-center justify-between px-5 py-4 gap-4">
                    <div className="flex-1">
                      <div className="text-sm font-semibold" style={{ color: "hsl(38,30%,80%)" }}>
                        {deal.title}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "hsl(38,15%,40%)" }}>
                        السعر الافتراضي: {deal.defaultPrice} DA
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <input
                        type="number"
                        min={0}
                        value={current}
                        onChange={(e) => handleDealPrice(deal.title, e.target.value)}
                        className="w-28 text-right px-3 py-2 text-sm rounded-sm focus:outline-none font-bebas text-lg"
                        style={{
                          background: "hsl(20,12%,8%)",
                          border: "1px solid hsl(20,12%,24%)",
                          color: "hsl(25,55%,58%)",
                        }}
                        onFocus={(e) =>
                          (e.currentTarget.style.borderColor = "hsl(0,55%,40%)")
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.borderColor = "hsl(20,12%,24%)")
                        }
                      />
                      <span className="text-xs uppercase tracking-wider" style={{ color: "hsl(38,15%,40%)" }}>
                        DA
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Save / Reset */}
        <div className="flex gap-3 mt-8 sticky bottom-6">
          <button
            onClick={handleSave}
            className="flex-1 py-4 font-bebas text-lg tracking-widest rounded-sm transition-all"
            style={{
              background: saved ? "hsl(140,45%,30%)" : "hsl(0,55%,35%)",
              color: "white",
              boxShadow: "0 4px 24px hsl(0,55%,35%,0.35)",
            }}
          >
            {saved ? "✓ تم الحفظ — SAVED" : "💾 حفظ التغييرات — SAVE"}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-4 font-bebas text-sm tracking-widest rounded-sm transition-all"
            style={{ background: "hsl(20,12%,14%)", color: "hsl(38,15%,45%)", border: "1px solid hsl(20,12%,22%)" }}
          >
            إعادة تعيين
          </button>
        </div>
      </div>
    </div>
  );
}
