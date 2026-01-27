const Notification = ({successfulMessage, errorMessage}) => {
    if (successfulMessage !== null)
    {return (
        <div className="successfulMessage">
            {successfulMessage}
        </div>
    )}
    
    if (errorMessage !== null)
    {return(
        <div className="errorMessage">
            {errorMessage}
        </div>
    )}
    return null
}

export default Notification