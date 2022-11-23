import React from "react";

export const AppGlobalContext = React.createContext("");

export function useGlobalContext() {
  return React.useContext(AppGlobalContext);
}

export function request(url, method, body = {}, options = {}) {
  let _options = { ...options };

  if (method.toUpperCase() === "POST") _options.body = JSON.stringify(body);

  return fetch(url, {
    method,
    ..._options,
  }).then(async (res) => {
    let status = res.status;
    if (status === 200)
      return {
        status,
        data: await res.json(),
      };
    else {
      return {
        status,
        data: [],
      };
    }
  });
}

export function generateUUID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
