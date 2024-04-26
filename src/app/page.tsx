import Image from "next/image";
import DnaMatrix from "./components/DnaMatrix";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-[30px] leading-normal pb-[50px]">DNA Detect</h1>
     <DnaMatrix/>
    </main>
  );
}
