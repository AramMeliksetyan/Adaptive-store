import { DynamicObject } from "./hooks/useFetchQuery";

export const debounce = (func: (...args: any) => void, timeout = 600) => {
  let timer: NodeJS.Timeout;
  return (...args: []) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};

export const createDynamicColumnFields = (data: DynamicObject) => {
  let arr: Array<Record<string, string>> = [];
  const obj = data;
  for (let i in obj) {
    if (typeof obj[i] !== "object" && i !== "mediaPath" && i !== "isEnabled") {
      arr.push({
        label: i,
        dataType: typeof obj[i],
      });
    }
  }

  const res = arr.map((item) => {
    if (item?.label === "isEnabled") {
    }
    return {
      field: item.label,
      label: item.label,
    };
  });
  return res;
};
