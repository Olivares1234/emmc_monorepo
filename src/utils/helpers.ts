import { AnyObject } from "common/types";
import dayjs from "dayjs";

export const removeEmpty = (obj: AnyObject) =>
  Object.keys(obj)?.reduce((prev: AnyObject, curr) => {
    if (obj[curr] === "" || obj[curr] === null) return prev;

    prev[curr] = obj[curr];
    return prev;
  }, {});

export const convertNullEmpty = (obj: AnyObject) =>
  Object.keys(obj)?.reduce((prev: AnyObject, curr) => {
    prev[curr] = obj[curr] === null ? "" : obj[curr];
    return prev;
  }, {});

export const transformSelectOptData = (
  data: AnyObject[],
  config: {
    labelKey: string;
    valueKey: string;
    hideDefault?: boolean;
  },
) => {
  const menu = data.map((val) => ({
    label: val[config.labelKey],
    value: val[config.valueKey],
  }));
  if (config.hideDefault) return menu;
  return [
    {
      label: "Select",
      value: "",
      disabled: true,
    },
    ...menu,
  ];
};

export const formatAddress = (data: AnyObject): string => {
  const newData = removeEmpty({
    line_1: data?.line_1,
    barangay: data?.barangay,
    municipality: data?.municipality,
    province: data?.province,
  });

  return Object.keys(newData).reduce((prev, curr) => {
    return `${prev} ${newData[curr] as string}`;
  }, "");
};

export const startCase = (str: string): string => {
  try {
    if (typeof str !== "string") {
      throw new TypeError("startCaseAlternative expects a string as input");
    }

    const words = str.split(/[.,_-]/).filter(Boolean);

    const capitalizedWords = words.map((word) => {
      const lowerCaseWord = word.toLowerCase();
      return lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
    });

    return capitalizedWords.join(" ");
  } catch (_e) {
    return "";
  }
};

export const pick = (keys: string[], obj: AnyObject | any): AnyObject => {
  const pickedObj: any = {};

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      pickedObj[key] = obj[key];
    }
  }

  return pickedObj;
};

export const generateRandomNumber = (minValue: number, maxValue: number): number => {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

export const displayChanges = (
  data: Record<
    string,
    {
      old: string;
      new: string;
    }
  >,
  bypassKeys: string[] = [],
): string => {
  const changes: string[] = [];

  for (const key in data) {
    if (!bypassKeys.includes(key)) {
      const { old, new: updated } = data[key];
      const oldDisplay = old?.toString()?.trim();
      const updatedDisplay = updated?.toString()?.trim();

      if (oldDisplay && updatedDisplay) {
        changes.push(`${startCase(key)}: ${oldDisplay} -> ${updatedDisplay}`);
        continue;
      }

      if (oldDisplay && !updatedDisplay) {
        changes.push(`${startCase(key)}: ${oldDisplay}`);
        continue;
      }
      changes.push(`${startCase(key)}: ${updatedDisplay}`);
    }
  }
  return changes.join(" , ");
};

export const calculateTotalAmount = (quantity: number, unitPrice: number): number => {
  return +(quantity * unitPrice).toFixed(4);
};

export const safetyZero = (num: number): number => {
  if (num === undefined) return 0;
  if (num === null) return 0;
  return num;
};

export const delay = async (ms: number): Promise<string> =>
  await new Promise((resolve) => setTimeout(() => resolve("resolve"), ms));

export const convertDateToLocale = (date: string | Date) => {
  try {
    return new Date(dayjs(date).format("YYYY-MM-DD"));
  } catch (_e) {
    return new Date();
  }
};

export const numberToWords = (number: number): string => {
  const units: string[] = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens: string[] = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens: string[] = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const thousands: string[] = ["", "Thousand", "Million", "Billion", "Trillion"];

  function convertThreeDigitNumber(num: number): string {
    if (num === 0) {
      return "";
    } else if (num < 10) {
      return units[num];
    } else if (num < 20) {
      return teens[num - 10];
    } else if (num < 100) {
      const tenDigit: number = Math.floor(num / 10);
      const oneDigit: number = num % 10;
      return tens[tenDigit] + (oneDigit !== 0 ? "-" + units[oneDigit] : "");
    } else {
      const hundredDigit: number = Math.floor(num / 100);
      const remainingTwoDigits: number = num % 100;
      const remainingWords: string = convertThreeDigitNumber(remainingTwoDigits);
      return (
        units[hundredDigit] +
        " Hundred" +
        (remainingWords !== "" ? " and " + remainingWords : "")
      );
    }
  }

  let wholePart: number = Math.floor(number);
  const fractionalPart: number = Math.round((number - wholePart) * 100);

  let result: string = "";
  let chunkCount: number = 0;

  while (wholePart > 0) {
    const chunk: number = wholePart % 1000;
    if (chunk > 0) {
      result =
        convertThreeDigitNumber(chunk) +
        (chunkCount > 0 ? " " + thousands[chunkCount] : "") +
        " " +
        result;
    }
    wholePart = Math.floor(wholePart / 1000);
    chunkCount++;
  }

  result += "pesos";

  if (fractionalPart > 0) {
    result += " and " + convertThreeDigitNumber(fractionalPart) + " cents";
  } else {
    result += " only";
  }

  return result;
};

export const snakeCaseKeysToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => snakeCaseKeysToCamelCase(item));
  } else if (typeof obj === "object" && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = key.replace(/_./g, (match) => match[1].toUpperCase());
        newObj[newKey] = snakeCaseKeysToCamelCase(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
};

export const camelToSnakeString = (input: string): string => {
  return input.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
};

export const camelCaseKeysToSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((item) => camelCaseKeysToSnakeCase(item));
  } else if (typeof obj === "object" && obj instanceof Date) {
    return obj;
  } else if (typeof obj === "object" && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const newKey = camelToSnakeString(key);
        newObj[newKey] = camelCaseKeysToSnakeCase(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
};

export const preparePayloadForRequest = (obj: AnyObject): AnyObject =>
  removeEmpty(camelCaseKeysToSnakeCase(obj));
