import * as React from "react";

import "./CtaContact.css";

const CtaContact = () => (
  <section className="cta-contact">
    <h4 className="cta-contact__title">Have questions?</h4>
    <p className="cta-contact__secondary">
      Get in touch with our team to get your questions answered.
    </p>
    <a href="/contact-us" className="link-button">
      Get In Touch
    </a>
  </section>
)

export default CtaContact;
