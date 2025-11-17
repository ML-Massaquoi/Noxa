export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
  ingredients?: string[];
  allergens?: string[];
  preparationTime?: number;
  isAvailable?: boolean;
}