// ===========================
// SLJ Otaku Paradise - Products Database
// ===========================

const products = [
  // ---- FIGURES ----
  {
    id: 1,
    name: "Figurine Goku Ultra Instinct",
    category: "figures",
    anime: "Dragon Ball Super",
    price: 50,
    oldPrice: 65,
    image: "https://i.ebayimg.com/images/g/FqAAAeSwE2Bpvqww/s-l400.webp",
    badge: "Bestseller",
    badgeColor: "#ff6b00",
    rating: 4.9,
    reviews: 312,
    inStock: true,
    description: "Figurine haute qualité de Goku en mode Ultra Instinct. 28cm de hauteur, PVC premium.",
    tags: ["goku", "dragon ball", "figure", "ultra instinct"]
  },
  {
    id: 2,
    name: "Figurine Tanjiro Kamado",
    category: "figures",
    anime: "Demon Slayer",
    price: 40,
    oldPrice: null,
    image: "https://i5.walmartimages.com/seo/Tanjiro-Kamado-Action-Figure-3-63-6-Inch-Demon-Slayer-Anime-Collectible-Figure_0367fc16-0382-41b0-bad8-2a329ffb3dd0.1e9c28a891c7754a20b35b9c688035bd.jpeg?odnHeight=576&odnWidth=576&odnBg=FFFFFF",
    badge: "Nouveau",
    badgeColor: "#00b386",
    rating: 4.8,
    reviews: 187,
    inStock: true,
    description: "Figurine Tanjiro avec son katana nichirin. Position de combat dynamique.",
    tags: ["tanjiro", "kimetsu no yaiba", "demon slayer", "figure"]
  },
  {
    id: 3,
    name: "Figurine Monkey D. Luffy Gear 5",
    category: "figures",
    anime: "One Piece",
    price: 55,
    oldPrice: 70,
    image: "https://m.media-amazon.com/images/I/61uuq6JOw3L.jpg",
    badge: "Promo",
    badgeColor: "#ff3366",
    rating: 4.7,
    reviews: 256,
    inStock: true,
    description: "Luffy en mode Gear 5 - Nika. Édition limitée collectors.",
    tags: ["luffy", "one piece", "gear 5", "figure"]
  },
  {
    id: 4,
    name: "Figurine Naruto Sage Mode",
    category: "figures",
    anime: "Naruto Shippuden",
    price: 45,
    oldPrice: null,
    image: "https://i.ebayimg.com/images/g/EhkAAeSw1JRoYf18/s-l400.webp",
    badge: null,
    badgeColor: null,
    rating: 4.6,
    reviews: 421,
    inStock: true,
    description: "Naruto en mode Sage de la Nature. Détails exceptionnels et socle inclu.",
    tags: ["naruto", "sage mode", "naruto shippuden", "figure"]
  },
  {
    id: 5,
    name: "Figurine Itachi Uchiha",
    category: "figures",
    anime: "Naruto Shippuden",
    price: 48,
    oldPrice: 60,
    image: "https://i.ebayimg.com/images/g/FrMAAeSwejdonHwp/s-l960.webp",
    badge: "Top vente",
    badgeColor: "#ff6b00",
    rating: 4.9,
    reviews: 389,
    inStock: false,
    description: "Itachi Uchiha avec Susanoo partiel. Édition exclusive.",
    tags: ["itachi", "uchiha", "naruto", "figure"]
  },
  {
    id: 6,
    name: "Figurine Levi Ackerman",
    category: "figures",
    anime: "Attack on Titan",
    price: 43,
    oldPrice: null,
    image: "https://i5.walmartimages.com/seo/Attack-Titan-Levi-Ackerman-Anime-Figure-Cloak-Levi-10-2-Scale-Action-Figure-Collectible-Model-Statue-Multicolor_accab38c-1dbd-4c23-bf53-881a6ea6a519.eed01fdd709d0c3ddcaa9f5f35302c3d.jpeg?odnHeight=580&odnWidth=580&odnBg=FFFFFF",
    badge: "Nouveau",
    badgeColor: "#00b386",
    rating: 4.8,
    reviews: 203,
    inStock: true,
    description: "Capitaine Levi avec équipement 3D manœuvre. Pose iconique.",
    tags: ["levi", "attack on titan", "shingeki", "figure"]
  },

  // ---- VÊTEMENTS ----
  {
    id: 10,
    name: "Hoodie Dragon Ball Z - Goku",
    category: "vetements",
    anime: "Dragon Ball Z",
    price: 35,
    oldPrice: 45,
    image: "https://ih1.redbubble.net/image.3061428850.6479/ssrco,lightweight_hoodie,mens,heather_mid_grey,front,square_product,x600-bg,f8f8f8.2u1.jpg",
    badge: "Promo",
    badgeColor: "#ff3366",
    rating: 4.7,
    reviews: 456,
    inStock: true,
    description: "Sweat à capuche Dragon Ball Z, unisexe, tissu premium.",
    tags: ["hoodie", "dragon ball", "goku", "vêtement"]
  },
  {
    id: 11,
    name: "T-Shirt Naruto Akatsuki",
    category: "vetements",
    anime: "Naruto",
    price: 20,
    oldPrice: null,
    image: "https://i.ebayimg.com/images/g/Kl0AAOSwnY9l2odh/s-l500.png",
    badge: "Bestseller",
    badgeColor: "#ff6b00",
    rating: 4.6,
    reviews: 823,
    inStock: true,
    description: "T-shirt Akatsuki print haute qualité, coton 100%.",
    tags: ["tshirt", "naruto", "akatsuki", "vêtement"]
  },
  {
    id: 12,
    name: "Veste One Piece - Équipage",
    category: "vetements",
    anime: "One Piece",
    price: 55,
    oldPrice: 70,
    image: "https://i.etsystatic.com/63245739/r/il/e7b2cd/7614488929/il_300x300.7614488929_s7k6.jpg",
    badge: "Nouveau",
    badgeColor: "#00b386",
    rating: 4.8,
    reviews: 145,
    inStock: true,
    description: "Veste style universitaire One Piece avec broderies.",
    tags: ["veste", "one piece", "luffy", "vêtement"]
  },

  // ---- ACCESSOIRES ----
  {
    id: 13,
    name: "Sac à dos One Piece - Coffre",
    category: "accessoires",
    anime: "One Piece",
    price: 30,
    oldPrice: null,
    image: "https://lunar-merch.b-cdn.net/animebackpack.com/media/564/conversions/Anime-Fullmetal-Alchemist-Backpack-Knapsack-Packsack-Travel-School-Otaku-Bags-3-1.jpg_640x640-3-1-small.jpg?w=250&h=250",
    badge: null,
    badgeColor: null,
    rating: 4.5,
    reviews: 234,
    inStock: true,
    description: "Sac à dos résistant design One Piece, 30L.",
    tags: ["sac", "one piece", "accessoire"]
  },
  {
    id: 14,
    name: "Casquette Naruto Hidden Leaf",
    category: "accessoires",
    anime: "Naruto",
    price: 15,
    oldPrice: 20,
    image: "https://i.etsystatic.com/45629555/r/il/9c35f7/7061205063/il_300x300.7061205063_nxd9.jpg",
    badge: "Promo",
    badgeColor: "#ff3366",
    rating: 4.4,
    reviews: 567,
    inStock: true,
    description: "Casquette brodée symbole Konoha.",
    tags: ["casquette", "naruto", "konoha", "accessoire"]
  },
  {
    id: 15,
    name: "Porte-clés Set Anime (12 pcs)",
    category: "accessoires",
    anime: "Multi-Anime",
    price: 13,
    oldPrice: null,
    image: "https://m.media-amazon.com/images/I/61Pbg5fcVNL.jpg",
    badge: "Pack",
    badgeColor: "#ff6b00",
    rating: 4.3,
    reviews: 912,
    inStock: true,
    description: "Set de 12 porte-clés de différents anime populaires.",
    tags: ["porte-clés", "accessoire", "anime", "set"]
  },

  // ---- POSTERS ----
  {
    id: 16,
    name: "Poster Attack on Titan - Final Season",
    category: "posters",
    anime: "Attack on Titan",
    price: 10,
    oldPrice: null,
    image: "https://i.etsystatic.com/59249910/r/il/4f38d6/6864291880/il_300x300.6864291880_ngq9.jpg",
    badge: "Nouveau",
    badgeColor: "#00b386",
    rating: 4.7,
    reviews: 345,
    inStock: true,
    description: "Poster A2 qualité impression photo, papier 200g.",
    tags: ["poster", "aot", "shingeki", "décoration"]
  },
  {
    id: 17,
    name: "Tableau Canvas Jujutsu Kaisen",
    category: "posters",
    anime: "Jujutsu Kaisen",
    price: 25,
    oldPrice: 35,
    image: "https://weposters.s3.amazonaws.com/wp-content/uploads/2023/05/11173433/Jujutsu-Kaisen-Satoru-Gojo-Anime-Canvas-Decoration-Prints-Poster-Study-Living-Room-Home-Decor-Bedroom-Pictures-2.jpg",
    badge: "Promo",
    badgeColor: "#ff3366",
    rating: 4.8,
    reviews: 189,
    inStock: true,
    description: "Tableau canvas premium 60x40cm Jujutsu Kaisen.",
    tags: ["canvas", "jujutsu kaisen", "gojo", "décoration"]
  },
  {
    id: 18,
    name: "Set Posters Dragon Ball (6 pcs)",
    category: "posters",
    anime: "Dragon Ball",
    price: 20,
    oldPrice: null,
    image: "https://weposters.s3.amazonaws.com/wp-content/uploads/2023/04/25150007/Kingdom-Hearts-Dragon-Ball-Super-One-Piece-Naruto-Pop-Anime-Poster-And-Prints-Art-Painting-Wall.jpg",
    badge: "Pack",
    badgeColor: "#ff6b00",
    rating: 4.6,
    reviews: 412,
    inStock: true,
    description: "6 posters A3 personnages Dragon Ball en set collector.",
    tags: ["poster", "dragon ball", "set", "décoration"]
  }
];

