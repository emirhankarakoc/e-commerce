export default function Playstation5() {
  return (
    <div className="h-[350px] bg-[#ffffff]  grid grid-cols-2 overflow-hidden">
      <div className="col-span-1 relative">
        <Image />
      </div>
      <div className="col-span-1">
        <Texts />
      </div>
    </div>
  );
}
function Texts() {
  return (
    <div className="flex flex-col items-start justify-center h-[350px] gap-8 ">
      <h3 className="text-6xl  font-sfpro">Playstation 5</h3>
      <p className="text-gray-600">
        Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will
        redefine your PlayStation experience.
      </p>
    </div>
  );
}
function Image() {
  return (
    <img
      src="https://www.figma.com/file/wTUchfS1t0YTSCeSmZ42ru/image/1c360f790c1817d3afa266b3c9f8c81ff0ed4428"
      alt="ps5 image"
      className="absolute h-[350px] right-1/4"
    />
  );
}
