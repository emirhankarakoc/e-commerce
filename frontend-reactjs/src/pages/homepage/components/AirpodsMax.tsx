export default function AirpodsMax() {
  return (
    <div className="h-[350px] bg-[#EDEDED] grid grid-cols-3">
      <div className="col-span-1">
        <Image />
      </div>
      <div className="col-span-2">
        <Texts />
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="relative overflow-hidden h-[350px]">
      <img
        src="https://www.figma.com/file/wTUchfS1t0YTSCeSmZ42ru/image/862f3bde7875d13ee02e9b629cda7dc570b6e510"
        alt="airpods max"
        className="absolute h-[350px] right-2/4"
      />
    </div>
  );
}

function Texts() {
  return (
    <div>
      <div className="flex flex-col items-start justify-center h-[350px] text-3xl">
        <div>Apple</div>
        <div className="flex gap-2 flex-row items-center">
          <div>AirPods</div>
          <div className="font-bold text-4xl">Max</div>
        </div>
        <div className="text-gray-600 text-xl">
          Computational audio. Listen, it's powerful
        </div>
      </div>
    </div>
  );
}
