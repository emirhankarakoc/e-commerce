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
import { http } from "@/assets/http";

// Define TypeScript interface for Product
interface Product {
  id: string;
  brandName: string;
  battery: string;
  memory: string;
  modelName: string;
  price: string;
  rating: string;
  imageUrl: string;
}

// Mock product data (you can replace this with API data)

// Products component
const Smartphones: React.FC = () => {
  const { type } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    // bismill

    const fetchAllProducts = async () => {
      try {
        const data = await http.get("/products");
        console.log(data);
        setProducts(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllProducts();
  }, []);
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
        if (product.brandName) brandSet.add(product.brandName);
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
      selectedBrands.length === 0 || selectedBrands.includes(product.brandName);
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
                    src={product.imageUrl}
                    alt={product.modelName}
                    className="w-[120px] h-[160px]"
                  />
                  <p className="text-xl mt-3 font-sfpro">{product.modelName}</p>
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
