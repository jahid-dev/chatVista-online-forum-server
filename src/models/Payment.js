const { Schema, model } = require('mongoose');

const PaymentsSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    status: {
        type: String
    },

});

const Payments = model('Payments', PaymentsSchema);

module.exports = Payments;