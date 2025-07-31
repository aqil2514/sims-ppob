import { Profile } from "@/@types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { updateImage, validateProfileData } from "@/lib/profile";
import { imageSchema } from "@/schemas/profile-schema";
import { logout } from "@/store/slices/auth";
import { api } from "@/variables/api";
import { defaultImage } from "@/variables/default-images";
import axios, { isAxiosError } from "axios";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import z from "zod";

interface ProfileFormProps {
  defaultValues: Profile;
}

export default function ProfileForm({ defaultValues }: ProfileFormProps) {
  const { token } = useAuth();
  const [profile, setProfile] = useState<Profile>(defaultValues);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [image, setImage] = useState<null | File>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [imagePreview, setImagePreview] = useState<string>(
    profile.profile_image
  );

  const dispatch = useDispatch();
  const router = useRouter();

  if (!profile) return null;

  const logoutCancelHandler = () => {
    if (isEditMode) {
      setIsEditMode(false);
      setProfile(defaultValues);
      setImagePreview(profile.profile_image);
      return;
    }
    dispatch(logout());
    toast.success("Berhasil logout!");
    router.push("/login");
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const state = target.dataset.state as keyof Profile;

    setProfile((prev) => ({ ...prev, [state]: target.value }));
  };

  const submitEditHandler = async () => {
    if (!isEditMode) return setIsEditMode(true);
    validateProfileData(profile);
    if (!image) return;

    try {
      setIsSubmitting(true);
      const urlImage = await updateImage(image, token!);
      setProfile((prev) => ({ ...prev, profile_image: urlImage }));

      const { data } = await axios.put(`${api}/profile/update`, profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(data.message);
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        const data = error.response?.data;

        toast.error(data.message ?? "Terjadi kesalahan");
        throw error;
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (!files) return;

    const file = files[0];
    try {
      imageSchema.parse(file);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
        throw error;
      }
    }

    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    setImage(file);
  };

  return (
    <form className="w-4/5 md:w-2/4 h-2/4 space-y-4">
      <div className="space-y-4">
        <figure className="text-center">
          <div className="relative h-[84px] w-[84px] mx-auto">
            <Image
              src={imagePreview ?? defaultImage}
              alt={`${profile.first_name} image profile`}
              onError={() => setImagePreview(defaultImage)}
              fill
              sizes="auto"
              priority
              className="rounded-full block mx-auto"
            />
            {isEditMode && (
              <>
                <Label
                  htmlFor="image-input"
                  className="absolute bottom-0 right-0 bg-white/80 cursor-pointer hover:bg-white duration-100 hover:scale-90 p-2 rounded-full w-8 h-8"
                >
                  <Pencil />
                </Label>
                <Input
                  id="image-input"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={imageChange}
                />
              </>
            )}
          </div>

          <figcaption>{`${profile.first_name} ${profile.last_name}`}</figcaption>
        </figure>
      </div>
      <div className="space-y-4">
        <Label htmlFor="email">Email</Label>
        <Input
          disabled={!isEditMode || isSubmitting}
          type="email"
          id="email"
          value={profile.email}
          data-state="email"
          onChange={changeHandler}
        />
      </div>
      <div className="space-y-4">
        <Label htmlFor="firstName">Nama Depan</Label>
        <Input
          disabled={!isEditMode || isSubmitting}
          id="firstName"
          type="text"
          value={profile.first_name}
          data-state="first_name"
          onChange={changeHandler}
        />
      </div>
      <div className="space-y-4">
        <Label htmlFor="lastName">Nama Belakang</Label>
        <Input
          disabled={!isEditMode || isSubmitting}
          id="lastName"
          type="text"
          value={profile.last_name}
          data-state="last_name"
          onChange={changeHandler}
        />
      </div>

      <Button
        type="button"
        className="bg-red-500 hover:bg-red-600 w-full"
        disabled={isSubmitting}
        onClick={submitEditHandler}
      >
        {isEditMode ? "Simpan" : "Edit Profile"}
      </Button>

      <Button
        variant={"outline"}
        className="border-red-500 text-red-500 hover:text-red-600 w-full"
        type="button"
        disabled={isSubmitting}
        onClick={logoutCancelHandler}
      >
        {isEditMode ? "Batalkan" : "Logout"}
      </Button>
    </form>
  );
}
