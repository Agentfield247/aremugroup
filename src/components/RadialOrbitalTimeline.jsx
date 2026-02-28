"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RadialOrbitalTimeline({ timelineData }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [viewMode, setViewMode] = useState("orbital");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [centerOffset, setCenterOffset] = useState({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState(null);

  // DYNAMIC SCALE STATE: This holds the perfect size for the user's specific screen
  const [dynamicScale, setDynamicScale] = useState(1);

  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});

  // RESIZE OBSERVER: Automatically measures the screen and scales perfectly
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        // 550px is the natural width of the orbital ring.
        // This calculates the exact fraction needed to fit the screen.
        const perfectScale = Math.min(width / 550, height / 550, 1.1);
        setDynamicScale(perfectScale);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.2) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 240; // Massive radius
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)),
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId) => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  // UPDATED STYLES: Safely handles both the old keys and the new "required/optional" keys
  const getStatusStyles = (status) => {
    const lowerStatus = status?.toLowerCase() || "";
    switch (lowerStatus) {
      case "required":
      case "completed":
        return "text-black bg-white border-white";
      case "optional":
      case "in-progress":
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center bg-transparent overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {/* APPLIED DYNAMIC SCALE: Automatically resizes to fit any screen perfectly */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-300 origin-center"
        style={{ transform: `scale(${dynamicScale})` }}
      >
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Center Core */}
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-gray-500 via-gray-300 to-white animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-28 h-28 rounded-full border border-white/20 animate-ping opacity-70"></div>
            <div
              className="absolute w-36 h-36 rounded-full border border-white/10 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-12 h-12 rounded-full bg-black/80 backdrop-blur-md"></div>
          </div>

          <div className="absolute w-[480px] h-[480px] rounded-full border border-white/10"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            // CRASH PREVENTION: Safely grabs either 'allocation' or 'energy', defaults to 0 if neither exist.
            const allocationValue = item.allocation || item.energy || 0;
            const displayStatus = item.status || "Planned";

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
                    width: `${allocationValue * 0.5 + 40}px`,
                    height: `${allocationValue * 0.5 + 40}px`,
                    left: `-${(allocationValue * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(allocationValue * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-14 h-14 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-white text-black"
                      : isRelated
                        ? "bg-white/50 text-black"
                        : "bg-black text-white"
                  }
                  border-2
                  ${
                    isExpanded
                      ? "border-white shadow-lg shadow-white/30"
                      : isRelated
                        ? "border-white animate-pulse"
                        : "border-white/40"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-125" : ""}
                `}
                >
                  <Icon size={20} />
                </div>

                <div
                  className={`
                  absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-sm font-bold tracking-widest uppercase
                  transition-all duration-300
                  ${isExpanded ? "text-white scale-110" : "text-white/70"}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-72 bg-black/95 backdrop-blur-xl border-white/20 shadow-2xl shadow-white/5 overflow-visible z-[999]">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-white/50"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 py-1 text-[10px] tracking-wider uppercase ${getStatusStyles(
                            displayStatus,
                          )}`}
                        >
                          {displayStatus.replace("-", " ")}
                        </Badge>
                      </div>
                      <CardTitle className="text-base mt-2 text-white">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-400">
                      <p className="leading-relaxed">{item.content}</p>

                      <div className="mt-5 pt-4 border-t border-white/10">
                        <div className="flex justify-between items-center text-xs mb-2">
                          <span className="flex items-center text-gray-300">
                            <Layers size={12} className="mr-1" /> Resource
                            Allocation
                          </span>
                          <span className="font-mono text-white">
                            {allocationValue}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-gray-400 to-white"
                            style={{ width: `${allocationValue}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-white/10">
                          <div className="flex items-center mb-3">
                            <Link size={12} className="text-white/50 mr-1.5" />
                            <h4 className="text-xs uppercase tracking-wider font-semibold text-white/50">
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId,
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-7 px-3 py-0 text-xs rounded-sm border-white/20 bg-transparent hover:bg-white/10 text-gray-300 hover:text-white transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={10}
                                    className="ml-1.5 text-white/40"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
