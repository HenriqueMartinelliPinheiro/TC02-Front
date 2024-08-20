interface EventInterface {
	eventStartDate: Date;
	eventEndDate: Date;
	eventActivities: {
		eventActivityStartDate: Date;
		eventActivityEndDate: Date;
		eventActivityTitle: string;
		eventActivityDescription: string;
	}[];
	eventTitle: string;
	selectedCoursesIds: number[];
	eventStatus?: string | undefined;
}
