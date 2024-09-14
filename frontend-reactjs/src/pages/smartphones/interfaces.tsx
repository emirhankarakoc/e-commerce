interface ImageLink {
  imageUrl: string;
}

interface Details {
  id: string;
  description: string | null;
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

interface Order {
  id: string;
  userId: string;
  smartphones: CartItem[];
  shippingType: string;
  adress: string;
  cardOwnerName: string;
  subtotal: string;
  date: Date;
  status: Status;
  cardNumber: string;
}
enum Status {
  PREPARING = "PREPARING",
  SENT = "SENT",
  FINISHED = "FINISHED",
}

interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  productName: string;
  productImage: string;
  productPrice: string;
  extras: string;
}
interface Cart {
  id: string;
  summary: string;
  items: CartItems[];
}
interface CartItems {
  id: string;
  cartId: string;
  productId: string;
  productName: string;
  productImage: string;
  productPrice: string;
  extras: string;
}

interface Address {
  id: string;
  title: string;
  phoneNumber: string;
  fullAddress: string;
}

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  cost: string; //aslinda numara olmali ama neyse.
}
interface User {
  id: string;
  email: string;
  role: string;
  fullName: string;
  balance: string;
  profilePhotoPath: string;
  cart: Cart;
}
