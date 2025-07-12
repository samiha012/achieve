// src/global.d.ts
export {};

declare global {
  interface Window {
    FB: {
      init: (params: Record<string, any>) => void;
      XFBML: {
        parse: () => void;
      };
    };
  }
}