import { useState, useEffect, createContext, useContext } from "react";

// ═══════════════════════════════════════════════════════════════════
// i18n
// ═══════════════════════════════════════════════════════════════════
const i18n = {
  en: {
    nav: { lang: "中文" },
    landing: {
      tagline: "Free Assessment · 5 min",
      title1: "Are you ready for the",
      title2: "UK Global Talent Visa",
      title3: "?",
      subtitle: "Answer a few questions about your background. Get an instant AI-powered assessment of your readiness, evidence gaps, and a clear action plan.",
      cta: "Start Your Free Assessment →",
      footer: "No signup required · Not immigration advice",
      features: [
        { icon: "📊", title: "Readiness Score", desc: "AI-powered analysis of your evidence strength across key dimensions" },
        { icon: "🔍", title: "Gap Analysis", desc: "Identify what's missing from your portfolio before you apply" },
        { icon: "📅", title: "Action Plan", desc: "Personalised timeline with clear milestones to get application-ready" },
      ],
    },
    progress: { step: "Step", of: "of" },
    steps: {
      pathway: { title: "Which field are you applying under?", desc: "Select the pathway that best matches your professional background." },
      experience: {
        title: "Your professional experience", desc: "Tell us about your career background and current role.",
        yearsLabel: "Years of experience in your field", jobLabel: "Current job title",
        jobPh: "e.g. Senior Software Engineer at Stripe",
        careerLabel: "Brief summary of your career",
        careerPh: "Describe your key roles, companies, and what you're known for...",
        nameLabel: "Your full name",
        namePh: "e.g. John Smith",
      },
      achievements: {
        title: "Your key achievements", desc: "Select all that apply — these form the core of your evidence portfolio.",
        topLabel: "Highlight your most notable achievement",
        topPh: "e.g. Led development of an AI platform with 1M+ users; published in Nature...",
      },
      endorsement: {
        title: "Endorsement & readiness", desc: "A few more details to complete your assessment.",
        catLabel: "Which endorsement category?", refLabel: "Do you have potential referees?",
        tlLabel: "Target timeline", noteLabel: "Anything else we should know?",
        notePh: "Specific concerns or context about your situation...",
      },
    },
    btn: { back: "← Back", next: "Continue →", gen: "Generate Report", opt: "(optional)" },
    pw: [
      { id: "digital", label: "Digital Technology", icon: "💻", desc: "Software, AI, cybersecurity, fintech" },
      { id: "academia", label: "Academia & Research", icon: "🔬", desc: "Science, engineering, medicine, humanities" },
      { id: "arts", label: "Arts & Culture", icon: "🎨", desc: "Visual arts, performing arts, literature" },
      { id: "fashion", label: "Fashion", icon: "✂️", desc: "Fashion design, textile innovation" },
      { id: "film", label: "Film & Television", icon: "🎬", desc: "Production, direction, screenwriting" },
    ],
    exp: [{ id:"0-2",l:"0–2 yrs" },{ id:"3-5",l:"3–5 yrs" },{ id:"5-8",l:"5–8 yrs" },{ id:"8-15",l:"8–15 yrs" },{ id:"15+",l:"15+" }],
    ach: [
      { id:"patents",l:"Patents / IP" },{ id:"publications",l:"Publications" },{ id:"awards",l:"Industry Awards" },
      { id:"speaking",l:"Conference Speaking" },{ id:"media",l:"Media Coverage" },{ id:"opensource",l:"Open Source" },
      { id:"revenue",l:"Revenue Impact" },{ id:"funding",l:"Fundraising" },{ id:"mentoring",l:"Mentoring" },{ id:"leadership",l:"Leadership" },
    ],
    end: [
      { id:"talent",l:"Exceptional Talent",d:"Established leader (5+ years)" },
      { id:"promise",l:"Exceptional Promise",d:"Emerging leader (early career)" },
      { id:"unsure",l:"Not sure yet",d:"Need guidance" },
    ],
    ref: [{ id:"0",l:"None yet" },{ id:"1-2",l:"1–2" },{ id:"3+",l:"3+" }],
    tl: [{ id:"asap",l:"ASAP (1–2 mo)" },{ id:"3-6",l:"3–6 months" },{ id:"6-12",l:"6–12 months" },{ id:"exploring",l:"Just exploring" }],
    ld: { title:"Building Your Assessment",msgs:["Analysing your profile","Mapping to criteria","Evaluating evidence","Generating report"] },
    gate: {
      title: "Your report is ready!",
      subtitle: "Enter your email to view the full assessment report.",
      emailPh: "your@email.com",
      cta: "View My Report →",
      privacy: "We'll only use this to send you your report. No spam.",
      preview: "Here's a preview of your scores:",
    },
    rpt: {
      badge:"Global Talent Readiness Assessment",title:"Your Assessment Report",pwl:"pathway",
      sc:{overall:"Overall Readiness",evidence:"Evidence Strength",narrative:"Narrative Clarity",network:"Network & Referees"},
      sec:{summary:"Executive Summary",strengths:"Key Strengths",gaps:"Areas to Strengthen",actions:"Recommended Next Steps",timeline:"Suggested Timeline"},
      cta:{title:"Ready for the full strategy package?",desc:"Complete evidence strategy, narrative coaching, timeline & referee guidance — £499",btn:"Book Your Strategy Session →"},
      disc:"This assessment provides information research and career narrative analysis only. It does not constitute immigration advice under the Immigration and Asylum Act 1999. For immigration advice, please consult an OISC-registered adviser or qualified solicitor.",
      saved: "Report saved ✓",
    },
    ft:"This service does not constitute immigration advice",
  },
  zh: {
    nav: { lang: "EN" },
    landing: {
      tagline: "免费评估 · 5分钟",
      title1: "你准备好申请",
      title2: "英国全球人才签证",
      title3: "了吗？",
      subtitle: "回答几个关于你背景的问题，立即获得 AI 驱动的准备度评估、证据缺口分析和个性化行动方案。",
      cta: "开始免费评估 →",
      footer: "无需注册 · 非移民法律建议",
      features: [
        { icon: "📊", title: "准备度评分", desc: "AI 驱动的多维度证据强度分析" },
        { icon: "🔍", title: "缺口分析", desc: "在提交申请前，找出材料中缺少什么" },
        { icon: "📅", title: "行动方案", desc: "个性化时间线和清晰的里程碑" },
      ],
    },
    progress: { step: "第", of: "步，共" },
    steps: {
      pathway: { title: "你打算申请哪个领域？", desc: "选择最符合你专业背景的路径。" },
      experience: {
        title: "你的职业经历", desc: "介绍你的职业背景和当前角色。",
        yearsLabel: "在该领域的工作年限", jobLabel: "当前职位",
        jobPh: "例：Stripe 高级软件工程师",
        careerLabel: "职业经历简述",
        careerPh: "描述你的核心角色、公司以及专长...",
        nameLabel: "你的姓名",
        namePh: "例：张三",
      },
      achievements: {
        title: "你的核心成就", desc: "选择所有适用项，这些将构成证据材料的核心。",
        topLabel: "你最突出的成就",
        topPh: "例：主导开发了用户超百万的 AI 平台；在 Nature 发表论文...",
      },
      endorsement: {
        title: "背书类别与准备状态", desc: "再补充几个细节，完成评估。",
        catLabel: "选择背书类别", refLabel: "你有潜在推荐人吗？",
        tlLabel: "目标时间线", noteLabel: "还有什么需要了解的？",
        notePh: "具体顾虑、问题或特殊情况...",
      },
    },
    btn: { back: "← 返回", next: "继续 →", gen: "生成报告", opt: "（选填）" },
    pw: [
      { id:"digital",label:"数字技术",icon:"💻",desc:"软件、AI、网络安全、金融科技" },
      { id:"academia",label:"学术与研究",icon:"🔬",desc:"科学、工程、医学、人文" },
      { id:"arts",label:"艺术与文化",icon:"🎨",desc:"视觉艺术、表演艺术、文学" },
      { id:"fashion",label:"时尚",icon:"✂️",desc:"时装设计、纺织创新" },
      { id:"film",label:"影视",icon:"🎬",desc:"制片、导演、编剧" },
    ],
    exp: [{ id:"0-2",l:"0–2年" },{ id:"3-5",l:"3–5年" },{ id:"5-8",l:"5–8年" },{ id:"8-15",l:"8–15年" },{ id:"15+",l:"15年+" }],
    ach: [
      { id:"patents",l:"专利/IP" },{ id:"publications",l:"论文发表" },{ id:"awards",l:"行业奖项" },
      { id:"speaking",l:"会议演讲" },{ id:"media",l:"媒体报道" },{ id:"opensource",l:"开源贡献" },
      { id:"revenue",l:"营收贡献" },{ id:"funding",l:"融资经历" },{ id:"mentoring",l:"导师/社区" },{ id:"leadership",l:"团队领导" },
    ],
    end: [
      { id:"talent",l:"杰出人才 Exceptional Talent",d:"已确立的领导者（5年+）" },
      { id:"promise",l:"杰出潜力 Exceptional Promise",d:"新兴领导者（早期）" },
      { id:"unsure",l:"还不确定",d:"需要指导选择" },
    ],
    ref: [{ id:"0",l:"暂无" },{ id:"1-2",l:"1–2位" },{ id:"3+",l:"3位+" }],
    tl: [{ id:"asap",l:"尽快（1-2月）" },{ id:"3-6",l:"3–6个月" },{ id:"6-12",l:"6–12个月" },{ id:"exploring",l:"只是了解" }],
    ld: { title:"正在生成评估报告",msgs:["分析职业档案","匹配背书标准","评估证据强度","生成报告"] },
    gate: {
      title: "你的报告已生成！",
      subtitle: "输入邮箱即可查看完整评估报告。",
      emailPh: "your@email.com",
      cta: "查看我的报告 →",
      privacy: "邮箱仅用于发送报告，不会发送垃圾邮件。",
      preview: "以下是你的评分预览：",
    },
    rpt: {
      badge:"全球人才签证准备度评估",title:"你的评估报告",pwl:"路径",
      sc:{overall:"整体准备度",evidence:"证据强度",narrative:"叙事清晰度",network:"推荐人网络"},
      sec:{summary:"总体评估",strengths:"核心优势",gaps:"待加强领域",actions:"建议下一步",timeline:"建议时间线"},
      cta:{title:"准备好获取完整策略方案了吗？",desc:"完整证据策略、叙事辅导、里程碑时间线和推荐人指导 — £499",btn:"预约策略咨询 →"},
      disc:"本评估仅提供信息研究与职业叙事分析，不构成《1999年移民与庇护法》下的移民建议。如需移民法律建议，请咨询 OISC 注册顾问或持牌律师。",
      saved: "报告已保存 ✓",
    },
    ft:"本服务不构成移民法律建议",
  },
};

