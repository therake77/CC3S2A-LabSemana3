require('dotenv').config()
const Fastify = require('fastify')
const moongose = require('mongoose')
const fastify = Fastify( {logger : true} )

moongose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
    .catch(err => console.error('Error al conectar a BD:', err))

fastify.register(require('/src/routes/todo.routes'), {prefix : '/api/todos'})

const start = async () => {
    try {await fastify.listen({port: process.env.PORT || 3000, host: '0.0.0.0'})}
    catch(err){fastify.log.error(err); process.exit(1)}
}

start()