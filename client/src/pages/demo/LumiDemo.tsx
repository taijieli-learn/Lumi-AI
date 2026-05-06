import { ArrowRight, BellRing, Check, ChevronRight, CircleDot, LockKeyhole, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { demoNavItems, demoStages, evidenceItems, finalMemory, intentSignals, lumiMessage, routeSteps, sourceSummary } from "./demoFlow";

const LUMI_LOGO = "/assets/lumi/logo.png";

export default function LumiDemo() {
  const [stage, setStage] = useState(0);
  const currentStage = demoStages[stage];
  const progress = useMemo(() => ((stage + 1) / demoStages.length) * 100, [stage]);
  const showEvidence = stage >= 1;
  const showRouteCard = stage >= 3;
  const showComplete = stage >= 4;

  const advance = () => {
    if (stage === demoStages.length - 1) {
      setStage(0);
      return;
    }
    setStage((value) => Math.min(value + 1, demoStages.length - 1));
  };

  return (
    <main className="min-h-screen bg-[#ECEAE6] p-3 text-[#17130F]">
      <div className="grid min-h-[calc(100vh-24px)] grid-cols-[248px_minmax(0,1fr)] overflow-hidden rounded-[24px] border border-black/8 bg-[#F7F6F3] shadow-[0_22px_70px_rgba(28,22,16,0.12)]">
        <aside className="flex min-h-0 flex-col border-r border-black/6 bg-[#EDEBE7] px-4 py-6">
          <a href="/" className="mb-7 flex items-center gap-3" aria-label="返回 Lumi 官网">
            <img src={LUMI_LOGO} alt="" className="h-9 w-9 rounded-[11px] object-cover shadow-[0_8px_18px_rgba(70,48,24,0.14)]" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-[24px] font-semibold leading-none tracking-[-0.01em]">Lumi</span>
                <span className="rounded-md bg-[#E7D7B8] px-2 py-0.5 text-xs font-medium text-[#8B6427]">Demo</span>
              </div>
              <p className="text-xs text-[#7B756D]">收藏记忆 Agent</p>
            </div>
          </a>

          <nav className="space-y-2" aria-label="Demo navigation">
            {demoNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-4 text-left text-sm transition ${
                    item.active ? "bg-white text-[#17130F] shadow-sm" : "text-[#605A52] hover:bg-white/60"
                  }`}
                >
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-7 rounded-[18px] bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold">已连接来源</p>
              <span className="flex h-2 w-2 rounded-full bg-[#68A86B]" aria-label="connected" />
            </div>
            <div className="space-y-2">
              {sourceSummary.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="text-[#6D675F]">{item.label}</span>
                  <span className="font-semibold text-[#17130F]">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto rounded-[18px] bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <LockKeyhole size={16} strokeWidth={1.8} aria-hidden="true" />
              私密模式
            </div>
            <p className="text-sm leading-6 text-[#6D675F]">Lumi 只用你的收藏线索生成今日发现，不公开、不打扰。</p>
          </div>
        </aside>

        <section className="min-w-0 overflow-y-auto px-9 py-7">
          <header className="mb-7 flex items-start justify-between gap-6">
            <div>
              <p className="mb-3 text-sm font-semibold text-[#B9852F]">今日 Lumi 发现</p>
              <h1 className="max-w-3xl font-serif text-[38px] font-semibold leading-[1.08] tracking-[-0.01em]">
                你最近收藏的内容里，有一个方向正在变清楚。
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-medium text-[#5E574E] shadow-sm transition hover:bg-[#FBFAF7]"
              >
                <Search size={17} strokeWidth={1.8} aria-hidden="true" />
                找回收藏
              </button>
              <button
                type="button"
                className="flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-medium text-[#5E574E] shadow-sm transition hover:bg-[#FBFAF7]"
              >
                <BellRing size={17} strokeWidth={1.8} aria-hidden="true" />
                安静提醒
              </button>
            </div>
          </header>

          <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-[#E3DED6]">
            <div className="h-full rounded-full bg-[#C3913B] transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-5">
              <section className="rounded-[24px] bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F1E4CB] text-[#B9852F]">
                      <Sparkles size={21} strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#B9852F]">{currentStage.label}</p>
                      <h2 className="text-[22px] font-semibold tracking-[-0.01em]">{currentStage.title}</h2>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#F5F1EA] px-3 py-1.5 text-sm text-[#716A61]">7 条相关收藏</span>
                </div>

                <div className="rounded-[22px] bg-[#F8F4EE] p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <img src={LUMI_LOGO} alt="" className="h-9 w-9 rounded-xl object-cover" />
                    <div>
                      <p className="font-serif text-lg italic text-[#B9852F]">Lumi</p>
                      <p className="text-base font-semibold">{lumiMessage.text}</p>
                    </div>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-[#635B52]">
                    你最近连续收藏了 AI Agent、产品 demo、主动型记忆相关内容。其中几条在讲项目背景，几条在讲产品落地，还有一些在讲交互案例。
                  </p>
                </div>

                <div className="mt-5 grid gap-3 lg:grid-cols-3">
                  {intentSignals.map((signal) => {
                    const Icon = signal.icon;
                    return (
                      <article key={signal.label} className="rounded-[18px] border border-black/5 bg-[#FBFAF7] p-4">
                        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#B9852F]">
                          <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                          {signal.label}
                        </div>
                        <h3 className="mb-2 text-base font-semibold tracking-[-0.01em]">{signal.value}</h3>
                        <p className="text-sm leading-6 text-[#716A61]">{signal.detail}</p>
                      </article>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-[24px] bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#B9852F]">为什么这么说</p>
                    <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.01em]">相关收藏证据</h2>
                  </div>
                  <button type="button" className="rounded-full bg-[#F5F1EA] px-4 py-2 text-sm font-medium text-[#5E574E]">
                    查看全部
                  </button>
                </div>

                <div className="grid gap-3 lg:grid-cols-2">
                  {evidenceItems.slice(0, showEvidence ? 4 : 3).map((item) => {
                    const Icon = item.icon;
                    return (
                      <article
                        key={item.title}
                        className={`rounded-[18px] border p-4 transition ${
                          showEvidence ? "border-[#E0C895] bg-[#FFFDF8]" : "border-black/5 bg-[#FBFAF7]"
                        }`}
                      >
                        <div className="mb-3 flex items-center justify-between gap-3 text-sm">
                          <span className="flex items-center gap-2 font-medium text-[#8B6427]">
                            <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                            {item.source}
                          </span>
                          <span className="text-[#8D867E]">{item.time}</span>
                        </div>
                        <h3 className="mb-3 text-[15px] font-semibold leading-6">{item.title}</h3>
                        <span className="rounded-full bg-[#F1E4CB] px-3 py-1 text-xs font-medium text-[#8B6427]">{item.reason}</span>
                      </article>
                    );
                  })}
                </div>
              </section>
            </div>

            <aside className="space-y-5">
              <section className="sticky top-7 rounded-[24px] bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#B9852F]">下一步行动</p>
                    <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.01em]">
                      {showRouteCard ? "AI Agent 学习路线卡" : "等待你确认"}
                    </h2>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5F1EA] text-[#B9852F]">
                    <CircleDot size={20} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </div>

                {!showRouteCard && (
                  <div className="rounded-[20px] bg-[#F8F4EE] p-5">
                    <p className="mb-4 text-[15px] leading-7 text-[#635B52]">
                      Lumi 建议先把这批收藏整理成一张轻量路线卡，而不是做成长报告或知识库目录。
                    </p>
                    {stage === 2 && (
                      <div className="space-y-3">
                        {[0, 1, 2].map((item) => (
                          <div key={item} className="h-3 overflow-hidden rounded-full bg-white">
                            <div className="h-full animate-pulse rounded-full bg-[#D8C59F]" style={{ width: `${56 + item * 14}%` }} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {showRouteCard && (
                  <div className="space-y-3">
                    {routeSteps.map((step, index) => (
                      <div key={step} className="flex gap-3 rounded-[18px] bg-[#FBFAF7] p-4">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F1E4CB] text-sm font-semibold text-[#8B6427]">
                          {index + 1}
                        </span>
                        <p className="text-sm leading-6 text-[#554D45]">{step}</p>
                      </div>
                    ))}
                  </div>
                )}

                {showComplete && (
                  <div className="mt-4 rounded-[18px] border border-[#CFE2C6] bg-[#F4FAF0] p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#4E7E45]">
                      <Check size={17} strokeWidth={1.9} aria-hidden="true" />
                      已更新成长线索
                    </div>
                    <h3 className="font-semibold">{finalMemory.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#5F7457]">{finalMemory.detail}</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={advance}
                  className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#17130F] px-5 text-sm font-semibold text-white transition hover:bg-[#2B241D]"
                >
                  {currentStage.action}
                  {stage === demoStages.length - 1 ? <Sparkles size={17} strokeWidth={1.8} aria-hidden="true" /> : <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />}
                </button>
              </section>

              <section className="rounded-[24px] bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#B9852F]">成长线索</p>
                    <h2 className="mt-1 text-xl font-semibold">AI Agent 产品探索</h2>
                  </div>
                  <ChevronRight size={19} strokeWidth={1.8} className="text-[#8D867E]" aria-hidden="true" />
                </div>
                <div className="mb-3 h-2 overflow-hidden rounded-full bg-[#ECE6DA]">
                  <div className="h-full rounded-full bg-[#C3913B] transition-all duration-300" style={{ width: showComplete ? "18%" : "12%" }} />
                </div>
                <p className="text-sm leading-6 text-[#716A61]">
                  已识别 7 条收藏 · {showComplete ? "已完成 1 个行动" : "等待第 1 个行动"}
                </p>
              </section>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
