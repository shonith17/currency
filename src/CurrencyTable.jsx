import React from "react"
import "./CurrencyTable.css"

export default function CurrencyTable(props) {

    const [conversionRates, setConversionRates] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(true); // New loading state

    const baseCurrency = props.base;
    const amount = props.amount;

    const targetCurrencies = [
        "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK",
        "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR",
        "ISK", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP",
        "PLN", "RON", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"
      ];


      React.useEffect(() => {
        if (props.converted) {
            setIsLoading(true); // Start loading

            const host = "api.frankfurter.app";

            const fetchConversionRates = async () => {
                const rates = {};
                for (const targetCurrency of targetCurrencies) {
                    if (targetCurrency !== baseCurrency) {
                        try {
                            const response = await fetch(
                                `https://${host}/latest?amount=${props.amount}&from=${baseCurrency}&to=${targetCurrency}`
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
                }
                setConversionRates(rates);
                setIsLoading(false); // Done loading
            };

            fetchConversionRates();
        }

    }, [props.converted, baseCurrency, props.amount]);

    return (
        <div className="currency-table">
          <div>
            {isLoading ? ( // Conditional rendering based on isLoading
                <div>Loading Currency Conversion Data...</div>
            ) : (
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
            )}
          </div>
        </div>
    );
}