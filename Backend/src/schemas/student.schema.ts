import { z } from "zod";

export const createStudentSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required",
    }),
    date_of_birth: z.string({
      required_error: "content is required",
    }),
    gender: z.string({
        required_error: "gender is required"
    })
  }),
});

export const params = z.object({
  studentId: z.string(),
});

export const updateStudentSchema = z.object({
  params,
  body: z
    .object({
      name: z.string(),
      date_of_birth: z.string(),
      gender: z.string(),
    })
    .partial(),
});

export const filterQuery = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
});

export type ParamsInput = z.TypeOf<typeof params>;
export type FilterQueryInput = z.TypeOf<typeof filterQuery>;
export type CreateStudentInput = z.TypeOf<typeof createStudentSchema>["body"];
export type UpdateStudentInput = z.TypeOf<typeof updateStudentSchema>;
