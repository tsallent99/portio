const API_URL = process.env.REACT_APP_API_URL;

function retrieveMessages(token, propertyId, callback) {
  // TODO  validators
  if (typeof token !== "string") throw new TypeError("token is not a string");
  if (token.trim().length === 0) throw new Error("token is empty or blank");
  //   if (typeof dateFrom !== "date") throw new TypeError("dateFrom is not a date");
  //   if (typeof dateTo !== "date") throw new TypeError("dateTo is not a date");

  if (typeof callback !== "function")
    throw new TypeError("callback is not a function");

  const xhr = new XMLHttpRequest();

  // response

  xhr.onload = function () {
    const status = xhr.status;

    if (status >= 500) callback(new Error(`server error (${status})`));
    else if (status >= 400) {
      const payload = xhr.responseText;

      const data = JSON.parse(payload);

      callback(new Error(`client error (${status}): ${data.error}`));
    } else if (status === 200) {
      const json = xhr.responseText;

      const messages = JSON.parse(json);

      callback(null, messages);
    }
  };
  // request

  xhr.open("GET", `${API_URL}/properties/${propertyId}/messages`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);

  xhr.send();
}

export default retrieveMessages;
