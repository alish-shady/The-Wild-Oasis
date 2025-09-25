import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error(error);
  }
  return cabins;
}

export async function createEditCabin(newCabin) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image[0].name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabinImages/${imageName}`;
  let data, error;
  if (newCabin.id === undefined) {
    ({ data, error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, ...(!hasImagePath && { image: imagePath }) }])
      .select());
  } else {
    ({ data, error } = await supabase
      .from("cabins")
      .update({ ...newCabin, ...(!hasImagePath && { image: imagePath }) })
      .eq("id", newCabin.id)
      .select());
  }
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  const { error: storageError } = await supabase.storage
    .from("cabinImages")
    .upload(imageName, newCabin.image[0]);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(error);
    throw new Error(
      "Cabin image could not be uploaded hence the cabin didn't get created"
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const response = await supabase.from("cabins").delete().eq("id", id);
  if (response.error) {
    console.error(response.error);
    throw new Error("Cabin could not be deleted");
  }

  return response;
}
