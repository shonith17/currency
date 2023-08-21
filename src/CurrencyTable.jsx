import React from "react"

export default function CurrencyTable(props) {

    const [conversionRates, setConversionRates] = React.useState({})

    const baseCurrency = props.base
    const amount = props.amount 

    const targetCurrencies = [
        "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK",
        "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR",
        "ISK", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP",
        "PLN", "RON", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"
      ];


      React.useEffect(() => {
        if (props.converted) {
             // Set your desired base currency
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
        
      }, [props.converted]);

      console.log(conversionRates)
    return (
        <div className="currency-table">
      <table>
        <thead>
          <tr>
            <th>{props.base}</th>
            <th>{props.amount}</th>
          </tr>
        </thead>
        <tbody>
          {targetCurrencies.map((currency) => (
            <tr key={currency}>
              <td>{currency}</td>
              <td>{conversionRates[currency] || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
}