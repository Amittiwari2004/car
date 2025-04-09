// lib/wishlist.ts
import { Car } from "@/types/car";

const WISHLIST_KEY = "car-finder-wishlist";

// Get wishlist items from localStorage
export function getWishlistItems(): Car[] {
  if (typeof window === "undefined") return [];
  
  const wishlistJSON = localStorage.getItem(WISHLIST_KEY);
  if (!wishlistJSON) return [];
  
  try {
    return JSON.parse(wishlistJSON);
  } catch (error) {
    console.error("Failed to parse wishlist data:", error);
    return [];
  }
}

// Add car to wishlist
export function addToWishList(car: Car): void {
  const currentItems = getWishlistItems();
  
  // Check if car already exists in wishlist
  if (!currentItems.some(item => item.id === car.id)) {
    const updatedItems = [...currentItems, car];
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedItems));
  }
}

// Remove car from wishlist
export function removeFromWishList(carId: string): void {
  const currentItems = getWishlistItems();
  const updatedItems = currentItems.filter(item => item.id !== carId);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedItems));
}

// Check if car is in wishlist
export function isInWishList(carId: string): boolean {
  const currentItems = getWishlistItems();
  return currentItems.some(item => item.id === carId);
}

// Get wishlist count
export function getWishlistCount(): number {
  return getWishlistItems().length;
}