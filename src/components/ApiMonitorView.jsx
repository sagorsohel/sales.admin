import React, { useState } from "react";
import { Server, RefreshCw, CheckCircle, AlertTriangle, Send } from "lucide-react";

export function ApiMonitorView() {
  const [endpoint, setEndpoint] = useState("/api/health");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const testApi = async (path = endpoint) => {
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(`http://localhost:5000${path}`);
      const data = await res.json();
      setStatus(res.status);
      setResponse(data);
    } catch (err) {
      setStatus(500);
      setResponse({
        error: "Failed to connect to backend",
        message: err.message,
        hint: "Ensure Express backend is running on port 5000 (cd backend && npm run dev)",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="p-6 rounded-xl bg-[#111827] border border-[#1f293d]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Server className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-white">
                Express.js Server Live Diagnostic
              </h2>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Base URL: <code className="text-blue-400 font-mono">http://localhost:5000</code> • Powered by nodemon & dotenv
            </p>
          </div>

          <button
            onClick={() => testApi("/api/health")}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-500/20"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Ping Health Check
          </button>
        </div>
      </div>

      {/* Endpoint Selector & Tester */}
      <div className="p-6 rounded-xl bg-[#111827] border border-[#1f293d] space-y-4">
        <h3 className="text-sm font-semibold text-white">Select API Route to Query:</h3>

        <div className="flex flex-wrap gap-2">
          {[
            "/api/health",
            "/api/products",
            "/api/orders",
            "/api/analytics/dashboard",
          ].map((path) => (
            <button
              key={path}
              onClick={() => {
                setEndpoint(path);
                testApi(path);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer border ${
                endpoint === path
                  ? "bg-blue-600/20 text-blue-400 border-blue-500/40"
                  : "bg-[#0d131f] text-gray-400 border-[#1f293d] hover:text-white"
              }`}
            >
              GET {path}
            </button>
          ))}
        </div>

        {/* Live response window */}
        <div className="mt-4">
          <div className="flex items-center justify-between px-4 py-2.5 rounded-t-xl bg-[#090e17] border border-[#1f293d] border-b-0 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-gray-400">Response Status:</span>
              {status ? (
                <span
                  className={`px-2 py-0.5 rounded font-bold ${
                    status === 200
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {status} {status === 200 ? "OK" : "ERROR"}
                </span>
              ) : (
                <span className="text-gray-500 italic">Awaiting request...</span>
              )}
            </div>
            <span className="text-[11px] text-gray-500">JSON Payload</span>
          </div>

          <pre className="p-4 rounded-b-xl bg-[#070b12] border border-[#1f293d] text-xs font-mono text-emerald-400/90 overflow-x-auto max-h-96 leading-relaxed">
            {response
              ? JSON.stringify(response, null, 2)
              : "// Click 'Ping Health Check' or one of the endpoints above to test the Express server."}
          </pre>
        </div>
      </div>
    </div>
  );
}
