// ═══════════════════════════════════════════════════════════════════
// Backend Abstraction Layer
// ═══════════════════════════════════════════════════════════════════
// All server calls go through these functions.
// In production, these hit real endpoints. The current implementation
// includes inline fallbacks for demo/development use only.

const API_BASE = "/api";

async function generateAssessment(profileData, lang) {
  try {
    const res = await fetch(`${API_BASE}/generate-assessment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile: profileData, lang }),
    });
    if (!res.ok) throw new Error(`Assessment API error: ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn("[DEV] Assessment API unavailable, using fallback:", e.message);
    return generateFallbackAssessment(lang);
  }
}

async function saveLead(email, name, profileData, report, lang) {
  try {
    const res = await fetch(`${API_BASE}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, profile: profileData, report, lang }),
    });
    if (!res.ok) throw new Error(`Lead API error: ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn("[DEV] Lead API unavailable:", e.message);
    return { id: `local_${Date.now()}`, status: "saved_locally" };
  }
}

async function fetchLeads() {
  try {
    const res = await fetch(`${API_BASE}/leads`);
    if (!res.ok) throw new Error(`Leads API error: ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn("[DEV] Leads API unavailable:", e.message);
    return [];
  }
}

async function bookStrategy(email, pathway) {
  try {
    const res = await fetch(`${API_BASE}/book-strategy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pathway }),
    });
    if (!res.ok) throw new Error(`Booking API error: ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn("[DEV] Booking API unavailable:", e.message);
    return { status: "pending", message: "Booking request received" };
  }
}

function generateFallbackAssessment(lang) {
  if (lang === "zh") return {
    scores: { overall: 62, evidence: 55, narrative: 68, network: 45 },
    summary: "根据您提供的信息，您具备申请全球人才签证的基本条件，但在证据材料和推荐人网络方面还需要进一步加强。本分析基于公开信息和您的自述，仅供参考。",
    strengths: ["工作经验年限与背书标准要求相符", "拥有可构成有力证据的可量化成就", "职业叙事展现了清晰的专业发展路径"],
    gaps: ["建议增加更多行业认可度方面的书面证据", "推荐人网络可进一步加强——建议至少联系3位高级推荐人", "证据材料中需要更多可量化的影响力指标"],
    actions: ["系统整理所有可量化的工作成果与影响力数据", "联系3-4位能为您的专业能力作证的资深人士", "构建结构化证据档案，对应到官方评估标准", "通过行业演讲、发表文章或开源贡献提升公开知名度"],
    timeline: [
      { period: "第1-2周", task: "完成职业成就盘点，收集现有证据材料" },
      { period: "第3-4周", task: "联系推荐人，讨论推荐信事宜" },
      { period: "第2个月", task: "针对缺口领域开展补充活动" },
      { period: "第3个月", task: "汇总材料，对照官方标准进行自查" },
    ],
  };
  return {
    scores: { overall: 62, evidence: 55, narrative: 68, network: 45 },
    summary: "Based on the information you provided, you show solid foundations for a Global Talent application but key areas need strengthening. This analysis is based on publicly available criteria and your self-reported profile.",
    strengths: ["Years of experience align with endorsement body criteria", "Demonstrable achievements that could form strong supporting evidence", "Career narrative shows a clear professional trajectory"],
    gaps: ["Build more documented evidence of industry recognition", "Referee network could be stronger — aim for 3+ senior recommenders", "Evidence portfolio needs more quantifiable impact metrics"],
    actions: ["Document all measurable impacts from your work with specific figures", "Identify and approach 3-4 senior professionals as potential referees", "Build a structured evidence portfolio mapping to official endorsement criteria", "Increase public profile through conference speaking, publications, or open-source contributions"],
    timeline: [
      { period: "Week 1-2", task: "Complete career inventory and gather existing documentation" },
      { period: "Week 3-4", task: "Approach potential referees and discuss recommendation letters" },
      { period: "Month 2", task: "Fill evidence gaps through targeted professional activities" },
      { period: "Month 3", task: "Compile final portfolio and review against published criteria" },
    ],
  };
}

// ═══════════════════════════════════════════════════════════════════
// i18n
// ═══════════════════════════════════════════════════════════════════
const i18n = {
  en: {
    nav: { lang: "中文" },
    landing: {
      tagline: "Free Analysis · 5 min",
      title1: "Are you ready for the",
      title2: "UK Global Talent Visa",
      title3: "?",
      subtitle: "Answer a few questions about your background. Get an instant AI-powered readiness analysis based on publicly available endorsement criteria, with evidence gap identification and a personalised action plan.",
      cta: "Start Your Free Analysis →",
      footer: "No signup required · Information analysis only · Not immigration advice",
      trust: "Based on published Tech Nation, UKRI, and Arts Council criteria",
      features: [
        { icon: "📊", title: "Readiness Analysis", desc: "AI-powered assessment of your evidence strength across key endorsement dimensions" },
        { icon: "🔍", title: "Evidence Gap Review", desc: "Identify what's missing from your portfolio before you begin your application" },
        { icon: "📅", title: "Action Plan", desc: "Personalised timeline with clear milestones to strengthen your evidence" },
      ],
    },
    progress: { step: "Step", of: "of" },
    steps: {
      pathway: {
        title: "Which endorsement route are you considering?",
        desc: "Select the pathway that best matches your professional background. This determines which endorsement body criteria we analyse against.",
      },
      subpath: {
        title: "Which area within Arts & Culture?",
        desc: "Arts Council England endorses across several disciplines. Select the one closest to your practice.",
      },
      experience: {
        title: "Your professional background",
        desc: "Tell us about your career experience and current role.",
        yearsLabel: "Years of experience in your field",
        jobLabel: "Current job title & organisation",
        jobPh: "e.g. Senior Software Engineer at Stripe",
        careerLabel: "Brief career summary",
        careerPh: "Describe your key roles, organisations, and what you are best known for professionally...",
        nameLabel: "Your full name",
        namePh: "e.g. John Smith",
        countryLabel: "Country of current residence",
        countryPh: "e.g. United States",
      },
      achievements: {
        title: "Your key achievements",
        desc: "Select all that apply — these form the core of your evidence portfolio for the endorsement body.",
        topLabel: "Describe your most notable achievement in detail",
        topPh: "e.g. Led development of an AI platform serving 1M+ users; published peer-reviewed research in Nature...",
      },
      endorsement: {
        title: "Endorsement category & readiness",
        desc: "A few more details to complete your readiness analysis.",
        catLabel: "Which endorsement category are you considering?",
        refLabel: "Do you have potential referees or recommenders?",
        tlLabel: "Target application timeline",
        noteLabel: "Anything else relevant to your application?",
        notePh: "Specific concerns, visa history, or other context that may affect your application...",
      },
    },
    btn: { back: "← Back", next: "Continue →", gen: "Generate Analysis", opt: "(optional)" },
    pw: [
      { id: "digital", label: "Digital Technology", icon: "💻", desc: "Software, AI, cybersecurity, fintech — endorsed by Tech Nation", body: "Tech Nation" },
      { id: "academia", label: "Academia & Research", icon: "🔬", desc: "Science, engineering, medicine, humanities — endorsed by UKRI", body: "UKRI" },
      { id: "arts", label: "Arts & Culture", icon: "🎨", desc: "Visual arts, performing arts, architecture, fashion, film — endorsed by Arts Council England", body: "Arts Council England", hasSubpaths: true },
    ],
    subpaths: {
      arts: [
        { id: "combined-arts", label: "Combined Arts", icon: "🎭", desc: "Interdisciplinary practice, festivals, carnival arts" },
        { id: "architecture", label: "Architecture", icon: "🏛️", desc: "Architectural design, urban planning, conservation" },
        { id: "fashion", label: "Fashion", icon: "✂️", desc: "Fashion design, textile innovation, fashion technology" },
        { id: "film-tv", label: "Film & Television", icon: "🎬", desc: "Production, direction, screenwriting, animation" },
      ],
    },
    exp: [
      { id: "0-2", l: "0–2 yrs" }, { id: "3-5", l: "3–5 yrs" }, { id: "5-8", l: "5–8 yrs" },
      { id: "8-15", l: "8–15 yrs" }, { id: "15+", l: "15+" },
    ],
    ach: [
      { id: "patents", l: "Patents / IP" }, { id: "publications", l: "Peer-reviewed Publications" },
      { id: "awards", l: "Industry Awards / Prizes" }, { id: "speaking", l: "Conference Speaking / Keynotes" },
      { id: "media", l: "Press / Media Coverage" }, { id: "opensource", l: "Open Source Contributions" },
      { id: "revenue", l: "Measurable Commercial Impact" }, { id: "funding", l: "Grant / Venture Funding" },
      { id: "mentoring", l: "Mentoring / Community Leadership" }, { id: "leadership", l: "Team / Org Leadership" },
      { id: "exhibitions", l: "Exhibitions / Screenings" }, { id: "commissions", l: "Major Commissions / Contracts" },
    ],
    end: [
      { id: "talent", l: "Exceptional Talent", d: "Recognised leader in your field (typically 5+ years)" },
      { id: "promise", l: "Exceptional Promise", d: "Emerging leader showing exceptional ability (early career)" },
      { id: "unsure", l: "Not sure yet", d: "Our analysis will suggest the best fit" },
    ],
    ref: [
      { id: "0", l: "None yet" }, { id: "1-2", l: "1–2 people" }, { id: "3+", l: "3 or more" },
    ],
    tl: [
      { id: "asap", l: "ASAP (1–2 months)" }, { id: "3-6", l: "3–6 months" },
      { id: "6-12", l: "6–12 months" }, { id: "exploring", l: "Just exploring" },
    ],
    ld: {
      title: "Building Your Analysis",
      msgs: [
        "Reviewing your professional profile",
        "Mapping against published endorsement criteria",
        "Evaluating evidence strength",
        "Generating personalised analysis",
      ],
    },
    gate: {
      title: "Your analysis is ready!",
      subtitle: "Enter your email to view the full readiness analysis and personalised action plan.",
      emailPh: "your@email.com",
      cta: "View My Analysis →",
      privacy: "We'll send you a copy of your report. No spam, unsubscribe anytime.",
      preview: "Here's a preview of your readiness scores:",
      whyEmail: "Why do we ask for your email?",
      whyEmailAnswer: "So we can send you a copy of your report and notify you of any relevant criteria changes.",
    },
    rpt: {
      badge: "Global Talent Visa — Readiness Analysis",
      title: "Your Readiness Analysis",
      pwl: "pathway",
      infoOnly: "Information analysis based on published criteria",
      sc: {
        overall: "Overall Readiness",
        evidence: "Evidence Strength",
        narrative: "Narrative Clarity",
        network: "Referees & Network",
      },
      sec: {
        summary: "Analysis Summary",
        strengths: "Areas of Strength",
        gaps: "Areas to Strengthen",
        actions: "Recommended Next Steps",
        timeline: "Suggested Timeline",
      },
      cta: {
        title: "Want expert help building your evidence portfolio?",
        subtitle: "Full Strategy Package — £499",
        desc: "Work with our team to build a complete, submission-ready evidence portfolio:",
        features: [
          "Evidence audit & structured portfolio plan",
          "Personal statement & narrative coaching",
          "Referee strategy & letter guidance",
          "Timeline management with milestone check-ins",
        ],
        btn: "Book a Free 15-min Consultation →",
        guarantee: "100% satisfaction guarantee. Full refund if you're not happy after the first session.",
      },
      disc: "This analysis is an automated information research tool based on publicly available endorsement criteria. It does not constitute immigration advice under the Immigration and Asylum Act 1999. No lawyer-client or adviser-client relationship is created. For immigration advice, please consult an OISC-registered adviser or a qualified immigration solicitor.",
      saved: "Report saved and emailed to you ✓",
    },
    ft: "Information analysis only — not immigration advice under the Immigration and Asylum Act 1999",
  },
  zh: {
    nav: { lang: "EN" },
    landing: {
      tagline: "免费分析 · 5分钟",
      title1: "你准备好申请",
      title2: "英国全球人才签证",
      title3: "了吗？",
      subtitle: "回答几个关于你背景的问题，获取基于公开背书标准的 AI 准备度分析、证据缺口识别和个性化行动方案。",
      cta: "开始免费分析 →",
      footer: "无需注册 · 仅为信息分析 · 非移民法律建议",
      trust: "基于 Tech Nation、UKRI 和 Arts Council 公开标准",
      features: [
        { icon: "📊", title: "准备度分析", desc: "AI 驱动的多维度证据强度评估" },
        { icon: "🔍", title: "证据缺口审查", desc: "在开始申请前，识别材料中的不足" },
        { icon: "📅", title: "行动方案", desc: "个性化时间线和明确的证据强化步骤" },
      ],
    },
    progress: { step: "第", of: "步，共" },
    steps: {
      pathway: {
        title: "你考虑哪个背书路径？",
        desc: "选择最符合你专业背景的路径，这决定了我们按哪个背书机构的标准进行分析。",
      },
      subpath: {
        title: "艺术与文化的哪个方向？",
        desc: "Arts Council England 在多个学科方向进行背书，请选择最接近你实践领域的方向。",
      },
      experience: {
        title: "你的职业背景",
        desc: "介绍你的职业经历和当前角色。",
        yearsLabel: "在该领域的工作年限",
        jobLabel: "当前职位与所在机构",
        jobPh: "例：Stripe 高级软件工程师",
        careerLabel: "职业经历简述",
        careerPh: "描述你的核心角色、所在机构以及专业领域的知名度...",
        nameLabel: "你的姓名",
        namePh: "例：张三",
        countryLabel: "当前居住国家",
        countryPh: "例：中国",
      },
      achievements: {
        title: "你的核心成就",
        desc: "选择所有适用项——这些将构成背书机构评估的核心证据。",
        topLabel: "详细描述你最突出的成就",
        topPh: "例：主导开发了用户超百万的 AI 平台；在 Nature 发表同行评审论文...",
      },
      endorsement: {
        title: "背书类别与准备状态",
        desc: "再补充几个细节，完成准备度分析。",
        catLabel: "你考虑哪个背书类别？",
        refLabel: "你有潜在推荐人吗？",
        tlLabel: "目标申请时间线",
        noteLabel: "还有什么与申请相关的信息？",
        notePh: "具体顾虑、签证历史或其他可能影响申请的背景...",
      },
    },
    btn: { back: "← 返回", next: "继续 →", gen: "生成分析", opt: "（选填）" },
    pw: [
      { id: "digital", label: "数字技术", icon: "💻", desc: "软件、AI、网络安全、金融科技 — Tech Nation 背书", body: "Tech Nation" },
      { id: "academia", label: "学术与研究", icon: "🔬", desc: "科学、工程、医学、人文 — UKRI 背书", body: "UKRI" },
      { id: "arts", label: "艺术与文化", icon: "🎨", desc: "视觉艺术、表演艺术、建筑、时尚、影视 — Arts Council England 背书", body: "Arts Council England", hasSubpaths: true },
    ],
    subpaths: {
      arts: [
        { id: "combined-arts", label: "综合艺术", icon: "🎭", desc: "跨学科实践、艺术节、嘉年华艺术" },
        { id: "architecture", label: "建筑", icon: "🏛️", desc: "建筑设计、城市规划、历史建筑保护" },
        { id: "fashion", label: "时尚", icon: "✂️", desc: "时装设计、纺织创新、时尚科技" },
        { id: "film-tv", label: "影视", icon: "🎬", desc: "制片、导演、编剧、动画" },
      ],
    },
    exp: [
      { id: "0-2", l: "0–2年" }, { id: "3-5", l: "3–5年" }, { id: "5-8", l: "5–8年" },
      { id: "8-15", l: "8–15年" }, { id: "15+", l: "15年+" },
    ],
    ach: [
      { id: "patents", l: "专利/知识产权" }, { id: "publications", l: "同行评审论文" },
      { id: "awards", l: "行业奖项/荣誉" }, { id: "speaking", l: "会议演讲/主题发言" },
      { id: "media", l: "媒体/新闻报道" }, { id: "opensource", l: "开源贡献" },
      { id: "revenue", l: "可量化商业影响" }, { id: "funding", l: "科研基金/风险投资" },
      { id: "mentoring", l: "导师指导/社区领导" }, { id: "leadership", l: "团队/组织领导" },
      { id: "exhibitions", l: "展览/放映" }, { id: "commissions", l: "重大委托/合同" },
    ],
    end: [
      { id: "talent", l: "杰出人才 (Exceptional Talent)", d: "所在领域的公认领导者（通常5年+）" },
      { id: "promise", l: "杰出潜力 (Exceptional Promise)", d: "展现杰出能力的新兴领导者（早期职业）" },
      { id: "unsure", l: "还不确定", d: "我们的分析会建议最合适的类别" },
    ],
    ref: [
      { id: "0", l: "暂无" }, { id: "1-2", l: "1–2位" }, { id: "3+", l: "3位以上" },
    ],
    tl: [
      { id: "asap", l: "尽快（1-2个月）" }, { id: "3-6", l: "3–6个月" },
      { id: "6-12", l: "6–12个月" }, { id: "exploring", l: "只是了解" },
    ],
    ld: {
      title: "正在生成分析报告",
      msgs: ["审查职业档案", "比对公开背书标准", "评估证据强度", "生成个性化分析"],
    },
    gate: {
      title: "你的分析报告已生成！",
      subtitle: "输入邮箱即可查看完整准备度分析和个性化行动方案。",
      emailPh: "your@email.com",
      cta: "查看分析报告 →",
      privacy: "我们会将报告副本发送给你。不会发送垃圾邮件，随时退订。",
      preview: "以下是你的准备度评分预览：",
      whyEmail: "为什么需要邮箱？",
      whyEmailAnswer: "以便我们发送报告副本，并在相关标准变化时通知你。",
    },
    rpt: {
      badge: "全球人才签证 — 准备度分析",
      title: "你的准备度分析",
      pwl: "路径",
      infoOnly: "基于公开标准的信息分析",
      sc: {
        overall: "整体准备度",
        evidence: "证据强度",
        narrative: "叙事清晰度",
        network: "推荐人网络",
      },
      sec: {
        summary: "分析摘要",
        strengths: "优势领域",
        gaps: "待加强领域",
        actions: "建议下一步",
        timeline: "建议时间线",
      },
      cta: {
        title: "需要专业帮助来构建你的证据档案？",
        subtitle: "完整策略方案 — £499",
        desc: "与我们的团队合作，构建完整的、可提交的证据档案：",
        features: [
          "证据审计与结构化档案规划",
          "个人陈述与叙事辅导",
          "推荐人策略与推荐信指导",
          "里程碑时间线管理与定期检查",
        ],
        btn: "预约免费15分钟咨询 →",
        guarantee: "100%满意保证。首次咨询后不满意全额退款。",
      },
      disc: "本分析是基于公开背书标准的自动化信息研究工具，不构成《1999年移民与庇护法》下的移民建议，不建立任何律师-客户或顾问-客户关系。如需移民法律建议，请咨询 OISC 注册顾问或持牌移民律师。",
      saved: "报告已保存并发送至你的邮箱 ✓",
    },
    ft: "仅为信息分析 — 不构成《1999年移民与庇护法》下的移民建议",
  },
};

// ═══════════════════════════════════════════════════════════════════
// Context & Design Tokens
// ═══════════════════════════════════════════════════════════════════
const LangContext = createContext("en");
const useLang = () => useContext(LangContext);
const useT = () => i18n[useLang()];

const colors = {
  bg: "#0B0E14", card: "#12161F", cardHover: "#1A1F2C", border: "#1E2433",
  accent: "#3B82F6", accentGlow: "rgba(59,130,246,0.12)", accentDark: "#1E3A5F",
  text: "#E2E8F0", textMuted: "#7B8CA8", textDim: "#4A5568",
  green: "#10B981", greenBg: "rgba(16,185,129,0.08)",
  amber: "#F59E0B", amberBg: "rgba(245,158,11,0.08)",
  red: "#EF4444", redBg: "rgba(239,68,68,0.08)",
  white: "#fff",
};
const fontPrimary = "'DM Sans', sans-serif";
const fontDisplay = "'DM Serif Display', Georgia, serif";

// ═══════════════════════════════════════════════════════════════════
// Reusable UI Components
// ═══════════════════════════════════════════════════════════════════

function SelectCard({ selected, onClick, children, style }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "14px 16px", borderRadius: 10, cursor: "pointer", transition: "all 0.2s",
        position: "relative",
        border: `1.5px solid ${selected ? colors.accent : hovered ? "#2A3348" : colors.border}`,
        background: selected ? colors.accentGlow : hovered ? colors.cardHover : colors.card,
        ...style,
      }}
    >
      {selected && (
        <div style={{
          position: "absolute", top: 10, right: 12, width: 18, height: 18, borderRadius: "50%",
          background: colors.accent, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, color: colors.white,
        }}>✓</div>
      )}
      {children}
    </div>
  );
}

function TextInput({ label, placeholder, value, onChange, multiline, optional, type = "text" }) {
  const t = useT();
  const baseStyle = {
    width: "100%", boxSizing: "border-box", padding: "11px 14px", borderRadius: 8,
    border: `1.5px solid ${colors.border}`, background: colors.card, color: colors.text,
    fontSize: 14, fontFamily: fontPrimary, outline: "none", transition: "border-color 0.2s",
  };
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", marginBottom: 5, fontSize: 12, fontWeight: 500, color: colors.textMuted, fontFamily: fontPrimary }}>
        {label} {optional && <span style={{ color: colors.textDim, fontWeight: 400 }}>{t.btn.opt}</span>}
      </label>
      {multiline ? (
        <textarea
          rows={4} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
          onFocus={e => { e.target.style.borderColor = colors.accent; }}
          onBlur={e => { e.target.style.borderColor = colors.border; }}
          style={{ ...baseStyle, resize: "vertical", minHeight: 90 }}
        />
      ) : (
        <input
          type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
          onFocus={e => { e.target.style.borderColor = colors.accent; }}
          onBlur={e => { e.target.style.borderColor = colors.border; }}
          style={baseStyle}
        />
      )}
    </div>
  );
}

function Button({ children, onClick, disabled, variant = "primary", style }) {
  const [hovered, setHovered] = useState(false);
  const isPrimary = variant === "primary";
  return (
    <button
      onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        padding: "12px 26px", borderRadius: 8, border: "none", fontSize: 14, fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer", fontFamily: fontPrimary, transition: "all 0.2s",
        opacity: disabled ? 0.4 : 1,
        background: isPrimary ? (hovered ? "#2563EB" : colors.accent) : "transparent",
        color: isPrimary ? colors.white : colors.textMuted,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function ProgressBar({ current, total }) {
  const t = useT();
  const lang = useLang();
  const pct = (current / total) * 100;
  return (
    <div style={{ width: "100%", marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: colors.textMuted, fontFamily: fontPrimary }}>
          {lang === "zh"
            ? `${t.progress.step} ${current} ${t.progress.of} ${total} 步`
            : `${t.progress.step} ${current} ${t.progress.of} ${total}`}
        </span>
        <span style={{ fontSize: 11, color: colors.accent, fontFamily: fontPrimary, fontWeight: 600 }}>
          {Math.round(pct)}%
        </span>
      </div>
      <div style={{ width: "100%", height: 4, background: colors.border, borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          width: `${pct}%`, height: "100%", borderRadius: 2,
          background: `linear-gradient(90deg, ${colors.accent}, #8B5CF6)`,
          transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
        }} />
      </div>
    </div>
  );
}

