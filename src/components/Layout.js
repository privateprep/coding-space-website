import React from "react";
import { Helmet } from "react-helmet";
import BasicHeader from "../components/BasicHeader";
import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
import "./all.scss";
import "../fonts/fonts.css";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";

// const menuItems = [
//   {
//     title: "Get Started - WIP",
//     subMenu: [
//       { title: "Help me decide?", path: "/whats-new" },
//       { title: "What's New", path: "/whats-new" },
//       { title: "Semester Classes", path: "/semester-classes" },
//       { title: "Girlcode", path: "signup/girlcode" },
//       { title: "Camps", path: "/camps" },
//     ],
//   },
//   {
//     title: "Programs",
//     path: "",
//     subMenu: [
//       { title: "Experience Levels", path: "/programs/experience-levels" },
//       {
//         title: "Seasonal Programs",
//         path: "/programs/seasonal-programs",
//       },
//       {
//         title: "Experiential Programs",
//         path: "/programs/experiential-programs",
//       },
//       {
//         title: "Camps",
//         path: "/programs/camps",
//       },
//       {
//         title: "Build Your Own",
//         path: "/programs/build-your-own",
//       },
//       {
//         title: "Special Events",
//         path: "/programs/special-events",
//       },
//     ],
//   },
//   {
//     title: "Partnerships",
//     path: "",
//     subMenu: [
//       { title: "Schools", path: "partnerships/schools" },
//       { title: "Community", path: "partnerships/community" },
//       { title: "Corporate", path: "partnerships/corporate" },
//       { title: "Camps", path: "partnerships/camps" },
//     ],
//   },
//   {
//     title: "About Us",
//     path: "",
//     subMenu: [
//       { title: "How TCS is different", path: "about-us/how-tcs-is-different" },
//       { title: "Social Impact", path: "about-us/social-impact" },
//       { title: "Common Questions", path: "about-us/common-questions" },
//       { title: "School Programs", path: "about-us/school-programs" },
//       { title: "Rewards Program", path: "about-us/rewards-program" },
//       { title: "Our Philosophy", path: "about-us/out-philosophy" },
//       { title: "LMS", path: "/lms" },
//     ],
//   },
//   {
//     title: "Blogs",
//     path: "/blogs",
//     subMenu: [],
//   },
//   {
//     title: "Contact Us",
//     path: "/contact",
//     subMenu: [],
//   },
// ];

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
      <BasicHeader />
      <div className="page-container">{children}</div>
      <Footer />
    </div>
  );
};

export default TemplateWrapper;
