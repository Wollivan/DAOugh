import React, { useState } from "react";
import "./ProposeTransaction.scss";

export default function ProposeTransaction({
  submitTransaction,
  form,
  setForm,
  formValid,
  setFormValid,
}) {
  // pottentially need to add the functions that get the list of transactions pending so it can update in props

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
      //add a new transaction
      submitTransaction(form.recipient, form.value, form.token);

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
        <option value="0xD879e415B7c33C09c4539C40007684e95bd7964C">
          Flour
        </option>
        <option value="0xb6fE12431f84004AE370524b375b5AE035849E93">Salt</option>
        <option value="0xC7a86EdC8127C68289873F60a29fBFfDDEf7417a">
          Water
        </option>
        <option value="0x2Ac5803DC24360896343e445780f0c645c09C9fa">
          Yeast
        </option>
        <option value="0xc912cd9a34326AD82996F38a33c9343a22206de7">
          Dough
        </option>
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
