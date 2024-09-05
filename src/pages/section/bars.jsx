import React from "react";
import {
  Users,
  BarChart2,
  Settings,
  Star,
  DollarSign,
  Smile,
  Shield,
} from "lucide-react";
import Icon1 from "../../gallery/svg/Icon1.svg";
import Icon2 from "../../gallery/svg/Icon2.svg";
import Icon3 from "../../gallery/svg/Icon3.svg";
import Icon4 from "../../gallery/svg/Icon4.svg";
import Icon5 from "../../gallery/svg/Icon5.svg";
import Icon6 from "../../gallery/svg/Icon6.svg";
import Icon7 from "../../gallery/svg/Icon7.svg";

function Bars() {
  return (
    <div className="max-w-7xl mx-auto p-14">
      <hr className="border-black my-16"></hr>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Benefits for students
          </h2>
          <div className="space-y-10">
            <div className="flex space-x-4 items-center">
              <div className="border border-gray-200 p-6 rounded-md">
                <img
                  src={Icon1}
                  alt="Icon1"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Save 50% of teaching time
                </h3>
                <p className="text-gray-500">
                  By using our practitioner, we can give you more time to focus
                  on teaching.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="border border-gray-200 p-6 rounded-md">
                <img
                  src={Icon2}
                  alt="Icon2"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Engage your students
                </h3>
                <p className="text-gray-500">
                  Coding theory is explained through an adventure story.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="border border-gray-200 p-6 rounded-md">
                <img
                  src={Icon3}
                  alt="Icon3"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Make data-driven decisions
                </h3>
                <p className="text-gray-500">
                  Follow your students' progress aligned with the curriculum.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="border border-gray-200 p-6 rounded-md">
                <img
                  src={Icon4}
                  alt="Icon4"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Onboard easily
                </h3>
                <p className="text-gray-500">
                  We are committed to supporting you every step of the way.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits for institutions */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Benefits for institutions
          </h2>
          <div className="space-y-10">
            <div className="flex items-center space-x-4">
              <div className="border border-gray-200 p-6 rounded-md">
                <img
                  src={Icon5}
                  alt="Icon5"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Make your college the best in the region
                </h3>
                <p className="text-gray-600">
                  Increase the quality of computer science education through our
                  education system.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="border border-gray-200 p-6 rounded-md">
                <img
                  src={Icon6}
                  alt="Icon6"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Reduce overhead expenses
                </h3>
                <p className="text-gray-600">
                  Reduce costs related to physical materials, and unnecessary
                  personnel.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="border border-gray-200 p-6 rounded-md">
                <img
                  src={Icon7}
                  alt="Icon7"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Enhance student engagement
                </h3>
                <p className="text-gray-600">
                  Story-based teaching makes learning more enjoyable and
                  effective.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="border border-gray-200 p-6 rounded-md">
                <img
                  src={Icon2}
                  alt="Icon2"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Reduce mentor turnover rates
                </h3>
                <p className="text-gray-600">
                  Happy mentors result in lower turnover and less need for
                  hiring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-black my-16"></hr>
    </div>
  );
}

export default Bars;
