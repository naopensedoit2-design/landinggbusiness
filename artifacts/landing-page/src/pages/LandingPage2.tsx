import { useState, useEffect, useRef, useCallback } from "react";
import { useConfig, useGeoCity, type AppConfig } from "../lib/sharedConfig";

// -- Translations for Home 2 --------------------------------------
const t2: Record<string, Record<string, string>> = {
  pt: {
    lang_badge: "PT",
    hero_badge_scarcity: "⚡ Última vaga disponível esta semana",
    hero_curiosity: "Sabe quantas pessoas pesquisaram pelo seu tipo de negócio na sua cidade nos últimos 30 dias?",
    hero_reveal: "Muito mais do que você imagina.",
    hero_reveal2: "O problema: nenhuma delas te encontrou.",
    hero_cta: "Quero minha vaga agora",
    hero_price: "entrada de apenas",
    recip_tag: "Diagnóstico gratuito",
    recip_title: "Antes de qualquer proposta, veja o que encontramos em perfis como o seu",
    recip_sub: "Isso é o que está te custando clientes hoje — sem você saber.",
    recip_item1: "Categoria cadastrada errada no Google",
    recip_item2: "Menos de 5 fotos no perfil (mínimo recomendado: 10)",
    recip_item3: "Descrição do negócio ausente ou genérica",
    recip_item4: "Horários desatualizados ou incorretos",
    recip_item5: "Sem resposta para avaliações de clientes",
    recip_result: "Resultado: o Google te ignora nas buscas locais.",
    auth_tag: "Autoridade",
    auth_title: "9 em cada 10 perfis que visitamos têm pelo menos 3 desses problemas",
    auth_p1_title: "Categoria errada",
    auth_p1_desc: "O Google usa a categoria principal para decidir em quais buscas você aparece. Categoria errada = invisibilidade total.",
    auth_p2_title: "Fotos insuficientes",
    auth_p2_desc: "Perfis com 10+ fotos recebem 42% mais pedidos de rota. Com 2 fotos antigas, o algoritmo te penaliza.",
    auth_p3_title: "Sem descrição",
    auth_p3_desc: "A descrição é indexada pelo Google. Sem ela, você perde palavras-chave que seus clientes realmente usam.",
    auth_p4_title: "Horário incorreto",
    auth_p4_desc: "Cliente chega na sua loja fechada por causa de informação errada. Avaliação negativa garantida.",
    proof_tag: "Prova social",
    proof_title: "Dados reais de um cliente após 6 meses de perfil otimizado",
    proof_quote: "Comecei a receber clientes falando que me encontraram no Google. Antes disso, nunca tinha acontecido.",
    proof_author: "Cliente · Alimentação · São Paulo",
    anchor_tag: "Ancoragem de preço",
    anchor_title: "O que o mercado cobra por resultados similares",
    anchor_agency: "Agência de marketing digital",
    anchor_agency_price: "R$ 800–1.500/mês",
    anchor_agency_note: "Contrato mensal, sem garantia de resultado",
    anchor_free: "Freelancer digital",
    anchor_free_price: "R$ 500–800/mês",
    anchor_free_note: "Sem acompanhamento, só configuração básica",
    anchor_ours: "Nosso serviço",
    anchor_ours_note: "Investimento único · resultado que dura meses",
    anchor_badge: "Melhor custo-benefício",
    loss_tag: "Aversão à perda",
    loss_title: "Você não está pagando por um perfil no Google.",
    loss_desc: "Você está evitando continuar perdendo clientes que pesquisam agora, encontram seu concorrente, e nunca vão saber que você existe.",
    loss_calc_title: "O custo real de não agir:",
    loss_week: "semana sem otimização",
    loss_customers: "clientes potenciais perdidos",
    loss_revenue: "em receita que foi embora",
    loss_cta: "Parar de perder agora",
    belong_tag: "Pertencimento",
    belong_title: "Os negócios que estão crescendo aqui já entenderam:",
    belong_i1: "Seus clientes pesquisam no Google antes de sair de casa",
    belong_i2: "Presença digital não é luxo — é infraestrutura básica",
    belong_i3: "Quem aparece primeiro, vende primeiro",
    belong_i4: "Foto profissional no perfil vale mais que panfleto",
    belong_q: "Você vai fazer parte desse grupo?",
    commit_tag: "Compromisso",
    commit_title: "Responda com honestidade:",
    commit_q1: "Seus clientes pesquisam no Google antes de visitar um negócio?",
    commit_q2: "Se eles te encontrarem com fotos profissionais e boas avaliações, a chance de virem aumenta?",
    commit_q3: "Então faz sentido tener o seu perfil 100% profissional?",
    commit_yes: "Sim",
    commit_cta: "Ótimo. Vamos resolver isso agora →",
    commit_price: "são só",
    commit_start: "pra começar",
    urgent_tag: "Urgência",
    urgent_title: "Essa condição especial encerra em:",
    urgent_hours: "h",
    urgent_min: "m",
    urgent_sec: "s",
    urgent_note: "Após esse prazo, o valor retorna ao normal.",
    urgent_spots: "vagas disponíveis nesta cidade",
    urgent_cta: "Garantir minha vaga agora",
    final_title: "Seu concorrente vai aparecer primeiro amanhã.",
    final_sub: "A não ser que você aja hoje.",
    final_cta: "Garantir minha vaga",
    sticky: "Última vaga →",
  },
  en: {
    lang_badge: "EN",
    hero_badge_scarcity: "⚡ Last spot available this week",
    hero_curiosity: "Do you know how many people searched for your type of business in your city in the last 30 days?",
    hero_reveal: "Far more than you'd imagine.",
    hero_reveal2: "The problem: none of them found you.",
    hero_cta: "Claim my spot now",
    hero_price: "entry of only",
    recip_tag: "Free diagnosis",
    recip_title: "Before any proposal, see what we found in profiles like yours",
    recip_sub: "This is what's costing you customers today — without you knowing it.",
    recip_item1: "Wrong category registered on Google",
    recip_item2: "Fewer than 5 photos (recommended minimum: 10)",
    recip_item3: "Missing or generic business description",
    recip_item4: "Outdated or incorrect business hours",
    recip_item5: "No responses to customer reviews",
    recip_result: "Result: Google ignores you in local searches.",
    auth_tag: "Authority",
    auth_title: "9 out of 10 profiles we visit have at least 3 of these problems",
    auth_p1_title: "Wrong category",
    auth_p1_desc: "Google uses the main category to decide which searches you appear in. Wrong category = total invisibility.",
    auth_p2_title: "Too few photos",
    auth_p2_desc: "Profiles with 10+ photos receive 42% more direction requests. With 2 old photos, the algorithm penalizes you.",
    auth_p3_title: "No description",
    auth_p3_desc: "The description is indexed by Google. Without it, you miss keywords your customers actually use.",
    auth_p4_title: "Wrong hours",
    auth_p4_desc: "Customer arrives at your closed store due to wrong information. Negative review guaranteed.",
    proof_tag: "Social proof",
    proof_title: "Real data from a client after 6 months of optimized profile",
    proof_quote: "I started getting customers saying they found me on Google. Before that, it had never happened.",
    proof_author: "Client · Food & Beverage · São Paulo",
    anchor_tag: "Price anchoring",
    anchor_title: "What the market charges for similar results",
    anchor_agency: "Digital marketing agency",
    anchor_agency_price: "R$ 800–1,500/month",
    anchor_agency_note: "Monthly contract, no result guarantee",
    anchor_free: "Digital freelancer",
    anchor_free_price: "R$ 500–800/month",
    anchor_free_note: "No follow-up, basic setup only",
    anchor_ours: "Our service",
    anchor_ours_note: "One-time investment · results that last months",
    anchor_badge: "Best value",
    loss_tag: "Loss aversion",
    loss_title: "You're not paying for a Google profile.",
    loss_desc: "You're avoiding continuing to lose customers who are searching right now, finding your competitor, and will never know you exist.",
    loss_calc_title: "The real cost of not acting:",
    loss_week: "week without optimization",
    loss_customers: "potential customers lost",
    loss_revenue: "in revenue gone",
    loss_cta: "Stop losing now",
    belong_tag: "Belonging",
    belong_title: "The businesses growing here have already understood:",
    belong_i1: "Your customers search Google before leaving home",
    belong_i2: "Digital presence is not a luxury — it's basic infrastructure",
    belong_i3: "Whoever shows up first, sells first",
    belong_i4: "A professional profile photo is worth more than a flyer",
    belong_q: "Will you be part of this group?",
    commit_tag: "Commitment",
    commit_title: "Answer honestly:",
    commit_q1: "Do your customers search Google before visiting a business?",
    commit_q2: "If they find you with professional photos and good reviews, does the chance of them coming increase?",
    commit_q3: "So does it make sense to have your profile 100% professional?",
    commit_yes: "Yes",
    commit_cta: "Great. Let's resolve this now →",
    commit_price: "just",
    commit_start: "to get started",
    urgent_tag: "Urgency",
    urgent_title: "This special offer closes in:",
    urgent_hours: "h",
    urgent_min: "m",
    urgent_sec: "s",
    urgent_note: "After this deadline, the price returns to normal.",
    urgent_spots: "spots available in this city",
    urgent_cta: "Claim my spot now",
    final_title: "Your competitor will show up first tomorrow.",
    final_sub: "Unless you act today.",
    final_cta: "Claim my spot",
    sticky: "Last spot →",
  },
  es: {
    lang_badge: "ES",
    hero_badge_scarcity: "⚡ Último lugar disponible esta semana",
    hero_curiosity: "¿Sabes cuántas personas buscaron tu tipo de negocio en tu ciudad en los últimos 30 días?",
    hero_reveal: "Muchas más de lo que imaginas.",
    hero_reveal2: "El problema: ninguna te encontró.",
    hero_cta: "Quiero mi lugar ahora",
    hero_price: "entrada de solo",
    recip_tag: "Diagnóstico gratuito",
    recip_title: "Antes de cualquier propuesta, ve lo que encontramos en perfiles como el tuyo",
    recip_sub: "Esto es lo que te está costando clientes hoy — sin que lo sepas.",
    recip_item1: "Categoría registrada incorrectamente en Google",
    recip_item2: "Menos de 5 fotos (mínimo recomendado: 10)",
    recip_item3: "Descripción del negocio ausente o genérica",
    recip_item4: "Horarios desactualizados o incorrectos",
    recip_item5: "Sin respuesta a reseñas de clientes",
    recip_result: "Resultado: Google te ignora en búsquedas locales.",
    auth_tag: "Autoridad",
    auth_title: "9 de cada 10 perfiles que visitamos tienen al menos 3 de estos problemas",
    auth_p1_title: "Categoría incorrecta",
    auth_p1_desc: "Google usa la categoría principal para decidir en qué búsquedas apareces. Categoría incorrecta = invisibilidad total.",
    auth_p2_title: "Fotos insuficientes",
    auth_p2_desc: "Perfiles con 10+ fotos reciben 42% más solicitudes de ruta. Con 2 fotos antiguas, el algoritmo te penaliza.",
    auth_p3_title: "Sin descripción",
    auth_p3_desc: "La descripción es indexada por Google. Sin ella, pierdes palabras clave que tus clientes realmente usan.",
    auth_p4_title: "Horario incorrecto",
    auth_p4_desc: "Cliente llega a tu local cerrado por información incorrecta. Reseña negativa garantizada.",
    proof_tag: "Prueba social",
    proof_title: "Datos reales de un cliente tras 6 meses de perfil optimizado",
    proof_quote: "Empecé a recibir clientes diciendo que me encontraron en Google. Antes de eso, nunca había pasado.",
    proof_author: "Cliente · Alimentación · São Paulo",
    anchor_tag: "Anclaje de precio",
    anchor_title: "Lo que cobra el mercado por resultados similares",
    anchor_agency: "Agencia de marketing digital",
    anchor_agency_price: "R$ 800–1.500/mes",
    anchor_agency_note: "Contrato mensual, sin garantía de resultado",
    anchor_free: "Freelancer digital",
    anchor_free_price: "R$ 500–800/mes",
    anchor_free_note: "Sin seguimiento, solo configuración básica",
    anchor_ours: "Nuestro serviço",
    anchor_ours_note: "Inversión única · resultado que dura meses",
    anchor_badge: "Mejor relación calidad-precio",
    loss_tag: "Aversión a la pérdida",
    loss_title: "No estás pagando por un perfil en Google.",
    loss_desc: "Estás evitando seguir perdiendo clientes que buscan ahora, encuentran a tu competidor, y nunca van a saber que existes.",
    loss_calc_title: "El costo real de no actuar:",
    loss_week: "semana sin optimización",
    loss_customers: "clientes potenciales perdidos",
    loss_revenue: "en ingresos perdidos",
    loss_cta: "Dejar de perder ahora",
    belong_tag: "Pertenencia",
    belong_title: "Los negocios que están creciendo aquí ya entendieron:",
    belong_i1: "Tus clientes buscan en Google antes de salir de casa",
    belong_i2: "Presencia digital no es lujo — es infraestructura básica",
    belong_i3: "Quien aparece primero, vende primero",
    belong_i4: "Una foto profesional en el perfil vale más que un volante",
    belong_q: "¿Vas a formar parte de este grupo?",
    commit_tag: "Compromiso",
    commit_title: "Responde con honestidade:",
    commit_q1: "¿Tus clientes buscan en Google antes de visitar un negocio?",
    commit_q2: "¿Si te encuentran con fotos profesionales y buenas reseñas, aumenta la probabilidad de que vengan?",
    commit_q3: "¿Entonces tiene sentido tener tu perfil 100% profesional?",
    commit_yes: "Sí",
    commit_cta: "Perfecto. Resolvamos esto ahora →",
    commit_price: "solo",
    commit_start: "para empezar",
    urgent_tag: "Urgência",
    urgent_title: "Esta condición especial termina en:",
    urgent_hours: "h",
    urgent_min: "m",
    urgent_sec: "s",
    urgent_note: "Después de este plazo, el precio vuelve a lo normal.",
    urgent_spots: "lugares disponibles en esta ciudad",
    urgent_cta: "Reservar mi lugar ahora",
    final_title: "Tu competidor aparecerá primero mañana.",
    final_sub: "A menos que actúes hoy.",
    final_cta: "Reservar mi lugar",
    sticky: "Último lugar →",
  },
  th: {
    lang_badge: "TH",
    hero_badge_scarcity: "⚡ ที่นั่งสุดท้ายสัปดาห์นี้",
    hero_curiosity: "คุณรู้ไหมว่ามีกี่คนค้นหาธุรกิจประเภทของคุณในเมืองของคุณใน 30 วันที่ผ่านมา?",
    hero_reveal: "มากกว่าที่คุณจินตนาการมาก",
    hero_reveal2: "ปัญหา: ไม่มีใครพบคุณเลย",
    hero_cta: "จองที่นั่งของฉันเดี๋ยวนี้",
    hero_price: "เริ่มต้นเพียง",
    recip_tag: "วินิจฉัยฟรี",
    recip_title: "ก่อนข้อเสนอใดๆ ดูสิ่งที่เราพบในโปรไฟล์เหมือนของคุณ",
    recip_sub: "นี่คือสิ่งที่กำลังทำให้คุณเสียลูกค้าวันนี้ — โดยไม่รู้ตัว",
    recip_item1: "หมวดหมู่ที่ลงทะเบียนผิดใน Google",
    recip_item2: "รูปน้อยกว่า 5 รูป (แนะนำอย่างน้อย 10)",
    recip_item3: "คำอธิบายธุรกิจขาดหายหรือทั่วไปเกินไป",
    recip_item4: "เวลาทำการไม่อัปเดตหรือผิดพลาด",
    recip_item5: "ไม่มีการตอบรีวิวลูกค้า",
    recip_result: "ผลลัพธ์: Google ละเลยคุณในการค้นหาในพื้นที่",
    auth_tag: "ความน่าเชื่อถือ",
    auth_title: "9 ใน 10 โปรไฟล์ที่เราเยี่ยมชมมีปัญหาเหล่านี้อย่างน้อย 3 ข้อ",
    auth_p1_title: "หมวดหมู่ผิด",
    auth_p1_desc: "Google ใช้หมวดหมู่หลักเพื่อตัดสินใจว่าคุณจะปรากฏในการค้นหาใด หมวดหมู่ผิด = มองไม่เห็นทั้งหมด",
    auth_p2_title: "รูปน้อยเกินไป",
    auth_p2_desc: "โปรไฟล์ที่มี 10+ รูปได้รับคำขอเส้นทางเพิ่มขึ้น 42% อัลกอริทึมลงโทษรูปเก่า 2 รูป",
    auth_p3_title: "ไม่มีคำอธิบาย",
    auth_p3_desc: "คำอธิบายถูก index โดย Google ถ้าไม่มี คุณพลาดคำหลักที่ลูกค้าใช้จริง",
    auth_p4_title: "เวลาผิด",
    auth_p4_desc: "ลูกค้ามาร้านปิดเพราะข้อมูลผิด รับรีวิวแย่แน่นอน",
    proof_tag: "หลักฐานทางสังคม",
    proof_title: "ข้อมูลจริงจากลูกค้าหลัง 6 เดือนของโปรไฟล์ที่ปรับปรุง",
    proof_quote: "ฉันเริ่มรับลูกค้าที่บอกว่าพบฉันบน Google ก่อนหน้านี้ไม่เคยเกิดขึ้นเลย",
    proof_author: "ลูกค้า · อาหาร · เซาเปาลู",
    anchor_tag: "การยึดราคา",
    anchor_title: "สิ่งที่ตลาดเรียกเก็บสำหรับผลลัพธ์ที่คล้ายกัน",
    anchor_agency: "เอเจนซี่การตลาดดิจิทัล",
    anchor_agency_price: "฿ 4,000–8,000/เดือน",
    anchor_agency_note: "สัญญารายเดือน ไม่มีการรับประกันผล",
    anchor_free: "ฟรีแลนซ์ดิจิทัล",
    anchor_free_price: "฿ 2,500–4,000/เดือน",
    anchor_free_note: "ไม่มีการติดตาม ตั้งค่าพื้นฐานเท่านั้น",
    anchor_ours: "บริการของเรา",
    anchor_ours_note: "การลงทุนครั้งเดียว · ผลลัพธ์คงอยู่นานหลายเดือน",
    anchor_badge: "คุ้มค่าที่สุด",
    loss_tag: "ความกลัวการสูญเสีย",
    loss_title: "คุณไม่ได้จ่ายสำหรับโปรไฟล์ Google",
    loss_desc: "คุณกำลังหลีกเลี่ยงการสูญเสียลูกค้าที่กำลังค้นหาตอนนี้ พบคู่แข่งของคุณ และจะไม่มีวันรู้ว่าคุณมีอยู่",
    loss_calc_title: "ต้นทุนที่แท้จริงของการไม่ดำเนินการ:",
    loss_week: "สัปดาห์ที่ไม่ได้ปรับปรุง",
    loss_customers: "ลูกค้าที่มีศักยภาพที่สูญเสีย",
    loss_revenue: "รายได้ที่หายไป",
    loss_cta: "หยุดสูญเสียตอนนี้",
    belong_tag: "การเป็นส่วนหนึ่ง",
    belong_title: "ธุรกิจที่กำลังเติบโตที่นี่เข้าใจแล้ว:",
    belong_i1: "ลูกค้าของคุณค้นหา Google ก่อนออกจากบ้าน",
    belong_i2: "การมีตัวตนทางดิจิทัลไม่ใช่ความหรูหรา — แต่เป็นพื้นฐาน",
    belong_i3: "ใครปรากฏก่อน ขายก่อน",
    belong_i4: "รูปถ่ายมืออาชีพในโปรไฟล์คุ้มค่ากว่าใบปลิว",
    belong_q: "คุณจะเป็นส่วนหนึ่งของกลุ่มนี้ไหม?",
    commit_tag: "ความมุ่งมั่น",
    commit_title: "ตอบด้วยความสุจริตใจ:",
    commit_q1: "ลูกค้าของคุณค้นหา Google ก่อนเยี่ยมธุรกิจใช่ไหม?",
    commit_q2: "ถ้าพวกเขาพบคุณด้วยรูปมืออาชีพและรีวิวดี โอกาสที่จะมาเพิ่มขึ้นใช่ไหม?",
    commit_q3: "แสดงว่ามันสมเหตุสมผลที่จะให้โปรไฟล์ของคุณ 100% มืออาชีพใช่ไหม?",
    commit_yes: "ใช่",
    commit_cta: "ดีมาก มาแก้ปัญหานี้ตอนนี้เลย →",
    commit_price: "แค่",
    commit_start: "เพื่อเริ่มต้น",
    urgent_tag: "ความเร่งด่วน",
    urgent_title: "เงื่อนไขพิเศษนี้จะสิ้นสุดใน:",
    urgent_hours: "ชม.",
    urgent_min: "น.",
    urgent_sec: "ว.",
    urgent_note: "หลังจากกำหนดนี้ ราคาจะกลับสู่ปกติ",
    urgent_spots: "ที่นั่งว่างในเมืองนี้",
    urgent_cta: "จองที่นั่งของฉันตอนนี้",
    final_title: "คู่แข่งของคุณจะปรากฏก่อนพรุ่งนี้",
    final_sub: "ถ้าคุณไม่ลงมือวันนี้",
    final_cta: "จองที่นั่งของฉัน",
    sticky: "ที่นั่งสุดท้าย →",
  },
};

