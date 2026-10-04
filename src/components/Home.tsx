import { useState } from "react";
import TextArea from "./TextArea";
import Yomikata from "./Yomikata";

export function Home() {
  const [sourceText, setSourceText] = useState("");

  return (
    <section className="min-h-screen flex mt-15 md:mt-25">
      <div className="flex flex-col gap-10 md:gap-15 w-full px-1 md:px-2">
        <div className="flex flex-col md:items-center gap-10 md:gap-15 w-full px-4 md:px-2 justify-center">
          <div className="font-zhongsong md:text-center">
            <h1 className="text-2xl md:text-5xl text-black dark:text-white">Find Out and Learn!</h1>
            <p className="md:text-md text-sm text-gray-500 dark:text-mid-gray mt-2 tracking-widest">
              How to read and what it mean
            </p>
          </div>

          <TextArea sourceText={sourceText} setSourceText={setSourceText} />
        </div>

        <div className="w-full">
          <Yomikata sourceText={sourceText}/>
        </div>
        
      </div>
    </section>
  );
}

export default Home;