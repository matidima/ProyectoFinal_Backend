import mongoose,{ Schema } from "mongoose";

const UserToValidateCollection = 'usersToValidate'

const UserToValidateSchema =  new Schema(
    {
        name: { type: String, require: true },
        lastname: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true }, 
        address: { type: String, require: true },
        age: { type: Number, require: true },
        phone: { type: Number, require: true },
        code: { type: Number, require: true }
    }
);

export const UserToValidateModel = mongoose.model( UserToValidateCollection, UserToValidateSchema )