export function About() {
  return (
    <section className="h-screen py-20 px-10 p-4">
      <h1 className="text-4xl font-libertinus font-bold mt-10 px-8">
        About YomiKata
      </h1>
      <div className="mt-6 flex flex-row gap-8 w-full px-8">
        <p className="w-1/2 font-zhongsong text-lg">
          YomiKata is a web application designed to help users learn how to read
          and understand Japanese text. It provides a user-friendly interface
          where users can input original Japanese text and receive translations,
          making it easier to comprehend the meaning of the text. The
          application aims to enhance language learning by offering a practical
          tool for reading practice.

          <br></br>
          <br></br>
          Created using React and TypeScript with help of KuroShiro library.
        </p>
        <div className="w-1/2 flex justify-center">
          <img
            src="/icon-yomikata-black.svg"
            className="w-40 items-center flex justify-center mb-2"
            alt="Logo"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
