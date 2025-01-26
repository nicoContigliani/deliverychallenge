import Joi from 'joi';

// Schema for Login
export const loginValidationSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a string.',
        'string.empty': 'Email is required.',
        'string.email': 'Please provide a valid email.',
    }),
    password: Joi.string().min(6).required().messages({
        'string.base': 'Password must be a string.',
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 6 characters long.',
    }),
});

// Schema for Registration
export const registerValidationSchema = Joi.object({
    fullname: Joi.string().min(3).max(50).required().messages({
        'string.base': 'Full name must be a string.',
        'string.empty': 'Full name is required.',
        'string.min': 'Full name must be at least 3 characters long.',
        'string.max': 'Full name must be at most 50 characters long.',
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a string.',
        'string.empty': 'Email is required.',
        'string.email': 'Please provide a valid email.',
    }),
    password: Joi.string().min(6).required().messages({
        'string.base': 'Password must be a string.',
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 6 characters long.',
    }),
});

export const createOrderSchema = Joi.object({
    items: Joi.array()
        .items(Joi.object({
            id: Joi.number().integer().required(),
        }))
        .required(),
    totalAmount: Joi.number().min(0).required(),
    status: Joi.string().required(),
    isDeleted: Joi.boolean().optional(),
});

export const updateOrderSchema = Joi.object({
    items: Joi.array()
        .items(Joi.object({
            id: Joi.number().integer().required(),
        }))
        .optional(),
    totalAmount: Joi.number().min(0).optional(),
    status: Joi.string().optional(),
});