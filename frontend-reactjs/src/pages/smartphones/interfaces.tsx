interface ImageLink {
  imageUrl: string;
}

interface Details {
  id: string;
  descriptionDetails: string;
  screenDiagonal: string;
  screenResolution: string;
  screenRefreshRate: string;
  pixelDensity: string;
  screenType: string;
  additionaly: string;
  smartphoneId: string;
}
interface DetailsProp {
  id: string;
  descriptionDetails: string;
  screenDiagonal: string;
  screenResolution: string;
  screenRefreshRate: string;
  pixelDensity: string;
  screenType: string;
  additionaly: string;
  smartphoneId: string;
}
interface Review {
  id: string;
  smartphoneId: string;
  userId: string;
  userFullname: string;
  userProfilePictureImageUrl: string;
  content: string;
  point: number;
  date: string;
}

interface ReviewsProps {
  reviews: Review[];
}

interface Memory {
  id: string;
  value: string;
}

interface Color {
  id: string;
  code: string;
}

interface Product {
  id: string;
  brandName: string;
  modelName: string;
  price: string;
  oldPrice: string;
  imageLinks: ImageLink[];
  reviews: Review[];
  cpu: string;
  numberOfCores: string;
  memoryOptions: Memory[];
  colors: Color[]; // Updated to include colors
  battery: string;
  screenSize: string;
  description: string;
  details: Details;
}

interface BreadcrumblarProps {
  category: string;
  brandName?: string;
  modelName?: string;
}

// Filters component props
interface FiltersProps {
  brands: string[];
  batteries: string[];
  memories: string[];
  colors: string[]; // Added colors
  onBrandChange: (values: Set<string>) => void;
  onBatteryChange: (values: Set<string>) => void;
  onMemoryChange: (values: Set<string>) => void;
  onColorChange: (values: Set<string>) => void; // Added colors
}
