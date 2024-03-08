const venderSchema = require("../model/vender")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const signup = async (req, res) =>  {
    
    const { name, email, password } = req.body
    try {
        
        const existingVender = await venderSchema.findOne({ venderEmail: email})
        if(existingVender){
            return res.status(400).json({ message: "vender already exists"});
        }

        const hashPassword = await bcryptjs.hash(password, 10)

        const result = await venderSchema.create({
            venderName: name,
            venderEmail: email,
            venderPassword: hashPassword
        })

        const token = jwt.sign({email: result.venderEmail, id: result._id}, process.env.JWT_SECRET)
        res.status(201).json({ vender: result, token: token})

    } catch (error) {
        console.log(error);
    }
}


const login = async (req, res) => {

    const { email, password} = req.body
    try {
        
        const existingVender = await venderSchema.findOne({venderEmail: email })
        if(!existingVender){
            return res.status(400).json({ message: "vender not found"})
        }

        const matchPassword = await bcryptjs.compare(password, existingVender.venderPassword)
        if(!matchPassword){
            return res.status(400).json({ message: "invalid password"})
        } 

        if(!existingVender.isApproved){
            return res.status(403).json({ message: 'Vendor not approved yet' });
        }

        const token = await jwt.sign({ email: existingVender.venderEmail, id: existingVender._id}, process.env.JWT_SECRET)
        res.status(200).json({ vender: existingVender, token: token})

    } catch (error) {
        console.log(error);
    }

}

const logout = async (req, res) => {

    const token = req.headers.authorization

    
   
}






module.exports = { signup, login, logout}