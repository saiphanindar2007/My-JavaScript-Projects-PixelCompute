const countryApiKey = "rc_live_d20addf2daf84cab9f8054e8e1c6a401";
const exchangeApiKey = "bbe7be285c422943d779de4c";

const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertButton = document.getElementById("convertButton");
const result = document.getElementById("result");
const error = document.getElementById("error");
let currencyCodes = [];
async function getCurrencies() {
  try {
    const response = await fetch(
      "https://api.restcountries.com/countries/v5?api-key=" +
      countryApiKey +
      "&limit=100&offset=0&pretty=1&response_fields=names.common%2Ccurrencies%2Cflag.emoji"
    );
    if (!response.ok) {
      throw new Error("Could not load currencies");
    }
    const data = await response.json();
    fromCurrency.innerHTML = "";
    toCurrency.innerHTML = "";
    data.forEach(function(country) {
      if (country.currencies) {
        country.currencies.forEach(function(currency) {
          const code = currency.code;
          if (currencyCodes.indexOf(code) === -1) {
            currencyCodes.push(code);
            const option1 = document.createElement("option");
            option1.value = code;
            option1.textContent =
              country.flag.emoji + " " + code + " - " + currency.name;

            const option2 = document.createElement("option");
            option2.value = code;
            option2.textContent =
              country.flag.emoji + " " + code + " - " + currency.name;

            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
          }
        });
      }
    });
    fromCurrency.value = "USD";
    toCurrency.value = "INR";
  } catch (err) {
    error.textContent =
      "Could not load currencies. Please check your REST Countries API key.";
    error.hidden = false;
    console.log(err);
  }
}
async function convertCurrency() {
  result.hidden = true;
  error.hidden = true;
  if (
    amount.value.trim() === "" ||
    isNaN(Number(amount.value)) ||
    Number(amount.value) < 0
  ) {
    error.textContent = "Please enter a valid amount.";
    error.hidden = false;
    return;
  }
  const enteredAmount = Number(amount.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;
  if (from === to) {
    result.textContent =
      enteredAmount.toFixed(2) + " " + from + " = " +
      enteredAmount.toFixed(2) + " " + to;
    result.hidden = false;
    return;
  }
  convertButton.disabled = true;
  convertButton.textContent = "Converting...";
  try {
    const response = await fetch(
      "https://v6.exchangerate-api.com/v6/" +
      exchangeApiKey + "/pair/" + from + "/" + to
    );
    if (!response.ok) {
      throw new Error("Could not get exchange rates");
    }
    const data = await response.json();
    if (data.result === "success") {
      const convertedAmount =
        enteredAmount * data.conversion_rate;
      result.textContent =
        enteredAmount.toFixed(2) + " " + from + " = " +
        convertedAmount.toFixed(2) + " " + to;
      result.hidden = false;
    } else {
      throw new Error("Conversion failed");
    }
  } catch (err) {
    error.textContent =
      "An error occurred, please try again later";
    error.hidden = false;
    console.log(err);
  } finally {
    convertButton.disabled = false;
    convertButton.textContent = "Convert";
  }
}
convertButton.addEventListener("click", convertCurrency);
getCurrencies();