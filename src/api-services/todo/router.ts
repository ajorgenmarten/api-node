import { Router } from "express";
import { access, isAuth } from "../auth/middlewares";
import { create, destroy, index, update } from "./controller";
import { createTodoSchema, updateTodoSchema } from "./schema-validation";
const router = Router()

router.get('/',
    isAuth,
    access,
    index)
router.post('/create',
    isAuth,
    access,
    createTodoSchema,
    create)
router.put('/update',
    isAuth,
    access,
    updateTodoSchema,
    update)
router.delete('/delete',
    isAuth,
    access,
    updateTodoSchema,
    destroy)


export default router