import { z } from "zod";

export const createCourseSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required",
    }),
    capacity: z.string({
        required_error: "capacity is required"
    }),
  }),
});

export const params = z.object({
  courseId: z.string(),
});

export const updateCourseSchema = z.object({
  params,
  body: z
    .object({
      name: z.string(),
      capacity: z.string(),
    })
    .partial(),
});

export const filterQuery = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
});

export type ParamsInput = z.TypeOf<typeof params>;
export type FilterQueryInput = z.TypeOf<typeof filterQuery>;
export type CreateCourseInput = z.TypeOf<typeof createCourseSchema>["body"];
export type UpdateCourseInput = z.TypeOf<typeof updateCourseSchema>;
