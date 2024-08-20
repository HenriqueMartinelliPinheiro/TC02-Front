import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CourseContextType {
	course: CourseInterface | null;
	setCourse: (course: CourseInterface) => void;
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
	const [course, setCourse] = useState<CourseInterface | null>(null);

	return (
		<CourseContext.Provider value={{ course, setCourse }}>
			{children}
		</CourseContext.Provider>
	);
};
