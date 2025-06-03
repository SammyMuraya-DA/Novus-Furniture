
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  dimensions: string;
  material: string;
  color: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Modern L-Shaped Sofa",
    category: "sofas",
    price: 125000,
    originalPrice: 150000,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop&auto=format&q=80",
    ],
    description: "Luxurious L-shaped sofa perfect for modern living rooms. Crafted with premium materials and designed for maximum comfort.",
    features: [
      "Premium fabric upholstery",
      "High-density foam cushions",
      "Solid wood frame",
      "Easy to clean",
      "5-year warranty"
    ],
    dimensions: "280cm x 200cm x 85cm",
    material: "Premium fabric with wooden frame",
    color: "Charcoal Grey",
    inStock: true
  },
  {
    id: "2",
    name: "Scandinavian Dining Table",
    category: "tables",
    price: 75000,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop&auto=format&q=80&crop=center",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop&auto=format&q=80&crop=center",
    ],
    description: "Elegant Scandinavian-style dining table that seats 6 people comfortably. Perfect for family gatherings and dinner parties.",
    features: [
      "Solid oak wood",
      "Water-resistant finish",
      "Seats 6 people",
      "Scratch-resistant surface",
      "Easy assembly"
    ],
    dimensions: "180cm x 90cm x 75cm",
    material: "Solid Oak Wood",
    color: "Natural Oak",
    inStock: true
  },
  {
    id: "3",
    name: "Executive Office Chair",
    category: "chairs",
    price: 45000,
    originalPrice: 55000,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop&auto=format&q=80&crop=left",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop&auto=format&q=80&crop=left",
    ],
    description: "Ergonomic executive office chair designed for long hours of comfortable work. Features premium leather and adjustable settings.",
    features: [
      "Genuine leather upholstery",
      "Ergonomic design",
      "Adjustable height",
      "360-degree swivel",
      "Lumbar support"
    ],
    dimensions: "65cm x 65cm x 110-120cm",
    material: "Genuine leather with metal base",
    color: "Black",
    inStock: true
  },
  {
    id: "4",
    name: "Modern Coffee Table",
    category: "tables",
    price: 35000,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop&auto=format&q=80&crop=right",
    images: [
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop&auto=format&q=80&crop=right",
    ],
    description: "Sleek modern coffee table with glass top and metal legs. Perfect centerpiece for contemporary living rooms.",
    features: [
      "Tempered glass top",
      "Stainless steel legs",
      "Easy to clean",
      "Modern design",
      "Stable construction"
    ],
    dimensions: "120cm x 60cm x 45cm",
    material: "Tempered glass with stainless steel",
    color: "Clear/Silver",
    inStock: true
  },
  {
    id: "5",
    name: "Velvet Accent Chair",
    category: "chairs",
    price: 25000,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop&auto=format&q=80",
    ],
    description: "Luxurious velvet accent chair that adds elegance to any room. Perfect for reading corners or as statement furniture.",
    features: [
      "Premium velvet upholstery",
      "Comfortable padding",
      "Solid wood legs",
      "Elegant design",
      "Easy maintenance"
    ],
    dimensions: "75cm x 70cm x 85cm",
    material: "Velvet with wooden legs",
    color: "Emerald Green",
    inStock: true
  },
  {
    id: "6",
    name: "King Size Bed Frame",
    category: "beds",
    price: 95000,
    originalPrice: 120000,
    image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=800&h=600&fit=crop&auto=format&q=80",
    images: [
      "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=800&h=600&fit=crop&auto=format&q=80",
    ],
    description: "Elegant king-size bed frame with upholstered headboard. Creates a luxurious bedroom atmosphere.",
    features: [
      "Upholstered headboard",
      "Solid wood construction",
      "King size (6x6 feet)",
      "Storage space underneath",
      "Premium finish"
    ],
    dimensions: "183cm x 203cm x 120cm",
    material: "Solid wood with fabric upholstery",
    color: "Beige",
    inStock: true
  }
];

export const categories = [
  { id: "all", name: "All Products" },
  { id: "sofas", name: "Sofas" },
  { id: "chairs", name: "Chairs" },
  { id: "tables", name: "Tables" },
  { id: "beds", name: "Beds" },
  { id: "storage", name: "Storage" },
];
