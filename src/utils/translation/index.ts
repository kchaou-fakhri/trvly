import { TranslationEntity, TranslationPrayer, TranslationTimeFormat } from "./Translation";

export const Messages = {
  en: require("./messages/en.json"),
  ar: require("./messages/ar.json"),
};

export const TranslationMessages = {
  ...TranslationPrayer,
  ...TranslationTimeFormat
 }
