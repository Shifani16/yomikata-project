export default function TextArea() {
  return (
    <div className="w-full px-4">
      <div className="p-4 rounded-lg w-full">
        <div className="flex gap-10 w-full">
          {/* First Column (Original text) */}
          <div className="bg-white flex-1 flex flex-col shadow-2xl rounded-lg border">
            <div className="flex mb-2 px-4 py-3 gap-5 bg-white shadow-md border-b">
              <i className="ri-circle-fill text-xs mt-1"></i>
              <h1 className="font-zhongsong">Original text</h1>
            </div>
            <textarea className="bg-white text-black placeholder:text-gray-400 focus:outline-gray-400 h-64 p-3 rounded w-full resize-none"></textarea>
          </div>

          {/* Second Column (Translated text) */}
          <div className="bg-white  flex-1 flex flex-col shadow-2xl rounded-lg border">
            <div className="flex mb-2 px-4 py-3 gap-5 bg-white shadow-md border-b">
              <i className="ri-circle-fill text-xs mt-1"></i>
              <h1 className="font-zhongsong">Translated text</h1>
            </div>
            <textarea className="bg-white text-black placeholder:text-gray-400 focus:outline-gray-400 h-64 p-3 rounded w-full resize-none"></textarea>
          </div>
        </div>
      </div>

      <div className="mt-15 flex justify-center font-libertinus font-bold ">
        <button className="items-center justify-center hover:cursor-pointer">
          <div className="bg-black shadow-md text-white px-15 py-3 text-lg mt-4 hover:bg-gray-700 transition-colors duration-300">
            Translate
          </div>
        </button>
      </div>
    </div>
  );
}
