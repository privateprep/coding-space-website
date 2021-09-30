import React, { useEffect } from "react";
import { Router } from "@reach/router";
import { navigate } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/seo";
import SignUpWizard from "../components/sign_up";

const BounceToHome = () => {
  useEffect(() => {
    navigate("/", { replace: true });
  }, []);

  return null;
};

const ClassSignUp = () => (
  <Layout>
    <Seo title="Sign Up" />
    <Router>
      <SignUpWizard path="sign_up/classes/:classTypeId" />
      <BounceToHome default />
    </Router>
  </Layout>
);

export default ClassSignUp;
