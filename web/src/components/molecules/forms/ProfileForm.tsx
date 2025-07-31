import { Profile } from "@/@types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { logout } from "@/store/slices/auth";
import { defaultImage } from "@/variables/default-images";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface ProfileFormProps {
  defaultValues: Profile;
}

export default function ProfileForm({ defaultValues }: ProfileFormProps) {
  const [profile, setProfile] = useState<Profile>(defaultValues);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const [imagePreview, setImagePreview] = useState<string>(
    profile.profile_image
  );

  const dispatch = useDispatch();
  const router = useRouter();

  if (!profile) return null;

  const logoutCancelHandler = () => {
    if (isEditMode) {
      setIsEditMode(false);
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

  const clickHandler = () => {
    if (!isEditMode) return setIsEditMode(true);
    console.log(profile);
  };

  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (!files) return;

    const file = files[0];
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };

  return (
    <form className="w-2/4 h-2/4 space-y-4">
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
          disabled={!isEditMode}
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
          disabled={!isEditMode}
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
          disabled={!isEditMode}
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
        onClick={clickHandler}
      >
        {isEditMode ? "Simpan" : "Edit Profile"}
      </Button>

      <Button
        variant={"outline"}
        className="border-red-500 text-red-500 hover:text-red-600 w-full"
        type="button"
        onClick={logoutCancelHandler}
      >
        {isEditMode ? "Batalkan" : "Logout"}
      </Button>
    </form>
  );
}
