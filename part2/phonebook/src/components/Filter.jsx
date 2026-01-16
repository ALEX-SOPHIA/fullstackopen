const Filter = ({newFilter, handleFilter}) => {
    return (<p>filter shown with <input value={newFilter} onChange={handleFilter}/> </p>)
}

export default Filter