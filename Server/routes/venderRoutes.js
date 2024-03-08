const express = require("express")
const { signup, login, logout} = require("../controller/vender")

const venderRoutes = express.Router()

venderRoutes.post("/signup", signup)

venderRoutes.post("/login", login)

venderRoutes.get("/logout", logout)

module.exports = venderRoutes