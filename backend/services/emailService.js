const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendOrderEmail = async (order, userEmail) => {
  const itemsList = order.items.map(item => `
    <tr>
      <td style="padding:10px; border:1px solid #ddd;">${item.title}</td>
      <td style="padding:10px; border:1px solid #ddd;">PKR ${item.price}</td>
      <td style="padding:10px; border:1px solid #ddd;">${item.quantity}</td>
      <td style="padding:10px; border:1px solid #ddd;">${item.size || 'One Size'}</td>
    </tr>
  `).join('');

  const html = `
    <div style="font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px;">
      <div style="max-width: 600px; background: white; margin: 0 auto; padding: 20px; border-radius: 8px;">
        <h2 style="color: #333; border-bottom: 3px solid #e91e63; padding-bottom: 10px;">Order Confirmation</h2>
        <p>Thank you for your order at <strong>Madame Boutique</strong>!</p>
        <h3 style="color: #555;">Order Details</h3>
        <p><strong>Order Number:</strong> ${order.orderNumber}</p>
        <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
        <p><strong>Customer:</strong> ${order.email}</p>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <h3 style="color: #555;">Items</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f0f0f0;">
              <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Product</th>
              <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Price</th>
              <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Qty</th>
              <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Size</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
          </tbody>
        </table>
        <h3 style="color: #555; text-align: right; margin-top: 20px;">Total: <span style="color: #e91e63;">PKR ${order.totalAmount.toLocaleString()}</span></h3>
        <h3 style="color: #555; margin-top: 20px;">Shipping Address</h3>
        <p>${order.shippingAddress}<br>${order.city}, ${order.country} ${order.postalCode || ''}</p>
        <div style="background: #e3f2fd; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <p style="color: #1976d2;"><strong>ℹ️ What's Next?</strong></p>
          <p>Our team will contact you on WhatsApp at <strong>${order.phone}</strong> within 24 hours to confirm your order.</p>
        </div>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #999; font-size: 12px; text-align: center;">© 2026 Madame Boutique. All Rights Reserved.</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Order Confirmation - ${order.orderNumber}`,
      html
    });
  } catch (error) {
    console.error('Email send error:', error);
  }
};

const sendAdminNotification = async (order) => {
  const html = `
    <div style="font-family: Arial, sans-serif;">
      <h2>🎁 New Order Received!</h2>
      <p><strong>Order Number:</strong> ${order.orderNumber}</p>
      <p><strong>Customer:</strong> ${order.email}</p>
      <p><strong>Phone:</strong> ${order.phone}</p>
      <p><strong>Total:</strong> PKR ${order.totalAmount}</p>
      <p><strong>Items:</strong> ${order.items.length}</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Order: ${order.orderNumber}`,
      html
    });
  } catch (error) {
    console.error('Admin notification error:', error);
  }
};

module.exports = { sendOrderEmail, sendAdminNotification };
