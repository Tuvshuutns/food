import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sonnerq } from "./sonner";
import { PenIcon } from "@/app/icons/penIcon";
import { TrashIcon } from "@/app/icons/trashIcon";
import { useState } from "react";
import { PhotoIcon } from "@/app/icons/photoIcon";

const UPLOAD_PRESET = "Food....";
const CLOUD_NAME = "dlmhcd5zm";

export function AddFoodInfo({ fetchData, categories, item }) {
  const [category, setCategory] = useState(item.category);
  const [foodName, setFoodName] = useState(item.foodName);
  const [price, setPrice] = useState(item.price);
  const [ingredients, setIngredients] = useState(item.ingredients);
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

  const handleEditFood = async () => {
    try {
      const res = await fetch(`http://localhost:8000/food`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        accept: "application/json",
        body: JSON.stringify({
          id: item._id,
          foodName: foodName,
          category: category,
          price: price,
          ingredients: ingredients,
          Image: logoUrl,
        }),
      });
      fetchData();
    } catch (err) {
      console.error("❌ Fetch failed:", err);
    }
  };
  const handleDeleteFood = async () => {
    try {
      const res = await fetch(`http://localhost:8000/food`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        accept: "application/json",
        body: JSON.stringify({
          id: item._id,
        }),
      });
      fetchData();
    } catch (err) {
      console.error("❌ Fetch failed:", err);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div className="rounded-full w-9 h-9 bg-white flex items-center justify-center cursor-pointer">
            <PenIcon />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[472px] h-fit grid">
          <DialogHeader>
            <DialogTitle>Dishes info</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6">
            <div className="flex justify-between gap-3">
              <Label htmlFor="name-1" className={"w-30 text-[#71717A] text-xs"}>
                Dish name
              </Label>
              <Input
                id="name-1"
                name="name"
                defaultValue={foodName}
                onChange={(e) => setFoodName(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Label htmlFor="name-1" className={"w-30 text-[#71717A] text-xs"}>
                Dish category
              </Label>
              <Select
                defaultValue={item.category._id}
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map((item, index) => {
                      return (
                        <SelectItem key={item._id} value={item._id}>
                          {item.categoryName}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3">
              <Label htmlFor="name-1" className={"w-30 text-[#71717A] text-xs"}>
                Ingredients
              </Label>
              <textarea
                id="name-1"
                name="name"
                className={"h-25 border rounded-md w-full p-3"}
                defaultValue={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Label htmlFor="name-1" className={"w-30 text-[#71717A] text-xs"}>
                Price
              </Label>
              <Input
                id="name-1"
                name="name"
                defaultValue={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="h-[150px] w-full relative flex gap-3">
            <Label htmlFor="name-1" className={"w-23 text-[#71717A] text-xs"}>
              Image
            </Label>
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
                  <div className="border h-full w-full rounded-md">
                    <p className="text-blue-600">Uploading...</p>
                  </div>
                )) || (
                  <div className="border w-80 h-full rounded-md flex justify-center items-center flex-col">
                    <div className="bg-white rounded-full flex items-center justify-center w-8 h-8">
                      <PhotoIcon />
                    </div>
                    <p>Choose a file or drag & drop it here</p>
                  </div>
                )}
              </Label>
            ) : (
              <img
                src={logoUrl}
                className="w-full h-full object-cover rounded-md"
              />
            )}
          </div>
          <div className="flex justify-between">
            <button
              className="flex justify-center items-center border border-red-500 rounded-md w-12 h-10"
              onClick={handleDeleteFood}
            >
              <TrashIcon />
            </button>
            <div onClick={handleEditFood}>
              <Sonnerq />
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
