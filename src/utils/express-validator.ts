import { NextFunction, Request, Response } from "express"
import { CustomValidator, validationResult, ValidationError } from "express-validator"

export const usernameValidator: CustomValidator = ( value ) => {
    const regexp = /^[a-zA-Z0-9@\._]*$/
    return regexp.test(value)
}

export const nameValidator: CustomValidator = ( value ) => {
    const regexp = /^[á-úÁ-Úa-zA-ZñÑ\s]*$/
    return regexp.test(value)
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const err = validationResult(req)
    if(!err.isEmpty()) return res.status(400).json({success:false, error: err.array().map(x => x.msg)})
    next()
}