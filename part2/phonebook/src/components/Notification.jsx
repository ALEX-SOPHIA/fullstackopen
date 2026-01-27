const Notification = ({message}) => {
    if (message === null) {
        return null
    }
    return (
        <div className="successfulMessage">
            {message}
        </div>
    )
}

export default Notification