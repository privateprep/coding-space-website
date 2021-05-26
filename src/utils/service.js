import fetch from "cross-fetch"; // ponyfill for old browsers
import { stringify } from "query-string";
import { titleize } from "./helpers";

export const buildQueryString = object =>
  stringify(object, { arrayFormat: "bracket" });

const buildErrorsString = (statusText, { errors, error }) => {
  let errorsString = "";
  if (Array.isArray(errors)) {
    errorsString = errors.join(", ");
  } else if (errors instanceof Object) {
    for (let key in errors) {
      if (Array.isArray(errors[key])) {
        errorsString += `${titleize(key)}: ${errors[key].join(", ")} | `;
      } else {
        errorsString += `${titleize(key)}: ${errors[key]}, `;
      }
    }
  }

  if (!errorsString.length) {
    errorsString = error || statusText;
  }
  return errorsString;
};

const buildResError = (response, data, message) => {
  let error = new Error(message);
  error.status = response.status;
  error.statusText = response.statusText;
  error.response = response;
  error.body = data;
  error.errors = data.errors;

  return error;
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json().then(data => {
      const message = buildErrorsString(response.statusText, data);
      const error = buildResError(response, data, message);

      throw error;
    });
  }

  throw new Error(response.statusText);
};

const parseJSON = payload => {
  if (typeof payload === "string") {
    return JSON.parse(payload);
  }
  return payload.json();
};

const getHeaders = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const GET = url =>
  fetch(url, getHeaders)
    .then(checkStatus)
    .then(parseJSON);

const getTokenHeaders = () => ({
  Accept: "application/json",
  "Content-Type": "application/json",
  // "X-CSRF-Token": get_me_from_body_or_cookie
});

export const POST = (url, payload) =>
  fetch(url, {
    method: "POST",
    headers: getTokenHeaders(),
    body: JSON.stringify(payload),
    mode: "cors",
    cache: "no-cache",
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
  })
    .then(checkStatus)
    .then(parseJSON);
