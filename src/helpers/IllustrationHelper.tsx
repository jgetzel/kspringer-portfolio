import { Illustration } from "../types/Illustration";

// Function to load an image and return its dimensions
export const loadImageDimensions = (imagePath: string): Promise<{ width: number, height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = reject;
      img.src = imagePath;
    });
  }
