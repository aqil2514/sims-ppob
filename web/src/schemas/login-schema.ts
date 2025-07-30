import z from "zod";

export const loginSchema = z.object({
  email: z.email("Alamat email tidak valid").min(1, { error: "Email harus dimasukkan" }),
  password: z.string().min(1, { error: "Password harus dimasukkan" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
