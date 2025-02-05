import Footer from "./Footer";
import Lamp from "./Lamp";
import CoolDoggo from "./../public/cool-doggo_square-full.svg";

export default function Home() {

  return (<>
      <Lamp/>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start relative inline-block group">
          <div className="image w-[150px] transform transition-transform duration-300 ease-in-out group-hover:scale-110">
            <CoolDoggo  />
          </div>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-white text-sm bg-black rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Available soon
          </span>
        </main>
        <Footer/>
      </div>
    </>);
}
