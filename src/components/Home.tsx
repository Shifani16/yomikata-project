import TextArea from "./TextArea";
import Yomikata from "./Yomikata";

export function Home() {
  return (
    <section className="min-h-screen flex mt-25">
      <div className="flex flex-col gap-15 w-full px-2">
        <div className="flex flex-col items-center gap-15 w-full px-2 justify-center">
          {/* Title and Subtitle */}
          <div className="font-zhongsong text-center">
            <h1 className="text-5xl text-black dark:text-white">Find Out and Learn!</h1>
            <p className="text-md text-gray-500 dark:text-mid-gray mt-2 tracking-widest">
              How to read and what it mean
            </p>
          </div>

          <TextArea />
        </div>
        <div className="h-screen">
          <Yomikata />
        </div>
      </div>
    </section>
  );
}

export default Home;
