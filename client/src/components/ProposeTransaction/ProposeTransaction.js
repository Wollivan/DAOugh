import React, { useState } from "react";
import "./ProposeTransaction.scss";

export default function ProposeTransaction() {
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

    let recipientInput = document.querySelector(".recipient-check");
    let tokenInput = document.querySelector(".token-check");
    let valueInput = document.querySelector(".value-check");

    if (!form.recipient) {
      recipientInput.classList.add("show");
      formValid = false;
    } else {
      recipientInput.classList.remove("show");
    }

    if (!form.token) {
      tokenInput.classList.add("show");
      formValid = false;
    } else {
      tokenInput.classList.remove("show");
    }

    if (!form.value) {
      valueInput.classList.add("show");
      formValid = false;
    } else {
      valueInput.classList.remove("show");
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

      // TODO run the contract function
    } else {
      setFormValid(false);
    }
  };

  return (
    <form className="propose-form" onSubmit={handleSubmit}>
      <h3>Propose New Transaction</h3>
      <input
        name="recipient"
        className="propose-form__input"
        placeholder="Add New Player"
        value={form.recipient}
        onChange={handleChange}
      />
      <p className="propose-form__error-text recipient-check">
        This field is required
      </p>

      <input
        name="token"
        className="propose-form__input"
        placeholder="Add New Player"
        value={form.token}
        onChange={handleChange}
      />
      <p className="propose-form__error-text token-check">
        This field is required
      </p>

      <input
        name="value"
        className="propose-form__input"
        placeholder="Add New Player"
        value={form.value}
        onChange={handleChange}
      />
      <p className="propose-form__error-text value-check">
        This field is required
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
