import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'
import { sendEmail } from '../utils/sendmail.js';


import { generateOTP, hashOTP } from '../utils/otp.js'
export const register = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password)
        return res.status(400).json({ message: "something is missing" })

    try {

        const existinguser = await User.findOne({ email })
        if (existinguser) {
            return res.status(400).json({ message: "User already exist" })
        }

        const hashpassword = await bcrypt.hash(password, 10)
        const otp = generateOTP()
        const otpHash = hashOTP(otp)
        const otpExpiry = new Date(Date.now() + 5 * 60000);

        const user = new User({
            name,
            email,
            password: hashpassword,
            otpHash,
            otpExpiry,
            isVerified: false,
        });
        await user.save()
          await sendEmail(email, 'Your OTP Code',`Your verification OTP is ${otp}` )
        res.status(201).json({ message: 'OTP sent to your e_mail. Please verify for login.' })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}








