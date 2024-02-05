import supabase from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  // let { data, errorGetCabin } = await supabase
  //   .from("cabins")
  //   .select("id, image");

  // const imagePath = data
  //   .find((item) => item.id === id)
  //   .image.split("/")
  //   .slice(-1)[0];

  const { error } = await supabase.from("cabins").delete().eq("id", id);
  // const { error: deleteError } = await supabase.storage
  //   .from("cabin-images")
  //   .remove([imagePath]);

  if (error) {
    console.log(error);
    throw new Error("cabins could not be deleted");
  }

  return null;
}

export async function createEditCabin(formData, id) {
  const hasImagePath = formData.image?.startsWith?.(
    "https://tutaydcbsuglspuywosf.supabase.co"
  );

  //https://tutaydcbsuglspuywosf.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const cabinImageName = `${Math.random()}${formData.image.name?.replace(
    "/",
    ""
  )}`;

  const imageURL = hasImagePath
    ? formData.image
    : `https://tutaydcbsuglspuywosf.supabase.co/storage/v1/object/public/cabin-images/${cabinImageName}`;

  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...formData, image: imageURL }]);

  if (id) query = query.update({ ...formData, image: imageURL }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) throw new Error("Cannot add new cabin. You suck.");
  //2. upload image

  if (hasImagePath) return data;
  const { error: errorUpload } = await supabase.storage
    .from("cabin-images")
    .upload(cabinImageName, formData.image);

  if (errorUpload) {
    await supabase.from("cabins").delete().eq("id", formData.id);
  }

  return data;
}
