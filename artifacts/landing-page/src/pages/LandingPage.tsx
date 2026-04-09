import { useState, useEffect, useRef, useCallback } from "react";
import { useConfig, useGeoCity, type AppConfig } from "../lib/sharedConfig";

// =============================================
// TRANSLATIONS — add new language blocks here
// =============================================
const translations: Record<string, Record<string, string>> = {
  pt: {
    hero_eyebrow: "Google Business Profile",
    hero_typing: "Apareça no Google quando alguém pesquisa o que você vende.",
    hero_sub: "Seu perfil otimizado por especialistas. Você só abre a porta.",
    hero_badge: "📍 Atendimento em",
    cta_btn: "Garantir minha vaga",
    cta_price: "por apenas",
    pain_tag: "O problema",
    pain_title: "Enquanto você trabalha, seus concorrentes aparecem primeiro.",
    pain_card1_title: "Você não aparece",
    pain_card1_desc: "Cliente busca 'restaurante perto de mim' e seu negócio é invisível.",
    pain_card2_title: "Fotos antigas",
    pain_card2_desc: "Perfil com fotos borradas de anos atrás afastam clientes.",
    pain_card3_title: "Sem avaliações",
    pain_card3_desc: "O concorrente tem 47 reviews. Você, zero. A escolha é óbvia.",
    edu_tag: "Por que funciona",
    edu_title: "O Google Business é seu vendedor digital — gratuito, 24h por dia.",
    edu_stat1_label: "pesquisam no Google antes de visitar um negócio",
    edu_stat2_label: "mais pedidos de rota com fotos profissionais",
    edu_stat3_label: "mais chamadas para perfis otimizados",
    edu_diag1: "Pesquisa Google",
    edu_diag2: "Perfil Otimizado",
    edu_diag3: "Cliente na porta",
    svc_tag: "O serviço",
    svc_title: "Tudo feito por nós. Você só aprova.",
    svc_1: "Criação ou otimização completa do perfil Google",
    svc_2: "Categoria certa para aparecer nas buscas do seu segmento",
    svc_3: "Descrição profissional e persuasiva do negócio",
    svc_4: "15 fotos profissionais tiradas no seu estabelecimento",
    svc_5: "Horários, endereço, telefone e site 100% corretos",
    svc_6: "Configuração para aparecer no Google Maps",
    svc_7: "Entrega em até 2 semanas",
    svc_note: "Nenhum conhecimento de tecnologia necessário. Cuidamos de tudo.",
    proof_tag: "Resultado real",
    proof_title: "Um cliente nosso após a otimização.",
    proof_views: "Visualizações",
    proof_interactions: "Interações",
    proof_searches: "Aparece nas buscas por",
    proof_disclaimer: "Dados reais · perfil otimizado nov/2025–abr/2026",
    inv_tag: "Investimento",
    inv_title: "Menos que um anúncio no jornal. Resultado que dura meses.",
    inv_installment: "em 2x sem juros",
    inv_step1_label: "Hoje",
    inv_step1_desc: "Entrada via PIX para reservar sua vaga",
    inv_step2_label: "Na entrega",
    inv_step2_desc: "Saldo quando o perfil estiver 100% pronto",
    inv_scarcity: "Vagas limitadas por região",
    inv_validity: "Proposta válida por 15 dias",
    faq_tag: "Dúvidas",
    faq_title: "Perguntas frequentes",
    faq_q1: "Já tenho perfil no Google. Funciona pra mim?",
    faq_a1: "Sim. A maioria dos perfis está incompleta ou mal configurada. Otimizamos o que você tem — ou criamos do zero.",
    faq_q2: "Quanto tempo para ver resultado?",
    faq_a2: "Você começa a aparecer nas buscas assim que o perfil for publicado. Os resultados crescem nas primeiras 4 a 8 semanas.",
    faq_q3: "E se eu não tiver site?",
    faq_a3: "Não precisa. O Google Business funciona de forma independente de site.",
    faq_q4: "Vale para qualquer tipo de negócio?",
    faq_a4: "Se você tem endereço físico e atende clientes locais, vale. Simples assim.",
    final_tag: "Comece agora",
    final_title: "Seu concorrente vai aparecer primeiro amanhã. A não ser que você aja hoje.",
    final_sub_prefix: "Reserve sua vaga com",
    final_sub_suffix: "via PIX. Começamos em até 48h.",
    sticky_label: "Garantir minha vaga →",
    sticky_suffix: "via PIX",
    modal_title: "Pagar com PIX",
    modal_key_label: "Chave PIX",
    modal_amount_label: "Valor",
    modal_name_label: "Beneficiário",
    modal_copy: "Copiar chave PIX",
    modal_copied: "Copiado!",
    modal_instructions: "Após o pagamento, envie o comprovante pelo WhatsApp para confirmar sua vaga.",
    modal_whatsapp: "Enviar comprovante no WhatsApp",
    modal_transfer_label: "Dados bancários",
    modal_cash: "Combinamos o pagamento pessoalmente. Entre em contato pelo WhatsApp.",
    modal_card: "Enviaremos o link de pagamento pelo WhatsApp.",
    modal_close: "Fechar",
  },
  en: {
    hero_eyebrow: "Google Business Profile",
    hero_typing: "Show up on Google when someone searches for what you sell.",
    hero_sub: "Your profile optimized by experts. You just open the door.",
    hero_badge: "📍 Serving",
    cta_btn: "Reserve my spot",
    cta_price: "for only",
    pain_tag: "The problem",
    pain_title: "While you work hard, your competitors show up first.",
    pain_card1_title: "You're invisible",
    pain_card1_desc: "Customer searches 'restaurant near me' and your business doesn't appear.",
    pain_card2_title: "Outdated photos",
    pain_card2_desc: "A profile with blurry old photos drives customers away.",
    pain_card3_title: "No reviews",
    pain_card3_desc: "Your competitor has 47 reviews. You have zero. The choice is obvious.",
    edu_tag: "Why it works",
    edu_title: "Google Business is your digital salesperson — free, 24/7.",
    edu_stat1_label: "search Google before visiting a business",
    edu_stat2_label: "more direction requests with professional photos",
    edu_stat3_label: "more calls for businesses with optimized profiles",
    edu_diag1: "Google Search",
    edu_diag2: "Optimized Profile",
    edu_diag3: "Customer walks in",
    svc_tag: "The service",
    svc_title: "We handle everything. You just approve.",
    svc_1: "Full Google profile creation or optimization",
    svc_2: "Right category to appear in your segment's searches",
    svc_3: "Professional, persuasive business description",
    svc_4: "15 professional photos taken at your location",
    svc_5: "Hours, address, phone, and website 100% accurate",
    svc_6: "Setup to appear on Google Maps",
    svc_7: "Delivered within 2 weeks",
    svc_note: "No technical knowledge needed. We take care of everything.",
    proof_tag: "Real result",
    proof_title: "One of our clients after optimization.",
    proof_views: "Views",
    proof_interactions: "Interactions",
    proof_searches: "Appears in searches for",
    proof_disclaimer: "Real data · optimized profile Nov/2025–Apr/2026",
    inv_tag: "Investment",
    inv_title: "Less than a newspaper ad. Results that last months.",
    inv_installment: "in 2 interest-free payments",
    inv_step1_label: "Today",
    inv_step1_desc: "Upfront payment to reserve your spot",
    inv_step2_label: "On delivery",
    inv_step2_desc: "Balance when your profile is 100% ready",
    inv_scarcity: "Limited spots per region",
    inv_validity: "Offer valid for 15 days",
    faq_tag: "Questions",
    faq_title: "Frequently asked questions",
    faq_q1: "I already have a Google profile. Does this work for me?",
    faq_a1: "Yes. Most profiles are incomplete or poorly configured. We optimize what you have — or start from scratch.",
    faq_q2: "How long until I see results?",
    faq_a2: "You start appearing in searches as soon as the profile is published. Results grow in the first 4 to 8 weeks.",
    faq_q3: "What if I don't have a website?",
    faq_a3: "You don't need one. Google Business works independently of a website.",
    faq_q4: "Does it work for any type of business?",
    faq_a4: "If you have a physical address and serve local customers, yes. Simple as that.",
    final_tag: "Start now",
    final_title: "Your competitor will show up first tomorrow. Unless you act today.",
    final_sub_prefix: "Reserve your spot for",
    final_sub_suffix: "via payment. We start within 48 hours.",
    sticky_label: "Reserve my spot →",
    sticky_suffix: "via payment",
    modal_title: "Payment Details",
    modal_key_label: "Payment Key",
    modal_amount_label: "Amount",
    modal_name_label: "Beneficiary",
    modal_copy: "Copy payment key",
    modal_copied: "Copied!",
    modal_instructions: "After payment, send the receipt via WhatsApp to confirm your spot.",
    modal_whatsapp: "Send receipt via WhatsApp",
    modal_transfer_label: "Bank details",
    modal_cash: "We'll arrange payment in person. Contact us via WhatsApp.",
    modal_card: "We'll send the payment link via WhatsApp.",
    modal_close: "Close",
  },
  es: {
    hero_eyebrow: "Google Business Profile",
    hero_typing: "Aparece en Google cuando alguien busca lo que vendes.",
    hero_sub: "Tu perfil optimizado por expertos. Tú solo abres la puerta.",
    hero_badge: "📍 Atendemos en",
    cta_btn: "Reservar mi lugar",
    cta_price: "por solo",
    pain_tag: "El problema",
    pain_title: "Mientras trabajas, tus competidores aparecen primero.",
    pain_card1_title: "Eres invisible",
    pain_card1_desc: "Cliente busca 'restaurante cerca de mí' y tu negocio no aparece.",
    pain_card2_title: "Fotos viejas",
    pain_card2_desc: "Un perfil con fotos borrosas de años atrás aleja clientes.",
    pain_card3_title: "Sin reseñas",
    pain_card3_desc: "Tu competidor tiene 47 reseñas. Tú, cero. La elección es obvia.",
    edu_tag: "Por qué funciona",
    edu_title: "Google Business es tu vendedor digital — gratis, 24 horas.",
    edu_stat1_label: "buscan en Google antes de visitar un negocio",
    edu_stat2_label: "más solicitudes de ruta con fotos profesionales",
    edu_stat3_label: "más llamadas para perfiles optimizados",
    edu_diag1: "Búsqueda Google",
    edu_diag2: "Perfil Optimizado",
    edu_diag3: "Cliente en la puerta",
    svc_tag: "El servicio",
    svc_title: "Nosotros hacemos todo. Tú solo apruebas.",
    svc_1: "Creación u optimización completa del perfil Google",
    svc_2: "Categoría correcta para aparecer en búsquedas de tu segmento",
    svc_3: "Descripción profesional y persuasiva del negocio",
    svc_4: "15 fotos profesionales tomadas en tu local",
    svc_5: "Horarios, dirección, teléfono y sitio web 100% correctos",
    svc_6: "Configuración para aparecer en Google Maps",
    svc_7: "Entrega en hasta 2 semanas",
    svc_note: "Sin conocimientos técnicos necesarios. Nos encargamos de todo.",
    proof_tag: "Resultado real",
    proof_title: "Un cliente nuestro tras la optimización.",
    proof_views: "Visualizaciones",
    proof_interactions: "Interacciones",
    proof_searches: "Aparece en búsquedas de",
    proof_disclaimer: "Datos reales · perfil optimizado nov/2025–abr/2026",
    inv_tag: "Inversión",
    inv_title: "Menos que un anuncio en el periódico. Resultados que duran meses.",
    inv_installment: "en 2 cuotas sin interés",
    inv_step1_label: "Hoy",
    inv_step1_desc: "Pago inicial para reservar tu lugar",
    inv_step2_label: "En entrega",
    inv_step2_desc: "Saldo cuando el perfil esté 100% listo",
    inv_scarcity: "Cupos limitados por región",
    inv_validity: "Oferta válida por 15 días",
    faq_tag: "Dudas",
    faq_title: "Preguntas frecuentes",
    faq_q1: "Ya tengo perfil en Google. ¿Funciona para mí?",
    faq_a1: "Sí. La mayoría de perfiles están incompletos o mal configurados. Optimizamos lo que tienes — o creamos desde cero.",
    faq_q2: "¿Cuánto tiempo para ver resultados?",
    faq_a2: "Empiezas a aparecer en búsquedas en cuanto el perfil se publique. Los resultados crecen en las primeras 4 a 8 semanas.",
    faq_q3: "¿Y si no tengo sitio web?",
    faq_a3: "No lo necesitas. Google Business funciona de forma independiente.",
    faq_q4: "¿Vale para cualquier tipo de negocio?",
    faq_a4: "Si tienes dirección física y atiendes clientes locales, sí. Así de simple.",
    final_tag: "Empieza ahora",
    final_title: "Tu competidor aparecerá primero mañana. A menos que actúes hoy.",
    final_sub_prefix: "Reserva tu lugar por",
    final_sub_suffix: "por pago. Empezamos en 48 horas.",
    sticky_label: "Reservar mi lugar →",
    sticky_suffix: "por pago",
    modal_title: "Datos de Pago",
    modal_key_label: "Clave de pago",
    modal_amount_label: "Monto",
    modal_name_label: "Beneficiario",
    modal_copy: "Copiar clave",
    modal_copied: "¡Copiado!",
    modal_instructions: "Tras el pago, envía el comprobante por WhatsApp para confirmar tu lugar.",
    modal_whatsapp: "Enviar comprobante por WhatsApp",
    modal_transfer_label: "Datos bancarios",
    modal_cash: "Coordinamos el pago en persona. Contáctanos por WhatsApp.",
    modal_card: "Te enviaremos el enlace de pago por WhatsApp.",
    modal_close: "Cerrar",
  },
  th: {
    hero_eyebrow: "Google Business Profile",
    hero_typing: "ปรากฏบน Google เมื่อลูกค้าค้นหาสิ่งที่คุณขาย",
    hero_sub: "โปรไฟล์ของคุณที่ปรับปรุงโดยผู้เชี่ยวชาญ คุณแค่เปิดประตู",
    hero_badge: "📍 ให้บริการใน",
    cta_btn: "จองที่นั่งของฉัน",
    cta_price: "เพียง",
    pain_tag: "ปัญหา",
    pain_title: "ขณะที่คุณทำงานหนัก คู่แข่งปรากฏก่อน",
    pain_card1_title: "คุณมองไม่เห็น",
    pain_card1_desc: "ลูกค้าค้นหา 'ร้านอาหารใกล้ฉัน' แต่ธุรกิจของคุณไม่ปรากฏ",
    pain_card2_title: "รูปภาพเก่า",
    pain_card2_desc: "โปรไฟล์ที่มีรูปภาพเบลอเก่าๆ ทำให้ลูกค้าหนีห่าง",
    pain_card3_title: "ไม่มีรีวิว",
    pain_card3_desc: "คู่แข่งมี 47 รีวิว คุณมีศูนย์ การเลือกชัดเจน",
    edu_tag: "ทำไมถึงได้ผล",
    edu_title: "Google Business คือพนักงานขายดิจิทัลของคุณ ฟรี 24 ชั่วโมง",
    edu_stat1_label: "ค้นหาบน Google ก่อนเยี่ยมธุรกิจ",
    edu_stat2_label: "คำขอเส้นทางเพิ่มด้วยรูปมืออาชีพ",
    edu_stat3_label: "การโทรเพิ่มสำหรับโปรไฟล์ที่ดี",
    edu_diag1: "ค้นหา Google",
    edu_diag2: "โปรไฟล์ที่ดี",
    edu_diag3: "ลูกค้าเข้าร้าน",
    svc_tag: "บริการ",
    svc_title: "เราจัดการทุกอย่าง คุณแค่อนุมัติ",
    svc_1: "สร้างหรือปรับปรุงโปรไฟล์ Google ครบถ้วน",
    svc_2: "หมวดหมู่ที่ถูกต้องเพื่อปรากฏในการค้นหา",
    svc_3: "คำอธิบายธุรกิจมืออาชีพและโน้มน้าวใจ",
    svc_4: "รูปภาพมืออาชีพ 15 รูปถ่ายที่สถานที่ของคุณ",
    svc_5: "เวลา ที่อยู่ โทรศัพท์ และเว็บไซต์ถูกต้อง 100%",
    svc_6: "ตั้งค่าให้ปรากฏบน Google Maps",
    svc_7: "ส่งมอบภายใน 2 สัปดาห์",
    svc_note: "ไม่จำเป็นต้องมีความรู้ด้านเทคโนโลยี เราดูแลทุกอย่าง",
    proof_tag: "ผลลัพธ์จริง",
    proof_title: "ลูกค้าของเราหลังการปรับปรุง",
    proof_views: "การดู",
    proof_interactions: "การโต้ตอบ",
    proof_searches: "ปรากฏในการค้นหา",
    proof_disclaimer: "ข้อมูลจริง · โปรไฟล์ปรับปรุง พ.ย./2568–เม.ย./2569",
    inv_tag: "การลงทุน",
    inv_title: "ถูกกว่าโฆษณาหนังสือพิมพ์ ผลลัพธ์คงอยู่นานหลายเดือน",
    inv_installment: "แบ่ง 2 งวด ไม่มีดอกเบี้ย",
    inv_step1_label: "วันนี้",
    inv_step1_desc: "ชำระล่วงหน้าเพื่อจองที่นั่ง",
    inv_step2_label: "เมื่อส่งมอบ",
    inv_step2_desc: "ส่วนที่เหลือเมื่อโปรไฟล์พร้อม 100%",
    inv_scarcity: "จำนวนจำกัดต่อพื้นที่",
    inv_validity: "ข้อเสนอใช้ได้ 15 วัน",
    faq_tag: "คำถาม",
    faq_title: "คำถามที่พบบ่อย",
    faq_q1: "มีโปรไฟล์ Google แล้ว ใช้ได้ไหม?",
    faq_a1: "ได้ โปรไฟล์ส่วนใหญ่ไม่สมบูรณ์หรือตั้งค่าผิด เราปรับปรุงสิ่งที่มีหรือสร้างใหม่",
    faq_q2: "นานแค่ไหนถึงจะเห็นผล?",
    faq_a2: "คุณเริ่มปรากฏในการค้นหาทันทีที่โปรไฟล์เผยแพร่ ผลลัพธ์เติบโตใน 4–8 สัปดาห์แรก",
    faq_q3: "ถ้าไม่มีเว็บไซต์ล่ะ?",
    faq_a3: "ไม่จำเป็น Google Business ทำงานได้อิสระ",
    faq_q4: "ใช้ได้กับธุรกิจทุกประเภทไหม?",
    faq_a4: "ถ้ามีที่อยู่จริงและให้บริการลูกค้าในพื้นที่ คุ้มค่า แค่นั้นเอง",
    final_tag: "เริ่มเลย",
    final_title: "คู่แข่งของคุณจะปรากฏก่อนพรุ่งนี้ ถ้าคุณไม่ลงมือวันนี้",
    final_sub_prefix: "จองที่นั่งในราคา",
    final_sub_suffix: "ชำระ เราเริ่มภายใน 48 ชั่วโมง",
    sticky_label: "จองที่นั่งของฉัน →",
    sticky_suffix: "ชำระ",
    modal_title: "รายละเอียดการชำระเงิน",
    modal_key_label: "คีย์การชำระเงิน",
    modal_amount_label: "จำนวน",
    modal_name_label: "ผู้รับ",
    modal_copy: "คัดลอกคีย์",
    modal_copied: "คัดลอกแล้ว!",
    modal_instructions: "หลังชำระเงิน ส่งใบเสร็จผ่าน WhatsApp เพื่อยืนยันที่นั่ง",
    modal_whatsapp: "ส่งใบเสร็จทาง WhatsApp",
    modal_transfer_label: "ข้อมูลธนาคาร",
    modal_cash: "นัดชำระเงินด้วยตนเอง ติดต่อผ่าน WhatsApp",
    modal_card: "เราจะส่งลิงก์ชำระเงินผ่าน WhatsApp",
    modal_close: "ปิด",
  },
};

