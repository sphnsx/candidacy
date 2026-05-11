/* global React */
// Assessment engine — Candidacy Scan v2.
// Identifiers are language-neutral English snake_case; display labels are
// bilingual under each record's `labels: { zh, en }`. Sub-route logic reads
// from FIELDS[*].sub_route (1–5) per reference/ace_routes.json.

const FIELDS = [
  { id: 'visual_art',         sub_route: 1,
    labels: { en: 'Visual arts (drawing, painting, sculpture, photography as art, installation, performance)',
              zh: '视觉艺术（绘画、雕塑、艺术摄影、装置、行为）' } },
  { id: 'performing_arts',    sub_route: 1,
    labels: { en: 'Performing arts (theatre, dance, music, opera)',
              zh: '表演艺术（戏剧、舞蹈、音乐、歌剧）' } },
  { id: 'literature',         sub_route: 1,
    labels: { en: 'Literature (poetry, fiction, literary non-fiction)',
              zh: '文学（诗歌、小说、文学性非虚构）' } },
  { id: 'film_tv',            sub_route: 2, et_only: true,
    labels: { en: 'Film, television, animation, post-production, VFX',
              zh: '影视、动画、后期、VFX' } },
  { id: 'fashion',            sub_route: 3,
    labels: { en: 'Fashion design',
              zh: '时尚设计' } },
  { id: 'architecture',       sub_route: 4,
    labels: { en: 'Architecture',
              zh: '建筑' } },
  { id: 'design',             sub_route: 5,
    availableFrom: '2026-07-01',
    availableNote: { zh: '设计 sub-route 自 2026 年 7 月 1 日起开放', en: 'Design sub-route opens 1 July 2026' },
    labels: { en: 'Design (graphic, product, industrial, UX, service, branding, typography, craft)',
              zh: '设计（平面、产品、工业、UX、服务、品牌、字体、工艺）' } },
  { id: 'other_arts_culture', sub_route: 1,
    labels: { en: 'Other arts and culture practice',
              zh: '其他艺术与文化实践' } },
];

const FIELD_BY_ID = Object.fromEntries(FIELDS.map(f => [f.id, f]));

// Evidence options are surfaced in two layers: cross-cutting (always shown)
// plus sub-route-specific (shown only when the user's Q1 selection includes
// that sub-route). Every option carries a category_id mapping to ACE's
// canonical evidence categories — see reference/ace_routes.json.

const EVIDENCE_CROSS_CUTTING = [
  { id: 'ev_media_recognition',        category_id: 'media_recognition',
    labels: { en: 'Articles, reviews, features, or critiques about my work in named media outlets',
              zh: '名义媒体对我作品的报道、评论、深度文章或评论' } },
  { id: 'ev_awards',                   category_id: 'awards',
    labels: { en: "Awards or prize nominations I've won or received",
              zh: '我获得的奖项或提名' } },
  { id: 'ev_appearances',              category_id: 'appearances',
    labels: { en: 'Exhibitions, screenings, performances, or publications of my work',
              zh: '我作品的展览、放映、演出或出版' } },
  { id: 'ev_distribution',             category_id: 'distribution',
    labels: { en: 'Distribution or sales evidence (sales records, streaming/download data, retail stockists)',
              zh: '发行或销售数据（销售记录、流媒体或下载数据、零售商铺货）' } },
  { id: 'ev_leadership_residencies',   category_id: 'appearances',
    labels: { en: 'Leadership roles in residencies, masterclasses, workshops, or teaching engagements',
              zh: '在 residency、masterclass、workshop 或教学项目中担任主讲或带领角色' } },
  { id: 'ev_commissions',              category_id: 'commissions',
    labels: { en: 'Commissions from institutions, brands, or organisations',
              zh: '来自机构、品牌或组织的委托' } },
];

