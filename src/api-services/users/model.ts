import bcrypt from 'bcrypt';
import { Types, Schema, model, Model } from 'mongoose'
import { IUser, IUserInstanceMethods, Session } from './types';
import { toUserSession } from "../../utils/ua-parser";

const sessionSchema = new Schema<Session, Model<Session>>({
    name: {type:String, required:true},
    token: {type:String, required:true},
    created: {
        type: Date,
        default: Date.now()
    }
})

sessionSchema.pre('save', function(next) {
    if(!this.isModified('name')) return next()
    this.name = toUserSession(this.name)
    return next()
})

const userSchema = new Schema<IUser, Model<IUser>, IUserInstanceMethods>({
    name:{type:String, required:true},
    username:{type:String, required:true},
    password:{type:String, required:true},
    email:String,
    sessions: {type:[sessionSchema], required:true, default:[]},
    roles: [{ref:'role', type: Types.ObjectId}]
}, {
    versionKey:false,
    timestamps:true,
})

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    return next()
})

userSchema.methods.comparePassword = async function (plainPassword:string) {
    return await bcrypt.compare(plainPassword, this.password)
}

export default model<IUser, Model<IUser, {}, IUserInstanceMethods>>('user', userSchema)