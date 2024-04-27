import Image from "next/image";
import DnaMatrix from "./components/DnaMatrix";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-r from-[#2d005a] to-[#bd0062]">
      <h1 className="text-[30px] leading-normal pb-[50px] font-bold">DNA Detect</h1>
      <DnaMatrix />
      <div className="w-[40vw] pt-4 text-center">
        <p>Ajuste o número de linhas e colunas, use as setas do teclado para navegar entre os campos de texto e insira caracteres representando as bases do DNA (A, T, C, G). Clique em &quot;Check DNA&quot; para verificar se há sequências de quatro letras iguais nas direções horizontais, verticais ou diagonais.</p>

      </div>
      
    </main>
  );
}
