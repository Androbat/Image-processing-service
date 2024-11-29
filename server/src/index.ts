import express from "express";
import { baseRouter } from "./router";
// import morgan  from "morgan";
import { initServer } from "./server";
import morgan from "morgan";

export const app = express();
export const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", baseRouter);
app.use(morgan("dev"));
// app.use(cors());


function init(){
  app.listen(PORT, () => {
    initServer(app)
    console.log(`Server is running on http://localhost:${PORT}`);
  }); 
}

init();



