import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./all.sass";
import "../fonts/fonts.css";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";

const menuItems = [
  {
    title: "Get Started",
    subMenu: [
      { title: "Help me decide?", path: "/whats-new" },
      { title: "What's New", path: "/whats-new" },
      { title: "Semester Classes", path: "/semester-classes" },
      { title: "Girlcode", path: "signup/girlcode" },
      { title: "Camps", path: "/camps" },
    ],
  },
  {
    title: "Personalized Learning",
    path: "",
    subMenu: [
      { title: "Note: Design My Class", path: "/design-my-class" },
      { title: "1:1 & Private Group Lessons", path: "/private-group-lessons" },
      { title: "Girl Scouts", path: "/girl-scouts" },
      { title: "Birthday Parties", path: "/birthday-parties" },
    ],
  },
  {
    title: "School Programs",
    path: "",
    subMenu: [
      {
        title: "In-Person Classes",
        path: "/school-programs/in-person-classes",
      },
      { title: "Virtual Classes", path: "/school-programs/virtual-classes" },
      {
        title: "How we work with schools",
        path: "/school-programs//how-we-work-with-schools",
      },
      {
        title: "How to get started",
        path: "/school-programs//how-to-get-started",
      },
    ],
  },
  {
    title: "About",
    path: "",
    subMenu: [
      { title: "What Makes Us Different", path: "/what-makes-us-different" },
      { title: "Team", path: "/team" },
      { title: "Mission", path: "/mission" },
      { title: "Values", path: "/values" },
      { title: "Teaching philosophy", path: "/philosophy" },
      { title: "Scholarship", path: "/scholarship" },
      { title: "Common questions (FAQ)", path: "/faq" },
    ],
  },
  {
    title: "Blogs",
    path: "/blogs",
    subMenu: [],
  },
  {
    title: "Contact Us",
    path: "/contact",
    subMenu: [],
  },
];

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix("/")}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/og-image.jpg`}
        />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Helmet>
      <Navbar menuItems={menuItems} />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default TemplateWrapper;
