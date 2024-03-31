import { z } from "zod";

export const createEnrollmentSchema = z.object({
    body: z.object({
        studentId: z.string({
            required_error: "student required",
        }),
        courseId: z.string({
            required_error: "course is required"
        })
    })
});

export const params = z.object({
    enrollmentId: z.string(),
});
  
export type ParamsInput = z.TypeOf<typeof params>;
export type CreateEnrollmentInput = z.TypeOf<typeof createEnrollmentSchema>["body"];
