import Image from "next/image";

export default function AuthIllustration() {
  return (
    <div className="w-full h-full relative">
      <Image
        src={"/images/login-illustrations.png"}
        fill
        alt="Login Illustration"
        className="object-cover"
      />
    </div>
  );
}
