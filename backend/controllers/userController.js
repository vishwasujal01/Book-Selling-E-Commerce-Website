import jwt from "jsonwebtoken";


//Route for admin login 
const adminlogin = async (req, res) => {
    try {
        
        const {email, password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET);
            res.json({success:true, token})
        } else {
            res.json({success: false, message: "Invalid Email or Password"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

export { adminlogin } ;