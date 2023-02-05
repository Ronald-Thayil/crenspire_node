import express from "express";
import cors from "cors";
import dbConect from "./src/helper/dbConnection.js";
import router from "./src/router/index.js";

const PORT = 4000 || process.env.PORT;
const App = express();
dbConect
  .then((data) => {
    console.log("Started Server");
  })
  .catch((error) => {
    console.log("errorValues", error);
  });

App.use(express.json());
App.use(cors());
App.use('/api',router)


App.listen(PORT, () => {
  console.log("started server", PORT);
});
