import "dotenv/config"
export default {
    jwt: {
        secret: process.env.JWT_STRING || "default",
        expiresIn: "365d"
    }
}