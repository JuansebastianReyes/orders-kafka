# Kafka + NestJS + Go — Primera implementación

Este proyecto demuestra una integración sencilla entre un API en NestJS que publica eventos de órdenes en Kafka y un microservicio en Go que consume y procesa esos eventos.

## Arquitectura

- `nest-orders` (NestJS): expone un endpoint HTTP para crear órdenes y las publica en Kafka (`orders.created`). También incluye un consumidor de ejemplo para `orders.processed` y `orders.failed`.
- `order-processor` (Go): escucha `orders.created`, valida y simula el procesamiento; publica `orders.processed` o `orders.failed` según el resultado.
- `docker-compose.yml`: levanta Kafka (y Zookeeper) para desarrollo local. Las variables como `KAFKA_BROKER` permiten apuntar los servicios al broker dentro de Docker.

## Endpoints

- `POST /orders`: recibe `{ orderId, product, quantity }` y emite el evento en Kafka (`orders.created`). Responde `{ message: 'Order sent to Kafka', order }`.
- `GET /orders`: endpoint básico de verificación que responde `{ message: 'Orders endpoint OK' }`.

## Topics Kafka

- `orders.created`: producido por `nest-orders` al crear una orden.
- `orders.processed`: producido por `order-processor` cuando la orden se procesa correctamente.
- `orders.failed`: producido por `order-processor` cuando la orden falla validación o procesamiento.

## Variables de entorno

- NestJS (`nest-orders`):
  - `KAFKA_BROKERS` (CSV, por defecto `localhost:9092`)
  - `KAFKA_CLIENT_ID` (por defecto `nest-orders`)
  - `KAFKA_CONSUMER_CLIENT_ID` (por defecto `orders-consumer`)
  - `KAFKA_CONSUMER_GROUP` (por defecto `orders-consumer-group`)
  - `KAFKA_TOPIC_ORDERS_PROCESSED` (por defecto `orders.processed`)
  - `KAFKA_TOPIC_ORDERS_FAILED` (por defecto `orders.failed`)

- Go (`order-processor`): actualmente apunta a `localhost:9092` en código. Puedes adaptar a `os.Getenv("KAFKA_BROKER")` si ejecutas dentro de Docker.

## Puesta en marcha

1. Kafka con Docker:
   - `docker compose up -d`
   - Asegúrate de que el puerto `9092` esté disponible.

2. API NestJS (`nest-orders`):
   - `cd nest-orders`
   - `npm install`
   - Opcional: configura variables de entorno si no usas `localhost:9092`
   - `npm run start:dev`
   - Probar:
     - `curl -X GET http://localhost:3000/orders`
     - `curl -X POST http://localhost:3000/orders -H "Content-Type: application/json" -d '{"orderId":"o-1","product":"book","quantity":2}'`

3. Procesador Go (`order-processor`):
   - `cd order-processor`
   - `go run main.go`
   - Verás logs de consumo en `orders.created` y publicaciones en `orders.processed`/`orders.failed`.

## Desarrollo y pruebas

- `nest-orders`
  - Compilar: `npm run build`
  - Pruebas: `npm test`
  - Formato: `npm run format`

## Notas

- En Windows, el formateo maneja finales de línea automáticamente (`endOfLine: auto`).
- Si ejecutas todo dentro de Docker, ajusta las variables de entorno para apuntar a `kafka:9092` (ver `docker-compose.yml`).