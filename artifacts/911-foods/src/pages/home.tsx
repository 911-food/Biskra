import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import {
  ShoppingCart,
  X,
  Phone,
  Instagram,
  Zap,
  Clock,
  MapPin,
  ChevronRight,
  ClipboardList,
  ChefHat,
  Truck,
  CheckCircle2,
  Menu,
  Flame,
  ShieldCheck,
  Timer,
  Siren,
  Bell,
  TrendingUp,
  Star,
  User,
} from "lucide-react";
import {
  GiHamburger,
  GiPizzaSlice,
  GiTacos,
  GiNoodles,
  GiSandwich,
  GiFrenchFries,
  GiMeat,
  GiChickenLeg,
  GiBread,
  GiChickenOven,
  GiWineBottle,
} from "react-icons/gi";
import type { IconType } from "react-icons";
import logoImg from "@assets/528129323_17903813892232795_3929362443065509329_n_1778373364752.jpg";
import menu1Img from "@assets/image_1778373360248.png";
import menu2Img from "@assets/image_1778373362697.png";
import heroFoodImg from "@assets/a878429f-7d6f-49b1-9ea3-5f69543d6532_1783601642933.png";
import iconBurger from "@assets/icon_burger.png";
import iconPizza from "@assets/icon_pizza.png";
import iconTacos from "@assets/icon_tacos.png";
import iconPasta from "@assets/icon_pasta.png";
import iconCalzone from "@assets/icon_calzone.png";
import iconPanuazzo from "@assets/icon_panuazzo.png";
import iconTunisien from "@assets/icon_tunisien.png";
import iconMalfouf from "@assets/icon_malfouf.png";
import iconMagloub from "@assets/icon_magloub.png";
import iconPoutine from "@assets/icon_poutine.png";
import iconBoissons from "@assets/icon_boissons.png";

/* ─── ANIMATION VARIANTS ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
};

/* ─── MENU DATA ─── */
const menuCategories: {
  id: string; name: string; Icon: IconType; img?: string; heatLevel: number; prepTime: string; tag: string;
  items: { name: string; price: number | string }[];
  note?: string;
}[] = [
  {
    id: "burger", name: "Burger", Icon: GiHamburger, img: iconBurger, heatLevel: 3, prepTime: "8 min", tag: "Most Rescued",
    items: [
      { name: "Burger Viande", price: 300 },
      { name: "Burger Crispy", price: 400 },
      { name: "Burger Double", price: 500 },
      { name: "Burger 911", price: 600 },
    ],
  },
  {
    id: "pizza", name: "Pizza", Icon: GiPizzaSlice, img: iconPizza, heatLevel: 2, prepTime: "15 min", tag: "Fan Favorite",
    items: [
      { name: "Pizza Marguerite", price: "300 / 700 / 1000" },
      { name: "Pizza Poulet", price: "500 / 1100 / 1700" },
      { name: "Pizza Viande", price: "500 / 1100 / 1700" },
      { name: "Pizza Thon", price: "500 / 1100 / 1700" },
      { name: "Pizza Poulet Fumée", price: "600 / 1200 / 1800" },
      { name: "Pizza Pepperoni", price: "600 / 1200 / 1800" },
      { name: "Pizza 04 Season", price: "700 / 1500 / 2500" },
      { name: "Pizza 04 Fromage", price: "800 / 1500 / 2500" },
      { name: "Pizza Chèvre Miel", price: "1000" },
    ],
    note: "M / L / XL",
  },
  {
    id: "tacos", name: "Tacos", Icon: GiTacos, img: iconTacos, heatLevel: 4, prepTime: "10 min", tag: "Top Seller",
    items: [
      { name: "Tacos Chawerma", price: 450 },
      { name: "Tacos Viande", price: 450 },
      { name: "Tacos Crispy", price: 550 },
      { name: "Tacos Foie", price: 550 },
      { name: "Tacos Mix", price: 600 },
    ],
  },
  {
    id: "pasta", name: "Pasta", Icon: GiNoodles, img: iconPasta, heatLevel: 1, prepTime: "12 min", tag: "Comfort Food",
    items: [
      { name: "Pasta Poulet", price: 600 },
      { name: "Pasta Crispy", price: 700 },
      { name: "Pasta 04 Fromage", price: 800 },
    ],
  },
  {
    id: "calzone", name: "Calzone", Icon: GiPizzaSlice, img: iconCalzone, heatLevel: 2, prepTime: "14 min", tag: "Premium Pick",
    items: [
      { name: "Calzone Poulet", price: 600 },
      { name: "Calzone Viande", price: 600 },
      { name: "Calzone Foie", price: 700 },
      { name: "Calzone Thon", price: 600 },
    ],
  },
  {
    id: "panuazzo", name: "Panuazzo", Icon: GiSandwich, img: iconPanuazzo, heatLevel: 2, prepTime: "10 min", tag: "Rescue Fav",
    items: [
      { name: "Panuazzo Poulet", price: 600 },
      { name: "Panuazzo Viande", price: 600 },
      { name: "Panuazzo Crispy", price: 600 },
      { name: "Panuazzo Foie", price: 700 },
    ],
  },
  {
    id: "tunisien", name: "Tunisiens", Icon: GiSandwich, img: iconTunisien, heatLevel: 3, prepTime: "8 min", tag: "Street Classic",
    items: [
      { name: "Tunisien Chawerma", price: 400 },
      { name: "Tunisien Viande", price: 400 },
      { name: "Tunisien Crispy", price: 500 },
      { name: "Tunisien Foie", price: 500 },
      { name: "Tunisien Mixt", price: 550 },
    ],
  },
  {
    id: "malfouf", name: "Malfouf", Icon: GiMeat, img: iconMalfouf, heatLevel: 2, prepTime: "8 min", tag: "Quick Rescue",
    items: [
      { name: "Malfouf Chawerma", price: 350 },
      { name: "Malfouf Viande", price: 350 },
      { name: "Malfouf Crispy", price: 450 },
      { name: "Malfouf Foie", price: 450 },
      { name: "Malfouf Mix", price: 500 },
    ],
  },
  {
    id: "magloub", name: "Magloub", Icon: GiMeat, img: iconMagloub, heatLevel: 2, prepTime: "10 min", tag: "Hidden Gem",
    items: [
      { name: "Magloub Chawerma", price: 500 },
      { name: "Magloub Viande", price: 500 },
      { name: "Magloub Crispy", price: 600 },
      { name: "Magloub Foie", price: 700 },
    ],
  },
  {
    id: "poutine", name: "Poutine", Icon: GiFrenchFries, img: iconPoutine, heatLevel: 1, prepTime: "7 min", tag: "Midnight Rescue",
    items: [
      { name: "Poutine Chawerma", price: 450 },
      { name: "Poutine Viande", price: 450 },
      { name: "Poutine Crispy", price: 550 },
    ],
  },
  {
    id: "boissons", name: "Boissons", Icon: GiWineBottle, img: iconBoissons, heatLevel: 0, prepTime: "1 min", tag: "Rafraîchissant",
    items: [
      { name: "Farha فرحة — 33cl", price: 50 },
      { name: "Farha فرحة — 1L", price: 100 },
      { name: "Hamoud حمود — 33cl", price: 60 },
      { name: "Hamoud حمود — 1L", price: 120 },
      { name: "Jus عصير — 33cl", price: 70 },
      { name: "Coca-Cola كوكا كولا", price: 150 },
    ],
  },
];