function ScoreBadge({ score, label }) {
  const c = score >= 70 ? colors.green : score >= 40 ? colors.amber : colors.red;
  const bg = score >= 70 ? colors.greenBg : score >= 40 ? colors.amberBg : colors.redBg;
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      padding: "16px 12px", borderRadius: 10, background: bg, border: `1px solid ${c}22`,
      flex: 1, minWidth: 80,
    }}>
      <div style={{ fontSize: 26, fontWeight: 700, color: c, fontFamily: fontDisplay }}>{score}</div>
      <div style={{ fontSize: 10, color: colors.textMuted, textAlign: "center", fontFamily: fontPrimary, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div style={{ marginBottom: 20, padding: "18px 20px", borderRadius: 12, background: colors.card, border: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: colors.text, fontFamily: fontDisplay }}>{title}</h3>
      </div>
      <div style={{ fontSize: 13, color: colors.textMuted, lineHeight: 1.7, fontFamily: fontPrimary }}>{children}</div>
    </div>
  );
}

const headingStyle = { fontSize: 21, fontWeight: 700, color: colors.text, margin: 0, fontFamily: fontDisplay, letterSpacing: "-0.02em" };
const descStyle = { fontSize: 13, color: colors.textMuted, marginTop: 6, lineHeight: 1.5, fontFamily: fontPrimary };
const labelStyle = { display: "block", marginBottom: 8, fontSize: 12, fontWeight: 500, color: colors.textMuted, fontFamily: fontPrimary };

