import Link from "next/link"
import { ShieldCheck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
// import FeatureCard from "@/components/FeatureCard";
export default function Home() {
  return (
   <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <ShieldCheck className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl sm:text-2xl font-bold text-green-600">ScamHunt</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6">
            Protect Yourself from Online Scams
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-10 max-w-3xl mx-auto">
            ScamHunt help keep the internet safe report scams today
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="text-green-600 hover:bg-green-50 border-green-600 text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3">
              Learn More
            </Button>
          </div>
        </div>
{/* 
        <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <FeatureCard
            title="Real-time Protection"
            description="Our AI constantly monitors for potential threats, providing instant alerts and protection."
          />
          <FeatureCard
            title="Easy to Use"
            description="Simple interface designed for users of all tech levels. Stay safe without the complexity."
          />
          <FeatureCard
            title="Comprehensive Coverage"
            description="Protects against a wide range of scams including phishing, identity theft, and financial fraud."
          />
        </div> */}
      </main>

      <footer className="border-t border-gray-200 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <ShieldCheck className="h-6 w-6 text-green-600" />
              <span className="ml-2 text-lg sm:text-xl font-bold text-green-600">ScamGuard</span>
            </div>
            <div className="text-gray-600 text-sm text-center sm:text-left">
              © 2024 ScamHunt. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
