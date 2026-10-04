import TextArea from "./TextArea";

export function Home() {
  return (
    <section className="h-screen flex mt-25 justify-center">
      <div className="flex flex-col items-center gap-15 w-full px-2">
        
        {/* Title and Subtitle */}
        <div className="font-zhongsong text-center">
          <h1 className="text-5xl">Find Out and Learn!</h1>
          <p className="text-md text-gray-500 mt-2 tracking-widest">
            How to read and what it mean
          </p>
        </div>

        {/* Textareas Container (w-full makes the gray box stretch across the screen) */}
        
        <TextArea />

        
      </div>
    </section>
  );
}

export default Home;