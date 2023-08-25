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
      const currencyFullNames = {
        AUD: "Australian Dollar",
        BGN: "Bulgarian Lev",
        BRL: "Brazilian Real",
        CAD: "Canadian Dollar",
        CHF: "Swiss Franc",
        CNY: "Chinese Yuan",
        CZK: "Czech Koruna",
        DKK: "Danish Krone",
        EUR: "Euro",
        GBP: "British Pound Sterling",
        HKD: "Hong Kong Dollar",
        HUF: "Hungarian Forint",
        IDR: "Indonesian Rupiah",
        ILS: "Israeli New Shekel",
        INR: "Indian Rupee",
        ISK: "Icelandic Króna",
        JPY: "Japanese Yen",
        KRW: "South Korean Won",
        MXN: "Mexican Peso",
        MYR: "Malaysian Ringgit",
        NOK: "Norwegian Krone",
        NZD: "New Zealand Dollar",
        PHP: "Philippine Peso",
        PLN: "Polish Złoty",
        RON: "Romanian Leu",
        SEK: "Swedish Krona",
        SGD: "Singapore Dollar",
        THB: "Thai Baht",
        TRY: "Turkish Lira",
        USD: "United States Dollar",
        ZAR: "South African Rand",
    };
    

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
                            <th>{`${currencyFullNames[props.base]} (${props.base})`}</th>
                            <th>{props.amount}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {targetCurrencies.map((currency) => (
                            <tr key={currency}>
                                <td>{`${currencyFullNames[currency]} (${currency})`}</td>
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