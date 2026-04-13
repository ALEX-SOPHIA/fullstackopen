const logger = require('./logger')

//Logger for requests, seperate lines
const requestLogger = (request,response,next) => {
    logger.info('Method:', request.method)
    logger.info('Path:',request.path)
    logger.info('Body:',request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request,response,next) => {
    response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error,request,response,next) => {
    // logger.error(error.message)
    console.log('----- ERROR DETECTED -------')
    console.log('Name ------ ', error.name)
    console.log('Message ---------', error.message)
    console.log('Full Object: ---------', error)
    
    if(error.name === 'CastError') {
        return response.status(400).json({error: 'malformatted id'})
    } else if(error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }
    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}
