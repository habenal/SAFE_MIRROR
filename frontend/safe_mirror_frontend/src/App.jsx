import { Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ReportViewer from "./pages/ReportViewer";
import EvidenceLocker from "./pages/EvidenceLocker";

export default function App() {
  const location = useLocation();

  const NavLink = ({ to, children }) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${active ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  S
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">SAFE MIRROR</span>
              </Link>

              <div className="hidden md:flex gap-2">
                <NavLink to="/">Detection</NavLink>
                <NavLink to="/locker">Evidence Locker</NavLink>
              </div>
            </div>

            <div className="flex items-center">
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Help & Resources
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/locker" element={<EvidenceLocker />} />
          <Route path="/report/:id" element={<ReportViewer />} />
        </Routes>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 text-center text-gray-500 text-sm">
          <p>© 2025 Safe Mirror. Built for survivors, by allies.</p>
        </div>
      </footer>
    </div>
  );
}
