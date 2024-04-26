const apiMessages = {
    EMPTY_REQUEST_BODY: 'empty_request_body',
    INTERNAL_SERVER_ERROR: 'internal_server_error',
    USER: {
        USER_ALREADY_EXISTS: 'user_exists',
        INVALID_EMAIL: 'invalid_email',
        INVALID_PASSWORD: 'invalid_password',
        INVALID_CREDENTIALS: 'invalid_credentials',
        INVALID_AGE: 'invalid_age',
        TOKEN_NOT_PROVIDED: 'token_not_provided',
        INVALID_TOKEN: 'invalid_token',
        INVALID_PASSWORD_OR_EMAIL: 'invalid_password_or_email',
        FIRSTNAME_NOT_STRING: 'first_name_not_string',
        LASTNAME_NOT_STRING: 'last_name_not_string',
        PASSWORD_NOT_STRING: 'password_not_string',
        EMAIL_NOT_STRING: 'email_not_string',
        AGE_NOT_NUMBER: 'age_not_number',
    },
    TASK: {
        TITLE_NOT_STRING: 'title_not_string',
        INVALID_TITLE_LENGTH: 'invalid_title_length',
        TASK_IS_NOT_OWNED: 'task_is_not_owned',
        DESCRIPTION_NOT_STRING: 'description_not_string',
        INVALID_DESCRIPTION_LENGTH: 'invalid_description_length',
        TASK_NOT_FOUND: 'task_not_found',
        TASK_ID_NOT_NUMBER: 'task_id_not_number',
    },
    NOTE: {
        TITLE_NOT_STRING: 'title_not_string',
        TEXT_NOT_STRING: 'text_not_string',
        INVALID_TITLE_LENGTH: 'invalid_title_length',
        INVALID_TEXT_LENGTH: 'invalid_text_length',
        NOTE_NOT_FOUND: 'note_not_found',
    }
};

module.exports = {
    apiMessages,
};
