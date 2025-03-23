"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

// Freelancer profile data (in a real app, this would come from an API)
const freelancerProfiles = [
  {
    id: 1,
    name: "Alex Morgan",
    title: "Full Stack Developer",
    skills: ["React", "Node.js", "TypeScript", "MongoDB"],
    hourlyRate: "$55/hr",
    rating: 4,
    reviews: 24,
  },
  {
    id: 2,
    name: "Jamie Smith",
    title: "UX/UI Designer",
    skills: ["Figma", "UI Design", "User Research", "Wireframing"],
    hourlyRate: "$50/hr",
    rating: 4,
    reviews: 17,
  },
  {
    id: 3,
    name: "Taylor Wong",
    title: "Mobile Developer",
    skills: ["React Native", "iOS", "Android", "Flutter"],
    hourlyRate: "$60/hr",
    rating: 4,
    reviews: 31,
  },
];

export default function NewProjectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const freelancerId = searchParams.get("freelancerId");

  const [freelancer, setFreelancer] = useState<
    (typeof freelancerProfiles)[0] | null
  >(null);
  const [milestones, setMilestones] = useState([
    { title: "", description: "", dueDate: "", amount: "" },
  ]);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  // New states for AI generation
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  useEffect(() => {
    if (freelancerId) {
      // Find the freelancer data based on the ID
      const selectedFreelancer = freelancerProfiles.find(
        (f) => f.id === parseInt(freelancerId)
      );
      if (selectedFreelancer) {
        setFreelancer(selectedFreelancer);
      } else {
        // Handle case where freelancer is not found
        router.push("/dashboard");
      }
    } else {
      // If no freelancer ID is provided, redirect back
      router.push("/dashboard");
    }
  }, [freelancerId, router]);

  const addMilestone = () => {
    setMilestones([
      ...milestones,
      { title: "", description: "", dueDate: "", amount: "" },
    ]);
  };

  const removeMilestone = (index: number) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((_, i) => i !== index));
    }
  };

  const updateMilestone = (index: number, field: string, value: string) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = {
      ...updatedMilestones[index],
      [field]: value,
    };
    setMilestones(updatedMilestones);

    // Update total amount based on milestone amounts
    if (field === "amount") {
      const total = updatedMilestones.reduce((sum, milestone) => {
        return sum + (parseFloat(milestone.amount) || 0);
      }, 0);
      setTotalAmount(total.toFixed(2));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would send this data to your API
    alert(
      `Proposal for project "${projectTitle}" sent to ${freelancer?.name}!`
    );

    // Navigate back to the dashboard
    router.push("/dashboard");
  };

  // New function to handle AI generation
  const handleGenerateWithAI = async () => {
    if (!aiPrompt.trim()) {
      setGenerationError("Please enter a prompt to generate a proposal");
      return;
    }

    try {
      setIsGenerating(true);
      setGenerationError(null);

      const response = await api.post("/ai/generate_project_proposal", {
        message: aiPrompt,
      });

      console.log("AI Generation response:", response.data);

      // Update the form with AI-generated content
      if (response.data?.data) {
        const generatedData = response.data.data;

        setProjectTitle(generatedData.projectTitle || projectTitle);
        setProjectDescription(generatedData.projectDescription || projectDescription);

        if (generatedData.milestones && generatedData.milestones.length > 0) {
          setMilestones(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            generatedData.milestones.map((m: any) => ({
              title: m.title || "",
              description: m.description || "",
              dueDate: m.dueDate || "",
              amount: m.amount || "",
            }))
          );

          // Recalculate total after setting milestones
          const total = generatedData.milestones.reduce(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (sum: number, milestone: any) => {
              return sum + (parseFloat(milestone.amount) || 0);
            },
            0
          );
          setTotalAmount(total.toFixed(2));
        }

        // Close the modal after successful generation
        setShowAIModal(false);
      }
    } catch (error) {
      console.error("Error generating AI proposal:", error);
      setGenerationError("Failed to generate proposal. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!freelancer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold dark:text-white">
              bit<span className="text-blue-600">by</span>bit
            </Link>
          </div>
          <Link
            href="/dashboard"
            className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-700/20 rounded-lg p-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold dark:text-white">
              Create Project Proposal
            </h1>
          </div>

          {/* Freelancer Card */}
          <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-8">
            <h2 className="text-lg font-medium mb-4 dark:text-white">
              Freelancer Details
            </h2>
            <div className="flex items-start">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 text-lg font-bold mr-4">
                F{freelancer.id}
              </div>
              <div>
                <h3 className="text-xl font-semibold dark:text-white">
                  {freelancer.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium">
                  {freelancer.title}
                </p>
                <div className="mt-2 flex items-center">
                  <div className="flex text-yellow-400">
                    {"★".repeat(freelancer.rating)}
                    {"☆".repeat(5 - freelancer.rating)}
                  </div>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    ({freelancer.reviews} reviews)
                  </span>
                </div>
                <div className="mt-2 text-gray-600 dark:text-gray-300">
                  Rate: {freelancer.hourlyRate}
                </div>
              </div>
            </div>
          </div>

          {/* Project Proposal Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="projectTitle"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Project Title
                </label>
                <input
                  type="text"
                  id="projectTitle"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. E-commerce Website Redesign"
                />
              </div>

              <div>
                <label
                  htmlFor="projectDescription"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Project Description
                </label>
                <textarea
                  id="projectDescription"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Describe your project requirements, goals, and expectations..."
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium dark:text-white">
                    Milestones
                  </h2>
                  <button
                    type="button"
                    onClick={addMilestone}
                    className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm"
                  >
                    Add Milestone
                  </button>
                </div>

                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-md font-medium dark:text-white">
                          Milestone {index + 1}
                        </h3>
                        {milestones.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMilestone(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            value={milestone.title}
                            onChange={(e) =>
                              updateMilestone(index, "title", e.target.value)
                            }
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="e.g. Design Mockups"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Due Date
                          </label>
                          <input
                            type="date"
                            value={milestone.dueDate}
                            onChange={(e) =>
                              updateMilestone(index, "dueDate", e.target.value)
                            }
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description
                          </label>
                          <textarea
                            value={milestone.description}
                            onChange={(e) =>
                              updateMilestone(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            required
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Describe what should be delivered in this milestone..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Amount ($)
                          </label>
                          <input
                            type="number"
                            value={milestone.amount}
                            onChange={(e) =>
                              updateMilestone(index, "amount", e.target.value)
                            }
                            required
                            min="0"
                            step="0.01"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="e.g. 500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium dark:text-white">
                    Project Summary
                  </h3>
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    Total: ${totalAmount || "0.00"}
                  </div>
                </div>

                {/* AI Generation Button */}
                <div className="mb-6">
                  <button
                    type="button"
                    onClick={() => setShowAIModal(true)}
                    className="w-full flex items-center justify-center px-6 py-3 bg-purple-600 dark:bg-purple-700 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Generate with AI
                  </button>
                  <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
                    Let AI help you create a professional project proposal
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-4">
                  <Link
                    href="/dashboard"
                    className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Send Proposal
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* AI Generation Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold dark:text-white">
                Generate Project Proposal with AI
              </h3>
              <button
                onClick={() => setShowAIModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Describe your project idea, and AI will generate a professional
                proposal with milestones.
              </p>

              <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg mb-4">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    For best results, include project type, important features,
                    and timeline requirements.
                  </p>
                </div>
              </div>

              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                placeholder="E.g. I need a modern e-commerce website with product catalog, shopping cart, and payment integration. The design should be minimalist with a focus on user experience."
              />

              {generationError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {generationError}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleGenerateWithAI}
                disabled={isGenerating}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-70"
              >
                {isGenerating ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Generate Proposal
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
