package kafka

import (
	"encoding/json"
	"log"
)

type Order struct {
	OrderId  string `json:"orderId"`
	Product  string `json:"product"`
	Quantity int    `json:"quantity"`
}

func ProcessOrder(message []byte) {
	var order Order
	err := json.Unmarshal(message, &order)
	if err != nil {
		log.Println("❌ Error decoding order:", err)
		SendMessage("orders.failed", []byte(`{"error":"invalid order payload"}`))
		return
	}

	// Simulación de procesamiento
	if order.Quantity <= 0 {
		SendMessage("orders.failed", []byte(`{"orderId":"`+order.OrderId+`","status":"failed"}`))
		return
	}

	SendMessage("orders.processed", []byte(`{"orderId":"`+order.OrderId+`","status":"processed"}`))
}
