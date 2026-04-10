import Image from "../../../shared/ui/Image";

const features = [
  { title: "Courses" },
  { title: "AI-Tutor Included" },
  { title: "Free to start" },
  { title: "Collaboration" },
];

function AuthBgSignUp() {
  return (
    <div className="relative w-[45%] h-screen overflow-hidden max-[700px]:hidden">
      <div className="absolute inset-0 bg-primary-color rounded-r-[40px]"></div>

      <div className="relative z-10 h-full flex flex-col pt-10 pb-10 px-12 lg:px-16 justify-between">
        <div className="shrink-0">
          <h1 className="text-white text-3xl font-bold tracking-tight">
            Talent Flow
          </h1>
        </div>

        <div className="flex flex-col items-start justify-center flex-1 min-h-0 py-2">
          <Image
            src="/images/authImage2.png"
            alt="authImage"
            className="w-[80%] max-h-[40%] object-contain mb-6 shrink transition-transform hover:scale-110 duration-500 filter drop-shadow-2xl brightness-110"
          />

          <div className="space-y-3">
            <h2 className="text-2xl xl:text-3xl text-text-primary font-bold leading-tight max-w-md">
              Start learning and collaborating instantly
            </h2>
            <p className="text-sm xl:text-base text-text-primary/90 font-medium max-w-sm leading-relaxed">
              Set up your account in a minute and get access to free premium
              course materials.
            </p>
          </div>
        </div>

        <div className="shrink-0 space-y-6">
          <div className="flex flex-wrap gap-2 text-text-primary">
            {features.map((feature) => (
              <span
                key={feature.title}
                className="text-[11px] xl:text-[13px] border border-text-primary/40 rounded-full px-3 py-1 backdrop-blur-sm"
              >
                {feature.title}
              </span>
            ))}
          </div>

          <div className="bg-bg-color-main/10 border border-white/10 flex items-center gap-3 rounded-full px-2 py-2 w-fit pr-6">
            <Image
              src="/images/nestedImages.png"
              alt="nestedImages"
              className="h-8 w-auto"
            />
            <span className="text-[13px] xl:text-[15px] text-text-primary font-semibold">
              Join 10,000+ active learners
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthBgSignUp;
