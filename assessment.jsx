/* global React */
// Assessment engine — questions, scoring, hints, next steps.
// Identifiers are language-neutral English snake_case; display labels
// are bilingual under each record's `labels: { zh, en }`.

const FIELDS = [
  { id: 'visual_art',         labels: { zh: '视觉艺术',                  en: 'Visual Art' } },
  { id: 'design',             labels: { zh: '设计',                      en: 'Design' },
    availableFrom: '2026-07-01',
    availableNote: { zh: '设计 sub-route 自 2026 年 7 月 1 日起开放', en: 'Design sub-route opens 1 July 2026' } },
  { id: 'fashion',            labels: { zh: '时装',                      en: 'Fashion' } },
  { id: 'film_tv',            labels: { zh: '影视',                      en: 'Film & TV' } },
  { id: 'architecture',       labels: { zh: '建筑',                      en: 'Architecture' } },
  { id: 'performing_arts',    labels: { zh: '表演艺术',                  en: 'Performing Arts' } },
  { id: 'other_arts_culture', labels: { zh: '其他 Arts & Culture 相关领域', en: 'Other Arts & Culture practice' } },
];

const FIELD_EVIDENCE = {
  visual_art: [
    { id: 'va_solo_group_exhibitions',     labels: { zh: '个展 / 群展',                   en: 'Solo / group exhibitions' } },
    { id: 'va_museum_institutional',       labels: { zh: '美术馆 / 机构展出',             en: 'Museum / institutional showings' } },
    { id: 'va_residencies',                labels: { zh: '驻留项目',                      en: 'Residencies' } },
    { id: 'va_commissions',                labels: { zh: '委约创作',                      en: 'Commissions' } },
    { id: 'va_acquisitions',               labels: { zh: '作品被收藏 / 收录',             en: 'Acquisitions / collected works' } },
    { id: 'va_reviews_press',              labels: { zh: '媒体评论 / 专访',               en: 'Reviews / press coverage' } },
    { id: 'va_awards',                     labels: { zh: '艺术奖项 / 提名',               en: 'Awards & nominations' } },
    { id: 'va_publications',               labels: { zh: '公开发表作品 / 画册 / 专题收录', en: 'Publications / catalogue inclusion' } },
  ],
  design: [
    { id: 'd_design_week',                 labels: { zh: '设计展 / 设计周展出',           en: 'Design week / exhibition showings' } },
    { id: 'd_brand_commissions',           labels: { zh: '品牌 / 机构委约项目',           en: 'Brand / institutional commissions' } },
    { id: 'd_realised_work',               labels: { zh: '已落地的设计作品',              en: 'Realised design work' } },
    { id: 'd_trade_press',                 labels: { zh: '专业媒体报道 / 专访',           en: 'Trade press coverage' } },
    { id: 'd_design_awards',               labels: { zh: '设计奖项 / 入围',               en: 'Design awards / shortlists' } },
    { id: 'd_publications',                labels: { zh: '出版 / 专题收录',               en: 'Publications & features' } },
    { id: 'd_institutional_partnerships',  labels: { zh: '机构合作项目',                  en: 'Institutional partnerships' } },
  ],
  fashion: [
    { id: 'f_runway',                      labels: { zh: '时装发布 / runway presentation', en: 'Runway / fashion week presentations' } },
    { id: 'f_collections',                 labels: { zh: '品牌系列 / 联名 / 委约',         en: 'Collections / collaborations / commissions' } },
    { id: 'f_showroom',                    labels: { zh: 'showroom / 展陈 / trade presentation', en: 'Showroom / trade presentations' } },
    { id: 'f_press',                       labels: { zh: '时尚媒体报道 / 专访',           en: 'Fashion press coverage' } },
    { id: 'f_awards',                      labels: { zh: '时装奖项 / 入围',               en: 'Fashion awards / shortlists' } },
    { id: 'f_institutional_collaborations', labels: { zh: '机构合作项目 / 委约项目',       en: 'Institutional collaborations' } },
    { id: 'f_lookbooks',                   labels: { zh: '公开发表作品 / lookbook / 专题收录', en: 'Lookbooks & published features' } },
  ],
  film_tv: [
    { id: 'ft_festival_selections',        labels: { zh: '影片入围 / 放映',               en: 'Festival selections / screenings' } },
    { id: 'ft_curated_programmes',         labels: { zh: '电影节 / 官方单元 / 策展放映',  en: 'Curated festival programmes' } },
    { id: 'ft_credits',                    labels: { zh: '导演 / 编剧 / 制片 / 主创署名作品', en: 'Director / writer / producer credits' } },
    { id: 'ft_distribution',               labels: { zh: '平台播出 / 发行',               en: 'Platform distribution / broadcast' } },
    { id: 'ft_trade_press',                labels: { zh: '专业媒体报道 / 评论',           en: 'Trade press coverage' } },
    { id: 'ft_awards',                     labels: { zh: '影视奖项 / 提名',               en: 'Film awards / nominations' } },
    { id: 'ft_commissions',                labels: { zh: '机构支持 / 委约项目',           en: 'Institutional commissions' } },
  ],
  architecture: [
    { id: 'a_built',                       labels: { zh: '建成项目 / 落地项目',           en: 'Built / realised projects' } },
    { id: 'a_biennials',                   labels: { zh: '建筑展 / 双年展 / 机构展出',    en: 'Architecture biennials / exhibitions' } },
    { id: 'a_competitions',                labels: { zh: '竞赛获奖 / 入围',               en: 'Competition wins / shortlists' } },
    { id: 'a_publications',                labels: { zh: '专业出版 / 专题收录',           en: 'Trade publications / features' } },
    { id: 'a_press',                       labels: { zh: '媒体报道 / 评论',               en: 'Press coverage / reviews' } },
    { id: 'a_commissions',                 labels: { zh: '机构委约 / 合作项目',           en: 'Institutional commissions' } },
    { id: 'a_research_curatorial',         labels: { zh: '研究 / 策展 / 公共项目成果',    en: 'Research / curatorial / public outcomes' } },
  ],
  performing_arts: [
    { id: 'pa_performances',               labels: { zh: '正式演出 / 巡演',               en: 'Public performances / tours' } },
    { id: 'pa_festivals',                  labels: { zh: '音乐节 / 戏剧节 / 艺术节呈现',  en: 'Festival presentations' } },
    { id: 'pa_credits',                    labels: { zh: '主创 / 表演 / 编导署名作品',    en: 'Performance / direction credits' } },
    { id: 'pa_residencies',                labels: { zh: '机构委约 / 驻留 / 合作项目',    en: 'Institutional commissions / residencies' } },
    { id: 'pa_trade_press',                labels: { zh: '专业媒体报道 / 评论',           en: 'Trade press / reviews' } },
    { id: 'pa_awards',                     labels: { zh: '表演艺术奖项 / 提名',           en: 'Performing arts awards' } },
    { id: 'pa_recordings',                 labels: { zh: '录音 / 影像 / 出版成果',        en: 'Recordings / publications' } },
  ],
  other_arts_culture: [
    { id: 'o_partnerships',                labels: { zh: '机构合作项目',                  en: 'Institutional partnerships' } },
    { id: 'o_outcomes',                    labels: { zh: '公开发表成果',                  en: 'Public outcomes' } },
    { id: 'o_trade_press',                 labels: { zh: '专业媒体报道 / 评论',           en: 'Trade press / reviews' } },
    { id: 'o_awards',                      labels: { zh: '奖项 / 提名 / 荣誉',            en: 'Awards & honours' } },
    { id: 'o_residencies',                 labels: { zh: '驻留 / 委约 / 公共项目',        en: 'Residencies / commissions / public projects' } },
    { id: 'o_publications',                labels: { zh: '出版 / 专题收录',               en: 'Publications / features' } },
  ],
};

