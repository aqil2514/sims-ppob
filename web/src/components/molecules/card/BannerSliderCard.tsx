import { Banner } from "@/@types/data";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

import "swiper/css";

interface BannerSliderCardProps {
  banners?: Banner[];
}

export default function BannerSliderCard({
  banners = [],
}: BannerSliderCardProps) {
  return (
    <Swiper
      breakpoints={{
        "@0.00": {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        "@0.75": {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        "@1.00": {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        "@1.50": {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      }}
      spaceBetween={10}
      slidesPerView={4}
      modules={[Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className="w-full"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.banner_image}>
          <ImageWithFallback banner={banner} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function ImageWithFallback({ banner }: { banner: Banner }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <figure className="relative w-full h-32 overflow-hidden rounded-md">
      {!isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-md" />
      )}
      <Image
        alt={banner.banner_name}
        src={banner.banner_image}
        fill
        className={`object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
        priority
      />
    </figure>
  );
}
