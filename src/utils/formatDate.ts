import { format } from "date-fns";

import {
  af,
  arSA,
  az,
  be,
  bg,
  bn,
  bs,
  ca,
  cs,
  cy,
  da,
  de,
  deAT,
  el,
  enAU,
  enCA,
  enGB,
  enIE,
  enIN,
  enNZ,
  enUS,
  enZA,
  es,
  et,
  faIR,
  fi,
  fr,
  frCA,
  frCH,
  gl,
  gu,
  he,
  hi,
  hr,
  hu,
  id,
  is,
  it,
  itCH,
  ja,
  km,
  kn,
  ko,
  Locale,
  lt,
  lv,
  ms,
  nb,
  nl,
  nlBE,
  pl,
  pt,
  ptBR,
  ro,
  ru,
  sk,
  sl,
  sq,
  sr,
  sv,
  ta,
  te,
  th,
  tr,
  uk,
  vi,
  zhCN,
  zhHK,
  zhTW,
} from "date-fns/locale";

export enum Format {
  DATE_BEFORE_MONTH = "dd MMM, yyyy",
  DATE_AFTER_MONTH = "MMM dd, yyyy",
  DATE_AFTER_MONTH_WITH_TIME = "MMM dd, yyyy '-' HH:mm:ss",
  DATE_BEFORE_MONTH_WITH_TIME = "dd MMM, yyyy '-' HH:mm:ss",
}

export interface DateFormatType {
  locale: Locale;
  format: Format;
}

export type BCP47LanguageTag =
  | "af-ZA"
  | "ar-SA"
  | "az-AZ"
  | "be-BY"
  | "bg-BG"
  | "bn-IN"
  | "bs-BA"
  | "ca-ES"
  | "cs-CZ"
  | "cy-GB"
  | "da-DK"
  | "de-AT"
  | "de-CH"
  | "de-DE"
  | "el-GR"
  | "en-AU"
  | "en-CA"
  | "en-GB"
  | "en-IE"
  | "en-IN"
  | "en-NZ"
  | "en-US"
  | "en-ZA"
  | "es-AR"
  | "es-CL"
  | "es-CO"
  | "es-ES"
  | "es-MX"
  | "es-PE"
  | "et-EE"
  | "fa-IR"
  | "fi-FI"
  | "fr-BE"
  | "fr-CA"
  | "fr-CH"
  | "fr-FR"
  | "gl-ES"
  | "gu-IN"
  | "he-IL"
  | "hi-IN"
  | "hr-HR"
  | "hu-HU"
  | "id-ID"
  | "is-IS"
  | "it-CH"
  | "it-IT"
  | "ja-JP"
  | "km-KH"
  | "kn-IN"
  | "ko-KR"
  | "lt-LT"
  | "lv-LV"
  | "mr-IN"
  | "ms-MY"
  | "nb-NO"
  | "ne-NP"
  | "nl-BE"
  | "nl-NL"
  | "pa-IN"
  | "pl-PL"
  | "pt-BR"
  | "pt-PT"
  | "ro-RO"
  | "ru-RU"
  | "sk-SK"
  | "sl-SI"
  | "sq-AL"
  | "sr-RS"
  | "sv-FI"
  | "sv-SE"
  | "ta-IN"
  | "te-IN"
  | "th-TH"
  | "tr-TR"
  | "uk-UA"
  | "vi-VN"
  | "zh-CN"
  | "zh-HK"
  | "zh-TW";

