import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AccountIcon from "./AccountIcon";
import { fetchDataFromApi } from "@/utils/api";

const Profile = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    currentUser?.profileImage
      ? currentUser.profileImage.provider === "cloudinary"
        ? currentUser.profileImage.url
        : `${process.env.NEXT_PUBLIC_API_URL}${currentUser.profileImage.url}`
      : ""
  );
  const [profileId, setProfileId] = useState(null);
  const [filteredProfile, setFilteredProfile] = useState(null);

  useEffect(() => {
    if (currentUser) {
      fetchUserProfile();
    }
  }, [currentUser, token]);

  useEffect(() => {
    if (userProfile?.attributes?.userName === currentUser?.username) {
      setFilteredProfile(userProfile);
    }
  }, [userProfile, currentUser]);


  const fetchUserProfile = async () => {
    try {
      const { data } = await fetchDataFromApi("/api/profiles?populate=*");
      console.log("data", data);

      const foundProfile = data.find(
        (profile) => profile?.attributes?.userName === currentUser.username
      );

      setUserProfile({
        ...foundProfile,
        profileImage: foundProfile?.attributes?.profileImage.data.attributes.url,
      });
      setProfileId(foundProfile ? foundProfile.id : null);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserProfile();
    }
  }, [currentUser, token]);

  useEffect(() => {
    const userProfileUrl = userProfile?.profileImage?.provider
      ? userProfile.profileImage.provider === "cloudinary"
        ? userProfile.profileImage.url
        : `${process.env.NEXT_PUBLIC_API_URL}${userProfile.profileImage.url}`
      : null;

    setPreviewUrl(userProfileUrl);
  }, [userProfile]);

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please select a file first");
      return;
    }
    setSelectedFile(file);
    await uploadImage(file);

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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const allProfiles = await fetchDataFromApi("/api/profiles?populate=*");
      const foundProfile = allProfiles.data.find(
        (profile) => profile.attributes?.userName === currentUser.username
      );

      let profileUpdateResponse;

      // If the profile exists, update it. Otherwise, create a new one
      if (foundProfile && foundProfile.attributes?.profileImage) {
        profileUpdateResponse = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/profiles/${foundProfile.id}`,
          { data: { profileImage: response.data[0].id } },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        profileUpdateResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/profiles`,
          {
            data: {
              user: currentUser.id,
              userName: currentUser.username,
              profileImage: response.data[0].id,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      fetchUserProfile();

      setPreviewUrl(
        response.data[0].provider === "cloudinary"
          ? response.data[0].url
          : `${process.env.NEXT_PUBLIC_API_URL}${response.data[0].url}`
      );
    } catch (err) {
      console.log("Image upload error:", err);
    }
  };

  // const handleProfileImageUpload = () => {
  //   if (!selectedFile) {
  //     alert("Please select a file first");
  //     return;
  //   }

  //   uploadImage(selectedFile);
  // };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center">
        <div className="w-40 h-40 border rounded-full overflow-hidden bg-gray-200">
        <input
            style={{ opacity: 0, position: "absolute", width: "100%", height: "100%", cursor: "pointer" }}
            type="file"
            accept="image/*"
            onChange={handleProfileImageUpload}


            />
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile"
              className="w-full h-full object-cover"
              width="170"
              height="170"
            />
          ) : filteredProfile ? (
            <img
              src={filteredProfile.attributes?.profileImage.data.attributes.url}
              alt="Profile"
              className="w-full h-full object-cover"
              width="170"
              height="170"
            />
          ) : (
            <AccountIcon />
          )}
        </div>
        <div className="ml-6 flex flex-col justify-between">
          <div>
            <div className="mt-4">
              <p className="font-semibold">Username:</p>
              <p className=" text-3xl ">
                {currentUser ? currentUser.username : "Not logged in"}
              </p>
            </div>
            <div className="mt-4">
              <p>
                {" "}
                Nike Member Since{" "}
                {currentUser
                  ? new Date(currentUser.createdAt).toLocaleString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "Not logged in"}
              </p>
            </div>
          </div>
          <div>

            {/* <button
              onClick={handleProfileImageUpload}
              className="bg-black text-white px-4 py-2 rounded-full"
            >
              Upload
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
