import { userModel } from "../models/user.model.js"
import { adminModel } from "../models/admin.model.js";
import jwt from "jsonwebtoken"

export const validateUserToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({ message: 'Authorization header is required' });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if(!token){
        return res.status(401).json({ message: 'Access token is required' });
    }

    try{
        const user = await userModel.findOne({ 'tokens.accessToken.token': token })

        if(!user){
            return res.status(401).json({ message: 'Invalid token' });
        }

        jwt.verify(token, process.env.PASS_KEY, (err, decoded) => {
            if(err){
                console.error('Token verification error:', err);
                return res.status(401).json({ message: 'Token verification failed' });
            }

            req.user = user;
            next();
        });
    } 
    catch(error){
        console.error('Error finding user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const validateAdminToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({ message: 'Authorization header is required' });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if(!token){
        return res.status(401).json({ message: 'Access token is required' });
    }

    try{
        const admin = await adminModel.findOne({ 'tokens.accessToken.token': token })

        if(!admin){
            return res.status(401).json({ message: 'Invalid token' });
        }

        jwt.verify(token, process.env.PASS_KEY, (err, decoded) => {
            if(err){
                console.error('Token verification error:', err);
                return res.status(401).json({ message: 'Token verification failed' });
            }

            req.admin = admin;
            next();
        });
    } 
    catch(error){
        console.error('Error finding admin:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}