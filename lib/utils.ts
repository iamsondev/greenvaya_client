import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Optimizes Cloudinary image URLs by inserting f_auto,q_auto,w_800 transformations.
 * If the URL is not from Cloudinary or already transformed, it returns the URL safely.
 */
export function getOptimizedCloudinaryUrl(url?: string | null): string {
  if (!url) return ""
  if (typeof url !== "string") return ""
  
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    // Avoid duplicate transformations
    if (url.includes("/upload/f_auto,q_auto,w_800/")) {
      return url
    }
    return url.replace("/upload/", "/upload/f_auto,q_auto,w_800/")
  }
  
  return url
}

