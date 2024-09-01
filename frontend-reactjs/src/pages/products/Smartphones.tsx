import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import {
  Accordion,
  AccordionItem,
  BreadcrumbItem,
  Breadcrumbs,
  Checkbox,
  CheckboxGroup,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/react";
import { useParams } from "react-router-dom";

// Define TypeScript interface for Product
interface Product {
  id: string;
  brand: string;
  battery: string;
  memory: string;
  model: string;
  price: string;
  rating: string;
  imgurl: string;
}

// Mock product data (you can replace this with API data)
const products = [
  {
    id: "10001",
    brand: "Apple",
    battery: "2000mAh",
    memory: "256GB",
    model: "iPhone 13",
    price: "699$",
    rating: "4.5",
    imgurl: "https://example.com/image1.jpg",
  },
  {
    id: "10002",
    brand: "Samsung",
    battery: "3500mAh",
    memory: "128GB",
    model: "Galaxy S21",
    price: "799$",
    rating: "4.6",
    imgurl: "https://example.com/image2.jpg",
  },
  {
    id: "10003",
    brand: "Google",
    battery: "3000mAh",
    memory: "128GB",
    model: "Pixel 5",
    price: "699$",
    rating: "4.4",
    imgurl: "https://example.com/image3.jpg",
  },
  {
    id: "10004",
    brand: "OnePlus",
    battery: "4500mAh",
    memory: "256GB",
    model: "9 Pro",
    price: "969$",
    rating: "4.7",
    imgurl: "https://example.com/image4.jpg",
  },
  {
    id: "10005",
    brand: "Sony",
    battery: "4500mAh",
    memory: "128GB",
    model: "Xperia 5 II",
    price: "949$",
    rating: "4.5",
    imgurl: "https://example.com/image5.jpg",
  },
  {
    id: "10006",
    brand: "Apple",
    battery: "3000mAh",
    memory: "512GB",
    model: "iPhone 12 Pro",
    price: "999$",
    rating: "4.6",
    imgurl: "https://example.com/image6.jpg",
  },
  {
    id: "10007",
    brand: "Samsung",
    battery: "4000mAh",
    memory: "256GB",
    model: "Galaxy Note 20",
    price: "950$",
    rating: "4.6",
    imgurl: "https://example.com/image7.jpg",
  },
  {
    id: "10008",
    brand: "Google",
    battery: "4080mAh",
    memory: "256GB",
    model: "Pixel 6 Pro",
    price: "899$",
    rating: "4.7",
    imgurl: "https://example.com/image8.jpg",
  },
  {
    id: "10009",
    brand: "OnePlus",
    battery: "4500mAh",
    memory: "128GB",
    model: "8T",
    price: "749$",
    rating: "4.4",
    imgurl: "https://example.com/image9.jpg",
  },
  {
    id: "10010",
    brand: "Sony",
    battery: "5000mAh",
    memory: "256GB",
    model: "Xperia 1 II",
    price: "1199$",
    rating: "4.8",
    imgurl: "https://example.com/image10.jpg",
  },
  {
    id: "10011",
    brand: "Apple",
    battery: "3100mAh",
    memory: "128GB",
    model: "iPhone 11",
    price: "699$",
    rating: "4.4",
    imgurl: "https://example.com/image11.jpg",
  },
  {
    id: "10012",
    brand: "Samsung",
    battery: "3700mAh",
    memory: "512GB",
    model: "Galaxy Z Fold 3",
    price: "1799$",
    rating: "4.9",
    imgurl: "https://example.com/image12.jpg",
  },
  {
    id: "10013",
    brand: "Google",
    battery: "4380mAh",
    memory: "128GB",
    model: "Pixel 4a",
    price: "349$",
    rating: "4.3",
    imgurl: "https://example.com/image13.jpg",
  },
  {
    id: "10014",
    brand: "OnePlus",
    battery: "4500mAh",
    memory: "256GB",
    model: "Nord 2",
    price: "499$",
    rating: "4.5",
    imgurl: "https://example.com/image14.jpg",
  },
  {
    id: "10015",
    brand: "Sony",
    battery: "4000mAh",
    memory: "128GB",
    model: "Xperia 10 III",
    price: "499$",
    rating: "4.4",
    imgurl: "https://example.com/image15.jpg",
  },
  {
    id: "10016",
    brand: "Apple",
    battery: "2942mAh",
    memory: "64GB",
    model: "iPhone SE",
    price: "399$",
    rating: "4.2",
    imgurl: "https://example.com/image16.jpg",
  },
  {
    id: "10017",
    brand: "Samsung",
    battery: "4500mAh",
    memory: "256GB",
    model: "Galaxy A52",
    price: "499$",
    rating: "4.5",
    imgurl: "https://example.com/image17.jpg",
  },
  {
    id: "10018",
    brand: "Google",
    battery: "4680mAh",
    memory: "128GB",
    model: "Pixel 5a",
    price: "449$",
    rating: "4.6",
    imgurl: "https://example.com/image18.jpg",
  },
  {
    id: "10019",
    brand: "OnePlus",
    battery: "4500mAh",
    memory: "128GB",
    model: "8 Pro",
    price: "899$",
    rating: "4.7",
    imgurl: "https://example.com/image19.jpg",
  },
  {
    id: "10020",
    brand: "Sony",
    battery: "4500mAh",
    memory: "256GB",
    model: "Xperia 1 III",
    price: "1299$",
    rating: "4.8",
    imgurl: "https://example.com/image20.jpg",
  },
  {
    id: "10021",
    brand: "Apple",
    battery: "2815mAh",
    memory: "128GB",
    model: "iPhone 8",
    price: "399$",
    rating: "4.1",
    imgurl: "https://example.com/image21.jpg",
  },
  {
    id: "10022",
    brand: "Samsung",
    battery: "4300mAh",
    memory: "128GB",
    model: "Galaxy A72",
    price: "549$",
    rating: "4.6",
    imgurl: "https://example.com/image22.jpg",
  },
  {
    id: "10023",
    brand: "Google",
    battery: "4800mAh",
    memory: "128GB",
    model: "Pixel 4 XL",
    price: "799$",
    rating: "4.5",
    imgurl: "https://example.com/image23.jpg",
  },
  {
    id: "10024",
    brand: "OnePlus",
    battery: "4500mAh",
    memory: "256GB",
    model: "9",
    price: "729$",
    rating: "4.4",
    imgurl: "https://example.com/image24.jpg",
  },
  {
    id: "10025",
    brand: "Sony",
    battery: "4000mAh",
    memory: "128GB",
    model: "Xperia 10 II",
    price: "399$",
    rating: "4.3",
    imgurl: "https://example.com/image25.jpg",
  },
  {
    id: "10026",
    brand: "Apple",
    battery: "2227mAh",
    memory: "64GB",
    model: "iPhone 7",
    price: "349$",
    rating: "4.0",
    imgurl: "https://example.com/image26.jpg",
  },
  {
    id: "10027",
    brand: "Samsung",
    battery: "3800mAh",
    memory: "256GB",
    model: "Galaxy A32",
    price: "429$",
    rating: "4.4",
    imgurl: "https://example.com/image27.jpg",
  },
  {
    id: "10028",
    brand: "Google",
    battery: "4350mAh",
    memory: "256GB",
    model: "Pixel 6",
    price: "699$",
    rating: "4.6",
    imgurl: "https://example.com/image28.jpg",
  },
  {
    id: "10029",
    brand: "OnePlus",
    battery: "4500mAh",
    memory: "128GB",
    model: "Nord CE",
    price: "399$",
    rating: "4.4",
    imgurl: "https://example.com/image29.jpg",
  },
  {
    id: "10030",
    brand: "Sony",
    battery: "4500mAh",
    memory: "256GB",
    model: "Xperia 1",
    price: "999$",
    rating: "4.7",
    imgurl: "https://example.com/image30.jpg",
  },
  {
    id: "10031",
    brand: "Apple",
    battery: "3046mAh",
    memory: "128GB",
    model: "iPhone 11 Pro",
    price: "999$",
    rating: "4.5",
    imgurl: "https://example.com/image31.jpg",
  },
  {
    id: "10032",
    brand: "Samsung",
    battery: "5000mAh",
    memory: "128GB",
    model: "Galaxy M51",
    price: "399$",
    rating: "4.5",
    imgurl: "https://example.com/image32.jpg",
  },
  {
    id: "10033",
    brand: "Google",
    battery: "2800mAh",
    memory: "64GB",
    model: "Pixel 3",
    price: "399$",
    rating: "4.2",
    imgurl: "https://example.com/image33.jpg",
  },
  {
    id: "10034",
    brand: "OnePlus",
    battery: "4500mAh",
    memory: "256GB",
    model: "7T",
    price: "599$",
    rating: "4.6",
    imgurl: "https://example.com/image34.jpg",
  },
  {
    id: "10035",
    brand: "Sony",
    battery: "3000mAh",
    memory: "64GB",
    model: "Xperia XZ",
    price: "299$",
    rating: "4.1",
    imgurl: "https://example.com/image35.jpg",
  },
  {
    id: "10036",
    brand: "Apple",
    battery: "2900mAh",
    memory: "128GB",
    model: "iPhone XS",
    price: "699$",
    rating: "4.4",
    imgurl: "https://example.com/image36.jpg",
  },
  {
    id: "10037",
    brand: "Samsung",
    battery: "4500mAh",
    memory: "128GB",
    model: "Galaxy S20 FE",
    price: "699$",
    rating: "4.6",
    imgurl: "https://example.com/image37.jpg",
  },
  {
    id: "10038",
    brand: "Google",
    battery: "3700mAh",
    memory: "128GB",
    model: "Pixel 3a",
    price: "349$",
    rating: "4.3",
    imgurl: "https://example.com/image38.jpg",
  },
  {
    id: "10039",
    brand: "OnePlus",
    battery: "4500mAh",
    memory: "256GB",
    model: "7 Pro",
    price: "699$",
    rating: "4.7",
    imgurl: "https://example.com/image39.jpg",
  },
  {
    id: "10040",
    brand: "Sony",
    battery: "4500mAh",
    memory: "128GB",
    model: "Xperia Z5",
    price: "349$",
    rating: "4.2",
    imgurl: "https://example.com/image40.jpg",
  },
  {
    id: "10041",
    brand: "Apple",
    battery: "3046mAh",
    memory: "64GB",
    model: "iPhone 11",
    price: "699$",
    rating: "4.5",
    imgurl: "https://example.com/image41.jpg",
  },
  {
    id: "10042",
    brand: "Samsung",
    battery: "4300mAh",
    memory: "256GB",
    model: "Galaxy S20 Ultra",
    price: "1399$",
    rating: "4.8",
    imgurl: "https://example.com/image42.jpg",
  },
  {
    id: "10043",
    brand: "Google",
    battery: "4080mAh",
    memory: "256GB",
    model: "Pixel 5",
    price: "699$",
    rating: "4.4",
    imgurl: "https://example.com/image43.jpg",
  },
  {
    id: "10044",
    brand: "OnePlus",
    battery: "4500mAh",
    memory: "128GB",
    model: "6T",
    price: "499$",
    rating: "4.4",
    imgurl: "https://example.com/image44.jpg",
  },
  {
    id: "10045",
    brand: "Sony",
    battery: "4000mAh",
    memory: "256GB",
    model: "Xperia 5",
    price: "799$",
    rating: "4.5",
    imgurl: "https://example.com/image45.jpg",
  },
  {
    id: "10046",
    brand: "Apple",
    battery: "2815mAh",
    memory: "128GB",
    model: "iPhone 8 Plus",
    price: "549$",
    rating: "4.3",
    imgurl: "https://example.com/image46.jpg",
  },
  {
    id: "10047",
    brand: "Samsung",
    battery: "4500mAh",
    memory: "128GB",
    model: "Galaxy Note 10",
    price: "849$",
    rating: "4.6",
    imgurl: "https://example.com/image47.jpg",
  },
  {
    id: "10048",
    brand: "Google",
    battery: "3700mAh",
    memory: "128GB",
    model: "Pixel 4 XL",
    price: "799$",
    rating: "4.5",
    imgurl: "https://example.com/image48.jpg",
  },
  {
    id: "10049",
    brand: "OnePlus",
    battery: "4500mAh",
    memory: "256GB",
    model: "8 Pro",
    price: "899$",
    rating: "4.7",
    imgurl: "https://example.com/image49.jpg",
  },
  {
    id: "10050",
    brand: "Sony",
    battery: "4000mAh",
    memory: "128GB",
    model: "Xperia XZ Premium",
    price: "499$",
    rating: "4.3",
    imgurl: "https://example.com/image50.jpg",
  },
  {
    id: "10051",
    brand: "Apple",
    battery: "3430mAh",
    memory: "128GB",
    model: "iPhone XR",
    price: "649$",
    rating: "4.4",
    imgurl: "https://example.com/image51.jpg",
  },
  {
    id: "10052",
    brand: "Samsung",
    battery: "4000mAh",
    memory: "128GB",
    model: "Galaxy A31",
    price: "399$",
    rating: "4.3",
    imgurl: "https://example.com/image52.jpg",
  },
  {
    id: "10053",
    brand: "Google",
    battery: "3700mAh",
    memory: "256GB",
    model: "Pixel 4",
    price: "599$",
    rating: "4.4",
    imgurl: "https://example.com/image53.jpg",
  },
  {
    id: "10054",
    brand: "OnePlus",
    battery: "4500mAh",
    memory: "128GB",
    model: "6",
    price: "499$",
    rating: "4.5",
    imgurl: "https://example.com/image54.jpg",
  },
  {
    id: "10055",
    brand: "Sony",
    battery: "3000mAh",
    memory: "64GB",
    model: "Xperia XA2",
    price: "349$",
    rating: "4.1",
    imgurl: "https://example.com/image55.jpg",
  },
  {
    id: "10056",
    brand: "Apple",
    battery: "3095mAh",
    memory: "256GB",
    model: "iPhone 12",
    price: "799$",
    rating: "4.6",
    imgurl: "https://example.com/image56.jpg",
  },
  {
    id: "10057",
    brand: "Samsung",
    battery: "4500mAh",
    memory: "128GB",
    model: "Galaxy S21 FE",
    price: "699$",
    rating: "4.4",
    imgurl: "https://example.com/image57.jpg",
  },
  {
    id: "10058",
    brand: "Google",
    battery: "4280mAh",
    memory: "128GB",
    model: "Pixel 5a",
    price: "449$",
    rating: "4.6",
    imgurl: "https://example.com/image58.jpg",
  },
  {
    id: "10059",
    brand: "OnePlus",
    battery: "4500mAh",
    memory: "256GB",
    model: "9R",
    price: "699$",
    rating: "4.5",
    imgurl: "https://example.com/image59.jpg",
  },
  {
    id: "10060",
    brand: "Sony",
    battery: "4500mAh",
    memory: "256GB",
    model: "Xperia 5",
    price: "799$",
    rating: "4.5",
    imgurl: "https://example.com/image60.jpg",
  },
];

// Products component
const Smartphones: React.FC = () => {
  const { type } = useParams();

  const formattedType = "Smartphones";

  const [brands, setBrands] = useState<string[]>([]);
  const [batteries, setBatteries] = useState<string[]>([]);
  const [memories, setMemories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedBatteries, setSelectedBatteries] = useState<string[]>([]);
  const [selectedMemories, setSelectedMemories] = useState<string[]>([]);

  // Pagination and sorting state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Number of items per page
  const [sortCriteria, setSortCriteria] = useState<string>("Sort by"); // Default sorting

  useEffect(() => {
    if (products.length > 0) {
      const brandSet = new Set<string>();
      const batterySet = new Set<string>();
      const memorySet = new Set<string>();

      products.forEach((product) => {
        if (product.brand) brandSet.add(product.brand);
        if (product.battery) batterySet.add(product.battery);
        if (product.memory) memorySet.add(product.memory);
      });

      setBrands(Array.from(brandSet));
      setBatteries(Array.from(batterySet));
      setMemories(Array.from(memorySet));
    }
  }, []);

  const handleBrandsChange = (values: Set<string>) => {
    setSelectedBrands(Array.from(values));
  };

  const handleBatteriesChange = (values: Set<string>) => {
    setSelectedBatteries(Array.from(values));
  };

  const handleMemoriesChange = (values: Set<string>) => {
    setSelectedMemories(Array.from(values));
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesBattery =
      selectedBatteries.length === 0 ||
      selectedBatteries.includes(product.battery);
    const matchesMemory =
      selectedMemories.length === 0 ||
      selectedMemories.includes(product.memory);

    return matchesBrand && matchesBattery && matchesMemory;
  });

  // Sort and paginate products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortCriteria) {
      case "Ascending":
        return (
          parseFloat(a.price.slice(0, -1)) - parseFloat(b.price.slice(0, -1))
        );
      case "Descending":
        return (
          parseFloat(b.price.slice(0, -1)) - parseFloat(a.price.slice(0, -1))
        );
      case "Rating":
        return parseFloat(b.rating) - parseFloat(a.rating);
      default:
        return 0;
    }
  });

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <Breadcrumblar name={formattedType} />
      <div className="grid grid-cols-12 px-20 gap-4">
        <div className="col-span-3">
          <Filters
            brands={brands}
            batteries={batteries}
            memories={memories}
            onBrandChange={handleBrandsChange}
            onBatteryChange={handleBatteriesChange}
            onMemoryChange={handleMemoriesChange}
          />
        </div>
        <div className="col-span-9">
          <div className="flex justify-between items-center mb-8">
            <p className="text-lg">
              Products found: <strong>{filteredProducts.length}</strong>
            </p>

            <Dropdown>
              <div className="bg-slate-900 p-4 rounded-xl text-white">
                <DropdownTrigger>
                  {sortCriteria.replace("-", " ")}
                </DropdownTrigger>
              </div>
              <DropdownMenu
                aria-label="Sort by"
                onAction={(key) => setSortCriteria(key as string)}
              >
                <DropdownItem key="Ascending">Price (Low to High)</DropdownItem>
                <DropdownItem key="Descending">
                  Price (High to Low)
                </DropdownItem>
                <DropdownItem key="Rating">Rating</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {currentProducts.length > 0 ? (
              currentProducts.map((product, index) => (
                <div
                  className="bg-[#F6F6F6] hover:bg-[#dbdbdb] p-4 grid place-items-center"
                  key={product.id}
                >
                  <button className="flex items-end m-6">
                    <i className="fa-regular fa-heart "></i>
                  </button>
                  {/* bi ara doldururuz buralari. */}
                  <img
                    src="https://picsum.photos/160"
                    alt={product.model}
                    className="w-[120px] h-[160px]"
                  />
                  <p className="text-xl mt-3 font-sfpro">{product.model}</p>
                  <p className="mb-3 font-bold">{product.price}</p>
                  <button
                    onClick={() => {
                      window.location.href = "/product/" + product.id;
                    }}
                    className="px-5 bg-black rounded-md text-white px-12 py-4"
                  >
                    Buy Now
                  </button>
                </div>
              ))
            ) : (
              <div>No products found. Try adjusting your filters.</div>
            )}
          </div>
          <div className="flex justify-center mt-8">
            <div className="flex items-center">
              <Button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </Button>
              <span className="mx-4">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Filters component
