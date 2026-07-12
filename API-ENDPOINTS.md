# 📡 ANAM FASHION - API Endpoints

## Base URL
`https://api.railway.app/api/v1`

## Authentication

### Register
```
POST /auth/register
{
  "email": "user@example.com",
  "password": "password",
  "name": "User Name",
  "role": "admin"
}
```

### Login
```
POST /auth/login
{
  "email": "user@example.com",
  "password": "password"
}
Response: { token, user }
```

## Customers

### Get All
```
GET /customers?page=1&limit=10
```

### Create
```
POST /customers
{
  "name": "Customer Name",
  "phone": "+91-9876543210",
  "email": "email@example.com",
  "address": "Address",
  "city": "City"
}
```

### Update
```
PUT /customers/:id
```

### Delete
```
DELETE /customers/:id
```

## Orders

### Create
```
POST /orders
{
  "customerId": "id",
  "deliveryDate": "2024-02-15",
  "priority": "high"
}
```

### Get All
```
GET /orders?status=pending&priority=high
```

### Update Status
```
PUT /orders/:id/status
{
  "status": "stitching"
}
```

## Invoices

### Create
```
POST /invoices
{
  "orderId": "id",
  "items": [{...}],
  "advance": 5000
}
```

### Get
```
GET /invoices/:id
```

### PDF
```
GET /invoices/:id/pdf
```

## Dashboard

### Stats
```
GET /dashboard/stats
Response: {
  "todayOrders": 5,
  "todayDeliveries": 3,
  "pendingOrders": 12,
  "totalRevenue": 450000,
  "totalCustomers": 45
}
```
