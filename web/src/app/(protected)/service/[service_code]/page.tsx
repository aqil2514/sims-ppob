import ServiceTemplate from "@/components/templates/(protected)/ServiceTemplate";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const { serviceName } = await searchParams;

  return {
    title: `Layanan ${serviceName ?? ""}`,
  };
}

export default async function ServicePayment({
  params,
}: {
  params: Promise<{ service_code: string }>;
}) {
  const { service_code } = await params;
  return <ServiceTemplate service_code={service_code} />;
}
