import {
  Archive,
  BookOpenText,
  Brain,
  CheckCircle2,
  Clock3,
  Compass,
  FileText,
  History,
  Home,
  Layers3,
  MessageCircle,
  PlayCircle,
  Sparkles,
} from "lucide-react";

export const demoNavItems = [
  { label: "今日发现", icon: Home, active: true },
  { label: "收藏来源", icon: Archive },
  { label: "成长线索", icon: Compass },
  { label: "回顾记录", icon: History },
];

export const sourceSummary = [
  { label: "微信收藏", count: 3 },
  { label: "浏览器书签", count: 2 },
  { label: "小红书灵感", count: 1 },
  { label: "视频稍后看", count: 1 },
];

export const evidenceItems = [
  {
    icon: FileText,
    source: "微信收藏",
    title: "AI Agent 产品化的 6 个关键判断",
    time: "昨晚 22:41",
    reason: "项目背景",
  },
  {
    icon: BookOpenText,
    source: "浏览器书签",
    title: "2026 Agentic UX Pattern Notes",
    time: "今天 09:18",
    reason: "交互案例",
  },
  {
    icon: Layers3,
    source: "小红书灵感",
    title: "从个人工具到主动陪伴型 Agent",
    time: "今天 10:06",
    reason: "产品方向",
  },
  {
    icon: PlayCircle,
    source: "视频稍后看",
    title: "Build an AI Agent from zero to MVP",
    time: "今天 11:32",
    reason: "动手路径",
  },
];

export const intentSignals = [
  {
    icon: Sparkles,
    label: "重复主题",
    value: "AI Agent",
    detail: "7 条收藏都指向同一个方向",
  },
  {
    icon: Brain,
    label: "阶段判断",
    value: "正在酝酿产品方向",
    detail: "从知识输入转向项目探索",
  },
  {
    icon: Clock3,
    label: "可行动机会",
    value: "先生成路线卡",
    detail: "用一张小卡把方向落到今天",
  },
];

export const routeSteps = [
  "先理解 Agent 和普通 Chatbot 的区别。",
  "找一个真实的小任务作为 MVP。",
  "从收藏里选 3 个案例拆解交互方式。",
  "今天只写下你的第一个使用场景。",
];

export const demoStages = [
  {
    label: "主动发现",
    title: "Lumi 已经读到一个方向",
    action: "为什么这么说",
  },
  {
    label: "查看证据",
    title: "收藏背后出现了同一个主题",
    action: "帮我生成路线卡",
  },
  {
    label: "生成中",
    title: "Lumi 正在把收藏变成下一步",
    action: "查看路线卡",
  },
  {
    label: "行动卡",
    title: "今天只需要完成一个小动作",
    action: "完成今天一步",
  },
  {
    label: "记忆更新",
    title: "这一步已经回到你的成长线索里",
    action: "重新体验",
  },
];

export const finalMemory = {
  icon: CheckCircle2,
  title: "AI Agent 产品探索",
  detail: "第 1 步已开始：写下一个真实使用场景。",
};

export const lumiMessage = {
  icon: MessageCircle,
  text: "这不像随机兴趣，更像一个方向正在形成。",
};

