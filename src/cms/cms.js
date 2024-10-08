import CMS from "netlify-cms-app";
import uploadcare from "netlify-cms-media-library-uploadcare";
import cloudinary from "netlify-cms-media-library-cloudinary";
import { ColorControl, ColorPreview } from "netlify-cms-widget-colorpicker";

// import relevant styles here for previews
import "../components/all.scss";
import "../templates/styles/experience-levels.scss";
import "../templates/styles/location.scss";
import "../templates/styles/IndexPage.scss";

import AboutUsPreview from "./preview-templates/AboutUsPreview";
import BlogPostPreview from "./preview-templates/BlogPostPreview";
import CareersPagePreview from "./preview-templates/CareersPagePreview";
import CustomPagePreview from "./preview-templates/CustomPagePreview";
import IndexPagePreview from "./preview-templates/IndexPagePreview";
import LiabilityPagePreview from "./preview-templates/LiabilityPagePreview";
import OurTeamPagePreview from "./preview-templates/OurTeamPagePreview";
import ReferralPagePreview from "./preview-templates/ReferralPagePreview";
import RefundPagePreview from "./preview-templates/RefundPagePreview";
import ProgramsPreview from "./preview-templates/ProgramsPreview";
import LocationPagePreview from "./preview-templates/LocationPagePreview.js";
import PartnershipsPreview from "./preview-templates/PartnershipsPreview";
import ExperienceLevelsPreview from "./preview-templates/ExperienceLevelsPreview";

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate("index", IndexPagePreview);
CMS.registerPreviewTemplate("about-us", AboutUsPreview);
CMS.registerPreviewTemplate("blog", BlogPostPreview);
CMS.registerPreviewTemplate("careers", CareersPagePreview);
CMS.registerPreviewTemplate("custom", CustomPagePreview);
CMS.registerPreviewTemplate("experience-levels", ExperienceLevelsPreview);
CMS.registerPreviewTemplate("liability-release", LiabilityPagePreview);
CMS.registerPreviewTemplate("our-team", OurTeamPagePreview);
CMS.registerPreviewTemplate("referral-program", ReferralPagePreview);
CMS.registerPreviewTemplate("refund-policy", RefundPagePreview);
CMS.registerPreviewTemplate("programs", ProgramsPreview);
CMS.registerPreviewTemplate("locations", LocationPagePreview);
CMS.registerPreviewTemplate("partnerships", PartnershipsPreview);

// Widgets
CMS.registerWidget("color", ColorControl, ColorPreview);
