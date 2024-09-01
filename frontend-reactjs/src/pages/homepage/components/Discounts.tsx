import { Button } from "@nextui-org/button";

export default function Discounts() {
  const products = [
    {
      imgurl:
        "https://www.figma.com/file/wTUchfS1t0YTSCeSmZ42ru/image/35bbde0c991501fab467b7b89b3d15a3022907d7",
      fullname: "Apple iPhone 14 Pro Max 128GB Deep Purple (MQ9T3RX/A)",
      price: "$900",
    },
    {
      imgurl:
        "https://www.figma.com/file/wTUchfS1t0YTSCeSmZ42ru/image/7609e5cdf4f1449533f9f5a48db3baede928c3bc",
      fullname: "Apple iPad 9 10.2' 64GB Wi-Fi Silver (MK2L3) 2021",
      price: "$398",
    },

    {
      imgurl:
        "https://www.figma.com/file/wTUchfS1t0YTSCeSmZ42ru/image/04aa22412ca1bf1289d832ba8f3fd6f235c1283f",
      fullname: "AirPods Max Silver",
      price: "$549",
    },
    {
      imgurl:
        "https://www.figma.com/file/wTUchfS1t0YTSCeSmZ42ru/image/35bbde0c991501fab467b7b89b3d15a3022907d7",
      fullname: "Apple iPhone 14 Pro Max 128GB Deep Purple (MQ9T3RX/A)",
      price: "$900",
    },
  ];
  return (
    <div className="py-10 px-36">
      <div className=" text-xl font-bold">Discounts up to -50%</div>

      <div className="grid grid-cols-4">
        {products.map((product, index) => (
          <div key={index}>
            <div className="col-span-1 bg-[#F6F6F6] m-5 p-5">
              <div className="flex items-end justify-end p-5">
                <i className="far fa-heart text-2xl"></i>
              </div>

              <div className="grid place-items-center">
                <img src={product.imgurl} alt="resim" className="h-[150px]" />
              </div>
              <div className="text-xl my-5 font-sfpro font-bold text-center">
                {product.fullname}
              </div>

              <div className="text-2xl my-5 font-sfpro font-bold text-center">
                {product.price}
              </div>
              <div className="grid place-items-center">
                <Button color="danger">Buy Now</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
