"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api, { getUserId } from "@/lib/api";

export default function OnboardingPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<"freelancer" | "client" | null>(
    null
  );
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    headline: "",
    bio: "",
    location: "",
    portfolioUrl: "", // Added portfolio URL field
  });
  const [skills, setSkills] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills((prev) => [...prev, skill]);
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      // Prepare the data to send
      const profileData = {
        userId,
        headline: formData.headline,
        bio: formData.bio,
        location: formData.location,
        ...(userType === "freelancer" && {
          portfolioUrl: formData.portfolioUrl
            ? `https://${formData.portfolioUrl}`
            : "",
          skills: skills,
        }),
      };

      // Make API call to different endpoints based on user type
      const endpoint = userType === "freelancer" ? "/freelancers" : "/clients";
      const response = await api.post(endpoint, profileData);

      console.log(`${userType} profile created:`, response.data);

      // Redirect to the dashboard on success
      router.push("/dashboard");
    } catch (err) {
      console.error("Profile setup error:", err);
      setError("Failed to complete profile setup. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // User type selection step
  if (step === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-8 dark:text-white">
            Welcome to bitbybit!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
            Tell us how youll be using bitbybit today.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => {
                setUserType("client");
                setStep(2);
              }}
              className="w-full p-4 border-2 dark:border-gray-700 rounded-lg hover:border-blue-600 dark:hover:border-blue-500 flex items-center dark:bg-gray-800"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mr-4">
                <svg
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-medium dark:text-white">
                  I want to hire freelancers
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Post jobs and find talent
                </p>
              </div>
            </button>

            <button
              onClick={() => {
                setUserType("freelancer");
                setStep(2);
              }}
              className="w-full p-4 border-2 dark:border-gray-700 rounded-lg hover:border-blue-600 dark:hover:border-blue-500 flex items-center dark:bg-gray-800"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mr-4">
                <svg
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-medium dark:text-white">
                  I want to work as a freelancer
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Find projects and get hired
                </p>
              </div>
            </button>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 text-sm"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Profile setup step
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-8 dark:text-white">
          Set up your {userType === "freelancer" ? "freelancer" : "client"}{" "}
          profile
        </h1>

        {error && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="headline"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Professional Headline
            </label>
            <input
              type="text"
              id="headline"
              name="headline"
              value={formData.headline}
              onChange={handleInputChange}
              required
              placeholder={
                userType === "freelancer"
                  ? "e.g. Full Stack Developer"
                  : "e.g. Project Manager at ABC Company"
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              placeholder="City, Country"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {userType === "freelancer" && (
            <>
              {/* Portfolio URL input for freelancers */}
              <div>
                <label
                  htmlFor="portfolioUrl"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Portfolio URL
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    https://
                  </span>
                  <input
                    type="text"
                    id="portfolioUrl"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleInputChange}
                    placeholder="yourportfolio.com"
                    className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-r-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Share your portfolio to showcase your work to potential
                  clients
                </p>
              </div>

              {/* Skills section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Skills
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex">
                  <input
                    type="text"
                    id="skill"
                    placeholder="Add a skill (e.g. JavaScript)"
                    className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const target = e.target as HTMLInputElement;
                        handleAddSkill(target.value);
                        target.value = "";
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-r-md hover:bg-blue-700 dark:hover:bg-blue-600"
                    onClick={() => {
                      const input = document.getElementById(
                        "skill"
                      ) as HTMLInputElement;
                      handleAddSkill(input.value);
                      input.value = "";
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "Complete Setup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
