/**
 * 拾光 AI · Lumi 产品主页
 * 设计风格：暖金叙事派（Warm Narrative）
 * 五屏叙事结构：感觉钩子 → 场景共鸣 → 转折唤醒 → 产品定义 → 行动召唤
 * 色调：暖金 #C8963E、深棕 #2C1A0E、米白 #FAF5EE
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BellRing, BookmarkPlus, Brain, CheckCircle2, FileText, MessageCircle, Send, ShieldCheck, Sparkles } from "lucide-react";

const LUMI_LOGO = "/assets/lumi/logo.png";
const LUMI_HERO_REFERENCE = "/assets/lumi/hero-reference.png";
const LUMI_CHARACTER = "/assets/lumi/hero-scene-feather-v2.png";
const LUMI_SUBWAY_SCENE = "/assets/lumi/scene-subway-work-bg.png";
const LUMI_AWAKENING_BG = "/assets/lumi/awakening-memory-bg.png";
const LUMI_FINAL_HANDOFF = "/assets/lumi/final-lumi-card-half.png";
const LUMI_FINAL_PEEK = "/assets/lumi/final-lumi-peek-only-tight.png";

// ── 粒子组件 ──────────────────────────────────────────────────
function Particles({ count = 12, className = "" }: { count?: number; className?: string }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 2,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 3,
  }));
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            "--duration": `${p.duration}s`,
            "--delay": `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function FloatingLeaves({ count = 12 }: { count?: number }) {
  const leaves = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 68 + ((i * 17) % 38),
    y: -14 + ((i * 23) % 42),
    size: 8 + ((i * 5) % 9) + (i % 5 === 0 ? 4 : 0),
    duration: 6.4 + ((i * 13) % 34) / 10,
    delay: -((i * 7) % 46) / 10,
    driftX: -(300 + ((i * 47) % 360)),
    driftY: 310 + ((i * 53) % 380),
    rotate: ((i * 31) % 94) - 47,
    opacity: 0.2 + ((i * 11) % 24) / 100,
    blur: i % 5 === 0 ? 1.2 : i % 3 === 0 ? 0.6 : 0,
    scale: i % 5 === 0 ? 1.25 : i % 3 === 0 ? 0.82 : 1,
  }));

  return (
    <div className="lumi-leaves-layer">
      {leaves.map((leaf) => (
        <span
          key={leaf.id}
          className="lumi-leaf"
          style={{
            left: `${leaf.x}%`,
            top: `${leaf.y}%`,
            width: leaf.size,
            height: leaf.size * 1.7,
            opacity: leaf.opacity,
            "--leaf-duration": `${leaf.duration}s`,
            "--leaf-delay": `${leaf.delay}s`,
            "--leaf-drift-x": `${leaf.driftX}px`,
            "--leaf-drift-y": `${leaf.driftY}px`,
            "--leaf-rotate": `${leaf.rotate}deg`,
            "--leaf-opacity": leaf.opacity,
            "--leaf-blur": `${leaf.blur}px`,
            "--leaf-scale": leaf.scale,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ── 收藏卡片组件 ──────────────────────────────────────────────
function BookmarkCard({
  icon, title, source, delay = 0, className = "",
}: {
  icon: string; title: string; source: string; delay?: number; className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: Math.random() * 4 - 2 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`bookmark-card px-3 py-2.5 w-52 ${className}`}
    >
      <div className="flex items-start gap-2">
        <span className="text-lg flex-shrink-0 mt-0.5">{icon}</span>
        <div className="min-w-0">
          <p className="text-xs font-medium text-[#2C1A0E] leading-snug line-clamp-2">{title}</p>
          <p className="text-[10px] text-[#C8963E] mt-1 font-light">{source}</p>
        </div>
        <span className="text-[#C8963E] text-sm flex-shrink-0">🔖</span>
      </div>
    </motion.div>
  );
}

// ── Lumi 消息气泡 ─────────────────────────────────────────────
function LumiBubble({ message, delay = 0 }: { message: string; delay?: number }) {
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setShown(true), delay * 1000);
      return () => clearTimeout(t);
    }
  }, [inView, delay]);

  return (
    <div ref={ref} className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#C8963E]/30 shadow-sm">
        <img src={LUMI_LOGO} alt="Lumi" className="w-full h-full object-cover" />
      </div>
      <motion.div
        initial={{ opacity: 0, x: -20, scale: 0.95 }}
        animate={shown ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="lumi-bubble px-4 py-3 max-w-sm"
      >
        <p className="text-xs text-[#C8963E] font-medium mb-1">Lumi</p>
        <p className="text-sm text-[#2C1A0E] leading-relaxed">{message}</p>
      </motion.div>
    </div>
  );
}

// ── 导航栏 ────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
        scrolled ? "bg-[#FFFDF8]/92 backdrop-blur-md shadow-sm border-[#C8963E]/12" : "bg-[#FFFDF8]/88 backdrop-blur-sm border-[#D8C1A1]/55"
      }`}
    >
      <div className="container flex items-center justify-between h-[72px]">
        <div className="flex items-center gap-2.5">
          <img src={LUMI_LOGO} alt="Lumi Logo" className="w-10 h-10 object-cover rounded-[12px] shadow-[0_8px_24px_rgba(80,43,18,0.14)]" />
          <span className="font-serif text-[#2C1A0E] font-semibold text-[21px] tracking-wide">拾光 AI</span>
          <span className="text-[#C8963E]/70 text-[13px] font-light ml-1">lumi.ai</span>
        </div>
        <button className="btn-lumi text-[13px] py-2.5 px-7">遇见 Lumi</button>
      </div>
    </nav>
  );
}

// ── 第一屏：感觉钩子 ──────────────────────────────────────────
function HeroSection() {
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FAF5EE]">
      {/* 背景层：左侧纯米白 + 右侧暖色光影 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF5EE] via-[#F5E6C8]/30 to-[#E8D5B0]/40" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E8D0A8]/25 to-transparent" />
        <div className="absolute top-0 right-0 w-1/3 h-2/3 bg-gradient-to-bl from-[#D4A855]/10 to-transparent" />
      </div>
      <Particles count={10} />

      <motion.div style={{ opacity: contentOpacity }} className="relative z-10 h-screen">
        <div className="container h-full">
          <div className="relative h-full flex items-center">

            {/* ======== 左侧文字区 (35%) ======== */}
            <div className="relative z-30 w-full lg:w-[38%] space-y-5 pt-16">
              {/* 小星星装饰 */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[#C8963E]/60 text-lg"
              >
                ✨
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-[#C8963E] text-sm font-light tracking-[0.25em] uppercase"
              >
                LUMI.AI · 拾光 AI
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25 }}
                className="font-serif text-[#2C1A0E] leading-[1.2]"
              >
                <span className="block text-[2.6rem] lg:text-[3.2rem] font-bold">你的收藏夹里，</span>
                <span className="block text-[2.6rem] lg:text-[3.2rem] font-bold">藏着一个你还没</span>
                <span className="block text-[2.6rem] lg:text-[3.2rem] font-bold text-[#C8963E]">成为的自己。</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-[#4A2E10]/70 text-base leading-relaxed font-light"
              >
                那些你收藏的东西，还记得它们吗？
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="text-[#C8963E] text-lg font-serif italic"
              >
                Lumi 记得。
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex items-center gap-5 pt-2"
              >
                <button className="btn-lumi text-sm px-7 py-2.5">遇见 Lumi →</button>
                <div className="flex items-center gap-2 text-[#6B3F1E]/50 text-sm">
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-5 h-5 rounded-full border border-[#C8963E]/40 flex items-center justify-center"
                  >
                    <span className="text-[#C8963E]/60 text-[10px]">↓</span>
                  </motion.div>
                  <span className="font-light">向下滚动，看看你的故事</span>
                </div>
              </motion.div>
            </div>

            {/* ======== 中间浮动收藏卡片 (25%) ======== */}
            <div className="hidden lg:block absolute z-20" style={{ left: "34%", top: 0, bottom: 0, width: "28%" }}>
              {/* 虚线弧线装饰 */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 700" fill="none">
                <path d="M 150 120 C 180 200, 120 280, 160 360 C 200 440, 130 520, 150 600" stroke="#C8963E" strokeOpacity="0.15" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
              </svg>

              {/* 卡片1：文章 */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: -4 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="absolute"
                style={{ top: "14%", left: "10%" }}
              >
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                  <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-3 w-[180px] border border-[#F0E8D8]/60">
                    <div className="flex items-start gap-2.5">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#E8D5B0] to-[#D4A855]/60 flex-shrink-0 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-[#C8963E]/20 to-[#E8D5B0]/80" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-[10px] bg-[#FFF3E0] text-[#C8963E] px-1.5 py-0.5 rounded font-medium mb-1">文章</span>
                        <p className="text-[11px] font-medium text-[#2C1A0E] leading-snug">2024 AI Agent<br/>行业趋势报告</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-[#C8963E]/60 mt-2">05.20 收藏</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* 卡片2：视频 */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: 3 }}
                animate={{ opacity: 1, y: 0, rotate: 3 }}
                transition={{ duration: 0.7, delay: 1.1 }}
                className="absolute"
                style={{ top: "38%", left: "18%" }}
              >
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                  <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-3 w-[190px] border border-[#F0E8D8]/60">
                    <div className="flex items-start gap-2.5">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#3a3a3a] to-[#555] flex-shrink-0 overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                            <span className="text-white text-xs ml-0.5">▶</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-[10px] bg-[#E8F5E9] text-[#4CAF50] px-1.5 py-0.5 rounded font-medium mb-1">视频</span>
                        <p className="text-[11px] font-medium text-[#2C1A0E] leading-snug">Build an AI Agent<br/>从 0 到 1 实战</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-[#C8963E]/60 mt-2">05.18 收藏</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* 卡片3：笔记 */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: -2 }}
                transition={{ duration: 0.7, delay: 1.4 }}
                className="absolute"
                style={{ top: "62%", left: "8%" }}
              >
                <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}>
                  <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-3 w-[175px] border border-[#F0E8D8]/60">
                    <div className="flex items-start gap-2.5">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F3E5F5] to-[#CE93D8]/30 flex-shrink-0 flex items-center justify-center">
                        <span className="text-[#9C27B0] text-sm">✏️</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-[10px] bg-[#F3E5F5] text-[#9C27B0] px-1.5 py-0.5 rounded font-medium mb-1">笔记</span>
                        <p className="text-[11px] font-medium text-[#2C1A0E] leading-snug">Agent 产品方案<br/>灵感笔记</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-[#C8963E]/60 mt-2">05.16 收藏</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* ======== 右侧 Lumi 人物图 ======== */}
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[42%] z-10">
              <img
                src={LUMI_HERO_REFERENCE}
                alt="Lumi"
                className="absolute right-0 bottom-0 h-[95%] object-contain object-right-bottom"
                style={{
                  maskImage: "linear-gradient(to right, transparent 0%, black 20%), linear-gradient(to top, black 85%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%), linear-gradient(to top, black 85%, transparent 100%)",
                  maskComposite: "intersect",
                  WebkitMaskComposite: "destination-in",
                  filter: "drop-shadow(0 10px 40px rgba(200,150,62,0.15))"
                }}
              />
            </div>

            {/* ======== 右侧 UI 面板：Lumi 今日发现 ======== */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="hidden lg:block absolute z-30"
              style={{ top: "12%", right: "3%", width: "300px" }}
            >
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                <div className="bg-white/92 backdrop-blur-lg rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-white/70 overflow-hidden">
                  {/* 标题栏 */}
                  <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#F0E8D8]/80">
                    <div className="flex items-center gap-2">
                      <img src={LUMI_LOGO} alt="" className="w-5 h-5 rounded-md object-cover" />
                      <span className="text-sm font-bold text-[#2C1A0E]">Lumi 今日发现</span>
                    </div>
                    <span className="text-[10px] text-[#C8963E]/80 bg-[#FFF8EE] px-2 py-0.5 rounded-full font-medium">✨ AI 已为你完成</span>
                  </div>

                  {/* 对话内容 */}
                  <div className="px-5 py-4 space-y-3">
                    <p className="text-xs text-[#4A2E10]/80 leading-relaxed">
                      你好！我发现你最近在「AI Agent」方向有一些很棒的收藏，我可以更进一步。 <span className="text-[#4CAF50]">&#10004;</span>
                    </p>

                    {/* 统计区 */}
                    <div className="bg-[#FAFAF5] rounded-xl px-4 py-3 border border-[#F0E8D8]/50">
                      <p className="text-[11px] text-[#6B3F1E]/70 mb-2">你最近连续收藏了 <span className="text-[#C8963E] font-bold text-base">7</span> 条 AI Agent 相关内容</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2">
                          <div className="w-7 h-7 rounded-lg bg-[#FFF3E0] flex items-center justify-center flex-shrink-0">
                            <span className="text-xs">📄</span>
                          </div>
                          <div>
                            <p className="text-[11px] font-medium text-[#2C1A0E]">其中 3 条适合做项目背景</p>
                            <p className="text-[9px] text-[#6B3F1E]/50">帮你梳理行业趋势与机会点</p>
                          </div>
                          <span className="text-[#C8963E]/40 text-xs ml-auto">›</span>
                        </div>
                        <div className="flex items-center gap-2.5 bg-white rounded-lg px-3 py-2">
                          <div className="w-7 h-7 rounded-lg bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                            <span className="text-xs">✏️</span>
                          </div>
                          <div>
                            <p className="text-[11px] font-medium text-[#2C1A0E]">2 条适合用于产品方案设计</p>
                            <p className="text-[9px] text-[#6B3F1E]/50">可提炼关键功能与解决思路</p>
                          </div>
                          <span className="text-[#C8963E]/40 text-xs ml-auto">›</span>
                        </div>
                      </div>
                    </div>

                    {/* 建议下一步 */}
                    <div className="bg-[#FAFAF5] rounded-xl px-4 py-3 border border-[#F0E8D8]/50">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-xs mt-0.5">💡</span>
                        <div>
                          <p className="text-[11px] font-medium text-[#2C1A0E] mb-0.5">建议下一步：</p>
                          <p className="text-[10px] text-[#4A2E10]/70 leading-relaxed">基于以上内容，生成一张『项目论证卡』，帮你快速明确方向与价值。</p>
                        </div>
                      </div>
                      <button className="w-full bg-gradient-to-r from-[#C8963E] to-[#B8862E] text-white text-[11px] font-medium py-2 rounded-xl hover:shadow-md transition-shadow">
                        生成项目论证卡 →
                      </button>
                    </div>

                    <p className="text-[9px] text-[#6B3F1E]/40 text-center">ⓘ Lumi 会持续为你分析收藏，带来更有价值的发现。</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ======== 底部横条：来自你的收藏夹 ======== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.6 }}
              className="hidden lg:flex absolute z-30 items-center gap-3"
              style={{ bottom: "10%", right: "18%" }}
            >
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg px-4 py-2.5 border border-[#F0E8D8]/60 flex items-center gap-3">
                  <span className="text-[11px] font-medium text-[#2C1A0E]">来自你的收藏夹</span>
                  <div className="flex -space-x-2">
                    {["#C8963E", "#8D6E63", "#A1887F", "#D4A855", "#6B3F1E"].map((c, i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#6B3F1E]/50">共 7 条相关内容 ›</span>
                </div>
              </motion.div>
            </motion.div>

            {/* ======== 右下角小贴士 ======== */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="hidden lg:block absolute z-30"
              style={{ bottom: "8%", right: "3%" }}
            >
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>
                <div className="bg-[#FFFDF5]/92 backdrop-blur-sm rounded-2xl shadow-md px-4 py-3 w-48 border border-[#C8963E]/15">
                  <p className="text-[10px] text-[#C8963E] font-bold mb-1">✨ 小贴士</p>
                  <p className="text-[10px] text-[#2C1A0E]/70 leading-relaxed">每天花 1 分钟整理收藏，让灵感变成真正的结果。</p>
                </div>
              </motion.div>
            </motion.div>

            {/* 向下滚动提示 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-30"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-6 h-10 rounded-full border-2 border-[#C8963E]/30 flex items-start justify-center pt-1.5"
              >
                <div className="w-1 h-2 rounded-full bg-[#C8963E]/50" />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}

function HeroSectionV2() {
  return (
    <section className="lumi-hero-v2">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_44%,rgba(225,184,112,0.36),transparent_30%),linear-gradient(90deg,#fffaf2_0%,#fbf2e5_47%,#ead6b8_100%)]" />
      <div className="absolute left-[38%] top-[10%] hidden h-[72%] w-[42%] rounded-full bg-[#E8B86D]/16 blur-2xl md:block" />
      <FloatingLeaves count={14} />

      <div className="lumi-hero-character" aria-hidden="true">
        <img src={LUMI_CHARACTER} alt="" />
      </div>

      <div className="lumi-hero-v2-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lumi-hero-copy"
        >
          <span className="lumi-kicker-star">✦</span>
          <p className="lumi-kicker">
            LUMI.AI · 拾光 AI
          </p>
          <h1 className="lumi-hero-title">
            <span className="block">你的收藏夹里，</span>
            <span className="block">藏着一个你还没</span>
            <span className="block lumi-title-gold-flow">成为的自己。</span>
          </h1>
          <p className="lumi-hero-subtitle">
            那些你收藏的东西，还记得它们吗？
          </p>
          <p className="lumi-remember">Lumi 记得。</p>
          <div className="flex flex-wrap items-center gap-6 pt-6">
            <button className="btn-lumi lumi-hero-cta text-lg px-12 py-4">遇见 Lumi →</button>
            <div className="lumi-scroll-hint">
              <span className="lumi-scroll-dot">↓</span>
              <span>向下滚动，看看你的故事</span>
            </div>
          </div>
        </motion.div>

        <div className="lumi-hero-stage" aria-hidden="true">
          <div className="lumi-morning-glow" />
          <svg className="lumi-orbit" viewBox="0 0 620 660" fill="none">
            <path d="M108 188C236 48 476 12 516 88C568 188 226 246 270 365C312 478 486 438 536 552" stroke="white" strokeOpacity=".86" strokeWidth="2" />
            <path d="M162 282C278 188 474 176 512 246C558 332 276 362 318 462C352 542 464 542 518 604" stroke="#D6A754" strokeOpacity=".38" strokeDasharray="5 7" />
          </svg>
          <svg className="lumi-connectors" viewBox="0 0 760 720" fill="none">
            <path className="lumi-connector-base" d="M214 150 C242 132 263 119 292 105" />
            <path className="lumi-connector-base" d="M82 248 C66 286 62 326 80 370" />
            <path className="lumi-connector-base" d="M98 456 C88 486 92 506 110 526" />
            <path className="lumi-connector-base" d="M304 590 C268 600 248 615 232 638" />
            <path className="lumi-connector-flow" d="M214 150 C242 132 263 119 292 105" />
            <path className="lumi-connector-flow" d="M82 248 C66 286 62 326 80 370" />
            <path className="lumi-connector-flow" d="M98 456 C88 486 92 506 110 526" />
            <path className="lumi-connector-flow" d="M304 590 C268 600 248 615 232 638" />
          </svg>

          <motion.div
            className="lumi-mini-card lumi-card-article"
            initial={{ opacity: 0, y: 24, rotate: -7 }}
            animate={{ opacity: 1, y: [0, -14, 0], rotate: [-7, -5.5, -7] }}
            transition={{ opacity: { duration: 0.7, delay: 0.4 }, y: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }, rotate: { duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 } }}
          >
            <span>文章</span>
            <strong>2024 AI Agent<br />行业趋势报告</strong>
            <div className="lumi-thumb lumi-thumb-gold" />
            <small>05.20 收藏</small>
          </motion.div>

          <motion.div
            className="lumi-mini-card lumi-card-video"
            initial={{ opacity: 0, y: 24, rotate: 7 }}
            animate={{ opacity: 1, y: [0, 12, 0], rotate: [7, 5.8, 7] }}
            transition={{ opacity: { duration: 0.7, delay: 0.55 }, y: { duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.9 }, rotate: { duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.9 } }}
          >
            <span>视频</span>
            <strong>Build an AI Agent<br />从 0 到 1 实战</strong>
            <div className="lumi-thumb lumi-thumb-video">▶</div>
            <small>05.18 收藏</small>
          </motion.div>

          <motion.div
            className="lumi-mini-card lumi-card-note"
            initial={{ opacity: 0, y: 24, rotate: -6 }}
            animate={{ opacity: 1, y: [0, -10, 0], rotate: [-6, -7.5, -6] }}
            transition={{ opacity: { duration: 0.7, delay: 0.7 }, y: { duration: 5.1, repeat: Infinity, ease: "easeInOut", delay: 1.3 }, rotate: { duration: 5.1, repeat: Infinity, ease: "easeInOut", delay: 1.3 } }}
          >
            <span>笔记</span>
            <strong>Agent 产品方案<br />灵感笔记</strong>
            <div className="lumi-thumb lumi-thumb-note" />
            <small>05.16 收藏</small>
          </motion.div>

          <motion.div className="lumi-discovery-panel" initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
            <div className="lumi-discovery-header">
              <div className="flex items-center gap-3">
                <img src={LUMI_LOGO} alt="" className="h-8 w-8 rounded-full object-cover" />
                <span className="font-serif text-[22px] italic text-[#C8963E]">Lumi</span>
                <span className="text-[17px] font-bold text-[#2C1A0E]">今日发现</span>
              </div>
              <span className="text-[10px] text-[#C8963E]">✦ AI 已分析完成 ·</span>
            </div>
            <div className="lumi-discovery-body">
              <p className="lumi-discovery-intro">
                你好！我发现你最近在「AI Agent」方向有一些很棒的收藏，我们可以更进一步。
              </p>
              <div className="lumi-insight-box">
                <p className="mb-4 text-[13px] text-[#6B3F1E]/72">你最近连续收藏了 <b className="text-xl text-[#C8963E]">7</b> 条 AI Agent 相关内容</p>
                <div className="space-y-3">
                  <div className="lumi-insight-row">
                    <i>▧</i>
                    <div><b>其中 3 条适合做项目背景</b><span>帮你梳理行业趋势与机会点</span></div>
                    <em>›</em>
                  </div>
                  <div className="lumi-insight-row">
                    <i>✎</i>
                    <div><b>2 条适合用于产品方案设计</b><span>可提炼关键功能与解决思路</span></div>
                    <em>›</em>
                  </div>
                </div>
              </div>
              <div className="lumi-next-card">
                <p className="mb-2.5 text-xs font-semibold text-[#2C1A0E]">💡　建议下一步：</p>
                <p className="mb-5 text-[11px] leading-[1.55] text-[#6B3F1E]/72">基于以上内容，生成一张「项目论证卡」，帮你快速明确方向与价值。</p>
                <button className="mx-auto block w-[78%] rounded-full bg-gradient-to-r from-[#D6A14A] to-[#B87A20] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(194,126,32,0.28)]">
                  生成项目论证卡 →
                </button>
              </div>
            </div>
            <div className="lumi-discovery-footer">
              <span>ⓘ Lumi 会持续为你分析收藏，带来更有价值的发现。</span>
              <span>☷</span>
            </div>
          </motion.div>

          <div className="lumi-source-strip">
            <span>来自你的收藏夹</span>
            <div className="flex -space-x-2">
              {["#F5D2A2", "#8B5A3C", "#F0B95C", "#4C2E1B", "#D7AF72"].map((color) => (
                <i key={color} style={{ backgroundColor: color }} />
              ))}
            </div>
            <small>共 7 条相关内容 ›</small>
          </div>

          <div className="lumi-tip-note">
            <b>✦ 小贴士</b>
            <span>每天花 1 分钟整理收藏，让灵感变成真正的结果。</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 第二屏：场景共鸣 ──────────────────────────────────────────
function SceneSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const savedItems = [
    {
      image: "linear-gradient(135deg, #b48b6a, #efe0c8)",
      text: "刷到一篇文章，觉得以后用得上。",
      delay: 0.1,
      className: "scene-save-card-a",
    },
    {
      image: "linear-gradient(135deg, #d4b67a, #6d563f)",
      text: "看到一个案例，先存起来。",
      delay: 0.24,
      className: "scene-save-card-b",
    },
    {
      image: "linear-gradient(135deg, #b99765, #eadbc2)",
      text: "这个观点不错，回头再看。",
      delay: 0.38,
      className: "scene-save-card-c",
    },
  ];

  const workCards = [
    { title: "小林", desc: "想请你看下周报数据", meta: "2分钟前", className: "scene-work-a" },
    { title: "新邮件 · 23封未读", desc: "【项目更新】请查收最新进度文档", meta: "8分钟前", className: "scene-work-b" },
    { title: "部门例会", desc: "今天 14:30 腾讯会议", meta: "", className: "scene-work-c" },
    { title: "产品评审会", desc: "今天 10:00 - 11:00", meta: "", className: "scene-work-d" },
    { title: "任务提醒", desc: "PRD 文档截止 今天 18:00", meta: "", className: "scene-work-e" },
    { title: "协作留言 · 5条新消息", desc: "@你 需要你的确认", meta: "5分钟前", className: "scene-work-f" },
  ];

  const stats = [
    { label: "篇收藏", value: "847" },
    { label: "个稍后再看", value: "312" },
    { label: "永远没时间整理", value: "∞" },
  ];

  return (
    <section ref={ref} className="scene-cinema-section">
      <div className="scene-subway-bg">
        <img src={LUMI_SUBWAY_SCENE} alt="Lumi 在地铁上收藏内容" />
      </div>
      <div className="scene-warm-veil" />
      <div className="scene-work-veil" />
      <div className="scene-bottom-haze" />

      <motion.div
        className="scene-copy"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="scene-brand"><em>Lumi</em><span>/ 拾光 AI</span></p>
        <h2>那些你收藏的东西，<br />后来呢？</h2>
        <p className="scene-subcopy">你以为只是“稍后再看”，<br />却悄悄被时间，带向了遗忘。</p>
      </motion.div>

      <svg className="scene-orbit" viewBox="0 0 760 360" fill="none" aria-hidden="true">
        <path d="M96 172C206 42 456 30 514 118C586 226 318 284 236 202C176 142 318 76 548 170" />
        <path d="M212 248C312 184 484 178 606 224" />
      </svg>

      <div className="scene-saved-layer" aria-hidden="true">
        {savedItems.map((item, index) => (
          <motion.div
            key={item.text}
            className={`scene-save-card ${item.className}`}
            initial={{ opacity: 0, y: 18, rotate: index === 0 ? -1.5 : index === 1 ? 1.8 : -1 }}
            animate={inView ? { opacity: 1, y: 0, rotate: index === 0 ? -1.5 : index === 1 ? 1.8 : -1 } : {}}
            transition={{ duration: 0.7, delay: item.delay }}
          >
            <i style={{ background: item.image }} />
            <span>{item.text}</span>
            <small>已收藏</small>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="scene-turning-copy"
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.62 }}
      >
        <p>然后，日常被日程填满。</p>
        <p>消息、会议、截止日期。</p>
        <p>那些收藏，就这样沉下去了。</p>
      </motion.div>

      <div className="scene-work-layer" aria-hidden="true">
        {workCards.map((card, index) => (
          <motion.div
            key={card.className}
            className={`scene-work-card ${card.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.78 + index * 0.08 }}
          >
            <div>
              <b>{card.title}</b>
              <span>{card.desc}</span>
            </div>
            {card.meta && <small>{card.meta}</small>}
          </motion.div>
        ))}
        <motion.div
          className="scene-calendar-card"
          initial={{ opacity: 0, x: 18 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.12 }}
        >
          <span>09:00</span><span>10:00</span><span>11:00</span><span>12:00</span><span>13:00</span><span>14:00</span>
          <b>项目同步会<br /><small>10:00 - 11:00</small></b>
          <em>需求评审复盘<br /><small>14:00 - 15:00</small></em>
        </motion.div>
      </div>

      <motion.div
        className="scene-stat-row"
        initial={{ opacity: 0, y: 34 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.15 }}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="scene-stat-item">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="scene-insight"
        initial={{ opacity: 0, y: 26 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.55 }}
      >
        <i />
        <p>不是你不想往前走。是那些让你心动过的线索，总在生活最忙的时候，被轻轻压到后面。</p>
      </motion.div>
    </section>
  );
}

// ── 第三屏：转折唤醒 ──────────────────────────────────────────
function AwakeningSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFragmentId, setActiveFragmentId] = useState("study");

  const memoryFragments = [
    {
      id: "study",
      title: "成长",
      detail: "你反复收藏“如何变好”——也许你一直想成为更有能力的自己",
      className: "memory-fragment-study",
      rotate: -5,
      delay: 0.18,
      insight: "你收藏这些，不只是为了以后再看。它们更像是你给未来自己的提醒：你还想往前走。",
    },
    {
      id: "city",
      title: "底气",
      detail: "你存下那些判断、方法和经验——也许你想成为更稳、更清醒的人",
      className: "memory-fragment-city",
      rotate: 3,
      delay: 0.28,
      insight: "你存下这些判断、方法和经验，不是因为你想知道更多。是因为你想在下一次选择面前，更稳一点，更清楚一点。",
    },
    {
      id: "expression",
      title: "创造",
      detail: "你收藏了很多“从 0 到 1”——也许你在酝酿一个属于自己的作品",
      className: "memory-fragment-expression",
      rotate: -2,
      delay: 0.38,
      insight: "你收藏的那些作品、案例和从 0 到 1，不是只为了欣赏。它们像是在轻轻提醒你：你也有东西想做出来。",
    },
    {
      id: "solitude",
      title: "秩序",
      detail: "你总会停在节奏、身体和习惯那里——也许你想重新把自己接住",
      className: "memory-fragment-solitude",
      rotate: 4,
      delay: 0.48,
      insight: "你反复停在身体、节奏和习惯那里，不是因为你不够自律。是因为你想把自己重新接住。",
    },
    {
      id: "light",
      title: "远方",
      detail: "你收藏了很多“另一种世界”——也许你不想只活在眼前的生活里",
      className: "memory-fragment-light",
      rotate: -4,
      delay: 0.58,
      insight: "你收藏那些地方、故事和另一种活法，不是因为你只是想逃开现在。是因为你还想知道，自己可以怎样活得更开阔。",
    },
  ];
  const activeFragment = memoryFragments.find((fragment) => fragment.id === activeFragmentId) ?? memoryFragments[0];
  const activeFragmentIndex = memoryFragments.findIndex((fragment) => fragment.id === activeFragment.id) + 1;

  return (
    <section ref={ref} className="awakening-section">
      <div className="awakening-bg" aria-hidden="true">
        <img
          src={LUMI_AWAKENING_BG}
          alt=""
          className="awakening-bg-image"
        />
        <div className="awakening-bg-veil" />
        <div className="awakening-bg-fade" />
      </div>

      <div className="awakening-memory-layer">
        {memoryFragments.map((fragment) => (
          <motion.button
            type="button"
            key={fragment.title}
            className={`memory-fragment ${fragment.className} ${activeFragmentId === fragment.id ? "is-active" : ""}`}
            onClick={() => setActiveFragmentId(fragment.id)}
            aria-pressed={activeFragmentId === fragment.id}
            aria-label={`点亮收藏线索：${fragment.title}`}
            initial={{ opacity: 0, y: 18, rotate: fragment.rotate }}
            animate={inView ? { opacity: 1, y: 0, rotate: fragment.rotate } : {}}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.8, delay: fragment.delay, ease: "easeOut" }}
          >
            <i />
            <span>{fragment.title}</span>
            <small>{fragment.detail}</small>
          </motion.button>
        ))}
      </div>

      <div className="awakening-clue-layer" aria-hidden="true">
        {[
          "clue-thread-study",
          "clue-thread-city",
          "clue-thread-expression",
          "clue-thread-solitude",
          "clue-thread-light",
        ].map((thread, index) => (
          <motion.span
            key={thread}
            className={`clue-thread ${thread} ${thread.endsWith(activeFragmentId) ? "is-active" : ""}`}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1.25, delay: 0.92 + index * 0.12, ease: "easeInOut" }}
          />
        ))}
        <motion.span
          className="clue-hub"
          initial={{ opacity: 0, scale: 0.72 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.35 }}
        />
        {[
          "clue-spark-a",
          "clue-spark-b",
          "clue-spark-c",
        ].map((spark, index) => (
          <motion.span
            key={spark}
            className={`clue-spark ${spark}`}
            initial={{ opacity: 0, scale: 0.72 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 1.55 + index * 0.16 }}
          />
        ))}
      </div>

      <motion.div
        className="awakening-road-layer"
        aria-hidden="true"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1.65 }}
      >
        <svg viewBox="0 0 360 180" preserveAspectRatio="none">
          <path
            className="road-path road-path-base"
            d="M20 126 C96 84 178 82 244 58 C288 42 318 30 342 24"
          />
          <motion.path
            className="road-path road-path-flow"
            d="M20 126 C96 84 178 82 244 58 C288 42 318 30 342 24"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.8, delay: 1.82, ease: "easeInOut" }}
          />
        </svg>
        <span className="road-node road-node-a" />
        <span className="road-node road-node-b" />
        <span className="road-node road-node-c" />
      </motion.div>

      <motion.div
        className="awakening-live-panel"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.92 }}
      >
        <div className="awakening-live-header">
          <img src={LUMI_LOGO} alt="" />
          <div>
            <span>Lumi 正在整理</span>
            <strong>那些散落的碎片，其实一直在指向同一个你。</strong>
          </div>
        </div>

        <motion.div
          key={activeFragment.id}
          className="awakening-live-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
        >
          <small>Lumi 读到的方向 {String(activeFragmentIndex).padStart(2, "0")}</small>
          <strong>{activeFragment.title}</strong>
          <p>{activeFragment.detail}</p>
        </motion.div>

        <div className="awakening-live-actions" role="tablist" aria-label="选择收藏线索">
          {memoryFragments.map((fragment) => (
            <button
              type="button"
              key={fragment.id}
              className={activeFragmentId === fragment.id ? "is-active" : ""}
              onClick={() => setActiveFragmentId(fragment.id)}
              role="tab"
              aria-selected={activeFragmentId === fragment.id}
            >
              {fragment.title}
            </button>
          ))}
        </div>

        <div className="awakening-live-answer">
          <span>Lumi</span>
          <motion.p
            key={`${activeFragment.id}-panel`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
          >
            {activeFragment.insight && (
              <>
                {activeFragment.insight}<br />
              </>
            )}
            我会把这些线索留住，在合适的时候，重新递给你。
          </motion.p>
        </div>
      </motion.div>

      <Particles count={8} />

      <div className="container relative z-10 py-24 lg:py-32">
        <div className="awakening-copy">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="awakening-main-copy"
          >
            <p className="copy-opening">你收藏的，不只是信息。</p>
            <p className="copy-whisper">是你一次次停下来时，</p>
            <p className="copy-whisper">心里很轻地说过：</p>
            <em className="copy-quote">“我好像也想这样。”</em>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── 第四屏：产品定义 ──────────────────────────────────────────
function DefinitionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const capabilities = [
    {
      icon: BookmarkPlus,
      title: "留下",
      desc: "用户只是在别的 App 里照常收藏，不需要换一个整理入口。",
    },
    {
      icon: Brain,
      title: "看见",
      desc: "Lumi 读的不是资料本身，而是反复出现的方向和期待。",
    },
    {
      icon: BellRing,
      title: "唤醒",
      desc: "在合适时机用一张轻量卡片主动出现，不让收藏继续沉睡。",
    },
    {
      icon: Send,
      title: "走一步",
      desc: "把被唤醒的收藏变成一个很小、很容易开始的行动。",
    },
  ];

  const sourceCards = [
    { label: "微信收藏", note: "朋友转来的 Agent 访谈", className: "definition-source-a" },
    { label: "浏览器书签", note: "AI Agent 行业趋势报告", className: "definition-source-b" },
    { label: "小红书灵感", note: "从 0 到 1 的产品案例", className: "definition-source-c" },
  ];

  const intentSignals = [
    "重复主题：AI Agent",
    "阶段判断：正在酝酿产品方向",
    "可行动机会：先搭一张路线卡",
  ];

  return (
    <section id="definition" ref={ref} className="lumi-definition-section">
      <div className="definition-ambient-grid" aria-hidden="true" />
      <div className="definition-ambient-light" aria-hidden="true" />
      <Particles count={16} />

      <div className="definition-inner">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="definition-copy"
        >
          <p className="definition-kicker">Lumi AI 是什么</p>
          <h2>
            不是把收藏
            <br />
            堆成一座仓库。
          </h2>
          <p className="definition-lead">
            Lumi 是一条安静的 <strong>Agent 回路</strong>：她从你随手留下的收藏里，读出<strong>反复出现的方向</strong>；当某个时机到了，她会用一张<strong>轻量卡片</strong>提醒你，<strong>往前走一步</strong>。
          </p>
          <div className="definition-thesis">
            <Sparkles size={18} strokeWidth={1.8} aria-hidden="true" />
            <span>让每一次随手收藏，都有机会在未来重新发光。</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 44 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.18 }}
          className="definition-stage"
        >
          <div className="definition-stage-label">Lumi 正在读你的收藏</div>

          <div className="definition-source-stack" aria-label="收藏来源">
            {sourceCards.map((card, index) => (
              <motion.div
                key={card.label}
                className={`definition-source-card ${card.className}`}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.45 + index * 0.12 }}
              >
                <BookmarkPlus size={18} strokeWidth={1.7} aria-hidden="true" />
                <div>
                  <strong>{card.label}</strong>
                  <span>{card.note}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="definition-core" aria-label="Lumi 意图识别层">
            <div className="definition-core-orbit" aria-hidden="true" />
            <div className="definition-core-mark">
              <img src={LUMI_LOGO} alt="" />
              <strong>Lumi</strong>
              <span>把收藏读成意图</span>
            </div>
            <div className="definition-signal-list" aria-label="Lumi 识别到的信号">
              {intentSignals.map((signal) => (
                <span key={signal}>
                  <CheckCircle2 size={14} strokeWidth={1.8} aria-hidden="true" />
                  {signal}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            className="definition-wake-card"
            initial={{ opacity: 0, x: 24, y: 8 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.62, delay: 0.76 }}
            aria-label="Lumi 主动唤醒卡"
          >
            <div className="definition-wake-header">
              <img src={LUMI_LOGO} alt="" />
              <div>
                <span>Lumi 主动出现</span>
                <strong>这不像随机兴趣，更像一个方向正在形成。</strong>
              </div>
            </div>
            <div className="definition-wake-body">
              <small>轻量唤醒卡</small>
              <h3>你最近连续收藏了 7 条 AI Agent 内容。</h3>
              <p>
                其中 3 条在讲项目背景，2 条在讲产品落地。Lumi 读到的不是资料堆积，而是你可能正在靠近一个新方向。
              </p>
            </div>
            <div className="definition-next-action">
              <span>下一步</span>
              <button type="button" aria-label="生成一张【AI Agent学习路线】">
                生成一张【AI Agent学习路线】
                <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          </motion.div>

          <svg className="definition-flow-lines" viewBox="0 0 760 430" aria-hidden="true">
            <path d="M150 104 C250 92 286 158 365 202" />
            <path d="M150 214 C248 214 292 210 365 214" />
            <path d="M150 324 C252 328 288 266 365 226" />
            <path d="M424 214 C495 210 526 210 588 210" />
          </svg>
        </motion.div>
      </div>

      <motion.div
        className="definition-capability-rail"
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        {capabilities.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="definition-capability">
              <div className="definition-capability-icon">
                <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.title}</strong>
              <p>{item.desc}</p>
              {index < capabilities.length - 1 && <ArrowRight className="definition-capability-arrow" size={18} strokeWidth={1.7} aria-hidden="true" />}
            </div>
          );
        })}
      </motion.div>

      <motion.div
        className="definition-contrast"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, delay: 1.08 }}
      >
        <div>
          <span>传统知识库</span>
          <strong>等你想起来，再去搜索。</strong>
        </div>
        <i aria-hidden="true" />
        <div>
          <span>Lumi AI</span>
          <strong>读懂你想靠近的自己，再推你往前走一步。</strong>
        </div>
      </motion.div>
    </section>
  );
}

// ── 第五屏：行动召唤 ──────────────────────────────────────────
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const promises = [
    {
      icon: Sparkles,
      title: "不需要重新整理",
      desc: "你照常收藏，Lumi 负责把线索慢慢读出来。",
    },
    {
      icon: BellRing,
      title: "不会频繁打扰",
      desc: "只在收藏和当下刚好连起来的时候，轻轻问一句。",
    },
    {
      icon: ShieldCheck,
      title: "始终回到原文",
      desc: "每张小卡都能展开查看详情和原始收藏来源。",
    },
  ];

  return (
    <section id="start" ref={ref} className="lumi-final-section">
      <div className="final-bg-wash" aria-hidden="true" />
      <Particles count={12} />

      <div className="final-inner">
        <motion.div
          className="final-copy"
          initial={{ opacity: 0, y: 34 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.86 }}
        >
          <p className="final-kicker">开始连接</p>
          <h2>连接你的第一个收藏夹。</h2>

          <div className="final-actions">
            <button type="button" className="btn-lumi final-primary">
              开始连接收藏
              <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button type="button" className="final-secondary">
              看看 Lumi 会怎么读
            </button>
          </div>

          <div className="final-promises" aria-label="Lumi 的三个承诺">
            {promises.map((promise) => {
              const Icon = promise.icon;
              return (
                <div key={promise.title} className="final-promise">
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                  <div>
                    <strong>{promise.title}</strong>
                    <span>{promise.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="final-demo"
          initial={{ opacity: 0, x: 42 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.16 }}
          aria-label="Lumi 第一次主动出现的示例"
          >
            <div className="final-demo-label">一次很轻的主动出现</div>
            <img className="final-lumi-peek" src={LUMI_FINAL_PEEK} alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <img className="final-lumi-handoff" src={LUMI_FINAL_HANDOFF} alt="" aria-hidden="true" loading="lazy" decoding="async" />

            <motion.div
            className="final-whisper-card"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.58, delay: 0.42 }}
          >
            <div className="final-card-avatar">
              <img src={LUMI_LOGO} alt="" />
              <div>
                <span>Lumi</span>
                <strong>感觉你正在整理 AI Agent 的方向。</strong>
              </div>
            </div>
            <p>要不要我帮你把最近收藏的内容，先梳理成一张小卡？</p>
            <button type="button">
              好，帮我看看
              <MessageCircle size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </motion.div>

          <motion.div
            className="final-action-card"
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.62, delay: 0.62 }}
          >
            <small>Lumi 想确认</small>
            <h3>这些收藏，正在帮你靠近哪件事？</h3>
            <p>你是想先补一点新知识，动手做个小项目，还是把 AI Agent 系统学一遍？</p>
            <button type="button">
              生成一张【AI Agent学习路线】
              <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </motion.div>

          <motion.div
            className="final-doc-card"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.66, delay: 0.82 }}
          >
            <div className="final-doc-header">
              <FileText size={18} strokeWidth={1.8} aria-hidden="true" />
              <div>
                <span>收藏小卡</span>
                <strong>AI Agent学习路线</strong>
              </div>
              <small>约 4 分钟读完</small>
            </div>
            <ol>
              <li>先理解 Agent 和普通 Chatbot 的区别。</li>
              <li>选一个真实的小任务做 MVP。</li>
              <li>用收藏里的 3 个案例拆解交互方式。</li>
              <li>今天只写下你的第一个使用场景。</li>
            </ol>
            <div className="final-doc-footer">
              <span>已按相关度整理 7 条收藏</span>
              <button type="button">
                查看详情与原文
                <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 页脚 ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#2C1A0E] py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={LUMI_LOGO} alt="Lumi Logo" className="w-10 h-10 object-cover rounded-xl" />
            <div>
              <p className="font-serif text-[#FAF5EE] font-semibold">拾光 AI</p>
              <p className="text-[#C8963E]/50 text-xs">lumi.ai</p>
            </div>
          </div>
          <p className="text-[#C8963E]/40 text-xs font-light text-center">
            让每一次随手收藏，都有机会在未来某个关键时刻重新发光。
          </p>
          <p className="text-[#FAF5EE]/20 text-xs">© 2026 拾光 AI</p>
        </div>
      </div>
    </footer>
  );
}

// ── 主页面 ────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FAF5EE" }}>
      <Navbar />
      <HeroSectionV2 />
      <SceneSection />
      <AwakeningSection />
      <DefinitionSection />
      <CTASection />
      <Footer />
    </div>
  );
}
