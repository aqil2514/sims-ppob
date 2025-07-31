import z from "zod";

export const profileSchema = z.object({
  email: z.email("Alamat email tidak valid").min(1, "Email harus diisi"),
  first_name: z.string().min(1, "Nama depan harus diisi"),
  last_name: z.string().min(1, "Nama belakang harus diisi"),
});

export const imageSchema = z
  .file()
  .max(100 * 1024, "Gambar maksimal 100kb")
  .mime(["image/jpeg", "image/png"], "Hanya png dan jpeg saja yang diterima");
