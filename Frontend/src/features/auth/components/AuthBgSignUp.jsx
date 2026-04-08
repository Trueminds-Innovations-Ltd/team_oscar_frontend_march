import Image from "../../../shared/ui/Image";
const features = [
  {
    title: "Courses",
  },
  {
    title: "AI-Tutor Included",
  },
  {
    title: "Free to start",
  },
  {
    title: "Collaboration",
  },
];

function AuthBgSignUp() {
  return (
    <div className="relative w-full max-[700px]:hidden">
      <div className="absolute inset-0 bg-primary-color rounded-r-[30px]"></div>

      <div className="relative z-10 flex flex-col h-full py-18 pl-15 pr-15 max-[1100px]:px-14 max-[1100px]:py-23 max-[870px]:py-30">
        <h1 className="text-white text-4xl font-bold leading-15.25 max-[840px]:leading-10.5">
          Talent Flow
        </h1>

        <Image
          src="/images/authImage2.png"
          alt="authImage"
          className="mt-15 w-125 object-cover"
        />

        <p className="text-4xl text-text-primary font-bold leading-10.5 w-100 mt-10">
          Start learning and Collaborating instantly
        </p>
        <p className="text-[16px] text-text-primary font-medium leading-5.5 mt-4">
          Set up your account in a minute and get access to free premimum course
          materials.
        </p>

        <div className="flex gap-2 text-text-primary mt-4 max-[1302px]:grid max-[1302px]:grid-cols-2 ">
          {features.map((feature) => (
            <span
              key={feature.title}
              className="text-[13px] border border-text-primary rounded-2xl px-4 py-0.5 max-[1302px]:text-[14px]"
            >
              {feature.title}
            </span>
          ))}
        </div>

        <div className="bg-bg-color-main flex items-center gap-3 rounded-full px-1.5 py-1.5 w-100 mt-8">
          <Image src="/images/nestedImages.png" alt="nestedImages" />
          <span className="text-[16px] text-primary-color font-semibold">
            Join 10,000+ active learners learners
          </span>
        </div>
      </div>
    </div>
  );
}

export default AuthBgSignUp;
