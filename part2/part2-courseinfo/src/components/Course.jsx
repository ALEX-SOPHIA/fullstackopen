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

export default Course