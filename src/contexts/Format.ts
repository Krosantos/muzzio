import { COMMANDER, formats, singletonFormats } from "@constants";
import { create } from "zustand";

export type Format = keyof typeof formats;

interface FormatContext {
  format: Format;
  isSingleton: boolean;
  setFormat: (format: Format) => void;
  loadFromSave: (data: SaveableFormatContext) => void;
}

export type SaveableFormatContext = Format;

export const useFormat = create<FormatContext>((set) => {
  return {
    format: COMMANDER,
    isSingleton: true,
    setFormat(format) {
      const isSingleton = singletonFormats[format];
      set({ format, isSingleton });
    },
    loadFromSave(format) {
      const isSingleton = singletonFormats[format];
      set({ format, isSingleton });
    },
  };
});
