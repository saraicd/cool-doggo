import Image from "next/image";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/cool-doggo.png"
          alt="doggo logo"
          width={180}
          height={38}
          priority
        />
      </main>
      <Footer/>
    </div>
  );
}
