import CMS from "netlify-cms-app";
import uploadcare from "netlify-cms-media-library-uploadcare";
import cloudinary from "netlify-cms-media-library-cloudinary";
import { ColorControl, ColorPreview } from "netlify-cms-widget-colorpicker";

import AboutUsPreview from "./preview-templates/AboutUsPreview";
import BlogPostPreview from "./preview-templates/BlogPostPreview";
import CustomPagePreview from "./preview-templates/CustomPagePreview";
import IndexPagePreview from "./preview-templates/IndexPagePreview";
import SchoolProgramPreview from "./preview-templates/SchoolProgramsPreview";
import PartnershipsPreview from "./preview-templates/PartnershipsPreview";
import ExperienceLevelsPreview from "./preview-templates/ExperienceLevelsPreview";

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate("index", IndexPagePreview);
CMS.registerPreviewTemplate("about-us", AboutUsPreview);
CMS.registerPreviewTemplate("blog", BlogPostPreview);
CMS.registerPreviewTemplate("custom", CustomPagePreview);
CMS.registerPreviewTemplate("experience-levels", ExperienceLevelsPreview);
CMS.registerPreviewTemplate("school-programs", SchoolProgramPreview);
CMS.registerPreviewTemplate("partnerships", PartnershipsPreview);

// Widgets
CMS.registerWidget("color", ColorControl, ColorPreview);
