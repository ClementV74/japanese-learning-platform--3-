// Base de données complète des kanji
// Cette base de données contient plus de 2000 kanji avec leurs détails

export interface KanjiData {
  kanji: string
  meanings: string[]
  kun_readings: string[]
  on_readings: string[]
  jlpt_level?: number
  grade?: number
  stroke_count: number
  radical?: string
  parts?: string[]
  examples?: {
    word: string
    reading: string
    meaning: string
  }[]
}

// Fonction pour récupérer tous les kanji
export function getAllKanji(): KanjiData[] {
  return kanjiDatabase
}

// Fonction pour récupérer les kanji par niveau JLPT
export function getKanjiByJlptLevel(level: number): KanjiData[] {
  return kanjiDatabase.filter((kanji) => kanji.jlpt_level === level)
}

// Fonction pour récupérer les kanji par grade scolaire
export function getKanjiByGrade(grade: number): KanjiData[] {
  return kanjiDatabase.filter((kanji) => kanji.grade === grade)
}

// Fonction pour récupérer un kanji spécifique
export function getKanjiByCharacter(character: string): KanjiData | undefined {
  return kanjiDatabase.find((kanji) => kanji.kanji === character)
}

// Base de données des kanji
// Ceci est une version abrégée pour l'exemple. Dans une vraie application,
// cette base de données contiendrait plus de 2000 kanji.
export const kanjiDatabase: KanjiData[] = [
  // Kanji de niveau JLPT N5 (débutant)
  {
    kanji: "日",
    meanings: ["jour", "soleil", "Japon"],
    kun_readings: ["ひ", "-び", "-か"],
    on_readings: ["ニチ", "ジツ"],
    jlpt_level: 5,
    grade: 1,
    stroke_count: 4,
    radical: "日",
    examples: [
      { word: "日本", reading: "にほん", meaning: "Japon" },
      { word: "今日", reading: "きょう", meaning: "aujourd'hui" },
      { word: "日曜日", reading: "にちようび", meaning: "dimanche" },
    ],
  },
  {
    kanji: "一",
    meanings: ["un"],
    kun_readings: ["ひと-", "ひと.つ"],
    on_readings: ["イチ", "イツ"],
    jlpt_level: 5,
    grade: 1,
    stroke_count: 1,
    radical: "一",
    examples: [
      { word: "一人", reading: "ひとり", meaning: "une personne" },
      { word: "一日", reading: "いちにち", meaning: "un jour" },
      { word: "一月", reading: "いちがつ", meaning: "janvier" },
    ],
  },
  {
    kanji: "人",
    meanings: ["personne"],
    kun_readings: ["ひと", "-り", "-と"],
    on_readings: ["ジン", "ニン"],
    jlpt_level: 5,
    grade: 1,
    stroke_count: 2,
    radical: "人",
    examples: [
      { word: "人間", reading: "にんげん", meaning: "être humain" },
      { word: "日本人", reading: "にほんじん", meaning: "Japonais (personne)" },
      { word: "一人", reading: "ひとり", meaning: "une personne" },
    ],
  },
  {
    kanji: "大",
    meanings: ["grand", "gros"],
    kun_readings: ["おお-", "おお.きい"],
    on_readings: ["ダイ", "タイ"],
    jlpt_level: 5,
    grade: 1,
    stroke_count: 3,
    radical: "大",
    examples: [
      { word: "大学", reading: "だいがく", meaning: "université" },
      { word: "大きい", reading: "おおきい", meaning: "grand" },
      { word: "大人", reading: "おとな", meaning: "adulte" },
    ],
  },
  {
    kanji: "年",
    meanings: ["année", "an"],
    kun_readings: ["とし"],
    on_readings: ["ネン"],
    jlpt_level: 5,
    grade: 1,
    stroke_count: 6,
    radical: "干",
    examples: [
      { word: "今年", reading: "ことし", meaning: "cette année" },
      { word: "去年", reading: "きょねん", meaning: "l'année dernière" },
      { word: "年齢", reading: "ねんれい", meaning: "âge" },
    ],
  },
  {
    kanji: "月",
    meanings: ["mois", "lune"],
    kun_readings: ["つき"],
    on_readings: ["ゲツ", "ガツ"],
    jlpt_level: 5,
    grade: 1,
    stroke_count: 4,
    radical: "月",
    examples: [
      { word: "月曜日", reading: "げつようび", meaning: "lundi" },
      { word: "一月", reading: "いちがつ", meaning: "janvier" },
      { word: "月見", reading: "つきみ", meaning: "contemplation de la lune" },
    ],
  },
  {
    kanji: "本",
    meanings: ["livre", "origine", "réel"],
    kun_readings: ["もと"],
    on_readings: ["ホン"],
    jlpt_level: 5,
    grade: 1,
    stroke_count: 5,
    radical: "木",
    examples: [
      { word: "日本", reading: "にほん", meaning: "Japon" },
      { word: "本当", reading: "ほんとう", meaning: "vérité" },
      { word: "本屋", reading: "ほんや", meaning: "librairie" },
    ],
  },
  {
    kanji: "水",
    meanings: ["eau"],
    kun_readings: ["みず"],
    on_readings: ["スイ"],
    jlpt_level: 5,
    grade: 1,
    stroke_count: 4,
    radical: "水",
    examples: [
      { word: "水曜日", reading: "すいようび", meaning: "mercredi" },
      { word: "水泳", reading: "すいえい", meaning: "natation" },
      { word: "水分", reading: "すいぶん", meaning: "humidité" },
    ],
  },
  {
    kanji: "火",
    meanings: ["feu"],
    kun_readings: ["ひ"],
    on_readings: ["カ"],
    jlpt_level: 5,
    grade: 1,
    stroke_count: 4,
    radical: "火",
    examples: [
      { word: "火曜日", reading: "かようび", meaning: "mardi" },
      { word: "火山", reading: "かざん", meaning: "volcan" },
      { word: "花火", reading: "はなび", meaning: "feu d'artifice" },
    ],
  },
  {
    kanji: "金",
    meanings: ["or", "argent", "métal"],
    kun_readings: ["かね", "かな-", "-がね"],
    on_readings: ["キン", "コン"],
    jlpt_level: 5,
    grade: 1,
    stroke_count: 8,
    radical: "金",
    examples: [
      { word: "金曜日", reading: "きんようび", meaning: "vendredi" },
      { word: "お金", reading: "おかね", meaning: "argent" },
      { word: "金持ち", reading: "かねもち", meaning: "personne riche" },
    ],
  },
  // ... (plus de 100 kanji de niveau N5)

  // Kanji de niveau JLPT N4
  {
    kanji: "会",
    meanings: ["réunion", "rencontre", "association"],
    kun_readings: ["あ.う", "あ.わせる"],
    on_readings: ["カイ", "エ"],
    jlpt_level: 4,
    grade: 2,
    stroke_count: 6,
    radical: "人",
    examples: [
      { word: "会社", reading: "かいしゃ", meaning: "entreprise" },
      { word: "会議", reading: "かいぎ", meaning: "réunion" },
      { word: "会話", reading: "かいわ", meaning: "conversation" },
    ],
  },
  {
    kanji: "同",
    meanings: ["même", "identique", "similaire"],
    kun_readings: ["おな.じ"],
    on_readings: ["ドウ"],
    jlpt_level: 4,
    grade: 2,
    stroke_count: 6,
    radical: "口",
    examples: [
      { word: "同じ", reading: "おなじ", meaning: "même" },
      { word: "同時", reading: "どうじ", meaning: "simultané" },
      { word: "同意", reading: "どうい", meaning: "accord" },
    ],
  },
  {
    kanji: "事",
    meanings: ["affaire", "chose", "fait", "événement"],
    kun_readings: ["こと", "つか.う", "つか.える"],
    on_readings: ["ジ", "ズ"],
    jlpt_level: 4,
    grade: 2,
    stroke_count: 8,
    radical: "亅",
    examples: [
      { word: "仕事", reading: "しごと", meaning: "travail" },
      { word: "事件", reading: "じけん", meaning: "incident" },
      { word: "食事", reading: "しょくじ", meaning: "repas" },
    ],
  },
  {
    kanji: "社",
    meanings: ["entreprise", "société", "association"],
    kun_readings: ["やしろ"],
    on_readings: ["シャ"],
    jlpt_level: 4,
    grade: 2,
    stroke_count: 7,
    radical: "示",
    examples: [
      { word: "会社", reading: "かいしゃ", meaning: "entreprise" },
      { word: "社長", reading: "しゃちょう", meaning: "président d'entreprise" },
      { word: "社会", reading: "しゃかい", meaning: "société" },
    ],
  },
  {
    kanji: "場",
    meanings: ["lieu", "place", "endroit"],
    kun_readings: ["ば"],
    on_readings: ["ジョウ", "チョウ"],
    jlpt_level: 4,
    grade: 2,
    stroke_count: 12,
    radical: "土",
    examples: [
      { word: "場所", reading: "ばしょ", meaning: "endroit" },
      { word: "工場", reading: "こうじょう", meaning: "usine" },
      { word: "広場", reading: "ひろば", meaning: "place" },
    ],
  },
  // ... (plus de 200 kanji de niveau N4)

  // Kanji de niveau JLPT N3
  {
    kanji: "政",
    meanings: ["politique", "gouvernement"],
    kun_readings: ["まつりごと"],
    on_readings: ["セイ", "ショウ"],
    jlpt_level: 3,
    grade: 3,
    stroke_count: 9,
    radical: "攴",
    examples: [
      { word: "政治", reading: "せいじ", meaning: "politique" },
      { word: "政府", reading: "せいふ", meaning: "gouvernement" },
      { word: "政策", reading: "せいさく", meaning: "politique (mesure)" },
    ],
  },
  {
    kanji: "経",
    meanings: ["sutra", "longitude", "passer par"],
    kun_readings: ["へ.る", "た.つ", "たていと", "はか.る", "のり"],
    on_readings: ["ケイ", "キョウ"],
    jlpt_level: 3,
    grade: 3,
    stroke_count: 11,
    radical: "糸",
    examples: [
      { word: "経済", reading: "けいざい", meaning: "économie" },
      { word: "経験", reading: "けいけん", meaning: "expérience" },
      { word: "経営", reading: "けいえい", meaning: "gestion" },
    ],
  },
  {
    kanji: "済",
    meanings: ["finir", "terminer", "excusable"],
    kun_readings: ["す.む", "す.まない", "す.ます", "-ず.み", "-ずみ"],
    on_readings: ["サイ"],
    jlpt_level: 3,
    grade: 4,
    stroke_count: 11,
    radical: "氵",
    examples: [
      { word: "経済", reading: "けいざい", meaning: "économie" },
      { word: "済みません", reading: "すみません", meaning: "excusez-moi" },
      { word: "完済", reading: "かんさい", meaning: "paiement complet" },
    ],
  },
  // ... (plus de 350 kanji de niveau N3)

  // Kanji de niveau JLPT N2
  {
    kanji: "率",
    meanings: ["taux", "proportion", "pourcentage"],
    kun_readings: ["ひき.いる"],
    on_readings: ["リツ", "ソツ"],
    jlpt_level: 2,
    grade: 5,
    stroke_count: 11,
    radical: "玄",
    examples: [
      { word: "効率", reading: "こうりつ", meaning: "efficacité" },
      { word: "確率", reading: "かくりつ", meaning: "probabilité" },
      { word: "率直", reading: "そっちょく", meaning: "franc" },
    ],
  },
  {
    kanji: "張",
    meanings: ["étirer", "tendre", "étaler"],
    kun_readings: ["は.る", "-は.り", "-ば.り"],
    on_readings: ["チョウ"],
    jlpt_level: 2,
    grade: 5,
    stroke_count: 11,
    radical: "弓",
    examples: [
      { word: "張る", reading: "はる", meaning: "tendre" },
      { word: "緊張", reading: "きんちょう", meaning: "tension" },
      { word: "主張", reading: "しゅちょう", meaning: "assertion" },
    ],
  },
  // ... (plus de 500 kanji de niveau N2)

  // Kanji de niveau JLPT N1
  {
    kanji: "憂",
    meanings: ["mélancolie", "tristesse", "inquiétude"],
    kun_readings: ["うれ.える", "うれ.い", "う.い", "う.き"],
    on_readings: ["ユウ"],
    jlpt_level: 1,
    grade: 6,
    stroke_count: 15,
    radical: "心",
    examples: [
      { word: "憂鬱", reading: "ゆううつ", meaning: "dépression" },
      { word: "憂い", reading: "うれい", meaning: "chagrin" },
      { word: "憂慮", reading: "ゆうりょ", meaning: "inquiétude" },
    ],
  },
  {
    kanji: "惨",
    meanings: ["misérable", "désastre", "cruauté"],
    kun_readings: ["みじ.め", "いた.む", "むご.い"],
    on_readings: ["サン", "ザン"],
    jlpt_level: 1,
    grade: 6,
    stroke_count: 11,
    radical: "心",
    examples: [
      { word: "惨め", reading: "みじめ", meaning: "misérable" },
      { word: "惨事", reading: "さんじ", meaning: "désastre" },
      { word: "悲惨", reading: "ひさん", meaning: "tragique" },
    ],
  },
  // ... (plus de 1000 kanji de niveau N1)

  // Kanji hors JLPT (rares ou spécialisés)
  {
    kanji: "鬱",
    meanings: ["dépression", "mélancolie", "luxuriant"],
    kun_readings: ["うっ.する", "ふさ.ぐ"],
    on_readings: ["ウツ"],
    grade: 9, // Hors des grades scolaires standard
    stroke_count: 29,
    radical: "鬯",
    examples: [
      { word: "憂鬱", reading: "ゆううつ", meaning: "dépression" },
      { word: "鬱病", reading: "うつびょう", meaning: "dépression (maladie)" },
      { word: "鬱積", reading: "うっせき", meaning: "accumulation" },
    ],
  },
  // ... (plus de 500 kanji rares ou spécialisés)
]

// Note: Pour une implémentation complète, cette base de données contiendrait plus de 2000 kanji.
// Pour des raisons pratiques, nous avons inclus seulement quelques exemples représentatifs.
// Dans une application réelle, vous pourriez charger ces données depuis un fichier JSON externe
// ou une base de données pour éviter de surcharger le code source.

