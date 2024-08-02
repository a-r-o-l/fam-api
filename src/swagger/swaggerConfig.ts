import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
  },
  apis: ["./src/swagger/docs/*.ts"], // Ruta a tus archivos de rutas
};

const swaggerDocs = swaggerJSDoc(options);

export default swaggerDocs;