interface FiltersProps {
  brands: string[];
  batteries: string[];
  memories: string[];
  onBrandChange: (values: Set<string>) => void;
  onBatteryChange: (values: Set<string>) => void;
  onMemoryChange: (values: Set<string>) => void;
}

const Filters: React.FC<FiltersProps> = ({
  brands,
  batteries,
  memories,
  onBrandChange,
  onBatteryChange,
  onMemoryChange,
}) => {
  return (
    <div>
      <Accordion variant="bordered" selectionMode="multiple">
        <AccordionItem key="1" aria-label="Brand" title="Brand">
          <CheckboxGroup onChange={onBrandChange}>
            {brands.map((brand) => (
              <Checkbox key={brand} value={brand}>
                {brand}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </AccordionItem>

        <AccordionItem key="2" aria-label="Batteries" title="Battery capacity">
          <CheckboxGroup onChange={onBatteryChange}>
            {batteries.map((battery) => (
              <Checkbox key={battery} value={battery}>
                {battery}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </AccordionItem>

        <AccordionItem key="3" aria-label="Memory" title="Memory">
          <CheckboxGroup onChange={onMemoryChange}>
            {memories.map((memory) => (
              <Checkbox key={memory} value={memory}>
                {memory}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

// Breadcrumblar component props type
interface BreadcrumblarProps {
  name: string;
}

// Breadcrumblar component
const Breadcrumblar: React.FC<BreadcrumblarProps> = ({ name }) => {
  return (
    <div className="p-10 mx-14">
      <Breadcrumbs>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Catalog</BreadcrumbItem>
        <BreadcrumbItem>{name}</BreadcrumbItem>
      </Breadcrumbs>
    </div>
  );
};

export default Smartphones;
