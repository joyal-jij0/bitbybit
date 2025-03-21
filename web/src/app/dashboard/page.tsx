"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"feed" | "projects">("feed");
  const [userType, setUserType] = useState<"freelancer" | "client">("client");

  // In a real app, you would fetch the user type from your auth system
  // For demo purposes, we'll toggle between them with a button
  const toggleUserType = () => {
    setUserType((prev) => (prev === "client" ? "freelancer" : "client"));
  };

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black font-[family-name:var(--font-geist-sans)]">
      {/* Header/Nav */}
      <header className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold dark:text-white">
              bit<span className="text-blue-600">by</span>bit
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center text-sm text-gray-500 dark:text-gray-400">
              Currently viewing as:
              <button
                onClick={toggleUserType}
                className="ml-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900"
              >
                {userType === "client" ? "Client" : "Freelancer"}
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
                U
              </div>
              <span className="text-sm font-medium dark:text-white">
                Demo User
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("feed")}
              className={`py-4 px-1 border-b-2 font-medium text-sm mr-8 ${
                activeTab === "feed"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              {userType === "client" ? "Find Freelancers" : "Find Jobs"}
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "projects"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              Active Projects
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {activeTab === "feed" ? (
          userType === "client" ? (
            // Client Feed - Find Freelancers
            <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-700/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">
                Find Talented Freelancers
              </h2>

              <div className="mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-200">
                    Browse and filter top freelancers based on skills, ratings,
                    and availability.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                  >
                    <div className="flex items-start">
                      <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 text-lg font-bold mr-4">
                        F{i}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold dark:text-white">
                          {["Alex Morgan", "Jamie Smith", "Taylor Wong"][i - 1]}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          {
                            [
                              "Full Stack Developer",
                              "UX/UI Designer",
                              "Mobile Developer",
                            ][i - 1]
                          }
                        </p>
                        <div className="mt-2 flex items-center">
                          <div className="flex text-yellow-400">
                            {"★".repeat(4)}
                            {"☆".repeat(1)}
                          </div>
                          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                            ({[24, 17, 31][i - 1]} reviews)
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {[
                            ["React", "Node.js", "TypeScript", "MongoDB"],
                            [
                              "Figma",
                              "UI Design",
                              "User Research",
                              "Wireframing",
                            ],
                            ["React Native", "iOS", "Android", "Flutter"],
                          ][i - 1].map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="ml-auto">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Freelancer Feed - Find Jobs
            <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-700/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">
                Available Jobs for You
              </h2>

              <div className="mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-200">
                    Jobs matching your skills and experience level.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                  >
                    <div className="flex justify-between">
                      <h3 className="text-xl font-semibold dark:text-white">
                        {
                          [
                            "Senior React Developer",
                            "UI/UX Designer for SaaS Platform",
                            "E-commerce App Developer",
                          ][i - 1]
                        }
                      </h3>
                      <div className="text-blue-600 dark:text-blue-400 font-medium">
                        {["$50-70/hr", "$45-60/hr", "Fixed $4,000"][i - 1]}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>Posted 3 days ago</span>
                      <span className="mx-2">•</span>
                      <span>
                        {
                          ["Remote", "Remote (US Only)", "Remote (Worldwide)"][
                            i - 1
                          ]
                        }
                      </span>
                      <span className="mx-2">•</span>
                      <span>
                        {["3-6 months", "1-3 months", "1-2 months"][i - 1]}
                      </span>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                      {
                        [
                          "Looking for an experienced React developer to help build a modern web application with TypeScript and Next.js...",
                          "We need a talented UI/UX designer to redesign our SaaS platform dashboard. Must have experience with...",
                          "Seeking a developer to build a cross-platform e-commerce app using React Native. The app should include...",
                        ][i - 1]
                      }
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {[
                        ["React", "TypeScript", "Next.js", "Redux"],
                        ["UI Design", "UX Research", "Figma", "Design Systems"],
                        [
                          "React Native",
                          "E-commerce",
                          "Payment Integration",
                          "Cross-platform",
                        ],
                      ][i - 1].map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm">
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ) : (
          // Active Projects View (Same for both user types)
          <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-700/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              Active Projects
            </h2>

            <div className="mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200">
                  {userType === "client"
                    ? "Projects you've created and currently have freelancers working on."
                    : "Projects you're currently working on for clients."}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold dark:text-white">
                      E-commerce Website Redesign
                    </h3>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Due in 14 days
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-sm rounded-full">
                    In Progress
                  </span>
                </div>

                <div className="mt-4">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      Milestone progress
                    </span>
                    <span className="font-medium dark:text-white">
                      2/4 complete
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <div className="flex items-center">
                    {userType === "client" ? (
                      <>
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold">
                          F1
                        </div>
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                          Freelancer: Alex Morgan
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold">
                          C1
                        </div>
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                          Client: BrandTech Inc.
                        </span>
                      </>
                    )}
                  </div>
                  <button className="px-4 py-2 border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-sm">
                    View Project
                  </button>
                </div>
              </div>

              {userType === "freelancer" && (
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold dark:text-white">
                        Mobile App Development
                      </h3>
                      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                          <svg
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Due in 30 days
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-sm rounded-full">
                      Milestone Review
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">
                        Milestone progress
                      </span>
                      <span className="font-medium dark:text-white">
                        1/3 complete
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: "33%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold">
                        C2
                      </div>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                        Client: MobiTech Solutions
                      </span>
                    </div>
                    <button className="px-4 py-2 border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-sm">
                      View Project
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
