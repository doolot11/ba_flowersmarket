const swaggerJSDoc = require("swagger-jsdoc");
const glob = require("glob");

const routeFiles = glob.sync('./src/routes/*.js');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Flower market project",
      version: "1.0.0",
      description: "'Flower Market App' is going to order, sales and purchases",
      contact: {
        email: "doolot928@gmail.com"
      },
    },
    // Todo: {
    //   id: '1',
    //   text: 'test',
    //   done: true
    // },
    servers: [
      { url: "http://localhost:3000/" }
    ]
  },
  apis: routeFiles
}

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;