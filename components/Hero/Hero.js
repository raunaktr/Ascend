export default function Hero() {
  return (
    <>
      <div className="hero min-h-screen">
        <div className="relative px-4 xl-px-0 container mx-auto grid sm:grid-cols-1 md-grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          <div className="text-color p-1">
            <h1 className="text-6xl w-1/2 xl:w-full xl:text-8xl md:text-5xl sm:text-5xl font-black f-f-l">
              Learn. <span className="text-primary">Analyze. </span>Apply.
            </h1>
            <div className="f-f-r text-xl lg:text-3xl pb-20 sm:pb-0 pt-10 xl:pt-20">
              Accelerate your learning with state-of-art notes, easy to grasp, and learn with on on
              the journey for UPSC Prelims, mains and Interview Preparation.
            </div>
            <button className="hover:opacity-90 text-xl w-full xl:text-2xl xl:w-10/12 mt-4 xl:mt-10 f-f-r py-5 bg-primary text-white font-bold">
              Learn More
            </button>
          </div>
          <div className="bg-blue-50"></div>
        </div>
      </div>
    </>
  );
}
