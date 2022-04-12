# Strapi plugin payu

## Installation

```bash
strapi plugin add payu
```

## Workflow

### Payment link workflow directly from the frontend

```mermaid
sequenceDiagram
  participant Frontend
  participant Plugin
  participant PayU

  Frontend ->> Plugin: POST request with order details
  Note over Plugin: Order details are stored in transaction with CREATED status
  Plugin -->> PayU: Request authorization token
  PayU -->> Plugin: Authorization token
  Plugin ->> PayU: Prepare payment link
  PayU ->> Plugin: Payment link
  Note over Plugin: Payment link data is added to the transaction with NEW status
  Plugin ->> Frontend: Payment link
```

### Webhook flow

```mermaid
sequenceDiagram
  participant Frontend
  participant PayU
  actor User
  participant Plugin

  Frontend ->> PayU: PaymentLink is requested
  User ->> PayU: Authorization
  PayU ->> Plugin: PENDING status webhook
  PayU ->> Frontend: Redirect to the success page<br/>defined in PayU
  PayU ->> Plugin: SUCCESS status webhook
```
