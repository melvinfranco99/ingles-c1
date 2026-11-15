/* Datos de vocabulario C1 + renderizado de la página */
const PV = [
 ['account for','explicar, justificar; suponer (un porcentaje)','Tourism accounts for 12% of the country\'s income.'],
 ['back down','echarse atrás, ceder','The government refused to back down.'],
 ['bring about','provocar, causar','The internet brought about huge changes.'],
 ['brush up on','repasar, refrescar','I need to brush up on my French.'],
 ['come up against','toparse con (un problema)','We came up against a lot of opposition.'],
 ['crack down on','tomar medidas duras contra','Police are cracking down on speeding.'],
 ['cut back on','recortar, reducir','The company cut back on staff.'],
 ['draw up','redactar (un documento)','The lawyer drew up a contract.'],
 ['face up to','afrontar, asumir','You must face up to your responsibilities.'],
 ['fall back on','recurrir a (como reserva)','If I lose my job, I can fall back on my savings.'],
 ['get across','transmitir, hacer entender','He struggled to get his message across.'],
 ['get round to','encontrar tiempo para (por fin)','I finally got round to fixing the shelf.'],
 ['hold back','contener(se); frenar','She held back her tears. Lack of money held the project back.'],
 ['iron out','resolver (detalles, problemas)','We need to iron out a few problems first.'],
 ['lay off','despedir (por falta de trabajo)','The factory laid off 200 workers.'],
 ['live up to','estar a la altura de','The film didn\'t live up to my expectations.'],
 ['make up for','compensar','Nothing can make up for the time we lost.'],
 ['opt out (of)','optar por no participar','You can opt out of the scheme at any time.'],
 ['phase out','eliminar gradualmente','Petrol cars will be phased out.'],
 ['play down','restar importancia','The minister played down the crisis.'],
 ['pull off','lograr (algo difícil)','Nobody thought they could pull it off.'],
 ['rule out','descartar','The police have ruled out murder.'],
 ['set about','ponerse a, emprender','She set about reorganising the office.'],
 ['set back','retrasar; costar (dinero)','The storm set the project back a week.'],
 ['sink in','asimilar (una noticia)','It took a while for the news to sink in.'],
 ['stand out','destacar','Her CV really stood out.'],
 ['step down','dimitir, renunciar a un cargo','The CEO stepped down after the scandal.'],
 ['take on','asumir; contratar','She took on too much work. They\'re taking on new staff.'],
 ['tie in with','encajar, coincidir con','His story ties in with the evidence.'],
 ['weigh up','sopesar','Weigh up the pros and cons before deciding.'],
 ['wind down','relajarse; reducir gradualmente','I read to wind down at night.'],
 ['wipe out','aniquilar, eliminar por completo','The disease wiped out the population.'],
];
const PVQ = {text:[
 'The new manager has promised to crack [1] on absenteeism.',
 'I\'ve been meaning to fix the car for ages, but I never get round [2] it.',
 'The investigation has not ruled [3] the possibility of sabotage.',
 'Coal-fired power stations are being phased [4] across Europe.',
 'The hotel didn\'t live up [5] its reputation.',
 'We need to iron [6] a few details before signing.',
 'Exports account [7] half of the company\'s profits.',
 'After twenty years in charge, she decided to step [8].'].join('\n\n'),
 opts:[['down','up','out','off'],['to','for','on','at'],['out','off','away','down'],['out','off','down','away'],['to','for','with','on'],['out','off','over','away'],['for','to','on','with'],['down','off','out','back']]};

