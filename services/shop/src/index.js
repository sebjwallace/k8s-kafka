const express = require('express')
const app = express()
const port = 3000
const { Kafka } = require('kafkajs')

const topic = 'first'

let connection = null
let producer = null
let consumer = null

app.get('/send', async (req, res) => {

    await producer.send({
        topic,
        messages: [
            { value: req.query.message }
        ]
    })

	console.log('producer sent ' + req.query.message)
    res.send('sent ' + req.query.message)
})

app.listen(port, async () => {
	console.log('listening on 3000')

	connection = new Kafka({
		clientId: 'app',
		brokers: ['kafka.kafka-ca1:9092']
	})

	producer = connection.producer({ acks: -1 }) // all replicas ack
	await producer.connect()

	consumer = connection.consumer({ groupId: 'test-group' })
	await consumer.connect()
	await consumer.subscribe({ topic })
	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			console.log({
				consumer: 2,
				value: message.value.toString()
			})
		}
	})
	
	console.log('kafka ready')
})