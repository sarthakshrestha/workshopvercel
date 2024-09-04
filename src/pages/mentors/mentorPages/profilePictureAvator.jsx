import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import apiClient from "config/apiClient";

const ProfilePictureAvatar = ({ profilePicture, studentName }) => {
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

  return (
    <Avatar className="w-auto h-32 rounded-none">
      <AvatarImage src={profilePictureUrl} alt={studentName} />
      <AvatarFallback>
        {studentName ? studentName.charAt(0) : ""}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfilePictureAvatar;
