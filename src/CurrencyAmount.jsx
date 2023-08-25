import React from "react"

export default function CurrencyAmount() {
    const restrictToNumber = (event) => {
        const value = event.target.value;
        const newValue = value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
        event.target.value = newValue;
      };

    return (
        <>
            <label htmlFor="numberInput">Currency Amount:</label>
        <input
          type="text"
          id="numberInput"
          name="numberInput"
          onInput={restrictToNumber}
        />
        </>

    )
}