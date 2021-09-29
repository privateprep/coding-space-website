import React, { useEffect } from "react";
import { Router } from "@reach/router";
import { navigate } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import CollectRetrievedPayment from "../components/CollectRetrievedPayment";

const BounceToHome = () => {
  useEffect(() => {
    navigate("/", { replace: true });
  }, []);

  return null;
};

export default () => (
  <Layout>
    <Seo title="Checkout" />
    <Router>
      <CollectRetrievedPayment path="checkout/:paymentId" />
      <BounceToHome default />
    </Router>
  </Layout>
);
