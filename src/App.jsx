import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import CurrencyExchange from "./CurrencyExchange"
import CurrencyTable from "./CurrencyTable"
import CurrencyChart from "./CurrencyChart"
import "./App.css"


function App() {
  
  const [converted, onConverted] = React.useState(false)
  const [table, setTable] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [baseCurrency, setBaseCurrency] = React.useState('')
  const [targetCurrency, setTargetCurrency] = React.useState('')
  const [allCurrencies, setAllCurrencies] = React.useState(false)
  const [amount, setAmount] = React.useState("")


  function handleConvertSubmit(event) {
    event.preventDefault();

    const currencyAmount = event.target.elements.numberInput.value;
    const curr = event.target.elements.currency1.value
    const targetCurrency = event.target.elements.currency2.value;

    setBaseCurrency(event.target.elements.currency1.value);
    setTargetCurrency(event.target.elements.currency2.value);
    setAmount(event.target.elements.numberInput.value)

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

function handleTableOn() {
  setTable(prevState => !prevState)
}

  return (
    <div className="app">
      <div className="content">
        <Header />
        <div className="middle">
          <div className="exchange">
            <CurrencyExchange submit={handleConvertSubmit} table={handleTableOn}/>
          </div>
          {converted && <div className="message">{message}</div>}
          {converted && <CurrencyChart base={baseCurrency} target={targetCurrency}/>}
          <div className="all-currencies">
            <div onClick={() => setAllCurrencies(true)}>Show All Currencies</div>
          </div>
          {allCurrencies && <CurrencyTable base={baseCurrency} amount={amount} converted={converted} table={table}/>}
          </div>
        </div>
    
        <Footer />
    </div>
  )
}

export default App
