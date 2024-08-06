import { z } from 'zod';

export const editCourseFormSchema = z.object({
	coordinatorEmail: z.string().email({
		message: 'Email Inválido',
	}),
	courseName: z.string(),
	courseId: z.number(),
});
