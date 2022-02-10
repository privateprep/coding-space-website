import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar";
import "./all.scss";
import "../fonts/fonts.css";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";

const TemplateWrapper = ({ children }) => {
  const menuItems = [
    {
      title: "Get Started",
      subMenu: [
        { title: "Help me decide?", path: "/classes" },
        { title: "Locations", path: "/locations" },
        {
          title: "How TCS is different",
          path: "/about-us/how-tcs-is-different",
        },
      ],
    },
    {
      title: "Programs",
      path: "",
      subMenu: [
        {
          title: "Our Programs",
          path: "/programs/our-programs",
        },
        {
          title: "Experience Levels",
          path: "/programs/experience-level",
        },
        {
          title: "Seasonal Programs",
          path: "/programs/seasonal-programs",
        },
        {
          title: "Experiential Programs",
          path: "/programs/experiential-programs",
        },
        {
          title: "Camps",
          path: "/programs/camps-at-the-coding-space",
        },
        {
          title: "Build Your Own",
          path: "/programs/build-your-own-programs-at-the-coding-space",
        },
        {
          title: "Special Events",
          path: "/programs/special-events",
        },
      ],
    },
    {
      title: "Partnerships",
      path: "/partnerships",
      subMenu: [],
    },
    {
      title: "About Us",
      path: "",
      subMenu: [
        { title: "About Us", path: "/about-us/" },
        {
          title: "How TCS is different",
          path: "/about-us/how-tcs-is-different",
        },
        { title: "Social Impact", path: "/about-us/social-impact/" },
        {
          title: "Scholarship Program",
          path: "/about-us/scholarship-program",
        },
        { title: "Common Questions", path: "/about-us/common-questions" },
        { title: "Rewards Program", path: "/referral_program" },
        {
          title: "Our Teaching Philosophy",
          path: "/about-us/our-teaching-philosophy",
        },
        { title: "LMS", path: "/about-us/my-coding-space-lms" },
      ],
    },
    {
      title: "Blogs",
      path: "/blog",
      subMenu: [],
    },
    {
      title: "Contact Us",
      path: "/contact-us",
      subMenu: [],
    },
    {
      title: "COVID Safety",
      path: "/safety-policy/",
      subMenu: [],
    },
  ];
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
        <meta property="og:description" content={description} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/meta-image.jpg`}
        />
        <meta
          property="og:image:alt"
          content={"Girls coding around a table."}
        />
        <meta property="og:image:width" content={3000} />
        <meta property="og:image:height" content={2000} />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Helmet>
      <Navbar menuItems={menuItems} />
      <div className="page-container">{children}</div>
      <Footer />
    </div>
  );
};

export default TemplateWrapper;
