/* global React */
// Assessment engine — questions, scoring, hints, next steps.
// Ported from legacy-scan.html. Stable answer keys are Chinese strings (preserved
// to keep score maps and hints working unchanged); display labels are bilingual.

const FIELDS = [
  ['视觉艺术', 'Visual Art'],
  ['设计', 'Design'],
  ['时装', 'Fashion'],
  ['影视', 'Film & TV'],
  ['建筑', 'Architecture'],
  ['表演艺术', 'Performing Arts'],
  ['其他 Arts & Culture 相关领域', 'Other Arts & Culture practice'],
];

const FIELD_EVIDENCE = {
  '视觉艺术': [
    ['个展 / 群展', 'Solo / group exhibitions'],
    ['美术馆 / 机构展出', 'Museum / institutional showings'],
    ['驻留项目', 'Residencies'],
    ['委约创作', 'Commissions'],
    ['作品被收藏 / 收录', 'Acquisitions / collected works'],
    ['媒体评论 / 专访', 'Reviews / press coverage'],
    ['艺术奖项 / 提名', 'Awards & nominations'],
    ['公开发表作品 / 画册 / 专题收录', 'Publications / catalogue inclusion'],
  ],
  '设计': [
    ['设计展 / 设计周展出', 'Design week / exhibition showings'],
    ['品牌 / 机构委约项目', 'Brand / institutional commissions'],
    ['已落地的设计作品', 'Realised design work'],
    ['专业媒体报道 / 专访', 'Trade press coverage'],
    ['设计奖项 / 入围', 'Design awards / shortlists'],
    ['出版 / 专题收录', 'Publications & features'],
    ['机构合作项目', 'Institutional partnerships'],
  ],
  '时装': [
    ['时装发布 / runway presentation', 'Runway / fashion week presentations'],
    ['品牌系列 / 联名 / 委约', 'Collections / collaborations / commissions'],
    ['showroom / 展陈 / trade presentation', 'Showroom / trade presentations'],
    ['时尚媒体报道 / 专访', 'Fashion press coverage'],
    ['时装奖项 / 入围', 'Fashion awards / shortlists'],
    ['机构合作项目 / 委约项目', 'Institutional collaborations'],
    ['公开发表作品 / lookbook / 专题收录', 'Lookbooks & published features'],
  ],
  '影视': [
    ['影片入围 / 放映', 'Festival selections / screenings'],
    ['电影节 / 官方单元 / 策展放映', 'Curated festival programmes'],
    ['导演 / 编剧 / 制片 / 主创署名作品', 'Director / writer / producer credits'],
    ['平台播出 / 发行', 'Platform distribution / broadcast'],
    ['专业媒体报道 / 评论', 'Trade press coverage'],
    ['影视奖项 / 提名', 'Film awards / nominations'],
    ['机构支持 / 委约项目', 'Institutional commissions'],
  ],
  '建筑': [
    ['建成项目 / 落地项目', 'Built / realised projects'],
    ['建筑展 / 双年展 / 机构展出', 'Architecture biennials / exhibitions'],
    ['竞赛获奖 / 入围', 'Competition wins / shortlists'],
    ['专业出版 / 专题收录', 'Trade publications / features'],
    ['媒体报道 / 评论', 'Press coverage / reviews'],
    ['机构委约 / 合作项目', 'Institutional commissions'],
    ['研究 / 策展 / 公共项目成果', 'Research / curatorial / public outcomes'],
  ],
  '表演艺术': [
    ['正式演出 / 巡演', 'Public performances / tours'],
    ['音乐节 / 戏剧节 / 艺术节呈现', 'Festival presentations'],
    ['主创 / 表演 / 编导署名作品', 'Performance / direction credits'],
    ['机构委约 / 驻留 / 合作项目', 'Institutional commissions / residencies'],
    ['专业媒体报道 / 评论', 'Trade press / reviews'],
    ['表演艺术奖项 / 提名', 'Performing arts awards'],
    ['录音 / 影像 / 出版成果', 'Recordings / publications'],
  ],
  '其他 Arts & Culture 相关领域': [
    ['机构合作项目', 'Institutional partnerships'],
    ['公开发表成果', 'Public outcomes'],
    ['专业媒体报道 / 评论', 'Trade press / reviews'],
    ['奖项 / 提名 / 荣誉', 'Awards & honours'],
    ['驻留 / 委约 / 公共项目', 'Residencies / commissions / public projects'],
    ['出版 / 专题收录', 'Publications / features'],
  ],
};
const EVIDENCE_FALLBACK = [
  ['展览 / 群展 / 个展', 'Exhibitions / group / solo shows'],
  ['演出 / 放映 / 节目呈现', 'Performances / screenings'],
  ['出版 / 发表 / 专题收录', 'Publications / features'],
  ['媒体报道 / 评论 / 专访', 'Press coverage / interviews'],
  ['奖项 / 提名 / 荣誉', 'Awards / nominations'],
  ['驻留 / 委约 / 机构合作项目', 'Residencies / commissions / partnerships'],
  ['公开发表的作品 / 项目 / 策展 / 创作成果', 'Public works / projects / curatorial outcomes'],
];
const EVIDENCE_UNSURE = ['我还不确定哪些算有效证明材料', "I'm not sure what counts as valid evidence yet"];

