package kafka

import (
	"context"
	"log"

	"github.com/segmentio/kafka-go"
)

func ConsumeOrders() {
	reader := kafka.NewReader(kafka.ReaderConfig{
		Brokers: []string{"localhost:9092"},
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
