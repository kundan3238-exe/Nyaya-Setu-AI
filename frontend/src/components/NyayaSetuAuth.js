import React, { useState } from "react";

// NyayaSetu — Modern LegalTech "Friendly & Professional" Auth Page
// Single-file React component using Tailwind CSS. Tailwind must be configured in the project.

export default function NyayaSetuAuth() {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [name, setName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // simple email validation to avoid complex regex in this demo
  const isValidEmail = (e) => typeof e === 'string' && e.includes('@') && e.includes('.');
  const passwordStrength = (pw) => {
    if (!pw) return { score: 0, label: "", pct: 0 };
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    const labels = ["Very weak", "Weak", "Fair", "Strong", "Excellent"];
    return { score, label: labels[score], pct: (score / 4) * 100 };
  };

  // demo API stub — replace with your backend implementation
  async function callApi(path, body) {
    await new Promise((r) => setTimeout(r, 500));
    if (path === "/login") {
      if (body.email === "demo@nyayasetu.test" && body.password === "Demo@1234") {
        return { token: "demo-token", user: { name: "Demo User", email: body.email } };
      }
      const err = new Error("Invalid credentials. Use demo@nyayasetu.test / Demo@1234 for demo");
      err.status = 401;
      throw err;
    }
    if (path === "/signup") {
      return { token: "demo-token", user: { name: body.name, email: body.email } };
    }
    throw new Error("Unknown API path");
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!isValidEmail(loginEmail)) return setError("Please enter a valid email.");
    if (!loginPassword || loginPassword.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true);
    try {
      const res = await callApi("/login", { email: loginEmail, password: loginPassword });
      localStorage.setItem("nyayasetu_token", res.token);
      setSuccess(`Welcome back, ${res.user.name}`);
      setLoginPassword("");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name.trim()) return setError("Please enter your full name.");
    if (!isValidEmail(signupEmail)) return setError("Please enter a valid email.");
    if (!signupPassword || signupPassword.length < 8) return setError("Password must be at least 8 characters.");
    setLoading(true);
    try {
      const res = await callApi("/signup", { name, email: signupEmail, password: signupPassword });
      localStorage.setItem("nyayasetu_token", res.token);
      setSuccess("Account created. Check your email for verification (demo).");
      setSignupPassword("");
      setMode("login");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  const SmallBadge = ({ children }) => (
    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">{children}</span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Illustration / friendly hero (left) */}
        <div className="hidden md:flex flex-col justify-center gap-6 p-10 bg-gradient-to-br from-indigo-800 to-slate-900 text-white">
          <div>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-lg">
                {/* friendly shield + scales icon */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l7 3v5c0 5-3.6 9.7-7 10-3.4-.3-7-5-7-10V5l7-3z" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 13l3-4 3 4" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-semibold">NyayaSetu</h1>
                <p className="text-sm text-indigo-200">Friendly legal help for everyone — guides, FIR filing, and quick legal templates.</p>
              </div>
            </div>

            <p className="mt-6 text-sm text-indigo-100 max-w-md">NyayaSetu simplifies legal steps with plain language guidance and secure workflows. Whether you're filing a complaint or looking for legal templates, we make the process approachable.</p>

            <div className="mt-6 flex items-center gap-3">
              <SmallBadge>Privacy-first</SmallBadge>
              <SmallBadge>Guided forms</SmallBadge>
              <SmallBadge>Free resources</SmallBadge>
            </div>
          </div>

          <div className="mt-auto text-xs text-indigo-200">Trusted by citizens & community legal-aid groups</div>
        </div>

        {/* Auth card (right) */}
        <div className="p-8 md:p-12">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800">{mode === "login" ? "Welcome back" : "Create your account"}</h2>
              <p className="mt-1 text-sm text-slate-500">{mode === "login" ? "Sign in to access your cases and saved resources." : "Create an account to save cases and use guided workflows."}</p>
            </div>
            <div className="text-sm">
              <span className="text-slate-500">{mode === "login" ? "New here?" : "Have an account?"}</span>
              <button
                className="ml-2 text-indigo-600 hover:underline font-medium"
                onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setSuccess(""); }}
              >
                {mode === "login" ? "Create account" : "Sign in"}
              </button>
            </div>
          </div>

          {error && <div className="mt-4 rounded-md bg-red-50 border border-red-100 p-3 text-sm text-red-700">{error}</div>}
          {success && <div className="mt-4 rounded-md bg-green-50 border border-green-100 p-3 text-sm text-green-800">{success}</div>}

          {mode === "login" ? (
            <form className="mt-6 space-y-4" onSubmit={handleLogin} aria-label="login form">
              <label className="block">
                <span className="text-sm text-slate-600">Email</span>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-3"
                  placeholder="you@domain.com"
                />
              </label>

              <label className="block relative">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Password</span>
                  <a className="text-xs text-indigo-600 hover:underline">Forgot?</a>
                </div>
                <input
                  type={showLoginPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-3 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword((s) => !s)}
                  className="absolute right-3 top-10 text-slate-500"
                >
                  {showLoginPassword ? 'Hide' : 'Show'}
                </button>
              </label>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="h-4 w-4" />
                  <span className="text-slate-600">Remember this device</span>
                </label>

                <button type="button" className="text-sm text-indigo-600 hover:underline">Need help?</button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <button type="button" onClick={() => alert('Google login')}
                  className="py-2 rounded-lg border border-slate-200 text-sm font-medium">Google</button>
                <button type="button" onClick={() => alert('Phone OTP login')}
                  className="py-2 rounded-lg border border-slate-200 text-sm font-medium">Phone (OTP)</button>
              </div>

              <div className="mt-4 text-xs text-slate-500">By signing in you agree to our <a className="underline">Terms</a> and <a className="underline">Privacy Policy</a>.</div>
            </form>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={handleSignup} aria-label="signup form">
              <label className="block">
                <span className="text-sm text-slate-600">Full name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-3"
                  placeholder="Your full name"
                />
              </label>

              <label className="block">
                <span className="text-sm text-slate-600">Email</span>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-3"
                  placeholder="you@domain.com"
                />
              </label>

              <label className="block relative">
                <span className="text-sm text-slate-600">Create password</span>
                <input
                  type={showSignupPassword ? "text" : "password"}
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-3 pr-10"
                  placeholder="At least 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowSignupPassword((s) => !s)}
                  className="absolute right-3 top-10 text-slate-500"
                >
                  {showSignupPassword ? 'Hide' : 'Show'}
                </button>
              </label>

              <div className="text-xs text-slate-500">
                <div className="flex items-center justify-between">
                  <span>Password strength</span>
                  <span>{passwordStrength(signupPassword).label}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded mt-1 overflow-hidden">
                  <div className="h-full rounded" style={{ width: `${passwordStrength(signupPassword).pct}%`, background: 'linear-gradient(90deg,#60a5fa,#7c3aed)' }} />
                </div>
              </div>

              <div className="flex gap-3">
                <button type="submit" disabled={loading}
                  className="flex-1 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60">Create account</button>
                <button type="button" className="flex-1 py-3 rounded-lg border border-slate-200 text-slate-700">Invite</button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <button type="button" onClick={() => alert('Google signup')}
                  className="py-2 rounded-lg border border-slate-200 text-sm font-medium">Google</button>
                <button type="button" onClick={() => alert('Law firm invite')}
                  className="py-2 rounded-lg border border-slate-200 text-sm font-medium">Law firm invite</button>
              </div>

              <div className="mt-4 text-xs text-slate-500">By creating an account you agree to our <a className="underline">Terms</a> and <a className="underline">Privacy Policy</a>. We may verify identity for certain legal workflows.</div>
            </form>
          )}

          <div className="mt-6 bg-slate-50 border border-slate-100 text-xs p-3 rounded text-slate-600">Demo: <strong>demo@nyayasetu.test</strong> / <strong>Demo@1234</strong></div>
        </div>
      </div>
    </div>
  );
}