const LANGUAGES = [
  { code: "pt", flag: "🇧🇷", label: "PT" },
  { code: "en", flag: "🇺🇸", label: "EN" },
  { code: "es", flag: "🇦🇷", label: "ES" },
  { code: "th", flag: "🇹🇭", label: "TH" },
];

function getFinalSub(t: Record<string, string>, config: AppConfig): string {
  return `${t.final_sub_prefix} ${config.symbol} ${config.entryPrice} ${t.final_sub_suffix}`;
}

function detectLanguage(): string {
  const saved = localStorage.getItem("lang");
  if (saved && translations[saved]) return saved;
  const nav = navigator.language?.split("-")[0] || "pt";
  return translations[nav] ? nav : "pt";
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal, .reveal-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

function useCountUp(target: number, isVisible: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1400;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);
  return count;
}

function useTyping(text: string) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed(""); setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(timer); setDone(true); }
    }, 35);
    return () => clearInterval(timer);
  }, [text]);
  return { displayed, done };
}

interface StatBlockProps { value: number; suffix: string; label: string; color: string; }
function StatBlock({ value, suffix, label, color }: StatBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, visible);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="stat-card reveal-up" data-testid="stat-block">
      <div style={{ fontSize: "clamp(36px, 8vw, 48px)", fontWeight: 800, color, lineHeight: 1, marginBottom: 8 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5 }}>{label}</div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setOpen(!open)} data-testid="faq-toggle">
        <span>{question}</span>
        <span className={`faq-chevron ${open ? "open" : ""}`}>▾</span>
      </button>
      <div className={`faq-answer ${open ? "open" : ""}`}>
        <div className="faq-answer-inner">{answer}</div>
      </div>
    </div>
  );
}