const EVIDENCE_FALLBACK = [
  { id: 'fb_exhibitions',     labels: { zh: '展览 / 群展 / 个展',                          en: 'Exhibitions / group / solo shows' } },
  { id: 'fb_performances',    labels: { zh: '演出 / 放映 / 节目呈现',                      en: 'Performances / screenings' } },
  { id: 'fb_publications',    labels: { zh: '出版 / 发表 / 专题收录',                      en: 'Publications / features' } },
  { id: 'fb_press',           labels: { zh: '媒体报道 / 评论 / 专访',                      en: 'Press coverage / interviews' } },
  { id: 'fb_awards',          labels: { zh: '奖项 / 提名 / 荣誉',                          en: 'Awards / nominations' } },
  { id: 'fb_residencies',     labels: { zh: '驻留 / 委约 / 机构合作项目',                  en: 'Residencies / commissions / partnerships' } },
  { id: 'fb_public_works',    labels: { zh: '公开发表的作品 / 项目 / 策展 / 创作成果',     en: 'Public works / projects / curatorial outcomes' } },
];

const EVIDENCE_UNSURE = { id: 'evidence_unsure', labels: { zh: '我还不确定哪些算有效证明材料', en: "I'm not sure what counts as valid evidence yet" } };

function getEvidenceOptions(answers) {
  const fields = Array.isArray(answers.fields) ? answers.fields : [];
  const merged = fields.flatMap(f => FIELD_EVIDENCE[f] || []);
  const seen = new Set();
  const unique = merged.filter(opt => seen.has(opt.id) ? false : (seen.add(opt.id), true));
  const base = unique.length ? unique : EVIDENCE_FALLBACK;
  return [...base, EVIDENCE_UNSURE];
}

