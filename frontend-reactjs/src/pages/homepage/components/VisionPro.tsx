export default function VisionPro() {
  return (
    <div className="h-[350px] bg-[#353535] grid grid-cols-3 text-white">
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
        src="https://www.figma.com/file/wTUchfS1t0YTSCeSmZ42ru/image/c10d86201d5d593c85eadbb74bd5d5697aa4eb85"
        alt="vision pro"
        className="absolute h-[350px]  right-1/4 transform scale-x-[-1] w-[200px]"
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
          <div>Vision</div>
          <div className="font-bold text-4xl">Max</div>
        </div>
        <div className="text-gray-400 text-xl">
          An immersive way to experience entertainment
        </div>
      </div>
    </div>
  );
}
