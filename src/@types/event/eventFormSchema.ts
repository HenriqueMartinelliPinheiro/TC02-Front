import { z } from 'zod';

export const eventActivitySchema = z.object({
	eventActivityTitle: z.string().min(2),
	eventActivityStartDate: z
		.string()
		.min(1, { message: 'A data de início é obrigatória.' }),
	eventActivityEndDate: z.string().min(1, { message: 'A data de fim é obrigatória.' }),
	eventActivityDescription: z.string().min(1, { message: 'A descrição é obrigatória.' }),
});

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
	eventActivities: z.array(eventActivitySchema).optional(),
});
