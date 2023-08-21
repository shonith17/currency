import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import "./App.css"
import CurrencyExchange from "./CurrencyExchange"

function App() {
  
  const [converted, onConverted] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [flip, setFlip] = React.useState(false);

  function handleSubmit(event) {
    event.preventDefault()

    onConverted(true)

    const currencyAmount = event.target.elements.numberInput.value;
    const baseCurrency = event.target.elements.currency1.value;
    const targetCurrency = event.target.elements.currency2.value;

    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${currencyAmount}&from=${baseCurrency}&to=${targetCurrency}`)
    .then(resp => resp.json())
    .then((data) => {
      const convertedAmount = data.rates[targetCurrency]
      setMessage(`${currencyAmount} ${baseCurrency} = ${convertedAmount} ${targetCurrency}`);
  });


}


  return (
    <>
        <Header />
        <CurrencyExchange submit={handleSubmit} flip={setFlip}/>
        {converted && <div>{message}</div>}
        <Footer />
    </>
  )
}

export default App
