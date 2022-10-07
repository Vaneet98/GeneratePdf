const express= require("express")
const app =express()
const port=2030
const bodyParser = require("body-parser");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDocs = require("./swagger.json");

app.use("/swagger-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

//use for use the req.body for take a data from frontend
app.use(bodyParser.json());
//data comes from frontend in the form of form in url
app.use(bodyParser.urlencoded({ extended: false }));


require("./config/connectionDB").connect()
require("./config/connectionDB").syn()
const route= require("./routes/userRouter.js")

require("./models/index")
app.get("/",(req,res)=>{
    res.send("Home page")
})
app.use("/user",route)
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})