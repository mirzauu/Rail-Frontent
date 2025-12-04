import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Bot,
  Brain,
  BookOpen,
  MessageSquare,
  Users,
  Plug,
  Settings,
  ChevronLeft,
  Train,
  Cog,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const agents = [
  { id: "cso", name: "Michael", role: "CSO", icon: Bot },
  { id: "cfo", name: "David", role: "CFO", letter: "G" },
  { id: "coo", name: "John", role: "COO", letter: "H" },
  { id: "cmo", name: "Sarah", role: "CMO", letter: "M" },
  { id: "cto", name: "Emily", role: "CTO", icon: Cog },
];

const memoryItems = [
  { icon: Brain, label: "Memory", path: "/memory", rightIcon: Brain },
  { icon: BookOpen, label: "Knowledge Base", path: "/knowledge", rightIcon: Brain },
];

const managementItems = [
  { icon: MessageSquare, label: "Users", path: "/users", rightIcon: Settings },
  { icon: Users, label: "Integrations", path: "/integrations", rightLabel: "Settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentAgentId = location.pathname.split("/agents/")[1] || agents[0].id;

  return (
    <aside
      className={cn(
        "flex h-full flex-col bg-[#1e2023] transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5">
        {!collapsed && (
          <>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Train className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-white">
              RailVision
            </span>
          </>
        )}
        {collapsed && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary mx-auto">
            <Train className="h-5 w-5 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Dashboard Link */}
      {!collapsed && (
        <div className="px-5 pb-4">
          <NavLink
            to="/"
            className={cn(
              "flex items-center justify-center py-2 text-lg font-semibold transition-colors",
              location.pathname === "/" ? "text-white" : "text-gray-400 hover:text-white"
            )}
          >
            Dashboard
          </NavLink>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-4">
        {/* AGENT Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2 px-2 py-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {!collapsed ? "Agent" : ""}
            </span>
            {!collapsed && <div className="flex-1 h-px bg-gray-700" />}
          </div>

          <div className="space-y-1">
            {agents.map((agent) => {
              const isAgentActive = location.pathname === `/agents/${agent.id}`;
              const AgentIcon = agent.icon;

              return (
                <NavLink
                  key={agent.id}
                  to={`/agents/${agent.id}`}
                  className={cn(
                    "flex items-center gap-3 rounded-full px-3 py-2.5 text-sm transition-all duration-200",
                    isAgentActive
                      ? "bg-primary text-white"
                      : "text-gray-300 hover:bg-gray-700/50"
                  )}
                >
                  {AgentIcon ? (
                    <div className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full",
                      isAgentActive ? "bg-primary-foreground/20" : "bg-gray-600"
                    )}>
                      <AgentIcon className="h-4 w-4" />
                    </div>
                  ) : (
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className={cn(
                        "text-xs font-medium",
                        isAgentActive ? "bg-primary-foreground/20 text-white" : "bg-gray-600 text-gray-300"
                      )}>
                        {agent.letter}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  {!collapsed && (
                    <span className="font-medium">
                      {agent.name} ({agent.role})
                      {isAgentActive && <span className="text-primary-foreground/70"> ({agent.role})</span>}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* MEMORY Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2 px-2 py-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {!collapsed ? "Memory" : ""}
            </span>
            {!collapsed && <div className="flex-1 h-px bg-gray-700" />}
          </div>

          <div className="space-y-1">
            {memoryItems.map((item) => {
              const isActive = location.pathname === item.path;
              const RightIcon = item.rightIcon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                    isActive
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700/50"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 font-medium">{item.label}</span>
                      <RightIcon className="h-5 w-5 text-gray-500" />
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* MANAGEMENT Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2 px-2 py-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {!collapsed ? "Management" : ""}
            </span>
            {!collapsed && <div className="flex-1 h-px bg-gray-700" />}
          </div>

          <div className="space-y-1">
            {managementItems.map((item) => {
              const isActive = location.pathname === item.path;
              const RightIcon = item.rightIcon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                    isActive
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700/50"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 font-medium">{item.label}</span>
                      {RightIcon && <RightIcon className="h-5 w-5 text-gray-500" />}
                      {item.rightLabel && <span className="text-sm text-gray-500">{item.rightLabel}</span>}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Collapse button */}
      <div className="border-t border-gray-700 p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full justify-center text-gray-400 hover:text-white hover:bg-gray-700/50",
            !collapsed && "justify-start"
          )}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              collapsed && "rotate-180"
            )}
          />
          {!collapsed && <span className="ml-2 text-sm">Collapse</span>}
        </Button>
      </div>
    </aside>
  );
}
