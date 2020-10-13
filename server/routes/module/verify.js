const config = require('../../config/info.json');
const time = require('../../config/time');
const mongoose = require('../../config/mongoDB');
const jwt = require('jsonwebtoken');

const jwtVerify = async(token, options = "verify") => {
    if (token) {
        try {
            let tokenDe = jwt.verify(token, config.privateKey);
            if (time.isOverTime(tokenDe.iat)) {
                ctx.body = {
                    status: false,
                    content: "token已过期"
                }
            } else {
                let mongoRes
                if (options != "admin") {
                    mongoRes = await mongoose.Users.findOne({ phoneNumber: tokenDe.phoneNumber });
                } else {
                    mongoRes = await mongoose.Admin.findOne({ username: tokenDe.username });
                }
                if (mongoRes) {
                    if (options == "getMedals") {
                        return {
                            status: true,
                            conetnt: "token合法",
                            tokenDe: tokenDe,
                            user: {
                                phoneNumber: mongoRes.phoneNumber,
                                name: mongoRes.name,
                                getMedals: mongoRes.getMedals,
                                getMedalsNew: mongoRes.getMedalsNew
                            }
                        }
                    } else {
                        return {
                            status: true,
                            conetnt: "token合法"
                        }
                    }
                } else {
                    return {
                        status: false,
                        conetnt: "token不合法"
                    }
                }

            }
        } catch (err) {
            return {
                status: false,
                content: "token不合法或已过期"
            }
        }
    } else {
        return {
            status: false,
            content: '未传入token参数'
        }
    }
}

module.exports = jwtVerify;