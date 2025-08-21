import collage from "../assets/collage.jpg";
import useScrollAnimation from "./useScrollAnimation";


const Wim = () => {
  const [textRef, textVisible] = useScrollAnimation();
  return (
    <section className="">
        <div ref={textRef} className={`flex flex-col lg:flex-row justify-center gap-10 items-center bg-gray-100 p-5 w-[95%] mx-auto mt-10 ${textVisible? "animate-slideInLeft" : "animate-slideOutRight"}`}>
      <div className="flex flex-col text-center">
        <h1 className="font-bold text-2xl lg:text-6xl mb-10">Why It Matters</h1>
        <p className="text-xl sm:text-2xl">
          Africa is full of brilliant young people who often lack the tools,
          support, and networks to bring their ideas to life. 
        </p>
        <p className="text-xl sm:text-2xl mt-10">Step-Up Summit
          bridges that gap through knowledge-sharing, mentorship, and
          collaboration. We help participants move from potential to impact.</p>
      </div>
      <div className="w-full" >
        <img src={collage} alt="picCollage" />
      </div>
      </div>
    </section>
  );
};
export default Wim;
