const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

// Temp Location Phone Numbers
const locationNumbers = [
  { name: "Upper East Side", locationId: 1, phoneNumber: "(929) 352-1272" },
  { name: "Park Slope", locationId: 3, phoneNumber: "(929) 352-1272" },
  { name: "Online", locationId: 10, phoneNumber: "(929) 352-1272" },
  { name: "Westchester", locationId: 17, phoneNumber: "(914) 559-2665" },
  { name: "LI", locationId: 18, phoneNumber: "(516) 284-8634" },
];

// load ENV vars to process
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

// API helpers
const fetch = require("cross-fetch");
const dashboardBaseUrl = process.env.DASHBOARD_BASE_URL;

const GET = url => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  console.log("- GET-ing url", url);

  return fetch(url, { headers })
    .then(res => {
      if (res.ok) {
        return res;
      } else {
        return Promise.reject(new Error(res.statusText));
      }
    })
    .then(res => res.json());
};

// load data from PP Dashboard into gatsby's GraphQL schema
exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  // get data from PP locations at build time
  console.log("Loading class locations from PP Dashboard");

  const classLocationsEndpoint = new URL(
    "/feeds/coding_space/classes/locations",
    dashboardBaseUrl
  );
  const { locations } = await GET(classLocationsEndpoint);

  console.log(
    `- adding ${locations.length} ClassLocation nodes to GraphQL schema`
  );

  for (const location of locations) {
    if (location.courseOfferingsEndpoint) {
      const { classTypes } = await GET(location.courseOfferingsEndpoint);
      const categoryIds = [...new Set(classTypes.map(ct => ct.categoryId))];

      const uniqId = `pp_class_location_id_${location.classLocationId}`;


      locationNumbers.map(locationNumber => {
        if (locationNumber.locationId === location.classLocationId) {
          location.phoneNumber = locationNumber.phoneNumber;
        }
      });

      const formattedLocation = {
        ...location,
        categoryIds,
      };

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
      });
    } else {
      throw new Error(
        `Missing 'courseOfferingsEndpoint' for location: ${JSON.stringify(
          location
        )}`
      );
    }
  }
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  // add pages for all MD files
  await graphql(`
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

  // add pages for all classLocations
  await graphql(`
    {
      allClassLocation {
        nodes {
          classLocationId
          code
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const locations = result.data.allClassLocation.nodes;

    locations.forEach(node => {
      const { classLocationId, code } = node;
      createPage({
        path: `/locations/${code}`,
        component: path.resolve(`src/templates/location.js`),
        // additional data can be passed via context
        context: {
          classLocationId,
          code,
        },
      });
    });
  });
};

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });

    if (
      !!node.frontmatter &&
      node.frontmatter.templateKey === `experience-levels`
    ) {
      if (node.frontmatter.courseOfferingEndpoint) {
        console.log(`Loading extras for`, node.frontmatter.title);
        const classTypesEndpoint = new URL(
          node.frontmatter.courseOfferingEndpoint,
          dashboardBaseUrl
        );
        const { classTypes } = await GET(classTypesEndpoint);
        const semesters = [...new Set(classTypes.map(ct => ct.semester))];
        createNodeField({
          node,
          name: `extras`,
          value: { semesters },
        });
      } else {
        throw new Error(
          `Missing 'courseOfferingEndpoint' for 'experience-level' node: ${JSON.stringify(
            node
          )}`
        );
      }
    }
  }
};

// set up dynamic signup pages
exports.onCreatePage = ({ page, actions }) => {
  if (page.path.match(/^\/class_sign\_up/)) {
    page.matchPath = "/sign_up/*";
    actions.createPage(page);
  }

  // cart recovery
  if (page.path.match(/^\/checkout/)) {
    page.matchPath = "/checkout/*";
    actions.createPage(page);
  }
};
