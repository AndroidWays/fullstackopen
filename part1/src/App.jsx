import React from 'react';

const Header = (props) => {
  console.log('Header component rendering');
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  console.log('Part component rendering');
  return <p>{props.part} {props.exercises}</p>;
};

const Content = (props) => {
  console.log('Content component rendering');
  return (
    <div>
      {props.parts.map(part => <Part key={part.part} part={part.part} exercises={part.exercises} />)}
    </div>
  );
};

const Total = (props) => {
  console.log('Total component rendering');
  const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Number of exercises {totalExercises}</p>;
};

const App = () => {
  console.log('App component rendering');
  const course = 'Half Stack application development';
  const parts = [
    { part: 'Fundamentals of React', exercises: 10 },
    { part: 'Using props to pass data', exercises: 7 },
    { part: 'State of a component', exercises: 14 }
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;