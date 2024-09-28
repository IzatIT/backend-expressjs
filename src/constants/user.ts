export enum USER_ROLES {
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN",
    READER = "READER",
    CLIENT = "CLIENT"
}


export const JWT_SECRET = process.env.JWT_SECRET || "123"