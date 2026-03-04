import React, { useState } from "react";
import {
  Settings,
  LogOut,
  ChevronRight,
  FileText,
  Users,
  CreditCard,
} from "lucide-react";

export default function MockDashboard() {
  const [activeTab, setActiveTab] = useState("Completed");

  // Mock data populated based on your sketch
  const mockProjects = [
    {
      id: 1,
      name: "Makaju",
      paymentStatus: "Paid",
      payLogs: 12,
      workers: 4,
      status: "Completed",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "FADYAH Pay",
      paymentStatus: "Pending",
      payLogs: 3,
      workers: 8,
      status: "Pending",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      name: "Logger Pay",
      paymentStatus: "Paid",
      payLogs: 24,
      workers: 12,
      status: "Completed",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 4,
      name: "Adé Perfumes E-Shop",
      paymentStatus: "Paid",
      payLogs: 0,
      workers: 6,
      status: "Created",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const filteredProjects = mockProjects.filter((p) => p.status === activeTab);

  return (
    <div className="w-full h-full bg-[#0a0a0a] rounded-2xl border border-white/10 flex flex-col overflow-hidden text-white font-sans shadow-2xl relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-500/10 blur-[100px] pointer-events-none"></div>

      {/* HEADER */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/5 bg-white/[0.02] relative z-10">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg border border-white/20">
            OJ
          </div>
          <div>
            <h2 className="font-bold text-lg md:text-xl tracking-tight leading-tight">
              Oti James
            </h2>
            <p className="text-xs text-gray-400 font-medium">Administrator</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full border border-white/5">
            <Settings className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Desktop Logout */}
          <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-full text-sm font-bold transition-colors border border-red-500/20">
            <LogOut className="w-4 h-4" /> Logout
          </button>

          {/* Mobile Logout */}
          <button className="md:hidden p-2 text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-full border border-red-500/20">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* TABS / FILTERS */}
      <div className="flex items-center gap-2 p-4 md:px-6 overflow-x-auto custom-scrollbar border-b border-white/5 relative z-10 bg-black/20">
        {["Completed", "Pending", "Canceled", "Created"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all border ${
              activeTab === tab
                ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-gradient-to-b from-transparent to-[#050505] relative z-10">
        {filteredProjects.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <FileText className="w-8 h-8 opacity-50" />
            </div>
            <p className="text-sm font-medium">
              No projects found in this category.
            </p>
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#111111]/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row gap-4 md:items-center justify-between hover:border-white/30 transition-all group shadow-lg hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Left Side: Icon & Details */}
                <div className="flex items-start md:items-center gap-4">
                  {/* App Icon */}
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center border border-white/20 shadow-inner shrink-0`}
                  >
                    <span className="text-xl md:text-2xl font-black text-white drop-shadow-md">
                      {project.name[0]}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col gap-1.5 md:gap-1">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                      <h4 className="text-base md:text-lg font-bold text-white tracking-tight">
                        {project.name}
                      </h4>
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest border ${
                          project.paymentStatus === "Paid"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : project.paymentStatus === "Pending"
                              ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                              : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}
                      >
                        {project.paymentStatus}
                      </span>
                    </div>

                    <div className="text-xs md:text-sm text-gray-400 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 mt-1 md:mt-0">
                      <span className="flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-gray-500" />
                        {project.payLogs} Pay logs
                      </span>
                      <span className="hidden sm:block text-gray-700">•</span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-gray-500" />
                        {project.workers} Assigned workers
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Action Button */}
                <button className="w-full md:w-auto mt-2 md:mt-0 px-5 py-2.5 md:py-3 bg-white/5 hover:bg-white text-gray-300 hover:text-black text-sm font-bold rounded-xl border border-white/10 hover:border-white transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  Quick View
                  <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `,
        }}
      />
    </div>
  );
}
