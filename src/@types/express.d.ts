// @types/express.d.ts
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: { id: number; role: string }; // Adjust the properties as needed
        }
    }
}