const EVIDENCE_BY_SUB_ROUTE = {
  // Sub-route 1: Combined Arts / Visual Arts (ACE direct).
  1: [
    { id: 'sr1_solo_exhibitions',      category_id: 'appearances',
      labels: { en: 'Solo exhibitions at established galleries',
                zh: '成熟画廊的个展' } },
    { id: 'sr1_group_exhibitions',     category_id: 'appearances',
      labels: { en: 'Group exhibitions at established galleries or museums',
                zh: '成熟画廊或博物馆的群展' } },
    { id: 'sr1_biennial_inclusion',    category_id: 'appearances',
      labels: { en: 'Inclusion in biennials or major curated international shows',
                zh: '双年展或主要国际策展项目' } },
  ],
  // Sub-route 2: Film/TV (Pact, ET only).
  2: [
    { id: 'sr2_named_festivals',       category_id: 'appearances',
      labels: { en: 'Festival selections or screenings at named festivals',
                zh: '名义电影节的入选或放映' } },
    { id: 'sr2_theatrical_release',    category_id: 'distribution',
      labels: { en: 'Theatrical releases',
                zh: '院线发行' } },
    { id: 'sr2_streaming',             category_id: 'distribution',
      labels: { en: 'Streaming distribution with named platforms',
                zh: '名义流媒体平台的发行' } },
    { id: 'sr2_major_awards',          category_id: 'awards',
      labels: { en: 'Award wins or nominations at major industry awards (Oscars, BAFTA, Golden Globe, Emmy)',
                zh: '主要行业奖项的获奖或提名（Oscars、BAFTA、Golden Globe、Emmy）' } },
  ],
  // Sub-route 3: Fashion (BFC).
  3: [
    { id: 'sr3_catwalk',               category_id: 'appearances',
      labels: { en: 'Catwalk or presentation slots at fashion-week-tier events',
                zh: '时装周级别活动的走秀或 presentation' } },
    { id: 'sr3_stockists',             category_id: 'distribution',
      labels: { en: 'Stockists at named retailers',
                zh: '名义零售商的铺货' } },
    { id: 'sr3_industry_awards',       category_id: 'awards',
      labels: { en: 'Industry award wins or nominations',
                zh: '行业奖项的获奖或提名' } },
    { id: 'sr3_graduating_collection', category_id: 'appearances', ep_only: true,
      labels: { en: '(EP only) Industry recognition for an exceptional graduating collection',
                zh: '（仅 EP）杰出毕业系列获得的行业认可' } },
  ],
  // Sub-route 4: Architecture (RIBA).
  4: [
    { id: 'sr4_publications',          category_id: 'media_recognition',
      labels: { en: 'Built or unbuilt work published in named international architectural publications',
                zh: '在名义国际建筑出版物上发表的建成或未建成项目' } },
    { id: 'sr4_awards',                category_id: 'awards',
      labels: { en: 'Major architecture award wins or nominations',
                zh: '主要建筑奖项的获奖或提名' } },
    { id: 'sr4_venice_biennale',       category_id: 'appearances',
      labels: { en: 'Inclusion in the Venice Biennale of Architecture or comparable',
                zh: '威尼斯建筑双年展或同等规模项目' } },
  ],
  // Sub-route 5: Design (from 1 July 2026).
  5: [
    { id: 'sr5_publications',          category_id: 'media_recognition',
      labels: { en: 'Work published in named international design publications',
                zh: '在名义国际设计出版物上发表的作品' } },
    { id: 'sr5_awards',                category_id: 'awards',
      labels: { en: 'International design awards',
                zh: '国际设计奖项' } },
    { id: 'sr5_design_week',           category_id: 'appearances',
      labels: { en: 'Design Week / triennial / biennial inclusion',
                zh: 'Design Week / 三年展 / 双年展入选' } },
    { id: 'sr5_distribution',          category_id: 'distribution',
      labels: { en: 'Distribution evidence (sales, manufacturer adoption, licensing)',
                zh: '发行证据（销售、制造商采用、授权）' } },
  ],
};

const EVIDENCE_NONE_YET = { id: 'ev_none_yet',
  labels: { en: 'None of the above yet',
            zh: '目前以上都没有' } };

// Legacy export name preserved for screen-quiz compat; the data shape now
// flows through getEvidenceOptions() rather than a per-field-id lookup.
const FIELD_EVIDENCE = {};

const EVIDENCE_FALLBACK = EVIDENCE_CROSS_CUTTING;

const EVIDENCE_UNSURE = EVIDENCE_NONE_YET;

function getEvidenceOptions(answers) {
  const fields = Array.isArray(answers.fields) ? answers.fields : [];
  const subRoutes = new Set();
  fields.forEach(f => {
    const sr = FIELD_BY_ID[f]?.sub_route;
    if (sr) subRoutes.add(sr);
  });
  const routeSpecific = [...subRoutes].flatMap(r => EVIDENCE_BY_SUB_ROUTE[r] || []);
  const seen = new Set();
  const all = [...EVIDENCE_CROSS_CUTTING, ...routeSpecific].filter(opt =>
    seen.has(opt.id) ? false : (seen.add(opt.id), true));
  return [...all, EVIDENCE_NONE_YET];
}

