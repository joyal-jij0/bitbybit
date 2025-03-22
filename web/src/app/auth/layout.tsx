import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center mb-8">
            <h1 className="text-2xl font-bold">
              bit<span className="text-blue-600">by</span>bit
            </h1>
          </Link>
          {children}
        </div>
      </div>

      {/* Right side - Image/Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Freelance work, reimagined
            </h2>
            <p className="text-blue-100 text-lg">
              Join thousands of freelancers and clients collaborating securely
              with milestone-based payments.
            </p>
          </div>
          <div className="relative w-4/5 h-96">
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-64 h-64"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="#ffffff"
                  fillOpacity="0.2"
                />
                <path
                  d="M65,40 L45,60 M35,50 L45,60"
                  stroke="#ffffff"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
