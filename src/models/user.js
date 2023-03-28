import moongose, { Schema } from "mongoose";

const UserCollection = 'users'

const UserSchema =  new Schema(
    {
        name: String,
        lastname: String,
        email: String,
        password: String, 
        address: String,
        age: Number,
        phone: Number,
    }
);

export const UserModel = { UserCollection, UserSchema }