// ═══════════════════════════════════════════════════════════════════
// Context & constants
// ═══════════════════════════════════════════════════════════════════
const LC = createContext("en");
const uL = () => useContext(LC);
const uT = () => i18n[uL()];

const C = {
  bg:"#0B0E14",cd:"#12161F",cdH:"#1A1F2C",bd:"#1E2433",ba:"#3B82F6",
  ac:"#3B82F6",ag:"rgba(59,130,246,0.12)",as:"#1E3A5F",
  tx:"#E2E8F0",tm:"#7B8CA8",td:"#4A5568",
  gn:"#10B981",gb:"rgba(16,185,129,0.08)",am:"#F59E0B",ab:"rgba(245,158,11,0.08)",
  rd:"#EF4444",rb:"rgba(239,68,68,0.08)",wh:"#fff",
};
const f1="'DM Sans',sans-serif",f2="'DM Serif Display',Georgia,serif";

// ═══════════════════════════════════════════════════════════════════
// Storage helpers
// ═══════════════════════════════════════════════════════════════════
async function saveSubmission(email, name, data, report, lang) {
  try {
    const id = "sub_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
    const submission = {
      id,
      email,
      name: name || "",
      pathway: data.pw,
      jobTitle: data.job,
      experience: data.exp,
      career: data.career,
      achievements: data.achs,
      topAchievement: data.topA,
      endorsement: data.end,
      referees: data.ref,
      timeline: data.tl,
      notes: data.note,
      scores: report.scores,
      lang,
      createdAt: new Date().toISOString(),
    };
    await window.storage.set(id, JSON.stringify(submission));
    // Also maintain an index of all submission IDs
    let index = [];
    try {
      const existing = await window.storage.get("submissions_index");
      if (existing && existing.value) index = JSON.parse(existing.value);
    } catch (e) { /* first submission */ }
    index.push(id);
    await window.storage.set("submissions_index", JSON.stringify(index));
    return id;
  } catch (e) {
    console.error("Save error:", e);
    return null;
  }
}