const LANGUAGES = [
  { code: "pt", flag: "🇧🇷", label: "PT" },
  { code: "en", flag: "🇺🇸", label: "EN" },
  { code: "es", flag: "🇦🇷", label: "ES" },
  { code: "th", flag: "🇹🇭", label: "TH" },
];

function detectLanguage(): string {
  const saved = localStorage.getItem("lang");
  if (saved && t2[saved]) return saved;
  const nav = navigator.language?.split("-")[0] || "pt";
  return t2[nav] ? nav : "pt";
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }); },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal, .reveal-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

function Tag({ children, color = "#4285F4" }: { children: string; color?: string }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "5px 14px", borderRadius: 100,
      background: color + "15", border: `1.5px solid ${color}35`,
      color, fontSize: 11, fontWeight: 700,
      letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16,
    }}>
      {children}
    </div>
  );
}

function GoogleDots() {
  return (
    <span style={{ fontWeight: 800 }}>
      <span style={{ color: "#4285F4" }}>G</span>
      <span style={{ color: "#EA4335" }}>o</span>
      <span style={{ color: "#FBBC05" }}>o</span>
      <span style={{ color: "#4285F4" }}>g</span>
      <span style={{ color: "#34A853" }}>l</span>
      <span style={{ color: "#EA4335" }}>e</span>
    </span>
  );
}

