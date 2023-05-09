import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AccountIcon from "./AccountIcon";

const Profile = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  useEffect(() => {
    if (currentUser && currentUser.profileImage) {
      const imgUrl = currentUser.profileImage.provider === 'cloudinary'
        ? currentUser.profileImage.url
        : `${process.env.NEXT_PUBLIC_API_URL}${currentUser.profileImage.url}`;

      setPreviewUrl(imgUrl);
    }
  }, [currentUser]);



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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          },
        }
      );

      const userUpdateResponse = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${currentUser.id}`,
        { profileImage: response.data[0].id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          },
        }
      );

      const uploadedImage = response.data[0];
      const imageUrl = uploadedImage.provider === 'cloudinary'
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
              className="w-full h-full object-cover" // Update the className
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
        <p>{currentUser
 ? currentUser.email : "Not logged in"}</p>
      </div>
    </div>
  );
};

export default Profile;
