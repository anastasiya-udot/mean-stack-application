/**
 * Created by anastasiya on 11.11.16.
 */
module.exports.constant = {
    USER_EMAIL:                     process.env.SEND_USER,
    USER_PASSWORD:                  process.env.SEND_PASSWORD,
    ENV:                            process.env.NODE_ENV,
    CLOUD_NAME:                     process.env.CLOUD_NAME,
    CLOUD_API_KEY:                  process.env.API_KEY,
    CLOUD_API_SECRET:               process.env.API_SECRET,

    ERROR:                          "Error",
    NOT_VERIFIED_EMAIL:             "User email is not verified",
    PASSWORD_ERROR:                 "Incorrect password",
    EMAIL_ERROR:                    "Incorrect email",
    NO_VALID_USER:                  "No valid user",
    ERROR_SAVING:                   "Error during saving",
    ERROR_SENDING:                  "Error during sending",
    DIFFERENT_PASSWORDS:            "Passwords are different",
    ERROR_SIGN_UP:                  "Error in signing up",
    USER_EXIST:                     "User with such data already exist",
    CONFIRM_MESSAGE:                "Confirmation was send on your email",
    SUCCESS_PASSWORD_CHANGED:       "Password was successfully changed"
};