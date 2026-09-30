export function TrimString(str: string, num: number) {
    if (!str) {
      return "";
    }
    return str.length > num ? str.substring(0, 20) + "..." : str;
  }

export function jsonArrayToString(i: string) {
    const a = i.toString()
    const b = JSON.parse(a) 
    const c = b.join(', ')
    return c
}


export const valueWithFallback = (val: string | number): string | number => {
  if (val !== undefined && val !== null) {
    if (typeof val === "string") {
      return val.trim() !== "" ? val : "Not added yet.";
    } else if (typeof val === "number") {
      return !isNaN(val) ? val : "Not added yet.";
    }
  }
  return "Not added yet.";
};