import { Button } from "@nextui-org/button";

export default function BigSummerSale() {
  return (
    <div className="h-[600px] bg-gradient-to-r from-[#2E2E2E] to-[#000000] grid grid-cols-4 place-items-center">
      <div className="col-span-1">
        <img
          src="https://www.figma.com/file/wTUchfS1t0YTSCeSmZ42ru/image/8c6cd547c9c829c2e60e959c3bae5200c59fa615"
          alt=""
        />
      </div>
      <div className="col-span-2">
        <div className="text-white grid place-items-center">
          <div className="font-bold text-7xl my-2">BIG SUMMER SALE !</div>
          <p>Commodo fames vitae vitae leo mauris in. Eu consequat.</p>
          <div className="grid place-items-center">
            <Button variant="bordered" className="px-10 my-10 text-white">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <img
          src="https://www.figma.com/file/wTUchfS1t0YTSCeSmZ42ru/image/3d3524e6a19b0e89deffaac15d27ea38307ee37d"
          alt=""
          className="h-[500px]"
        />
      </div>
    </div>
  );
}
