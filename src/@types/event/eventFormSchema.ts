import { z } from 'zod';

export const eventFormSchema = z.object({
	eventTitle: z
		.string()
		.min(2, { message: 'O título do evento deve ter pelo menos 2 caracteres.' }),
	eventStartDate: z.string(),
	eventEndDate: z.string(),
	selectedCoursesIds: z
		.array(
			z.number().nonnegative({ message: 'O ID do curso deve ser um número positivo.' })
		)
		.min(1, { message: 'Deve haver pelo menos um curso permitido para o evento.' }),
	eventStatus: z.string().optional(),
});
