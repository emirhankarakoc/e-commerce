import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";
import { http } from "@/assets/http";
import Breadcrumblar from "./components/Breadcrumblar";
import Filters from "./components/Filters";

// Products component
const Smartphones: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [batteries, setBatteries] = useState<string[]>([]);
  const [memories, setMemories] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]); // Added colors
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedBatteries, setSelectedBatteries] = useState<string[]>([]);
  const [selectedMemories, setSelectedMemories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]); // Added colors
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [sortCriteria, setSortCriteria] = useState<string>("Sort by");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await http.get("/smartphones");
        console.log(data);
        setProducts(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const brandSet = new Set<string>();
      const batterySet = new Set<string>();
      const memorySet = new Set<string>();
      const colorSet = new Set<string>(); // Added colors

      products.forEach((product) => {
        if (product.brandName) brandSet.add(product.brandName);
        if (product.battery) batterySet.add(product.battery);
        if (product.memoryOptions.length > 0) {
          product.memoryOptions.forEach((memory) =>
            memorySet.add(memory.value)
          );
        }
        if (product.colors.length > 0) {
          product.colors.forEach((color) => colorSet.add(color.code));
        }
      });

      setBrands(Array.from(brandSet));
      setBatteries(Array.from(batterySet));
      setMemories(Array.from(memorySet));
      setColors(Array.from(colorSet)); // Set colors
    }
  }, [products]);

  const handleBrandsChange = (values: Set<string>) => {
    setSelectedBrands(Array.from(values));
  };

  const handleBatteriesChange = (values: Set<string>) => {
    setSelectedBatteries(Array.from(values));
  };

  const handleMemoriesChange = (values: Set<string>) => {
    setSelectedMemories(Array.from(values));
  };

  const handleColorsChange = (values: Set<string>) => {
    // Added colors
    setSelectedColors(Array.from(values));
  };

  const filteredProducts = products.filter((product) => {
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brandName);
    const matchesBattery =
      selectedBatteries.length === 0 ||
      selectedBatteries.includes(product.battery);
    const matchesMemory =
      selectedMemories.length === 0 ||
      product.memoryOptions.some((memory) =>
        selectedMemories.includes(memory.value)
      );
    const matchesColor =
      selectedColors.length === 0 ||
      product.colors.some((color) => selectedColors.includes(color.code)); // Added colors

    return matchesBrand && matchesBattery && matchesMemory && matchesColor; // Added colors
  });

  const calculateAverageRating = (reviews: Review[]): number => {
    if (reviews.length === 0) return 0;
    const totalPoints = reviews.reduce((sum, review) => sum + review.point, 0);
    return totalPoints / reviews.length;
  };

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
        const avgRatingA = calculateAverageRating(a.reviews);
        const avgRatingB = calculateAverageRating(b.reviews);
        return avgRatingB - avgRatingA; // Descending order: higher rating first
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
      <Breadcrumblar category="Smartphones" />
      <div className="grid grid-cols-12 px-20 gap-4">
        <div className="col-span-3">
          <Filters
            brands={brands}
            batteries={batteries}
            memories={memories}
            colors={colors} // Added colors
            onBrandChange={handleBrandsChange}
            onBatteryChange={handleBatteriesChange}
            onMemoryChange={handleMemoriesChange}
            onColorChange={handleColorsChange} // Added colors
          />
        </div>
        <div className="col-span-9">
          <div className="flex justify-between items-center mb-8">
            <p className="text-lg">
              Products found: <strong>{filteredProducts.length}</strong>
            </p>

            <Dropdown>
              <DropdownTrigger>
                <div className="bg-slate-900 p-4 rounded-xl text-white">
                  {sortCriteria.replace("-", " ")}
                </div>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Sort by"
                onAction={(key) => {
                  setSortCriteria(key as string);
                }}
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
              currentProducts.map((product) => (
                <div
                  className="bg-[#F6F6F6] hover:bg-[#dbdbdb] p-4 grid place-items-center"
                  key={product.id}
                >
                  <button className="flex items-end m-6">
                    <i className="fa-regular fa-heart"></i>
                  </button>
                  <img
                    src={product.imageLinks[0]?.imageUrl}
                    alt={product.modelName}
                    className="w-[120px] h-[160px]"
                  />
                  <p className="text-xl mt-3 font-sfpro">{product.modelName}</p>
                  <p className="mb-3 font-bold">{product.price}</p>
                  <button
                    onClick={() => {
                      window.location.href = "/smartphones/" + product.id;
                    }}
                    className="px-12 bg-black rounded-md text-white py-4"
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

export default Smartphones;
