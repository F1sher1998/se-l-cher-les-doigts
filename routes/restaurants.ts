import express from 'express';
import { validate } from '../middlewares/validate.js';
import { nanoid } from 'nanoid';
import { restaurantKeyById } from '../utils/keys.js';
import type { Restaurant } from '../schemas/restaurant.js';
import { RestaurantSchema } from '../schemas/restaurant.js';
import { checkRestaurantExists } from '../middlewares/checkRestaurantId.js';
import { initializeRedisClient } from '../utils/client.js';
import { successResponse } from '../utils/responses.js';
import type {Request, Response, NextFunction} from 'express';

const router = express.Router();

router.post("/", validate(RestaurantSchema), async (req, res, next) => {
  const data = req.body as Restaurant;
  try{
    const client = await initializeRedisClient()
    const id = nanoid()
    const restaurantKey = restaurantKeyById(id);
    const hashData = {id, name: data.name, location: data.address}
    const addResult = await client.hSet(restaurantKey, hashData)
    console.log(`Added ${addResult} fields`)
    return successResponse(res, hashData, "Added new restaurant")
  } catch(error){
    next(error)
  }
});


router.get("/:restaurantId", checkRestaurantExists, async (
  req: Request<{ restaurantId: string }>, res: Response, next
) => {
  const { restaurantId } = req.params;
  try{
    const client = await initializeRedisClient()
    const restaurantKey  = restaurantKeyById(restaurantId);
    const [viewCount, restaurant] = await Promise.all([
      client.hIncrBy(restaurantKey, "viewCount", 1), 
      client.hGetAll(restaurantKey)
    ]);
    return successResponse(res, {name: restaurant.name, view_count: viewCount})
  }catch(error){
    next(error)
  }
})

export default router;