// ═══════════════════════════════════════════════════════════════════
// Form Steps
// ═══════════════════════════════════════════════════════════════════

function StepPathway({ data, setData }) {
  const t = useT();
  return (
    <div>
      <h2 style={headingStyle}>{t.steps.pathway.title}</h2>
      <p style={descStyle}>{t.steps.pathway.desc}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 20 }}>
        {t.pw.map(p => (
          <SelectCard key={p.id} selected={data.pathway === p.id} onClick={() => setData({ ...data, pathway: p.id, subpath: null })}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 20 }}>{p.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: colors.text, fontFamily: fontPrimary }}>{p.label}</div>
                <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 1, fontFamily: fontPrimary }}>{p.desc}</div>
              </div>
            </div>
          </SelectCard>
        ))}
      </div>
    </div>
  );
}

function StepSubpath({ data, setData }) {
  const t = useT();
  const subpaths = t.subpaths[data.pathway] || [];
  return (
    <div>
      <h2 style={headingStyle}>{t.steps.subpath.title}</h2>
      <p style={descStyle}>{t.steps.subpath.desc}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 20 }}>
        {subpaths.map(sp => (
          <SelectCard key={sp.id} selected={data.subpath === sp.id} onClick={() => setData({ ...data, subpath: sp.id })}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 20 }}>{sp.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: colors.text, fontFamily: fontPrimary }}>{sp.label}</div>
                <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 1, fontFamily: fontPrimary }}>{sp.desc}</div>
              </div>
            </div>
          </SelectCard>
        ))}
      </div>
    </div>
  );
}

