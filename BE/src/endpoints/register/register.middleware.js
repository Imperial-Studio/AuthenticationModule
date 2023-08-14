import express from 'express';
import Joi from 'joi';
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns
 */
const registerValidation = async (req, res, next) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
        });
        await schema.validateAsync(req.body);
        next();
    }
    catch (err) {
        res.status(401).json({ Error: `${err}` });
        return;
    }
};
export default registerValidation;