const QUESTIONS = [
  // ─── Section 0 · Discipline and experience ────────────────────────
  { id: 'fields', type: 'multi', section: 0, maxSelect: 3,
    title: { en: 'Which of these best describe your practice?',
             zh: '以下选项中，哪些最能描述你的实践？' },
    desc:  { en: 'You can pick up to three. If your practice spans several areas, pick the closest 1–3.',
             zh: '最多选 3 项。如果你的实践跨多个领域，请选择最贴近的 1 至 3 个方向。' },
    options: FIELDS },

  { id: 'years', type: 'single', section: 0,
    title: { en: 'How many years have you been working professionally in this field?',
             zh: '你在该领域的专业从业年数？' },
    options: [
      { id: 'years_lt_3',     labels: { en: 'Less than 3 years',  zh: '不到 3 年' } },
      { id: 'years_3_5',      labels: { en: '3–5 years',          zh: '3–5 年' } },
      { id: 'years_5_10',     labels: { en: '5–10 years',         zh: '5–10 年' } },
      { id: 'years_10_plus',  labels: { en: 'More than 10 years', zh: '10 年以上' } },
    ] },

  { id: 'stage', type: 'single', section: 0,
    title: { en: 'How would you describe your current career stage?',
             zh: '你目前的职业阶段？' },
    options: [
      { id: 'stage_early',        labels: { en: 'Early career — building track record and recognition',                  zh: '早期——正在建立履历与认知度' } },
      { id: 'stage_mid',          labels: { en: 'Mid career — established practice, working to deepen recognition',      zh: '中期——已建立稳定的实践，正在深化领域内的认可' } },
      { id: 'stage_established',  labels: { en: 'Established — recognised as a leader or near-leader in your area',      zh: '资深——在所属领域被认可为 leader 或接近 leader' } },
      { id: 'stage_unsure',       labels: { en: 'Not sure',                                                                zh: '不确定' } },
    ] },

  // ─── Section 1 · Evidence ─────────────────────────────────────────
  { id: 'evidenceTypes', type: 'multi', section: 1,
    title: { en: 'Which of the following do you currently have? Select all that apply.',
             zh: '你目前已有的证据类型，可多选。' },
    desc:  { en: 'Options below adapt to the sub-route(s) you picked. Cross-cutting options appear for everyone.',
             zh: '下方选项会根据你选择的 sub-route 自适应。跨方向选项对所有人显示。' },
    exclusiveOption: 'ev_none_yet',
    getOptions: getEvidenceOptions },

  { id: 'recency', type: 'single', section: 1,
    title: { en: 'When was most of your strongest evidence produced?',
             zh: '你最有力的证据大多产生于什么时期？' },
    options: [
      { id: 'recency_within_3',      labels: { en: 'All within the last 3 years',           zh: '全部在最近 3 年内' } },
      { id: 'recency_within_5',      labels: { en: 'Most within the last 5 years',          zh: '大部分在最近 5 年内' } },
      { id: 'recency_5_to_10',       labels: { en: 'Most within the last 5–10 years',       zh: '大部分在最近 5–10 年间' } },
      { id: 'recency_more_than_10',  labels: { en: 'Most more than 10 years ago',           zh: '大部分在 10 年以上之前' } },
      { id: 'recency_mixed',         labels: { en: 'Mixed across these periods',            zh: '跨多个时期' } },
    ] },

  { id: 'sourceNature', type: 'single', section: 1,
    title: { en: 'What proportion of your strongest evidence comes from work produced during, or immediately after, a degree programme?',
             zh: '你最有力的证据中，有多少是在攻读学位期间或刚毕业不久完成的？' },
    options: [
      { id: 'source_none_degree', labels: { en: 'None — all of it postdates my studies by several years',                       zh: '没有——全部都是毕业数年之后的成果' } },
      { id: 'source_some_degree', labels: { en: 'Some — a minority is degree-adjacent',                                          zh: '少部分——少量与学位相关' } },
      { id: 'source_half_degree', labels: { en: 'About half',                                                                    zh: '大约一半' } },
      { id: 'source_most_degree', labels: { en: 'Most — my strongest evidence is degree work or immediately post-graduation',    zh: '大部分——我最有力的证据是学位作品或刚毕业不久的作品' } },
      { id: 'source_no_degree',   labels: { en: "Not applicable — I don't have a formal degree in this field",                   zh: '不适用——我没有该领域的正式学位' } },
    ] },

  { id: 'verifiability', type: 'single', section: 1,
    title: { en: 'For your strongest evidence, how readily can it be independently verified — for example, by someone reading articles, viewing exhibition pages, or checking award listings online?',
             zh: '你最有力的证据中，有多少可以由第三方独立核实（例如通过在线文章、展览页面、奖项公示）？' },
    options: [
      { id: 'verify_all_online',      labels: { en: 'All of it has clear online verification',                         zh: '全部都有清晰的在线可核实途径' } },
      { id: 'verify_most_online',     labels: { en: 'Most has online verification; some is older or print-only',       zh: '大部分有在线核实途径；部分是较早的或仅纸本' } },
      { id: 'verify_mixed',           labels: { en: 'Mixed — some verifiable, some not',                                zh: '混合——部分可核实，部分不可' } },
      { id: 'verify_mostly_offline',  labels: { en: "Most isn't easily verifiable online — it's older, print-only, or behind paywalls", zh: '大部分难以在线核实——是较早的、仅纸本或在付费墙后' } },
      { id: 'verify_havent_checked',  labels: { en: "I haven't checked",                                                 zh: '我没有检查过' } },
    ] },

  { id: 'selfReadiness', type: 'single', section: 1,
    title: { en: 'Where do you think you currently stand on readiness for a Global Talent application?',
             zh: '你目前对自己 Global Talent 申请的准备度作何判断？' },
    options: [
      { id: 'readiness_not_yet',   labels: { en: "Probably not yet — I'm building toward this",                       zh: '还没准备好——正在朝这个方向积累' } },
      { id: 'readiness_mid_way',   labels: { en: 'Mid-way — some strong evidence, clear gaps',                        zh: '半途——有一部分强证据，但有明显缺口' } },
      { id: 'readiness_closer',    labels: { en: 'Closer than not — most evidence is in place, refining the case',     zh: '接近——大部分证据已就位，正在打磨案例' } },
      { id: 'readiness_ready',     labels: { en: "Ready or close to ready — preparing to submit within 6 months",      zh: '已经准备好或接近准备好——计划在未来 6 个月内提交' } },
      { id: 'readiness_unsure',    labels: { en: "Honestly not sure — that's why I'm here",                            zh: '老实说不确定——所以来这里' } },
    ] },

  // ─── Section 2 · Recommenders ─────────────────────────────────────
  { id: 'recommenderCount', type: 'single', section: 2,
    title: { en: 'Three letters of recommendation are required. How many do you currently have lined up?',
             zh: 'ACE 要求 3 封推荐信。你目前有几位推荐人已落实？' },
    desc:  { en: 'ACE assesses exactly 3 letters — any submitted beyond 3 are disregarded.',
             zh: 'ACE 仅评估 3 封推荐信——超出的不予审阅。' },
    options: [
      { id: 'rec_all_3_confirmed',  labels: { en: 'All three confirmed and committed',                           zh: '三位已确认并承诺撰写' } },
      { id: 'rec_two_confirmed',    labels: { en: 'Two confirmed, working on the third',                          zh: '两位已确认，正在落实第三位' } },
      { id: 'rec_one_confirmed',    labels: { en: 'One confirmed, working on the other two',                       zh: '一位已确认，正在落实另两位' } },
      { id: 'rec_none_confirmed',   labels: { en: "None confirmed yet — I have ideas but haven't approached anyone", zh: '暂无确认——有想法但尚未联系' } },
      { id: 'rec_havent_thought',   labels: { en: "I haven't thought about recommenders yet",                       zh: '还没有考虑推荐人' } },
    ] },

  { id: 'recommenderQuality', type: 'multi', section: 2,
    title: { en: 'Looking at the recommenders you have or are considering, which of the following describe them?',
             zh: '你已落实或正在考虑的推荐人中，以下哪些描述适用？' },
    desc:  { en: 'Select all that apply. If you don\'t yet know who you\'d ask, pick only the last option.',
             zh: '可多选。若还不确定该找谁，请只选最后一项。' },
    exclusiveOption: 'rq_not_sure',
    options: [
      { id: 'rq_working_relationship', labels: { en: 'At least one has a documented past or current working relationship with me', zh: '至少一位与我有可证明的过去或现在的工作关系' } },
      { id: 'rq_senior_org',           labels: { en: 'They include senior figures at well-established organisations (e.g. CEO, Artistic Director, Principal, Chair, equivalent)', zh: '包含成熟机构的资深职位（如 CEO、Artistic Director、Principal、Chair 或同等）' } },
      { id: 'rq_distinct_orgs',        labels: { en: 'They span different organisations (no two from the same place)',              zh: '来自不同机构（不会有两位来自同一处）' } },
      { id: 'rq_uk_based',             labels: { en: 'At least one is based in the UK',                                              zh: '至少一位常驻英国' } },
      { id: 'rq_recognised_expert',    labels: { en: 'At least one is a recognised expert in my specific area of practice',         zh: '至少一位是我所在具体方向的公认专家' } },
      { id: 'rq_not_sure',             labels: { en: "I'm not yet sure who I'd ask",                                                 zh: '还不确定该找谁' } },
    ] },

  { id: 'lettersConfidence', type: 'single', section: 2,
    title: { en: "How confident are you that your recommenders can write substantive letters that meet ACE's specific content requirements — not generic references, but letters with specific working-relationship detail, UK-benefit content, and required organisational details?",
             zh: '你对推荐人能否写出符合 ACE 具体内容要求的实质性推荐信有多大信心？（不是泛泛的推荐，而是包含具体工作关系、对英国的贡献内容、必要机构信息的推荐信）' },
    options: [
      { id: 'lc_very_confident',  labels: { en: "Very confident — they know what's needed and can deliver",        zh: '很有信心——他们知道需要什么并能交付' } },
      { id: 'lc_somewhat',        labels: { en: "Somewhat confident — they're capable but will need guidance",      zh: '有一定信心——他们有能力但需要指引' } },
      { id: 'lc_uncertain',       labels: { en: "Uncertain — I don't yet know what ACE requires of these letters",   zh: '不确定——我还不清楚 ACE 对这些信件的具体要求' } },
      { id: 'lc_concerned',       labels: { en: "Concerned — I think there's a gap between what's needed and what I can get", zh: '担心——我认为需求与我能获得的存在差距' } },
    ] },

  // ─── Section 3 · Narrative and readiness ──────────────────────────
  { id: 'narrative', type: 'text', section: 3,
    title: { en: "In one sentence, what's the case you'd make for your endorsement?",
             zh: '用一句话说明：你为什么认为自己有资格获得 endorsement？' },
    desc:  { en: "One sentence only. If you can't compress it to one sentence yet, that's part of what the assessment will help with.",
             zh: '仅一句话。如果你目前还无法压缩到一句话，这本身就是评估会帮助你看清的问题之一。' },
    maxLength: 280 },

  { id: 'prior_application', type: 'single', section: 3,
    title: { en: 'Have you previously applied for the UK Global Talent visa, on this or any other route?',
             zh: '你此前是否申请过英国 Global Talent 签证（任一路径）？' },
    options: [
      { id: 'pa_first',        labels: { en: 'No, this would be my first application',          zh: '没有，这将是我的首次申请' } },
      { id: 'pa_endorsed',     labels: { en: 'Yes — endorsed (you can skip ahead)',              zh: '申请过——已获得 endorsement（可跳过其余）' } },
      { id: 'pa_declined',     labels: { en: 'Yes — declined at endorsement stage',              zh: '申请过——在 endorsement 阶段被拒' } },
      { id: 'pa_withdrew',     labels: { en: 'Yes — withdrew before submission',                  zh: '申请过——提交前撤回' } },
      { id: 'pa_considering',  labels: { en: 'Yes — considering reapplying',                      zh: '申请过——正在考虑再次申请' } },
    ] },
];

