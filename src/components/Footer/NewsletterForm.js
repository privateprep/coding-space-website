import React from "react";

export const NewsletterForm = () => {
  return (
    <form
      name="newsletter"
      className="newsletter"
      method="POST"
      netlify-honeypot="bot-field"
      data-netlify="true"
    >
      <h4>Subscribe to our newsletter</h4>
      <p style={{ display: "none" }}>
        <input name="bot-field" />
      </p>
      <p>
        <input type="text" name="email" placeholder="Enter your email here" />
      </p>
      <p>
        <button className="button" type="submit">
          Subscribe
        </button>
      </p>
    </form>
  );
};
