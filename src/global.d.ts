declare global {
  interface Window {
    cloudinary: any; // You can specify a more specific type if you prefer
  }
}

export {}; // This is required to make this file a module