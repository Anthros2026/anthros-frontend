"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

interface TechNode {
  id: string;
  label: string;
  icon?: string;
  type: "tech" | "ai";
}

const allItems: TechNode[] = [
  { id: "java", label: "Java", icon: "mdi:language-java", type: "tech" },
  { id: "python", label: "Python", icon: "mdi:language-python", type: "tech" },
  { id: "nodejs", label: "Node.js", icon: "mdi:nodejs", type: "tech" },
  { id: "react", label: "React", icon: "mdi:react", type: "tech" },
  { id: "sql", label: "SQL", icon: "mdi:database", type: "tech" },
  { id: "azure", label: "Azure", icon: "mdi:microsoft-azure", type: "tech" },
  { id: "aws", label: "AWS", icon: "mdi:aws", type: "tech" },
  { id: "php", label: "PHP", icon: "mdi:language-php", type: "tech" },
  { id: "svelte", label: "Svelte", icon: "simple-icons:svelte", type: "tech" },
  { id: "go", label: "Go", icon: "mdi:language-go", type: "tech" },
  { id: "csharp", label: "C#", icon: "mdi:language-csharp", type: "tech" },
  { id: "angular", label: "Angular", icon: "mdi:angular", type: "tech" },
  { id: "mcp", label: "MCP", type: "ai" },
  { id: "prompt-eng", label: "Prompt Eng.", type: "ai" },
  { id: "agentic", label: "Agentic", type: "ai" },
  { id: "skills-tools", label: "Skills & Tools", type: "ai" },
  { id: "rag", label: "RAG", type: "ai" },
];

const techItems = allItems.filter((i) => i.type === "tech");
const aiItems = allItems.filter((i) => i.type === "ai");

const nodePositions = [
  { x: 22, y: 16 },
  { x: 50, y: 14 },
  { x: 78, y: 18 },
  { x: 18, y: 42 },
  { x: 50, y: 40 },
  { x: 82, y: 44 },
  { x: 22, y: 68 },
  { x: 50, y: 66 },
  { x: 78, y: 70 },
];

const connectionPairs = [
  [0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8],
  [0, 3], [1, 4], [2, 5], [3, 6], [4, 7], [5, 8],
  [0, 4], [4, 8], [2, 4], [4, 6],
  [1, 3], [1, 5], [3, 7], [5, 7],
  [0, 5], [2, 3], [6, 5], [8, 3],
];

const ALL_POSITIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