const COL = [
 ['Verbo + nombre','reach a compromise/consensus, draw a conclusion, pose a threat/risk, raise concerns/awareness, meet demand/a deadline, address an issue, bear a resemblance, make allowances for, take into account, run the risk of, strike a balance, gain insight into, voice an opinion, exert pressure/influence, heed a warning'],
 ['Adjetivo + nombre','a heated debate, a sweeping generalisation, a vested interest, a sharp contrast, a narrow escape, a steep rise, a common misconception, a fierce competition, an acute shortage, a vicious circle, a remote possibility, a growing concern, a sheer coincidence, a hollow victory, a strong likelihood'],
 ['Adverbio + adjetivo','deeply concerned, highly controversial, utterly devastated, painfully slow, bitterly disappointed, widely acknowledged, readily available, strictly forbidden, fully fledged, heavily dependent, notoriously difficult, inextricably linked, blissfully unaware, vastly superior, entirely justified'],
 ['Adverbio + verbo','strongly recommend, firmly believe, sincerely hope, thoroughly enjoy, flatly refuse, seriously consider, vaguely remember, greatly appreciate, actively encourage, fully understand'],
 ['Nombre + of','a stroke of luck, a sense of humour, a matter of urgency, a source of inspiration, a wealth of experience, a means of transport, a breach of contract, a figment of imagination, a fraction of the cost, a token of gratitude'],
];
const COLQ = {text:[
 'After hours of negotiation, the two sides finally [1] a compromise.',
 'Rising sea levels [2] a serious threat to coastal cities.',
 'It was a [3] coincidence that we were on the same train.',
 'The proposal has been [4] criticised by environmental groups.',
 'Doctors are [5] concerned about the rise in obesity.',
 'It is difficult to [6] a balance between work and family.',
 'The government must [7] the issue of youth unemployment.',
 'There is an [8] shortage of nurses in rural areas.'].join('\n\n'),
 opts:[['reached','got','arrived','came'],['pose','put','place','set'],['sheer','pure','total','clean'],['heavily','strongly','highly','deeply'],['deeply','highly','strongly','heavily'],['strike','hit','beat','knock'],['address','direct','conduct','handle with'],['acute','sharp','steep','intense']]};

const WF = [
 ['ACCEPT','acceptance, acceptable, unacceptable, acceptability'],
 ['ADEQUATE','adequacy, inadequate, inadequately, inadequacy'],
 ['APPLY','applicant, application, applicable, inapplicable'],
 ['COMPARE','comparison, comparative, comparable, incomparable, incomparably'],
 ['CONSIDER','consideration, considerable, considerably, considerate, inconsiderate'],
 ['DEEP / LONG / STRONG / WIDE','depth, deepen · length, lengthen, lengthy · strength, strengthen · width, widen'],
 ['DOUBT','doubtful, undoubtedly, doubtless'],
 ['EFFECT','effective, ineffective, effectiveness, efficient, efficiency'],
 ['FORESEE','foreseeable, unforeseen, unforeseeable'],
 ['LIKELY','likelihood, unlikely'],
 ['PERSUADE','persuasion, persuasive, persuasively, unpersuaded'],
 ['PREDICT','prediction, predictable, unpredictable, unpredictability'],
 ['RELY','reliable, unreliable, reliability, reliance, reliant'],
 ['RESIST','resistance, resistant, irresistible'],
 ['SIGNIFY','significance, significant, insignificant, significantly'],
 ['SUSTAIN','sustainable, unsustainable, sustainability'],
 ['THREAT','threaten, threatening, threatened'],
 ['VARY','variety, various, variable, variation, invariably, varied'],
];
const WFQ = {text:[
 'The results were [1] better than we had expected. (CONSIDER)',
 'His behaviour was completely [2] for a teacher. (ACCEPT)',
 'There is a strong [3] that interest rates will rise. (LIKELY)',
 'The weather in the mountains is notoriously [4]. (PREDICT)',
 'She is [5] the best player in the team. (DOUBT)',
 'The bridge was closed for the [6] future. (FORESEE)',
 'The new law has been criticised as [7]. (EFFECT)',
 'The engineers had to [8] the walls of the old building. (STRONG)'].join('\n\n'),
 ans:[['considerably'],['unacceptable'],['likelihood'],['unpredictable'],['undoubtedly'],['foreseeable'],['ineffective'],['strengthen']]};

const REG = [
 ['ask for','request'],['get','obtain / receive'],['buy','purchase'],['need','require'],['help','assist'],['start','commence'],['end','terminate'],['enough','sufficient'],['try','attempt'],['tell','inform'],['find out','ascertain / discover'],['say sorry','apologise'],['look into','investigate'],['go up','increase / rise'],['go down','decrease / decline'],['put off','postpone'],['about','approximately'],['so','consequently / therefore'],['but','however / nevertheless'],['also','furthermore / moreover'],['a lot of','a considerable number / amount of'],['think about','consider'],['give back','return'],['show','demonstrate']
];

