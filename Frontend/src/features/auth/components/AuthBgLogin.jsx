import Image from "../../../shared/ui/Image";
const features = [
  {
    title: "Courses",
  },
  {
    title: "AI-Tutor",
  },
  {
    title: "Progress",
  },
  {
    title: "Collaboration",
  },
];

function AuthBgLogin() {
  return (
    <div className="relative w-full max-[700px]:hidden">
      <div className="absolute inset-0 bg-primary-color rounded-r-[30px]"></div>

      <div className="relative z-10 flex flex-col h-full py-18 pl-18 pr-26 max-[1100px]:px-14 max-[1100px]:py-23 max-[870px]:py-27">
        <h1 className="text-white text-4xl font-bold leading-15.25 max-[1000px]:text-4xl max-[840px]:leading-10.5">
          Talent Flow
        </h1>

        <Image
          src="/images/authImage.png"
          alt="authImage"
          className="mt-10 w-125 object-cover"
        />

        <p className="text-4xl text-text-primary font-bold leading-10.5 w-72 mt-10 max-[1000px]:text-4xl">
          Continue your learning journey
        </p>
        <p className="text-[16px] text-text-primary font-medium leading-5.5 mt-4">
          Access courses, assignments, and AI-powered support, all in one place.
        </p>

        <div className="flex gap-2 text-text-primary mt-4 max-[1172px]:grid max-[1172px]:grid-cols-2">
          {features.map((feature) => (
            <span
              key={feature.title}
              className="text-[14px] border border-text-primary rounded-2xl px-2 py-0.5"
            >
              {feature.title}
            </span>
          ))}
        </div>

        <div className="bg-bg-color-main flex items-center gap-3 rounded-full px-1.5 py-1.5 w-80 mt-8">
          <Image src="/images/nestedImages.png" alt="nestedImages" />
          <span className="text-[16px] text-primary-color font-semibold">
            Trusted by 10,000+ learners
          </span>
        </div>
      </div>
    </div>
  );
}

export default AuthBgLogin;
