import React from "react";
import SelectMenu from "./SelectMenu";
import CurrencyAmount from "./CurrencyAmount";
import "./CurrencyExchange.css";

export default function CurrencyExchange(props) {
    const [baseCurrency, setBaseCurrency] = React.useState("USD");
    const [targetCurrency, setTargetCurrency] = React.useState("EUR");

    function handleClick() {
        props.flip(prev => !prev);
        setBaseCurrency(targetCurrency);
        setTargetCurrency(baseCurrency);
    }

    return (
        <form onSubmit={props.submit}>
            <div className="wrapper">
                <CurrencyAmount />
                <SelectMenu
                    name="currency1"
                    type="Base Currency:"
                    value={baseCurrency}
                    onChange={event => setBaseCurrency(event.target.value)}
                />
                <div className="switch" onClick={handleClick}>Switch</div>
                <SelectMenu
                    name="currency2"
                    type="Target Currency:"
                    value={targetCurrency}
                    onChange={event => setTargetCurrency(event.target.value)}
                />
                <button type="submit">Convert</button>
            </div>
        </form>
    );
}