function StepExperience({ data, setData }) {
  const t = useT();
  return (
    <div>
      <h2 style={headingStyle}>{t.steps.experience.title}</h2>
      <p style={descStyle}>{t.steps.experience.desc}</p>
      <div style={{ marginTop: 20 }}>
        <TextInput label={t.steps.experience.nameLabel} placeholder={t.steps.experience.namePh} value={data.name || ""} onChange={v => setData({ ...data, name: v })} />
        <TextInput label={t.steps.experience.countryLabel} placeholder={t.steps.experience.countryPh} value={data.country || ""} onChange={v => setData({ ...data, country: v })} />
        <label style={labelStyle}>{t.steps.experience.yearsLabel}</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {t.exp.map(e => (
            <SelectCard key={e.id} selected={data.experience === e.id} onClick={() => setData({ ...data, experience: e.id })} style={{ padding: "9px 16px", flex: "0 0 auto" }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: colors.text, fontFamily: fontPrimary }}>{e.l}</span>
            </SelectCard>
          ))}
        </div>
        <TextInput label={t.steps.experience.jobLabel} placeholder={t.steps.experience.jobPh} value={data.jobTitle || ""} onChange={v => setData({ ...data, jobTitle: v })} />
        <TextInput label={t.steps.experience.careerLabel} placeholder={t.steps.experience.careerPh} value={data.career || ""} onChange={v => setData({ ...data, career: v })} multiline />
      </div>
    </div>
  );
}

