import React from 'react'

const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const Header = ({ course }) => {
    return (
      <div>
        <h2>
          {course.name}
        </h2>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }
  
  const Part = ({ name, exercises }) => {
    return (
      <div>
        <p>
          {name} {exercises}
        </p>
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    return (
      <div>
        <p><b>
          total of {parts.reduce((sum, part) => { return sum + part.exercises }, 0)} exercises
        </b></p>
      </div>
    )
  }

  export default Course