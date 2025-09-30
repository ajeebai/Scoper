/**
 * Analyzes an image from a data URL to determine if light or dark text would be more readable on top of it.
 * @param imageUrl The base64 data URL of the image to analyze.
 * @returns A promise that resolves to an object with the optimal text color and a suitable text-shadow.
 */
export const analyzeImage = (imageUrl: string): Promise<{ color: string; textShadow: string }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        return reject(new Error('Could not get canvas context'));
      }

      // We only care about the top part of the image where the text is.
      const canvasWidth = img.width;
      const canvasHeight = Math.min(img.height, 300); // Analyze the top 300px
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);

      try {
        const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        const data = imageData.data;
        let totalLightness = 0;
        let pixelCount = 0;

        // Sample pixels for performance (e.g., every 10th pixel)
        const sampleRate = 10;
        for (let i = 0; i < data.length; i += 4 * sampleRate) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Using the Luma formula for perceived brightness
          const lightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          totalLightness += lightness;
          pixelCount++;
        }

        const averageLightness = totalLightness / pixelCount;
        
        // Threshold can be adjusted. 128 is the midpoint.
        if (averageLightness > 128) {
          // Background is light, use dark text
          resolve({
            color: '#000000',
            textShadow: '1px 1px 3px rgba(255, 255, 255, 0.4)',
          });
        } else {
          // Background is dark, use light text
          resolve({
            color: '#FFFFFF',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
          });
        }
      } catch (e) {
        console.error("Could not get image data for analysis, likely a CORS issue with tainted canvas.", e);
        // Fallback to a safe default if analysis fails
        resolve({
            color: '#FFFFFF',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
        });
      }
    };
    img.onerror = (e) => {
      console.error("Failed to load image for analysis.", e);
      reject(new Error("Image could not be loaded."));
    };
    
    img.src = imageUrl;
  });
};
