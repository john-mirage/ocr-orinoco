export const getLocalStorageItem = (itemKey) => {
  if (typeof itemKey === "string") {
    const json = localStorage.getItem(itemKey);
    return typeof json === "string" ? JSON.parse(json) : null;
  } else {
    throw new Error("The item key is not a string");
  }
}

export const setLocalStorageItem = (itemKey, itemValue) => {
  if (typeof itemKey === "string") {
    if (itemValue) {
      const json = JSON.stringify(itemValue);
      localStorage.setItem(itemKey, json);
    }
  } else {
    throw new Error("The item key is not a string");
  }
}

export const removeLocalStorageItem = (itemKey) => {
  if (typeof itemKey === "string") {
    const json = localStorage.getItem(itemKey);
    if (typeof json === "string") {
      localStorage.removeItem(itemKey);
    }
  } else {
    throw new Error("The item key is not a string");
  }
}