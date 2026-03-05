import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Skeleton } from "../components/Skeleton";
import {
  ArrowLeft,
  Link as LinkIcon,
  Paperclip,
  X,
  Plus,
  Sparkles,
  ArrowRight,
  Building2,
  RefreshCw,
  LayoutList,
  Minus,
  Clock,
  Wallet,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Download,
  UserPlus,
  BrainCircuit,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Features() {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // --- 1. CONTEXT STATES ---
  const aiData = location.state || { text: "", links: [], files: [] };
  const [visionText, setVisionText] = useState(aiData.text);
  const [links, setLinks] = useState(
    aiData.links.length > 0 ? aiData.links : [""],
  );
  const [files, setFiles] = useState(aiData.files);

  // --- 2. DYNAMIC FEATURES STATES ---
  const [featuresList, setFeaturesList] = useState([
    { id: Date.now(), text: "" },
  ]);
  const [paraphrasingId, setParaphrasingId] = useState(null);

  // --- 3. FLOW & DEPARTMENT STATES ---
  const [showDepartments, setShowDepartments] = useState(false);
  const [isAiAnalyzingDepts, setIsAiAnalyzingDepts] = useState(false);

  const [apiDepartments, setApiDepartments] = useState([]);
  const [selectedDeptCode, setSelectedDeptCode] = useState("");

  const [projectDepartments, setProjectDepartments] = useState([]);
  const [openDeptAccordions, setOpenDeptAccordions] = useState({});

  // ==========================================
  // CONTEXT HANDLERS
  // ==========================================
  const handleLinkChange = (index, value) => {
    const updatedLinks = [...links];
    updatedLinks[index] = value;
    setLinks(updatedLinks);
  };
  const removeLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks.length > 0 ? updatedLinks : [""]);
  };
  const removeFile = (index) => setFiles(files.filter((_, i) => i !== index));
  const handleAddFiles = (e) => {
    if (e.target.files.length > 0)
      setFiles([...files, ...Array.from(e.target.files)]);
  };

  // ==========================================
  // GROQ AI: FEATURE PARAPHRASER
  // ==========================================
  const handleParaphrase = async (id) => {
    const featToUpdate = featuresList.find((f) => f.id === id);
    if (!featToUpdate || !featToUpdate.text.trim()) return;
    setParaphrasingId(id);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) throw new Error("Missing VITE_GROQ_API_KEY.");

      const prompt = `Rewrite this raw feature idea into a single, simple, and highly understandable sentence. Make it clear and accessible. Do NOT use paragraphs, headings, or bullet points. Return exactly ONE sentence.
      Vision: ${visionText}
      Feature: "${featToUpdate.text}"
      Return ONLY the rewritten sentence. No markdown, no intro.`;

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.5,
          }),
        },
      );

      if (!response.ok) throw new Error("Groq API Error");
      const data = await response.json();
      const refinedText = data.choices[0].message.content.trim();

      setFeaturesList(
        featuresList.map((f) =>
          f.id === id ? { ...f, text: refinedText } : f,
        ),
      );
    } catch (error) {
      console.error(error);
      alert(`Paraphrase Failed: ${error.message}`);
    } finally {
      setParaphrasingId(null);
    }
  };

  const handleAddFeature = () =>
    setFeaturesList([...featuresList, { id: Date.now(), text: "" }]);
  const handleUpdateFeature = (id, newText) =>
    setFeaturesList(
      featuresList.map((f) => (f.id === id ? { ...f, text: newText } : f)),
    );
  const handleRemoveFeature = (id) =>
    setFeaturesList(featuresList.filter((f) => f.id !== id));

  // ==========================================
  // THE CONSTANT AI DEPARTMENT TEMPLATE
  // ==========================================
  const getAiDeptTemplate = () => ({
    code: "AI_RES_CONSTANT",
    name: "AI & Solution Research Dept",
    description:
      "Core AI research, architectural mapping, and strategic planning. Increasing researchers scales cost but accelerates delivery.",
    isConstant: true,
    subs: [
      {
        id: "ai_res_core_sub",
        title: "Core Architecture & Planning",
        description: "Blueprint generation and AI agent orchestration.",
        seniors: 1,
        juniors: 0,
        speed: 5,
        aremuEstimate: 100000,
        userBudget: 100000,
        isExponential: true,
      },
    ],
  });

  // ==========================================
  // GROQ AI: NESTED DEPARTMENT AUTO-ROUTING
  // ==========================================
  const handleProceed = async () => {
    setShowDepartments(true);
    setTimeout(() => window.scrollBy({ top: 500, behavior: "smooth" }), 100);

    if (projectDepartments.length === 0) {
      setIsAiAnalyzingDepts(true);

      try {
        const res = await fetch(
          "https://api.aremugroup.com/v1/departments/fetch/",
        );
        if (!res.ok) throw new Error("Aremu API failed to fetch departments.");
        const apiData = await res.json();
        const fetchedDepts = apiData.data || [];
        setApiDepartments(fetchedDepts);

        const apiKey = import.meta.env.VITE_GROQ_API_KEY;
        if (!apiKey) throw new Error("Missing VITE_GROQ_API_KEY.");

        const deptListForLLM = fetchedDepts.map((d) => ({
          code: d.department_code,
          name: d.department_name,
          subs: d.sub_divisions
            ? d.sub_divisions.map((s) => ({
                title: s.sub_title,
                desc: s.sub_description,
              }))
            : [],
        }));

        const prompt = `You are an elite Project Architect. Based on the Vision and Features, select the necessary departments AND their specific sub-divisions from the available list.
        Vision: "${visionText}"
        Features: ${featuresList.map((f) => f.text).join(" | ")}
        Available Departments: ${JSON.stringify(deptListForLLM)}

        For each selected sub-division, assign logical seniors, juniors, delivery speed (days), and budget (Naira).
        Return ONLY valid JSON exactly like this:
        {
          "selected": [
            {
              "code": "DEPT_CODE",
              "subs": [
                { "title": "Sub Division Name", "seniors": 1, "juniors": 2, "speed": 14, "budget": 500000 }
              ]
            }
          ]
        }`;

        const aiRes = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "llama-3.3-70b-versatile",
              messages: [{ role: "user", content: prompt }],
              response_format: { type: "json_object" },
              temperature: 0.2,
            }),
          },
        );

        if (!aiRes.ok) throw new Error("Groq API Error");
        const groqData = await aiRes.json();
        const parsedJSON = JSON.parse(
          groqData.choices[0].message.content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim(),
        );

        const aiSuggestedDepts = parsedJSON.selected
          .map((aiDept) => {
            const fullDept = fetchedDepts.find(
              (d) => d.department_code === aiDept.code,
            );
            if (!fullDept) return null;

            return {
              code: fullDept.department_code,
              name: fullDept.department_name,
              description: fullDept.department_description,
              subs:
                aiDept.subs && aiDept.subs.length > 0
                  ? aiDept.subs.map((s) => ({
                      id: Date.now() + Math.random(),
                      title: s.title,
                      description:
                        fullDept.sub_divisions?.find(
                          (fd) => fd.sub_title === s.title,
                        )?.sub_description || "Specialized task execution.",
                      seniors: s.seniors || 1,
                      juniors: s.juniors || 1,
                      speed: s.speed || 7,
                      aremuEstimate: s.budget || 250000,
                      userBudget: s.budget || 250000,
                    }))
                  : [
                      {
                        id: Date.now() + Math.random(),
                        title: "General Operations",
                        description: "Standard execution.",
                        seniors: 1,
                        juniors: 2,
                        speed: 7,
                        aremuEstimate: 250000,
                        userBudget: 250000,
                      },
                    ],
            };
          })
          .filter(Boolean);

        const finalDepartments = [getAiDeptTemplate(), ...aiSuggestedDepts];
        setProjectDepartments(finalDepartments);
        setOpenDeptAccordions({});
      } catch (error) {
        console.error(error);
        alert(`Routing Error: ${error.message}`);
      } finally {
        setIsAiAnalyzingDepts(false);
      }
    }
  };

  // ==========================================
  // NESTED DEPARTMENT UI HANDLERS
  // ==========================================
  const toggleAccordion = (code) =>
    setOpenDeptAccordions((prev) => ({ ...prev, [code]: !prev[code] }));

  const updateSubDept = (deptCode, subId, field, value) => {
    setProjectDepartments(
      projectDepartments.map((dept) => {
        if (dept.code === deptCode) {
          const updatedSubs = dept.subs.map((sub) => {
            if (sub.id === subId) {
              // Exponential AI Dept Logic
              if (sub.isExponential && field === "seniors") {
                const newPeople = Math.min(5, Math.max(1, Number(value)));
                const newSpeed = 6 - newPeople;
                const newCost = 100000 * Math.pow(2, newPeople - 1);
                return {
                  ...sub,
                  seniors: newPeople,
                  speed: newSpeed,
                  aremuEstimate: newCost,
                  userBudget: newCost,
                };
              }

              // Handle user editing THEIR budget
              if (field === "userBudget") {
                return { ...sub, userBudget: Math.max(0, Number(value)) };
              }

              // Normal staffing logic
              let safeValue = value;
              if (["seniors", "juniors", "speed"].includes(field))
                safeValue = Math.max(0, Number(value));
              return { ...sub, [field]: safeValue };
            }
            return sub;
          });
          return { ...dept, subs: updatedSubs };
        }
        return dept;
      }),
    );
  };

  const handleAddDepartmentManually = () => {
    const dept = apiDepartments.find(
      (d) => d.department_code === selectedDeptCode,
    );
    if (
      dept &&
      !projectDepartments.find((p) => p.code === dept.department_code)
    ) {
      const manualSubs =
        dept.sub_divisions && dept.sub_divisions.length > 0
          ? dept.sub_divisions.map((s) => ({
              id: Date.now() + Math.random(),
              title: s.sub_title,
              description: s.sub_description,
              seniors: 1,
              juniors: 1,
              speed: 7,
              aremuEstimate: 200000,
              userBudget: 200000,
            }))
          : [
              {
                id: Date.now(),
                title: "General Ops",
                description: "Standard execution",
                seniors: 1,
                juniors: 1,
                speed: 7,
                aremuEstimate: 200000,
                userBudget: 200000,
              },
            ];

      setProjectDepartments([
        ...projectDepartments,
        {
          code: dept.department_code,
          name: dept.department_name,
          description: dept.department_description,
          subs: manualSubs,
        },
      ]);
      setOpenDeptAccordions((prev) => ({
        ...prev,
        [dept.department_code]: false,
      }));
      setSelectedDeptCode("");
    }
  };

  // --- MATH HELPERS ---
  const calculateExpectedWages = (seniors, juniors) =>
    seniors * 150000 + juniors * 50000;

  // Calculates totals for the Aremu Estimate (Wages + Aremu Base Budget)
  const getAremuDeptTotals = (subs) => {
    return subs.reduce(
      (acc, sub) => {
        const wages = sub.isExponential
          ? 0
          : calculateExpectedWages(sub.seniors, sub.juniors);
        acc.cost += wages + Number(sub.aremuEstimate);
        acc.speed = Math.max(acc.speed, sub.speed);
        acc.staff += sub.seniors + sub.juniors;
        return acc;
      },
      { cost: 0, speed: 0, staff: 0 },
    );
  };

  // Calculates totals for the User's Desired Budget (Wages + User Edited Budget)
  const getUserDeptTotals = (subs) => {
    return subs.reduce(
      (acc, sub) => {
        const wages = sub.isExponential
          ? 0
          : calculateExpectedWages(sub.seniors, sub.juniors);
        acc.cost += wages + Number(sub.userBudget);
        return acc;
      },
      { cost: 0 },
    );
  };

  const aremuGrandTotal = projectDepartments.reduce(
    (total, dept) => total + getAremuDeptTotals(dept.subs).cost,
    0,
  );
  const userGrandTotal = projectDepartments.reduce(
    (total, dept) => total + getUserDeptTotals(dept.subs).cost,
    0,
  );

  const activeDeptPreview = apiDepartments.find(
    (d) => d.department_code === selectedDeptCode,
  );

  // --- DOWNLOAD RECEIPT HELPER ---
  const handleDownloadConfig = () => {
    let content = `AREMU GROUP - PROJECT EXECUTION BLUEPRINT\n`;
    content += `=================================================\n\n`;

    content += `PROJECT VISION:\n`;
    content += `${visionText || "No vision provided."}\n\n`;

    content += `FEATURES:\n`;
    featuresList.forEach((f, i) => {
      if (f.text) content += `${i + 1}. ${f.text}\n`;
    });
    content += `\n=================================================\n\n`;

    content += `DEPARTMENT BREAKDOWN:\n\n`;
    projectDepartments.forEach((dept) => {
      const totals = getAremuDeptTotals(dept.subs);
      const userTotals = getUserDeptTotals(dept.subs);

      content += `[ ${dept.name.toUpperCase()} ]\n`;
      content += `Timeline: ${totals.speed} Days | Staff: ${totals.staff}\n`;

      dept.subs.forEach((sub) => {
        const wages = sub.isExponential
          ? 0
          : calculateExpectedWages(sub.seniors, sub.juniors);
        content += `  -> ${sub.title}\n`;
        content += `     Staff: ${sub.seniors} Seniors, ${sub.juniors} Juniors | Speed: ${sub.speed} days\n`;
        content += `     Task Cost: NGN ${sub.aremuEstimate.toLocaleString()} (User Budget: NGN ${sub.userBudget.toLocaleString()})\n`;
      });
      content += `\n`;
    });

    content += `=================================================\n`;
    content += `AREMU ESTIMATE: NGN ${aremuGrandTotal.toLocaleString()}\n`;
    content += `YOUR BUDGET: NGN ${userGrandTotal.toLocaleString()}\n`;
    content += `=================================================\n`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Aremu_Project_Blueprint.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-gray-500/30">
      <Navbar />

      <main className="pt-28 md:pt-36 pb-32 px-4 md:px-8 max-w-4xl mx-auto min-h-screen">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Features
          </h1>
        </div>

        {/* ======================= SECTION 1: CONTEXT ======================= */}
        <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-8 shadow-2xl mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-white/90">
              Project Context
            </h2>
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/10 text-gray-300 rounded-full border border-white/5">
              Editable
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Your Vision
              </label>
              <textarea
                value={visionText}
                onChange={(e) => setVisionText(e.target.value)}
                placeholder="Describe your vision..."
                className="w-full h-32 md:h-40 bg-black/50 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30 resize-none custom-scrollbar"
              />
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <LinkIcon className="w-3 h-3" /> Links
                  </label>
                  <button
                    onClick={() => setLinks([...links, ""])}
                    className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                <div className="space-y-2 max-h-20 overflow-y-auto custom-scrollbar pr-1">
                  {links.map((link, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={link}
                        onChange={(e) =>
                          handleLinkChange(index, e.target.value)
                        }
                        placeholder="https://..."
                        className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-white/30"
                      />
                      <button
                        onClick={() => removeLink(index)}
                        className="p-2 text-gray-500 hover:text-red-400 rounded-lg transition-all"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Paperclip className="w-3 h-3" /> Files
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
                  <div className="text-xs text-gray-600 italic">
                    No files attached.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-md pl-2 pr-1 py-1 group"
                      >
                        <span className="text-[11px] text-gray-300 max-w-[100px] truncate">
                          {file.name}
                        </span>
                        <button
                          onClick={() => removeFile(index)}
                          className="p-0.5 text-gray-500 hover:text-red-400 transition-colors"
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
        </div>

        {/* ======================= SECTION 2: FEATURES ======================= */}
        <div className="mb-6 flex items-center gap-3">
          <div className="p-2.5 bg-white/10 rounded-xl">
            <LayoutList className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Define Features</h2>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {featuresList.map((feat, index) => (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="relative bg-[#111111]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-lg focus-within:border-white/30 transition-colors"
              >
                {featuresList.length > 1 && (
                  <button
                    onClick={() => handleRemoveFeature(feat.id)}
                    className="absolute top-4 right-4 text-gray-600 hover:text-red-400 transition-colors md:opacity-0 md:group-hover:opacity-100"
                    title="Remove Feature"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <textarea
                  value={feat.text}
                  onChange={(e) => handleUpdateFeature(feat.id, e.target.value)}
                  placeholder={`Feature ${index + 1} details...`}
                  className="w-full h-24 bg-transparent text-white placeholder-gray-600 focus:outline-none resize-none custom-scrollbar pr-6 md:pr-8 text-sm md:text-base leading-relaxed"
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleParaphrase(feat.id)}
                    disabled={paraphrasingId === feat.id || !feat.text.trim()}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${paraphrasingId === feat.id ? "bg-white/20 border-white/20 text-white cursor-wait" : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30"}`}
                  >
                    {paraphrasingId === feat.id ? (
                      <RefreshCw className="w-3 h-3 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3 text-purple-400" />
                    )}
                    {paraphrasingId === feat.id ? "Refining..." : "Paraphrase"}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <button
            onClick={handleAddFeature}
            className="w-full flex items-center justify-center gap-2 py-5 border-2 border-dashed border-white/10 hover:border-white/30 rounded-2xl text-gray-500 hover:text-white transition-colors bg-white/[0.01] font-medium"
          >
            <Plus className="w-4 h-4" /> Add Another Feature
          </button>
        </div>

        <div className="flex justify-end mt-10">
          <button
            onClick={handleProceed}
            disabled={isAiAnalyzingDepts}
            className="flex items-center gap-2 px-8 py-3.5 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 transform origin-right disabled:opacity-50"
          >
            {isAiAnalyzingDepts ? "Processing..." : "Proceed"}{" "}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* ======================= SECTION 3: NESTED DEPARTMENTS ======================= */}
        <AnimatePresence>
          {showDepartments && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 pt-12 border-t border-white/10"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-white/10 rounded-xl border border-white/5">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">
                  Execution Plan
                </h2>
              </div>

              {isAiAnalyzingDepts && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-10 border border-white/10 rounded-3xl bg-[#111111]/50 text-center shadow-2xl mb-10 overflow-hidden relative"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite] w-[200%]"
                    style={{ transform: "translateX(-50%)" }}
                  ></div>
                  <div className="flex flex-col items-center justify-center space-y-4 relative z-10">
                    <Sparkles className="w-10 h-10 text-white animate-bounce" />
                    <h3 className="text-xl font-bold text-white">
                      AI is building your organizational chart...
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Assigning sub-departments, specialized teams, and
                      calculating estimated budgets.
                    </p>
                  </div>
                </motion.div>
              )}

              {!isAiAnalyzingDepts && (
                <div className="space-y-6 mb-10">
                  <AnimatePresence>
                    {projectDepartments.map((dept) => {
                      const isOpen = openDeptAccordions[dept.code];
                      const totals = getAremuDeptTotals(dept.subs);

                      return (
                        <motion.div
                          key={dept.code}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-[#111111]/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                        >
                          {/* PARENT DEPARTMENT HEADER */}
                          <div
                            onClick={() => toggleAccordion(dept.code)}
                            className="p-6 md:p-8 cursor-pointer hover:bg-white/[0.02] transition-colors relative"
                          >
                            <div className="pr-12">
                              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                {dept.isConstant && (
                                  <BrainCircuit className="w-5 h-5 text-gray-400" />
                                )}
                                {dept.name}
                              </h3>
                              <p className="text-sm text-gray-400 max-w-2xl line-clamp-2">
                                {dept.description}
                              </p>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3 md:gap-4 items-center">
                              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                                <span className="text-xs text-gray-400 block mb-0.5 font-bold uppercase tracking-wider">
                                  Est. Cost
                                </span>
                                <span className="text-base font-black text-white">
                                  ₦ {totals.cost.toLocaleString()}
                                </span>
                              </div>
                              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                                <span className="text-xs text-gray-400 block mb-0.5 font-bold uppercase tracking-wider">
                                  Total Staff
                                </span>
                                <span className="text-base font-black text-white">
                                  {totals.staff}
                                </span>
                              </div>
                              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                                <span className="text-xs text-gray-400 block mb-0.5 font-bold uppercase tracking-wider">
                                  Timeline
                                </span>
                                <span className="text-base font-black text-white">
                                  {totals.speed} Days
                                </span>
                              </div>

                              <div className="w-full md:w-auto md:ml-auto mt-2 md:mt-0 text-gray-500 flex items-center justify-between md:justify-end gap-2 text-sm font-medium border-t md:border-0 border-white/5 pt-3 md:pt-0">
                                {isOpen
                                  ? "Hide Details"
                                  : "View Sub-Departments"}
                                {isOpen ? (
                                  <ChevronUp className="w-5 h-5" />
                                ) : (
                                  <ChevronDown className="w-5 h-5" />
                                )}
                              </div>
                            </div>
                          </div>

                          {/* NESTED SUB-DEPARTMENTS */}
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 md:p-8 bg-black/40 border-t border-white/10 space-y-8">
                                  {dept.subs.map((sub) => {
                                    const isExp = sub.isExponential;
                                    const wages = isExp
                                      ? 0
                                      : calculateExpectedWages(
                                          sub.seniors,
                                          sub.juniors,
                                        );

                                    return (
                                      <div
                                        key={sub.id}
                                        className="relative pl-4 md:pl-8 border-l-2 border-white/10"
                                      >
                                        <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full border-2 bg-[#111] border-gray-600"></div>

                                        <div className="mb-5 pr-6 md:pr-8">
                                          <h4 className="text-base md:text-lg font-bold text-white">
                                            {sub.title}
                                          </h4>
                                          <p className="text-xs text-gray-400 mt-1">
                                            {sub.description}
                                          </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          {/* Left Col: Staffing */}
                                          <div className="space-y-3">
                                            {isExp ? (
                                              <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl border border-white/5">
                                                <span className="text-xs text-gray-300 font-bold">
                                                  Researchers (Max 5):
                                                </span>
                                                <div className="flex items-center gap-2 bg-black/50 rounded-lg p-1">
                                                  <button
                                                    onClick={() =>
                                                      updateSubDept(
                                                        dept.code,
                                                        sub.id,
                                                        "seniors",
                                                        sub.seniors - 1,
                                                      )
                                                    }
                                                    className="p-1 hover:text-white"
                                                  >
                                                    <Minus className="w-3 h-3" />
                                                  </button>
                                                  <span className="w-4 text-center text-xs font-black text-white">
                                                    {sub.seniors}
                                                  </span>
                                                  <button
                                                    onClick={() =>
                                                      updateSubDept(
                                                        dept.code,
                                                        sub.id,
                                                        "seniors",
                                                        sub.seniors + 1,
                                                      )
                                                    }
                                                    className="p-1 hover:text-white"
                                                  >
                                                    <Plus className="w-3 h-3" />
                                                  </button>
                                                </div>
                                              </div>
                                            ) : (
                                              <>
                                                <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl border border-white/5">
                                                  <span className="text-xs text-gray-300 font-medium">
                                                    Seniors:
                                                  </span>
                                                  <div className="flex items-center gap-2 bg-black/50 rounded-lg p-1">
                                                    <button
                                                      onClick={() =>
                                                        updateSubDept(
                                                          dept.code,
                                                          sub.id,
                                                          "seniors",
                                                          sub.seniors - 1,
                                                        )
                                                      }
                                                      className="p-1 hover:text-white"
                                                    >
                                                      <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="w-4 text-center text-xs font-bold">
                                                      {sub.seniors}
                                                    </span>
                                                    <button
                                                      onClick={() =>
                                                        updateSubDept(
                                                          dept.code,
                                                          sub.id,
                                                          "seniors",
                                                          sub.seniors + 1,
                                                        )
                                                      }
                                                      className="p-1 hover:text-white"
                                                    >
                                                      <Plus className="w-3 h-3" />
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl border border-white/5">
                                                  <span className="text-xs text-gray-300 font-medium">
                                                    Juniors:
                                                  </span>
                                                  <div className="flex items-center gap-2 bg-black/50 rounded-lg p-1">
                                                    <button
                                                      onClick={() =>
                                                        updateSubDept(
                                                          dept.code,
                                                          sub.id,
                                                          "juniors",
                                                          sub.juniors - 1,
                                                        )
                                                      }
                                                      className="p-1 hover:text-white"
                                                    >
                                                      <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="w-4 text-center text-xs font-bold">
                                                      {sub.juniors}
                                                    </span>
                                                    <button
                                                      onClick={() =>
                                                        updateSubDept(
                                                          dept.code,
                                                          sub.id,
                                                          "juniors",
                                                          sub.juniors + 1,
                                                        )
                                                      }
                                                      className="p-1 hover:text-white"
                                                    >
                                                      <Plus className="w-3 h-3" />
                                                    </button>
                                                  </div>
                                                </div>
                                              </>
                                            )}

                                            <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl border border-white/5">
                                              <span className="text-xs text-gray-300 font-medium flex items-center gap-1.5">
                                                <Clock className="w-3 h-3" />{" "}
                                                Speed:
                                              </span>
                                              <div className="flex items-center gap-1">
                                                {isExp ? (
                                                  <span className="w-12 text-center text-xs font-black text-white bg-black/50 py-1 rounded-md border border-white/10">
                                                    {sub.speed}
                                                  </span>
                                                ) : (
                                                  <input
                                                    type="number"
                                                    min="1"
                                                    value={sub.speed}
                                                    onChange={(e) =>
                                                      updateSubDept(
                                                        dept.code,
                                                        sub.id,
                                                        "speed",
                                                        e.target.value,
                                                      )
                                                    }
                                                    className="w-12 bg-black/50 border border-white/10 rounded-md px-1 py-0.5 text-center text-xs font-bold focus:outline-none"
                                                  />
                                                )}
                                                <span className="text-[10px] text-gray-400">
                                                  Days
                                                </span>
                                              </div>
                                            </div>
                                          </div>

                                          {/* Right Col: Money */}
                                          <div className="space-y-3">
                                            {!isExp && (
                                              <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl border border-white/5">
                                                <span className="text-xs text-gray-300 font-medium">
                                                  Wages:
                                                </span>
                                                <span className="text-xs font-bold text-gray-300">
                                                  ₦ {wages.toLocaleString()}
                                                </span>
                                              </div>
                                            )}

                                            <div className="flex flex-col bg-white/5 p-2.5 rounded-xl border border-white/10">
                                              <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-medium flex items-center gap-1.5 text-gray-300">
                                                  <Wallet className="w-3 h-3" />{" "}
                                                  Task Budget:
                                                </span>
                                                <span className="text-xs font-bold text-white">
                                                  ₦{" "}
                                                  {Number(
                                                    sub.aremuEstimate,
                                                  ).toLocaleString()}
                                                </span>
                                              </div>

                                              {/* User Budget Edit */}
                                              {!isExp && (
                                                <div className="flex items-center justify-between border-t border-white/5 pt-2">
                                                  <span className="text-[10px] text-gray-400">
                                                    Your Budget:
                                                  </span>
                                                  <div className="flex items-center gap-1">
                                                    <span className="text-[10px] text-gray-500">
                                                      ₦
                                                    </span>
                                                    <input
                                                      type="number"
                                                      value={sub.userBudget}
                                                      onChange={(e) =>
                                                        updateSubDept(
                                                          dept.code,
                                                          sub.id,
                                                          "userBudget",
                                                          e.target.value,
                                                        )
                                                      }
                                                      className="w-20 bg-black/50 border border-white/10 rounded-md px-1.5 py-0.5 text-xs text-gray-300 font-bold focus:outline-none focus:border-white/30"
                                                    />
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}

              {/* MANUAL OVERRIDE */}
              {!isAiAnalyzingDepts && (
                <div className="bg-[#111111]/50 border border-white/5 rounded-3xl p-5 md:p-6 shadow-md mb-10">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Department
                  </h3>
                  <div className="space-y-4">
                    <select
                      value={selectedDeptCode}
                      onChange={(e) => setSelectedDeptCode(e.target.value)}
                      className="w-full bg-black/80 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        Select from API database...
                      </option>
                      {apiDepartments.map((dept) => {
                        const isAdded = projectDepartments.some(
                          (p) => p.code === dept.department_code,
                        );
                        return (
                          <option
                            key={dept.department_code}
                            value={dept.department_code}
                            disabled={isAdded}
                          >
                            {dept.department_name} {isAdded ? "(Added)" : ""}
                          </option>
                        );
                      })}
                    </select>
                    {activeDeptPreview && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                      >
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm mt-4">
                          <p className="text-gray-300 mb-4 text-xs md:text-sm">
                            {activeDeptPreview.department_description}
                          </p>
                          <button
                            onClick={handleAddDepartmentManually}
                            className="w-full py-3 bg-white/10 text-white text-sm font-bold rounded-xl hover:bg-white hover:text-black transition-colors"
                          >
                            Add to Blueprint
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* GRAND TOTAL & CALL TO ACTION SECTION */}
              {!isAiAnalyzingDepts && projectDepartments.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-12 space-y-6"
                >
                  {/* The Estimate Banner */}
                  <div className="p-6 md:p-10 bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        Project Estimate
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        Calculated operational and task costs.
                      </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end">
                      {/* Aremu Estimate */}
                      <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
                        ₦ {aremuGrandTotal.toLocaleString()}
                      </div>

                      {/* User Budget (Only shows if different from Aremu Estimate) */}
                      {userGrandTotal !== aremuGrandTotal && (
                        <div className="text-sm font-medium text-gray-500 mt-2 flex items-center gap-2">
                          <span>Your Budget:</span>
                          <span className=" decoration-gray-600">
                            ₦ {userGrandTotal.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions: Download & Sign Up */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={handleDownloadConfig}
                      className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all text-white font-bold group"
                    >
                      <Download className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                      Download Blueprint
                    </button>

                    <button
                      onClick={() => alert("Redirecting to Signup Page...")}
                      className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-white text-black hover:bg-gray-200 transition-all font-bold shadow-lg hover:scale-[1.02]"
                    >
                      <UserPlus className="w-5 h-5" />
                      Save & Continue
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `,
        }}
      />
    </div>
  );
}
