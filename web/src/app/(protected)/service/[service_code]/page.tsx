import ServiceTemplate from "@/components/templates/(protected)/ServiceTemplate";

export default async function ServicePayment({
  params,
}: {
  params: Promise<{ service_code: string }>;
}) {
  const { service_code } = await params;
  return <ServiceTemplate service_code={service_code} />;
}
