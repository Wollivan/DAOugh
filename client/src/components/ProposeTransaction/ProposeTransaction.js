import React, { useState } from "react";
import "./ProposeTransaction.scss";

export default function ProposeTransaction({ submitTransaction }) {
  // pottentially need to add the functions that get the list of transactions pending so it can update in props
  const [formValid, setFormValid] = useState(true);
  const [form, setForm] = useState({
    recipient: "",
    token: "",
    value: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    let formValid = true;

    let recipientWarning = document.querySelector(".recipient-check");
    let tokenWarning = document.querySelector(".token-check");
    let valueWarning = document.querySelector(".value-check");

    let recipientValidWarning = document.querySelector(
      ".recipient-valid-check"
    );
    let valueValidWarning = document.querySelector(".value-valid-check");

    if (!form.recipient) {
      recipientWarning.classList.add("show");
      formValid = false;
    } else {
      recipientWarning.classList.remove("show");
    }

    if (!form.token) {
      tokenWarning.classList.add("show");
      formValid = false;
    } else {
      tokenWarning.classList.remove("show");
    }

    if (!form.value) {
      valueWarning.classList.add("show");
      formValid = false;
    } else {
      valueWarning.classList.remove("show");
    }

    // if (address isn't hexidecimal) {
    //   recipientValidWarning.classList.add("show");
    //   formValid = false;
    // } else {
    //   recipientValidWarning.classList.remove("show");
    // }

    if (form.value <= 0) {
      valueValidWarning.classList.add("show");
      formValid = false;
    } else {
      valueValidWarning.classList.remove("show");
    }

    //make axios call
    if (formValid) {
      //add a new game
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      setFormValid(true);

      submitTransaction(form.recipient, form.value, form.token);
    } else {
      setFormValid(false);
    }
  };

  return (
    <form className="propose-form" onSubmit={handleSubmit}>
      <h3>Propose New Transaction</h3>
      <select
        name="token"
        className="propose-form__input"
        value={form.token}
        onChange={handleChange}
      >
        <option>- Select token -</option>
        <option value="SETADDRESHERE">Flour</option>
        <option value="SETADDRESHERE">Salt</option>
        <option value="SETADDRESHERE">Water</option>
        <option value="SETADDRESHERE">Yeast</option>
        <option value="SETADDRESHERE">Dough</option>
      </select>
      <p className="propose-form__error-text token-check">
        This field is required
      </p>
      <input
        name="recipient"
        className="propose-form__input"
        placeholder="Recipient Address"
        value={form.recipient}
        onChange={handleChange}
      />
      <p className="propose-form__error-text recipient-check">
        This field is required
      </p>
      <p className="propose-form__error-text recipient-valid-check">
        Must be a hexidecimal wallet address
      </p>

      <input
        name="value"
        type="number"
        className="propose-form__input"
        placeholder="Amount"
        value={form.value}
        onChange={handleChange}
      />
      <p className="propose-form__error-text value-check">
        This field is required
      </p>
      <p className="propose-form__error-text value-valid-check">
        Must be a value greater than 0
      </p>

      <input
        className="button propose-form__submit"
        type="submit"
        value="Submit"
        id="input-submit"
      />
    </form>
  );
}
