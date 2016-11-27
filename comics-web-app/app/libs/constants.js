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

    SESSION_KEY_1:                  process.env.KEY_SESSION_1,
    SESSION_KEY_2:                  process.env.KEY_SESSION_2,

    SECRET_JWT:                     process.env.SECRET_JWT,

    ERROR:                          "Error.",
    NOT_VERIFIED_EMAIL:             "User email is not verified.",
    PASSWORD_ERROR:                 "Incorrect password.",
    EMAIL_ERROR:                    "Incorrect email.",
    NO_VALID_USER:                  "No valid user.",
    ERROR_SAVING:                   "Error during saving.",
    ERROR_SENDING:                  "Error during sending.",
    DIFFERENT_PASSWORDS:            "Passwords are different.",
    ERROR_SIGN_UP:                  "Error during signing up.",
    USER_EXIST:                     "User with such data already exist.",
    USER_NOT_FOUND:                 "User was not found.",
    CONFIRM_MESSAGE:                "Confirmation was send on your email.",

    ERROR_DURING_IMAGE_UPLOAD:      "Image was not changed.",
    ERROR_CHANGE_USERNAME:          "Username was not changed.",
    ERROR_CHANGE_EMAIL:             "Email was not changed.",
    USERNAME_CHANGED:               "Your name was successfully changed.",
    PASSWORD_CHANGED:               "Your password was successfully changed.",
    AVATAR_CHANGED:                 "Your avatar was successfully changed.",
    ERROR_PREVIOUS_PASSWORD:        "Previous password is wrong."

};