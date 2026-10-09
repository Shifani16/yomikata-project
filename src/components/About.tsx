export function About() {
  return (
    <section className="h-screen py-20 px-10 p-4 dark:text-white">
      <h1 className="text-4xl font-libertinus font-bold mt-10 px-8">
        About YomiKata
      </h1>
      <div className="mt-6 flex flex-row gap-8 w-full px-8">
        <p className="w-1/2 font-zhongsong text-lg">
          YomiKata is a web application designed to help to learn how to read
          and understand Japanese text. Provides an easier feature
          where all we need to do is to input the Japanase text to know what it mean, how the kanji read, and what that specific kanji mean. The
          application aims to enhance language learning by offering a practical
          tool for reading practice.

          <br></br>
          <br></br>
          Created using React and TypeScript, kanji-furigana library by Kuroshiro, and JMDict for word translation and meaning. For contact, please refer me to my personal page.
        </p>
        <div className="w-1/2 flex justify-center">
          <img
            src="/icon-yomikata-black.svg"
            className="w-40 items-center flex justify-center mb-2 dark:hidden"
            alt="Logo"
          />
          <img
            src="/icon-yomikata.svg"
            className="w-40 items-center justify-center mb-2 hidden dark:block"
            alt="Logo"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
