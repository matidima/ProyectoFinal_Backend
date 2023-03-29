import moongose, { Schema } from "mongoose";

const UserCollection = 'users'

const UserSchema =  new Schema(
    {
        name: { type: String, require: true },
        lastname: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true }, 
        address: { type: String, require: true },
        age: { type: Number, require: true },
        phone: { type: Number, require: true },
    }
);

export const UserModel = moongose.model( UserCollection, UserSchema )