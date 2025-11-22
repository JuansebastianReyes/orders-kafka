package kafka

import (
    "context"
    "log"
    "os"

    "github.com/segmentio/kafka-go"
)

func ConsumeOrders() {
    broker := os.Getenv("KAFKA_BROKER")
    if broker == "" {
        broker = "localhost:9092"
    }

    reader := kafka.NewReader(kafka.ReaderConfig{
        Brokers: []string{broker},
        Topic:   "orders.created",
        GroupID: "order-processor-group",
    })

	log.Println("📡 Go microservice listening on topic orders.created...")

	for {
		msg, err := reader.ReadMessage(context.Background())
		if err != nil {
			log.Printf("❌ Error reading message: %v", err)
			continue
		}

		log.Printf("📥 Order received: %s", string(msg.Value))

		// Aquí procesamos la orden
		ProcessOrder(msg.Value)
	}
}