const SECTION_LABELS = {
  en: ['Discipline & experience', 'Evidence', 'Recommenders', 'Narrative & readiness'],
  zh: ['学科与经历', '证据', '推荐人', '叙述与准备状态'],
};

const SCORE_MAPS = {
  years:            { years_lt_3: 1, years_3_5: 2, years_5_10: 4, years_10_plus: 5 },
  stage:            { stage_early: 2, stage_mid: 4, stage_established: 5, stage_unsure: 2 },
  recency:          { recency_within_3: 10, recency_within_5: 9, recency_5_to_10: 4, recency_more_than_10: 1, recency_mixed: 5 },
  sourceNature:     { source_none_degree: 12, source_some_degree: 10, source_half_degree: 5, source_most_degree: 0, source_no_degree: 12 },
  verifiability:    { verify_all_online: 9, verify_most_online: 7, verify_mixed: 4, verify_mostly_offline: 1, verify_havent_checked: 2 },
  recommenderCount: { rec_all_3_confirmed: 10, rec_two_confirmed: 6, rec_one_confirmed: 3, rec_none_confirmed: 1, rec_havent_thought: 0 },
  lettersConfidence:{ lc_very_confident: 5, lc_somewhat: 3, lc_uncertain: 2, lc_concerned: 1 },
  selfReadiness:    { readiness_not_yet: 1, readiness_mid_way: 3, readiness_closer: 4, readiness_ready: 5, readiness_unsure: 2 },
};

