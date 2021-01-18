const express = require('express')
const app = express()
const port = 3000
const { Kafka } = require('kafkajs')

const topic = 'test-topic'

let connection = null
let producer = null
let consumer = null

const podId = Math.floor(Math.random() * 10000)

app.listen(port, async () => {
	console.log('starting ' + podId)

	connection = new Kafka({
		clientId: 'app',
		brokers: ['kafka.default:9092']
	})

	consumer = connection.consumer({ groupId: 'test-consumer-group' })
	await consumer.connect()
	await consumer.subscribe({ topic, fromBeginning: false })
	await consumer.run({
		eachMessage: async ({ topic, partition, message }) => {
			if(Math.random() > 0.8){
				console.log('pod ' + podId + ' is not going to process "' + message.value.toString() + '". shutting down')
				return process.exit()
			}
			console.log({
				podId,
				consumer: 'carrier',
				topic,
				partition,
				offset: message.offset.toString(),
				value: message.value.toString()
			})
		}
	})
	
	console.log('carrier: kafka ready', podId)
})