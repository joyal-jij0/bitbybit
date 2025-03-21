"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function ProposalReviewPage() {
  const router = useRouter();
  const params = useParams();
  const [activeTab, setActiveTab] = useState<"details" | "edit">("details");
  const [loading, setLoading] = useState(true);
  const [proposal, setProposal] = useState<any>(null);

  // Dummy proposal data - in a real app, this would be fetched based on the ID
  const dummyProposal = {
    id: params.id,
    clientName: "BrandTech Inc.",
    clientAvatar: "B",
    projectTitle: "E-commerce Website Redesign",
    description:
      "We need an experienced developer to redesign our e-commerce website. The current website is built on Shopify but we want a more custom solution with better performance and more flexible design options.",
    postedDate: "March 18, 2025",
    budget: "$4,000",
    timeline: "6 weeks",
    milestones: [
      {
        id: 1,
        title: "Initial Design & Wireframes",
        description:
          "Create wireframes and design mockups for the main pages of the website.",
        dueDate: "April 10, 2025",
        amount: "$1,000",
      },
      {
        id: 2,
        title: "Frontend Development",
        description:
          "Implement the approved designs as responsive frontend components.",
        dueDate: "April 24, 2025",
        amount: "$1,500",
      },
      {
        id: 3,
        title: "Backend Integration",
        description:
          "Connect the frontend to the backend API and integrate payment systems.",
        dueDate: "May 8, 2025",
        amount: "$1,500",
      },
    ],
    status: "pending",
  };

  // Simulate an API call to fetch proposal data
  useEffect(() => {
    setTimeout(() => {
      setProposal(dummyProposal);
      setLoading(false);
    }, 800);
  }, []);

  const handleAcceptProposal = () => {
    // In real app, call API to accept the proposal
    alert(
      "Proposal accepted! In a real app, this would update the proposal status."
    );
    router.push("/dashboard");
  };

  const handleRejectProposal = () => {
    // In real app, call API to reject the proposal
    alert(
      "Proposal rejected! In a real app, this would update the proposal status."
    );
    router.push("/dashboard");
  };

  const handleSendCounterOffer = () => {
    // In real app, submit updated proposal data to API
    alert(
      "Counter-offer sent! In a real app, this would submit your changes to the client."
    );
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading proposal details...
          </p>
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
        <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-700/20 rounded-lg overflow-hidden">
          {/* Proposal Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold dark:text-white">
                Project Proposal
              </h1>
              <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-sm rounded-full">
                Awaiting Your Response
              </span>
            </div>
            <div className="mt-4 flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 text-lg font-bold mr-3">
                {proposal.clientAvatar}
              </div>
              <div>
                <h2 className="font-medium dark:text-white">
                  {proposal.clientName}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sent on {proposal.postedDate}
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="px-6">
              <nav className="-mb-px flex space-x-6">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "details"
                      ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  Proposal Details
                </button>
                <button
                  onClick={() => setActiveTab("edit")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "edit"
                      ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  Edit & Counter-Offer
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "details" ? (
            <div className="p-6">
              {/* Project Overview */}
              <div className="mb-8">
                <h3 className="text-lg font-medium dark:text-white mb-3">
                  {proposal.projectTitle}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {proposal.description}
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">
                      Total Budget
                    </span>
                    <span className="text-lg font-semibold dark:text-white">
                      {proposal.budget}
                    </span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">
                      Project Timeline
                    </span>
                    <span className="text-lg font-semibold dark:text-white">
                      {proposal.timeline}
                    </span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">
                      Start Date
                    </span>
                    <span className="text-lg font-semibold dark:text-white">
                      Upon Acceptance
                    </span>
                  </div>
                </div>
              </div>

              {/* Milestones */}
              <div>
                <h3 className="text-lg font-medium dark:text-white mb-4">
                  Milestones & Payments
                </h3>
                <div className="space-y-4">
                  {proposal.milestones.map((milestone: any, index: number) => (
                    <div
                      key={milestone.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium dark:text-white flex items-center">
                          <span className="h-6 w-6 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full text-xs flex items-center justify-center mr-2">
                            {index + 1}
                          </span>
                          {milestone.title}
                        </h4>
                        <div className="text-blue-600 dark:text-blue-400 font-medium">
                          {milestone.amount}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                        {milestone.description}
                      </p>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Due date: {milestone.dueDate}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAcceptProposal}
                  className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors text-sm flex-1"
                >
                  Accept Proposal
                </button>
                <button
                  onClick={() => setActiveTab("edit")}
                  className="px-6 py-3 border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-sm flex-1"
                >
                  Counter Offer
                </button>
                <button
                  onClick={handleRejectProposal}
                  className="px-6 py-3 border border-red-500 text-red-500 dark:border-red-400 dark:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-sm flex-1"
                >
                  Decline
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6">
              {/* Counter-offer Form */}
              <div className="mb-8">
                <h3 className="text-lg font-medium dark:text-white mb-4">
                  Edit Counter-Offer
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  You can adjust the project details, timeline, and payment
                  terms below to create a counter-offer.
                </p>

                <div className="space-y-6">
                  {/* Project Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Project Title
                    </label>
                    <input
                      type="text"
                      defaultValue={proposal.projectTitle}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Project Description
                    </label>
                    <textarea
                      defaultValue={proposal.description}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  {/* Project Timeline */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Project Timeline
                    </label>
                    <input
                      type="text"
                      defaultValue={proposal.timeline}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  {/* Milestones */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Milestones & Payments
                    </label>

                    <div className="space-y-4">
                      {proposal.milestones.map(
                        (milestone: any, index: number) => (
                          <div
                            key={milestone.id}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                  Milestone Title
                                </label>
                                <input
                                  type="text"
                                  defaultValue={milestone.title}
                                  className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                  Due Date
                                </label>
                                <input
                                  type="date"
                                  defaultValue={milestone.dueDate.split(" ")[1]}
                                  className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                                />
                              </div>

                              <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                  Description
                                </label>
                                <textarea
                                  defaultValue={milestone.description}
                                  rows={2}
                                  className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                  Payment Amount
                                </label>
                                <input
                                  type="text"
                                  defaultValue={milestone.amount}
                                  className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Add Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message to Client
                    </label>
                    <textarea
                      placeholder="Explain the changes you've made and why you're proposing them..."
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <button
                  onClick={() => setActiveTab("details")}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendCounterOffer}
                  className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm"
                >
                  Send Counter-Offer
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
