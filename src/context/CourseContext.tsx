import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Course {
	courseId: number;
	courseName: string;
	courseCoordinatorEmail: string;
}

interface CourseContextType {
	course: Course | null;
	setCourse: (course: Course) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourse = (): CourseContextType => {
	const context = useContext(CourseContext);
	if (!context) {
		throw new Error('useCourse must be used within a CourseProvider');
	}
	return context;
};

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [course, setCourse] = useState<Course | null>(null);

	return (
		<CourseContext.Provider value={{ course, setCourse }}>
			{children}
		</CourseContext.Provider>
	);
};