async function loadAllSubmissions() {
  try {
    const existing = await window.storage.get("submissions_index");
    if (!existing || !existing.value) return [];
    const ids = JSON.parse(existing.value);
    const subs = [];
    for (const id of ids) {
      try {
        const r = await window.storage.get(id);
        if (r && r.value) subs.push(JSON.parse(r.value));
      } catch (e) { /* skip missing */ }
    }
    return subs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (e) {
    console.error("Load error:", e);
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════════
// UI Components
// ═══════════════════════════════════════════════════════════════════
function SC({s,o,ch,sx}){const[h,sH]=useState(false);
  return <div onClick={o} onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)} style={{
    padding:"14px 16px",borderRadius:10,cursor:"pointer",transition:"all 0.2s",position:"relative",
    border:`1.5px solid ${s?C.ba:h?"#2A3348":C.bd}`,background:s?C.ag:h?C.cdH:C.cd,...sx}}>
    {s&&<div style={{position:"absolute",top:10,right:12,width:18,height:18,borderRadius:"50%",
      background:C.ac,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:C.wh}}>✓</div>}
    {ch}</div>;}

function TI({lb,ph,v,oc,ml,op,ty="text"}){const t=uT();
  const bs={width:"100%",boxSizing:"border-box",padding:"11px 14px",borderRadius:8,
    border:`1.5px solid ${C.bd}`,background:C.cd,color:C.tx,fontSize:14,fontFamily:f1,outline:"none",transition:"border-color 0.2s"};
  return <div style={{marginBottom:18}}>
    <label style={{display:"block",marginBottom:5,fontSize:12,fontWeight:500,color:C.tm,fontFamily:f1}}>
      {lb} {op&&<span style={{color:C.td,fontWeight:400}}>{t.btn.opt}</span>}</label>
    {ml?<textarea rows={4} placeholder={ph} value={v} onChange={e=>oc(e.target.value)}
      onFocus={e=>{e.target.style.borderColor=C.ba}} onBlur={e=>{e.target.style.borderColor=C.bd}}
      style={{...bs,resize:"vertical",minHeight:90}}/>
    :<input type={ty} placeholder={ph} value={v} onChange={e=>oc(e.target.value)}
      onFocus={e=>{e.target.style.borderColor=C.ba}} onBlur={e=>{e.target.style.borderColor=C.bd}} style={bs}/>}
  </div>;}

function Bt({ch,o,d,vr="primary",sx}){const[h,sH]=useState(false);const p=vr==="primary";
  return <button onClick={o} disabled={d} onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)} style={{
    padding:"12px 26px",borderRadius:8,border:"none",fontSize:14,fontWeight:600,
    cursor:d?"not-allowed":"pointer",fontFamily:f1,transition:"all 0.2s",opacity:d?0.4:1,
    background:p?(h?"#2563EB":C.ac):"transparent",color:p?C.wh:C.tm,...sx}}>{ch}</button>;}

function PB({cur,tot}){const t=uT(),l=uL(),pc=(cur/tot)*100;
  return <div style={{width:"100%",marginBottom:28}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
      <span style={{fontSize:11,color:C.tm,fontFamily:f1}}>{l==="zh"?`${t.progress.step} ${cur} ${t.progress.of} ${tot} 步`:`${t.progress.step} ${cur} ${t.progress.of} ${tot}`}</span>
      <span style={{fontSize:11,color:C.ac,fontFamily:f1,fontWeight:600}}>{Math.round(pc)}%</span></div>
    <div style={{width:"100%",height:4,background:C.bd,borderRadius:2,overflow:"hidden"}}>
      <div style={{width:`${pc}%`,height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.ac},#8B5CF6)`,
        transition:"width 0.5s cubic-bezier(0.4,0,0.2,1)"}}/></div></div>;}

