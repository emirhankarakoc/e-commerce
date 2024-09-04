import { Divider } from "@nextui-org/react";

function Details({ detaylar }: { detaylar: DetailsProp }) {
  return (
    <div className="bg-[#FFFFFF] p-20">
      <h2 className="text-4xl font-bold font-sfpro">Details</h2>

      {/* Description */}
      <p className="text-gray-600 my-6">{detaylar.descriptionDetails}</p>

      <h2 className="text-3xl font-bold font-sfpro">Screen</h2>

      <div className="flex flex-col space-y-4 mt-4">
        <div className="flex justify-between">
          <p className="text-lg font-semibold">Screen Diagonal:</p>
          <p className="text-lg">{detaylar.screenDiagonal}</p>
        </div>
        <Divider className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-semibold">Screen Resolution:</p>
          <p className="text-lg">{detaylar.screenResolution}</p>
        </div>
        <Divider className="my-4" />

        <div className="flex justify-between">
          <p className="text-lg font-semibold">Screen Refresh Rate:</p>
          <p className="text-lg">{detaylar.screenRefreshRate}</p>
        </div>
        <Divider className="my-4" />

        <div className="flex justify-between">
          <p className="text-lg font-semibold">Pixel Density:</p>
          <p className="text-lg">{detaylar.pixelDensity}</p>
        </div>
        <Divider className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-semibold">Screen Type:</p>
          <p className="text-lg">{detaylar.screenType}</p>
        </div>
        <Divider className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-semibold">Additionally:</p>
          <p className="text-lg">{detaylar.additionaly}</p>
        </div>
        <Divider className="my-4" />
      </div>
    </div>
  );
}
export default Details;
