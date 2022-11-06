
export default function About() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 text-center items-center flex">
          <div className="">
            <p className="text-4xl">
            Self::about()
            </p>
            <p className="text-md p-4 text-center mt-8">
          Hi I&apos;m Rahul. I usually write about Rust, databases,
          creativcoding, art and anything that gets me nerdsnipped.
        </p>
          </div>
        </div>
        
        <div className="md:w-1/2 flex items-center md:justify-end justify-center pt-8">
          <img
            className="w-1/2 rounded-[50%] shadow-lg"
            src="https://pbs.twimg.com/profile_images/1585377174600941568/PrGsmO9X_400x400.jpg"
          ></img>
        </div>
      </div>
    </div>
  );
}
