import { Express } from 'express-serve-static-core'

export {}

declare global {
    namespace Express {
        interface Request {
            userEmail?: string;
            isAdmin?: boolean
        }
    }
}