const hs={fontSize:21,fontWeight:700,color:C.tx,margin:0,fontFamily:f2,letterSpacing:"-0.02em"};
const ds={fontSize:13,color:C.tm,marginTop:6,lineHeight:1.5,fontFamily:f1};
const ls={display:"block",marginBottom:8,fontSize:12,fontWeight:500,color:C.tm,fontFamily:f1};

// ═══════════════════════════════════════════════════════════════════
// Form Steps
// ═══════════════════════════════════════════════════════════════════
function S1({d,sD}){const t=uT();return <div><h2 style={hs}>{t.steps.pathway.title}</h2><p style={ds}>{t.steps.pathway.desc}</p>
  <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:20}}>
    {t.pw.map(p=><SC key={p.id} s={d.pw===p.id} o={()=>sD({...d,pw:p.id})} ch={
      <div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:20}}>{p.icon}</span>
        <div><div style={{fontSize:14,fontWeight:600,color:C.tx,fontFamily:f1}}>{p.label}</div>
          <div style={{fontSize:12,color:C.tm,marginTop:1,fontFamily:f1}}>{p.desc}</div></div></div>}/>)}</div></div>;}

function S2({d,sD}){const t=uT();return <div><h2 style={hs}>{t.steps.experience.title}</h2><p style={ds}>{t.steps.experience.desc}</p>
  <div style={{marginTop:20}}>
    <TI lb={t.steps.experience.nameLabel} ph={t.steps.experience.namePh} v={d.name||""} oc={v=>sD({...d,name:v})}/>
    <label style={ls}>{t.steps.experience.yearsLabel}</label>
    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
      {t.exp.map(e=><SC key={e.id} s={d.exp===e.id} o={()=>sD({...d,exp:e.id})} sx={{padding:"9px 16px",flex:"0 0 auto"}}
        ch={<span style={{fontSize:13,fontWeight:500,color:C.tx,fontFamily:f1}}>{e.l}</span>}/>)}</div>
    <TI lb={t.steps.experience.jobLabel} ph={t.steps.experience.jobPh} v={d.job||""} oc={v=>sD({...d,job:v})}/>
    <TI lb={t.steps.experience.careerLabel} ph={t.steps.experience.careerPh} v={d.career||""} oc={v=>sD({...d,career:v})} ml/>
  </div></div>;}

function S3({d,sD}){const t=uT();const sl=d.achs||[];
  const tg=id=>sD({...d,achs:sl.includes(id)?sl.filter(x=>x!==id):[...sl,id]});
  return <div><h2 style={hs}>{t.steps.achievements.title}</h2><p style={ds}>{t.steps.achievements.desc}</p>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginTop:20}}>
      {t.ach.map(a=><SC key={a.id} s={sl.includes(a.id)} o={()=>tg(a.id)} sx={{padding:"10px 12px"}}
        ch={<span style={{fontSize:12,fontWeight:500,color:C.tx,fontFamily:f1}}>{a.l}</span>}/>)}</div>
    <div style={{marginTop:20}}><TI lb={t.steps.achievements.topLabel} ph={t.steps.achievements.topPh}
      v={d.topA||""} oc={v=>sD({...d,topA:v})} ml/></div></div>;}

function S4({d,sD}){const t=uT();return <div><h2 style={hs}>{t.steps.endorsement.title}</h2><p style={ds}>{t.steps.endorsement.desc}</p>
  <div style={{marginTop:20}}>
    <label style={ls}>{t.steps.endorsement.catLabel}</label>
    <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:20}}>
      {t.end.map(e=><SC key={e.id} s={d.end===e.id} o={()=>sD({...d,end:e.id})} ch={
        <div><div style={{fontSize:13,fontWeight:600,color:C.tx,fontFamily:f1}}>{e.l}</div>
          <div style={{fontSize:11,color:C.tm,marginTop:1,fontFamily:f1}}>{e.d}</div></div>}/>)}</div>
    <label style={ls}>{t.steps.endorsement.refLabel}</label>
    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
      {t.ref.map(r=><SC key={r.id} s={d.ref===r.id} o={()=>sD({...d,ref:r.id})} sx={{padding:"9px 16px",flex:"0 0 auto"}}
        ch={<span style={{fontSize:12,fontWeight:500,color:C.tx,fontFamily:f1}}>{r.l}</span>}/>)}</div>
    <label style={ls}>{t.steps.endorsement.tlLabel}</label>
    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
      {t.tl.map(x=><SC key={x.id} s={d.tl===x.id} o={()=>sD({...d,tl:x.id})} sx={{padding:"9px 16px",flex:"0 0 auto"}}
        ch={<span style={{fontSize:12,fontWeight:500,color:C.tx,fontFamily:f1}}>{x.l}</span>}/>)}</div>
    <TI lb={t.steps.endorsement.noteLabel} ph={t.steps.endorsement.notePh} v={d.note||""} oc={v=>sD({...d,note:v})} ml op/>
  </div></div>;}

// ═══════════════════════════════════════════════════════════════════
// Score Badge & Report Sections
// ═══════════════════════════════════════════════════════════════════
function SBdg({sc,lb,blur}){const c=sc>=70?C.gn:sc>=40?C.am:C.rd,bg=sc>=70?C.gb:sc>=40?C.ab:C.rb;
  return <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,
    padding:"16px 12px",borderRadius:10,background:bg,border:`1px solid ${c}22`,flex:1,minWidth:80,
    filter:blur?"blur(0)":"none"}}>
    <div style={{fontSize:26,fontWeight:700,color:c,fontFamily:f2}}>{sc}</div>
    <div style={{fontSize:10,color:C.tm,textAlign:"center",fontFamily:f1,fontWeight:500}}>{lb}</div></div>;}

