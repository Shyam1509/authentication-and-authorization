const dotenv = require("dotenv")
dotenv.config()
const express = require("express");
const dbConnection = require("./config/db");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const venderRoutes = require("./routes/venderRoutes")
const adminRoutes = require("./routes/adminRoutes")
const defaultAdmin = require("./createAdmin")
const PORT = process.env.PORT;

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/vender", venderRoutes)
app.use("/admin", adminRoutes)
app.post("/create-admin", defaultAdmin)


app.listen(PORT, async ()=>{
    console.log("Server is connected");
    await dbConnection()
})