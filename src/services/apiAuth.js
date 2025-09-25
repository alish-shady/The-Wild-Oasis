import supabase, { supabaseUrl } from "./supabase";

export async function signupAPI({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function loginAPI({ email, password }) {
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return user;
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getSession();
  if (!data.session) return null;
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return user;
}

export async function logoutAPI() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let dataToUpdate;
  if (password) dataToUpdate = { password };
  if (fullName)
    dataToUpdate = {
      data: {
        fullName,
      },
    };
  const { error: uploadImageError, data: uploadedImageData } = avatar
    ? await supabase.storage
        .from("avatars")
        .upload(`avatar-${Math.random()}`, avatar)
    : {};
  if (uploadImageError) throw new Error(uploadImageError.message);
  if (avatar)
    dataToUpdate.data.avatar = `${supabaseUrl}/storage/v1/object/public/${uploadedImageData.fullPath}`;
  const { data: updatedData, error: updateError } =
    await supabase.auth.updateUser(dataToUpdate);
  if (updateError) throw new Error(updateError.message);
  return updatedData;
}