const QUESTIONS = [
  { id: 'fields', type: 'multi', section: 0, maxSelect: 3,
    title: { en: 'Which fields do you primarily work in?', zh: '你目前主要从事哪些领域？' },
    desc:  { en: 'If your practice spans several areas, pick 1–3 that best represent your recent work.', zh: '如果你的实践跨多个领域，请选择最能代表你近几年主要工作的 1 至 3 个方向。' },
    options: FIELDS },
  { id: 'years', type: 'single', section: 0,
    title: { en: 'How long have you been working in those fields?', zh: '你在这些领域持续工作了多久？' },
    options: [
      { id: 'years_lt_3',    labels: { zh: '少于 3 年',  en: 'Less than 3 years' } },
      { id: 'years_3_5',     labels: { zh: '3–5 年',    en: '3–5 years' } },
      { id: 'years_5_8',     labels: { zh: '5–8 年',    en: '5–8 years' } },
      { id: 'years_8_12',    labels: { zh: '8–12 年',   en: '8–12 years' } },
      { id: 'years_12_plus', labels: { zh: '12 年以上', en: '12+ years' } },
    ] },
  { id: 'stage', type: 'single', section: 0,
    title: { en: 'Where are you in considering the UK Global Talent Visa (Arts & Culture)?', zh: '你目前考虑申请 UK Global Talent Visa (Arts & Culture) 的状态更接近哪一种？' },
    options: [
      { id: 'stage_just_starting',         labels: { zh: '我只是刚开始了解',             en: 'Just starting to look into it' } },
      { id: 'stage_studied_requirements',  labels: { zh: '我已经认真看过官方要求',       en: 'I have studied the official requirements' } },
      { id: 'stage_gathering',             labels: { zh: '我已经开始整理材料',           en: 'I have started gathering materials' } },
      { id: 'stage_clear_plan',            labels: { zh: '我已经有比较明确的申请计划',   en: 'I have a clear application plan' } },
      { id: 'stage_stuck',                 labels: { zh: '我原本准备申请，但现在卡住了', en: 'I was preparing but I am stuck' } },
    ] },
  { id: 'evidenceTypes', type: 'multi', section: 1,
    title: { en: 'Which evidence types do you already have in documentable, verifiable form?', zh: '你目前已经具备哪些较明确、且更接近你所选方向的证明材料类型？' },
    desc:  { en: 'Multi-select. Options adjust to the fields you picked.', zh: '可多选。结果会按你之前选择的方向自动调整。' },
    exclusiveOption: 'evidence_unsure',
    getOptions: getEvidenceOptions },
  { id: 'recency', type: 'single', section: 1,
    title: { en: 'When does your strongest evidence mostly fall?', zh: '你目前最重要的证明材料，主要集中在哪个时间范围内？' },
    options: [
      { id: 'recency_last_1_2',      labels: { zh: '大多发生在最近 1–2 年',                   en: 'Mostly in the last 1–2 years' } },
      { id: 'recency_last_3_5',      labels: { zh: '大多发生在最近 3–5 年',                   en: 'Mostly in the last 3–5 years' } },
      { id: 'recency_around_5',      labels: { zh: '分布在 5 年内外，但 5 年内仍有一部分',    en: 'Spread around 5 years, with some recent' } },
      { id: 'recency_older_than_5',  labels: { zh: '大多早于 5 年前',                          en: 'Mostly older than 5 years' } },
      { id: 'recency_unsure',        labels: { zh: '我不确定',                                 en: 'Not sure' } },
    ] },
  { id: 'sourceNature', type: 'single', section: 1,
    title: { en: 'Where does your strongest evidence mostly come from?', zh: '你目前最重要的证明材料，主要来自哪一类实践？' },
    options: [
      { id: 'source_professional',          labels: { zh: '主要来自毕业后的 Arts & Culture 专业实践',                       en: 'Mostly post-grad Arts & Culture professional practice' } },
      { id: 'source_mostly_professional',   labels: { zh: '大多来自毕业后的 Arts & Culture 专业实践，但夹杂少量学生或商业项目', en: 'Mostly professional, with some student / commercial work' } },
      { id: 'source_mixed',                 labels: { zh: 'Arts & Culture 专业实践、学生项目、商业项目都有',                en: 'A mix of professional, student and commercial work' } },
      { id: 'source_mostly_commercial',     labels: { zh: '大多来自商业项目',                                               en: 'Mostly commercial work' } },
      { id: 'source_mostly_student',        labels: { zh: '大多来自学生时期项目',                                           en: 'Mostly student work' } },
    ] },
  { id: 'evidenceStrength', type: 'single', section: 1,
    title: { en: 'Which best describes the overall state of your evidence?', zh: '这些证明材料的整体情况更接近哪一种？' },
    options: [
      { id: 'strength_weak_scattered',  labels: { zh: '有一些经历，但大多较弱、零散，或者难以支持申请', en: 'Some experience, but mostly weak or scattered' } },
      { id: 'strength_few_strong',      labels: { zh: '有少量较强证明材料，但整体还不够稳',             en: 'A few strong items, but not yet stable' } },
      { id: 'strength_several_clear',   labels: { zh: '已经有几项相对明确、可验证的证明材料',           en: 'Several clear, verifiable items' } },
      { id: 'strength_solid',           labels: { zh: '证明材料基础较完整，类型和质量都还不错',         en: 'Solid foundation across types and quality' } },
      { id: 'strength_unsure',          labels: { zh: '我不确定',                                       en: 'Not sure' } },
    ] },
  { id: 'verifiability', type: 'single', section: 1,
    title: { en: 'How much of your evidence can be externally verified?', zh: '这些证明材料中，有多少可以被外部验证？' },
    options: [
      { id: 'verify_very_little', labels: { zh: '很少可以验证',     en: 'Very little' } },
      { id: 'verify_some',        labels: { zh: '有一部分可以验证', en: 'Some of it' } },
      { id: 'verify_most',        labels: { zh: '大部分可以验证',   en: 'Most of it' } },
      { id: 'verify_almost_all',  labels: { zh: '几乎都可以验证',   en: 'Almost all of it' } },
    ] },
  { id: 'recommenderCount', type: 'single', section: 2,
    title: { en: 'Roughly how many people might be willing to write you a recommendation letter?', zh: '你现在大概能想到几位可能愿意为你写推荐信的人？' },
    options: [
      { id: 'count_0',      labels: { zh: '0 位',     en: '0 people' } },
      { id: 'count_1',      labels: { zh: '1 位',     en: '1 person' } },
      { id: 'count_2',      labels: { zh: '2 位',     en: '2 people' } },
      { id: 'count_3',      labels: { zh: '3 位',     en: '3 people' } },
      { id: 'count_4_plus', labels: { zh: '4 位或以上', en: '4 or more' } },
    ] },
  { id: 'recommenderQuality', type: 'multi', section: 2,
    title: { en: 'Which best describes your potential recommenders?', zh: '这些潜在推荐人目前更接近哪种情况？' },
    desc:  { en: 'Multi-select. If unsure, pick only "Not sure they qualify".', zh: '可多选。若你目前还拿不准，请只选「我不确定他们是否符合要求」。' },
    exclusiveOption: 'quality_unsure',
    options: [
      { id: 'quality_real_collaboration',    labels: { zh: '和我有真实合作经历',          en: 'I have real collaboration history with them' } },
      { id: 'quality_distinct_institutions', labels: { zh: '来自不同机构',                en: 'They are from distinct institutions' } },
      { id: 'quality_field_weight',          labels: { zh: '在行业内有一定分量或认可度',  en: 'They carry weight or recognition in the field' } },
      { id: 'quality_substantive_letters',   labels: { zh: '我有把握他们能写出具体内容',  en: "I'm confident they can write substantive letters" } },
      { id: 'quality_unsure',                labels: { zh: '我不确定他们是否符合要求',    en: "I'm not sure they qualify" } },
    ] },
  { id: 'lettersConfidence', type: 'single', section: 2,
    title: { en: 'How confident are you that you can secure 3 substantive recommendation letters right now?', zh: '如果现在就开始联系，你觉得自己拿到 3 封有实质内容的推荐信的把握有多大？' },
    options: [
      { id: 'letters_very_low',  labels: { zh: '很低',   en: 'Very low' } },
      { id: 'letters_low',       labels: { zh: '比较低', en: 'Low' } },
      { id: 'letters_medium',    labels: { zh: '一般',   en: 'Medium' } },
      { id: 'letters_high',      labels: { zh: '比较高', en: 'High' } },
      { id: 'letters_very_high', labels: { zh: '很高',   en: 'Very high' } },
    ] },
  { id: 'narrative', type: 'single', section: 3,
    title: { en: 'Can you clearly articulate your Arts & Culture practice, and why the UK fits?', zh: '你现在是否能比较清楚地说明：你的 Arts & Culture 实践是什么，以及你为什么适合在英国继续发展？' },
    options: [
      { id: 'narrative_not_yet',     labels: { zh: '现在还说不清',         en: 'Not yet' } },
      { id: 'narrative_vague',       labels: { zh: '有一些想法，但比较模糊', en: 'Some ideas, but vague' } },
      { id: 'narrative_rough',       labels: { zh: '大致能说清',           en: 'Roughly yes' } },
      { id: 'narrative_clear',       labels: { zh: '说得比较清楚',         en: 'Clearly' } },
      { id: 'narrative_very_clear',  labels: { zh: '说得很清楚',           en: 'Very clearly' } },
    ] },
  { id: 'selfReadiness', type: 'single', section: 3,
    title: { en: 'How close do you feel to actually submitting an application?', zh: '如果现在要做整体判断，你觉得自己离正式提交申请更接近哪一种状态？' },
    options: [
      { id: 'readiness_far',          labels: { zh: '还差很远',                 en: 'Far from ready' } },
      { id: 'readiness_some_basis',   labels: { zh: '有一些基础，但差距明显',   en: 'Some basis, but clear gaps' } },
      { id: 'readiness_ready',        labels: { zh: '可以开始认真准备',         en: 'Ready to prepare seriously' } },
      { id: 'readiness_close',        labels: { zh: '已经接近可申请',           en: 'Close to applicable' } },
      { id: 'readiness_unsure',       labels: { zh: '我不确定',                 en: 'Not sure' } },
    ] },
];