function getEvidenceOptions(answers) {
  const fields = Array.isArray(answers.fields) ? answers.fields : [];
  const merged = fields.flatMap(f => FIELD_EVIDENCE[f] || []);
  const seen = new Set();
  const unique = merged.filter(([zh]) => seen.has(zh) ? false : (seen.add(zh), true));
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
    options: [['少于 3 年', 'Less than 3 years'], ['3–5 年', '3–5 years'], ['5–8 年', '5–8 years'], ['8–12 年', '8–12 years'], ['12 年以上', '12+ years']] },
  { id: 'stage', type: 'single', section: 0,
    title: { en: 'Where are you in considering the UK Global Talent Visa (Arts & Culture)?', zh: '你目前考虑申请 UK Global Talent Visa (Arts & Culture) 的状态更接近哪一种？' },
    options: [['我只是刚开始了解', 'Just starting to look into it'], ['我已经认真看过官方要求', 'I have studied the official requirements'], ['我已经开始整理材料', 'I have started gathering materials'], ['我已经有比较明确的申请计划', 'I have a clear application plan'], ['我原本准备申请，但现在卡住了', 'I was preparing but I am stuck']] },
  { id: 'evidenceTypes', type: 'multi', section: 1,
    title: { en: 'Which evidence types do you already have in documentable, verifiable form?', zh: '你目前已经具备哪些较明确、且更接近你所选方向的证明材料类型？' },
    desc:  { en: 'Multi-select. Options adjust to the fields you picked.', zh: '可多选。结果会按你之前选择的方向自动调整。' },
    getOptions: getEvidenceOptions },
  { id: 'recency', type: 'single', section: 1,
    title: { en: 'When does your strongest evidence mostly fall?', zh: '你目前最重要的证明材料，主要集中在哪个时间范围内？' },
    options: [['大多发生在最近 1–2 年', 'Mostly in the last 1–2 years'], ['大多发生在最近 3–5 年', 'Mostly in the last 3–5 years'], ['分布在 5 年内外，但 5 年内仍有一部分', 'Spread around 5 years, with some recent'], ['大多早于 5 年前', 'Mostly older than 5 years'], ['我不确定', 'Not sure']] },
  { id: 'sourceNature', type: 'single', section: 1,
    title: { en: 'Where does your strongest evidence mostly come from?', zh: '你目前最重要的证明材料，主要来自哪一类实践？' },
    options: [['主要来自毕业后的 Arts & Culture 专业实践', 'Mostly post-grad Arts & Culture professional practice'], ['大多来自毕业后的 Arts & Culture 专业实践，但夹杂少量学生或商业项目', 'Mostly professional, with some student / commercial work'], ['Arts & Culture 专业实践、学生项目、商业项目都有', 'A mix of professional, student and commercial work'], ['大多来自商业项目', 'Mostly commercial work'], ['大多来自学生时期项目', 'Mostly student work']] },
  { id: 'evidenceStrength', type: 'single', section: 1,
    title: { en: 'Which best describes the overall state of your evidence?', zh: '这些证明材料的整体情况更接近哪一种？' },
    options: [['有一些经历，但大多较弱、零散，或者难以支持申请', 'Some experience, but mostly weak or scattered'], ['有少量较强证明材料，但整体还不够稳', 'A few strong items, but not yet stable'], ['已经有几项相对明确、可验证的证明材料', 'Several clear, verifiable items'], ['证明材料基础较完整，类型和质量都还不错', 'Solid foundation across types and quality'], ['我不确定', 'Not sure']] },
  { id: 'verifiability', type: 'single', section: 1,
    title: { en: 'How much of your evidence can be externally verified?', zh: '这些证明材料中，有多少可以被外部验证？' },
    options: [['很少可以验证', 'Very little'], ['有一部分可以验证', 'Some of it'], ['大部分可以验证', 'Most of it'], ['几乎都可以验证', 'Almost all of it']] },
  { id: 'recommenderCount', type: 'single', section: 2,
    title: { en: 'Roughly how many people might be willing to write you a recommendation letter?', zh: '你现在大概能想到几位可能愿意为你写 recommendation letters 的人？' },
    options: [['0 位', '0 people'], ['1 位', '1 person'], ['2 位', '2 people'], ['3 位', '3 people'], ['4 位或以上', '4 or more']] },
  { id: 'recommenderQuality', type: 'multi', section: 2,
    title: { en: 'Which best describes your potential recommenders?', zh: '这些潜在推荐人目前更接近哪种情况？' },
    desc:  { en: 'Multi-select. If unsure, pick only "Not sure they qualify".', zh: '可多选。若你目前还拿不准，请只选「我不确定他们是否符合要求」。' },
    exclusiveOption: '我不确定他们是否符合要求',
    options: [['和我有真实合作经历', 'I have real collaboration history with them'], ['来自不同机构', 'They are from distinct institutions'], ['在行业内有一定分量或认可度', 'They carry weight or recognition in the field'], ['我有把握他们能写出具体内容', "I'm confident they can write substantive letters"], ['我不确定他们是否符合要求', "I'm not sure they qualify"]] },
  { id: 'lettersConfidence', type: 'single', section: 2,
    title: { en: 'How confident are you that you can secure 3 substantive recommendation letters right now?', zh: '如果现在就开始联系，你觉得自己拿到 3 封有实质内容的 recommendation letters 的把握有多大？' },
    options: [['很低', 'Very low'], ['比较低', 'Low'], ['一般', 'Medium'], ['比较高', 'High'], ['很高', 'Very high']] },
  { id: 'narrative', type: 'single', section: 3,
    title: { en: 'Can you clearly articulate your Arts & Culture practice, and why the UK fits?', zh: '你现在是否能比较清楚地说明：你的 Arts & Culture 实践是什么，以及你为什么适合在英国继续发展？' },
    options: [['现在还说不清', 'Not yet'], ['有一些想法，但比较模糊', 'Some ideas, but vague'], ['大致能说清', 'Roughly yes'], ['说得比较清楚', 'Clearly'], ['说得很清楚', 'Very clearly']] },
  { id: 'selfReadiness', type: 'single', section: 3,
    title: { en: 'How close do you feel to actually submitting an application?', zh: '如果现在要做整体判断，你觉得自己离正式提交申请更接近哪一种状态？' },
    options: [['还差很远', 'Far from ready'], ['有一些基础，但差距明显', 'Some basis, but clear gaps'], ['可以开始认真准备', 'Ready to prepare seriously'], ['已经接近可申请', 'Close to applicable'], ['我不确定', 'Not sure']] },
];

