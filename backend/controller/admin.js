const venderSchema = require("../model/vender")
const jwt = require("jsonwebtoken")
const defaultAdminUsername = process.env.DEFAULT_ADMIN_USERNAME
const defaultAdminPassword = process.env.DEFAULT_ADMIN_PASSWORD 


const login = (req, res)=> {   
        
        const { name, password } = req.body
        
        if(name === defaultAdminUsername && password === defaultAdminPassword){
            res.json({ message: "Admin logged in successfully"})
        }else {
            res.json({ message: "Invalid credentials. Please try again."});
          }   
}

const authenticateToken = async (req, res, next) =>{
    const token = req.headers.authorization

    if(!token){
        return res.status(401).json({ message: 'Please Login' });
    }
    // console.log(token);
    // console.log(process.env.JWT_SECRET);

    try {
        const admin = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = admin
        next()
            
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(403).json({ message: "Forbidden" });
    }
    
    
}

const isAdmin = async (req, res, next) =>{
    if(req.user.role === 'admin'){
        return next()
    } else {
        return res.status(403).json({ message: 'Admin access required'})
    }
}

const getVenders = async (req, res)=> {

    const allVenders = await venderSchema.find()
    if(allVenders.length === 0){
        return res.status(400).json({ message: "No venders available"})
    }

    res.status(200).json({ AllVenders: allVenders})
}

const approvement = async (req, res)=> {
    const venderId = req.query.venderId

    try {
        
        const updatedVender = await venderSchema.findByIdAndUpdate( venderId, 
            { isApproved: true},
            { new: true })

            if (!updatedVender) {
                return res.status(404).json({ message: 'Vendor not found' });
            }

            res.status(200).json({ message: 'Vendor approved successfully', vender: updatedVender });

    } catch (error) {
        console.error('Error approving vendor:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {login, getVenders, approvement, authenticateToken, isAdmin}