import Navigation from "@/components/Navigation";
import Iphone14 from "./components/Iphone14";
import Playstation5 from "./components/Playstation5";
import AirpodsMax from "./components/AirpodsMax";
import VisionPro from "./components/VisionPro";
import Macbook from "./components/Macbook";
import Browse from "./components/Browse";
import NewArrivals from "./components/NewArrivals";
import PopularProducts from "./components/PopularProducts";
import Discounts from "./components/Discounts";
import BigSummerSale from "./components/BigSummerSale";
import Footer from "@/components/Footer";

export default function Homepage() {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-12 ">
          <Iphone14 />
        </div>
        <div className="col-span-6">
          <div className="col-span-12">
            <Playstation5 />
          </div>
          <div className="grid grid-cols-2">
            <div className="col-span-1">
              <AirpodsMax />
            </div>
            <div className="col-span-1">
              <VisionPro />
            </div>
          </div>
        </div>
        <div className="col-span-6">
          <Macbook />
        </div>
        <div className="col-span-12">
          <Browse />
        </div>
        <div className="col-span-12">
          <NewArrivals />
        </div>
        <div className="col-span-12">
          <PopularProducts />
        </div>
        <div className="col-span-12">
          <Discounts />
        </div>
        <div className="col-span-12">
          <BigSummerSale />
        </div>
        <div className="col-span-12">
          <Footer />
        </div>
      </div>
    </div>
  );
}