const SECTION_LABELS = {
  en: ['Fields & experience', 'Evidence', 'Recommenders', 'Narrative & readiness'],
  zh: ['领域与经历', '证据', '推荐人', '叙述与准备状态'],
};

const SCORE_MAPS = {
  years: { '少于 3 年': 1, '3–5 年': 2, '5–8 年': 3, '8–12 年': 4, '12 年以上': 5 },
  stage: { '我只是刚开始了解': 1, '我已经认真看过官方要求': 2, '我已经开始整理材料': 3, '我已经有比较明确的申请计划': 4, '我原本准备申请，但现在卡住了': 4 },
  recency: { '大多发生在最近 1–2 年': 10, '大多发生在最近 3–5 年': 9, '分布在 5 年内外，但 5 年内仍有一部分': 5, '大多早于 5 年前': 1, '我不确定': 2 },
  sourceNature: { '主要来自毕业后的 Arts & Culture 专业实践': 15, '大多来自毕业后的 Arts & Culture 专业实践，但夹杂少量学生或商业项目': 11, 'Arts & Culture 专业实践、学生项目、商业项目都有': 6, '大多来自商业项目': 1, '大多来自学生时期项目': 0 },
  evidenceStrength: { '有一些经历，但大多较弱、零散，或者难以支持申请': 2, '有少量较强证明材料，但整体还不够稳': 5, '已经有几项相对明确、可验证的证明材料': 8, '证明材料基础较完整，类型和质量都还不错': 10, '我不确定': 3 },
  verifiability: { '很少可以验证': 1, '有一部分可以验证': 2, '大部分可以验证': 4, '几乎都可以验证': 5 },
  recommenderCount: { '0 位': 0, '1 位': 2, '2 位': 5, '3 位': 8, '4 位或以上': 10 },
  lettersConfidence: { '很低': 1, '比较低': 2, '一般': 3, '比较高': 4, '很高': 5 },
  narrative: { '现在还说不清': 1, '有一些想法，但比较模糊': 3, '大致能说清': 6, '说得比较清楚': 8, '说得很清楚': 10 },
  selfReadiness: { '还差很远': 1, '有一些基础，但差距明显': 2, '可以开始认真准备': 4, '已经接近可申请': 5, '我不确定': 2 },
};

