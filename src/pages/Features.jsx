import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Skeleton } from "../components/Skeleton"; // <-- Import the new Skeleton
import {
  ArrowLeft,
  Link as LinkIcon,
  Paperclip,
  X,
  Plus,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const aiData = location.state || { text: "", links: [], files: [] };

  const [visionText, setVisionText] = useState(aiData.text);
  const [links, setLinks] = useState(
    aiData.links.length > 0 ? aiData.links : [""],
  );
  const [files, setFiles] = useState(aiData.files);

  // --- HANDLERS FOR EDITING ---
  const handleLinkChange = (index, value) => {
    const updatedLinks = [...links];
    updatedLinks[index] = value;
    setLinks(updatedLinks);
  };

  const removeLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks.length > 0 ? updatedLinks : [""]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleAddFiles = (e) => {
    if (e.target.files.length > 0) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-gray-500/30">
      <Navbar />

      <main className="pt-28 md:pt-36 pb-20 px-4 md:px-8 max-w-5xl mx-auto min-h-screen">
        {/* --- HEADER & BACK BUTTON --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              Features
            </h1>
          </div>

          <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Sparkles className="w-4 h-4" />
            Analyze Context
          </button>
        </div>

        {/* --- EDITABLE CONTEXT DASHBOARD --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white/90">
              Project Context
            </h2>
            <span className="text-xs font-medium px-3 py-1 bg-white/10 text-gray-300 rounded-full border border-white/5">
              Editable
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Vision Text */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-400">
                Your Vision
              </label>
              <textarea
                value={visionText}
                onChange={(e) => setVisionText(e.target.value)}
                placeholder="Describe your vision..."
                className="w-full h-48 bg-black/50 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 resize-none transition-all custom-scrollbar"
              />
            </div>

            {/* Right Column: Links & Files */}
            <div className="space-y-6">
              {/* Links Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" /> Reference Links
                  </label>
                  <button
                    onClick={() => setLinks([...links, ""])}
                    className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>

                <div className="space-y-2 max-h-28 overflow-y-auto custom-scrollbar pr-2">
                  {links.map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={link}
                        onChange={(e) =>
                          handleLinkChange(index, e.target.value)
                        }
                        placeholder="https://..."
                        className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-all"
                      />
                      <button
                        onClick={() => removeLink(index)}
                        className="p-2.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Files Section */}
              <div className="space-y-3 pt-2 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <Paperclip className="w-4 h-4" /> Attached Files
                  </label>
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3 h-3" /> Upload
                  </button>
                  <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={handleAddFiles}
                    className="hidden"
                  />
                </div>

                {files.length === 0 ? (
                  <div className="text-sm text-gray-600 italic px-2">
                    No files attached.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg pl-3 pr-1 py-1.5 group hover:bg-white/10 transition-colors"
                      >
                        <span className="text-xs text-gray-300 max-w-[120px] truncate">
                          {file.name}
                        </span>
                        <button
                          onClick={() => removeFile(index)}
                          className="p-1 text-gray-500 hover:text-red-400 rounded-md transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- AI GENERATION SKELETON LOADER --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full mt-12 space-y-10"
        >
          {/* Skeleton Header */}
          <div className="space-y-4 flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 mb-2">
              <Sparkles className="w-5 h-5 text-gray-500 animate-pulse" />
            </div>
            <Skeleton className="h-8 w-64 md:w-96 rounded-lg" />
            <Skeleton className="h-4 w-4/5 md:w-[500px] rounded-md" />
          </div>

          {/* Skeleton Cards Grid (Looks like generating features) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-[#111111]/40 border border-white/5 space-y-4 shadow-lg backdrop-blur-sm"
              >
                <Skeleton className="h-10 w-10 rounded-full mb-6" />
                <Skeleton className="h-6 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
                <Skeleton className="h-4 w-4/6 rounded-md" />
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `,
        }}
      />
    </div>
  );
}