function Sec({ti,ic,ch}){return <div style={{marginBottom:20,padding:"18px 20px",borderRadius:12,background:C.cd,border:`1px solid ${C.bd}`}}>
  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
    <span style={{fontSize:16}}>{ic}</span>
    <h3 style={{margin:0,fontSize:15,fontWeight:700,color:C.tx,fontFamily:f2}}>{ti}</h3></div>
  <div style={{fontSize:13,color:C.tm,lineHeight:1.7,fontFamily:f1}}>{ch}</div></div>;}

// ═══════════════════════════════════════════════════════════════════
// AI Generation
// ═══════════════════════════════════════════════════════════════════
async function genRpt(d,lang){
  const pw=i18n.en.pw.find(p=>p.id===d.pw);
  const as=(d.achs||[]).map(id=>i18n.en.ach.find(a=>a.id===id)?.l).filter(Boolean);
  const en=i18n.en.end.find(e=>e.id===d.end);
  const li=lang==="zh"?"Respond entirely in Simplified Chinese.":"Respond in English.";
  try{
    const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:`You are an expert analyst for UK Global Talent visa readiness. ${li}
PROFILE: Pathway:${pw?.label||d.pw}, Experience:${d.exp||"N/A"}, Role:${d.job||"N/A"}, Career:${d.career||"N/A"}, Achievements:${as.join(",")||"None"}, Top:${d.topA||"N/A"}, Endorsement:${en?.l||d.end}, Referees:${d.ref||"N/A"}, Timeline:${d.tl||"N/A"}, Notes:${d.note||"None"}
IMPORTANT: Information analysis only, NOT immigration advice.
Respond ONLY with valid JSON (no markdown):
{"scores":{"overall":<0-100>,"evidence":<0-100>,"narrative":<0-100>,"network":<0-100>},"summary":"<2-3 sentences>","strengths":["<1>","<2>","<3>"],"gaps":["<1>","<2>","<3>"],"actions":["<1>","<2>","<3>","<4>"],"timeline":[{"period":"Week 1-2","task":"<t>"},{"period":"Week 3-4","task":"<t>"},{"period":"Month 2","task":"<t>"},{"period":"Month 3","task":"<t>"}]}
Be realistic and specific.`}]})});
    const r=await res.json();const txt=r.content?.map(c=>c.text||"").join("")||"";
    return JSON.parse(txt.replace(/```json|```/g,"").trim());
  }catch(e){console.error(e);return null;}}

function fb(l){
  if(l==="zh")return{scores:{overall:62,evidence:55,narrative:68,network:45},
    summary:"根据你提供的信息，你具备申请全球人才签证的基本条件，但在证据材料和推荐人网络方面还需要进一步加强。",
    strengths:["工作经验年限与背书标准相符","拥有可构成有力证据的可量化成就","职业叙事展现了清晰的发展路径"],
    gaps:["建议增加更多行业认可度方面的书面证据","推荐人网络可以更强——找到3位以上高级推荐人","证据材料中需要更多可量化的影响力指标"],
    actions:["整理所有可量化的工作成果","联系3-4位能为你作证的资深专业人士","构建结构化证据档案，对应到官方标准","通过演讲、写作或开源贡献提升行业知名度"],
    timeline:[{period:"第1-2周",task:"完成职业成就盘点，收集现有材料"},{period:"第3-4周",task:"联系推荐人，请求推荐信"},{period:"第2个月",task:"填补证据缺口"},{period:"第3个月",task:"汇总材料，对照标准审核"}]};
  return{scores:{overall:62,evidence:55,narrative:68,network:45},
    summary:"Based on your profile, you show solid foundations for a Global Talent application but key areas need strengthening.",
    strengths:["Years of experience align with endorsement criteria","Demonstrable achievements that could form strong evidence","Career narrative shows a clear professional trajectory"],
    gaps:["Build more documented evidence of industry recognition","Referee network could be stronger — aim for 3+ senior recommenders","Evidence portfolio needs more quantifiable impact metrics"],
    actions:["Document all measurable impacts from your work","Identify and approach 3-4 senior professionals as referees","Build structured evidence portfolio mapping to official criteria","Increase public profile through speaking, writing, or open source"],
    timeline:[{period:"Week 1-2",task:"Complete career inventory and gather documentation"},{period:"Week 3-4",task:"Approach referees and request recommendations"},{period:"Month 2",task:"Fill evidence gaps through targeted activities"},{period:"Month 3",task:"Compile final portfolio and review against criteria"}]};}

