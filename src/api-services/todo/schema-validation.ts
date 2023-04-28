import { body } from "express-validator";
import Errors from "../../utils/erros-code";
import { validate } from "../../utils/express-validator";

export const createTodoSchema = [
    body('_id')
        .not()
        .exists()
        .withMessage(Errors.request.injection),
    body('title')
        .exists()
        .trim()
        .notEmpty()
        .isString()
        .escape(),
    body('description')
        .optional()
        .trim()
        .notEmpty()
        .isString()
        .escape(),
    body('author')
        .not()
        .exists()
        .withMessage(Errors.request.injection),
    body('check')
        .not()
        .exists()
        .withMessage(Errors.request.injection),
    validate
]

export const updateTodoSchema = [
    body('_id')
        .exists()
        .withMessage(Errors.request.injection)
        .trim()
        .isString()
        .notEmpty()
        .isMongoId()
        .withMessage(Errors.request.injection),
    body('title')
        .optional()
        .trim()
        .notEmpty()
        .isString()
        .escape(),
    body('description')
        .optional()
        .trim()
        .notEmpty()
        .isString()
        .escape(),
    body('author')
        .not()
        .exists()
        .withMessage(Errors.request.injection),
    body('check')
        .optional()
        .notEmpty()
        .isBoolean()
        .toBoolean(),
    validate
]