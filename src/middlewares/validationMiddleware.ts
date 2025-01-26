import { Request, Response, NextFunction } from 'express';
import { createOrderSchema, loginValidationSchema, registerValidationSchema, updateOrderSchema } from '../validations/validationSchemas';
// Middleware for Login validation
export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = loginValidationSchema.validate(req.body);

    if (error) {
        // If validation fails, send a response and do not proceed further
        res.status(400).json({ message: error.details[0].message });
        return; // End the function execution here
    }

    // If validation passes, call next() to proceed to the next middleware or route handler
    next();
};

// Middleware for Registration validation
export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = registerValidationSchema.validate(req.body);

    if (error) {
        // If validation fails, send a response and do not proceed further
        res.status(400).json({ message: error.details[0].message });
        return; // End the function execution here
    }

    // If validation passes, call next() to proceed to the next middleware or route handler
    next();
};



export const validateOrderCreate = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = createOrderSchema.validate(req.body);

    if (error) {
        // If validation fails, send a response and do not proceed further
        res.status(400).json({ message: error.details[0].message });
        return; // End the function execution here
    }

    // If validation passes, call next() to proceed to the next middleware or route handler
    next();
};
export const validateOrderUpdate = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = updateOrderSchema.validate(req.body);

    if (error) {
        // If validation fails, send a response and do not proceed further
        res.status(400).json({ message: error.details[0].message });
        return; // End the function execution here
    }

    // If validation passes, call next() to proceed to the next middleware or route handler
    next();
};

