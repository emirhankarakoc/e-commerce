import { Button } from "@nextui-org/button";

export default function Iphone14() {
  return (
    <div>
      <div className="h-[650px] bg-[#211C24] grid grid-cols-12 overflow-hidden">
        <div className="col-span-6  ">
          <Texts />
        </div>
        <div className="col-span-6 relative">
          <Image />
        </div>
      </div>
    </div>
  );
}

function Texts() {
  return (
    <div className="text-white flex items-start justify-center h-full ml-96 flex-col gap-4">
      <p className="text-xl text-gray-500 font-sfpro">Pro.Beyond.</p>
      <div className="flex flex-row items-center gap-2 font-sfpro text-7xl">
        <p>Iphone</p>
        <p>14</p>
        <p className="font-bold text-7xl">Pro</p>
      </div>
      <div>
        <p className="text-gray-500">
          Created to change everything for the better. For everyone
        </p>
      </div>
      <Button variant="bordered" className="px-10 py-6 text-white">
        Shop Now
      </Button>
    </div>
  );
}

function Image() {
  return (
    <img
      src="https://www.figma.com/file/wTUchfS1t0YTSCeSmZ42ru/image/20ae4cc7d95ed194279d337796d951679b146d4a"
      alt="iphone 14 resmi"
      className="h-[1050px] absolute top-20 "
    />
  );
}
