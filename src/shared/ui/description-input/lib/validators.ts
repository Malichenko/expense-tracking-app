export const isRequired = (required: boolean) => (val: string) =>
  !required || val.length > 0;

export const isMinLength = (minLength?: number) => (val: string) =>
  minLength === undefined || val.length === 0 || val.length >= minLength;
