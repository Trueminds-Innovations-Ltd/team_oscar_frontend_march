import Image from "./Image";

function Logo() {
  return (
    <div>
      <Image
        className="w-30 min-[700px]:hidden"
        src="./images/logo.png"
        alt="logo"
      />
    </div>
  );
}

export default Logo;
