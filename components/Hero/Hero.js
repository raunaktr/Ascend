export default function Hero() {
  return (
    <>
      <div className="hero min-h-screen">
        <div className="relative hero-content xl:p-20 px-4 xl-px-0 container mx-auto grid sm:grid-cols-1 md-grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          <div className="text-color">
            <h1 className="text-7xl w-1/2 xl:w-full xl:text-8xl md:text-6xl font-black f-f-l">
              Learn. <span className="text-primary">Analyze. </span>Apply.
            </h1>
            <div className="f-f-r text-xl lg:text-2xl pb-10 sm:pb-0 pt-10 xl:pt-20">
              Accelerate your learning with state-of-art notes, easy to grasp, and learn with on on
              the journey for UPSC Prelims, mains and Interview Preparation.
            </div>
            <button className="w-full xl:w-10/12 xl:mt-10 xl:mx-10 f-f-r py-5 mt-4 btn btn-primary">
              Learn More
            </button>
          </div>
          <div className="bg-blue-50"></div>
        </div>
      </div>
    </>
  );
}