function evidenceTypeScore(selected) {
  const clean = (selected || []).filter(v => v !== '我还不确定哪些算有效证明材料');
  const n = clean.length;
  if (n <= 0) return 0;
  if (n === 1) return 3;
  if (n === 2) return 7;
  if (n === 3) return 9;
  return 10;
}
function recommenderQualityScore(count, selected) {
  const set = new Set(selected || []);
  if (!count || count === '0 位') return 0;
  if (set.has('我不确定他们是否符合要求')) return count === '1 位' ? 1 : 0;
  let raw = 0;
  if (set.has('和我有真实合作经历')) raw += 3;
  if (set.has('来自不同机构')) raw += 2;
  if (set.has('在行业内有一定分量或认可度')) raw += 3;
  if (set.has('我有把握他们能写出具体内容')) raw += 2;
  const capMap = { '1 位': 3, '2 位': 6, '3 位': 8, '4 位或以上': 10 };
  return Math.min(raw, capMap[count] || 0);
}

const ROUTE_LABEL_EN = {
  '视觉艺术': 'Visual Art', '设计': 'Design', '时装': 'Fashion', '影视': 'Film & TV',
  '建筑': 'Architecture', '表演艺术': 'Performing Arts', '其他 Arts & Culture 相关领域': 'Arts & Culture',
};
function getRouteLabel(field, lang) { return lang === 'en' ? (ROUTE_LABEL_EN[field] || field) : field; }

