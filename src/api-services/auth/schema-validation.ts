import { body } from 'express-validator'
import Errors from "../../utils/erros-code";
import { nameValidator, usernameValidator, validate } from '../../utils/express-validator'

export const registerSchema = [
    body('_id')
        .not()
        .exists()
        .withMessage(Errors.request.injection),
    body('name')
        .exists()
        .trim()
        .notEmpty()
        .isLength({min:4, max:50})
        .custom(nameValidator)
        .withMessage(Errors.request.incorrect_name),
    body('username')
        .exists()
        .trim()
        .notEmpty()
        .isLength({min:4, max:20})
        .custom(usernameValidator)
        .withMessage(Errors.request.incorrect_username),
    body('password')
        .exists()
        .notEmpty()
        .isLength({min:6, max:20}),
    body('email')
        .not()
        .exists()
        .withMessage(Errors.request.injection),
    body('roles')
        .not()
        .exists()
        .withMessage(Errors.request.injection),
    body('sessions')
        .not()
        .exists()
        .withMessage(Errors.request.injection),
    validate
]