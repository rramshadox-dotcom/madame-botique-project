const axios = require('axios');

const sendWhatsAppMessage = async (phoneNumber, message) => {
  if (!process.env.WHATSAPP_API_KEY || !process.env.WHATSAPP_PHONE_ID) {
    console.log('WhatsApp not configured. Message:', message);
    return;
  }

  try {
    await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: phoneNumber.replace(/[^0-9]/g, ''),
        type: 'text',
        text: { body: message }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('WhatsApp error:', error.message);
  }
};

const orderConfirmationMessage = (order) => `
🎉 *Madame Boutique - Order Confirmed!*

📦 *Order Number:* ${order.orderNumber}
📅 *Date:* ${new Date(order.createdAt).toLocaleDateString()}

*Items:*
${order.items.map(item => `• ${item.title} (${item.quantity}x) - PKR ${item.price * item.quantity}`).join('\n')}

💰 *Total:* PKR ${order.totalAmount.toLocaleString()}

📍 *Delivery To:* ${order.city}, ${order.country}

Thank you for shopping with us! We'll contact you soon with delivery details.

👗 *Madame Boutique*
`;

module.exports = { sendWhatsAppMessage, orderConfirmationMessage };