// narrative is a free-text one-sentence prompt. Length-based score reflects
// what the Scan can detect: concision. The Preview generator reads the text
// itself for UK framing, evidence anchoring, track alignment.
// Weight raised so the readiness pillar can reach its 30 cap at the max.
function narrativeScore(text) {
  const s = (text || '').trim();
  if (!s) return 0;
  if (s.length <= 140) return 15;
  if (s.length <= 260) return 9;
  return 4;
}

function evidenceTypeScore(selected) {
  const clean = (selected || []).filter(v => v !== 'ev_none_yet');
  const n = clean.length;
  if (n <= 0) return 0;
  if (n === 1) return 3;
  if (n === 2) return 7;
  if (n === 3) return 8;
  return 9;
}

function recommenderQualityScore(count, selected) {
  const set = new Set(selected || []);
  if (!count || count === 'rec_havent_thought') return 0;
  if (set.has('rq_not_sure')) return count === 'rec_one_confirmed' ? 1 : 0;
  let raw = 0;
  if (set.has('rq_working_relationship')) raw += 3;
  if (set.has('rq_senior_org'))           raw += 3;
  if (set.has('rq_distinct_orgs'))        raw += 2;
  if (set.has('rq_uk_based'))             raw += 2;
  if (set.has('rq_recognised_expert'))    raw += 2;
  const capMap = { rec_none_confirmed: 2, rec_one_confirmed: 3, rec_two_confirmed: 6, rec_all_3_confirmed: 10 };
  return Math.min(raw, capMap[count] || 0);
}

function getRouteLabel(field, lang) {
  const entry = FIELD_BY_ID[field];
  if (!entry) return field;
  return entry.labels[lang] || entry.labels.en;
}

