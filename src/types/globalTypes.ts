export {IJWTPayload}

interface IJWTPayload {
    userId: string,
    isAdmin: boolean,
    iat: number,
    exp: number,
}

declare namespace Express {
    export interface Request {
        userId: string,
        isAdmin: boolean,
    }
}