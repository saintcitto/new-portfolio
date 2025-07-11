const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allProjectsJson {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const projects = result.data.allProjectsJson.nodes;
  const projectTemplate = path.resolve('./src/templates/project-detail.js');

  projects.forEach((project) => {
    createPage({
      path: `/projects/${project.slug}/`,
      component: projectTemplate,
      context: {
        id: project.id,
        slug: project.slug,
      },
    });
  });
};