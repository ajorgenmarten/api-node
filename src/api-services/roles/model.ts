import { model, Schema } from "mongoose";
import { IRole } from "./types";

const roleSchema = new Schema<IRole>({
    name: String,
    permissions: [{ref:'permission', type: Schema.Types.ObjectId}]
}, {
    timestamps: true,
    versionKey: false
})

export default model<IRole>('role', roleSchema)