const categories = [
  { id: "all", name: "Tout voir", icon: "🎌" },
  { id: "figures", name: "Figurines", icon: "🗿" },
  { id: "vetements", name: "Vêtements", icon: "👕" },
  { id: "accessoires", name: "Accessoires", icon: "🎒" },
  { id: "posters", name: "Posters", icon: "🖼️" }
];

const animeFilters = [
  "Tous les anime",
  "Dragon Ball",
  "Naruto",
  "One Piece",
  "Demon Slayer",
  "Attack on Titan",
  "Jujutsu Kaisen"
];

// Testimonials
const testimonials = [
  {
    name: "Kira M.",
    avatar: "K",
    rating: 5,
    text: "Livraison ultra rapide, qualité de la figurine Goku incroyable ! Je reviendrai certainement.",
    date: "Mars 2026",
    anime: "Dragon Ball Fan"
  },
  {
    name: "Sasha L.",
    avatar: "S",
    rating: 5,
    text: "Le hoodie Dragon Ball est parfait. La qualité est top et la taille correspond bien.",
    date: "Avril 2026",
    anime: "Naruto Fan"
  },
  {
    name: "Ryuu T.",
    avatar: "R",
    rating: 4,
    text: "Super boutique otaku ! Large choix de produits. J'ai commandé plusieurs fois sans problème.",
    date: "Avril 2026",
    anime: "One Piece Fan"
  }
];
