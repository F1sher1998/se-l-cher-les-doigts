import type { Response } from 'express';

export function successResponse(res: Response, data: any, message = 'Success', statusCode = 200) {
  return res.status(200).json({
    message,
    data,
  });
}

export function errorResponse(res: Response, error: any, statusCode:number = 500) {
  return res.status(statusCode).json({
    error
  });
}