const featuredItems = [
  { id: "f1", name: "Burger 911", price: 600, desc: "The ultimate emergency — double patty, special sauce, pure rescue.", badge: "#1 Bestseller", heatLevel: 3 },
  { id: "f2", name: "Tacos Mix", price: 600, desc: "Chicken + beef + crispy blend. The complete rescue operation.", badge: "Staff Pick", heatLevel: 4 },
  { id: "f3", name: "Pizza 04 Season", price: "700/1500/2500", desc: "Four seasons in one bite. M · L · XL — choose your mission size.", badge: "Emergency Fav", heatLevel: 2 },
];

const codeRedDeals = [
  { id: "code-red-1", badge: "CODE RED", title: "Emergency Combo", desc: "Burger 911 + Frite + Boisson", oldPrice: 800, newPrice: 650, urgency: "Offre limitée" },
  { id: "midnight-1", badge: "MIDNIGHT RESCUE", title: "Pizza Double Mission", desc: "Pizza L + Pizza M de votre choix", oldPrice: 2000, newPrice: 1600, urgency: "Disponible après 22h" },
  { id: "rescue-1", badge: "RESCUE COMBO", title: "Tacos + Pasta Pack", desc: "Tacos Mix + Pasta Poulet pour 2", oldPrice: 1200, newPrice: 950, urgency: "Pour 2 personnes" },
];

const orderStatuses = [
  { id: 1, label: "Order Received", Icon: ClipboardList, desc: "Mission acceptée" },
  { id: 2, label: "Preparing", Icon: ChefHat, desc: "Cuisine en opération" },
  { id: 3, label: "Rescue On The Way", Icon: Truck, desc: "Unité déployée" },
  { id: 4, label: "Delivered", Icon: CheckCircle2, desc: "Mission accomplie" },
];

