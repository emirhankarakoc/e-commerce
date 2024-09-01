export default function Browse() {
  return (
    <div className="py-20 px-36">
      <h1 className="text-3xl font-sfpro font-bold">Browse By Category</h1>

      <div className="flex flex-row flex-wrap items-center justify-center my-10 gap-10">
        <button className="flex-grow py-6 rounded-xl flex flex-col items-center bg-gray-100 hover:bg-gray-300">
          <i className="fa-solid fa-mobile-screen-button text-xl"></i>
          <p className="mt-2">Phones</p>
        </button>
        <button className="flex-grow py-6 rounded-xl flex flex-col items-center bg-gray-100 hover:bg-gray-300 ">
          <i className="fa-regular fa-clock"></i>
          <p className="mt-2">Smart Watches</p>
        </button>
        <button className="flex-grow py-6 rounded-xl flex flex-col items-center bg-gray-100 hover:bg-gray-300 ">
          <i className="fa-solid fa-camera"></i> <p className="mt-2">Cameras</p>
        </button>
        <button className="flex-grow py-6 rounded-xl flex flex-col items-center bg-gray-100 hover:bg-gray-300 ">
          <i className="fa-solid fa-headphones"></i>
          <p className="mt-2">Headphones</p>
        </button>
        <button className="flex-grow py-6 rounded-xl flex flex-col items-center bg-gray-100 hover:bg-gray-300 ">
          <i className="fa-solid fa-desktop"></i>
          <p className="mt-2">Computers</p>
        </button>
        <button className="flex-grow py-6 rounded-xl flex flex-col items-center bg-gray-100 hover:bg-gray-300 ">
          <i className="fa-solid fa-gamepad"></i> <p className="mt-2">Gaming</p>
        </button>
      </div>
    </div>
  );
}