const HINTS = {
  weakEvidence: {
    visual_art:         { zh: '你当前可识别的视觉艺术证据还不够稳，尤其要看展览、驻留、委约、收藏或公开发表记录能不能撑起申请。', en: 'Your identifiable Visual Art evidence is thin — exhibitions, residencies, commissions, collections or publications need to actually carry the application.' },
    performing_arts:    { zh: '你当前可识别的表演艺术证据还不够稳，尤其要看正式演出、节展、机构合作、署名作品或评论能不能形成支撑。', en: 'Your identifiable Performing Arts evidence is thin — formal performances, festivals, partnerships, credits and reviews need to back the application.' },
    literature:         { zh: '你当前可识别的文学证据还不够稳，尤其要看出版、评论、翻译、奖项与朗读 / 演出能不能形成支撑。',          en: 'Your identifiable Literature evidence is thin — publications, reviews, translations, awards and readings need to back the application.' },
    design:             { zh: '你当前可识别的设计证据还不够稳，尤其要看落地项目、机构合作、专业发布或奖项能不能形成支撑。',           en: 'Your identifiable Design evidence is thin — realised projects, institutional partnerships, trade publications or awards need to provide real backing.' },
    fashion:            { zh: '你当前可识别的时装证据还不够稳，尤其要看发布、系列、机构合作、媒体或奖项能不能形成支撑。',             en: 'Your identifiable Fashion evidence is thin — collections, presentations, partnerships, press or awards need to actually back the application.' },
    film_tv:            { zh: '你当前可识别的影视证据还不够稳，尤其要看作品署名、节展、放映、发行或媒体记录能不能形成支撑。',         en: 'Your identifiable Film & TV evidence is thin — credits, festivals, screenings, distribution and press need to back the application.' },
    architecture:       { zh: '你当前可识别的建筑证据还不够稳，尤其要看建成项目、竞赛、展出、出版或机构合作能不能形成支撑。',         en: 'Your identifiable Architecture evidence is thin — built work, competitions, exhibitions, publications and partnerships need to back the application.' },
    other_arts_culture: { zh: '你当前可识别的专业证据还不够稳，尤其要看公开成果、机构合作、媒体或奖项能不能形成支撑。',               en: 'Your identifiable professional evidence is thin — public outcomes, partnerships, press or awards need to back the application.' },
  },
  oldEvidence:        { all: { zh: '你当前最重要的证据主要早于近五年，这会明显削弱当前申请支撑力。',                                                                                                                                  en: 'Your strongest evidence is mostly older than five years — that materially weakens current application support.' } },
  studentProject:     { all: { zh: '你目前最有力的证据主要是学位作品或刚毕业不久的作品。ACE 不接受学生作品作为证据——这会直接影响申请基础。',                                                                                          en: 'Your strongest evidence is mostly degree work or immediately post-graduation. ACE does not accept student work as evidence — this materially undermines the application base.' } },
  weakLetters:        { all: { zh: '你当前的推荐信网络偏弱，这会直接影响申请能否真正推进。',                                                                                                                                          en: 'Your recommendation-letter network is weak — that directly affects whether the application can move forward.' } },
  weakNarrative:      { all: { zh: '你目前还没能把申请理由压缩到一句话。这本身是个信号——通常意味着候选论点还没有成形。',                                                                                                              en: "You haven't yet compressed your case for endorsement into a single sentence. That is itself a signal — usually that the working theory of your candidacy hasn't yet formed." } },
  // Route-aware hints.
  etOnlyFilmTV:       { all: { zh: '影视方向只评估 Exceptional Talent——Pact 不评估 Exceptional Promise。如果你处于早期阶段、计划走 EP 路径，这条 sub-route 对你不开放。',                                                              en: 'Film/TV applies only Exceptional Talent — Pact does not assess Exceptional Promise. If you are early-career and counting on an EP route, this sub-route is not available to you.' } },
  filmTVRecencyNuance:{ all: { zh: '影视方向的时效规则按 pathway 区分——Pathway 1 的获奖记录不限时间，提名 10 年内有效。一般的 5 年标准可能把仍在窗口内的合规证据误判为过期。',                                                          en: "Film/TV recency rules vary by pathway — Pathway 1 wins count at any time, nominations within 10 years. A generic 5-year reading can flag legitimately in-window evidence as out-of-window." } },
  studentWorkEPCaveat:{ all: { zh: 'Fashion EP 第 4 类（毕业系列）与 Architecture EP 第 2 类（RIBA Silver/Bronze、AIA Young Architects）明确接受学位作品。如果你申请的是这两个方向的 EP，学位作品不会被自动排除——但是否计入仍取决于证据属于哪一类。', en: 'Fashion EP Cat 4 (graduating collection) and Architecture EP Cat 2 (RIBA Silver/Bronze, AIA Young Architects) explicitly admit degree work. If you are applying Exceptional Promise on Fashion or Architecture, your degree work is not automatically excluded — but whether it counts depends on the specific category your evidence fits.' } },
  designPreOperational:{ all: { zh: 'Design sub-route 自 2026 年 7 月 1 日起开放。在此之前提交的设计实践通常落入 Visual Arts 框架——会被按视觉艺术标准评估，而不是 Design sub-route 标准。',                                            en: 'The Design sub-route is operational from 1 July 2026. Before then, design practice typically falls under Visual Arts — assessed against the Visual Arts framework, not the Design sub-route framework.' } },
  // prior_application hints.
  priorEndorsed:      { all: { zh: '你已经获得 endorsement——Candidacy 体检 主要面向尚未通过 endorsement 的申请人。你已不需要这份评估。',                                                                                                en: "You're already endorsed — the Candidacy Scan is built for applicants still working toward endorsement. You don't need this assessment." } },
  priorDeclined:      { all: { zh: '你之前申请被拒。Endorsement review 仅有 28 个日历日窗口、不接受新证据；重新申请需要完整签证费。诊断需要把这点纳入——不只是路径选择，更是证据结构是否需要重新构造。',                                  en: 'Your prior application was declined. Endorsement review is a 28-calendar-day window with no new evidence accepted; reapplication requires the full visa fee. Diagnosis needs to read this as a structural fact — often the evidence pattern needs to change, not just the route.' } },
};

function hint(kind, field, lang) {
  const map = HINTS[kind];
  if (!map) return '';
  const entry = map[field] || map.all || map.other_arts_culture;
  return entry ? entry[lang] : '';
}

