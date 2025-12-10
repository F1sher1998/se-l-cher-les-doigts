import type {Request, Response, NextFunction} from 'express';
import { initializeRedisClient } from '../utils/client.js';
import { restaurantKeyById } from '../utils/keys.js';
import { errorResponse } from '../utils/responses.js';

export const checkRestaurantExists = async(req: Request, res: Response, next: NextFunction) => {
    const { restaurantId } = req.params
    if(!restaurantId) {
        return errorResponse(res, "Restaurant id was not found", 400)
    }

    const client = await initializeRedisClient();
    const restaurantKey = restaurantKeyById(restaurantId)
    const exists = await client.exists(restaurantKey);
    if(!exists){
        errorResponse(res, "Restaurant was not found", 400)
    }

    next()
}