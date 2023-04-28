import { Schema, model } from "mongoose";
import { IPermission } from "./types";

const permissionSchema = new Schema<IPermission>({
    name: String,
    description: String,
}, {
    timestamps: true,
    versionKey: false
})

export default model<IPermission>('permission', permissionSchema)