declare module 'crypto-js' {
    export const AES: any;
    export const enc: {
      Utf8: any;
      Hex: any;
    };
    export const PBKDF2: any;
    export const lib: {
      WordArray: {
        random: (n: number) => any;
        parse: (str: string) => any;
      };
    };
    // Agrega otros tipos necesarios según tu uso de la biblioteca
  }