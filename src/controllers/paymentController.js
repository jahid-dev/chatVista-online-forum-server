const Payments = require('../models/Payment')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


exports.createPayment = async (req, res) => {
    try {
        const { price } = await req.body;
        const amount = parseInt(price * 100);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            payment_method_types: ['card'],
        });

        res.send({
            clientSecret: paymentIntent.client_secret
        })
    } catch (error) {
        console.error('Payment error :', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.savePayment =  async(req, res) => {
    const paymentInfo = await req.body; 
    const payment  = new Payments(paymentInfo);
    const result = await payment.save();
    console.log(result);
    res.send(result)
  };
