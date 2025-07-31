import { Profile } from "@/@types/user";
import { profileSchema } from "@/schemas/profile-schema";
import { api } from "@/variables/api";
import axios from "axios";
import { toast } from "sonner";
import z from "zod";

export const validateProfileData = (profile: Profile) => {
  try {
    profileSchema.parse(profile);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues;
      toast.error(issues[0].message);
      throw error;
    }
  }
};

export const updateImage = async (image: File, token: string) => {
  try {
    const formData = new FormData();
    formData.append("file", image);

    const { data } = await axios.put(`${api}/profile/image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data.profile_image as string;
  } catch (error) {
    console.error("Update Image Error", error);
    throw error;
  }
};
