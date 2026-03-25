const products = [
  // ===== BOYS — SHIRTS (5) =====
  {
    id: 'p_1',
    name: 'Blue Striped Linen Shirt',
    category: 'boys',
    subCategory: 'shirts',
    description: 'Premium blue and white striped linen shirt for a sharp, summery look. Breathable and stylish.',
    image: '/products/p1.webp',
    sizes: { S: 299, M: 349, L: 399, XL: 449 }
  },
  {
    id: 'p_2',
    name: 'Classic Azure Formal Shirt',
    category: 'boys',
    subCategory: 'shirts',
    description: 'Crisp azure blue formal shirt with a premium finish. Perfect for weddings and special occasions.',
    image: '/products/p2.jpg',
    sizes: { S: 349, M: 399, L: 449, XL: 499 }
  },
  {
    id: 'p_3',
    name: 'Forest Green Cotton Shirt',
    category: 'boys',
    subCategory: 'shirts',
    description: 'Soft forest green cotton shirt with a tailored fit. Ideal for casual daily wear.',
    image: '/products/p3.jpg',
    sizes: { S: 279, M: 329, L: 379, XL: 429 }
  },
  {
    id: 'p_4',
    name: 'Midnight Blue Casual Shirt',
    category: 'boys',
    subCategory: 'shirts',
    description: 'Modern midnight blue shirt with subtle detailing. A versatile addition to any young boy\'s collection.',
    image: '/products/p4.webp',
    sizes: { S: 399, M: 449, L: 499, XL: 549 }
  },
  {
    id: 'p_9',
    name: 'Sky Blue Cotton Casual',
    category: 'boys',
    subCategory: 'shirts',
    description: 'Comfortable sky blue cotton shirt, perfect for play and weekend fun.',
    image: '/products/p9.webp',
    sizes: { S: 299, M: 349, L: 399, XL: 449 }
  },

  // ===== BOYS — PANTS (4) =====
  {
    id: 'p_5',
    name: 'Classic Slate Grey Trousers',
    category: 'boys',
    subCategory: 'pants',
    description: 'Slate grey trousers with a comfortable waist. Pairs perfectly with both formal and casual shirts.',
    image: '/products/p5.jpg',
    sizes: { S: 349, M: 399, L: 449, XL: 499 }
  },
  {
    id: 'p_6',
    name: 'Teal Adventure Chinos',
    category: 'boys',
    subCategory: 'pants',
    description: 'Unique teal chinos made from durable cotton. Built for all-day comfort and play.',
    image: '/products/p6.jpg',
    sizes: { S: 329, M: 379, L: 429, XL: 479 }
  },
  {
    id: 'p_7',
    name: 'Summer Sky Blue Pants',
    category: 'boys',
    subCategory: 'pants',
    description: 'Light sky blue pants for a fresh look. Ideal for festive afternoon celebrations.',
    image: '/products/p7.jpg',
    sizes: { S: 379, M: 429, L: 479, XL: 529 }
  },
  {
    id: 'p_8',
    name: 'Denim Comfort Joggers',
    category: 'boys',
    subCategory: 'pants',
    description: 'Trendy denim-style joggers with an elasticated waistband. Combines the look of jeans with the comfort of joggers.',
    image: '/products/p8.jpg',
    sizes: { S: 399, M: 449, L: 499, XL: 549 }
  },

  // ===== GIRLS — CHUDITHAR (9) =====
  {
    id: 'p_10',
    name: 'Cream & Red Ethnic Suit',
    category: 'girls',
    subCategory: 'chudithar',
    description: 'Elegant cream-colored kurti with vibrant red accents and matching dupatta. A classic choice for festivals.',
    image: '/products/p10.jpg',
    sizes: { S: 449, M: 499, L: 549, XL: 599 }
  },
  {
    id: 'p_11',
    name: 'Royal Red Anarkali',
    category: 'girls',
    subCategory: 'chudithar',
    description: 'Stunning full-length red Anarkali suit with intricate embroidery. Perfect for special family gatherings.',
    image: '/products/p11.jpg',
    sizes: { S: 499, M: 549, L: 599, XL: 649 }
  },
  {
    id: 'p_12',
    name: 'Golden Peach Festive Suit',
    category: 'girls',
    subCategory: 'chudithar',
    description: 'Peach-colored festive suit with golden embroidery. Features a premium finish and comfortable fit.',
    image: '/products/p12.jpg',
    sizes: { S: 549, M: 599, L: 649, XL: 699 }
  },
  {
    id: 'p_13',
    name: 'Emerald Silk Designer Suit',
    category: 'girls',
    subCategory: 'chudithar',
    description: 'Rich emerald green silk-blend suit with a contrasting boarder. A premium addition to her ethnic wardrobe.',
    image: '/products/p13.jpg',
    sizes: { S: 399, M: 449, L: 499, XL: 549 }
  },
  {
    id: 'p_14',
    name: 'Midnight Bandhani Suit',
    category: 'girls',
    subCategory: 'chudithar',
    description: 'Traditional Bandhani print suit in deep blue. Lightweight and perfect for ethnic celebration days.',
    image: '/products/p14.jpg',
    sizes: { S: 499, M: 549, L: 599, XL: 649 }
  },
  {
    id: 'p_15',
    name: 'Silver Mist Silk Suit',
    category: 'girls',
    subCategory: 'chudithar',
    description: 'Elegant dark silk suit with silver thread work. Combines modern aesthetics with traditional South Indian roots.',
    image: '/products/p15.jpg',
    sizes: { S: 379, M: 429, L: 479, XL: 529 }
  },
  {
    id: 'p_16',
    name: 'Vibrant Yellow Ethnic Suit',
    category: 'girls',
    subCategory: 'chudithar',
    description: 'Bright yellow ethnic ensemble with beautiful floral embroidery. Ideal for sunny afternoon functions.',
    image: '/products/p16.jpg',
    sizes: { S: 429, M: 479, L: 529, XL: 579 }
  },
  {
    id: 'p_17',
    name: 'Mustard Cotton Designer Wear',
    category: 'girls',
    subCategory: 'chudithar',
    description: 'Comfortable mustard cotton suit with delicate white lace work. Breathable and elegant for daily wear.',
    image: '/products/p17.jpg',
    sizes: { S: 299, M: 349, L: 399, XL: 449 }
  },
  {
    id: 'p_18',
    name: 'Amber Glow Designer Suit',
    category: 'girls',
    subCategory: 'chudithar',
    description: 'Rich amber-colored suit on mannequin display, showing off its elegant cut and designer fabric.',
    image: '/products/p18.jpg',
    sizes: { S: 479, M: 529, L: 579, XL: 629 }
  }
]

export default products
