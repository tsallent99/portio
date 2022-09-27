const API_URL = process.env.REACT_APP_API_URL;

function createBooking(token, propertyId, dateFrom, dateTo, callback) {
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
    } else if (status === 201) callback(null);
  };
  // request

  xhr.open("POST", `${API_URL}/booking`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.send(
    `{ "propertyId": "${propertyId}", "dateFrom": "${dateFrom}", "dateTo": "${dateTo}" }`
  );
}

export default createBooking;
