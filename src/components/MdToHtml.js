import remark from "remark";
import remarkHTML from "remark-html";

const toHtml = markDown =>
  remark().use(remarkHTML).processSync(markDown).toString();

const createHtml = mdContent => {
  return {
    // eslint-disable-next-line
    __html: toHtml(mdContent),
  };
};

export default createHtml;