const SECTION_LABELS = {
  en: ['Fields & experience', 'Evidence', 'Recommenders', 'Narrative & readiness'],
  zh: ['领域与经历', '证据', '推荐人', '叙述与准备状态'],
};

const SCORE_MAPS = {
  years:            { years_lt_3: 1, years_3_5: 2, years_5_8: 3, years_8_12: 4, years_12_plus: 5 },
  stage:            { stage_just_starting: 1, stage_studied_requirements: 2, stage_gathering: 3, stage_clear_plan: 4, stage_stuck: 4 },
  recency:          { recency_last_1_2: 10, recency_last_3_5: 9, recency_around_5: 5, recency_older_than_5: 1, recency_unsure: 2 },
  sourceNature:     { source_professional: 12, source_mostly_professional: 10, source_mixed: 6, source_mostly_commercial: 1, source_mostly_student: 0 },
  evidenceStrength: { strength_weak_scattered: 2, strength_few_strong: 5, strength_several_clear: 8, strength_solid: 10, strength_unsure: 3 },
  verifiability:    { verify_very_little: 1, verify_some: 2, verify_most: 4, verify_almost_all: 5 },
  recommenderCount: { count_0: 0, count_1: 2, count_2: 5, count_3: 8, count_4_plus: 10 },
  lettersConfidence:{ letters_very_low: 1, letters_low: 2, letters_medium: 3, letters_high: 4, letters_very_high: 5 },
  narrative:        { narrative_not_yet: 1, narrative_vague: 3, narrative_rough: 6, narrative_clear: 8, narrative_very_clear: 10 },
  selfReadiness:    { readiness_far: 1, readiness_some_basis: 2, readiness_ready: 4, readiness_close: 5, readiness_unsure: 2 },
};