const NEXT_STEPS_GENERIC = {
  low: { zh: ['核心材料的范围目前尚未明确——公开成果、机构合作与媒体记录之间的层级关系还没有确立。', '近五年内可验证的专业成果在 profile 中分布稀疏。', '现有经历的形态偏向零散，尚未呈现出清晰的专业实践路径。'],
         en: ['The range of what counts as core evidence is not yet defined — the hierarchy between public outcomes, partnerships, and press records has not been established.', 'Verifiable professional outcomes from the last five years are sparse in the current profile.', 'The current experience reads as scattered rather than as a coherent professional path.'] },
  mid: { zh: ['可用的材料已经存在，但其中哪些机构合作、公开成果与外部验证最能支撑申请，目前仍不清晰。', '第三方背书——媒体、奖项与出版——是证据结构中相对最薄弱的一项。', '专业路径与英国发展叙事之间的连接，在现有证据结构中仍偏弱。'],
         en: ['There is material to work with, but which partnerships, public outcomes and external validation most strongly back the application is not yet clear.', 'Third-party validation — press, awards, publications — is currently the weakest component of the evidence base.', 'The connection between professional path and UK rationale is underdeveloped in the current evidence structure.'] },
  high:{ zh: ['最强的机构合作、公开成果与第三方背书已经可以辨识；但现有证据的覆盖面比申请实际所需更宽。', '推荐人与代表性成果之间的对应关系，是当前一致性最弱的一块。', '专业路径、影响力与申请结构都已具备，但尚未整合为一条主线。'],
         en: ['The strongest partnerships, public outcomes and third-party backing are identifiable; the body of evidence is currently broader than the application requires.', 'The correspondence between recommenders and the signature outcomes is the area where alignment is least consistent.', 'Professional path, influence and application structure are all present but have not yet consolidated into a single spine.'] },
};
function nextSteps(field, band, lang) { return NEXT_STEPS_GENERIC[band][lang]; }

const ROUTE_SUMMARIES = {
  low:  { zh: '你目前还不适合按这条路径进入正式申请准备。',                      en: 'You are not yet ready to formally prepare on this route.' },
  mid:  { zh: '按这条路径看，你已经有一定基础，但距离稳定申请还差一段。',         en: 'On this route you have a basis, but you are not yet at stable-application range.' },
  high: { zh: '按这条路径看，你已经具备一定申请基础。',                           en: 'On this route you already have a viable application basis.' },
};

const EVIDENCE_GAP_SUMMARY = {
  en: 'Evidence base is not yet at application range. For the ACE pathway, evidence is the deciding gap — strong recommenders and readiness can support an application but cannot substitute for it.',
  zh: '证据基础还未达到可申请范围。对 ACE 路径来说，证据是决定性的缺口——再强的推荐人与准备状态可以支撑申请，但无法替代证据。',
};

// Design sub-route operational date — pre-this-date selection routes design
// practice through Visual Arts framing rather than the Design sub-route.
const DESIGN_OPERATIONAL_DATE = '2026-07-01';

function calculateResult(answers, lang) {
  const selectedFields = Array.isArray(answers.fields) && answers.fields.length ? answers.fields : ['other_arts_culture'];

  function calcRoute(field) {
    const routeMeta = FIELD_BY_ID[field] || {};
    const subRoute  = routeMeta.sub_route;
    const etOnly    = !!routeMeta.et_only;

    let evidence = 0;
    evidence += evidenceTypeScore(answers.evidenceTypes);
    evidence += SCORE_MAPS.recency[answers.recency] || 0;
    evidence += SCORE_MAPS.sourceNature[answers.sourceNature] || 0;
    evidence += SCORE_MAPS.verifiability[answers.verifiability] || 0;

    let recommenders = 0;
    recommenders += SCORE_MAPS.recommenderCount[answers.recommenderCount] || 0;
    recommenders += recommenderQualityScore(answers.recommenderCount, answers.recommenderQuality);
    recommenders += SCORE_MAPS.lettersConfidence[answers.lettersConfidence] || 0;

    let readiness = 0;
    readiness += SCORE_MAPS.years[answers.years] || 0;
    readiness += SCORE_MAPS.stage[answers.stage] || 0;
    readiness += narrativeScore(answers.narrative);
    readiness += SCORE_MAPS.selfReadiness[answers.selfReadiness] || 0;

    let total = evidence + recommenders + readiness;
    const hints = [];

    // prior_application is the highest-priority finding when it indicates a
    // structural change to the case (already-endorsed → not for Candidacy at
    // all; declined → review window + fresh fee + evidence pattern shift).
    if (answers.prior_application === 'pa_endorsed') {
      hints.push(hint('priorEndorsed', field, lang));
    } else if (answers.prior_application === 'pa_declined' || answers.prior_application === 'pa_considering') {
      hints.push(hint('priorDeclined', field, lang));
    }

    // Route-aware hints fire next so they bubble above generic ones.
    if (etOnly && answers.stage === 'stage_early') {
      hints.push(hint('etOnlyFilmTV', field, lang));
    }
    if (subRoute === 2) {
      hints.push(hint('filmTVRecencyNuance', field, lang));
    }
    if (subRoute === 5) {
      const today = new Date().toISOString().slice(0, 10);
      if (today < DESIGN_OPERATIONAL_DATE) {
        hints.push(hint('designPreOperational', field, lang));
      }
    }

    const evidenceTypes = (answers.evidenceTypes || []).filter(v => v !== 'ev_none_yet');
    if (evidenceTypes.length < 2) {
      evidence = Math.min(evidence, 28);
      hints.push(hint('weakEvidence', field, lang));
    }
    if (answers.recency === 'recency_more_than_10') {
      total -= 5;
      hints.push(hint('oldEvidence', field, lang));
    }
    if (answers.sourceNature === 'source_most_degree') {
      evidence = Math.min(evidence, 22);
      total -= 8;
      hints.push(hint('studentProject', field, lang));
      if (subRoute === 3 || subRoute === 4) {
        hints.push(hint('studentWorkEPCaveat', field, lang));
      }
    }
    // Weak letters: nobody confirmed (0 confirmed = none_confirmed or
    // havent_thought). one_confirmed gets a softer cap. Two and three
    // confirmed proceed normally.
    if (answers.recommenderCount === 'rec_havent_thought' || answers.recommenderCount === 'rec_none_confirmed' || answers.recommenderCount === 'rec_one_confirmed') {
      const uncertainOnly = Array.isArray(answers.recommenderQuality) && answers.recommenderQuality.length === 1 && answers.recommenderQuality[0] === 'rq_not_sure';
      let cap = 5;
      if (answers.recommenderCount === 'rec_havent_thought') cap = 2;
      else if (answers.recommenderCount === 'rec_none_confirmed') cap = uncertainOnly ? 3 : 4;
      else if (answers.recommenderCount === 'rec_one_confirmed') cap = uncertainOnly ? 5 : 7;
      recommenders = Math.min(recommenders, cap);
      hints.push(hint('weakLetters', field, lang));
    }
    if (answers.recommenderCount === 'rec_two_confirmed') recommenders = Math.min(recommenders, 14);

    {
      const narr = (answers.narrative || '').trim();
      if (!narr || narr.length > 260) hints.push(hint('weakNarrative', field, lang));
    }

    evidence     = Math.max(0, Math.min(40, evidence));
    recommenders = Math.max(0, Math.min(30, recommenders));
    readiness    = Math.max(0, Math.min(30, readiness));
    total = Math.max(0, Math.min(100, evidence + recommenders + readiness));

    if (evidence < 15) total = Math.min(total, 49);

    let band = 'low';
    if (total >= 40 && total <= 69) band = 'mid';
    if (total >= 70) band = 'high';

    const summary = evidence < 20
      ? EVIDENCE_GAP_SUMMARY[lang]
      : ROUTE_SUMMARIES[band][lang];

    return {
      field, label: getRouteLabel(field, lang), total, band, summary,
      metrics: { evidence, recommenders, readiness },
      hints: hints.filter(Boolean).slice(0, 4),
      nextSteps: nextSteps(field, band, lang),
    };
  }

  const routeResults = selectedFields.map(calcRoute).sort((a, b) => b.total - a.total);
  const primary = routeResults[0];
  return {
    total: primary.total, band: primary.band,
    metrics: primary.metrics, hints: primary.hints, nextSteps: primary.nextSteps,
    primary, alternates: routeResults.slice(1), routeResults,
  };
}

