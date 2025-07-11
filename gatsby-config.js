/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `My Portfolio`,
    description: `Crafting Cinematic Experiences. A portfolio website showcasing film and video projects.`,
    author: `@saintcitto`,
    siteUrl: `https://www.yourdomain.com`, // Ganti dengan URL domain Anda
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
        // Tambahkan 'gif' ke daftar ekstensi yang diproses
        ignore: [`**/\.*`], // ignore files starting with a dot
        patterns: [`**/*.{jpg,jpeg,png,webp,avif,gif}`], // Pastikan GIF termasuk
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
  ],
};
