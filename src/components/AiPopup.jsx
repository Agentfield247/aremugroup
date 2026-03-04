import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AiPopup() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // --- DATA STATES ---
  const [visionText, setVisionText] = useState("");
  const [links, setLinks] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // --- UI STATES ---
  const [isLinkPopupOpen, setIsLinkPopupOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState("");

  // --- FILE HANDLERS ---
  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    if (uploadedFiles.length + newFiles.length > 5) {
      alert("You can only upload a maximum of 5 files.");
      const allowedFiles = newFiles.slice(0, 5 - uploadedFiles.length);
      setUploadedFiles([...uploadedFiles, ...allowedFiles]);
    } else {
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (indexToRemove) => {
    setUploadedFiles(uploadedFiles.filter((_, idx) => idx !== indexToRemove));
  };

  // --- LINK HANDLERS ---
  const handleAddLink = () => {
    if (currentLink.trim() !== "") {
      setLinks([...links, currentLink.trim()]);
      setCurrentLink("");
      setIsLinkPopupOpen(false);
    }
  };

  const removeLink = (indexToRemove) => {
    setLinks(links.filter((_, idx) => idx !== indexToRemove));
  };

  // --- SEND BUNDLE ---
  const handleSendToAI = () => {
    const aiPayload = {
      text: visionText,
      links: links,
      files: uploadedFiles,
    };
    navigate("/features", { state: aiPayload });
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto my-2 md:my-8 group z-20">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 via-gray-400/20 to-white/20 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500"></div>

      <div className="relative w-full bg-black/50 backdrop-blur-2xl rounded-[24px] p-2 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {/* Top Bar */}
        <div className="flex flex-row items-center justify-between px-3 md:px-4 py-2 mb-2 gap-3">
          <div className="flex items-start gap-2.5 flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-gray-400 mt-0.5"
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            </svg>
            <span className="text-[11px] sm:text-xs text-left text-gray-400 leading-tight md:leading-snug max-w-[200px] sm:max-w-none">
              Your ideas and concepts are strictly confidential and legally
              protected under
            </span>
          </div>
          <button className="flex shrink-0 items-center gap-1.5 px-3 py-1 text-[10px] sm:text-xs font-medium text-white bg-white/10 border border-white/20 rounded-full hover:bg-white/20 hover:border-white/40 transition-all duration-200 whitespace-nowrap cursor-pointer">
            IPFT Policy
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-70"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </button>
        </div>

        {/* Input Area */}
        <div className="relative bg-black/60 rounded-[18px] p-4 md:p-5 border border-white/5 shadow-inner flex flex-col">
          <textarea
            value={visionText}
            onChange={(e) => setVisionText(e.target.value)}
            placeholder="What do you want to build..."
            className="w-full h-24 md:h-28 bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 resize-none text-base md:text-lg leading-relaxed outline-none"
            style={{ caretColor: "#ffffff" }}
          />

          {/* =======================================================
              THE ATTACHMENT TRAY
              ======================================================= */}
          {(uploadedFiles.length > 0 || links.length > 0) && (
            <div className="flex flex-col gap-3 mt-2 pt-3 border-t border-white/10">
              {/* Row 1: Uploaded Files (Images) */}
              {uploadedFiles.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {uploadedFiles.map((file, idx) => (
                    <div
                      key={`file-${idx}`}
                      className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-white/20 bg-white/5 overflow-hidden flex items-center justify-center shrink-0"
                    >
                      {file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-gray-400"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      )}
                      <button
                        onClick={() => removeFile(idx)}
                        className="absolute top-1 right-1 bg-black/80 hover:bg-black text-white rounded-full p-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity backdrop-blur-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Row 2: Clean Text Links */}
              {links.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  {links.map((link, idx) => (
                    <div
                      key={`link-${idx}`}
                      className="flex items-center gap-1 group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-400 shrink-0"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 hover:underline max-w-[150px] sm:max-w-[200px] truncate"
                      >
                        {link}
                      </a>
                      <button
                        onClick={() => removeLink(idx)}
                        className="text-gray-500 hover:text-red-400 p-0.5 ml-0.5 md:opacity-0 md:group-hover:opacity-100 transition-all"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bottom Toolbar */}
          <div className="flex items-center justify-between mt-3 relative">
            <div className="flex items-center gap-2 sm:gap-3">
              <input
                type="file"
                multiple
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />

              <button
                onClick={handleFileClick}
                disabled={uploadedFiles.length >= 5}
                className={`p-2 rounded-full border transition-all ${uploadedFiles.length >= 5 ? "opacity-50 cursor-not-allowed border-white/5 bg-transparent text-gray-600" : "border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"}`}
                title="Upload File (Max 5)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsLinkPopupOpen(!isLinkPopupOpen)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border text-xs sm:text-sm transition-all ${isLinkPopupOpen ? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  Links
                </button>

                {/* LINKS POPUP MODAL */}
                <AnimatePresence>
                  {isLinkPopupOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full left-0 mb-3 w-72 sm:w-80 bg-[#111] border border-white/20 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.8)] p-4 z-50 backdrop-blur-2xl"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Add Reference Link
                        </span>
                        <button
                          onClick={() => setIsLinkPopupOpen(false)}
                          className="text-gray-500 hover:text-white transition-colors p-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex flex-col gap-3">
                        <input
                          type="url"
                          value={currentLink}
                          onChange={(e) => setCurrentLink(e.target.value)}
                          placeholder="https://example.com"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-colors"
                        />
                        <button
                          onClick={handleAddLink}
                          className="w-full flex items-center justify-center gap-1.5 text-sm font-semibold text-black bg-white hover:bg-gray-200 py-2.5 rounded-lg transition-colors"
                        >
                          Add to Context
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side: Microphone & Send Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              </button>

              <button
                onClick={handleSendToAI}
                className="p-3 rounded-full bg-white hover:bg-gray-200 text-black transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transform hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
