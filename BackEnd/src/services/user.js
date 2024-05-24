import { where } from 'sequelize'

const db = require('../models')

export const register = ({UserName, PhoneNumber, Password}) => Promise(async(resolve, reject) => {
    try {
        const response = await db.Users.findOrCreate({
            where: {PhoneNumber},
            default:{
                PhoneNumber,
                Password,
                UserName
            }
        })
        resolve({
            err: response[0] ? 1 : 0,
            mes: response[0] ? 'Register successfully' : 'Phone is used'

        })
    } catch (error) {
        reject(error)
    }
})