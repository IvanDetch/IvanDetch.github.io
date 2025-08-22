export const isEmail = (v: string) => /^[\w.!#$%&'*+/=?^`{|}~-]+@[\w-]+(\.[\w-]+)+$/.test(v.trim());

export const isPhone = (v: string) => /^\+?[0-9()\-\s]{6,20}$/.test(v.trim());

export const minLen = (v: string, n: number) => v.trim().length >= n;
export const maxLen = (v: string, n: number) => v.trim().length <= n;
export const isNumber = (v: string) => /^-?\d+(?:[\.,]\d+)?$/.test(v.trim());
