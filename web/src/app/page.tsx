import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black font-[family-name:var(--font-geist-sans)]">
      {/* Navigation */}
      <nav className="flex justify-between items-center py-6 px-8 sm:px-16">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">
            bit<span className="text-blue-600">by</span>bit
          </h1>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="hover:text-blue-600 transition-colors">
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-blue-600 transition-colors"
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="hover:text-blue-600 transition-colors"
          >
            Testimonials
          </a>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/auth/login"
            className="px-4 py-2 rounded-full border border-gray-300 hover:border-blue-600 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-8 sm:px-16 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Freelancing that works{" "}
            <span className="text-blue-600">bit by bit</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            The most flexible and transparent freelance platform with
            milestone-based payments for secure collaboration.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              Find Freelancers
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-full hover:border-blue-600 transition-colors">
              Start Freelancing
            </button>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="flex items-center">
              <svg
                className="h-4 w-4 text-green-500 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              No hidden fees
            </span>
            <span className="flex items-center">
              <svg
                className="h-4 w-4 text-green-500 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Secure payments
            </span>
            <span className="flex items-center">
              <svg
                className="h-4 w-4 text-green-500 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              24/7 support
            </span>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <div className="relative w-full h-80">
            <Image
              src="/placeholder-hero.svg"
              alt="Freelancers collaborating"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Keywords Section */}
      <section className="bg-blue-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-center gap-8 sm:gap-16">
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold">Flexible</h3>
            <p className="text-blue-100">Work on your terms</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold">Transparent</h3>
            <p className="text-blue-100">Clear fees & processes</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold">Secure</h3>
            <p className="text-blue-100">Milestone-based payments</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold">Global</h3>
            <p className="text-blue-100">Talent without borders</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-8 sm:px-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose bitbybit?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Milestone Payments</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Break projects into milestones. Payment is released only when work
              meets your satisfaction.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Escrow</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Funds are held securely in escrow until you approve the work,
              protecting both parties.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Transparent Fees</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No hidden costs. Our fee structure is clear and competitive, so
              you always know what to expect.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-16 px-8 sm:px-16 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900 rounded-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          How Our Milestone System Works
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Create Project</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Define your project and break it down into clear milestones.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Fund Milestone</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Securely deposit funds for the current milestone in escrow.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Review Work</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Receive and review the completed milestone deliverables.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
              4
            </div>
            <h3 className="text-xl font-semibold mb-2">Release Payment</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Approve work and release payment to the freelancer.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
            Start Your First Project
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-8 sm:px-16 max-w-7xl mx-auto">
        <div className="bg-blue-600 text-white rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-4">
              Ready to work differently?
            </h2>
            <p className="text-blue-100 mb-6">
              Join thousands of freelancers and clients already working bit by
              bit. Flexible, transparent, and secure.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <Link
              href="/auth/signup"
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-colors"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-12 px-8 sm:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              bit<span className="text-blue-600">by</span>bit
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              The most flexible and transparent freelance platform with
              milestone-based payments.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Clients</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                <a href="#" className="hover:text-blue-600">
                  How to Hire
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Talent Marketplace
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Payment Protection
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Freelancers</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Find Work
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Growth Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Help & Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Community
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500">
          <p>© {new Date().getFullYear()} bitbybit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