function MetricBar({ pct, color }: { pct: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setW(pct), 100);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [pct]);
  return (
    <div ref={ref} className="metric-bar-track">
      <div className="metric-bar-fill" style={{ width: `${w}%`, background: color }} />
    </div>
  );
}

interface ModalProps { open: boolean; onClose: () => void; t: Record<string, string>; config: AppConfig; }
function PayModal({ open, onClose, t, config }: ModalProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (open) { setTimeout(() => setMounted(true), 10); document.body.style.overflow = "hidden"; }
    else { setMounted(false); document.body.style.overflow = ""; }
  }, [open]);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(config.paymentKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, [config.paymentKey]);

  const waText = encodeURIComponent("Olá, acabei de fazer o pagamento da entrada. Gostaria de confirmar minha vaga.");
  const waLink = `https://wa.me/${config.whatsapp}?text=${waText}`;

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose} data-testid="modal-overlay">
      <div className={`modal-sheet ${mounted ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
        <div style={{ width: 40, height: 4, background: "var(--line)", borderRadius: 100, margin: "0 auto 24px" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--ink)" }}>{t.modal_title}</h3>
          <button onClick={onClose} style={{ background: "var(--surface)", border: "none", borderRadius: 100, width: 32, height: 32, cursor: "pointer", fontSize: 18, color: "var(--ink-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>

        {config.paymentMethod === "pix" && (
          <>
            <div style={{ background: "var(--surface)", borderRadius: 14, padding: "16px 18px", marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{t.modal_key_label}</div>
              <code style={{ fontSize: 14, color: "var(--ink)", fontFamily: "monospace", wordBreak: "break-all" }}>{config.paymentKey}</code>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              <div style={{ background: "var(--surface)", borderRadius: 14, padding: "14px 16px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{t.modal_amount_label}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#4285F4" }}>{config.symbol} {config.entryPrice.toFixed(2)}</div>
              </div>
              <div style={{ background: "var(--surface)", borderRadius: 14, padding: "14px 16px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{t.modal_name_label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{config.salesName}</div>
              </div>
            </div>
            <button
              onClick={copy}
              data-testid="copy-key-btn"
              style={{
                width: "100%", padding: "14px", borderRadius: 12, marginBottom: 12,
                background: copied ? "#F0FFF6" : "#EDF2FF",
                border: `1.5px solid ${copied ? "#34A853" : "#4285F4"}`,
                color: copied ? "#34A853" : "#4285F4",
                fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit",
                transition: "all 0.2s",
              }}
            >
              {copied ? `✓ ${t.modal_copied}` : t.modal_copy}
            </button>
          </>
        )}

        {config.paymentMethod === "transfer" && (
          <div style={{ background: "var(--surface)", borderRadius: 14, padding: "16px", marginBottom: 16 }}>
            <p style={{ fontSize: 14, color: "var(--ink-soft)" }}>{t.modal_transfer_label}</p>
          </div>
        )}
        {config.paymentMethod === "cash" && (
          <div style={{ background: "var(--surface)", borderRadius: 14, padding: "16px", marginBottom: 16 }}>
            <p style={{ fontSize: 14, color: "var(--ink-soft)" }}>{t.modal_cash}</p>
          </div>
        )}
        {config.paymentMethod === "card" && (
          <div style={{ background: "var(--surface)", borderRadius: 14, padding: "16px", marginBottom: 16 }}>
            <p style={{ fontSize: 14, color: "var(--ink-soft)" }}>{t.modal_card}</p>
          </div>
        )}

        <p style={{ fontSize: 13, color: "var(--ink-faint)", textAlign: "center", marginBottom: 16, lineHeight: 1.6 }}>{t.modal_instructions}</p>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="whatsapp-btn"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            padding: "15px", borderRadius: 12, width: "100%",
            background: "linear-gradient(135deg, #25D366, #20BA5A)",
            color: "white", fontWeight: 700, fontSize: 15, textDecoration: "none",
          }}
        >
          <span style={{ fontSize: 20 }}>💬</span> {t.modal_whatsapp}
        </a>
      </div>
    </div>
  );
}

function Tag({ children, color = "#4285F4" }: { children: string; color?: string }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "5px 14px", borderRadius: 100,
      background: color + "12", border: `1.5px solid ${color}30`,
      color, fontSize: 12, fontWeight: 700,
      letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16,
    }}>
      {children}
    </div>
  );
}

function GoogleDots() {
  return (
    <span style={{ fontSize: "1.1em", fontWeight: 800, letterSpacing: "-0.03em" }}>
      <span style={{ color: "#4285F4" }}>G</span>
      <span style={{ color: "#EA4335" }}>o</span>
      <span style={{ color: "#FBBC05" }}>o</span>
      <span style={{ color: "#4285F4" }}>g</span>
      <span style={{ color: "#34A853" }}>l</span>
      <span style={{ color: "#EA4335" }}>e</span>
    </span>
  );
}

export default function LandingPage() {
  const config = useConfig();
  const [lang, setLang] = useState(detectLanguage);
  const [langOpen, setLangOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [langFade, setLangFade] = useState(true);
  const city = useGeoCity(config.city);
  const t = translations[lang] || translations["pt"];
  useReveal();

  const { displayed, done } = useTyping(t.hero_typing);

  const switchLang = (code: string) => {
    setLangFade(false);
    setTimeout(() => { setLang(code); localStorage.setItem("lang", code); setLangFade(true); }, 140);
    setLangOpen(false);
  };

  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
  const services = [t.svc_1, t.svc_2, t.svc_3, t.svc_4, t.svc_5, t.svc_6, t.svc_7];

  return (
    <div style={{ background: "white", color: "var(--ink)", minHeight: "100vh", opacity: langFade ? 1 : 0, transition: "opacity 0.14s ease" }}>

      {/* ── LANGUAGE SELECTOR ── */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 150 }}>
        <div style={{ position: "relative" }}>
          <button className="lang-btn" onClick={() => setLangOpen(!langOpen)} data-testid="lang-selector">
            {currentLang.flag} {currentLang.label} <span style={{ fontSize: 10, color: "var(--ink-faint)" }}>▾</span>
          </button>
          {langOpen && (
            <div className="lang-dropdown">
              {LANGUAGES.map((l) => (
                <div key={l.code} className={`lang-option ${l.code === lang ? "active" : ""}`} onClick={() => switchLang(l.code)} data-testid={`lang-${l.code}`}>
                  {l.flag} {l.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── SECTION 1: HERO ── */}
      <section className="hero-bg" style={{ paddingTop: "clamp(80px,12vw,120px)", paddingBottom: "clamp(64px,10vw,100px)" }}>
        <div className="page-wrap">
          <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
            <div style={{ marginBottom: 20 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "6px 16px", borderRadius: 100,
                background: "white", border: "1.5px solid var(--line)",
                fontSize: 13, fontWeight: 600, color: "var(--ink-soft)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }} data-testid="hero-badge">
                {t.hero_badge} {city}
              </span>
            </div>

            <div style={{ marginBottom: 18 }}>
              <Tag color="#4285F4">{t.hero_eyebrow}</Tag>
            </div>

            <h1 style={{
              fontSize: "clamp(28px, 5.5vw, 52px)",
              fontWeight: 800, lineHeight: 1.15,
              color: "var(--ink)", marginBottom: 20, letterSpacing: "-0.02em",
            }} data-testid="hero-title">
              {displayed}
              {!done && <span className="cursor" style={{ color: "#4285F4" }}>|</span>}
            </h1>

            <p style={{ fontSize: "clamp(16px, 2.5vw, 20px)", color: "var(--ink-soft)", lineHeight: 1.6, maxWidth: 560, margin: "0 auto 36px" }}>
              {t.hero_sub}
            </p>

            <button
              className="btn-primary"
              onClick={() => setModalOpen(true)}
              data-testid="hero-cta"
              style={{ padding: "16px 32px", fontSize: 17, borderRadius: 14, marginBottom: 12 }}
            >
              {t.cta_btn}
            </button>
            <div style={{ fontSize: 14, color: "var(--ink-faint)", marginBottom: 48 }}>
              {t.cta_price} {config.symbol} {config.entryPrice}
            </div>

            <div className="bounce" style={{ color: "var(--ink-faint)", fontSize: 22 }}>↓</div>
          </div>
        </div>
      </section>

      {/* ── GOOGLE ACCENT DIVIDER ── */}
      <div style={{ display: "flex", height: 4 }}>
        {["#4285F4","#EA4335","#FBBC05","#34A853"].map((c) => (
          <div key={c} style={{ flex: 1, background: c }} />
        ))}
      </div>

      {/* ── SECTION 2: PAIN ── */}
      <section className="section">
        <div className="page-wrap">
          <div className="reveal" style={{ marginBottom: 32 }}>
            <Tag color="#EA4335">{t.pain_tag}</Tag>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.02em", maxWidth: 580 }}>
              {t.pain_title}
            </h2>
          </div>

          <div className="two-col-pain">
            {[
              { title: t.pain_card1_title, desc: t.pain_card1_desc, icon: "🔍" },
              { title: t.pain_card2_title, desc: t.pain_card2_desc, icon: "📸" },
              { title: t.pain_card3_title, desc: t.pain_card3_desc, icon: "⭐" },
            ].map((card, i) => (
              <div key={i} className="pain-card reveal-up" style={{ transitionDelay: `${i * 0.08}s` }} data-testid={`pain-card-${i}`}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{card.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: "var(--ink)" }}>{card.title}</div>
                    <div style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.55 }}>{card.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── SECTION 3: EDUCATION ── */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="page-wrap">
          <div className="reveal" style={{ marginBottom: 40, textAlign: "center" }}>
            <Tag color="#34A853">{t.edu_tag}</Tag>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.02em", maxWidth: 620, margin: "0 auto" }}>
              <GoogleDots /> {t.edu_title}
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 48 }}>
            <StatBlock value={97} suffix="%" label={t.edu_stat1_label} color="#4285F4" />
            <StatBlock value={42} suffix="%" label={t.edu_stat2_label} color="#34A853" />
            <StatBlock value={5} suffix="×" label={t.edu_stat3_label} color="#FBBC05" />
          </div>

          <div className="reveal" style={{
            background: "white", border: "1.5px solid var(--line)", borderRadius: 20,
            padding: "28px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
          }}>
            {[
              { icon: "🔍", label: t.edu_diag1, color: "#4285F4" },
              { icon: "⚡", label: t.edu_diag2, color: "#FBBC05" },
              { icon: "🏪", label: t.edu_diag3, color: "#34A853" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 16, background: item.color + "12",
                    border: `1.5px solid ${item.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22, margin: "0 auto 10px",
                  }}>{item.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-soft)", lineHeight: 1.3 }}>{item.label}</div>
                </div>
                {i < 2 && <span style={{ color: "var(--ink-faint)", fontSize: 20, flexShrink: 0 }}>→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── SECTION 4: SERVICE ── */}
      <section className="section">
        <div className="page-wrap">
          <div style={{ display: "grid", gap: 40, alignItems: "start" }} className="two-col">
            <div className="reveal">
              <Tag color="#4285F4">{t.svc_tag}</Tag>
              <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: 20 }}>
                {t.svc_title}
              </h2>
              <div style={{
                background: "#F0F9FF", border: "1.5px solid #BFD9FF", borderRadius: 14,
                padding: "16px 18px", fontSize: 14, fontWeight: 600, color: "#4285F4", lineHeight: 1.6,
              }}>
                💡 {t.svc_note}
              </div>
            </div>

            <div className="reveal" style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: 20, padding: "8px 24px" }}>
              {services.map((item, i) => (
                <div key={i} className="service-row" data-testid={`service-item-${i}`}>
                  <div className="check-dot">✓</div>
                  <span style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── SECTION 5: PROOF ── */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="page-wrap">
          <div className="reveal" style={{ marginBottom: 32 }}>
            <Tag color="#34A853">{t.proof_tag}</Tag>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.02em", maxWidth: 560 }}>
              {t.proof_title}
            </h2>
          </div>

          <div className="metrics-card reveal" data-testid="metrics-card" style={{ maxWidth: 560 }}>
            <div className="metrics-header">
              <div className="google-g"><GoogleDots /></div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>Google Business Profile</div>
                <div style={{ fontSize: 12, color: "var(--ink-faint)" }}>Nov 2025 – Abr 2026</div>
              </div>
            </div>

            <div style={{ padding: "20px 20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <div style={{ background: "var(--surface)", borderRadius: 14, padding: "16px" }}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: "#4285F4" }}>983</div>
                  <div style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 4 }}>{t.proof_views}</div>
                </div>
                <div style={{ background: "var(--surface)", borderRadius: 14, padding: "16px" }}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: "#34A853" }}>370</div>
                  <div style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 4 }}>{t.proof_interactions}</div>
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                {[
                  { label: "Pesquisas diretas", pct: 72, color: "#4285F4" },
                  { label: "Pesquisas de descoberta", pct: 58, color: "#34A853" },
                  { label: "Google Maps", pct: 44, color: "#FBBC05" },
                ].map((bar, i) => (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--ink-soft)", marginBottom: 5 }}>
                      <span>{bar.label}</span>
                      <span style={{ fontWeight: 600, color: bar.color }}>{bar.pct}%</span>
                    </div>
                    <MetricBar pct={bar.pct} color={bar.color} />
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontSize: 12, color: "var(--ink-faint)", marginBottom: 8 }}>{t.proof_searches}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["casa colonial", "fruteira", "casa"].map((term) => (
                    <span key={term} style={{
                      padding: "4px 12px", borderRadius: 100, fontSize: 12, fontWeight: 600,
                      background: "#EDF2FF", color: "#4285F4",
                    }}>{term}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 12 }}>{t.proof_disclaimer}</p>
        </div>
      </section>

      <div className="divider" />

      {/* ── SECTION 6: INVESTMENT ── */}
      <section className="section">
        <div className="page-wrap">
          <div style={{ display: "grid", gap: 40, alignItems: "start" }} className="two-col">
            <div className="reveal">
              <Tag color="#FBBC05">{t.inv_tag}</Tag>
              <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: 24 }}>
                {t.inv_title}
              </h2>

              <div style={{ marginBottom: 24 }}>
                {config.anchorPrice > config.totalPrice && (
                  <div style={{ fontSize: 18, color: "var(--ink-faint)", textDecoration: "line-through", marginBottom: 4 }}>
                    {config.symbol} {config.anchorPrice}
                  </div>
                )}
                <div style={{ fontSize: "clamp(52px, 12vw, 72px)", fontWeight: 800, color: "var(--ink)", lineHeight: 1, letterSpacing: "-0.03em" }} data-testid="price-total">
                  {config.symbol} {config.totalPrice}
                </div>
                <div style={{ fontSize: 15, color: "var(--ink-faint)", marginTop: 6 }}>{t.inv_installment}</div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 100, background: "#FFF8E1", border: "1.5px solid #FBBC0540", color: "#B8860B", fontSize: 13, fontWeight: 600 }}>
                  ⚡ {t.inv_scarcity}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 100, background: "var(--surface)", border: "1.5px solid var(--line)", color: "var(--ink-soft)", fontSize: 13, fontWeight: 600 }}>
                  🗓 {t.inv_validity}
                </span>
              </div>
            </div>

            <div className="reveal" style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: 20, padding: "24px 24px" }}>
              {[
                { label: t.inv_step1_label, desc: t.inv_step1_desc, price: config.entryPrice, dotBg: "#EDF2FF", dotColor: "#4285F4" },
                { label: t.inv_step2_label, desc: t.inv_step2_desc, price: config.deliveryPrice, dotBg: "#E8F5E9", dotColor: "#34A853" },
              ].map((step, i) => (
                <div key={i}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }} data-testid={`payment-step-${i}`}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: step.dotBg, color: step.dotColor, fontWeight: 800, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {step.label}
                      </div>
                      {i === 0 && <div style={{ width: 2, height: 32, background: "var(--line)", margin: "4px 0" }} />}
                    </div>
                    <div style={{ flex: 1, paddingTop: 10 }}>
                      <div style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 2 }}>{step.desc}</div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: step.dotColor }}>{config.symbol} {step.price}</div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                className="btn-primary"
                onClick={() => setModalOpen(true)}
                data-testid="invest-cta-btn"
                style={{ width: "100%", padding: "15px", marginTop: 24, borderRadius: 12, fontSize: 16 }}
              >
                {t.cta_btn}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── SECTION 7: FAQ ── */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="page-wrap" style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: 32, textAlign: "center" }}>
            <Tag color="#4285F4">{t.faq_tag}</Tag>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
              {t.faq_title}
            </h2>
          </div>

          <div className="reveal" style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: 20, padding: "0 24px" }}>
            <FaqItem question={t.faq_q1} answer={t.faq_a1} />
            <FaqItem question={t.faq_q2} answer={t.faq_a2} />
            <FaqItem question={t.faq_q3} answer={t.faq_a3} />
            <FaqItem question={t.faq_q4} answer={t.faq_a4} />
          </div>
        </div>
      </section>

      {/* ── SECTION 8: FINAL CTA ── */}
      <section className="section" style={{ background: "#1A1A2E", paddingBottom: "clamp(80px,15vw,120px)" }}>
        <div className="page-wrap" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: 12 }}>
            <Tag color="#4285F4">{t.final_tag}</Tag>
          </div>
          <h2 className="reveal" style={{
            fontSize: "clamp(24px, 5vw, 44px)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em",
            color: "white", marginBottom: 18,
          }} data-testid="final-cta-title">
            {t.final_title}
          </h2>
          <p className="reveal" style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.55)", marginBottom: 36, lineHeight: 1.65 }}>
            {getFinalSub(t, config)}
          </p>
          <button
            className="btn-primary reveal"
            onClick={() => setModalOpen(true)}
            data-testid="final-cta-btn"
            style={{ padding: "18px 40px", fontSize: 18, borderRadius: 16, boxShadow: "0 8px 40px rgba(66,133,244,0.5)" }}
          >
            {t.cta_btn}
          </button>

          <div style={{ display: "flex", height: 3, borderRadius: 100, overflow: "hidden", maxWidth: 200, margin: "48px auto 0", gap: 4 }}>
            {["#4285F4","#EA4335","#FBBC05","#34A853"].map((c) => <div key={c} style={{ flex: 1, background: c }} />)}
          </div>
        </div>
      </section>

      {/* ── STICKY BAR ── */}
      <div className="sticky-bar" onClick={() => setModalOpen(true)} data-testid="sticky-bar">
        <span>🔒</span>
        <span>{t.sticky_label} {config.symbol} {config.entryPrice} {t.sticky_suffix}</span>
      </div>

      <PayModal open={modalOpen} onClose={() => setModalOpen(false)} t={t} config={config} />
    </div>
  );
}
