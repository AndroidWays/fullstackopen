import React from "react";
interface CoursePart {
    name: string;
    exerciseCount: number;
}

interface TotalProps {
    courseParts: CoursePart[];
}

const Total: React.FC<TotalProps> = ({ courseParts }) => {
    const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);
    return <p>Number of exercises {totalExercises}</p>;
};

export default Total;
