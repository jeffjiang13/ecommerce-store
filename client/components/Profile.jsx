import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AccountIcon from "./AccountIcon";
import { updateUser, setUser } from "@/store/authSlice";

const Profile = ({ token }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const [selectedFile, setSelectedFile] = useState(null);
  const [userData, setUserData] = useState(currentUser);
  const [previewUrl, setPreviewUrl] = useState(
    currentUser?.profileImage
      ? currentUser.profileImage.provider === "cloudinary"
        ? currentUser.profileImage.url
        : `${process.env.NEXT_PUBLIC_API_URL}${currentUser.profileImage.url}`
      : ""
  );
    console.log("previewUrl",previewUrl)
    console.log('userData',userData)
    console.log('currentUser',currentUser)
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${currentUser.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setUserData(response.data);

      if (response.data.profileImage) {
        setPreviewUrl(
          response.data.profileImage.provider === 'cloudinary'
            ? response.data.profileImage.url
            : `${process.env.NEXT_PUBLIC_API_URL}${response.data.profileImage.url}`
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (currentUser?.profileImage) {
      setPreviewUrl(
        currentUser.profileImage.provider === "cloudinary"
          ? currentUser.profileImage.url
          : `${process.env.NEXT_PUBLIC_API_URL}${currentUser.profileImage.url}`
      );
    } else {
      setPreviewUrl(null);
    }
  }, [currentUser]);

  // useEffect(() => {
  //   if (currentUser && token) {
  //     fetchUserData();
  //   }
  // }, [currentUser, token, currentUser?.id, []]);

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

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("files", imageFile);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const userUpdateResponse = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${currentUser.id}`,
        { profileImage: response.data[0].id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const updatedUser = {
        ...currentUser,
        profileImage: response.data[0],
      };
      setUserData(updatedUser);
      dispatch(updateUser(updatedUser));

      setPreviewUrl(
        response.data[0].provider === 'cloudinary'
          ? response.data[0].url
          : `${process.env.NEXT_PUBLIC_API_URL}${response.data[0].url}`
      );

    } catch (err) {
      console.log("Image upload error:", err);
    }
  };

  const handleProfileImageUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    uploadImage(selectedFile);
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
