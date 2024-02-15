"use strict";

export const debounce = (cb, delay = 1000) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
export const updateDebounceText = debounce((cb) => {
  cb();
}, 500);