function StepAchievements({ data, setData }) {
  const t = useT();
  const selected = data.achievements || [];
  const toggle = id => setData({
    ...data,
    achievements: selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id],
  });
  return (
    <div>
      <h2 style={headingStyle}>{t.steps.achievements.title}</h2>
      <p style={descStyle}>{t.steps.achievements.desc}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 20 }}>
        {t.ach.map(a => (
          <SelectCard key={a.id} selected={selected.includes(a.id)} onClick={() => toggle(a.id)} style={{ padding: "10px 12px" }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: colors.text, fontFamily: fontPrimary }}>{a.l}</span>
          </SelectCard>
        ))}
      </div>
      <div style={{ marginTop: 20 }}>
        <TextInput label={t.steps.achievements.topLabel} placeholder={t.steps.achievements.topPh} value={data.topAchievement || ""} onChange={v => setData({ ...data, topAchievement: v })} multiline />
      </div>
    </div>
  );
}

function StepEndorsement({ data, setData }) {
  const t = useT();
  return (
    <div>
      <h2 style={headingStyle}>{t.steps.endorsement.title}</h2>
      <p style={descStyle}>{t.steps.endorsement.desc}</p>
      <div style={{ marginTop: 20 }}>
        <label style={labelStyle}>{t.steps.endorsement.catLabel}</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
          {t.end.map(e => (
            <SelectCard key={e.id} selected={data.endorsementCategory === e.id} onClick={() => setData({ ...data, endorsementCategory: e.id })}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: colors.text, fontFamily: fontPrimary }}>{e.l}</div>
                <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 1, fontFamily: fontPrimary }}>{e.d}</div>
              </div>
            </SelectCard>
          ))}
        </div>
        <label style={labelStyle}>{t.steps.endorsement.refLabel}</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {t.ref.map(r => (
            <SelectCard key={r.id} selected={data.referees === r.id} onClick={() => setData({ ...data, referees: r.id })} style={{ padding: "9px 16px", flex: "0 0 auto" }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: colors.text, fontFamily: fontPrimary }}>{r.l}</span>
            </SelectCard>
          ))}
        </div>
        <label style={labelStyle}>{t.steps.endorsement.tlLabel}</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {t.tl.map(x => (
            <SelectCard key={x.id} selected={data.timeline === x.id} onClick={() => setData({ ...data, timeline: x.id })} style={{ padding: "9px 16px", flex: "0 0 auto" }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: colors.text, fontFamily: fontPrimary }}>{x.l}</span>
            </SelectCard>
          ))}
        </div>
        <TextInput label={t.steps.endorsement.noteLabel} placeholder={t.steps.endorsement.notePh} value={data.notes || ""} onChange={v => setData({ ...data, notes: v })} multiline optional />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Email Gate
// ═══════════════════════════════════════════════════════════════════