const CONF = [
 ['affect / effect','affect = verbo (afectar) · effect = nombre (efecto); to effect change = provocar'],
 ['economic / economical','economic = de la economía · economical = que ahorra, barato'],
 ['historic / historical','historic = histórico (importante) · historical = relativo a la historia'],
 ['sensible / sensitive','sensible = sensato · sensitive = sensible'],
 ['actual(ly) / current(ly)','actually = en realidad · currently = actualmente'],
 ['eventually / possibly','eventually = al final · possibly = posiblemente'],
 ['comprehensive / understanding','comprehensive = completo, exhaustivo · understanding = comprensivo'],
 ['deception / disappointment','deception = engaño · disappointment = decepción'],
 ['assist / attend','assist = ayudar · attend = asistir (a un evento)'],
 ['prevent / avoid','prevent = impedir que ocurra · avoid = evitar (hacer o encontrarse con algo)'],
 ['raise / rise / arise','raise = levantar, plantear (transitivo) · rise = subir (intransitivo) · arise = surgir'],
 ['lay / lie','lay (laid) = poner, colocar · lie (lay, lain) = estar tumbado · lie (lied) = mentir'],
 ['principal / principle','principal = principal; director · principle = principio'],
 ['compliment / complement','compliment = cumplido · complement = complemento, complementar'],
 ['imply / infer','imply = insinuar · infer = deducir'],
];
const CONFQ = {text:[
 'The new policy will seriously [1] small businesses.',
 'A diesel car is more [2] than a petrol one on long journeys.',
 'Several problems [3] during the first week of the project.',
 'I thought the film would be boring, but it was [4] rather good.',
 'She was very [5] to criticism about her work.',
 'The film is based on a [6] event that took place in 1588.'].join('\n\n'),
 opts:[['affect','effect','afflict','infect'],['economical','economic','economics','economist'],['arose','raised','rose','aroused'],['actually','currently','presently','eventually'],['sensitive','sensible','sensational','sentimental'],['historical','historic','history','historian']]};

const IDI = [
 ['a blessing in disguise','no hay mal que por bien no venga','Losing that job was a blessing in disguise.'],
 ['at the drop of a hat','sin pensarlo, al instante','She\'d travel anywhere at the drop of a hat.'],
 ['be in two minds','estar indeciso','I\'m in two minds about accepting the offer.'],
 ['bite off more than you can chew','abarcar demasiado','I\'ve bitten off more than I can chew with this project.'],
 ['by the skin of your teeth','por los pelos','He passed by the skin of his teeth.'],
 ['come to terms with','aceptar, asumir','She has come to terms with her illness.'],
 ['cut corners','hacer algo mal para ahorrar tiempo/dinero','The builders cut corners and the roof leaks.'],
 ['go to great lengths','esforzarse mucho','They went to great lengths to keep it secret.'],
 ['in the long run','a largo plazo','It\'ll save money in the long run.'],
 ['keep a low profile','pasar desapercibido','After the scandal, he kept a low profile.'],
 ['learn the ropes','aprender cómo funciona algo','It took me a month to learn the ropes.'],
 ['on the spur of the moment','de improviso','We decided to go on the spur of the moment.'],
 ['pay lip service to','apoyar algo solo de palabra','They pay lip service to equality.'],
 ['the tip of the iceberg','la punta del iceberg','These complaints are only the tip of the iceberg.'],
 ['take something for granted','dar por sentado','We take clean water for granted.'],
 ['throw in the towel','tirar la toalla','After three failed attempts, he threw in the towel.'],
 ['up in the air','en el aire, sin decidir','Our holiday plans are still up in the air.'],
 ['with flying colours','con éxito rotundo','She passed the exam with flying colours.'],
 ['a far cry from','muy diferente de','This flat is a far cry from our old house.'],
 ['hit the nail on the head','dar en el clavo','You\'ve hit the nail on the head.'],
];

