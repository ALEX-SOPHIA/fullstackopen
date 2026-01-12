const Course = ({name,parts}) => {
  return (
    <div>
      <Header name = {name} />
      <Content parts = {parts} />
      <Total parts = {parts}/>
    </div>
  )
}
const Header = (props) => <h2>{props.name}</h2>

const Content = ({parts}) => (
  <div>
    {parts.map(part => <Part key={part.id} name={part.name} exercises = {part.exercises}/>
   )}
  </div>
)

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
)

const Total = ({parts}) => {
  const total = parts.reduce((sum, part)=>sum + part.exercises, 0)
  return(
    <p>
      <strong>
        total of {total} exercises
      </strong>
    </p>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => <Course key={course.id} name={course.name} parts={course.parts} />)}
    </div>
  ) 
  
}

export default App