const supportedLocales: Record<BCP47LanguageTag, DateFormatType> = {
  "af-ZA": { locale: af, format: Format.DATE_AFTER_MONTH },
  "ar-SA": { locale: arSA, format: Format.DATE_AFTER_MONTH },
  "az-AZ": { locale: az, format: Format.DATE_AFTER_MONTH },
  "be-BY": { locale: be, format: Format.DATE_AFTER_MONTH },
  "bg-BG": { locale: bg, format: Format.DATE_AFTER_MONTH },
  "bn-IN": { locale: bn, format: Format.DATE_AFTER_MONTH },
  "bs-BA": { locale: bs, format: Format.DATE_AFTER_MONTH },
  "ca-ES": { locale: ca, format: Format.DATE_AFTER_MONTH },
  "cs-CZ": { locale: cs, format: Format.DATE_AFTER_MONTH },
  "cy-GB": { locale: cy, format: Format.DATE_AFTER_MONTH },
  "da-DK": { locale: da, format: Format.DATE_AFTER_MONTH },
  "de-AT": { locale: deAT, format: Format.DATE_AFTER_MONTH },
  "de-CH": { locale: de, format: Format.DATE_AFTER_MONTH },
  "de-DE": { locale: de, format: Format.DATE_AFTER_MONTH },
  "el-GR": { locale: el, format: Format.DATE_AFTER_MONTH },
  "en-AU": { locale: enAU, format: Format.DATE_AFTER_MONTH },
  "en-CA": { locale: enCA, format: Format.DATE_AFTER_MONTH },
  "en-GB": { locale: enGB, format: Format.DATE_AFTER_MONTH },
  "en-IE": { locale: enIE, format: Format.DATE_AFTER_MONTH },
  "en-IN": { locale: enIN, format: Format.DATE_AFTER_MONTH },
  "en-NZ": { locale: enNZ, format: Format.DATE_AFTER_MONTH },
  "en-US": { locale: enUS, format: Format.DATE_AFTER_MONTH },
  "en-ZA": { locale: enZA, format: Format.DATE_AFTER_MONTH },
  "es-AR": { locale: es, format: Format.DATE_AFTER_MONTH },
  "es-CL": { locale: es, format: Format.DATE_AFTER_MONTH },
  "es-CO": { locale: es, format: Format.DATE_AFTER_MONTH },
  "es-ES": { locale: es, format: Format.DATE_AFTER_MONTH },
  "es-MX": { locale: es, format: Format.DATE_AFTER_MONTH },
  "es-PE": { locale: es, format: Format.DATE_AFTER_MONTH },
  "et-EE": { locale: et, format: Format.DATE_AFTER_MONTH },
  "fa-IR": { locale: faIR, format: Format.DATE_AFTER_MONTH },
  "fi-FI": { locale: fi, format: Format.DATE_AFTER_MONTH },
  "fr-BE": { locale: fr, format: Format.DATE_AFTER_MONTH },
  "fr-CA": { locale: frCA, format: Format.DATE_AFTER_MONTH },
  "fr-CH": { locale: frCH, format: Format.DATE_AFTER_MONTH },
  "fr-FR": { locale: fr, format: Format.DATE_AFTER_MONTH },
  "gl-ES": { locale: gl, format: Format.DATE_AFTER_MONTH },
  "gu-IN": { locale: gu, format: Format.DATE_AFTER_MONTH },
  "he-IL": { locale: he, format: Format.DATE_AFTER_MONTH },
  "hi-IN": { locale: hi, format: Format.DATE_AFTER_MONTH },
  "hr-HR": { locale: hr, format: Format.DATE_AFTER_MONTH },
  "hu-HU": { locale: hu, format: Format.DATE_AFTER_MONTH },
  "id-ID": { locale: id, format: Format.DATE_AFTER_MONTH },
  "is-IS": { locale: is, format: Format.DATE_AFTER_MONTH },
  "it-CH": { locale: itCH, format: Format.DATE_AFTER_MONTH },
  "it-IT": { locale: it, format: Format.DATE_AFTER_MONTH },
  "ja-JP": { locale: ja, format: Format.DATE_AFTER_MONTH },
  "km-KH": { locale: km, format: Format.DATE_AFTER_MONTH },
  "kn-IN": { locale: kn, format: Format.DATE_AFTER_MONTH },
  "ko-KR": { locale: ko, format: Format.DATE_AFTER_MONTH },
  "lt-LT": { locale: lt, format: Format.DATE_AFTER_MONTH },
  "lv-LV": { locale: lv, format: Format.DATE_AFTER_MONTH },
  "mr-IN": { locale: vi, format: Format.DATE_AFTER_MONTH },
  "ms-MY": { locale: ms, format: Format.DATE_AFTER_MONTH },
  "nb-NO": { locale: nb, format: Format.DATE_AFTER_MONTH },
  "ne-NP": { locale: vi, format: Format.DATE_AFTER_MONTH },
  "nl-BE": { locale: nlBE, format: Format.DATE_AFTER_MONTH },
  "nl-NL": { locale: nl, format: Format.DATE_AFTER_MONTH },
  "pa-IN": { locale: vi, format: Format.DATE_AFTER_MONTH },
  "pl-PL": { locale: pl, format: Format.DATE_AFTER_MONTH },
  "pt-BR": { locale: ptBR, format: Format.DATE_AFTER_MONTH },
  "pt-PT": { locale: pt, format: Format.DATE_AFTER_MONTH },
  "ro-RO": { locale: ro, format: Format.DATE_AFTER_MONTH },
  "ru-RU": { locale: ru, format: Format.DATE_AFTER_MONTH },
  "sk-SK": { locale: sk, format: Format.DATE_AFTER_MONTH },
  "sl-SI": { locale: sl, format: Format.DATE_AFTER_MONTH },
  "sq-AL": { locale: sq, format: Format.DATE_AFTER_MONTH },
  "sr-RS": { locale: sr, format: Format.DATE_AFTER_MONTH },
  "sv-FI": { locale: sv, format: Format.DATE_AFTER_MONTH },
  "sv-SE": { locale: sv, format: Format.DATE_AFTER_MONTH },
  "ta-IN": { locale: ta, format: Format.DATE_AFTER_MONTH },
  "te-IN": { locale: te, format: Format.DATE_AFTER_MONTH },
  "th-TH": { locale: th, format: Format.DATE_AFTER_MONTH },
  "tr-TR": { locale: tr, format: Format.DATE_AFTER_MONTH },
  "uk-UA": { locale: uk, format: Format.DATE_AFTER_MONTH },
  "vi-VN": { locale: vi, format: Format.DATE_BEFORE_MONTH },
  "zh-CN": { locale: zhCN, format: Format.DATE_AFTER_MONTH },
  "zh-HK": { locale: zhHK, format: Format.DATE_AFTER_MONTH },
  "zh-TW": { locale: zhTW, format: Format.DATE_AFTER_MONTH },
};

export function getLocaleInLocal(): {
  bcp47locale: BCP47LanguageTag;
  localeInDateFns: Locale;
  formatInDateFns: Format;
} {
  const localeFromLocal = localStorage?.getItem("locale") as BCP47LanguageTag;
  const bcp47locale: BCP47LanguageTag = Object.keys(supportedLocales)?.includes(localeFromLocal)
    ? localeFromLocal
    : "en-US";

  return {
    bcp47locale,
    localeInDateFns: supportedLocales[bcp47locale]?.locale,
    formatInDateFns: supportedLocales[bcp47locale]?.format,
  };
}

export default function formatDate(date: string | number) {
  try {
    const { localeInDateFns, formatInDateFns } = getLocaleInLocal();
    const dateObj = new Date(date);

    const dateString = format(dateObj, formatInDateFns, {
      locale: localeInDateFns,
    });

    return dateString;
  } catch (err) {
    console.error(err);

    return "--";
  }
}
