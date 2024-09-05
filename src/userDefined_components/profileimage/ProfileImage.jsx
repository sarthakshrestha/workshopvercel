import React, { useState, useEffect } from "react";
import apiClient from "config/apiClient";

const DisplayProfile = ({ profilePicture, studentName }) => {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (profilePicture) {
        try {
          const response = await apiClient.get(
            `/files/download/${profilePicture}`,
            {
              responseType: "blob",
            }
          );
          const imageUrl = URL.createObjectURL(response.data);
          setProfilePictureUrl(imageUrl);
        } catch (error) {
          console.error("Error fetching profile picture:", error);
        }
      }
    };

    fetchProfilePicture();

    return () => {
      if (profilePictureUrl) {
        URL.revokeObjectURL(profilePictureUrl);
      }
    };
  }, [profilePicture]);

  const fallbackContent = studentName
    ? studentName.charAt(0).toUpperCase()
    : "";

  return (
    <div className="w-96 h-96 relative overflow-hidden bg-gray-800">
      {profilePictureUrl ? (
        <img
          src={profilePictureUrl}
          alt={`${studentName}'s profile picture`}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-500">
          {fallbackContent}
        </div>
      )}
    </div>
  );
};

export default DisplayProfile;
