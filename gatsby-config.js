require("dotenv").config({  
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: "/bugB2",
  siteMetadata: {
    title: `Bug B. Vintage`,
    description: `Edit this`,
    author: `Will`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-sass",
      `gatsby-plugin-transition-link`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.svg`, // This path is relative to the root of the site.
      },
    },
{
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.API_URL || "https://bugb-backend.herokuapp.com",   contentTypes: [
          // List of the Content Types you want to be able to request from Gatsby.
          "collections",
          "clothing-images",
          "clothing-piece",
        ],
          singleTypes:[
              "front-page",
              "large-nav",
          ],
        queryLimit: 1000,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
