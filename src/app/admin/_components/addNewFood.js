import { PlusIcon } from "@/app/icons/plusIcon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhotoIcon } from "@/app/icons/photoIcon";
import { useState } from "react";
import Image from "next/image";
import { Sonnera } from "./sonnera";

const UPLOAD_PRESET = "Food....";
const CLOUD_NAME = "dlmhcd5zm";

export function AddNewFood({ fetchData, categoryId }) {
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
    }
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setLogoUrl(url);
    } catch (err) {
      console.log("Failed to upload logo: " + err.message);
    } finally {
      setUploading(false);
    }
  };
  const handleAddNewFood = async () => {
    try {
      const res = await fetch("http://localhost:8000/food", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        accept: "application/json",
        body: JSON.stringify({
          foodName: foodName,
          category: categoryId,
          price: price,
          ingredients: ingredients,
          Image: logoUrl,
        }),
      });
      await fetchData();
    } catch (err) {
      console.log("❌ Fetch failed:", err);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div className="rounded-full w-9 h-9 bg-red-500 flex items-center justify-center cursor-pointer">
            <PlusIcon />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[460px] h-fit flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle>Add new Dish to Appetizers</DialogTitle>
          </DialogHeader>
          <div className="flex justify-between">
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Food name</Label>
                <Input
                  id="name-1"
                  name="name"
                  placeholder="Type food name"
                  onChange={(e) => setFoodName(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Food price</Label>
                <Input
                  id="name-1"
                  name="name"
                  placeholder="Enter price..."
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Ingredients</Label>
              <Input
                id="name-1"
                name="name"
                className={"h-[90px]"}
                placeholder="List ingredients..."
                onChange={(e) => setIngredients(e.target.value)}
              />
            </div>
          </div>
          <div className="h-[150px] w-full relative">
            {!logoUrl ? (
              <Label htmlFor="input-file">
                <input
                  id="input-file"
                  type="file"
                  onChange={handleLogoUpload}
                  accept="image/*"
                  className="hidden"
                />
                {(uploading && (
                  <div className="border w-full h-35 rounded-md flex justify-center items-center">
                    <p>Uploading...</p>
                  </div>
                )) || (
                  <div className="flex flex-col gap-3 w-full h-full">
                    <p>Food image</p>
                    <div className="border w-full h-35 rounded-md flex flex-col justify-center items-center">
                      <div className="bg-white rounded-full flex items-center justify-center w-8 h-8 border">
                        <PhotoIcon />
                      </div>
                      <p>Choose a file or drag & drop it here</p>
                    </div>
                  </div>
                )}
              </Label>
            ) : (
              <Image
                src={logoUrl}
                alt="Food image"
                fill
                className="rounded-[5px] object-cover"
              />
            )}
          </div>
          <div onClick={handleAddNewFood} className="flex w-full justify-end">
            <Sonnera />
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