// ═══════════════════════════════════════════════════════════════════
// Email Gate Screen
// ═══════════════════════════════════════════════════════════════════
function EmailGate({ rpt, onUnlock }) {
  const t = uT();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    if (!valid) { setErr(uL() === "zh" ? "请输入有效的邮箱地址" : "Please enter a valid email"); return; }
    setErr("");
    onUnlock(email);
  };

  return (
    <div style={{ animation: "fadeIn 0.6s ease" }}>
      {/* Score preview - visible */}
      <div style={{
        textAlign: "center", marginBottom: 28, padding: "28px 20px", borderRadius: 14,
        background: `linear-gradient(135deg, ${C.as}, ${C.cd})`, border: `1px solid ${C.bd}`,
      }}>
        <div style={{ fontSize: 42, marginBottom: 12 }}>🎉</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.tx, margin: "0 0 8px", fontFamily: f2 }}>{t.gate.title}</h2>
        <p style={{ fontSize: 13, color: C.tm, margin: 0, fontFamily: f1 }}>{t.gate.subtitle}</p>
      </div>

      {/* Preview scores */}
      <p style={{ fontSize: 12, color: C.tm, marginBottom: 10, fontFamily: f1, fontWeight: 500 }}>{t.gate.preview}</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        <SBdg sc={rpt.scores.overall} lb={t.rpt.sc.overall} />
        <SBdg sc={rpt.scores.evidence} lb={t.rpt.sc.evidence} />
        <SBdg sc={rpt.scores.narrative} lb={t.rpt.sc.narrative} />
        <SBdg sc={rpt.scores.network} lb={t.rpt.sc.network} />
      </div>

      {/* Blurred preview hint */}
      <div style={{
        padding: "20px", borderRadius: 12, background: C.cd, border: `1px solid ${C.bd}`,
        marginBottom: 28, position: "relative", overflow: "hidden",
      }}>
        <div style={{ filter: "blur(6px)", opacity: 0.4, pointerEvents: "none" }}>
          <div style={{ fontSize: 14, color: C.tm, lineHeight: 1.8, fontFamily: f1 }}>
            {rpt.summary}<br /><br />
            ✓ {rpt.strengths[0]}<br />
            ✓ {rpt.strengths[1]}<br />
            △ {rpt.gaps[0]}<br />
            △ {rpt.gaps[1]}
          </div>
        </div>
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(11,14,20,0.5)",
        }}>
          <div style={{
            padding: "8px 20px", borderRadius: 8, background: C.ag, border: `1px solid ${C.ac}44`,
            fontSize: 13, fontWeight: 600, color: C.ac, fontFamily: f1,
          }}>🔒 {uL() === "zh" ? "输入邮箱解锁完整报告" : "Enter email to unlock full report"}</div>
        </div>
      </div>

      {/* Email form */}
      <div style={{
        padding: "24px 20px", borderRadius: 14, background: C.cd, border: `1px solid ${C.bd}`,
      }}>
        <div style={{ marginBottom: 14 }}>
          <input
            type="email"
            placeholder={t.gate.emailPh}
            value={email}
            onChange={e => { setEmail(e.target.value); setErr(""); }}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            style={{
              width: "100%", boxSizing: "border-box", padding: "13px 16px", borderRadius: 8,
              border: `1.5px solid ${err ? C.rd : C.bd}`, background: C.bg, color: C.tx,
              fontSize: 15, fontFamily: f1, outline: "none", transition: "border-color 0.2s",
            }}
            onFocus={e => { e.target.style.borderColor = C.ba; }}
            onBlur={e => { e.target.style.borderColor = err ? C.rd : C.bd; }}
          />
          {err && <p style={{ fontSize: 11, color: C.rd, marginTop: 6, fontFamily: f1 }}>{err}</p>}
        </div>
        <Bt ch={t.gate.cta} o={handleSubmit} d={!email} sx={{ width: "100%", padding: "14px", fontSize: 15, borderRadius: 8 }} />
        <p style={{ fontSize: 10, color: C.td, marginTop: 10, textAlign: "center", fontFamily: f1 }}>{t.gate.privacy}</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Full Report
// ═══════════════════════════════════════════════════════════════════
function Rpt({ d, rpt, saved }) {
  const t = uT(), l = uL();
  if (!rpt) return null;
  const pw = i18n[l].pw.find(p => p.id === d.pw);
  return <div style={{ animation: "fadeIn 0.6s ease" }}>
    {saved && <div style={{
      marginBottom: 16, padding: "10px 16px", borderRadius: 8, background: C.gb, border: `1px solid ${C.gn}33`,
      fontSize: 13, color: C.gn, fontWeight: 600, fontFamily: f1, textAlign: "center",
    }}>{t.rpt.saved}</div>}

    <div style={{
      textAlign: "center", marginBottom: 32, padding: "28px 20px", borderRadius: 14,
      background: `linear-gradient(135deg,${C.as},${C.cd})`, border: `1px solid ${C.bd}`,
    }}>
      <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: C.ac, fontWeight: 600, marginBottom: 6, fontFamily: f1 }}>{t.rpt.badge}</div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: C.tx, margin: "0 0 4px", fontFamily: f2 }}>{t.rpt.title}</h1>
      <p style={{ fontSize: 12, color: C.tm, margin: 0, fontFamily: f1 }}>{d.name ? `${d.name} · ` : ""}{d.job} · {pw?.label} {t.rpt.pwl}</p>
    </div>

    <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
      <SBdg sc={rpt.scores.overall} lb={t.rpt.sc.overall} />
      <SBdg sc={rpt.scores.evidence} lb={t.rpt.sc.evidence} />
      <SBdg sc={rpt.scores.narrative} lb={t.rpt.sc.narrative} />
      <SBdg sc={rpt.scores.network} lb={t.rpt.sc.network} />
    </div>

    <Sec ti={t.rpt.sec.summary} ic="📋" ch={<p style={{ margin: 0 }}>{rpt.summary}</p>} />
    <Sec ti={t.rpt.sec.strengths} ic="💪" ch={rpt.strengths.map((s, i) => <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
      <span style={{ color: C.gn, fontSize: 13, marginTop: 1 }}>✓</span><span>{s}</span></div>)} />
    <Sec ti={t.rpt.sec.gaps} ic="🔍" ch={rpt.gaps.map((g, i) => <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
      <span style={{ color: C.am, fontSize: 13, marginTop: 1 }}>△</span><span>{g}</span></div>)} />
    <Sec ti={t.rpt.sec.actions} ic="🗺️" ch={rpt.actions.map((a, i) => <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, padding: "10px 12px", borderRadius: 8, background: C.bg }}>
      <div style={{
        width: 22, height: 22, borderRadius: "50%", flexShrink: 0, background: C.ag, border: `1px solid ${C.ac}44`,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.ac, fontFamily: f1
      }}>{i + 1}</div>
      <span>{a}</span></div>)} />
    <Sec ti={t.rpt.sec.timeline} ic="📅" ch={rpt.timeline.map((x, i) => <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
      <div style={{ flexShrink: 0, padding: "3px 10px", borderRadius: 6, background: C.ag, fontSize: 10, fontWeight: 600, color: C.ac, fontFamily: f1, minWidth: 56, textAlign: "center" }}>{x.period}</div>
      <span>{x.task}</span></div>)} />

    <div style={{ marginTop: 24, padding: "14px 16px", borderRadius: 10, background: C.bg, border: `1px solid ${C.bd}`, fontSize: 10, color: C.td, lineHeight: 1.6, fontFamily: f1 }}>
      <strong style={{ color: C.tm }}>Disclaimer: </strong>{t.rpt.disc}</div>

    <div style={{
      marginTop: 24, padding: "24px 20px", borderRadius: 14, textAlign: "center",
      background: `linear-gradient(135deg,${C.as},${C.cd})`, border: `1px solid ${C.ac}33`,
    }}>
      <h3 style={{ fontSize: 17, fontWeight: 700, color: C.tx, margin: "0 0 6px", fontFamily: f2 }}>{t.rpt.cta.title}</h3>
      <p style={{ fontSize: 12, color: C.tm, margin: "0 0 16px", fontFamily: f1 }}>{t.rpt.cta.desc}</p>
      <Bt ch={t.rpt.cta.btn} o={() => alert("Booking flow coming soon!")} /></div>
  </div>;
}

