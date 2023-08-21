import React from "react"

export default function CurrencyTable(props) {

    const [conversionRates, setConversionRates] = React.useState({})

    const baseCurrency = props.base
    const amount = props.amount 

    const targetCurrencies = [
        "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK",
        "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR",
        "ISK", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP",
        "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"
      ];


      React.useEffect(() => {
        if (props.converted) {
          const baseCurrency = "USD"; // Set your desired base currency
          const host = "api.frankfurter.app";
    
          // Fetch conversion rates for each target currency
          const fetchConversionRates = async () => {
            const rates = {};
            for (const targetCurrency of targetCurrencies) {
              try {
                const response = await fetch(
                  `https://${host}/latest?from=${baseCurrency}&to=${targetCurrency}`
                );
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                const data = await response.json();
                rates[targetCurrency] = data.rates[targetCurrency];
              } catch (error) {
                console.error(`Error fetching ${targetCurrency} data:`, error);
                rates[targetCurrency] = "N/A";
              }
            }
            setConversionRates(rates);
          };
    
          fetchConversionRates();
        }
        console.log(conversionRates)
      }, [props.converted]);

    return (
        <div>Hello World</div>
    )
}