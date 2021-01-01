require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken:
    process.env.CONTENTFUL_ACCESS_TOKEN ||
    process.env.CONTENTFUL_DELIVERY_TOKEN,
};

// If you want to use the preview API please define
// CONTENTFUL_HOST and CONTENTFUL_PREVIEW_ACCESS_TOKEN in your
// environment config.
//
// CONTENTFUL_HOST should map to `preview.contentful.com`
// CONTENTFUL_PREVIEW_ACCESS_TOKEN should map to your
// Content Preview API token
//
// For more information around the Preview API check out the documentation at
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
//
// To change back to the normal CDA, remove the CONTENTFUL_HOST variable from your environment.
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST;
  contentfulConfig.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
}

const {spaceId, accessToken} = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.',
  );
}

module.exports = {
  siteMetadata: {
    title: 'Gatsby Contentful starter',
  },
  pathPrefix: '/gatsby-contentful-starter',
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
  ],
};

//
// // In your gatsby-config.js
// module.exports = {
//   plugins: [
//     {
//       resolve: `gatsby-plugin-google-analytics`,
//       options: {
//         // The property ID; the tracking code won't be generated without it
//         trackingId: 'YOUR_GOOGLE_ANALYTICS_TRACKING_ID',
//         // Defines where to place the tracking script - `true` in the head and `false` in the body
//         head: false,
//         // Setting this parameter is optional
//         anonymize: true,
//         // Setting this parameter is also optional
//         respectDNT: true,
//         // Avoids sending pageview hits from custom paths
//         exclude: ['/preview/**', '/do-not-track/me/too/'],
//         // Delays sending pageview hits on route update (in milliseconds)
//         pageTransitionDelay: 0,
//         // Enables Google Optimize using your container Id
//         optimizeId: 'YOUR_GOOGLE_OPTIMIZE_TRACKING_ID',
//         // Enables Google Optimize Experiment ID
//         experimentId: 'YOUR_GOOGLE_EXPERIMENT_ID',
//         // Set Variation ID. 0 for original 1,2,3....
//         variationId: 'YOUR_GOOGLE_OPTIMIZE_VARIATION_ID',
//         // Defers execution of google analytics script after page load
//         defer: false,
//         // Any additional optional fields
//         sampleRate: 5,
//         siteSpeedSampleRate: 10,
//         cookieDomain: 'example.com',
//       },
//     },
//   ],
// };
//
// // In your gatsby-config.js
// module.exports = {
//   plugins: ['gatsby-plugin-webpack-bundle-analyzer'],
// };
