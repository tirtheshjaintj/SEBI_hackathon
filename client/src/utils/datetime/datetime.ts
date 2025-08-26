import { languageType } from "@/src/types/constants";
import dayjs from "dayjs";
import "dayjs/locale/bn";
import "dayjs/locale/en";
import "dayjs/locale/gu";
import "dayjs/locale/hi";
import "dayjs/locale/kn";
import "dayjs/locale/ml";
import "dayjs/locale/mr";
import "dayjs/locale/ta";
import "dayjs/locale/te";
import "dayjs/locale/ur";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

// Manual fallback for Punjabi and Odia
const manualLocaleMap: Record<string, Record<string, string>> = {
  pa: {
    second: "ਸਕਿੰਟ ਪਹਿਲਾਂ",
    seconds: "ਸਕਿੰਟ ਪਹਿਲਾਂ",
    minute: "ਮਿੰਟ ਪਹਿਲਾਂ",
    minutes: "ਮਿੰਟ ਪਹਿਲਾਂ",
    hour: "ਘੰਟਾ ਪਹਿਲਾਂ",
    hours: "ਘੰਟੇ ਪਹਿਲਾਂ",
    day: "ਦਿਨ ਪਹਿਲਾਂ",
    days: "ਦਿਨ ਪਹਿਲਾਂ",
    month: "ਮਹੀਨਾ ਪਹਿਲਾਂ",
    months: "ਮਹੀਨੇ ਪਹਿਲਾਂ",
    year: "ਸਾਲ ਪਹਿਲਾਂ",
    years: "ਸਾਲ ਪਹਿਲਾਂ",
  },
  or: {
    second: "ସେକେଣ୍ଡ ପୂର୍ବେ",
    seconds: "ସେକେଣ୍ଡ ପୂର୍ବେ",
    minute: "ମିନିଟ୍ ପୂର୍ବେ",
    minutes: "ମିନିଟ୍ ପୂର୍ବେ",
    hour: "ଘଣ୍ଟା ପୂର୍ବେ",
    hours: "ଘଣ୍ଟା ପୂର୍ବେ",
    day: "ଦିନ ପୂର୍ବେ",
    days: "ଦିନ ପୂର୍ବେ",
    month: "ମାସ ପୂର୍ବେ",
    months: "ମାସ ପୂର୍ବେ",
    year: "ବର୍ଷ ପୂର୍ବେ",
    years: "ବର୍ଷ ପୂର୍ବେ",
  },
};

const manualTimeAgo = (date: Date | string, lang: string) => {
  const now = new Date();
  const input = new Date(date);
  const seconds = Math.floor((now.getTime() - input.getTime()) / 1000);
  const localeMap = manualLocaleMap[lang];

  if (!localeMap) return "";

  if (seconds < 60) return `${seconds} ${localeMap.seconds}`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} ${localeMap.minutes}`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${localeMap.hours}`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} ${localeMap.days}`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} ${localeMap.months}`;
  const years = Math.floor(months / 12);
  return `${years} ${localeMap.years}`;
};

export function prettyDate({
  date,
  lang = "en",
}: {
  date: Date;
  lang: languageType;
}) {
  return dayjs(date).locale(lang).format("ddd - DD MMM YYYY");
}

export const getDayMonthYear = ({
  timestamp,
  language = "en",
}: {
  timestamp: Date;
  language: string;
}) => {
  if (!timestamp) return {};

  const date = dayjs(timestamp).locale(language);
  return {
    dayName: date.format("ddd"),
    month: date.format("MMM"),
    year: date.format("YYYY"),
    date: date.format("DD"),
  };
};

export function formatTime({ date }: { date: Date }) {
  return dayjs(date).format("hh:mm A");
}

export function formatDateWithTime({
  date,
  lang = "en",
}: {
  date: Date | string;
  lang: string;
}) {
  const dateObj = dayjs(date).locale(lang);
  return `${dateObj.format("hh:mm A")} ${dateObj.format("DD MMM")}`;
}

export const formatTimeAgo = (date: Date | string, locale: string = "en") => {
  if (!date) return "";

  if (locale === "pa" || locale === "or") {
    return manualTimeAgo(date, locale);
  }

  try {
    dayjs.locale(locale);
    return dayjs(date).fromNow();
  } catch {
    return dayjs(date).fromNow();
  }
};