// ═══════════════════════════════════════════════════════════════════
// Admin Panel (submissions list)
// ═══════════════════════════════════════════════════════════════════
function Admin({ onBack }) {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllSubmissions().then(s => { setSubs(s); setLoading(false); });
  }, []);

  const scoreColor = s => s >= 70 ? C.gn : s >= 40 ? C.am : C.rd;

  return <div style={{ animation: "fadeIn 0.4s ease" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
      <h2 style={{ ...hs, fontSize: 20 }}>📋 Submissions ({subs.length})</h2>
      <Bt ch="← Back" vr="secondary" o={onBack} />
    </div>

    {loading && <p style={{ color: C.tm, fontFamily: f1 }}>Loading...</p>}

    {!loading && subs.length === 0 && (
      <div style={{ padding: 40, textAlign: "center", color: C.tm, fontFamily: f1 }}>
        No submissions yet. Assessments will appear here once users complete them.
      </div>
    )}

    {subs.map(s => (
      <div key={s.id} style={{
        padding: "16px 18px", borderRadius: 12, background: C.cd, border: `1px solid ${C.bd}`,
        marginBottom: 10,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.tx, fontFamily: f1 }}>
              {s.name || "—"} · {s.email}
            </div>
            <div style={{ fontSize: 12, color: C.tm, marginTop: 2, fontFamily: f1 }}>
              {s.jobTitle} · {i18n.en.pw.find(p => p.id === s.pathway)?.label || s.pathway}
            </div>
          </div>
          <div style={{
            padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 700, fontFamily: f1,
            color: scoreColor(s.scores?.overall), background: s.scores?.overall >= 70 ? C.gb : s.scores?.overall >= 40 ? C.ab : C.rb,
          }}>{s.scores?.overall || "—"}</div>
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 11, color: C.td, fontFamily: f1 }}>
          <span>Exp: {s.experience}</span>
          <span>Refs: {s.referees}</span>
          <span>TL: {s.timeline}</span>
          <span>{new Date(s.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    ))}
  </div>;
}

// ═══════════════════════════════════════════════════════════════════
// Loading Screen
// ═══════════════════════════════════════════════════════════════════
function Ld(){const t=uT();const[dots,sDD]=useState(0),[mi,sM]=useState(0);
  useEffect(()=>{const a=setInterval(()=>sDD(c=>(c+1)%4),400);const b=setInterval(()=>sM(c=>(c+1)%t.ld.msgs.length),2200);
    return()=>{clearInterval(a);clearInterval(b)};},[]);
  return <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:360,textAlign:"center"}}>
    <div style={{width:52,height:52,borderRadius:12,marginBottom:20,background:`linear-gradient(135deg,${C.ac},#8B5CF6)`,
      display:"flex",alignItems:"center",justifyContent:"center",animation:"pulse 2s infinite"}}><span style={{fontSize:24}}>⚡</span></div>
    <h2 style={{fontSize:19,fontWeight:700,color:C.tx,margin:"0 0 10px",fontFamily:f2}}>{t.ld.title}</h2>
    <p style={{fontSize:13,color:C.ac,margin:0,fontFamily:f1,fontWeight:500}}>{t.ld.msgs[mi]}{".".repeat(dots)}</p></div>;}

