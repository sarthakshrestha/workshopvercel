import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Send } from "lucide-react";
import SubmitButton from "../../../assets/Submit.svg";

const DailyReflection = () => {
  const [reflection, setReflection] = useState("");

  const handleReflectionChange = (e) => {
    setReflection(e.target.value);
  };

  const handleSubmit = () => {
    // Add your submit logic here
    console.log("Reflection submitted:", reflection);
  };

  return (
    <Card className="bg-[#70CFCD] h-full">
      <CardContent className="bg-[#70CFCD] mt-5 relative">
        <textarea
          className="w-full bg-[#70CFCD] h-96 p-2 rounded-md resize-none placeholder:text-3xl placeholder:text-black placeholder:font-patrick"
          placeholder="Use me to reflect everyday"
          value={reflection}
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
