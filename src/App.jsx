import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import CurrencyExchange from "./CurrencyExchange"
import CurrencyTable from "./CurrencyTable"
import "./App.css"


function App() {
  
  const [converted, onConverted] = React.useState(false)
  const [table, setTable] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [flip, setFlip] = React.useState(false);
  const [baseCurrency, setBaseCurrency] = React.useState('')
  const [allCurrencies, setAllCurrencies] = React.useState(false)
  const [amount, setAmount] = React.useState("")


  function handleConvertSubmit(event) {
    event.preventDefault();

    const currencyAmount = event.target.elements.numberInput.value;
    setAmount(event.target.elements.numberInput.value)
    const curr = event.target.elements.currency1.value
    setBaseCurrency(event.target.elements.currency1.value);
    const targetCurrency = event.target.elements.currency2.value;

    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${currencyAmount}&from=${curr}&to=${targetCurrency}`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.json();
        })
        .then(data => {
            const convertedAmount = data.rates[targetCurrency];
            setMessage(`${currencyAmount} ${curr} = ${convertedAmount} ${targetCurrency}`);
            onConverted(true); // Set the converted state after successful API call
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setMessage('An error occurred while fetching data.');
            onConverted(false); // Set the converted state in case of an error
        });


}


console.log(baseCurrency)
  return (
    <>
        <Header />
        <div className="exchange">
        <CurrencyExchange submit={handleConvertSubmit} flip={setFlip} table={setTable}/>
        </div>
        {converted && <div className="message">{message}</div>}
        <div className="all-currencies" onClick={() => setAllCurrencies(true)}>Show All Currencies</div>
        {allCurrencies && <CurrencyTable base={baseCurrency} amount={amount} converted={converted} table={table}/>}
        <Footer />
    </>
  )
}

export default App