const HINTS = {
  weakEvidence: {
    '视觉艺术': { zh: '你当前可识别的视觉艺术证据还不够稳，尤其要看展览、驻留、委约、收藏或公开发表记录能不能撑起申请。', en: 'Your identifiable Visual Art evidence is thin — exhibitions, residencies, commissions, collections or publications need to actually carry the application.' },
    '设计':   { zh: '你当前可识别的设计证据还不够稳，尤其要看落地项目、机构合作、专业发布或奖项能不能形成支撑。', en: 'Your identifiable Design evidence is thin — realised projects, institutional partnerships, trade publications or awards need to provide real backing.' },
    '时装':   { zh: '你当前可识别的时装证据还不够稳，尤其要看发布、系列、机构合作、媒体或奖项能不能形成支撑。', en: 'Your identifiable Fashion evidence is thin — collections, presentations, partnerships, press or awards need to actually back the application.' },
    '影视':   { zh: '你当前可识别的影视证据还不够稳，尤其要看作品署名、节展、放映、发行或媒体记录能不能形成支撑。', en: 'Your identifiable Film & TV evidence is thin — credits, festivals, screenings, distribution and press need to back the application.' },
    '建筑':   { zh: '你当前可识别的建筑证据还不够稳，尤其要看建成项目、竞赛、展出、出版或机构合作能不能形成支撑。', en: 'Your identifiable Architecture evidence is thin — built work, competitions, exhibitions, publications and partnerships need to back the application.' },
    '表演艺术': { zh: '你当前可识别的表演艺术证据还不够稳，尤其要看正式演出、节展、机构合作、署名作品或评论能不能形成支撑。', en: 'Your identifiable Performing Arts evidence is thin — formal performances, festivals, partnerships, credits and reviews need to back the application.' },
    '其他 Arts & Culture 相关领域': { zh: '你当前可识别的专业证据还不够稳，尤其要看公开成果、机构合作、媒体或奖项能不能形成支撑。', en: 'Your identifiable professional evidence is thin — public outcomes, partnerships, press or awards need to back the application.' },
  },
  oldEvidence: { all: { zh: '你当前最重要的证据主要早于近五年，这会明显削弱当前申请支撑力。', en: 'Your strongest evidence is mostly older than five years — that materially weakens current application support.' } },
  studentProject: { all: { zh: '你目前的核心证据更偏向学生时期项目，这通常不足以支撑成熟申请。', en: 'Your core evidence skews toward student-era projects, which usually cannot support a mature application.' } },
  commercialProject: { all: { zh: '你目前的核心证据更偏向商业项目，这类材料未必能直接转化为申请核心支撑。', en: 'Your core evidence is mostly commercial — that does not always translate to core application support.' } },
  weakLetters: { all: { zh: '你当前的 recommendation letters 网络偏弱，这会直接影响申请能否真正推进。', en: 'Your recommendation-letter network is weak — that directly affects whether the application can move forward.' } },
  weakNarrative: { all: { zh: '你目前还不能清楚说明自己的实践是什么，以及为什么适合在英国继续发展。', en: 'You cannot yet articulate clearly what your practice is and why the UK is the right next step.' } },
};
function hint(kind, field, lang) {
  const map = HINTS[kind];
  if (!map) return '';
  const entry = map[field] || map.all || map['其他 Arts & Culture 相关领域'];
  return entry ? entry[lang] : '';
}

