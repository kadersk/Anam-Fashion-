# 🗄️ ANAM FASHION - Database Schema

## Collections

### Users
```
_id: ObjectId
email: String (unique)
password: String (hashed)
name: String
phone: String
role: admin|manager|reception|craftsman
businessId: ObjectId
createdAt: Date
```

### Customers
```
_id: ObjectId
customerId: String
name: String
phone: String
whatsapp: String
email: String
address: String
city: String
state: String
pinCode: String
birthday: Date
anniversary: Date
photo: URL
totalSpent: Number
isVIP: Boolean
isRepeat: Boolean
createdAt: Date
```

### Orders
```
_id: ObjectId
orderNumber: String
customerId: ObjectId
orderDate: Date
deliveryDate: Date
status: pending|cutting|stitching|ready|delivered
priority: low|medium|high|urgent
measurements: ObjectId
referencePhotos: [URL]
voiceInstructions: [URL]
assignedTo: [craftsmanId]
totalAmount: Number
advance: Number
balance: Number
paymentStatus: unpaid|partial|paid
createdAt: Date
```

### Invoices
```
_id: ObjectId
invoiceNumber: String
orderId: ObjectId
customerId: ObjectId
items: [{description, quantity, price}]
subtotal: Number
discount: Number
gst: Number
total: Number
advance: Number
balance: Number
paymentMethod: cash|upi|card|bank_transfer
paymentStatus: unpaid|partial|paid
paidDate: Date
createdAt: Date
```

### Craftsmen
```
_id: ObjectId
craftsmanId: String
name: String
phone: String
photo: URL
specialization: [String]
salary: Number
rating: Number
currentWorkload: Number
totalCapacity: Number
assignedOrders: [ObjectId]
createdAt: Date
```

### Measurements
```
_id: ObjectId
customerId: ObjectId
date: Date
bust: Number
waist: Number
hip: Number
shoulder: Number
neck: Number
sleeveLength: Number
customMeasurements: {}
notes: String
createdAt: Date
```