function evidenceTypeScore(selected) {
  const clean = (selected || []).filter(v => v !== 'evidence_unsure');
  const n = clean.length;
  if (n <= 0) return 0;
  if (n === 1) return 3;
  if (n === 2) return 7;
  if (n === 3) return 8;
  return 9;
}
function recommenderQualityScore(count, selected) {
  const set = new Set(selected || []);
  if (!count || count === 'count_0') return 0;
  if (set.has('quality_unsure')) return count === 'count_1' ? 1 : 0;
  let raw = 0;
  if (set.has('quality_real_collaboration')) raw += 3;
  if (set.has('quality_distinct_institutions')) raw += 2;
  if (set.has('quality_field_weight')) raw += 3;
  if (set.has('quality_substantive_letters')) raw += 2;
  const capMap = { count_1: 3, count_2: 6, count_3: 8, count_4_plus: 10 };
  return Math.min(raw, capMap[count] || 0);
}

const FIELD_BY_ID = Object.fromEntries(FIELDS.map(f => [f.id, f]));
function getRouteLabel(field, lang) {
  const entry = FIELD_BY_ID[field];
  if (!entry) return field;
  return entry.labels[lang] || entry.labels.en;
}

const HINTS = {
  weakEvidence: {
    visual_art:         { zh: '你当前可识别的视觉艺术证据还不够稳，尤其要看展览、驻留、委约、收藏或公开发表记录能不能撑起申请。', en: 'Your identifiable Visual Art evidence is thin — exhibitions, residencies, commissions, collections or publications need to actually carry the application.' },
    design:             { zh: '你当前可识别的设计证据还不够稳，尤其要看落地项目、机构合作、专业发布或奖项能不能形成支撑。',     en: 'Your identifiable Design evidence is thin — realised projects, institutional partnerships, trade publications or awards need to provide real backing.' },
    fashion:            { zh: '你当前可识别的时装证据还不够稳，尤其要看发布、系列、机构合作、媒体或奖项能不能形成支撑。',     en: 'Your identifiable Fashion evidence is thin — collections, presentations, partnerships, press or awards need to actually back the application.' },
    film_tv:            { zh: '你当前可识别的影视证据还不够稳，尤其要看作品署名、节展、放映、发行或媒体记录能不能形成支撑。', en: 'Your identifiable Film & TV evidence is thin — credits, festivals, screenings, distribution and press need to back the application.' },
    architecture:       { zh: '你当前可识别的建筑证据还不够稳，尤其要看建成项目、竞赛、展出、出版或机构合作能不能形成支撑。', en: 'Your identifiable Architecture evidence is thin — built work, competitions, exhibitions, publications and partnerships need to back the application.' },
    performing_arts:    { zh: '你当前可识别的表演艺术证据还不够稳，尤其要看正式演出、节展、机构合作、署名作品或评论能不能形成支撑。', en: 'Your identifiable Performing Arts evidence is thin — formal performances, festivals, partnerships, credits and reviews need to back the application.' },
    other_arts_culture: { zh: '你当前可识别的专业证据还不够稳，尤其要看公开成果、机构合作、媒体或奖项能不能形成支撑。',       en: 'Your identifiable professional evidence is thin — public outcomes, partnerships, press or awards need to back the application.' },
  },
  oldEvidence:       { all: { zh: '你当前最重要的证据主要早于近五年，这会明显削弱当前申请支撑力。',                       en: 'Your strongest evidence is mostly older than five years — that materially weakens current application support.' } },
  studentProject:    { all: { zh: '你目前的核心证据更偏向学生时期项目，这通常不足以支撑成熟申请。',                       en: 'Your core evidence skews toward student-era projects, which usually cannot support a mature application.' } },
  commercialProject: { all: { zh: '你目前的核心证据更偏向商业项目，这类材料未必能直接转化为申请核心支撑。',             en: 'Your core evidence is mostly commercial — that does not always translate to core application support.' } },
  weakLetters:       { all: { zh: '你当前的推荐信网络偏弱，这会直接影响申请能否真正推进。',                              en: 'Your recommendation-letter network is weak — that directly affects whether the application can move forward.' } },
  weakNarrative:     { all: { zh: '你目前还不能清楚说明自己的实践是什么，以及为什么适合在英国继续发展。',               en: 'You cannot yet articulate clearly what your practice is and why the UK is the right next step.' } },
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

// Override summary when the evidence axis is below ACE-application range,
// regardless of how strong the other two axes look. For ACE the evidence
// axis is the substantive gate — recommenders and readiness can support
// an application but cannot substitute for it.
const EVIDENCE_GAP_SUMMARY = {
  en: 'Evidence base is not yet at application range. For the ACE pathway, evidence is the deciding gap — strong recommenders and readiness can support an application but cannot substitute for it.',
  zh: '证据基础还未达到可申请范围。对 ACE 路径来说，证据是决定性的缺口——再强的推荐人与准备状态可以支撑申请，但无法替代证据。',
};

function calculateResult(answers, lang) {
  const selectedFields = Array.isArray(answers.fields) && answers.fields.length ? answers.fields : ['other_arts_culture'];

  function calcRoute(field) {
    let evidence = 0;
    evidence += evidenceTypeScore(answers.evidenceTypes);
    evidence += SCORE_MAPS.recency[answers.recency] || 0;
    evidence += SCORE_MAPS.sourceNature[answers.sourceNature] || 0;
    evidence += SCORE_MAPS.evidenceStrength[answers.evidenceStrength] || 0;
    evidence += SCORE_MAPS.verifiability[answers.verifiability] || 0;

    let recommenders = 0;
    recommenders += SCORE_MAPS.recommenderCount[answers.recommenderCount] || 0;
    recommenders += recommenderQualityScore(answers.recommenderCount, answers.recommenderQuality);
    recommenders += SCORE_MAPS.lettersConfidence[answers.lettersConfidence] || 0;

    let readiness = 0;
    readiness += SCORE_MAPS.years[answers.years] || 0;
    readiness += SCORE_MAPS.stage[answers.stage] || 0;
    readiness += SCORE_MAPS.narrative[answers.narrative] || 0;
    readiness += SCORE_MAPS.selfReadiness[answers.selfReadiness] || 0;

    let total = evidence + recommenders + readiness;
    const hints = [];

    const evidenceTypes = (answers.evidenceTypes || []).filter(v => v !== 'evidence_unsure');
    if (evidenceTypes.length < 2) {
      evidence = Math.min(evidence, 28);
      hints.push(hint('weakEvidence', field, lang));
    }
    if (answers.recency === 'recency_older_than_5') { total -= 5; hints.push(hint('oldEvidence', field, lang)); }
    if (answers.sourceNature === 'source_mostly_student') { evidence = Math.min(evidence, 22); total -= 8; hints.push(hint('studentProject', field, lang)); }
    if (answers.sourceNature === 'source_mostly_commercial') { evidence = Math.min(evidence, 22); total -= 8; hints.push(hint('commercialProject', field, lang)); }
    if (answers.recommenderCount === 'count_0' || answers.recommenderCount === 'count_1') {
      const uncertainOnly = Array.isArray(answers.recommenderQuality) && answers.recommenderQuality.length === 1 && answers.recommenderQuality[0] === 'quality_unsure';
      recommenders = Math.min(recommenders, answers.recommenderCount === 'count_0' ? 2 : (uncertainOnly ? 3 : 5));
      hints.push(hint('weakLetters', field, lang));
    }
    if (answers.recommenderCount === 'count_2') recommenders = Math.min(recommenders, 9);
    if (answers.narrative === 'narrative_not_yet' || answers.narrative === 'narrative_vague') hints.push(hint('weakNarrative', field, lang));

    evidence     = Math.max(0, Math.min(40, evidence));
    recommenders = Math.max(0, Math.min(30, recommenders));
    readiness    = Math.max(0, Math.min(30, readiness));
    total = Math.max(0, Math.min(100, evidence + recommenders + readiness));

    // Evidence gate — for ACE the evidence axis is the substantive gate.
    // Below 15/40, cap the headline total at 49 so a strong recommender /
    // readiness stack does not pull a thin-evidence profile into a
    // misleadingly high score.
    if (evidence < 15) total = Math.min(total, 49);

    let band = 'low';
    if (total >= 40 && total <= 69) band = 'mid';
    if (total >= 70) band = 'high';

    // Below 20/40 evidence, override the route summary with copy that
    // names the gap explicitly — independent of band, since a borderline
    // case (uncapped total but evidence still below application range)
    // still needs the framing.
    const summary = evidence < 20
      ? EVIDENCE_GAP_SUMMARY[lang]
      : ROUTE_SUMMARIES[band][lang];

    return {
      field, label: getRouteLabel(field, lang), total, band, summary,
      metrics: { evidence, recommenders, readiness },
      hints: hints.filter(Boolean).slice(0, 3),
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
  FIELDS, FIELD_EVIDENCE, EVIDENCE_FALLBACK, EVIDENCE_UNSURE,
  QUESTIONS, SECTION_LABELS, SCORE_MAPS,
  calculateResult, getRouteLabel,
  AnswersContext, useAnswers, AnswersProvider,
});