// ═══════════════════════════════════════════════════════════════════
// Landing
// ═══════════════════════════════════════════════════════════════════
function Ln({onStart}){const t=uT();
  return <div style={{animation:"fadeIn 0.6s ease"}}>
    <div style={{textAlign:"center",marginBottom:36}}>
      <div style={{display:"inline-block",padding:"4px 12px",borderRadius:20,background:C.ag,border:`1px solid ${C.ac}33`,
        fontSize:11,color:C.ac,fontWeight:600,marginBottom:16,fontFamily:f1}}>{t.landing.tagline}</div>
      <h1 style={{fontSize:30,fontWeight:700,color:C.tx,margin:"0 0 12px",fontFamily:f2,letterSpacing:"-0.02em",lineHeight:1.25}}>
        {t.landing.title1}<br/><span style={{background:`linear-gradient(135deg,${C.ac},#8B5CF6)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{t.landing.title2}</span>{t.landing.title3}</h1>
      <p style={{fontSize:14,color:C.tm,maxWidth:420,margin:"0 auto",lineHeight:1.6,fontFamily:f1}}>{t.landing.subtitle}</p></div>
    <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:32}}>
      {t.landing.features.map((f,i)=><div key={i} style={{display:"flex",gap:12,padding:"14px 16px",borderRadius:12,background:C.cd,border:`1px solid ${C.bd}`}}>
        <span style={{fontSize:20,flexShrink:0,marginTop:1}}>{f.icon}</span>
        <div><div style={{fontSize:13,fontWeight:600,color:C.tx,fontFamily:f1}}>{f.title}</div>
          <div style={{fontSize:12,color:C.tm,marginTop:2,fontFamily:f1}}>{f.desc}</div></div></div>)}</div>
    <Bt ch={t.landing.cta} o={onStart} sx={{width:"100%",padding:"15px 28px",fontSize:15,borderRadius:10}}/>
    <p style={{textAlign:"center",fontSize:10,color:C.td,marginTop:14,fontFamily:f1}}>{t.landing.footer}</p></div>;}

// ═══════════════════════════════════════════════════════════════════
// Main App
// ═══════════════════════════════════════════════════════════════════
const STEPS = [S1, S2, S3, S4];

export default function App() {
  const [lang, sL] = useState("en");
  // phases: landing | form | loading | gate | report | admin
  const [ph, sP] = useState("landing");
  const [st, sS] = useState(0);
  const [d, sD] = useState({});
  const [rpt, sR] = useState(null);
  const [saved, setSaved] = useState(false);
  const [adminClicks, setAdminClicks] = useState(0);

  const t = i18n[lang];
  const ok = () => {
    if (st === 0) return !!d.pw;
    if (st === 1) return !!d.exp && !!d.job && !!d.name;
    if (st === 2) return (d.achs || []).length > 0;
    if (st === 3) return !!d.end && !!d.ref && !!d.tl;
    return true;
  };

  const nx = async () => {
    if (st < 3) { sS(st + 1); }
    else {
      sP("loading");
      const r = await genRpt(d, lang);
      sR(r || fb(lang));
      sP("gate"); // go to email gate, not directly to report
    }
  };

  const handleEmailUnlock = async (email) => {
    setSaved(false);
    const id = await saveSubmission(email, d.name, d, rpt, lang);
    if (id) setSaved(true);
    sP("report");
  };

  const rst = () => { sP("landing"); sS(0); sD({}); sR(null); setSaved(false); setAdminClicks(0); };

  // Easter egg: click logo 5 times to access admin
  const handleLogoClick = () => {
    const next = adminClicks + 1;
    if (next >= 5) { sP("admin"); setAdminClicks(0); }
    else { setAdminClicks(next); if (ph !== "form" && ph !== "loading" && ph !== "gate") rst(); }
  };

  const St = STEPS[st];

  return <LC.Provider value={lang}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05);opacity:0.85}}
::selection{background:${C.ac}44}*{box-sizing:border-box;margin:0;padding:0}`}</style>
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column" }}>
      {/* Nav */}
      <nav style={{
        padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: `1px solid ${C.bd}`, position: "sticky", top: 0, background: C.bg, zIndex: 10,
      }}>
        <div onClick={handleLogoClick} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8, background: `linear-gradient(135deg,${C.ac},#8B5CF6)`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 700, color: C.wh, fontFamily: f2,
          }}>G</div>
          <span style={{ fontSize: 16, fontWeight: 600, color: C.tx, fontFamily: f1 }}>
            GlobalTalent<span style={{ color: C.ac }}>.ai</span>
          </span>
        </div>
        <button onClick={() => sL(lang === "en" ? "zh" : "en")} style={{
          padding: "5px 14px", borderRadius: 6, border: `1px solid ${C.bd}`,
          background: "transparent", color: C.tm, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: f1,
        }}>{t.nav.lang}</button>
      </nav>

      {/* Content */}
      <div style={{ flex: 1, width: "100%", maxWidth: 540, margin: "0 auto", padding: "28px 18px 40px" }}>
        {ph === "landing" && <Ln onStart={() => sP("form")} />}

        {ph === "form" && <div style={{ animation: "fadeIn 0.4s ease" }}>
          <PB cur={st + 1} tot={4} />
          <St d={d} sD={sD} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, paddingTop: 18, borderTop: `1px solid ${C.bd}` }}>
            <Bt vr="secondary" ch={t.btn.back} o={() => st > 0 ? sS(st - 1) : sP("landing")} />
            <Bt ch={st === 3 ? t.btn.gen : t.btn.next} o={nx} d={!ok()} />
          </div></div>}

        {ph === "loading" && <Ld />}
        {ph === "gate" && <EmailGate rpt={rpt} onUnlock={handleEmailUnlock} />}
        {ph === "report" && <Rpt d={d} rpt={rpt} saved={saved} />}
        {ph === "admin" && <Admin onBack={rst} />}
      </div>

      {/* Footer */}
      <footer style={{ padding: "16px 20px", borderTop: `1px solid ${C.bd}`, textAlign: "center", fontSize: 10, color: C.td, fontFamily: f1 }}>
        © 2026 GlobalTalent.ai — {t.ft}
      </footer>
    </div>
  </LC.Provider>;
}
