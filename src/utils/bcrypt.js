import bcrypt from 'bcrypt'

const validatePassword = (password, userDB) => bcrypt.compareSync(password, userDB.password)
const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const BCRYPT_VALIDATION = { hashPassword, validatePassword }