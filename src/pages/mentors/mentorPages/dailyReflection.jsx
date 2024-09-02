import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Send } from "lucide-react";
import SubmitButton from "../../../assets/Submit.svg";
import apiClient from "config/apiClient";

const DailyReflection = () => {
  const teacherId = localStorage.getItem("teacher_id");
  const [reflection, setReflection] = useState({
    body: "", 
    mentor_id: teacherId,
  });

  const handleReflectionChange = (e) => {
    setReflection({
      ...reflection, // Spread existing state
      body: e.target.value, // Update only the 'body' property
    });
  };

  const handleSubmit = async () => {
    // Add your submit logic here
    const response = await apiClient.post("/journals", reflection); // Replace with your actual API endpoint
    console.log("Reflection submitted:", reflection);
  };

  return (
    <Card className="bg-[#70CFCD] h-full">
      <CardContent className="bg-[#70CFCD] mt-5 relative">
        <textarea
          className="w-full bg-[#70CFCD] h-96 p-2 rounded-md resize-none placeholder:text-3xl placeholder:text-black placeholder:font-patrick"
          placeholder="Use me to reflect everyday"
          value={reflection.body} // Access the body from the state
          onChange={handleReflectionChange}
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-[#6C6C6C]">Complete by 8 PM Daily</p>
          <button
            onClick={handleSubmit}
            className="p-2 rounded-full hover:bg-[#5DBFBD] transition-colors duration-200"
          >
            <img src={SubmitButton} className="h-14 w-14" alt="Submit Button" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyReflection;
