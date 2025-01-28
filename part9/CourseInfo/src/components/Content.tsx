import React from "react";
interface CoursePart {
    name: string;
    exerciseCount: number;
}

interface ContentProps {
    courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
    return (
        <div>
            {courseParts.map((part, index) => (
                <p key={index}>
                    {part.name} {part.exerciseCount}
                </p>
            ))}
        </div>
    );
};

export default Content;