function useCountdown(targetMs: number) {
  const [remaining, setRemaining] = useState(Math.max(0, targetMs - Date.now()));
  useEffect(() => {
    const t = setInterval(() => {
      const r = Math.max(0, targetMs - Date.now());
      setRemaining(r);
      if (r === 0) clearInterval(t);
    }, 1000);
    return () => clearInterval(t);
  }, [targetMs]);
  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  return { h, m, s };
}

function getDeadline(): number {
  const key = "gbp_deadline";
  const stored = localStorage.getItem(key);
  if (stored) return parseInt(stored, 10);
  const deadline = Date.now() + 72 * 3600000;
  localStorage.setItem(key, String(deadline));
  return deadline;
}

interface ModalProps { open: boolean; onClose: () => void; config: AppConfig; lang: string; }
function PayModal2({ open, onClose, config, lang }: ModalProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const tl = t2[lang] || t2["pt"];

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
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-sheet ${mounted ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
        <div style={{ width: 40, height: 4, background: "var(--line)", borderRadius: 100, margin: "0 auto 24px" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h3 style={{ fontSize: 20, fontWeight: 800 }}>Pagar com PIX</h3>
          <button onClick={onClose} style={{ background: "var(--surface)", border: "none", borderRadius: 100, width: 32, height: 32, cursor: "pointer", fontSize: 18, color: "var(--ink-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>

        <div style={{ background: "var(--surface)", borderRadius: 14, padding: "16px 18px", marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Chave PIX</div>
          <code style={{ fontSize: 14, color: "var(--ink)", fontFamily: "monospace", wordBreak: "break-all" }}>{config.paymentKey}</code>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          <div style={{ background: "var(--surface)", borderRadius: 14, padding: "14px 16px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Valor</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#4285F4" }}>{config.symbol} {config.entryPrice.toFixed(2)}</div>
          </div>
          <div style={{ background: "var(--surface)", borderRadius: 14, padding: "14px 16px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Beneficiário</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{config.salesName}</div>
          </div>
        </div>

        <button
          onClick={copy}
          style={{
            width: "100%", padding: "14px", borderRadius: 12, marginBottom: 12,
            background: copied ? "#F0FFF6" : "#EDF2FF",
            border: `1.5px solid ${copied ? "#34A853" : "#4285F4"}`,
            color: copied ? "#34A853" : "#4285F4",
            fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit",
            transition: "all 0.2s",
          }}
        >{copied ? "✓ Copiado!" : "Copiar chave PIX"}</button>

        <p style={{ fontSize: 13, color: "var(--ink-faint)", textAlign: "center", marginBottom: 16, lineHeight: 1.6 }}>
          Após o pagamento, envie o comprovante pelo WhatsApp para confirmar sua vaga.
        </p>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            padding: "15px", borderRadius: 12, width: "100%",
            background: "linear-gradient(135deg, #25D366, #20BA5A)",
            color: "white", fontWeight: 700, fontSize: 15, textDecoration: "none",
          }}
        >
          <span style={{ fontSize: 20 }}>💬</span> Enviar comprovante no WhatsApp
        </a>
        <div style={{ display: "none" }}>{tl.lang_badge}</div>
      </div>
    </div>
  );
}

export default function LandingPage2() {
  const config = useConfig();
  const city = useGeoCity(config.city);
  const [lang, setLang] = useState(detectLanguage);
  const [langOpen, setLangOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [yesCount, setYesCount] = useState(0);
  const [deadline] = useState(getDeadline);
  const { h, m, s } = useCountdown(deadline);
  const tl = t2[lang] || t2["pt"];
  useReveal();

  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
  const switchLang = (code: string) => { setLang(code); localStorage.setItem("lang", code); setLangOpen(false); };

  const open = () => setModalOpen(true);

  return (
    <div style={{ background: "white", color: "var(--ink)", minHeight: "100vh" }}>

      {/* -- LANGUAGE -- */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 150 }}>
        <div style={{ position: "relative" }}>
          <button className="lang-btn" onClick={() => setLangOpen(!langOpen)}>
            {currentLang.flag} {currentLang.label} <span style={{ fontSize: 10, color: "var(--ink-faint)" }}>▾</span>
          </button>
          {langOpen && (
            <div className="lang-dropdown">
              {LANGUAGES.map((l) => (
                <div key={l.code} className={`lang-option ${l.code === lang ? "active" : ""}`} onClick={() => switchLang(l.code)}>
                  {l.flag} {l.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          1. HERO — Curiosidade + Escassez
      ═══════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(160deg,#0D1117 0%,#161B22 60%,#1A1F2E 100%)",
        paddingTop: "clamp(72px,14vw,130px)", paddingBottom: "clamp(56px,10vw,100px)",
        minHeight: "90vh", display: "flex", alignItems: "center",
      }}>
        <div className="page-wrap" style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
          {/* Scarcity badge */}
          <div style={{ marginBottom: 20 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "8px 18px", borderRadius: 100,
              background: "rgba(251,188,5,0.12)", border: "1.5px solid rgba(251,188,5,0.35)",
              fontSize: 13, fontWeight: 700, color: "#FBBC05",
            }}>
              {tl.hero_badge_scarcity}
            </span>
          </div>

                      <div style={{ marginBottom: 20 }}>
              <span style={{
                display: "inline-flex", gap: 6, alignItems: "center",
                padding: "5px 16px", borderRadius: 100,
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.07em",
              }}>
                <GoogleDots /> Business Profile · Atendimento Local
              </span>
            </div>

       

          {/* Curiosity headline */}
          <h1 style={{
            fontSize: "clamp(26px, 5vw, 48px)", fontWeight: 800, lineHeight: 1.2,
            color: "white", marginBottom: 16, letterSpacing: "-0.02em",
          }}>
            {tl.hero_curiosity}
          </h1>

          {/* Reveal */}
          <p style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 700, color: "#4285F4", marginBottom: 8 }}>
            {tl.hero_reveal}
          </p>
          <p style={{ fontSize: "clamp(16px, 2.5vw, 20px)", color: "rgba(255,255,255,0.55)", marginBottom: 44, lineHeight: 1.6 }}>
            {tl.hero_reveal2}
          </p>

          {/* CTA */}
          <button
            className="btn-primary"
            onClick={open}
            style={{ padding: "18px 40px", fontSize: 18, borderRadius: 16, marginBottom: 14, boxShadow: "0 8px 40px rgba(66,133,244,0.45)" }}
          >
            {tl.hero_cta}
          </button>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>
            {tl.hero_price} {config.symbol} {config.entryPrice}
          </div>

          {/* Google divider */}
          <div style={{ display: "flex", height: 3, maxWidth: 180, margin: "48px auto 0", borderRadius: 100, overflow: "hidden" }}>
            {["#4285F4","#EA4335","#FBBC05","#34A853"].map((c) => <div key={c} style={{ flex: 1, background: c }} />)}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          2. RECIPROCIDADE — Diagnóstico Gratuito
      ═══════════════════════════════════════ */}
      <section className="section">
        <div className="page-wrap" style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 32 }}>
            <Tag color="#34A853">{tl.recip_tag}</Tag>
            <h2 style={{ fontSize: "clamp(20px, 4vw, 32px)", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: 10 }}>
              {tl.recip_title}
            </h2>
            <p style={{ color: "var(--ink-soft)", fontSize: 16 }}>{tl.recip_sub}</p>
          </div>

          <div className="reveal" style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: 20, overflow: "hidden" }}>
            {/* Fake browser bar */}
            <div style={{ background: "#F5F5F5", borderBottom: "1px solid var(--line)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 5 }}>
                {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />)}
              </div>
              <div style={{ flex: 1, background: "white", borderRadius: 6, padding: "4px 12px", fontSize: 12, color: "var(--ink-faint)", border: "1px solid var(--line)" }}>
                google.com/business
              </div>
            </div>

            {/* Audit items */}
            <div style={{ padding: "20px 24px" }}>
              {[
                { text: tl.recip_item1, color: "#EA4335" },
                { text: tl.recip_item2, color: "#EA4335" },
                { text: tl.recip_item3, color: "#FBBC05" },
                { text: tl.recip_item4, color: "#FBBC05" },
                { text: tl.recip_item5, color: "#EA4335" },
              ].map((item, i) => (
                <div key={i} className="reveal-up" style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 0",
                  borderBottom: i < 4 ? "1px solid var(--line)" : "none",
                  transitionDelay: `${i * 0.07}s`,
                }}>
                  <span style={{ fontSize: 18, color: item.color, flexShrink: 0 }}>✗</span>
                  <span style={{ fontSize: 14, color: "var(--ink-soft)" }}>{item.text}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "#FEF2F2", padding: "14px 24px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 16 }}>⚠️</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#EA4335" }}>{tl.recip_result}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════════════════════
          3. AUTORIDADE
      ═══════════════════════════════════════ */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="page-wrap">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 36 }}>
            <Tag color="#4285F4">{tl.auth_tag}</Tag>
            <h2 style={{ fontSize: "clamp(20px, 4vw, 32px)", fontWeight: 800, lineHeight: 1.3, letterSpacing: "-0.02em", maxWidth: 580, margin: "0 auto" }}>
              {tl.auth_title}
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {[
              { icon: "🏷", title: tl.auth_p1_title, desc: tl.auth_p1_desc, color: "#EA4335" },
              { icon: "📸", title: tl.auth_p2_title, desc: tl.auth_p2_desc, color: "#FBBC05" },
              { icon: "📝", title: tl.auth_p3_title, desc: tl.auth_p3_desc, color: "#4285F4" },
              { icon: "⏰", title: tl.auth_p4_title, desc: tl.auth_p4_desc, color: "#EA4335" },
            ].map((item, i) => (
              <div key={i} className="reveal-up" style={{
                background: "white", borderRadius: 16, padding: "20px",
                border: "1.5px solid var(--line)", transitionDelay: `${i * 0.08}s`,
              }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: item.color, marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════════════════════
          4. PROVA SOCIAL
      ═══════════════════════════════════════ */}
      <section className="section">
        <div className="page-wrap">
          <div className="reveal" style={{ marginBottom: 36 }}>
            <Tag color="#34A853">{tl.proof_tag}</Tag>
            <h2 style={{ fontSize: "clamp(20px, 4vw, 32px)", fontWeight: 800, lineHeight: 1.3, letterSpacing: "-0.02em", maxWidth: 540 }}>
              {tl.proof_title}
            </h2>
          </div>

          <div style={{ display: "grid", gap: 24, alignItems: "start" }} className="two-col">
            {/* Metrics panel */}
            <div className="metrics-card reveal" style={{ maxWidth: "none" }}>
              <div className="metrics-header">
                <div className="google-g"><GoogleDots /></div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>Google Business Profile</div>
                  <div style={{ fontSize: 12, color: "var(--ink-faint)" }}>Nov 2025 – Abr 2026 · 6 meses</div>
                </div>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  <div style={{ background: "var(--surface)", borderRadius: 12, padding: "16px" }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: "#4285F4", lineHeight: 1 }}>983</div>
                    <div style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 4 }}>Visualizações</div>
                  </div>
                  <div style={{ background: "var(--surface)", borderRadius: 12, padding: "16px" }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: "#34A853", lineHeight: 1 }}>370</div>
                    <div style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 4 }}>Interações</div>
                  </div>
                </div>
                <div style={{ background: "var(--surface)", borderRadius: 12, padding: "12px 16px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-faint)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Termos de busca</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {["casa colonial", "fruteira", "casa"].map((term) => (
                      <span key={term} style={{ padding: "4px 12px", borderRadius: 100, fontSize: 12, fontWeight: 600, background: "#EDF2FF", color: "#4285F4" }}>{term}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{
                background: "linear-gradient(135deg,#EDF2FF,#E8F5E9)", border: "1.5px solid #4285F420",
                borderRadius: 20, padding: "28px 24px",
              }}>
                <div style={{ fontSize: 32, color: "#4285F4", lineHeight: 1, marginBottom: 12 }}>"</div>
                <p style={{ fontSize: "clamp(15px,2.5vw,17px)", color: "var(--ink)", lineHeight: 1.7, fontStyle: "italic", marginBottom: 16 }}>
                  {tl.proof_quote}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#4285F420", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏪</div>
                  <div style={{ fontSize: 13, color: "var(--ink-soft)", fontWeight: 600 }}>{tl.proof_author}</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { n: "127+", label: "clientes atendidos", color: "#4285F4" },
                  { n: "6 sem", label: "para ver resultado", color: "#34A853" },
                ].map((stat, i) => (
                  <div key={i} style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: 14, padding: "16px", textAlign: "center" }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: stat.color }}>{stat.n}</div>
                    <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════════════════════
          5. ANCORAGEM
      ═══════════════════════════════════════ */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="page-wrap" style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 36 }}>
            <Tag color="#FBBC05">{tl.anchor_tag}</Tag>
            <h2 style={{ fontSize: "clamp(20px, 4vw, 32px)", fontWeight: 800, lineHeight: 1.3, letterSpacing: "-0.02em" }}>
              {tl.anchor_title}
            </h2>
          </div>

          <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Agency */}
            <div style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: 16, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, opacity: 0.7 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, color: "var(--ink)" }}>{tl.anchor_agency}</div>
                <div style={{ fontSize: 13, color: "var(--ink-faint)" }}>{tl.anchor_agency_note}</div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#EA4335" }}>{tl.anchor_agency_price}</div>
            </div>

            {/* Freelancer */}
            <div style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: 16, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, opacity: 0.7 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, color: "var(--ink)" }}>{tl.anchor_free}</div>
                <div style={{ fontSize: 13, color: "var(--ink-faint)" }}>{tl.anchor_free_note}</div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#FBBC05" }}>{tl.anchor_free_price}</div>
            </div>

            {/* Ours — highlighted */}
            <div style={{
              background: "linear-gradient(135deg,#EDF2FF,#E8F5E9)", border: "2px solid #4285F4",
              borderRadius: 20, padding: "24px", position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 12, right: 12,
                background: "#34A853", color: "white", fontSize: 11, fontWeight: 700,
                padding: "4px 12px", borderRadius: 100, letterSpacing: "0.05em",
              }}>
                {tl.anchor_badge}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17, color: "var(--ink)", marginBottom: 4 }}>{tl.anchor_ours}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>{tl.anchor_ours_note}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  {config.anchorPrice > config.totalPrice && (
                    <div style={{ fontSize: 16, color: "var(--ink-faint)", textDecoration: "line-through" }}>{config.symbol} {config.anchorPrice}</div>
                  )}
                  <div style={{ fontSize: 36, fontWeight: 800, color: "#4285F4", lineHeight: 1 }}>{config.symbol} {config.totalPrice}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-faint)" }}>em 2x sem juros</div>
                </div>
              </div>
              <button
                className="btn-primary"
                onClick={open}
                style={{ width: "100%", padding: "14px", marginTop: 20, borderRadius: 12, fontSize: 16 }}
              >
                Quero essa condição →
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════════════════════
          6. AVERSÃO À PERDA
      ═══════════════════════════════════════ */}
      <section className="section">
        <div className="page-wrap" style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 32 }}>
            <Tag color="#EA4335">{tl.loss_tag}</Tag>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 16 }}>
              {tl.loss_title}
            </h2>
            <p style={{ fontSize: "clamp(16px,2.5vw,19px)", color: "var(--ink-soft)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
              {tl.loss_desc}
            </p>
          </div>

          <div className="reveal" style={{ background: "#FEF2F2", border: "1.5px solid #EA433530", borderRadius: 20, padding: "24px" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#EA4335", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {tl.loss_calc_title}
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {[
                { icon: "📅", n: "1", label: tl.loss_week, suffix: "" },
                { icon: "👥", n: "15–30", label: tl.loss_customers, suffix: "" },
                { icon: "💸", n: `${config.symbol} 3.000+`, label: tl.loss_revenue, suffix: "" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, background: "white", borderRadius: 12, padding: "14px 16px" }}>
                  <span style={{ fontSize: 22 }}>{row.icon}</span>
                  <div>
                    <span style={{ fontSize: 20, fontWeight: 800, color: "#EA4335" }}>{row.n} </span>
                    <span style={{ fontSize: 14, color: "var(--ink-soft)" }}>{row.label}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={open} style={{ width: "100%", padding: "14px", marginTop: 20, borderRadius: 12, fontSize: 16, background: "#EA4335", boxShadow: "0 6px 24px rgba(234,67,53,0.35)" }}>
              {tl.loss_cta}
            </button>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════════════════════
          7. PERTENCIMENTO
      ═══════════════════════════════════════ */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="page-wrap" style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 32 }}>
            <Tag color="#34A853">{tl.belong_tag}</Tag>
            <h2 style={{ fontSize: "clamp(20px, 4vw, 32px)", fontWeight: 800, lineHeight: 1.3, letterSpacing: "-0.02em" }}>
              {tl.belong_title}
            </h2>
          </div>

          <div className="reveal" style={{ background: "white", border: "1.5px solid var(--line)", borderRadius: 20, padding: "8px 24px", marginBottom: 20 }}>
            {[tl.belong_i1, tl.belong_i2, tl.belong_i3, tl.belong_i4].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: i < 3 ? "1px solid var(--line)" : "none" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#E8F5E9", display: "flex", alignItems: "center", justifyContent: "center", color: "#34A853", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>✓</div>
                <span style={{ fontSize: 15, color: "var(--ink-soft)" }}>{item}</span>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "clamp(17px,3vw,22px)", fontWeight: 700, color: "var(--ink)", marginBottom: 20 }}>{tl.belong_q}</p>
            <button className="btn-primary" onClick={open} style={{ padding: "15px 36px", fontSize: 16, borderRadius: 14 }}>
              {tl.hero_cta}
            </button>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════════════════════
          8. COMPROMISSO E COERÊNCIA
      ═══════════════════════════════════════ */}
      <section className="section">
        <div className="page-wrap" style={{ maxWidth: 620, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 32 }}>
            <Tag color="#4285F4">{tl.commit_tag}</Tag>
            <h2 style={{ fontSize: "clamp(20px, 4vw, 30px)", fontWeight: 800, lineHeight: 1.3, letterSpacing: "-0.02em" }}>
              {tl.commit_title}
            </h2>
          </div>

          <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[tl.commit_q1, tl.commit_q2, tl.commit_q3].map((q, i) => (
              <div key={i} style={{
                background: yesCount > i ? "#E8F5E9" : "white",
                border: `1.5px solid ${yesCount > i ? "#34A853" : "var(--line)"}`,
                borderRadius: 16, padding: "18px 20px",
                transition: "all 0.3s ease",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <p style={{ fontSize: 15, color: "var(--ink)", lineHeight: 1.5, flex: 1 }}>{q}</p>
                  <button
                    onClick={() => { if (yesCount === i) setYesCount(i + 1); }}
                    disabled={yesCount > i}
                    style={{
                      padding: "8px 20px", borderRadius: 100, border: "none",
                      background: yesCount > i ? "#34A853" : "#EDF2FF",
                      color: yesCount > i ? "white" : "#4285F4",
                      fontWeight: 700, fontSize: 14, cursor: yesCount > i ? "default" : "pointer",
                      fontFamily: "inherit", transition: "all 0.3s", flexShrink: 0,
                      opacity: yesCount < i ? 0.4 : 1,
                    }}
                  >
                    {yesCount > i ? "✓ " : ""}{tl.commit_yes}
                  </button>
                </div>
              </div>
            ))}

            {/* Unlocked CTA */}
            <div style={{
              background: "linear-gradient(135deg,#4285F4,#34A853)", borderRadius: 16, padding: "24px",
              textAlign: "center", opacity: yesCount >= 3 ? 1 : 0.25,
              transform: yesCount >= 3 ? "scale(1)" : "scale(0.98)",
              transition: "all 0.4s ease",
              pointerEvents: yesCount >= 3 ? "auto" : "none",
            }}>
              <p style={{ color: "white", fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{tl.commit_cta}</p>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, marginBottom: 16 }}>
                {tl.commit_price} {config.symbol} {config.entryPrice} {tl.commit_start}
              </p>
              <button
                onClick={open}
                style={{
                  background: "white", color: "#4285F4", fontWeight: 800, fontSize: 16,
                  padding: "14px 32px", borderRadius: 12, border: "none", cursor: "pointer", fontFamily: "inherit",
                }}
              >
                {tl.hero_cta}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════════════════════
          9. URGÊNCIA + ESCASSEZ
      ═══════════════════════════════════════ */}
      <section className="section" style={{ background: "linear-gradient(135deg,#FFF8E1,#FEF2F2)" }}>
        <div className="page-wrap" style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <div className="reveal">
            <Tag color="#EA4335">{tl.urgent_tag}</Tag>
            <h2 style={{ fontSize: "clamp(20px, 4vw, 30px)", fontWeight: 800, lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: 28 }}>
              {tl.urgent_title}
            </h2>

            {/* Countdown */}
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 20 }}>
              {[
                { n: String(h).padStart(2, "0"), label: tl.urgent_hours },
                { n: String(m).padStart(2, "0"), label: tl.urgent_min },
                { n: String(s).padStart(2, "0"), label: tl.urgent_sec },
              ].map((unit, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ background: "#1A1A2E", color: "white", borderRadius: 12, padding: "16px 20px", minWidth: 72, textAlign: "center" }}>
                    <div style={{ fontSize: 36, fontWeight: 800, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{unit.n}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{unit.label}</div>
                  </div>
                  {i < 2 && <span style={{ fontSize: 28, fontWeight: 800, color: "#EA4335" }}>:</span>}
                </div>
              ))}
            </div>

            <p style={{ fontSize: 14, color: "var(--ink-faint)", marginBottom: 20 }}>{tl.urgent_note}</p>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 100, background: "#FFF3E0", border: "1.5px solid #FBBC0550", color: "#B8860B", fontSize: 14, fontWeight: 700, marginBottom: 28 }}>
              ⚡ 1 {tl.urgent_spots}
            </div>

            <button
              className="btn-primary"
              onClick={open}
              style={{ width: "100%", padding: "18px", fontSize: 18, borderRadius: 16, boxShadow: "0 8px 32px rgba(66,133,244,0.4)" }}
            >
              {tl.urgent_cta}
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          10. FINAL CTA
      ═══════════════════════════════════════ */}
      <section className="section" style={{ background: "#0D1117", paddingBottom: "clamp(80px,15vw,120px)" }}>
        <div className="page-wrap" style={{ textAlign: "center", maxWidth: 620, margin: "0 auto" }}>
          <h2 className="reveal" style={{
            fontSize: "clamp(28px,6vw,52px)", fontWeight: 800, lineHeight: 1.15,
            color: "white", marginBottom: 12, letterSpacing: "-0.03em",
          }}>
            {tl.final_title}
          </h2>
          <p className="reveal" style={{ fontSize: "clamp(18px,3vw,24px)", color: "rgba(255,255,255,0.5)", marginBottom: 36, fontWeight: 600 }}>
            {tl.final_sub}
          </p>
          <button
            className="btn-primary reveal"
            onClick={open}
            style={{ padding: "20px 48px", fontSize: 20, borderRadius: 18, boxShadow: "0 12px 48px rgba(66,133,244,0.55)" }}
          >
            {tl.final_cta}
          </button>

          <div style={{ display: "flex", height: 3, borderRadius: 100, overflow: "hidden", maxWidth: 200, margin: "48px auto 0" }}>
            {["#4285F4","#EA4335","#FBBC05","#34A853"].map((c) => <div key={c} style={{ flex: 1, background: c }} />)}
          </div>
        </div>
      </section>

      {/* -- STICKY BAR -- */}
      <div className="sticky-bar" onClick={open}>
        <span>⚡</span>
        <span>{tl.sticky} {config.symbol} {config.entryPrice}</span>
      </div>

      <PayModal2 open={modalOpen} onClose={() => setModalOpen(false)} config={config} lang={lang} />
    </div>
  );
}
