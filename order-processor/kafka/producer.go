package kafka

import (
    "context"
    "log"
    "os"

    "github.com/segmentio/kafka-go"
)

func SendMessage(topic string, message []byte) error {
    broker := os.Getenv("KAFKA_BROKER")
    if broker == "" {
        broker = "localhost:9092"
    }

    writer := &kafka.Writer{
        Addr:     kafka.TCP(broker),
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
