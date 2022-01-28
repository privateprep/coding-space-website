import React, { useState } from "react";
import { navigate } from "gatsby-link";

const encode = data =>
  Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");

const ContactUsForm = () => {
  const [formData, setFormData] = useState({});

  const handleBlur = e => {
    e.target.reportValidity();
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...formData,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  return (
    <form
      name="contact"
      method="post"
      action="/contact-us/thanks/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
      <input type="hidden" name="form-name" value="contact" />
      <p style={{ display: "none" }}>
        <input name="bot-field" />
      </p>
      <div className="field">
        <label className="label" htmlFor="first_name">
          Your name <span className="required">*</span>
        </label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="first_name"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="First"
            id="first_name"
            required={true}
          />
          <input
            className="input"
            type="text"
            name="last_name"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Last"
            id="last_name"
            required={true}
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="email">
          Email <span className="required">*</span>
        </label>
        <div className="control">
          <input
            className="input"
            type="email"
            name="email"
            onblur="this.reportValidity()"
            onChange={handleChange}
            onBlur={handleBlur}
            id="email"
            required={true}
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="phone">
          Phone Number
        </label>
        <div className="control">
          <input
            className="input"
            type="tel"
            name="phone"
            onChange={handleChange}
            id="phone"
          />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="message">
          Message <span className="required">*</span>
        </label>
        <div className="control">
          <textarea
            className="textarea"
            name="message"
            onChange={handleChange}
            onBlur={handleBlur}
            id="message"
            required={true}
            cols="50"
            rows="4"
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="zip">
          Zip Code (N/A if outside of the US)
        </label>
        <div className="control">
          <input
            className="input"
            type="number"
            name="zip"
            onChange={handleChange}
            id="zip"
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="country">
          Country <span className="required">*</span>
        </label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="country"
            onChange={handleChange}
            value="United States"
            required={true}
            onBlur={handleBlur}
            id="country"
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="how_hear">
          How did you hear about us?
        </label>
        <small>
          If referred, please include the referral source's full name.
        </small>
        <div className="control">
          <input
            className="input"
            type="text"
            name="how_hear"
            onChange={handleChange}
            required={true}
            id="how_hear"
          />
        </div>
      </div>
      <div className="field">
        <button className="button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ContactUsForm;
