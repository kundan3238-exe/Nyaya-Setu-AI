import { useState } from "react";
import { Scale, Shield, CheckCircle, UserPlus, Mail, Lock, User, Gavel, FileText, BookOpen, Briefcase } from "lucide-react";

export default function Signup({ onSignupSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        alert("✅ Signup successful! Please continue to portal.");
        onSignupSuccess();
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      alert("⚠️ Server error. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-white via-blue-50 to-white flex items-center justify-center p-6 overflow-hidden relative">
      {/* Animated blue gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Floating legal icons with random smooth movements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { Icon: Scale, size: 12, left: 10, top: 15, duration: 20, delay: 0 },
          { Icon: Gavel, size: 10, left: 25, top: 25, duration: 25, delay: 2 },
          { Icon: FileText, size: 14, left: 70, top: 20, duration: 22, delay: 4 },
          { Icon: BookOpen, size: 11, left: 50, top: 35, duration: 28, delay: 1 },
          { Icon: Briefcase, size: 13, left: 15, top: 55, duration: 24, delay: 3 },
          { Icon: Shield, size: 10, left: 80, top: 45, duration: 26, delay: 5 },
          { Icon: Scale, size: 9, left: 40, top: 65, duration: 23, delay: 6 },
          { Icon: Gavel, size: 12, left: 60, top: 70, duration: 27, delay: 2 },
          { Icon: FileText, size: 8, left: 85, top: 80, duration: 21, delay: 4 },
          { Icon: BookOpen, size: 13, left: 20, top: 75, duration: 25, delay: 1 },
          { Icon: Briefcase, size: 11, left: 90, top: 15, duration: 29, delay: 3 },
          { Icon: Shield, size: 14, left: 5, top: 40, duration: 22, delay: 0 },
        ].map(({ Icon, size, left, top, duration, delay }, idx) => (
          <div
            key={idx}
            className="absolute"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animation: `float-random-${idx % 3} ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
            }}
          >
            <Icon 
              className={`text-blue-${[300, 400, 500][idx % 3]} opacity-30`} 
              style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
            />
          </div>
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float-random-0 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -40px) rotate(5deg); }
          50% { transform: translate(-20px, -60px) rotate(-5deg); }
          75% { transform: translate(40px, -30px) rotate(3deg); }
        }
        @keyframes float-random-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-35px, 45px) rotate(-7deg); }
          50% { transform: translate(25px, 50px) rotate(7deg); }
          75% { transform: translate(-30px, 25px) rotate(-4deg); }
        }
        @keyframes float-random-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(45px, 35px) rotate(6deg); }
          50% { transform: translate(-40px, -25px) rotate(-6deg); }
          75% { transform: translate(20px, 40px) rotate(4deg); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      <div className="relative w-full max-w-md z-10">
        {/* Logo/Header Section */}
        <div className="text-center mb-5">
          <div className="relative inline-block mb-2">
            <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-40 animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-xl transform hover:scale-105 transition-transform">
              <Scale className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-1">NyayaSetu-AI</h1>
        </div>

        {/* Main Signup Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden backdrop-blur-sm">
          {/* Security Badge */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2.5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
            <div className="flex items-center justify-center gap-2 text-white relative z-10">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-medium">Secure Registration</span>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-5">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Create Account</h2>

            {/* Name Input */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-3 py-2 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-blue-50 hover:bg-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="your.email@lawfirm.com"
                  className="w-full pl-10 pr-3 py-2 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-blue-50 hover:bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-3 py-2 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-blue-50 hover:bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">
                At least 8 characters with letters and numbers
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="bg-blue-50 px-5 py-3 border-t border-blue-200">
            <p className="text-xs text-slate-600 text-center">
              Already have an account?{" "}
              <a href="/" className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}