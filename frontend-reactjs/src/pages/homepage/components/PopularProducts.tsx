import { Button } from "@nextui-org/button";

export default function PopularProducts() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3 bg-white p-10">
        <img
          src="https://www.figma.com/file/wTUchfS1t0YTSCeSmZ42ru/image/cb39cda1a785d83ac87bef6f733e89566466ab68"
          alt=""
          className="w-full h-[350px]"
        />
        <div className="font-sfpro text-3xl text-black mt-4">
          Popular Products
        </div>
        <div className="font-sfpro text-black mt-2">
          iPad combines a magnificent 10.2-inch Retina display, incredible
          performance, multitasking and ease of use.
        </div>
        <Button variant="bordered" className="mt-4 text-black px-10">
          Shop Now
        </Button>
      </div>

      <div className="col-span-3 bg-[#F9F9F9] p-10">
        <img
          src="https://www.figma.com/file/wTUchfS1t0YTSCeSmZ42ru/image/03f88b4cbe5df929ebde7688c573f3bf280a1c07"
          alt=""
          className="w-full h-[350px]"
        />
        <div className="font-sfpro text-3xl text-black mt-4">Ipad Pro</div>
        <div className="font-sfpro text-black mt-2">
          iPad combines a magnificent 10.2-inch Retina display, incredible
          performance, multitasking and ease of use.
        </div>
        <Button variant="bordered" className="mt-4 px-10 text-black">
          Shop Now
        </Button>
      </div>

      <div className="col-span-3 bg-[#EAEAEA] p-10 ">
        <img
          src="https://www.figma.com/file/wTUchfS1t0YTSCeSmZ42ru/image/42ede37f5b7179151ff1aece13de5d13a9577763"
          alt=""
          className="w-full h-[350px]"
        />
        <div className="font-sfpro text-3xl text-black mt-4">
          Samsung Galaxy
        </div>
        <div className="font-sfpro text-black mt-2">
          iPad combines a magnificent 10.2-inch Retina display, incredible
          performance, multitasking and ease of use.
        </div>
        <Button variant="bordered" className="px-10 mt-4">
          Shop Now
        </Button>
      </div>

      <div className="col-span-3 bg-[#2C2C2C] p-10">
        <img
          src="https://www.figma.com/file/wTUchfS1t0YTSCeSmZ42ru/image/841a21892886e7ecb5d47ea5c6ae4bebd8ac7b6a"
          alt=""
          className="w-full h-[350px]"
        />
        <div className="font-sfpro text-3xl text-white mt-4">Macbook Pro</div>
        <div className="font-sfpro text-white mt-2">
          iPad combines a magnificent 10.2-inch Retina display, incredible
          performance, multitasking and ease of use.
        </div>
        <Button variant="bordered" className="mt-4 text-white px-10">
          Shop Now
        </Button>
      </div>
    </div>
  );
}
