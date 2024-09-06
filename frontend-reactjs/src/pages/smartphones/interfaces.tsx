interface ImageLink {
  imageUrl: string;
}

interface Details {
  id: string;
  descriptionDetails: string | null;
  screenDiagonal: string;
  screenResolution: string;
  screenRefreshRate: string;
  pixelDensity: string;
  screenType: string;
  additionaly: string;
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
  images: ImageLink[];
  reviews: Review[];
  cpu: string;
  numberOfCores: string;
  memoryOptions: Memory[];
  colors: Color[];
  battery: string;
  screenSize: string;
  description: string;
  frontCameraProps: string;
  mainCameraProps: string;
  guaranteeOption: string;
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
  colors: string[];
  onBrandChange: (values: Set<string>) => void;
  onBatteryChange: (values: Set<string>) => void;
  onMemoryChange: (values: Set<string>) => void;
  onColorChange: (values: Set<string>) => void;
}
