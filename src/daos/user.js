/* import { mongoDBContainer } from "../containers/mongoDBContainer.js";
import { UserModel } from "../models/index.js";
import logger from "../utils/loggers.js";

export class UsersMongo extends mongoDBContainer {

    static getInstance() {
        return new UsersMongo()
    }

    constructor() {

        if(typeof UsersMongo.instance === 'object'){
            return UsersMongo.instance
        }

        super({
            name: UserModel.UserCollection,
            schema: UserModel.UserSchema,
        });
        
        UsersMongo.instance = this
        return this
    }

    async getAllUser() {
        try {
            return await super.getAll()
        } catch (error) {
            logger.error(`error in getAllUser-UsersMongo - Error: `, error)
        }
    }

    async saveUser(element) {
        try {
            return await super.save(element)
        } catch (error) {
            logger.error(`error in saveUser-UsersMongo - Error: `, error)
        }
    }

    async updateUserById(id, newData) {
        try {
            return await super.updateById(id, newData)
        } catch (error) {
            logger.error(`error in updateUserById-UsersMongo - Error: `, error)
        }
    }

    async getOneUser(options) {
        try {
            return await super.getOne(options)
        } catch (error) {
            logger.error(`error in getOneUser-UsersMongo - Error: `, error)
        }
    }
} */