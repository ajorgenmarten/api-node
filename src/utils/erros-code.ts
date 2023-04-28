export default  {
    auth : {
        "invalid_credentials": { code: 1, message: "Invalid credentials" },
        "exist_username": { code: 2, message: "Exist a user with this username" },
        "exist_email": { code: 2, message: "Exist a user with this email" },
        "is_logged": { code: 3, message: "You are logged" },
        "unauthorized": { code: 4, message: "Unauthorized" },
        "jwt_expired": { code: 5, message: "Token expired" }
    },
    server: {
        "not_found": { code: 404, message: "Resource not found"}
    },
    request : {
        "injection": { code: 200, message: "I can to break the rules" },
        "incorrect_username": {code: 201, message: "Only can be contain letters, numbers and ( '@', '.', '_' )"},
        "incorrect_name": {code: 202, message: "Only can be contains letters"},
    },
    mongo : {
        "save": { code: 100, message: "Has ocurred an error to save in database, please try later" },
        "find": { code: 101, message: "Has ocurred an error to find in database, please try later" },
        "update": { code: 102, message: "Has ocurred an error to update in database, please try later" },
        "delete": { code: 103, message: "Has ocurred an error to delete in database, please try later" },
    },
}