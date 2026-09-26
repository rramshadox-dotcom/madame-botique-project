const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');

const products = [
  { id: 101, category: 'newArrival', title: '2 Pc Co-Ord Set', price: 6590, img: 'new1.webp', desc: 'A black blended cord set with modern cuts.', rating: 4 },
  { id: 102, category: 'newArrival', title: '3 Pc Embroidered Suit', price: 5210, img: 'new2.webp', desc: 'Light purple embroidered linen suit for elegant evenings.', rating: 5 },
  { id: 103, category: 'newArrival', title: '3 Pc Printed Marina Suit', price: 8390, img: 'new3.webp', desc: 'Digital printed marina suit with vibrant colors.', rating: 4 },
  { id: 104, category: 'newArrival', title: 'Emerald Tide', price: 7990, img: 'new4.webp', desc: 'Rich emerald green outfit perfect for formal gatherings.', rating: 5 },
  { id: 105, category: 'newArrival', title: 'Lilac Fields', price: 6290, img: 'new5.webp', desc: 'Front-open kurta with fabric buttons and soft lilac hue.', rating: 4 },
  { id: 106, category: 'newArrival', title: 'Honey Beige', price: 7990, img: 'new6.webp', desc: 'Chic mocha mousse co-ord set for a trendy look.', rating: 4 },
  { id: 107, category: 'newArrival', title: 'Hursil Dress', price: 11999, img: 'new7.webp', desc: 'Soft solid black velvet fabric with premium stitching.', rating: 5 },
  { id: 201, category: 'winter', title: '3Pc Embroidered Co-ords', price: 7750, img: 'kaddar2.webp', desc: 'Three-piece khaddar with delicate embroidery.', rating: 5 },
  { id: 202, category: 'winter', title: 'Velvet Kaftan Shirt', price: 8499, img: 'velvet1.webp', desc: 'Opulent velvet kaftan shirt for winter parties.', rating: 4 },
  { id: 203, category: 'winter', title: 'Velvet Solid Set', price: 6600, img: 'velvet2.webp', desc: 'Sleek solid velvet set, warm and stylish.', rating: 4 },
  { id: 204, category: 'winter', title: 'Embroidered 2Pc Velvet', price: 10867, img: 'velvet3.webp', desc: 'Two-piece velvet ensemble with intricate details.', rating: 5 },
  { id: 205, category: 'winter', title: '2Pc Lemon Blossom Jacquard', price: 7990, img: 'jacquard1.webp', desc: 'Intricate embroidered leaves on premium jacquard.', rating: 4 },
  { id: 206, category: 'winter', title: 'Khaddar Printed Dress', price: 4250, img: 'kaddar5.jpg', desc: 'Printed khaddar dress comfortable for daily wear.', rating: 4 },
  { id: 207, category: 'winter', title: '2Pc Grey Dawn Jacquard', price: 5025, img: 'jacquard2.webp', desc: 'Captivating grey ensemble for a subtle look.', rating: 4 },
  { id: 208, category: 'winter', title: 'Embroidered 2Pc Khaddar', price: 4515, img: 'kaddar3.webp', desc: 'Two-piece khaddar co-ords with classic embroidery.', rating: 5 },
  { id: 209, category: 'winter', title: '3Pc Khaddar Classic', price: 6396, img: 'kaddar4.webp', desc: 'Classic three-piece khaddar suit.', rating: 4 },
  { id: 210, category: 'winter', title: '3Pc Kotrai Embroidered', price: 5499, img: 'kotrai.jpg', desc: 'Printed khaddar dress showcasing lively hues.', rating: 4 },
  { id: 211, category: 'winter', title: '2Pc Khaddar Coords', price: 9560, img: 'kaddar1.webp', desc: 'Timeless khaddar co-ords set.', rating: 5 },
  { id: 301, category: 'summer', title: '3 Pc Printed Lawn Suit', price: 3890, img: 'pic1.webp', desc: 'White floral print shirt with matching dupatta & pants.', rating: 4 },
  { id: 302, category: 'summer', title: 'Green Floral Kurta Set', price: 2890, img: 'pic2.webp', desc: 'Green floral print kurta set with pants & dupatta.', rating: 5 },
  { id: 303, category: 'summer', title: 'Cotton Viscose Tunic', price: 1495, img: 'pic3.webp', desc: 'Purple kurta with light blue pant.', rating: 4 },
  { id: 304, category: 'summer', title: 'Cotton Silk 3 Pc Suit', price: 1194, img: 'pic4.webp', desc: 'Royal blue 3-piece outfit with printed kurta.', rating: 5 },
  { id: 305, category: 'summer', title: 'Textured Dobby Cord Set', price: 2994, img: 'pic5.webp', desc: 'Printed 2-piece suit with straight kurta.', rating: 4 },
  { id: 306, category: 'summer', title: 'Neckline Embroidered Lawn', price: 4290, img: 'pic6.webp', desc: 'Printed long kurta with matching trousers.', rating: 4 },
  { id: 307, category: 'summer', title: 'Blue Lawn Suit', price: 3890, img: 'pic7.webp', desc: 'Blue lawn suit: embroidered top, matching pants.', rating: 5 },
  { id: 308, category: 'summer', title: 'Embroidered Cotton Suit', price: 5313, img: 'pic8.webp', desc: 'Dark blue embroidered kurta with chiffon dupatta.', rating: 5 },
  { id: 309, category: 'summer', title: 'Grey Floral Lawn', price: 3493, img: 'pic9.webp', desc: 'White kurta with gray floral embroidery.', rating: 5 },
  { id: 310, category: 'summer', title: 'Gold Floral Lawn', price: 2793, img: 'pic10.webp', desc: 'Off-white kurta with golden floral embroidery.', rating: 5 },
  { id: 401, category: 'accessories', title: 'Yarn Dyed Muffler', price: 3290, img: 'Muffler.webp', desc: 'Soft and warm yarn-dyed muffler.', rating: 4 },
  { id: 402, category: 'accessories', title: 'Maroon Handbag', price: 5990, img: 'handbag1.webp', desc: 'Stylish maroon handbag with gold accents.', rating: 4 },
  { id: 403, category: 'accessories', title: 'Cuff Bangle Gold', price: 590, img: 'cuff bangle.webp', desc: 'Elegant gold-tone bangle.', rating: 3 },
  { id: 404, category: 'accessories', title: 'Printed Scarf', price: 2495, img: 'scarf.webp', desc: 'Lightweight printed scarf.', rating: 4 },
  { id: 405, category: 'accessories', title: 'Golden Hoop Earrings', price: 698, img: 'Earrings1.webp', desc: 'Classic hoop earrings.', rating: 4 },
  { id: 406, category: 'accessories', title: 'Stone Necklace', price: 2195, img: 'necklace2.jpg', desc: 'Layered necklace with rose & green stones.', rating: 4 },
  { id: 407, category: 'accessories', title: 'Brass Necklace', price: 1795, img: 'necklace1.webp', desc: 'Elegant gold-plated brass necklace.', rating: 4 },
  { id: 408, category: 'accessories', title: 'Pearl Pink Earrings', price: 1695, img: 'Stone Earrings.webp', desc: 'Elegant pearl earrings with pink stones.', rating: 4 },
  { id: 409, category: 'accessories', title: 'Black Shoulder Bag', price: 2990, img: 'handbag2.webp', desc: 'Classic black shoulder bag.', rating: 4 },
  { id: 410, category: 'accessories', title: 'Brown Long Coat', price: 18990, img: 'coat.webp', desc: 'Warm long coat made with premium wool.', rating: 5 },
  { id: 501, category: 'sale', title: 'Embroidered Lawn Suit', price: 3990, oldPrice: 5990, discount: '33% OFF', img: 'pic1.webp', desc: 'Beautiful embroidered lawn suit on sale.', rating: 5 },
  { id: 502, category: 'sale', title: 'Velvet Shawl', price: 2499, oldPrice: 3999, discount: '38% OFF', img: 'kaddar4.webp', desc: 'Premium velvet shawl – limited offer.', rating: 4 },
  { id: 503, category: 'sale', title: 'Emerald Sale Suit', price: 3990, oldPrice: 5990, discount: '33% OFF', img: 'new4.webp', desc: 'Rich emerald suit on discount.', rating: 5 },
  { id: 504, category: 'sale', title: 'Blue Lawn Sale', price: 2499, oldPrice: 3999, discount: '38% OFF', img: 'pic7.webp', desc: 'Premium lawn suit – limited offer.', rating: 4 },
  { id: 505, category: 'sale', title: 'Velvet Set Sale', price: 3990, oldPrice: 5990, discount: '33% OFF', img: 'velvet2.webp', desc: 'Sleek velvet set on sale.', rating: 5 },
  { id: 506, category: 'sale', title: 'Marina Suit Sale', price: 2499, oldPrice: 3999, discount: '38% OFF', img: 'new3.webp', desc: 'Printed marina suit – limited offer.', rating: 4 }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/madame-boutique');
    await Product.deleteMany({});
    const result = await Product.insertMany(products);
    console.log(`Seeded ${result.length} products`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
}

seedDatabase();
