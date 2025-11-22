package kafka

import (
	"context"
	"log"

	"github.com/segmentio/kafka-go"
)

func SendMessage(topic string, message []byte) error {
	writer := &kafka.Writer{
		Addr:     kafka.TCP("localhost:9092"),
		Topic:    topic,
		Balancer: &kafka.LeastBytes{},
	}

	err := writer.WriteMessages(context.Background(),
		kafka.Message{
			Value: message,
		},
	)

	if err != nil {
		log.Printf("❌ Error sending message: %v", err)
		return err
	}

	log.Printf("📤 Message sent to topic %s", topic)
	return nil
}
