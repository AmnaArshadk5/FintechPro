
export function mapToFinancialProduct(apiProduct) {
  const categoryMapping = {
    electronics: "investment",
    jewelery: "savings",
    "men's clothing": "insurance",
    "women's clothing": "crypto"
  };

  const category = categoryMapping[apiProduct.category] || "investment";

  const financialLogic = {
    savings: { risk: "low", return: 5, liquidity: "easy", horizon: "short" },
    insurance: { risk: "low", return: 7, liquidity: "locked", horizon: "long" },
    investment: { risk: "medium", return: 12, liquidity: "moderate", horizon: "medium" },
    crypto: { risk: "high", return: 25, liquidity: "easy", horizon: "long" }
  };

  const logic = financialLogic[category];

  const customImages = {
    1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAQzO6Lt7dFnJyQSqACaNTSlkmj6-JDE_bJQ&s",
    2: "https://cdn.media.amplience.net/i/primark/991169290108_05?$articleimages-largedesktop$&fmt=auto",
    3: "https://leftoversden.com/cdn/shop/files/0_12_59bc5434-bc0e-415e-8b9c-2b210c32de71.jpg?v=1730364654",
    4: "https://mendeez.com/cdn/shop/files/8_2_a74655ed-ef61-4d21-b848-a613889eb640.jpg?v=1773400053&width=1225",
    5: "https://www.reneetaylorgallery.com/cdn/shop/products/naga-gold-silver-dragon-station-bracelet-bz65032-john-hardy-2_2400x.jpg?v=1599928600",
    6: "https://i.etsystatic.com/20717103/r/il/69c1aa/2016425007/il_570xN.2016425007_l7v6.jpg",
    7: "https://5.imimg.com/data5/SELLER/Default/2024/1/373881784/JI/VR/FI/201863206/white-gold-princess-cut-diamond-ring-500x500.jpeg",
    8: "https://diamondtreats.co.uk/pub/media/catalog/product/cache/d481a6f9c9bf889cd54c5a6c85a41177/2/0/2010bsr.jpg",
    9: "https://discountstore.pk/cdn/shop/files/WESTERN-DIGITAL-HARD-DRIVE-ELEMENTS-PORTABLE-WDBU6Y0020BBK-WESN-2TB-BLACK.jpg?v=1753877649",
    10: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBAGXqpkVODG0T5TCfitp0Z_Ms3Qwkj6yGcg&s",
    11: "https://m.media-amazon.com/images/I/615lmQd02NL._AC_SY300_SX300_QL70_FMwebp_.jpg",
    12: "https://eezepc.com/wp-content/uploads/2022/01/WD-4TB-Gaming-Drive-1.jpg",
    13: "https://external-preview.redd.it/monitor-acer-sb220q-21-5-ips-1920-x-1080-75hz-4-ms-54-99-v0-yoVUCNQrNu6w8C8_nBsPj4cWWOMqrFDu_pu3VIfvA7g.jpg?auto=webp&s=9ca913e45bb87c1e14c7ab53b34a2e445e64fa8c",
    14: "https://m.media-amazon.com/images/I/81v90JtbImL._AC_SL1500_.jpg",
    15: "https://www.bobssportschalet.com/prodimages/16879-BLACK-L.jpg",
    16: "https://m.media-amazon.com/images/I/71TxJQx+lKL._AC_UY1100_.jpg",
    17: "https://s.alicdn.com/@sc04/kf/Aa2a47ecb31fb410382a8c91adc10e0c04/Premium-Windbreaker-Raincoat-for-Women.jpg",
    18: "https://www.musto.com/media/catalog/product/8/5/85099_055-1.jpg",
    19: "https://images-eu.ssl-images-amazon.com/images/I/41nvRqnV4+L._AC_UL600_SR600,600_.jpg",
    20: "https://m.media-amazon.com/images/I/61d7reyxXSL._AC_SX679_.jpg"
  };

  const photoLibrary = {
    investment: "https://images.unsplash.com/photo-1611974714014-419b67482869?auto=format&fit=crop&q=80&w=500",
    savings: "https://images.unsplash.com/photo-1579621970795-87f967b16c8a?auto=format&fit=crop&q=80&w=500",
    insurance: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=500",
    crypto: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=500"
  };

  return {
    id: apiProduct.id,
    title: apiProduct.title,
    description: apiProduct.description,
    image: customImages[apiProduct.id] || photoLibrary[category],
    category,
    
    riskLevel: logic.risk,
    expectedReturn: logic.return,
    liquidity: logic.liquidity,
    timeHorizon: logic.horizon,
    
    minInvestment: Math.round((apiProduct.price * 280) / 100) * 100,
    
    isLiquid: logic.liquidity === "easy"
  };
}