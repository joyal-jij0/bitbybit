"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header/Nav */}
      <header className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold dark:text-white">
              bit<span className="text-blue-600">by</span>bit
            </Link>
          </div>
          <div className="flex items-center space-x-4">
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            Welcome to your dashboard!
          </h2>

          <div className="mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <p className="text-blue-800 dark:text-blue-200">
                This is a dummy dashboard. In a real application, you would see
                your projects, tasks, or available jobs here.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 dark:bg-gray-800/50">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">
                Jobs for You
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Personalized job recommendations would appear here.
              </p>
              <div className="mt-4 space-y-3">
                <div className="border border-gray-100 dark:border-gray-700 p-3 rounded-md dark:bg-gray-800">
                  <h4 className="font-medium dark:text-white">
                    Senior React Developer
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    $50-70/hr • Remote
                  </p>
                </div>
                <div className="border border-gray-100 dark:border-gray-700 p-3 rounded-md dark:bg-gray-800">
                  <h4 className="font-medium dark:text-white">
                    UI/UX Designer
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    $45-60/hr • Remote
                  </p>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 dark:bg-gray-800/50">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">
                Active Projects
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your current projects and tasks would be listed here.
              </p>
              <div className="mt-4 space-y-3">
                <div className="border border-gray-100 dark:border-gray-700 p-3 rounded-md dark:bg-gray-800">
                  <h4 className="font-medium dark:text-white">
                    E-commerce Website Redesign
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    In Progress • Due in 14 days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
