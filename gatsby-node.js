const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

// load ENV vars to process
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

// API helpers
const dashboardBaseUrl = process.env.DASHBOARD_BASE_URL ?? 'https://dashboard.privateprep.com';

const fetch = require("node-fetch");
const GET = url => fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res;
    } else {
      return Promise.reject(new Error(res.statusText));
    }
  }).then(res => res.json());

// load data from PP Dashboard into gatsby's GraphQL schema
exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  // get data from PP locations at build time
  const classLocationsEndpoint = `${dashboardBaseUrl}/feeds/coding_space/classes/locations`
  const { locations } = await GET(classLocationsEndpoint)

  for (const location of locations) {
    const { classTypes } = await GET(location.courseOfferingsEndpoint)
    const categoryNames = [...new Set(classTypes.map(ct => ct.categoryName))];

    const uniqId = `pp_class_location_id_${location.classLocationId}`

    const formattedLocation = {
      ...location,
      categoryNames,
    }

    createNode({
      // add arbitrary fields from the data
      ...formattedLocation,
      // required fields
      id: uniqId,
      parent: null,
      children: [],
      internal: {
        type: "ClassLocation",
        contentDigest: createContentDigest(formattedLocation),
      },
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(edge => {
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      });
    });

    // Tag pages:
    let tags = [];
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });
    // Eliminate duplicate tags
    tags = _.uniq(tags);

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`;

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

// set up dynamic signup pages
exports.onCreatePage = ({ page, actions }) => {
  if (page.path.match(/^\/class_sign\_up/)) {
    page.matchPath = "/sign_up/*";
    actions.createPage(page);
  }
};
