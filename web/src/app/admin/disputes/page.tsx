"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type DisputeStatus = "open" | "in_review" | "resolved";

interface Dispute {
  id: string;
  projectId: string;
  projectTitle: string;
  milestoneId: number;
  milestoneTitle: string;
  reason: string;
  initiator: "client" | "freelancer";
  createdAt: string;
  status: DisputeStatus;
  resolutionNotes?: string;
}

export default function DisputesAdminPage() {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [activeTab, setActiveTab] = useState<DisputeStatus | "all">("all");

  // Simulate API call to fetch disputes
  useEffect(() => {
    setTimeout(() => {
      setDisputes([
        {
          id: "1",
          projectId: "123",
          projectTitle: "E-commerce Website Redesign",
          milestoneId: 2,
          milestoneTitle: "Frontend Development",
          reason: "Disagreement over design implementation quality",
          initiator: "client",
          createdAt: "2025-04-15",
          status: "open",
        },
        {
          id: "2",
          projectId: "456",
          projectTitle: "Mobile App Development",
          milestoneId: 1,
          milestoneTitle: "Initial Prototype",
          reason: "Payment dispute after milestone completion",
          initiator: "freelancer",
          createdAt: "2025-04-14",
          status: "in_review",
        },
      ]);
    }, 800);
  }, []);

  const handleResolveDispute = (disputeId: string, notes: string) => {
    setDisputes(prev =>
      prev.map(d =>
        d.id === disputeId
          ? { ...d, status: "resolved", resolutionNotes: notes }
          : d
      )
    );
    setSelectedDispute(null);
  };

  const filteredDisputes = activeTab === "all" 
    ? disputes 
    : disputes.filter(d => d.status === activeTab);

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
          {/* Tab Navigation */}
          <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex">
              {(["all", "open", "in_review", "resolved"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  {tab.replace("_", " ").toUpperCase()}
                </button>
              ))}
            </nav>
          </div>

          {/* Disputes List */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredDisputes.map(dispute => (
              <div key={dispute.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium dark:text-white">
                      {dispute.projectTitle}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      Milestone: {dispute.milestoneTitle}
                    </p>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="inline-block px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">
                        {dispute.status}
                      </span>
                      <span className="ml-3">
                        Initiated by {dispute.initiator} on {dispute.createdAt}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDispute(dispute)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm"
                  >
                    View Details
                  </button>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {dispute.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Resolution Modal */}
      {selectedDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-xl font-bold dark:text-white mb-4">
              Resolve Dispute
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium dark:text-gray-300 mb-1">
                  Resolution Notes
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  rows={4}
                  placeholder="Enter resolution details..."
                  defaultValue={selectedDispute.resolutionNotes || ""}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedDispute(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleResolveDispute(selectedDispute.id, "Resolution notes")}
                  className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                >
                  Mark as Resolved
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}