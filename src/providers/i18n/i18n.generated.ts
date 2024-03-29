/* DO NOT EDIT, file generated by nestjs-i18n */

import { Path } from "nestjs-i18n";
export type I18nTranslations = {
    "email": {
        "common": {
            "footer": [
                string,
                string,
                string
            ];
        };
        "registration": {
            "subject": string;
            "html": {
                "header": string;
                "content": [
                    string,
                    string,
                    string
                ];
                "button": string;
            };
        };
        "email-address-confirmation": {
            "subject": string;
            "html": {
                "header": string;
                "content": [
                    string,
                    string,
                    string
                ];
                "button": string;
            };
        };
    };
    "validation": {
        "IS_EMAIL": string;
        "IS_BOOLEAN": string;
        "MIN_LENGTH": string;
        "MAX_LENGTH": string;
        "LENGTH": string;
        "IS_SNAKE_CASE": string;
        "IS_HEX_COLOR": string;
        "IS_UPPER_CASE": string;
        "IS_BIG_INT": string;
        "IS_NOT_EMPTY": string;
        "IS_NOT_EMPTY_OBJECT": string;
        "IS_UUID": string;
        "IS_POSITIVE": string;
        "IS_ENUM": string;
        "IS_POSTAL_CODE": string;
        "IS_ARRAY": string;
        "IS_EQUAL_TO": string;
        "IS_EMAIL_NOT_EXISTS": string;
        "INVALID_BOOLEAN": string;
    };
};
export type I18nPath = Path<I18nTranslations>;
