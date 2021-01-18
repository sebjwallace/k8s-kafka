const express = require('express')
const { Kafka } = require('kafkajs')

const app = express()
const port = 3000
const topic = 'test-topic'

let connection = null
let producer = null

const serviceId = Math.floor(Math.random() * 10000)

app.get('/send', async (req, res) => {

	console.log('SENDING MESSAGE')

    await producer.send({
        topic,
        messages: [
            { value: req.query.message }
        ]
	})
	
	console.log('producer sent ' + req.query.message, serviceId)
    res.send('sent ' + req.query.message)
})

app.listen(port, async () => {
	console.log('listening on 3000')

	connection = new Kafka({
		clientId: 'app',
		brokers: ['kafka.default:9092']
	})

	producer = connection.producer({ acks: -1 }) // all replicas ack
	await producer.connect()
	
	console.log('kafka ready', serviceId)
})