const NEXT_STEPS_GENERIC = {
  low: { zh: ['先确认哪些公开成果、机构合作或媒体记录能算核心材料。', '补足近五年内可验证的专业成果。', '把零散经历整理成清晰的专业实践路径。'],
         en: ['Decide which public outcomes, partnerships or press records count as core evidence.', 'Add verifiable professional outcomes from the last five years.', 'Organise scattered experience into a clear professional path.'] },
  mid: { zh: ['筛出最能支撑申请的机构合作、公开成果与外部验证材料。', '补强媒体、奖项或出版等第三方证明。', '把专业路径和英国发展叙事连起来。'],
         en: ['Identify the partnerships, public outcomes and external validation that best back the application.', 'Strengthen press, awards or publications as third-party proof.', 'Connect professional path and UK rationale.'] },
  high:{ zh: ['集中保留最强的机构合作、公开成果和第三方背书材料。', '优化推荐信与代表性成果之间的对应关系。', '把专业路径、影响力和申请结构整合成一版主线。'],
         en: ['Keep the strongest partnerships, public outcomes and third-party backing.', 'Align recommenders with the signature outcomes.', 'Integrate path, influence and structure into one spine.'] },
};
function nextSteps(field, band, lang) { return NEXT_STEPS_GENERIC[band][lang]; }

const ROUTE_SUMMARIES = {
  low:  { zh: '你目前还不适合按这个 route 进入正式申请准备。', en: 'You are not yet ready to formally prepare on this route.' },
  mid:  { zh: '按这个 route 看，你已经有一定基础，但距离稳定申请还差一段。', en: 'On this route you have a basis, but you are not yet at stable-application range.' },
  high: { zh: '按这个 route 看，你已经具备一定申请基础。', en: 'On this route you already have a viable application basis.' },
};

function calculateResult(answers, lang) {
  const selectedFields = Array.isArray(answers.fields) && answers.fields.length ? answers.fields : ['其他 Arts & Culture 相关领域'];

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

    const evidenceTypes = (answers.evidenceTypes || []).filter(v => v !== '我还不确定哪些算有效证明材料');
    if (evidenceTypes.length < 2) {
      evidence = Math.min(evidence, 28);
      hints.push(hint('weakEvidence', field, lang));
    }
    if (answers.recency === '大多早于 5 年前') { total -= 5; hints.push(hint('oldEvidence', field, lang)); }
    if (answers.sourceNature === '大多来自学生时期项目') { evidence = Math.min(evidence, 22); total -= 8; hints.push(hint('studentProject', field, lang)); }
    if (answers.sourceNature === '大多来自商业项目') { evidence = Math.min(evidence, 22); total -= 8; hints.push(hint('commercialProject', field, lang)); }
    if (answers.recommenderCount === '0 位' || answers.recommenderCount === '1 位') {
      const uncertainOnly = Array.isArray(answers.recommenderQuality) && answers.recommenderQuality.length === 1 && answers.recommenderQuality[0] === '我不确定他们是否符合要求';
      recommenders = Math.min(recommenders, answers.recommenderCount === '0 位' ? 2 : (uncertainOnly ? 3 : 5));
      hints.push(hint('weakLetters', field, lang));
    }
    if (answers.recommenderCount === '2 位') recommenders = Math.min(recommenders, 9);
    if (answers.narrative === '现在还说不清' || answers.narrative === '有一些想法，但比较模糊') hints.push(hint('weakNarrative', field, lang));

    total = Math.max(0, Math.min(100, evidence + recommenders + readiness));

    let band = 'low';
    if (total >= 40 && total <= 69) band = 'mid';
    if (total >= 70) band = 'high';

    return {
      field, label: getRouteLabel(field, lang), total, band,
      summary: ROUTE_SUMMARIES[band][lang],
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
    try { return JSON.parse(localStorage.getItem('folio_answers') || '{}'); } catch (e) { return {}; }
  });
  const [step, setStep] = React.useState(() => {
    try { return Number(localStorage.getItem('folio_step') || 0) || 0; } catch (e) { return 0; }
  });
  React.useEffect(() => {
    try { localStorage.setItem('folio_answers', JSON.stringify(answers)); } catch (e) {}
  }, [answers]);
  React.useEffect(() => {
    try { localStorage.setItem('folio_step', String(step)); } catch (e) {}
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
    try { localStorage.removeItem('folio_answers'); localStorage.removeItem('folio_step'); } catch (e) {}
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
