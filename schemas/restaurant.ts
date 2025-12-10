import {z} from 'zod';

export const RestaurantSchema = z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    cuisine: z.array(z.string().min(1)),
});


export const RestaurantDetailSchema = RestaurantSchema.extend({
    links: z.object({
        name: z.string().min(1, "Link name is required"),
        url: z.string().url("Invalid URL format"),
    }),

    constact: z.object({
        phone: z.string().min(1, "Phone number is required"),
        email: z.string().email("Invalid email format"),
    }),
})


export type Restaurant = z.infer<typeof RestaurantSchema>;
export type RestaurantDetail = z.infer<typeof RestaurantDetailSchema>;