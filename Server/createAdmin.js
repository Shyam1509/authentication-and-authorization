const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const defaultAdminUsername = process.env.DEFAULT_ADMIN_USERNAME
const defaultAdminPassword = process.env.DEFAULT_ADMIN_PASSWORD 

const adminSchema = new mongoose.Schema({
    adminName: String,
    adminPassword: String,
    role: String,
    token: String
  });

const Admin = mongoose.model("Admin", adminSchema) 
const createAdmin = async (req, res)=> {

    try {
        
     const existingAdmin = await Admin.findOne({ role: "admin"})   
     if(!existingAdmin){

         const admin = new Admin({
             
             adminName: defaultAdminUsername,
             adminPassword: defaultAdminPassword,
             role: "admin"
             
            })
            await admin.save()
            
        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET);
        res.json({ admin: admin, token: token})

     } else {
        res.json({ message: 'Admin user already exists.'})
     }

    } catch (error) {
        console.error('Error creating default admin:', error);
    }
}

module.exports = createAdmin;

