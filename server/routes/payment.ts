
import express from 'express';
import { PayoneerService } from '../services/payoneer';

const router = express.Router();
const payoneer = new PayoneerService({
  partnerId: process.env.PAYONEER_PARTNER_ID!,
  apiKey: process.env.PAYONEER_API_KEY!,
  username: process.env.PAYONEER_USERNAME!,
  password: process.env.PAYONEER_PASSWORD!,
  sandbox: process.env.NODE_ENV !== 'production'
});

router.post('/create-payment', async (req, res) => {
  try {
    const payment = await payoneer.createPayment({
      amount: req.body.amount,
      currency: req.body.currency,
      orderId: req.body.orderId,
      description: req.body.description,
      customerEmail: req.body.customerEmail
    });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Payment creation failed' });
  }
});

router.post('/webhook', async (req, res) => {
  try {
    await payoneer.handleWebhook(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

export default router;
