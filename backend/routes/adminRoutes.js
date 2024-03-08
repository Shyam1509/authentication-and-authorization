const express = require("express")
const { login, approvement, authenticateToken, isAdmin, getVenders} = require("../controller/admin")

const adminRoutes = express.Router()

adminRoutes.post("/login", login)
adminRoutes.get("/get-venders", authenticateToken, isAdmin, getVenders)
adminRoutes.put("/approve", approvement)


module.exports = adminRoutes