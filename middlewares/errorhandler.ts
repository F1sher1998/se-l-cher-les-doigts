import { errorResponse } from '../utils/responses.js';
import type { Response, Request, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err)
    errorResponse(res, 'Internal Server Error', 500);
}