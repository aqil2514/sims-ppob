import z from "zod";

export const topupSchema = z.object({
  top_up_amount: z.coerce
    .number()
    .gte(10000, "Minimum topup adalah Rp. 10.000")
    .lte(1000000, "Maksimal topup adalah Rp. 1.000.000"),
});

export type TopupSchemaType = z.infer<typeof topupSchema>