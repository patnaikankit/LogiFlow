import jwt from "jsonwebtoken"

export const generateToken = (data, exp) => {
    // 1day
    if(!exp){
        exp = Date.now()/1000 + 24*60*60;
    }

    const token = jwt.sign({
        exp,
        data
    }, process.env.PASS_KEY)
    return token;
}