const TOPICS = [
 ['Ciencia e investigación','breakthrough, cutting-edge, empirical evidence, hypothesis, to conduct research, peer-reviewed, findings, to replicate, groundbreaking, to pioneer, a controlled experiment, data set, to verify, a correlation, a causal link, conclusive, inconclusive'],
 ['Medio ambiente','biodiversity, carbon emissions, carbon neutral, to deplete resources, renewables, fossil fuels, habitat loss, rewilding, to mitigate, adverse effects, ecosystem, irreversible damage, sustainable development, the circular economy, single-use plastics, environmental footprint'],
 ['Economía y trabajo','recession, inflation, the cost of living, a living wage, to be made redundant, the gig economy, job security, productivity, burnout, work-life balance, to delegate, a career ladder, entrepreneur, start-up, to launch a product, revenue, profit margin, outsourcing'],
 ['Sociedad y política','inequality, social mobility, marginalised groups, to tackle poverty, legislation, to enforce a law, a loophole, civil liberties, grassroots movement, to lobby, public opinion, polarisation, consensus, accountability, transparency, welfare state, ageing population'],
 ['Tecnología y medios','artificial intelligence, algorithm, data privacy, surveillance, misinformation, echo chamber, digital literacy, to go viral, clickbait, automation, obsolete, cybersecurity, to be hacked, screen addiction, user-generated content, the digital divide'],
 ['Educación','lifelong learning, rote learning, critical thinking, curriculum, tuition fees, vocational training, a well-rounded education, academic achievement, to drop out, standardised testing, mixed-ability classes, extracurricular activities, a scholarship, an apprenticeship'],
 ['Salud y bienestar','sedentary lifestyle, mental well-being, to boost the immune system, chronic illness, life expectancy, preventive medicine, side effects, a balanced diet, to be prone to, sleep deprivation, mindfulness, to alleviate symptoms, an epidemic, public health'],
 ['Arte y cultura','thought-provoking, a masterpiece, critically acclaimed, an installation, avant-garde, to commission a work, heritage, a retrospective, a box-office hit, to be overrated, a gripping plot, a compelling performance, highbrow / lowbrow, patronage'],
 ['Ciudad y urbanismo','urban sprawl, gentrification, affordable housing, pedestrianised, green spaces, infrastructure, congestion charge, public amenities, a deprived area, regeneration, high-rise, commuter belt, overcrowding, to relocate'],
 ['Personalidad y relaciones','conscientious, resilient, outspoken, headstrong, easy-going, self-assured, tactful, aloof, gullible, assertive, to see eye to eye, to drift apart, a strained relationship, to get on like a house on fire, peer pressure, a role model'],
];

/* ---- Render ---- */
document.addEventListener('DOMContentLoaded', () => {
  const tbl = (head, rows) => `<div class="table-wrap"><table><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr>${rows.map(r => `<tr>${r.map((c, i) => `<td>${i === 0 ? `<b>${c}</b>` : c}</td>`).join('')}</tr>`).join('')}</table></div>`;
  $('#pv-table').innerHTML = tbl(['Phrasal verb', 'Significado', 'Ejemplo'], PV.map(r => [r[0], r[1], `<i>${r[2]}</i>`]));
  flashcards($('#pv-flash'), PV.map(r => [r[0], `${r[1]}<br><i>${r[2]}</i>`]));
  practice($('#pv-quiz'), 'p1', PVQ);
  $('#col-table').innerHTML = tbl(['Tipo', 'Combinaciones'], COL);
  practice($('#col-quiz'), 'p1', COLQ);
  $('#wf-table').innerHTML = tbl(['Raíz', 'Familia'], WF);
  practice($('#wf-quiz'), 'open', WFQ);
  $('#reg-table').innerHTML = tbl(['Informal', 'Formal'], REG);
  $('#conf-table').innerHTML = tbl(['Palabras', 'Diferencia'], CONF);
  practice($('#conf-quiz'), 'p1', CONFQ);
  flashcards($('#idiom-flash'), IDI.map(r => [r[0], `${r[1]}<br><i>${r[2]}</i>`]));
  $('#idiom-table').innerHTML = tbl(['Expresión', 'Significado', 'Ejemplo'], IDI.map(r => [r[0], r[1], `<i>${r[2]}</i>`]));
  $('#topics').innerHTML = TOPICS.map(([t, w]) => `<details><summary>${t}</summary><p>${w.split(', ').map(x => `<span class="pill" style="margin:.15rem">${x}</span>`).join(' ')}</p></details>`).join('');
});
