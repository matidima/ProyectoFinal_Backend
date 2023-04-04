import moongose, { Schema } from "mongoose";

const AdminCollection = 'admin'

const AdminSchema =  new Schema(
    {
        email: { type: String, require: true },
        password: { type: String, require: true }, 
    }
);

export const AdminModel = moongose.model( AdminCollection, AdminSchema )