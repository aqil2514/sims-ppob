import z from "zod";

export const registrationSchema = z
  .object({
    email: z.email("Alamat email tidak valid").min(1, "Email harus diisi"),
    firstName: z.string().min(1, "Nama depan harus diisi"),
    lastName: z.string().min(1, "Nama belakang harus diisi"),
    password: z.string().min(1, "Password harus diisi"),
    confirmPassword: z.string().min(1, "Konfirmasi password harus diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password tidak sama",
    path: ["confirmPassword"],
  });

export type RegistrationSchemaType = z.infer<typeof registrationSchema>;
