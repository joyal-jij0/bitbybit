"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// Project status types
type ProjectStatus = "in_progress" | "completed" | "paused" | "cancelled";
// Milestone status types
type MilestoneStatus =
  | "pending"
  | "in_progress"
  | "submitted"
  | "revision_requested"
  | "approved"
  | "paid";

interface Milestone {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  amount: string;
  status: MilestoneStatus;
  submissionUrl?: string;
  submissionNote?: string;
  clientFeedback?: string;
  hasDispute?: boolean;
  disputeReason?: string;
  disputeDate?: string;
  disputeInitiator?: "freelancer" | "client";
}

interface ProjectDetails {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  budget: string;
  milestones: Milestone[];
  clientName: string;
  freelancerName: string;
}

export default function ProjectDetailsPage() {
  const params = useParams();
  const [userType, setUserType] = useState<"freelancer" | "client">("client");
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [submissionNote, setSubmissionNote] = useState("");
  const [feedbackNote, setFeedbackNote] = useState("");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  const [disputeMilestoneId, setDisputeMilestoneId] = useState<number | null>(
    null
  );

  // Toggle user type for demo purposes
  const toggleUserType = () => {
    setUserType((prev) => (prev === "client" ? "freelancer" : "client"));
  };

  // Dummy project data - in a real app, this would be fetched based on the ID
  const dummyProject: ProjectDetails = {
    id: params.id as string,
    title: "E-commerce Website Redesign",
    description:
      "Complete redesign of the e-commerce website with modern UI, improved user experience, and optimized checkout process. The project includes responsive design, product catalog, shopping cart, and payment integration.",
    status: "in_progress",
    startDate: "March 1, 2025",
    endDate: "May 15, 2025",
    budget: "$4,000",
    clientName: "BrandTech Inc.",
    freelancerName: "Alex Morgan",
    milestones: [
      {
        id: 1,
        title: "Initial Design & Wireframes",
        description:
          "Create wireframes and design mockups for the main pages of the website including homepage, product listing, product details, cart, and checkout.",
        dueDate: "March 15, 2025",
        amount: "$1,000",
        status: "approved",
      },
      {
        id: 2,
        title: "Frontend Development",
        description:
          "Implement the approved designs as responsive frontend components using React and Next.js. Ensure cross-browser compatibility and mobile responsiveness.",
        dueDate: "April 10, 2025",
        amount: "$1,500",
        status: "in_progress",
      },
      {
        id: 3,
        title: "Backend Integration",
        description:
          "Connect the frontend to the backend API and integrate payment systems. Implement user authentication and product management features.",
        dueDate: "April 30, 2025",
        amount: "$1,000",
        status: "pending",
      },
      {
        id: 4,
        title: "Testing & Deployment",
        description:
          "Conduct thorough testing, fix bugs, and deploy the website to production. Provide documentation and training for content management.",
        dueDate: "May 15, 2025",
        amount: "$500",
        status: "pending",
      },
    ],
  };

  // Simulate an API call to fetch project data
  useEffect(() => {
    setTimeout(() => {
      setProject(dummyProject);
      setLoading(false);
    }, 800);
  }, []);

  // Calculate project progress
  const calculateProgress = () => {
    if (!project) return 0;

    const completedMilestones = project.milestones.filter((m) =>
      ["approved", "paid"].includes(m.status)
    ).length;

    return Math.round((completedMilestones / project.milestones.length) * 100);
  };

  // Handle milestone submission by freelancer
  const handleSubmitMilestone = (milestoneId: number) => {
    setActiveMilestone(milestoneId);
    setSubmissionUrl("");
    setSubmissionNote("");
    setShowSubmitModal(true);
  };

  // Submit milestone work
  const submitMilestoneWork = () => {
    if (!project) return;

    // Update the milestone status
    const updatedMilestones = project.milestones.map((milestone) =>
      milestone.id === activeMilestone
        ? {
            ...milestone,
            status: "submitted" as MilestoneStatus,
            submissionUrl,
            submissionNote,
          }
        : milestone
    );

    setProject({ ...project, milestones: updatedMilestones });
    setShowSubmitModal(false);

    // In a real app, you would send this data to your API
    console.log("Milestone submitted:", {
      milestoneId: activeMilestone,
      submissionUrl,
      submissionNote,
    });
  };

  // Handle client actions on milestone
  const handleMilestoneAction = (
    milestoneId: number,
    action: "approve" | "request_revision" | "pay"
  ) => {
    if (!project) return;

    if (action === "request_revision") {
      setActiveMilestone(milestoneId);
      setFeedbackNote("");
      setShowFeedbackModal(true);
      return;
    }

    // Update the milestone status
    const updatedMilestones = project.milestones.map((milestone) =>
      milestone.id === milestoneId
        ? {
            ...milestone,
            status:
              action === "approve"
                ? ("approved" as MilestoneStatus)
                : ("paid" as MilestoneStatus),
          }
        : milestone
    );

    setProject({ ...project, milestones: updatedMilestones });

    // In a real app, you would send this data to your API
    console.log("Milestone action:", {
      milestoneId,
      action,
    });
  };

  // Submit revision request
  const submitRevisionRequest = () => {
    if (!project) return;

    // Update the milestone status
    const updatedMilestones = project.milestones.map((milestone) =>
      milestone.id === activeMilestone
        ? {
            ...milestone,
            status: "revision_requested" as MilestoneStatus,
            clientFeedback: feedbackNote,
          }
        : milestone
    );

    setProject({ ...project, milestones: updatedMilestones });
    setShowFeedbackModal(false);
  };

  // Add this function with your other handler functions
  const initiateDispute = (milestoneId: number) => {
    setDisputeMilestoneId(milestoneId);
    setDisputeReason("");
    setShowDisputeModal(true);
  };

  // And add this function to submit the dispute
  const submitDispute = () => {
    if (!project) return;

    // Update the milestone status to indicate there's a dispute
    const updatedMilestones = project.milestones.map((milestone) =>
      milestone.id === disputeMilestoneId
        ? {
            ...milestone,
            hasDispute: true,
            disputeReason,
            disputeDate: new Date().toISOString(),
            disputeInitiator: userType,
          }
        : milestone
    );

    setProject({ ...project, milestones: updatedMilestones });
    setShowDisputeModal(false);

    // In a real app, you would send this data to your API
    console.log("Dispute filed:", {
      milestoneId: disputeMilestoneId,
      reason: disputeReason,
      by: userType,
    });
  };

  // Get status badge
  const getStatusBadge = (status: MilestoneStatus) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
            Not Started
          </span>
        );
      case "in_progress":
        return (
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
            In Progress
          </span>
        );
      case "submitted":
        return (
          <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs rounded-full">
            Waiting Review
          </span>
        );
      case "revision_requested":
        return (
          <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-xs rounded-full">
            Needs Revision
          </span>
        );
      case "approved":
        return (
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
            Approved
          </span>
        );
      case "paid":
        return (
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs rounded-full">
            Paid
          </span>
        );
    }
  };

  // Get project status badge
  const getProjectStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case "in_progress":
        return (
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm rounded-full">
            In Progress
          </span>
        );
      case "completed":
        return (
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full">
            Completed
          </span>
        );
      case "paused":
        return (
          <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-sm rounded-full">
            Paused
          </span>
        );
      case "cancelled":
        return (
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-sm rounded-full">
            Cancelled
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading project details...
          </p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
        <div className="text-center">
          <div className="text-2xl font-bold dark:text-white mb-4">
            Project Not Found
          </div>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            The project you're looking for doesn't exist or you don't have
            access.
          </p>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Return to Dashboard
          </Link>
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
          <div className="flex items-center space-x-4">
            {/* Toggle for demo purposes only */}
            <div className="hidden md:flex items-center text-sm text-gray-500 dark:text-gray-400">
              Viewing as:
              <button
                onClick={toggleUserType}
                className="ml-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900"
              >
                {userType === "client" ? "Client" : "Freelancer"}
              </button>
            </div>
            <Link
              href="/dashboard"
              className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Project Header */}
        <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-700/20 rounded-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold dark:text-white">
                {project.title}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                {getProjectStatusBadge(project.status)}
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Started: {project.startDate}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Due: {project.endDate}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {project.budget}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total Budget
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg mb-6">
            <h2 className="text-lg font-medium mb-2 dark:text-white">
              Project Description
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center">
              <div className="mr-6">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Client
                </div>
                <div className="flex items-center mt-1">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold mr-2">
                    C
                  </div>
                  <span className="font-medium dark:text-white">
                    {project.clientName}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Freelancer
                </div>
                <div className="flex items-center mt-1">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold mr-2">
                    F
                  </div>
                  <span className="font-medium dark:text-white">
                    {project.freelancerName}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0 w-full md:w-64">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-300">
                  Project Progress
                </span>
                <span className="font-medium dark:text-white">
                  {calculateProgress()}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones Section */}
        <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-700/20 rounded-lg p-8">
          <h2 className="text-xl font-bold dark:text-white mb-6">
            Milestones & Deliverables
          </h2>

          <div className="space-y-6">
            {project.milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className={`border ${
                  milestone.status === "in_progress"
                    ? "border-blue-300 dark:border-blue-800"
                    : "border-gray-200 dark:border-gray-700"
                } rounded-lg p-6`}
              >
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm font-bold mr-3">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-medium dark:text-white">
                        {milestone.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {milestone.description}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right flex flex-col items-end">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {milestone.amount}
                    </div>
                    <div className="mt-2">
                      {getStatusBadge(milestone.status)}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Due: {milestone.dueDate}
                  </div>

                  {/* Freelancer actions */}
                  {userType === "freelancer" && (
                    <div className="mt-3 sm:mt-0 space-x-2">
                      {milestone.status === "pending" && (
                        <button
                          onClick={() => {
                            const updatedMilestones = project.milestones.map(
                              (m) =>
                                m.id === milestone.id
                                  ? {
                                      ...m,
                                      status: "in_progress" as MilestoneStatus,
                                    }
                                  : m
                            );
                            setProject({
                              ...project,
                              milestones: updatedMilestones,
                            });
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm"
                        >
                          Start Work
                        </button>
                      )}

                      {milestone.status === "in_progress" && (
                        <button
                          onClick={() => handleSubmitMilestone(milestone.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm"
                        >
                          Submit for Review
                        </button>
                      )}

                      {milestone.status === "revision_requested" && (
                        <>
                          <div className="mb-3 p-3 bg-orange-50 dark:bg-orange-900/10 rounded-lg text-sm text-orange-800 dark:text-orange-300">
                            <strong>Revision requested:</strong>{" "}
                            {milestone.clientFeedback}
                          </div>
                          <button
                            onClick={() => handleSubmitMilestone(milestone.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm"
                          >
                            Submit Revised Work
                          </button>
                        </>
                      )}

                      {milestone.status === "submitted" && (
                        <span className="text-sm text-blue-600 dark:text-blue-400">
                          Awaiting client review
                        </span>
                      )}

                      {milestone.status === "approved" && (
                        <>
                          <span className="text-sm text-green-600 dark:text-green-400 mr-2">
                            Work approved, awaiting payment
                          </span>
                          {!milestone.hasDispute && (
                            <button
                              onClick={() => initiateDispute(milestone.id)}
                              className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors text-sm"
                            >
                              Payment Overdue
                            </button>
                          )}
                        </>
                      )}

                      {milestone.status === "paid" && (
                        <span className="text-sm text-purple-600 dark:text-purple-400">
                          Milestone completed and paid
                        </span>
                      )}

                      {milestone.hasDispute && (
                        <span className="text-sm bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 px-3 py-1 rounded-full">
                          Dispute Filed
                        </span>
                      )}
                    </div>
                  )}

                  {/* Client actions */}
                  {userType === "client" && (
                    <div className="mt-3 sm:mt-0 space-x-2">
                      {milestone.status === "submitted" && (
                        <>
                          <button
                            onClick={() =>
                              handleMilestoneAction(milestone.id, "approve")
                            }
                            className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleMilestoneAction(
                                milestone.id,
                                "request_revision"
                              )
                            }
                            className="px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors text-sm"
                          >
                            Request Revision
                          </button>
                          {!milestone.hasDispute && (
                            <button
                              onClick={() => initiateDispute(milestone.id)}
                              className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors text-sm"
                            >
                              Quality Issue
                            </button>
                          )}
                        </>
                      )}

                      {milestone.status === "approved" && (
                        <button
                          onClick={() =>
                            handleMilestoneAction(milestone.id, "pay")
                          }
                          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm"
                        >
                          Release Payment
                        </button>
                      )}

                      {milestone.status === "paid" && (
                        <span className="text-sm text-purple-600 dark:text-purple-400">
                          Payment completed
                        </span>
                      )}

                      {["pending", "in_progress"].includes(
                        milestone.status
                      ) && (
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {milestone.status === "pending"
                            ? "Not started yet"
                            : "Work in progress"}
                        </span>
                      )}

                      {milestone.status === "revision_requested" && (
                        <span className="text-sm text-orange-600 dark:text-orange-400">
                          Waiting for revised submission
                        </span>
                      )}

                      {milestone.hasDispute && (
                        <span className="text-sm bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 px-3 py-1 rounded-full">
                          Dispute Filed
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Show submission details */}
                {milestone.status !== "pending" && milestone.submissionUrl && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <h4 className="text-sm font-medium mb-2 dark:text-white">
                      Submission Details
                    </h4>
                    <div className="text-sm">
                      <p className="mb-2">
                        <span className="font-medium dark:text-gray-300">
                          Work URL:
                        </span>{" "}
                        <a
                          href={milestone.submissionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {milestone.submissionUrl}
                        </a>
                      </p>
                      {milestone.submissionNote && (
                        <p className="dark:text-gray-300">
                          <span className="font-medium">Note:</span>{" "}
                          {milestone.submissionNote}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Communication Section - Placeholder */}
        <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-700/20 rounded-lg p-8 mt-6">
          <h2 className="text-xl font-bold dark:text-white mb-6">
            Project Communication
          </h2>
          <div className="text-center py-8">
            <div className="h-12 w-12 mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2 dark:text-white">
              Project Messages
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Stay in touch with your{" "}
              {userType === "client" ? "freelancer" : "client"} through project
              messages.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm">
              Open Message Center
            </button>
          </div>
        </div>
      </main>

      {/* Milestone Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold dark:text-white">
                Submit Milestone Work
              </h3>
              <button
                onClick={() => setShowSubmitModal(false)}
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

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="submissionUrl"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Submission URL
                </label>
                <input
                  type="text"
                  id="submissionUrl"
                  value={submissionUrl}
                  onChange={(e) => setSubmissionUrl(e.target.value)}
                  placeholder="https://your-project-url.com"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Link to your work (GitHub, Figma, Google Drive, etc.)
                </p>
              </div>

              <div>
                <label
                  htmlFor="submissionNote"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Submission Note
                </label>
                <textarea
                  id="submissionNote"
                  value={submissionNote}
                  onChange={(e) => setSubmissionNote(e.target.value)}
                  rows={4}
                  placeholder="Provide any additional information about your work..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={submitMilestoneWork}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={!submissionUrl.trim()}
              >
                Submit Work
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold dark:text-white">
                Request Revision
              </h3>
              <button
                onClick={() => setShowFeedbackModal(false)}
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

            <div>
              <label
                htmlFor="feedbackNote"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Feedback and Requested Changes
              </label>
              <textarea
                id="feedbackNote"
                value={feedbackNote}
                onChange={(e) => setFeedbackNote(e.target.value)}
                rows={5}
                placeholder="Describe what needs to be changed or improved..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={submitRevisionRequest}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                disabled={!feedbackNote.trim()}
              >
                Request Revision
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dispute Modal */}
      {showDisputeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold dark:text-white">
                {userType === "freelancer"
                  ? "Report Payment Issue"
                  : "Report Quality Issue"}
              </h3>
              <button
                onClick={() => setShowDisputeModal(false)}
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

            <div>
              <label
                htmlFor="disputeReason"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {userType === "freelancer"
                  ? "Explain why the payment is overdue and provide relevant details"
                  : "Describe the quality issues with the delivered work"}
              </label>
              <textarea
                id="disputeReason"
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                rows={5}
                placeholder={
                  userType === "freelancer"
                    ? "e.g., Payment was due 7 days ago as per our agreement..."
                    : "e.g., The delivered work doesn't meet the requirements because..."
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Disputes are reviewed by our support team. Please provide clear
                details to help resolve this issue faster.
              </p>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDisputeModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={submitDispute}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                disabled={!disputeReason.trim()}
              >
                Submit Dispute
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
