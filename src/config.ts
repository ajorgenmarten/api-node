export default {
    SERVER: {
        MODE: process.env.MODE || 'dev',
        PORT: process.env.SERVER_PORT || 3000
    },
    DB: {
        URI: process.env.DB_URI || 'mongodb://127.0.0.1:27017/api-node'
    },
    JWT: {
        REFRESH: process.env.JWT_REFFRESH || 'somesecretrefresh',
        ACCESS: process.env.JWT_ACCESS || 'somesecretaccess'
    },
}