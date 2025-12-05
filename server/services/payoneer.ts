
import { config } from '../config';

interface PayoneerConfig {
  partnerId: string;
  apiKey: string;
  username: string;
  password: string;
  sandbox: boolean;
}

interface PaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  description: string;
  customerEmail: string;
}

export class PayoneerService {
  private baseUrl: string;
  
  constructor(private config: PayoneerConfig) {
    this.baseUrl = config.sandbox 
      ? 'https://api.sandbox.payoneer.com/v2/programs/'
      : 'https://api.payoneer.com/v2/programs/';
  }

  async createPayment(payment: PaymentRequest) {
    try {
      const response = await fetch(`${this.baseUrl}${this.config.partnerId}/charges`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${this.config.username}:${this.config.password}`).toString('base64')}`,
        },
        body: JSON.stringify({
          amount: payment.amount,
          currency: payment.currency,
          order_id: payment.orderId,
          description: payment.description,
          email: payment.customerEmail
        })
      });

      if (!response.ok) {
        throw new Error('Payment creation failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Payoneer payment error:', error);
      throw error;
    }
  }

  async handleWebhook(payload: any) {
    // Implement webhook handling logic
    // Verify webhook signature
    // Update payment status in database
  }
}
