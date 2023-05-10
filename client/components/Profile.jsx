import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AccountIcon from "./AccountIcon";

const Profile = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  console.log(token);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    currentUser?.profileImage
      ? currentUser.profileImage.provider === "cloudinary"
        ? currentUser.profileImage.url
        : `${process.env.NEXT_PUBLIC_API_URL}${currentUser.profileImage.url}`
      : ""
  );
  console.log("User object:", currentUser);
  console.log("Profile image data:", currentUser.profileImage);
  console.log("Image URL:", previewUrl);
  console.log("Token from Redux store:", token);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleProfileImageUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("files", selectedFile);

    try {
        console.log("Token in request headers (POST):", `Bearer ${token}`);

      const response = await axios.post(
        `http://localhost:1339/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Token in request headers (PUT):", `Bearer ${token}`);

      const userUpdateResponse = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${currentUser.id}`,
        { profileImage: response.data[0].id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const uploadedImage = response.data[0];
      const imageUrl =
        uploadedImage.provider === "cloudinary"
          ? uploadedImage.url
          : `${process.env.NEXT_PUBLIC_API_URL}${uploadedImage.url}`;
      setPreviewUrl(imageUrl);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };



  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center">
        <div className="w-40 h-40 border rounded-full overflow-hidden bg-gray-200">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile"
              className="w-full h-full object-cover"
              width="170"
              height="170"
            />
          ) : (
            <AccountIcon />
          )}
        </div>
        <div className="ml-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="mb-2"
          />
          <button
            onClick={handleProfileImageUpload}
            className="bg-black text-white px-4 py-2 rounded-full"
          >
            Upload
          </button>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-semibold">Username:</p>
        <p>{currentUser ? currentUser.username : "Not logged in"}</p>
      </div>
      <div className="mt-4">
        <p className="font-semibold">Email:</p>
        <p>{currentUser ? currentUser.email : "Not logged in"}</p>
      </div>
    </div>
  );
};

export default Profile;
