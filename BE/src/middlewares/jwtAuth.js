import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
dotenv.config();
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const jwtAuth = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader == undefined)
            throw new Error(
                'please provide token in the header to be able to access this end point'
            );
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        res.status(401).json({ Error: `${err}` });
        return;
    }
    next();
};
export default jwtAuth;