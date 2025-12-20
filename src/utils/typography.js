import "../fonts/fonts.css";
import "./global.css";

import Typography from "typography";
import Wordpress2016 from "typography-theme-wordpress-2016";

Wordpress2016.headerFontFamily = ["Montserrat", "Arial", "sans-serif"];
Wordpress2016.bodyFontFamily = ["Montserrat", "Arial", "sans-serif"];

Wordpress2016.overrideThemeStyles = () => ({
  h1: {
    fontFamily: "Montserrat, Arial, sans-serif",
  },
  a: {
    color: "var(--textLink)",
    boxShadow: "none",
  },
  hr: {
    background: "var(--hr)",
  },
  blockquote: {
    color: "inherit",
    borderLeftColor: "inherit",
    opacity: "0.8",
  },
  "blockquote.translation": {
    fontSize: "1em",
  },
  "li *:last-child": {
    marginBottom: "0",
  },
});

delete Wordpress2016.googleFonts;

const typography = new Typography(Wordpress2016);

// Include these styles in <head>
// Hot reload typography in development.
// if (process.env.NODE_ENV !== "production") {
typography.injectStyles();
// }

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