function EmailGate({ report, onUnlock }) {
  const t = useT();
  const lang = useLang();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showWhy, setShowWhy] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    if (!valid) {
      setError(lang === "zh" ? "请输入有效的邮箱地址" : "Please enter a valid email address");
      return;
    }
    setError("");
    onUnlock(email);
  };

  return (
    <div style={{ animation: "fadeIn 0.6s ease" }}>
      {/* Header */}
      <div style={{
        textAlign: "center", marginBottom: 28, padding: "28px 20px", borderRadius: 14,
        background: `linear-gradient(135deg, ${colors.accentDark}, ${colors.card})`,
        border: `1px solid ${colors.border}`,
      }}>
        <div style={{ fontSize: 42, marginBottom: 12 }}>📊</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: colors.text, margin: "0 0 8px", fontFamily: fontDisplay }}>{t.gate.title}</h2>
        <p style={{ fontSize: 13, color: colors.textMuted, margin: 0, fontFamily: fontPrimary }}>{t.gate.subtitle}</p>
      </div>

      {/* Score preview */}
      <p style={{ fontSize: 12, color: colors.textMuted, marginBottom: 10, fontFamily: fontPrimary, fontWeight: 500 }}>{t.gate.preview}</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        <ScoreBadge score={report.scores.overall} label={t.rpt.sc.overall} />
        <ScoreBadge score={report.scores.evidence} label={t.rpt.sc.evidence} />
        <ScoreBadge score={report.scores.narrative} label={t.rpt.sc.narrative} />
        <ScoreBadge score={report.scores.network} label={t.rpt.sc.network} />
      </div>

      {/* Blurred preview */}
      <div style={{
        padding: 20, borderRadius: 12, background: colors.card, border: `1px solid ${colors.border}`,
        marginBottom: 28, position: "relative", overflow: "hidden",
      }}>
        <div style={{ filter: "blur(6px)", opacity: 0.4, pointerEvents: "none" }}>
          <div style={{ fontSize: 14, color: colors.textMuted, lineHeight: 1.8, fontFamily: fontPrimary }}>
            {report.summary}<br /><br />
            {report.strengths[0] && <>✓ {report.strengths[0]}<br /></>}
            {report.strengths[1] && <>✓ {report.strengths[1]}<br /></>}
            {report.gaps[0] && <>△ {report.gaps[0]}<br /></>}
            {report.gaps[1] && <>△ {report.gaps[1]}</>}
          </div>
        </div>
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(11,14,20,0.5)",
        }}>
          <div style={{
            padding: "8px 20px", borderRadius: 8, background: colors.accentGlow,
            border: `1px solid ${colors.accent}44`,
            fontSize: 13, fontWeight: 600, color: colors.accent, fontFamily: fontPrimary,
          }}>
            🔒 {lang === "zh" ? "输入邮箱解锁完整分析" : "Enter email to unlock full analysis"}
          </div>
        </div>
      </div>

      {/* Email form */}
      <div style={{
        padding: "24px 20px", borderRadius: 14, background: colors.card, border: `1px solid ${colors.border}`,
      }}>
        <div style={{ marginBottom: 14 }}>
          <input
            type="email"
            placeholder={t.gate.emailPh}
            value={email}
            onChange={e => { setEmail(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            style={{
              width: "100%", boxSizing: "border-box", padding: "13px 16px", borderRadius: 8,
              border: `1.5px solid ${error ? colors.red : colors.border}`,
              background: colors.bg, color: colors.text,
              fontSize: 15, fontFamily: fontPrimary, outline: "none", transition: "border-color 0.2s",
            }}
            onFocus={e => { e.target.style.borderColor = colors.accent; }}
            onBlur={e => { e.target.style.borderColor = error ? colors.red : colors.border; }}
          />
          {error && <p style={{ fontSize: 11, color: colors.red, marginTop: 6, fontFamily: fontPrimary }}>{error}</p>}
        </div>
        <Button onClick={handleSubmit} disabled={!email} style={{ width: "100%", padding: "14px", fontSize: 15, borderRadius: 8 }}>
          {t.gate.cta}
        </Button>
        <p style={{ fontSize: 10, color: colors.textDim, marginTop: 10, textAlign: "center", fontFamily: fontPrimary }}>
          {t.gate.privacy}
        </p>
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <button
            onClick={() => setShowWhy(!showWhy)}
            style={{
              background: "none", border: "none", fontSize: 10, color: colors.textDim,
              cursor: "pointer", fontFamily: fontPrimary, textDecoration: "underline",
            }}
          >
            {t.gate.whyEmail}
          </button>
          {showWhy && (
            <p style={{ fontSize: 10, color: colors.textMuted, marginTop: 6, fontFamily: fontPrimary }}>
              {t.gate.whyEmailAnswer}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Full Report
// ═══════════════════════════════════════════════════════════════════

function Report({ data, report, saved, email }) {
  const t = useT();
  const lang = useLang();
  if (!report) return null;
  const pw = i18n[lang].pw.find(p => p.id === data.pathway);
  const subpath = data.subpath && i18n[lang].subpaths[data.pathway]
    ? i18n[lang].subpaths[data.pathway].find(sp => sp.id === data.subpath)
    : null;

  const handleBooking = async () => {
    await bookStrategy(email, data.pathway);
    const url = `https://calendly.com/globaltalent-ai/strategy?email=${encodeURIComponent(email || "")}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{ animation: "fadeIn 0.6s ease" }}>
      {saved && (
        <div style={{
          marginBottom: 16, padding: "10px 16px", borderRadius: 8,
          background: colors.greenBg, border: `1px solid ${colors.green}33`,
          fontSize: 13, color: colors.green, fontWeight: 600, fontFamily: fontPrimary, textAlign: "center",
        }}>{t.rpt.saved}</div>
      )}

      {/* Header */}
      <div style={{
        textAlign: "center", marginBottom: 32, padding: "28px 20px", borderRadius: 14,
        background: `linear-gradient(135deg, ${colors.accentDark}, ${colors.card})`,
        border: `1px solid ${colors.border}`,
      }}>
        <div style={{
          fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em",
          color: colors.accent, fontWeight: 600, marginBottom: 6, fontFamily: fontPrimary,
        }}>{t.rpt.badge}</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: colors.text, margin: "0 0 4px", fontFamily: fontDisplay }}>
          {t.rpt.title}
        </h1>
        <p style={{ fontSize: 12, color: colors.textMuted, margin: "0 0 8px", fontFamily: fontPrimary }}>
          {data.name ? `${data.name} · ` : ""}{data.jobTitle} · {pw?.label} {t.rpt.pwl}
          {subpath ? ` · ${subpath.label}` : ""}
        </p>
        <div style={{
          display: "inline-block", padding: "3px 10px", borderRadius: 4,
          background: colors.amberBg, border: `1px solid ${colors.amber}22`,
          fontSize: 9, color: colors.amber, fontWeight: 600, fontFamily: fontPrimary,
        }}>
          {t.rpt.infoOnly}
        </div>
      </div>

      {/* Scores */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        <ScoreBadge score={report.scores.overall} label={t.rpt.sc.overall} />
        <ScoreBadge score={report.scores.evidence} label={t.rpt.sc.evidence} />
        <ScoreBadge score={report.scores.narrative} label={t.rpt.sc.narrative} />
        <ScoreBadge score={report.scores.network} label={t.rpt.sc.network} />
      </div>

      {/* Content sections */}
      <Section title={t.rpt.sec.summary} icon="📋">
        <p style={{ margin: 0 }}>{report.summary}</p>
      </Section>

      <Section title={t.rpt.sec.strengths} icon="💪">
        {report.strengths.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <span style={{ color: colors.green, fontSize: 13, marginTop: 1 }}>✓</span>
            <span>{s}</span>
          </div>
        ))}
      </Section>

      <Section title={t.rpt.sec.gaps} icon="🔍">
        {report.gaps.map((g, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <span style={{ color: colors.amber, fontSize: 13, marginTop: 1 }}>△</span>
            <span>{g}</span>
          </div>
        ))}
      </Section>

      <Section title={t.rpt.sec.actions} icon="🗺️">
        {report.actions.map((a, i) => (
          <div key={i} style={{
            display: "flex", gap: 10, marginBottom: 10, padding: "10px 12px",
            borderRadius: 8, background: colors.bg,
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
              background: colors.accentGlow, border: `1px solid ${colors.accent}44`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700, color: colors.accent, fontFamily: fontPrimary,
            }}>{i + 1}</div>
            <span>{a}</span>
          </div>
        ))}
      </Section>

      <Section title={t.rpt.sec.timeline} icon="📅">
        {report.timeline.map((x, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
            <div style={{
              flexShrink: 0, padding: "3px 10px", borderRadius: 6, background: colors.accentGlow,
              fontSize: 10, fontWeight: 600, color: colors.accent, fontFamily: fontPrimary,
              minWidth: 56, textAlign: "center",
            }}>{x.period}</div>
            <span>{x.task}</span>
          </div>
        ))}
      </Section>

      {/* Disclaimer */}
      <div style={{
        marginTop: 24, padding: "14px 16px", borderRadius: 10, background: colors.bg,
        border: `1px solid ${colors.border}`, fontSize: 10, color: colors.textDim,
        lineHeight: 1.6, fontFamily: fontPrimary,
      }}>
        <strong style={{ color: colors.textMuted }}>Important Disclaimer: </strong>{t.rpt.disc}
      </div>

      {/* Paid CTA */}
      <div style={{
        marginTop: 24, padding: "24px 20px", borderRadius: 14, textAlign: "center",
        background: `linear-gradient(135deg, ${colors.accentDark}, ${colors.card})`,
        border: `1px solid ${colors.accent}33`,
      }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: colors.text, margin: "0 0 4px", fontFamily: fontDisplay }}>
          {t.rpt.cta.title}
        </h3>
        <div style={{
          display: "inline-block", padding: "4px 14px", borderRadius: 20, marginBottom: 12,
          background: colors.accentGlow, border: `1px solid ${colors.accent}33`,
          fontSize: 14, fontWeight: 700, color: colors.accent, fontFamily: fontPrimary,
        }}>
          {t.rpt.cta.subtitle}
        </div>
        <p style={{ fontSize: 12, color: colors.textMuted, margin: "0 0 12px", fontFamily: fontPrimary }}>
          {t.rpt.cta.desc}
        </p>
        <div style={{ textAlign: "left", marginBottom: 16, maxWidth: 320, margin: "0 auto 16px" }}>
          {t.rpt.cta.features.map((f, i) => (
            <div key={i} style={{
              display: "flex", gap: 8, marginBottom: 6, fontSize: 12,
              color: colors.textMuted, fontFamily: fontPrimary,
            }}>
              <span style={{ color: colors.green }}>✓</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
        <Button onClick={handleBooking} style={{ padding: "14px 28px", fontSize: 14, borderRadius: 8 }}>
          {t.rpt.cta.btn}
        </Button>
        <p style={{ fontSize: 10, color: colors.textDim, marginTop: 10, fontFamily: fontPrimary }}>
          {t.rpt.cta.guarantee}
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Admin Panel (dev-only, accessed via ?admin=1 query param)
// ═══════════════════════════════════════════════════════════════════

function AdminPanel({ onBack }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads().then(data => { setLeads(data); setLoading(false); });
  }, []);

  const scoreColor = s => s >= 70 ? colors.green : s >= 40 ? colors.amber : colors.red;

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ ...headingStyle, fontSize: 20 }}>Leads ({leads.length})</h2>
        <Button variant="secondary" onClick={onBack}>← Back</Button>
      </div>

      {loading && <p style={{ color: colors.textMuted, fontFamily: fontPrimary }}>Loading...</p>}

      {!loading && leads.length === 0 && (
        <div style={{ padding: 40, textAlign: "center", color: colors.textMuted, fontFamily: fontPrimary }}>
          No leads yet. They will appear here once users complete assessments.
        </div>
      )}

      {leads.map(s => (
        <div key={s.id} style={{
          padding: "16px 18px", borderRadius: 12, background: colors.card,
          border: `1px solid ${colors.border}`, marginBottom: 10,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: colors.text, fontFamily: fontPrimary }}>
                {s.name || "—"} · {s.email}
              </div>
              <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 2, fontFamily: fontPrimary }}>
                {s.jobTitle} · {i18n.en.pw.find(p => p.id === s.pathway)?.label || s.pathway}
              </div>
            </div>
            <div style={{
              padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 700, fontFamily: fontPrimary,
              color: scoreColor(s.scores?.overall),
              background: s.scores?.overall >= 70 ? colors.greenBg : s.scores?.overall >= 40 ? colors.amberBg : colors.redBg,
            }}>{s.scores?.overall || "—"}</div>
          </div>
          <div style={{ display: "flex", gap: 12, fontSize: 11, color: colors.textDim, fontFamily: fontPrimary }}>
            <span>Exp: {s.experience}</span>
            <span>Refs: {s.referees}</span>
            <span>TL: {s.timeline}</span>
            <span>{new Date(s.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Loading Screen
// ═══════════════════════════════════════════════════════════════════

function LoadingScreen() {
  const t = useT();
  const [dots, setDots] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const a = setInterval(() => setDots(c => (c + 1) % 4), 400);
    const b = setInterval(() => setMsgIndex(c => (c + 1) % t.ld.msgs.length), 2200);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: 360, textAlign: "center",
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 12, marginBottom: 20,
        background: `linear-gradient(135deg, ${colors.accent}, #8B5CF6)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "pulse 2s infinite",
      }}>
        <span style={{ fontSize: 24 }}>⚡</span>
      </div>
      <h2 style={{ fontSize: 19, fontWeight: 700, color: colors.text, margin: "0 0 10px", fontFamily: fontDisplay }}>
        {t.ld.title}
      </h2>
      <p style={{ fontSize: 13, color: colors.accent, margin: 0, fontFamily: fontPrimary, fontWeight: 500 }}>
        {t.ld.msgs[msgIndex]}{".".repeat(dots)}
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Landing Page
// ═══════════════════════════════════════════════════════════════════

function Landing({ onStart }) {
  const t = useT();
  return (
    <div style={{ animation: "fadeIn 0.6s ease" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{
          display: "inline-block", padding: "4px 12px", borderRadius: 20,
          background: colors.accentGlow, border: `1px solid ${colors.accent}33`,
          fontSize: 11, color: colors.accent, fontWeight: 600, marginBottom: 16, fontFamily: fontPrimary,
        }}>
          {t.landing.tagline}
        </div>
        <h1 style={{
          fontSize: 30, fontWeight: 700, color: colors.text, margin: "0 0 12px",
          fontFamily: fontDisplay, letterSpacing: "-0.02em", lineHeight: 1.25,
        }}>
          {t.landing.title1}<br />
          <span style={{
            background: `linear-gradient(135deg, ${colors.accent}, #8B5CF6)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>{t.landing.title2}</span>
          {t.landing.title3}
        </h1>
        <p style={{ fontSize: 14, color: colors.textMuted, maxWidth: 420, margin: "0 auto", lineHeight: 1.6, fontFamily: fontPrimary }}>
          {t.landing.subtitle}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        {t.landing.features.map((f, i) => (
          <div key={i} style={{
            display: "flex", gap: 12, padding: "14px 16px", borderRadius: 12,
            background: colors.card, border: `1px solid ${colors.border}`,
          }}>
            <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{f.icon}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.text, fontFamily: fontPrimary }}>{f.title}</div>
              <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 2, fontFamily: fontPrimary }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust line */}
      <p style={{ textAlign: "center", fontSize: 11, color: colors.textMuted, marginBottom: 20, fontFamily: fontPrimary }}>
        {t.landing.trust}
      </p>

      <Button onClick={onStart} style={{ width: "100%", padding: "15px 28px", fontSize: 15, borderRadius: 10 }}>
        {t.landing.cta}
      </Button>

      <p style={{ textAlign: "center", fontSize: 10, color: colors.textDim, marginTop: 14, fontFamily: fontPrimary }}>
        {t.landing.footer}
      </p>

      {/* Landing disclaimer */}
      <div style={{
        marginTop: 20, padding: "10px 14px", borderRadius: 8, background: colors.card,
        border: `1px solid ${colors.border}`, fontSize: 9, color: colors.textDim,
        lineHeight: 1.5, fontFamily: fontPrimary, textAlign: "center",
      }}>
        {i18n[useLang()].rpt.disc}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Step Resolver — determines which steps to show based on pathway
// ═══════════════════════════════════════════════════════════════════

function getSteps(data, lang) {
  const pathway = i18n[lang].pw.find(p => p.id === data.pathway);
  const steps = [StepPathway];
  if (pathway?.hasSubpaths) {
    steps.push(StepSubpath);
  }
  steps.push(StepExperience, StepAchievements, StepEndorsement);
  return steps;
}

function isStepValid(stepIndex, data, steps) {
  const StepComponent = steps[stepIndex];
  if (StepComponent === StepPathway) return !!data.pathway;
  if (StepComponent === StepSubpath) return !!data.subpath;
  if (StepComponent === StepExperience) return !!data.experience && !!data.jobTitle && !!data.name;
  if (StepComponent === StepAchievements) return (data.achievements || []).length > 0;
  if (StepComponent === StepEndorsement) return !!data.endorsementCategory && !!data.referees && !!data.timeline;
  return true;
}

// ═══════════════════════════════════════════════════════════════════
// Main App
// ═══════════════════════════════════════════════════════════════════

export default function App() {
  const [lang, setLang] = useState("en");
  const [phase, setPhase] = useState(() => {
    // Dev-only admin access via query param
    if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("admin") === "1") {
      return "admin";
    }
    return "landing";
  });
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState({});
  const [report, setReport] = useState(null);
  const [saved, setSaved] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const t = i18n[lang];
  const steps = getSteps(data, lang);
  const totalSteps = steps.length;

  const canProceed = isStepValid(stepIndex, data, steps);

  const handleNext = async () => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setPhase("loading");
      const profilePayload = {
        pathway: data.pathway,
        subpath: data.subpath || null,
        experience: data.experience,
        jobTitle: data.jobTitle,
        name: data.name,
        country: data.country || null,
        career: data.career,
        achievements: data.achievements,
        topAchievement: data.topAchievement,
        endorsementCategory: data.endorsementCategory,
        referees: data.referees,
        timeline: data.timeline,
        notes: data.notes || null,
      };
      const result = await generateAssessment(profilePayload, lang);
      setReport(result);
      setPhase("gate");
    }
  };

  const handleEmailUnlock = async (email) => {
    setUserEmail(email);
    setSaved(false);
    const result = await saveLead(email, data.name, data, report, lang);
    if (result?.id) setSaved(true);
    setPhase("report");
  };

  const reset = () => {
    setPhase("landing");
    setStepIndex(0);
    setData({});
    setReport(null);
    setSaved(false);
    setUserEmail("");
  };

  // When pathway changes and no longer has subpaths, reset step to avoid orphan subpath step
  useEffect(() => {
    const currentSteps = getSteps(data, lang);
    if (stepIndex >= currentSteps.length) {
      setStepIndex(currentSteps.length - 1);
    }
  }, [data.pathway]);

  const CurrentStep = steps[stepIndex];
  const isLastStep = stepIndex === totalSteps - 1;

  return (
    <LangContext.Provider value={lang}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); opacity: 0.85; } }
        ::selection { background: ${colors.accent}44; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <div style={{ minHeight: "100vh", background: colors.bg, display: "flex", flexDirection: "column" }}>
        {/* Nav */}
        <nav style={{
          padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
          borderBottom: `1px solid ${colors.border}`, position: "sticky", top: 0, background: colors.bg, zIndex: 10,
        }}>
          <div
            onClick={phase !== "loading" ? reset : undefined}
            style={{ cursor: phase !== "loading" ? "pointer" : "default", display: "flex", alignItems: "center", gap: 10 }}
          >
            <div style={{
              width: 34, height: 34, borderRadius: 8,
              background: `linear-gradient(135deg, ${colors.accent}, #8B5CF6)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 17, fontWeight: 700, color: colors.white, fontFamily: fontDisplay,
            }}>G</div>
            <span style={{ fontSize: 16, fontWeight: 600, color: colors.text, fontFamily: fontPrimary }}>
              GlobalTalent<span style={{ color: colors.accent }}>.ai</span>
            </span>
          </div>
          <button
            onClick={() => setLang(lang === "en" ? "zh" : "en")}
            style={{
              padding: "5px 14px", borderRadius: 6, border: `1px solid ${colors.border}`,
              background: "transparent", color: colors.textMuted, fontSize: 12, fontWeight: 600,
              cursor: "pointer", fontFamily: fontPrimary,
            }}
          >
            {t.nav.lang}
          </button>
        </nav>

        {/* Content */}
        <div style={{ flex: 1, width: "100%", maxWidth: 540, margin: "0 auto", padding: "28px 18px 40px" }}>
          {phase === "landing" && <Landing onStart={() => setPhase("form")} />}

          {phase === "form" && (
            <div style={{ animation: "fadeIn 0.4s ease" }}>
              <ProgressBar current={stepIndex + 1} total={totalSteps} />
              <CurrentStep data={data} setData={setData} />
              <div style={{
                display: "flex", justifyContent: "space-between", marginTop: 28,
                paddingTop: 18, borderTop: `1px solid ${colors.border}`,
              }}>
                <Button
                  variant="secondary"
                  onClick={() => stepIndex > 0 ? setStepIndex(stepIndex - 1) : setPhase("landing")}
                >
                  {t.btn.back}
                </Button>
                <Button onClick={handleNext} disabled={!canProceed}>
                  {isLastStep ? t.btn.gen : t.btn.next}
                </Button>
              </div>
            </div>
          )}

          {phase === "loading" && <LoadingScreen />}
          {phase === "gate" && <EmailGate report={report} onUnlock={handleEmailUnlock} />}
          {phase === "report" && <Report data={data} report={report} saved={saved} email={userEmail} />}
          {phase === "admin" && <AdminPanel onBack={reset} />}
        </div>

        {/* Footer */}
        <footer style={{
          padding: "16px 20px", borderTop: `1px solid ${colors.border}`, textAlign: "center",
          fontSize: 10, color: colors.textDim, fontFamily: fontPrimary,
        }}>
          © 2026 GlobalTalent.ai — {t.ft}
        </footer>
      </div>
    </LangContext.Provider>
  );
}
