import dotenv from "dotenv"
dotenv.config()

import mongoose, { Types } from "mongoose"
import "../src/database"
import User from '../src/api-services/users/model'
import Role from '../src/api-services/roles/model'
import Permission from '../src/api-services/permissions/model'
import {permissions, roles, users} from "./data.json"


const log = (...data: string[]) => {
    data.forEach(v => {
        console.log(`install ---> ${v}`)
    })
}

const init = async () => {
    let savedPermissions: Promise<any>[] = []
    let savedRoles: Promise<any>[] = []
    let savedUsers: Promise<any>[] = []
    log('creating permissions...')
    savedPermissions = permissions.map( permission => {
        return Permission.create(permission)
    });
    await Promise.all(savedPermissions)
    log('permissions creatd')
    log('creating roles...')
    savedRoles = roles.map(async role => {
        const permissions = await Promise.all(role.permissions.map(async pname => {
            const havePermisions = await Permission.findOne({name:pname})
            if(havePermisions) return havePermisions._id
            return undefined
        }))
        const roleModel = new Role()
        roleModel.name = role.name
        if(permissions)
            roleModel.permissions = permissions.filter(x => x) as Types.ObjectId[]
        return roleModel.save()
    })
    await Promise.all(savedRoles)
    log('roles created')
    log('creating users...')
    savedUsers = users.map(async user => {
        const {roles, ...userDoc} = user
        const roles_array = await Promise.all(roles.map(async role => {
            const existRole = await Role.findOne({name:role})
            if(existRole) return existRole._id
            return undefined
        }))
        const userModel = new User(userDoc)
        if(roles_array) userModel.roles = roles_array.filter(x => x) as Types.ObjectId[]
        return userModel.save()
    })
    await Promise.all(savedUsers)
    log('users created')
    process.exit(0)
}

mongoose.connection.once('open', init)