// ─── Cross-screen state ───────────────────────────────────────────────────
const AnswersContext = React.createContext({
  answers: {}, setAnswer: () => {}, toggleMulti: () => {}, reset: () => {},
  step: 0, setStep: () => {},
});
function useAnswers() { return React.useContext(AnswersContext); }

function AnswersProvider({ children }) {
  const [answers, setAnswers] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('candidacy_answers_v2') || '{}'); } catch (e) { return {}; }
  });
  const [step, setStep] = React.useState(() => {
    try { return Number(localStorage.getItem('candidacy_step_v2') || 0) || 0; } catch (e) { return 0; }
  });
  React.useEffect(() => {
    try { localStorage.setItem('candidacy_answers_v2', JSON.stringify(answers)); } catch (e) {}
  }, [answers]);
  React.useEffect(() => {
    try { localStorage.setItem('candidacy_step_v2', String(step)); } catch (e) {}
  }, [step]);

  const setAnswer = React.useCallback((id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  }, []);
  const toggleMulti = React.useCallback((id, value, max, exclusive) => {
    setAnswers(prev => {
      const cur = Array.isArray(prev[id]) ? prev[id] : [];
      let next;
      if (cur.includes(value)) {
        next = cur.filter(v => v !== value);
      } else {
        if (exclusive && value === exclusive) next = [exclusive];
        else if (exclusive && cur.includes(exclusive)) next = [value];
        else next = [...cur, value];
        if (max && next.length > max) next = next.slice(-max);
      }
      return { ...prev, [id]: next };
    });
  }, []);
  const reset = React.useCallback(() => {
    setAnswers({}); setStep(0);
    try { localStorage.removeItem('candidacy_answers_v2'); localStorage.removeItem('candidacy_step_v2'); } catch (e) {}
  }, []);

  const ctx = React.useMemo(() => ({ answers, setAnswer, toggleMulti, reset, step, setStep }), [answers, step, setAnswer, toggleMulti, reset]);
  return <AnswersContext.Provider value={ctx}>{children}</AnswersContext.Provider>;
}

Object.assign(window, {
  FIELDS, FIELD_BY_ID, FIELD_EVIDENCE, EVIDENCE_CROSS_CUTTING, EVIDENCE_BY_SUB_ROUTE,
  EVIDENCE_FALLBACK, EVIDENCE_UNSURE, EVIDENCE_NONE_YET,
  QUESTIONS, SECTION_LABELS, SCORE_MAPS,
  calculateResult, getRouteLabel,
  AnswersContext, useAnswers, AnswersProvider,
});
