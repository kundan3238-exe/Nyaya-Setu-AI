import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LegalPortal() {
  const navigate = useNavigate();
  const [rights, setRights] = useState(null);
  const [section, setSection] = useState("");
  const [templates, setTemplates] = useState([]);
  const [searchTemplate, setSearchTemplate] = useState("");
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (!token) navigate("/", { replace: true });
    else setUserName(name || "");
  }, [navigate]);

  // Fetch templates when component loads
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/templates", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTemplates(data);
      } catch (err) {
        console.error("Error loading templates:", err);
      }
    };
    loadTemplates();
  }, []);

  // Fetch rights by section
  const fetchRights = async () => {
    if (!section.trim()) {
      setError("⚠️ Please enter a section (e.g., 420 IPC)");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/rights/${section}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Section not found");
      const data = await res.json();
      setRights(data);
      setError("");
    } catch {
      setRights(null);
      setError("❌ Section not found in database.");
    }
  };

  const filteredTemplates = templates.filter((tpl) =>
    tpl.name.toLowerCase().includes(searchTemplate.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.clear();
    //navigate("/", { replace: true });
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
    <header className="flex justify-between items-center p-4 bg-blue-600 shadow-md sticky top-0 z-10 rounded-b-xl">
        <h1 className="text-2xl font-bold text-gray-800 animate-pulse">
          NyaySetuApp
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">Welcome, {userName || "User"}!</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 transform hover:scale-105 text-white px-4 py-2 rounded-lg transition duration-300 shadow-md"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 flex-1 grid gap-6">
        {/* Section Rights */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 hover:shadow-2xl transition duration-300">
          <h2 className="text-xl font-bold text-gray-800 mb-3">🔎 Check Rights under IPC/CrPC</h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter Section (e.g. 420 IPC)"
              className="border border-gray-300 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            />
            <button
              onClick={fetchRights}
              className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 text-white px-4 py-2 rounded-lg transition duration-300 shadow-md"
            >
              Search
            </button>
          </div>
          {error && <p className="text-red-600 mt-2">{error}</p>}
          {rights && (
            <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition duration-300">
              <p><strong>Section:</strong> {rights.section}</p>
              <p><strong>Title:</strong> {rights.title}</p>
              <p><strong>Description:</strong> {rights.description}</p>
              <p><strong>Bail Applicable:</strong> {rights.bail ? "✅ Yes" : "❌ No"}</p>
              <p><strong>Reference:</strong> {rights.reference}</p>
            </div>
          )}
        </div>

        {/* Templates */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300">
          <h2 className="text-xl font-bold text-gray-800 mb-3">📑 Legal Templates</h2>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Search templates (e.g. rent, FIR...)"
              className="border border-gray-300 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              value={searchTemplate}
              onChange={(e) => setSearchTemplate(e.target.value)}
            />
          </div>
          <div className="grid gap-4">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition duration-300 transform hover:scale-105"
                >
                  <div>
                    <h3 className="font-semibold text-gray-700">{tpl.name}</h3>
                    <p className="text-sm text-gray-500">{tpl.description}</p>
                  </div>
                  <button
                    onClick={() =>
                      window.open(`http://localhost:5000/api/templates/${tpl.id}`)
                    }
                    className="bg-green-600 hover:bg-green-700 transform hover:scale-105 text-white px-4 py-2 rounded-lg transition duration-300 shadow-md"
                  >
                    Download
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 mt-4">No templates found.</p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner mt-auto p-6 rounded-t-xl text-center">
        <p className="text-gray-600">&copy; 2025 NyaySetuApp. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-6">
          <a href="#" className="text-blue-600 hover:underline transition duration-300">Privacy Policy</a>
          <a href="#" className="text-blue-600 hover:underline transition duration-300">Terms of Service</a>
          <a href="#" className="text-blue-600 hover:underline transition duration-300">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}
