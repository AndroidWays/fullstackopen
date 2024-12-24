import React from 'react';

// Header component: Displays the course name
const Header = (props) => {
    return (
        <div>
            <h1>{props.course.name}</h1>
        </div>
    );
};

// Content component: Displays each part of the course with its corresponding exercises
const Content = (props) => {
    return (
        <div>
            {props.course.parts.map((part, index) => (
                <p key={index}>
                    {part.name} {part.exercises}
                </p>
            ))}
        </div>
    );
};

// Total component: Calculates and displays the total number of exercises in the course
const Total = (props) => {
    const totalExercises = props.course.parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <p>
            Total number of exercises: {totalExercises}
        </p>
    );
};

// App component: Main component that holds the course data and renders Header, Content, and Total components
const App = () => {
    // Course data object
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    };

    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    );
};

export default App;
