import Image from "next/image";

export default function AuthIllustration() {
  return (
    <div className="w-full h-full relative md:block hidden">
      <Image
        src={"/images/login-illustrations.png"}
        fill
        alt="Login Illustration"
        className="object-cover"
        priority
        sizes="auto"
      />
    </div>
  );
}