interface ActiveNode {
  item: TechNode;
  positionIndex: number;
  key: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function pickBalancedSet(): TechNode[] {
  const techs = shuffleArray(techItems).slice(0, 4);
  const ais = shuffleArray(aiItems).slice(0, 3);
  return shuffleArray([...techs, ...ais]);
}

export function NeuralTechNetwork({ className = "" }: { className?: string }) {
  const [activeNodes, setActiveNodes] = useState<ActiveNode[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const positions = shuffleArray(ALL_POSITIONS).slice(0, 7);
    const items = pickBalancedSet();
    const nodes: ActiveNode[] = items.map((item, i) => ({
      item,
      positionIndex: positions[i],
      key: `${item.id}-init-${positions[i]}`,
    }));
    setActiveNodes(nodes);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (tick === 0) return;

    setActiveNodes((prev) => {
      const next = [...prev];

      const removeIdx = Math.floor(Math.random() * next.length);
      next.splice(removeIdx, 1);

      const usedPositions = new Set(next.map((n) => n.positionIndex));
      const emptyPositions = ALL_POSITIONS.filter((p) => !usedPositions.has(p));
      const newPosition = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];

      const usedItems = new Set(next.map((n) => n.item.id));
      const remainingTech = next.filter((n) => n.item.type === "tech").length;
      const remainingAI = next.filter((n) => n.item.type === "ai").length;

      let pool: TechNode[];
      if (remainingTech < 2) {
        pool = techItems.filter((it) => !usedItems.has(it.id));
      } else if (remainingAI < 2) {
        pool = aiItems.filter((it) => !usedItems.has(it.id));
      } else {
        pool = allItems.filter((it) => !usedItems.has(it.id));
      }

      if (pool.length === 0) {
        pool = allItems.filter((it) => !usedItems.has(it.id));
      }

      const newItem = pool[Math.floor(Math.random() * pool.length)];
      next.push({
        item: newItem,
        positionIndex: newPosition,
        key: `${newItem.id}-${tick}-${newPosition}`,
      });

      return next;
    });
  }, [tick]);

  const activePositionSet = new Set(activeNodes.map((n) => n.positionIndex));
  const visibleConnections = connectionPairs.filter(
    ([from, to]) => activePositionSet.has(from) && activePositionSet.has(to)
  );

  return (
    <div
      className={`relative w-full aspect-square max-w-[540px] rounded-2xl overflow-hidden bg-[#060610] border border-white/[0.06] shadow-[0_0_80px_-20px_rgba(93,114,233,0.12)] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(93,114,233,0.03)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(46,144,123,0.03)_0%,transparent_50%)]" />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="line-glow">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {visibleConnections.map(([from, to], i) => (
          <motion.line
            key={`conn-${from}-${to}`}
            x1={nodePositions[from].x}
            y1={nodePositions[from].y}
            x2={nodePositions[to].x}
            y2={nodePositions[to].y}
            stroke="rgba(140, 160, 220, 0.22)"
            strokeWidth="0.3"
            filter="url(#line-glow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.9, 0.4, 0.8, 0.3] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut",
            }}
          />
        ))}

        {visibleConnections.map(([from, to], i) => (
          <motion.line
            key={`conn-bright-${from}-${to}`}
            x1={nodePositions[from].x}
            y1={nodePositions[from].y}
            x2={nodePositions[to].x}
            y2={nodePositions[to].y}
            stroke="rgba(180, 195, 255, 0.1)"
            strokeWidth="0.7"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0.15, 0.6, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      <AnimatePresence>
        {activeNodes.map((node) => {
          const pos = nodePositions[node.positionIndex];
          const isAI = node.item.type === "ai";
          const glowColor = isAI
            ? "rgba(46, 144, 123, 0.5)"
            : "rgba(93, 114, 233, 0.5)";
          const ringColor = isAI
            ? "border-accent-green/30"
            : "border-accent-blue/30";
          const dotColor = isAI ? "bg-accent-green" : "bg-accent-blue";

          return (
            <motion.div
              key={node.key}
              className="absolute"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                className={`relative flex items-center justify-center w-14 h-14 -ml-7 -mt-7 rounded-full border ${ringColor} bg-[#060610] backdrop-blur-none`}
                animate={{
                  boxShadow: [
                    `0 0 0px 0px ${glowColor}`,
                    `0 0 20px 5px ${glowColor}`,
                    `0 0 6px 2px ${glowColor}`,
                    `0 0 16px 4px ${glowColor}`,
                    `0 0 0px 0px ${glowColor}`,
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {node.item.icon ? (
                  <Icon
                    icon={node.item.icon}
                    className="w-7 h-7 text-white/90"
                  />
                ) : (
                  <div
                    className={`w-4 h-4 rounded-full ${dotColor} opacity-90`}
                  />
                )}
              </motion.div>

              <span className="absolute top-[32px] left-0 -translate-x-1/2 text-[11px] font-mono text-white/70 whitespace-nowrap tracking-wide text-center">
                {node.item.label}
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-accent-blue shadow-[0_0_6px_1px_rgba(93,114,233,0.5)]" />
          <span className="text-[10px] font-mono uppercase tracking-tech text-white/50">
            Tecnologias
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-accent-green shadow-[0_0_6px_1px_rgba(46,144,123,0.5)]" />
          <span className="text-[10px] font-mono uppercase tracking-tech text-white/50">
            IA
          </span>
        </div>
      </div>
    </div>
  );
}