/* ─── TILT CARD (3D mouse-tracking hover) ─── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  function handleMove(e: React.MouseEvent) {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale(1.04)`;
    el.style.boxShadow = `${-x * 20}px ${-y * 20}px 60px hsl(0,55%,35%,0.18)`;
  }
  function handleLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
    ref.current.style.boxShadow = "";
  }
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{ transition: "transform 0.18s ease, box-shadow 0.18s ease", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

/* ─── ANIMATED COUNTER ─── */
function AnimatedCounter({ target, suffix = "", duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const timer = setInterval(() => {
      const t = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── FLOATING CALL CTA ─── */
function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  useEffect(() => {
    return scrollY.on("change", (v) => setVisible(v > 400));
  }, [scrollY]);
  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="tel:0771479840"
          initial={{ opacity: 0, scale: 0.75, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.75, y: 24 }}
          transition={{ type: "spring", stiffness: 340, damping: 28 }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-[150] flex items-center gap-3 bg-[hsl(0,55%,35%)] text-white rounded-sm px-5 py-3.5 glow-pulse select-none"
          data-testid="floating-cta"
        >
          <div className="relative">
            <Phone className="w-5 h-5 fill-white/20" />
            <motion.span
              className="absolute -inset-2 rounded-full border border-white/30"
              animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="font-bebas text-base tracking-widest">Commander</div>
            <div className="text-white/65 text-[10px] tracking-wider">0771 47 98 40</div>
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ─── HERO PARTICLES ─── */
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 4.17) % 100}%`,
  size: 2 + (i % 3),
  dur: `${5 + (i % 7)}s`,
  delay: `${(i * 0.4) % 8}s`,
  drift: `${(i % 2 === 0 ? 1 : -1) * (20 + (i % 40))}px`,
  color: i % 3 === 0 ? "hsl(0,60%,52%)" : i % 3 === 1 ? "hsl(22,80%,58%)" : "hsl(38,75%,62%)",
}));

function HeroParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]" aria-hidden>
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full particle"
          style={{
            left: p.left,
            bottom: "-8px",
            width: p.size,
            height: p.size,
            background: p.color,
            "--px-dur": p.dur,
            "--px-delay": p.delay,
            "--px-drift": p.drift,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}


/* ─── SCROLLING TICKER ─── */
function Ticker() {
  const items = ["EMERGENCY FOOD STATION", "WE SAVE HUNGER", "911 FOODS", "FASTEST RESCUE IN TOWN", "EMERGENCY TASTE RESPONSE", "RESCUE COMBOS NOW AVAILABLE", "911 FOR YOUR CRAVINGS"];
  const repeated = [...items, ...items, ...items];
  return (
    <div className="bg-[hsl(0,55%,35%)] py-2.5 overflow-hidden" data-testid="ticker">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="font-bebas text-sm tracking-[0.2em] text-white/90 flex items-center gap-8 shrink-0">
            {item}
            <span className="text-white/40 text-xs">—</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── HEAT METER — colored bar, no fire emojis ─── */
function HeatMeter({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          className="h-1.5 w-4 rounded-full"
          style={{ backgroundColor: i < level ? "hsl(0,55%,35%)" : "hsl(var(--border))" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: i * 0.06, duration: 0.3 }}
        />
      ))}
    </div>
  );
}

/* ─── COUNTDOWN TIMER ─── */
function CountdownTimer() {
  const [time, setTime] = useState({ h: 0, m: 30, s: 0 });
  useEffect(() => {
    const target = Date.now() + 30 * 60 * 1000;
    const interval = setInterval(() => {
      const diff = Math.max(0, target - Date.now());
      setTime({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
      if (diff === 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex items-center gap-1 font-bebas text-4xl tracking-widest text-[hsl(0,55%,35%)]" data-testid="countdown-timer">
      {[pad(time.h), pad(time.m), pad(time.s)].map((val, i) => (
        <span key={i} className="flex items-center gap-1">
          <motion.span key={val} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
            {val}
          </motion.span>
          {i < 2 && <span className="animate-pulse text-[hsl(0,55%,50%)]">:</span>}
        </span>
      ))}
    </div>
  );
}

/* ─── CART DRAWER ─── */
type CartItem = { name: string; price: number; id: string };
type OrderForm = { name: string; phone: string; location: string };

function CartDrawer({ items, onRemove, onClose, onGoToDrinks, hasDrink }: { items: CartItem[]; onRemove: (id: string) => void; onClose: () => void; onGoToDrinks: () => void; hasDrink: boolean }) {
  const total = items.reduce((s, i) => s + i.price, 0);
  const [form, setForm] = useState<OrderForm>({ name: "", phone: "", location: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState("");

  async function sendOrder() {
    if (!form.name.trim() || !form.phone.trim() || !form.location.trim()) {
      setFormError("الرجاء تعبئة جميع الحقول");
      return;
    }
    setSending(true);
    setFormError("");
    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    const itemsList = items.map((i) => `• ${i.name} — ${i.price} DA`).join("\n");
    const text = `🚨 *طلب جديد — 911 Foods*\n\n👤 *الاسم:* ${form.name}\n📞 *الهاتف:* ${form.phone}\n📍 *العنوان:* ${form.location}\n\n*الطلب:*\n${itemsList}\n\n💰 *المجموع:* ${total} DA`;
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setFormError("فشل الإرسال — تحقق من إعدادات البوت");
      }
    } catch {
      setFormError("خطأ في الاتصال بالإنترنت");
    } finally {
      setSending(false);
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
      <motion.div
        className="w-full max-w-sm h-full flex flex-col shadow-2xl overflow-hidden"
        style={{ background: "hsl(20,12%,7%)", borderLeft: "1px solid hsl(20,12%,16%)" }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 32, stiffness: 320 }}
        data-testid="cart-drawer"
      >
        {/* Red top accent bar */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(to right, hsl(0,55%,28%), hsl(0,55%,45%), hsl(0,55%,28%))" }} />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid hsl(20,12%,14%)" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{ background: "hsl(0,55%,35%)", boxShadow: "0 0 18px hsl(0,55%,35%,0.5)" }}>
              <Siren className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bebas text-2xl tracking-widest" style={{ color: "hsl(38,30%,94%)", lineHeight: 1 }}>EMERGENCY BOX</div>
              <div className="text-[10px] tracking-widest uppercase" style={{ color: "hsl(0,55%,50%)" }}>
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>●</motion.span>
                {" "}{items.length} UNIT{items.length !== 1 ? "S" : ""} EN MISSION
              </div>
            </div>
          </div>
          <button onClick={onClose} data-testid="btn-cart-close"
            className="w-8 h-8 rounded-sm flex items-center justify-center transition-all"
            style={{ background: "hsl(20,12%,13%)", border: "1px solid hsl(20,12%,20%)", color: "hsl(38,15%,55%)" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto py-3 px-4 space-y-2">
          <AnimatePresence>
            {items.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-48 gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "hsl(20,12%,12%)", border: "2px dashed hsl(20,12%,22%)" }}>
                  <Siren className="w-7 h-7" style={{ color: "hsl(20,12%,35%)" }} />
                </div>
                <div className="text-center">
                  <div className="font-bebas text-lg tracking-widest" style={{ color: "hsl(38,15%,40%)" }}>NO ACTIVE MISSION</div>
                  <div className="text-xs mt-1" style={{ color: "hsl(38,15%,30%)" }}>أضف وجبة لبدء الطلب</div>
                </div>
              </motion.div>
            ) : (
              items.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-3 px-3 py-3 rounded-sm"
                  style={{ background: "hsl(20,12%,11%)", border: "1px solid hsl(20,12%,17%)" }}
                  data-testid={`cart-item-${i}`}
                >
                  <div className="w-6 h-6 rounded-sm flex items-center justify-center shrink-0 font-bebas text-sm" style={{ background: "hsl(0,55%,35%)", color: "white" }}>
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium flex-1" style={{ color: "hsl(38,30%,88%)" }}>{item.name}</span>
                  <span className="text-sm font-bebas text-base shrink-0" style={{ color: "hsl(25,55%,58%)" }}>{item.price} DA</span>
                  <button
                    data-testid={`btn-remove-${i}`}
                    onClick={() => onRemove(item.id)}
                    className="w-6 h-6 rounded-sm flex items-center justify-center shrink-0 transition-all"
                    style={{ background: "hsl(0,55%,35%,0.12)", color: "hsl(0,55%,50%)", border: "1px solid hsl(0,55%,35%,0.2)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "hsl(0,55%,35%)"; (e.currentTarget as HTMLElement).style.color = "white"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "hsl(0,55%,35%,0.12)"; (e.currentTarget as HTMLElement).style.color = "hsl(0,55%,50%)"; }}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Order summary + form */}
        {items.length > 0 && (
          <div className="px-5 py-5 space-y-4" style={{ borderTop: "1px solid hsl(20,12%,14%)", background: "hsl(20,12%,9%)" }}>

            {/* Drink upsell banner */}
            <AnimatePresence>
              {!hasDrink && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-sm"
                  style={{ background: "hsl(20,12%,12%)", border: "1px solid hsl(20,12%,20%)" }}
                >
                  <div dir="rtl">
                    <div className="text-sm font-bold" style={{ color: "hsl(38,30%,88%)" }}>مخصكش مشروب؟</div>
                    <div className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: "hsl(38,15%,40%)" }}>Ajouter une boisson</div>
                  </div>
                  <button
                    onClick={onGoToDrinks}
                    className="shrink-0 px-4 py-2 font-bebas tracking-widest text-sm rounded-sm transition-all"
                    style={{ background: "hsl(0,55%,35%)", color: "white" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "hsl(0,55%,28%)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "hsl(0,55%,35%)"; }}
                  >
                    AJOUTER
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Total */}
            <div className="flex items-center justify-between px-4 py-3 rounded-sm" style={{ background: "hsl(20,12%,12%)", border: "1px solid hsl(20,12%,18%)" }}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "hsl(38,15%,45%)" }}>Total Mission</span>
              <span className="font-bebas text-3xl" style={{ color: "hsl(0,55%,50%)", textShadow: "0 0 20px hsl(0,55%,35%,0.5)" }}>{total} DA</span>
            </div>

            {sent ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-3 py-5 text-center rounded-sm"
                style={{ background: "hsl(140,40%,8%)", border: "1px solid hsl(140,40%,20%)" }}
              >
                <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.5 }}>
                  <CheckCircle2 className="w-12 h-12" style={{ color: "hsl(140,55%,45%)" }} />
                </motion.div>
                <div>
                  <div className="font-bebas text-2xl tracking-widest" style={{ color: "hsl(140,55%,50%)" }}>تم إرسال طلبك ✓</div>
                  <div className="text-xs mt-1" style={{ color: "hsl(140,30%,40%)" }}>طلبك وصل — الفريق على الطريق</div>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Form fields */}
                <div className="space-y-2">
                  {[
                    { key: "name" as const, placeholder: "الاسم الكامل", Icon: User, type: "text" },
                    { key: "phone" as const, placeholder: "رقم الهاتف", Icon: Phone, type: "tel" },
                    { key: "location" as const, placeholder: "العنوان / الموقع", Icon: MapPin, type: "text" },
                  ].map(({ key, placeholder, Icon, type }) => (
                    <div key={key} className="relative flex items-center rounded-sm overflow-hidden" style={{ border: "1px solid hsl(20,12%,20%)", background: "hsl(20,12%,12%)" }}>
                      <span className="pl-3 pr-2 shrink-0" style={{ color: "hsl(0,55%,45%)" }}><Icon className="w-4 h-4" /></span>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[key]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        className="flex-1 py-2.5 pr-3 text-sm bg-transparent focus:outline-none placeholder:opacity-40"
                        style={{ color: "hsl(38,30%,88%)" }}
                        dir="rtl"
                        onFocus={e => (e.currentTarget.parentElement!.style.borderColor = "hsl(0,55%,40%)")}
                        onBlur={e => (e.currentTarget.parentElement!.style.borderColor = "hsl(20,12%,20%)")}
                      />
                    </div>
                  ))}
                </div>

                {formError && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-sm text-xs" style={{ background: "hsl(0,55%,15%)", border: "1px solid hsl(0,55%,28%)", color: "hsl(0,55%,65%)" }} dir="rtl">
                    <Siren className="w-3 h-3 shrink-0" />
                    {formError}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={sendOrder}
                  disabled={sending}
                  data-testid="btn-checkout"
                  className="w-full py-4 font-bebas text-lg tracking-widest uppercase rounded-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, hsl(0,55%,32%), hsl(0,55%,40%))", color: "white", boxShadow: "0 4px 24px hsl(0,55%,35%,0.4)", border: "1px solid hsl(0,55%,45%,0.3)" }}
                >
                  {sending ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white/25 border-t-white rounded-full" />
                  ) : (
                    <>
                      <Siren className="w-5 h-5" />
                      SEND RESCUE ORDER
                    </>
                  )}
                </motion.button>
              </>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── EMERGENCY CARD ─── */
function EmergencyCard({ category, onAddToCart }: { category: typeof menuCategories[0]; onAddToCart: (name: string, price: number | string) => void }) {
  const [flash, setFlash] = useState(false);
  function handleAdd(name: string, price: number | string) {
    setFlash(true);
    onAddToCart(name, price);
    setTimeout(() => setFlash(false), 600);
  }
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`relative bg-card border border-border rounded-sm overflow-hidden ${flash ? "ring-2 ring-[hsl(0,55%,35%)]" : ""}`}
      data-testid={`card-menu-${category.id}`}
    >
      <AnimatePresence>
        {flash && (
          <motion.div
            className="absolute inset-0 bg-[hsl(0,55%,35%)]/10 z-10 pointer-events-none rounded-sm"
            initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      <div className="h-1 bg-gradient-to-r from-[hsl(0,55%,35%)] via-[hsl(25,55%,50%)] to-[hsl(0,55%,35%)]" />
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-10 h-10 rounded-sm bg-[hsl(0,55%,35%)]/10 flex items-center justify-center shrink-0">
                <category.Icon size={22} style={{ color: "hsl(0,55%,35%)" }} />
              </div>
              <h3 className="font-bebas text-2xl tracking-wider text-foreground">{category.name}</h3>
            </div>
            <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-[hsl(0,55%,35%)] text-white">{category.tag}</span>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Emergency Card</div>
            <div className="w-8 h-8 rounded-full bg-[hsl(0,55%,35%)] flex items-center justify-center">
              <span className="text-white text-xs font-bold">911</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5 mb-4 pb-3 border-b border-border">
          <div>
            <div className="text-xs text-muted-foreground mb-1.5">Intensité</div>
            <HeatMeter level={category.heatLevel} />
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Préparation</div>
            <div className="text-sm font-semibold text-foreground flex items-center gap-1">
              <Clock className="w-3 h-3 text-muted-foreground" />
              {category.prepTime}
            </div>
          </div>
        </div>
        {(category as any).note && <div className="text-xs text-muted-foreground mb-2 font-medium italic">{(category as any).note}</div>}
        <ul className="space-y-2">
          {category.items.map((item) => (
            <li key={item.name} className="flex items-center justify-between group">
              <span className="text-sm text-foreground">{item.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[hsl(25,55%,50%)]">
                  {typeof item.price === "number" ? `${item.price} DA` : `${item.price} DA`}
                </span>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  data-testid={`btn-add-${category.id}-${item.name.replace(/\s/g, "-")}`}
                  onClick={() => handleAdd(item.name, item.price)}
                  className="w-7 h-7 rounded-sm bg-[hsl(0,55%,35%)] text-white text-base flex items-center justify-center hover:bg-[hsl(0,55%,25%)] font-bold leading-none shrink-0 shadow-md"
                >+</motion.button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ─── SOS BOX ─── */
function SOSBox({ onAddToCart }: { onAddToCart: (name: string, price: number | string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<{ name: string; price: number | string } | null>(null);
  const [spinning, setSpinning] = useState(false);

  const pools: Record<string, { name: string; price: number }[]> = {
    chicken: [
      { name: "Burger Crispy", price: 400 }, { name: "Tacos Crispy", price: 550 },
      { name: "Pasta Poulet", price: 600 }, { name: "Panuazzo Poulet", price: 600 },
    ],
    beef: [
      { name: "Burger Viande", price: 300 }, { name: "Tacos Viande", price: 450 },
      { name: "Magloub Viande", price: 500 }, { name: "Burger Double", price: 500 },
    ],
    mix: [
      { name: "Burger 911", price: 600 }, { name: "Tacos Mix", price: 600 },
      { name: "Malfouf Mix", price: 500 }, { name: "Poutine Crispy", price: 550 },
    ],
  };

  function pickMeal(type: "chicken" | "beef" | "mix") {
    setSelected(type);
    setSpinning(true);
    setRevealed(null);
    const pool = pools[type];
    const picked = pool[Math.floor(Math.random() * pool.length)];
    setTimeout(() => { setRevealed(picked); setSpinning(false); }, 1800);
  }

  return (
    <motion.div
      className="relative bg-card border-2 border-[hsl(0,55%,35%)] rounded-sm p-8 text-center overflow-hidden max-w-lg mx-auto"
      whileHover={{ boxShadow: "0 0 0 6px hsl(0,55%,35%,0.12)" }}
      data-testid="sos-box"
    >
      <motion.div
        className="absolute inset-0 rounded-sm border-2 border-[hsl(0,55%,35%)]"
        animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      {[["top-3 left-3", "border-t-2 border-l-2"], ["top-3 right-3", "border-t-2 border-r-2"], ["bottom-3 left-3", "border-b-2 border-l-2"], ["bottom-3 right-3", "border-b-2 border-r-2"]].map(([pos, cls]) => (
        <div key={pos} className={`absolute ${pos} w-8 h-8 border-[hsl(0,55%,35%)] ${cls}`} />
      ))}
      <div className="font-bebas text-5xl tracking-widest text-[hsl(0,55%,35%)] mb-1">SOS BOX</div>
      <p className="text-muted-foreground text-sm mb-6">Pas le temps de choisir? On s'occupe du reste.</p>
      <div className="flex gap-3 justify-center mb-6 flex-wrap">
        {(["chicken", "beef", "mix"] as const).map((type) => {
          const SosIcon = type === "chicken" ? GiChickenLeg : type === "beef" ? GiMeat : GiHamburger;
          const label = type === "chicken" ? "Chicken" : type === "beef" ? "Beef" : "Mix";
          return (
            <motion.button
              key={type}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.04 }}
              data-testid={`btn-sos-${type}`}
              onClick={() => pickMeal(type)}
              className={`flex items-center gap-2 px-6 py-3 rounded-sm font-semibold text-sm transition-colors uppercase tracking-wider ${selected === type ? "bg-[hsl(0,55%,35%)] text-white shadow-lg" : "bg-secondary text-foreground hover:bg-[hsl(0,55%,35%)] hover:text-white"}`}
            >
              <SosIcon size={18} />
              {label}
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        {spinning && (
          <motion.div key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4">
            <div className="flex items-center justify-center gap-3">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="w-6 h-6 border-2 border-[hsl(0,55%,35%)] border-t-transparent rounded-full" />
              <span className="text-sm font-semibold text-[hsl(0,55%,35%)] uppercase tracking-wider">Analyse de la situation</span>
            </div>
          </motion.div>
        )}
        {revealed && !spinning && (
          <motion.div key="reveal" initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="py-4">
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Mission assignée</div>
            <div className="font-bebas text-3xl text-foreground mb-1">{revealed.name}</div>
            <div className="font-bold text-[hsl(25,55%,50%)] text-xl mb-3">
              {typeof revealed.price === "number" ? `${revealed.price} DA` : `${revealed.price} DA`}
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              data-testid="btn-sos-add-cart"
              onClick={() => onAddToCart(revealed!.name, revealed!.price)}
              className="px-6 py-2.5 bg-[hsl(0,55%,35%)] text-white font-semibold text-sm rounded-sm hover:bg-[hsl(0,55%,28%)] transition-colors uppercase tracking-wider"
            >
              Ajouter au panier
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── ORDER TRACKER ─── */
function OrderTracker() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((p) => (p + 1) % (orderStatuses.length + 2)), 2000);
    return () => clearInterval(t);
  }, []);
  const current = step % (orderStatuses.length + 2);
  return (
    <div className="max-w-2xl mx-auto" data-testid="order-tracker">
      <div className="relative">
        <div className="absolute top-8 left-8 right-8 h-0.5 bg-border" />
        <motion.div
          className="absolute top-8 left-8 h-0.5 bg-[hsl(0,55%,35%)]"
          animate={{ width: current === 0 ? "0%" : `${((current - 1) / (orderStatuses.length - 1)) * 84}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        <div className="grid grid-cols-4 gap-2">
          {orderStatuses.map(({ id, label, Icon, desc }, i) => {
            const isActive = i < current;
            const isCurrent = i === current - 1;
            return (
              <div key={id} className="flex flex-col items-center text-center" data-testid={`step-order-${id}`}>
                <motion.div
                  animate={{ scale: isActive ? 1 : 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-16 h-16 rounded-sm flex items-center justify-center border-2 border-border mb-3 transition-colors duration-500"
                  style={{
                    backgroundColor: isActive ? "hsl(0,55%,35%)" : "hsl(var(--card))",
                    boxShadow: isCurrent ? "0 0 0 6px hsl(0,55%,35%,0.2)" : undefined,
                  }}
                >
                  <Icon className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                  {isCurrent && (
                    <motion.span
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[hsl(0,55%,35%)]"
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>
                <div className={`text-xs font-bold uppercase tracking-wide leading-tight mb-1 transition-colors duration-300 ${isActive ? "text-[hsl(0,55%,35%)]" : "text-muted-foreground"}`}>
                  {label}
                </div>
                <div className="text-xs text-muted-foreground">{desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── SECTION WRAPPER ─── */
function Section({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── SECTION HEADER ─── */
function SectionHeader({ badge, title, sub, dark = false }: { badge: string; title: string; sub?: string; dark?: boolean }) {
  return (
    <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="text-center mb-12">
      <motion.div variants={fadeUp} className={`inline-block text-xs font-bold uppercase tracking-widest mb-3 px-4 py-1.5 rounded-full ${dark ? "bg-[hsl(0,55%,35%)]/20 text-[hsl(0,55%,60%)]" : "bg-[hsl(0,55%,35%)]/10 text-[hsl(0,55%,35%)]"}`}>
        {badge}
      </motion.div>
      <motion.h2 variants={fadeUp} className={`font-bebas text-5xl sm:text-6xl tracking-tight mb-3 ${dark ? "text-[hsl(38,30%,94%)]" : "text-foreground"}`}>
        {title}
      </motion.h2>
      {sub && <motion.p variants={fadeUp} className={`text-sm max-w-md mx-auto ${dark ? "text-[hsl(38,15%,55%)]" : "text-muted-foreground"}`}>{sub}</motion.p>}
    </motion.div>
  );
}

/* ─── DELIVERY ROAD ─── */
function DeliveryRoad() {
  return (
    <div className="relative h-16 bg-[hsl(20,15%,15%)] rounded-sm overflow-hidden flex items-center" data-testid="delivery-road">
      <div className="absolute inset-0 flex items-center px-4 gap-6">
        {Array.from({ length: 14 }, (_, i) => (
          <div key={i} className="h-0.5 w-8 bg-[hsl(38,30%,70%)]/25 rounded" />
        ))}
      </div>
      <motion.div
        className="absolute h-0.5 bg-[hsl(0,55%,35%)]/40"
        style={{ top: "50%", left: 0, right: 0 }}
        animate={{ scaleX: [0, 1] }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      {/* SVG car */}
      <motion.div
        className="absolute"
        style={{ top: "50%", translateY: "-50%" }}
        animate={{ left: ["-64px", "calc(100% + 64px)"] }}
        transition={{ duration: 4, ease: "linear", repeat: Infinity, repeatDelay: 0.5 }}
      >
        <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="7" width="32" height="9" rx="2" fill="hsl(38,30%,80%)" />
          <path d="M8 7 L12 2 H26 L32 7" fill="hsl(38,30%,88%)" />
          <circle cx="11" cy="16" r="3" fill="hsl(20,15%,20%)" />
          <circle cx="29" cy="16" r="3" fill="hsl(20,15%,20%)" />
          <rect x="14" y="3" width="5" height="4" rx="0.5" fill="hsl(200,60%,75%)" opacity="0.7" />
          <rect x="21" y="3" width="5" height="4" rx="0.5" fill="hsl(200,60%,75%)" opacity="0.7" />
          <rect x="34" y="10" width="4" height="2" rx="1" fill="hsl(0,70%,60%)" />
        </svg>
      </motion.div>
      {/* Destination pin */}
      <div className="absolute right-5">
        <MapPin className="w-5 h-5 text-[hsl(0,55%,35%)]" />
      </div>
    </div>
  );
}

/* ─── NAVBAR ─── */
function Navbar({ cartCount, onCartOpen }: { cartCount: number; onCartOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(250,246,240,0)", "rgba(250,246,240,0.97)"]);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 60));
  }, [scrollY]);

  const navLinks = ["Menu", "Offers", "Delivery", "Contact"];
  function scrollTo(id: string) {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }

  return (
    <motion.nav
      style={{ backgroundColor: navBg }}
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-md border-b border-border/60 backdrop-blur-md" : ""}`}
      data-testid="navbar"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.02 }}
            data-testid="nav-logo"
          >
            <img src={logoImg} alt="911 Foods" className="w-14 h-14 rounded-full object-cover shadow-md" />
            <div>
              <div className="font-bebas text-xl tracking-widest text-foreground leading-none">911 FOODS</div>
              <div className="text-[9px] text-muted-foreground tracking-widest uppercase">Emergency Taste Response</div>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link}
                data-testid={`nav-link-${link.toLowerCase()}`}
                onClick={() => scrollTo(link)}
                className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest relative group"
              >
                {link}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[hsl(0,55%,35%)] group-hover:w-full transition-all duration-300 rounded" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              data-testid="btn-order-now-nav"
              onClick={() => scrollTo("contact")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[hsl(0,55%,35%)] text-white text-xs font-bold rounded-sm hover:bg-[hsl(0,55%,28%)] transition-colors uppercase tracking-widest"
            >
              Commander
              <ChevronRight className="w-3 h-3" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onCartOpen}
              data-testid="btn-open-cart"
              className="relative w-9 h-9 bg-card border border-border rounded-sm flex items-center justify-center hover:border-[hsl(0,55%,35%)] transition-colors"
            >
              <Siren className="w-4 h-4 text-foreground" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[hsl(0,55%,35%)] text-white text-xs rounded-full flex items-center justify-center font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <button
              className="md:hidden w-9 h-9 bg-card border border-border rounded-sm flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="btn-mobile-menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-card border-t border-border overflow-hidden"
            data-testid="mobile-menu"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link}
                  data-testid={`nav-mobile-${link.toLowerCase()}`}
                  onClick={() => scrollTo(link)}
                  className="w-full text-left py-2.5 px-4 text-sm font-bold uppercase tracking-widest text-foreground hover:bg-muted rounded-sm transition-colors"
                >
                  {link}
                </button>
              ))}
              <button
                data-testid="btn-order-now-mobile"
                onClick={() => scrollTo("contact")}
                className="w-full py-3 bg-[hsl(0,55%,35%)] text-white text-sm font-bold rounded-sm uppercase tracking-widest"
              >
                Commander Maintenant
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── MAIN HOME ─── */
export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("burger");
  const [dispatchActive, setDispatchActive] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  function addToCart(name: string, price: number | string) {
    const numPrice = typeof price === "number" ? price : parseInt(String(price).split("/")[0]);
    setCartItems((prev) => [...prev, { name, price: numPrice, id: `${Date.now()}-${Math.random()}` }]);
    setDispatchActive(true);
    setTimeout(() => setDispatchActive(false), 3200);
  }

  function removeFromCart(id: string) {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }

  const activeCat = menuCategories.find((c) => c.id === activeCategory) || menuCategories[0];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Scroll progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-[hsl(0,55%,35%)] origin-left z-[200]" style={{ scaleX }} />

      {/* ── DISPATCH EFFECTS ── */}
      <AnimatePresence>
        {dispatchActive && (
          <>
            {/* Red alert flash */}
            <motion.div
              key="red-alert"
              className="fixed inset-0 z-[300] pointer-events-none"
              initial={{ opacity: 0.25 }}
              animate={{ opacity: [0.25, 0, 0.18, 0] }}
              transition={{ duration: 0.9, times: [0, 0.4, 0.65, 1] }}
              style={{ backgroundColor: "hsl(0,65%,35%)" }}
            />
            {/* Car racing across top */}
            <motion.div
              key="dispatch-car"
              className="fixed z-[310] pointer-events-none select-none"
              style={{ top: "68px", fontSize: "2rem" }}
              initial={{ x: "-8vw" }}
              animate={{ x: "108vw" }}
              transition={{ duration: 2.6, ease: [0.2, 0.8, 0.6, 1] }}
            >
              🚨🚗
            </motion.div>
            {/* Unit Dispatched notification */}
            <motion.div
              key="dispatch-notif"
              className="fixed left-1/2 z-[320] pointer-events-none"
              style={{ top: "72px", x: "-50%" }}
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 450, damping: 28 }}
            >
              <div className="flex items-center gap-2 px-5 py-3 bg-[hsl(0,55%,35%)] text-white font-bold rounded-sm shadow-2xl text-sm tracking-wider border border-[hsl(0,55%,50%)]" dir="rtl">
                <Siren className="w-4 h-4 animate-pulse" />
                تمت الإضافة إلى السلة
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Navbar cartCount={cartItems.length} onCartOpen={() => setCartOpen(true)} />

      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            items={cartItems}
            onRemove={removeFromCart}
            onClose={() => setCartOpen(false)}
            hasDrink={cartItems.some(item =>
              (menuCategories.find(c => c.id === "boissons")?.items ?? []).some(i => i.name === item.name)
            )}
            onGoToDrinks={() => {
              setCartOpen(false);
              setActiveCategory("boissons");
              setTimeout(() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }), 150);
            }}
          />
        )}
      </AnimatePresence>

      {/* ─── HERO ─── */}
      <section
        id="hero"
        className="relative min-h-screen overflow-hidden bg-[hsl(20,15%,7%)] scanlines"
        data-testid="hero-section"
        onMouseMove={(e) => {
          const el = e.currentTarget.querySelector(".hero-spotlight") as HTMLElement | null;
          if (el) {
            const r = e.currentTarget.getBoundingClientRect();
            el.style.setProperty("--mx", `${e.clientX - r.left}px`);
            el.style.setProperty("--my", `${e.clientY - r.top}px`);
          }
        }}
      >

        {/* Mouse spotlight layer */}
        <div className="absolute inset-0 pointer-events-none z-[1] hero-spotlight" />

        {/* Grain overlay */}
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`, opacity: 1 }} />

        {/* Red glow top-left */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none z-[1]" style={{ background: "radial-gradient(circle, hsl(0,55%,35%,0.18) 0%, transparent 70%)" }} />

        {/* Floating particles */}
        <HeroParticles />

        {/* ── FULL-BLEED background image ── */}
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={heroFoodImg}
            alt=""
            aria-hidden
            className="w-full h-full object-cover object-center"
          />
          {/* Multi-layer dark overlay for text legibility */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, hsl(20,15%,5%,0.72) 0%, hsl(20,15%,5%,0.45) 50%, hsl(20,15%,5%,0.15) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(20,15%,5%,0.70) 0%, transparent 45%)" }} />
        </motion.div>

        {/* ── CONTENT — centered, overlaid ── */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Main content */}
          <div className="flex-1 flex items-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-16 pt-48 pb-12"
            >
              {/* Live badge */}
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[hsl(0,55%,35%)]/20 border border-[hsl(0,55%,35%)]/40 text-[hsl(0,55%,62%)] rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6">
                <motion.span className="w-2 h-2 rounded-full bg-[hsl(0,55%,50%)] inline-block" animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
                Emergency Food Station — 24h/7j
              </motion.div>

              {/* Arabic */}
              <motion.div variants={fadeUp} className="font-bebas tracking-widest text-[hsl(38,25%,60%)] mb-6" style={{ fontSize: "clamp(1.4rem, 3vw, 2.5rem)" }}>
                حالة جوع حرجة؟
              </motion.div>

              {/* Divider tagline */}
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8 max-w-xs">
                <div className="h-px flex-1 bg-white/15" />
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.35em] whitespace-nowrap">Fast. Hot. Legendary.</span>
              </motion.div>

              {/* CTA row */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-10">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 50px hsl(0,55%,35%,0.5)" }}
                  whileTap={{ scale: 0.96 }}
                  data-testid="btn-hero-cta"
                  onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-[hsl(0,55%,35%)] text-white font-bold text-sm rounded-sm shadow-2xl uppercase tracking-widest"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  Commander Maintenant
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  data-testid="btn-hero-secondary"
                  onClick={() => document.getElementById("sos")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-black/30 backdrop-blur-sm border border-white/20 text-white font-bold text-sm rounded-sm hover:border-[hsl(0,55%,40%)] hover:bg-black/50 transition-all uppercase tracking-widest"
                >
                  <Timer className="w-4 h-4" />
                  SOS Box
                </motion.button>
              </motion.div>

            </motion.div>
          </div>
        </div>

        {/* ── STATS BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="relative z-10 border-t border-[hsl(38,15%,15%)] bg-[hsl(20,15%,9%)]"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-3 divide-x divide-[hsl(38,15%,15%)]">
              {[
                { Icon: Clock, label: "Livraison Express", sub: "En moins de 30 min" },
                { Icon: ShieldCheck, label: "Produits Frais", sub: "Qualité garantie" },
                { Icon: Flame, label: "Goût Légendaire", sub: "Préparé avec passion" },
              ].map(({ Icon, label, sub }) => (
                <motion.div
                  key={label}
                  whileHover={{ backgroundColor: "hsl(20,15%,12%)" }}
                  className="flex flex-col sm:flex-row items-center sm:items-center gap-3 py-5 px-4 sm:px-8 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-[hsl(0,55%,35%)] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[hsl(0,55%,45%)]" strokeWidth={2.5} />
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="font-bebas text-sm tracking-widest text-[hsl(38,30%,88%)] uppercase leading-tight">{label}</div>
                    <div className="text-[10px] text-[hsl(38,15%,45%)] uppercase tracking-wider">{sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── MENU ─── */}
      <Section className="py-20 px-4 sm:px-6 bg-muted/40" id="menu">
        <div className="max-w-6xl mx-auto">
          {/* Category tabs — icon grid */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-5 gap-3 mb-10">
            {menuCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  variants={fadeIn}
                  whileTap={{ scale: 0.93 }}
                  whileHover={{ scale: 1.04 }}
                  data-testid={`tab-category-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex flex-col items-center justify-end gap-2 pt-2 pb-2.5 px-1 rounded-sm transition-all border ${isActive ? "bg-[hsl(0,55%,35%)] border-[hsl(0,55%,45%)] shadow-lg" : "bg-card border-border hover:border-[hsl(0,55%,35%)]"}`}
                >
                  {cat.img ? (
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="w-full h-20 object-contain drop-shadow-md px-1"
                    />
                  ) : (
                    <cat.Icon size={48} className={isActive ? "text-white/80" : "text-foreground/60"} />
                  )}
                  <span className={`font-bebas tracking-widest text-[11px] leading-none ${isActive ? "text-white" : "text-foreground"}`}>
                    {cat.name}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          <div className="max-w-lg mx-auto">
            <AnimatePresence mode="wait">
              <EmergencyCard key={activeCat.id} category={activeCat} onAddToCart={addToCart} />
            </AnimatePresence>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-10 p-6 bg-card border border-border rounded-sm max-w-lg mx-auto" data-testid="supplements-section">
            <div className="font-bebas text-2xl tracking-wider text-foreground mb-3">Supplements</div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
              {[{ name: "Frite", price: "150 / 200 DA" }, { name: "Camembert", price: "150 DA" }, { name: "Cheddar", price: "150 DA" }, { name: "Gruyère", price: "200 DA" }, { name: "Motzarella", price: "150 DA" }, { name: "Oeuf", price: "50 DA" }].map((s) => (
                <div key={s.name} className="flex justify-between items-center text-sm">
                  <span className="text-foreground">{s.name}</span>
                  <span className="font-bold text-[hsl(25,55%,50%)]">{s.price}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>


      {/* ─── MOST WANTED ─── */}
      <Section className="py-20 px-4 sm:px-6" id="featured">
        <div className="max-w-6xl mx-auto">
          <SectionHeader badge="Most Wanted Meals" title="Emergency Stars" sub="Les missions les plus demandées. Commandez avant rupture de stock." />
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredItems.map((item, i) => (
              <motion.div key={item.id} variants={fadeUp}>
                <TiltCard className="relative bg-card border border-border rounded-sm p-6 overflow-hidden h-full">
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${i === 0 ? "from-[hsl(0,55%,35%)] via-[hsl(25,55%,50%)] to-[hsl(0,55%,35%)]" : i === 1 ? "from-[hsl(25,55%,45%)] via-[hsl(38,70%,58%)] to-[hsl(25,55%,45%)]" : "from-[hsl(0,55%,28%)] via-[hsl(0,55%,42%)] to-[hsl(0,55%,28%)]"}`} />

                  {/* Rank badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-sm bg-[hsl(0,55%,35%)]/10 border border-[hsl(0,55%,35%)]/25 flex items-center justify-center">
                      <span className="font-bebas text-2xl text-[hsl(0,55%,35%)] leading-none">{i + 1}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: item.heatLevel }, (_, k) => (
                        <Star key={k} className="w-3 h-3 fill-[hsl(25,80%,58%)] text-[hsl(25,80%,58%)]" />
                      ))}
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-[hsl(0,55%,35%)]/10 text-[hsl(0,55%,42%)] mb-3">
                    <TrendingUp className="w-3 h-3" />
                    {item.badge}
                  </div>
                  <h3 className="font-bebas text-3xl tracking-wide text-foreground mb-2">{item.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{item.desc}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-bebas text-2xl price-shimmer" data-testid={`card-featured-${item.id}`}>
                      {typeof item.price === "number" ? `${item.price} DA` : `${item.price} DA`}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.88 }}
                      data-testid={`btn-featured-add-${item.id}`}
                      onClick={() => addToCart(item.name, item.price)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-[hsl(0,55%,35%)] text-white text-xs font-bold rounded-sm hover:bg-[hsl(0,55%,28%)] transition-colors uppercase tracking-wide shadow-lg"
                    >
                      <Zap className="w-3 h-3 fill-white/30" />
                      Ajouter
                    </motion.button>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ─── CODE RED ─── */}
      <Section className="py-20 px-4 sm:px-6 bg-[hsl(20,15%,12%)]" id="offers">
        <div className="max-w-6xl mx-auto">
          <SectionHeader dark badge="Emergency Deals" title="NOS BOXES" sub="Rescue Combos disponibles. Ne laissez pas votre faim gagner." />
          <motion.div variants={stagger} initial="show" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {codeRedDeals.map((deal) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8, borderColor: "hsl(0,55%,35%)" }}
                className="relative bg-[hsl(20,15%,16%)] border border-[hsl(20,12%,22%)] rounded-sm p-6 transition-colors"
                data-testid={`card-deal-${deal.id}`}
              >
                <div className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-[hsl(0,55%,35%)]/20 text-[hsl(0,55%,60%)] mb-3 uppercase tracking-widest">{deal.badge}</div>
                <h3 className="font-bebas text-2xl tracking-wide text-[hsl(38,30%,94%)] mb-1">{deal.title}</h3>
                <p className="text-[hsl(38,15%,55%)] text-sm mb-4">{deal.desc}</p>
                <div className="font-bebas text-4xl mb-2" style={{ color: "hsl(25,55%,55%)" }}>{deal.newPrice} DA</div>
                <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "hsl(0,55%,55%)" }}>{deal.urgency}</div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  data-testid={`btn-deal-order-${deal.id}`}
                  onClick={() => addToCart(deal.title, deal.newPrice)}
                  className="w-full py-3 bg-[hsl(0,55%,35%)] text-white font-bold text-sm rounded-sm hover:bg-[hsl(0,55%,28%)] transition-colors uppercase tracking-widest"
                >
                  Rescue This Deal
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ─── ORDER TRACKER ─── */}
      <Section className="py-20 px-4 sm:px-6" id="tracker">
        <div className="max-w-6xl mx-auto">
          <SectionHeader badge="Operations Room" title="Suivi de Mission" sub="Chaque commande est une mission de sauvetage en temps réel." />
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-card border border-border rounded-sm p-8 shadow-lg">
            <OrderTracker />
          </motion.div>
        </div>
      </Section>

      {/* ─── SOS BOX ─── */}
      <Section className="py-20 px-4 sm:px-6 bg-muted/40" id="sos">
        <div className="max-w-6xl mx-auto">
          <SectionHeader badge="Indecision Emergency" title="SOS Box" sub="Vous ne savez pas quoi commander? Choisissez votre protéine — on fait le reste." />
          <SOSBox onAddToCart={addToCart} />
        </div>
      </Section>

      {/* ─── DELIVERY ─── */}
      <Section className="py-20 px-4 sm:px-6" id="delivery">
        <div className="max-w-6xl mx-auto">
          <SectionHeader badge="Rescue Operations" title="Fastest Delivery in Town" sub="Nos unités mobiles patrouillent 24h/7j. Votre faim ne peut pas nous échapper." />
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {[
              { Icon: Zap, title: "Ultra Rapide", desc: "Livraison en 25-35 minutes. En état d'alerte permanent.", stat: 30, suffix: " min" },
              { Icon: Clock, title: "Disponible 24h", desc: "Hunger never sleeps. Neither do we. Appelez à toute heure.", stat: 24, suffix: "h/7j" },
              { Icon: MapPin, title: "Partout", desc: "Rescue Combos livrés dans tout le secteur. Vérifiez votre zone.", stat: 100, suffix: "%" },
            ].map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                whileHover={{ y: -6, boxShadow: "0 24px 48px hsl(0,55%,35%,0.12)" }}
                className="bg-card border border-border rounded-sm p-6 text-center transition-shadow"
                data-testid={`card-delivery-${f.title.replace(/\s/g, "-")}`}
              >
                <div className="w-14 h-14 rounded-sm bg-[hsl(0,55%,35%)]/10 border border-[hsl(0,55%,35%)]/20 flex items-center justify-center mx-auto mb-4">
                  <f.Icon className="w-6 h-6 text-[hsl(0,55%,35%)]" />
                </div>
                <div className="font-bebas text-4xl text-[hsl(0,55%,35%)] mb-1">
                  <AnimatedCounter target={f.stat} suffix={f.suffix} />
                </div>
                <div className="font-bold text-foreground mb-2">{f.title}</div>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <DeliveryRoad />
        </div>
      </Section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-20 px-4 sm:px-6 bg-[hsl(20,15%,12%)]" data-testid="contact-section">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader dark badge="Appelez les Secours" title="Commander Maintenant" sub="Emergency Cravings? Composez le numéro. Nos agents sont en attente." />
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            {[
              { href: "tel:0771479840", num: "0771 47 98 40", primary: true },
              { href: "tel:0771476027", num: "0771 47 60 27", primary: false },
            ].map((p) => (
              <motion.a
                key={p.num}
                variants={fadeUp}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href={p.href}
                data-testid={`link-phone-${p.num}`}
                className={`flex items-center gap-3 px-8 py-4 font-bold text-lg rounded-sm transition-colors ${p.primary ? "bg-[hsl(0,55%,35%)] text-white shadow-xl hover:bg-[hsl(0,55%,28%)]" : "bg-[hsl(20,15%,18%)] border border-[hsl(20,12%,28%)] text-[hsl(38,30%,88%)] hover:border-[hsl(0,55%,35%)]"}`}
              >
                <Phone className="w-5 h-5" />
                {p.num}
              </motion.a>
            ))}
          </motion.div>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            href="https://instagram.com/911food_07"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-instagram"
            className="inline-flex items-center gap-3 text-[hsl(38,25%,65%)] hover:text-[hsl(38,30%,88%)] transition-colors text-sm font-semibold"
          >
            <Instagram className="w-5 h-5" />
            @911food_07
          </motion.a>
        </div>
      </section>

      <FloatingCTA />

      {/* ─── FOOTER ─── */}
      <footer className="py-8 px-4 bg-[hsl(20,15%,8%)] border-t border-[hsl(20,12%,15%)]" data-testid="footer">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="911 Foods" className="w-8 h-8 rounded-full object-cover" />
            <div>
              <div className="font-bebas text-lg tracking-widest text-[hsl(38,30%,88%)]">911 FOODS</div>
              <div className="text-[hsl(38,15%,40%)] text-xs">We Save Hunger.</div>
            </div>
          </div>
          <div className="text-[hsl(38,15%,30%)] text-xs text-center">© 2024 911 Foods — Emergency Taste Response</div>
          <div className="flex items-center gap-2 text-xs text-[hsl(38,15%,40%)]">
            <motion.span
              className="w-2 h-2 rounded-full bg-green-500 inline-block"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            En service — 24h/7j
          </div>
        </div>
      </footer>
    </div>
  );
}
