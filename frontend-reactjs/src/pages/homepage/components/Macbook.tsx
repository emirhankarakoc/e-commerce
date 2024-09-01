import { Button } from "@nextui-org/button";

export default function Macbook() {
  return (
    <div className="grid grid-cols-2 bg-[#EDEDED]">
      <div className="col-span-1">
        <Texts />
      </div>
      <div className="col-span-1 overflow-hidden">
        <Image />
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="relative h-[700px] ">
      <img
        src="https://ifixindia.in/wp-content/uploads/2018/09/macbook-air-png-transparent-background-6.png"
        alt=""
        className="h-[700px] absolute left-1/4"
      />
    </div>
  );
}

function Texts() {
  return (
    <div className="flex flex-col items-start justify-center h-full p-20 gap-5">
      <div className="flex flex-row justify-center gap-2">
        <p className="font-sfpro text-6xl">Macbook</p>
        <p className="font-sfpro font-bold text-6xl">Air</p>
      </div>
      <p className="text-gray-500">
        The new 15‑inch MacBook Air makes room for more of what you love with a
        spacious Liquid Retina display.
      </p>
      <Button variant="bordered" className="px-20">
        Shop Now
      </Button>
    </div>
  );
}
