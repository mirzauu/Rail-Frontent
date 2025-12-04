import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bot,
  MessageSquare,
  BookOpen,
  Cloud,
  ArrowRight,
  Clock,
  UserPlus,
} from "lucide-react";

const agents = [
  { name: "CSO Agent", role: "Chief Strategy Officer", status: "active" as const, lastMessage: "Completed market analysis for Q4", time: "2m ago" },
  { name: "CFO Agent", role: "Chief Financial Officer", status: "active" as const, lastMessage: "Updated cash flow projections", time: "5m ago" },
  { name: "COO Agent", role: "Chief Operating Officer", status: "idle" as const, lastMessage: "Process optimization review done", time: "1h ago" },
  { name: "CMO Agent", role: "Chief Marketing Officer", status: "active" as const, lastMessage: "Campaign metrics report ready", time: "15m ago" },
];

const recentDocs = [
  { title: "Q4 Strategy Deck", tags: ["Strategy", "Finance"], agent: "CSO", updated: "Today" },
  { title: "Budget Forecast 2024", tags: ["Finance"], agent: "CFO", updated: "Yesterday" },
  { title: "Ops Playbook v2", tags: ["Operations"], agent: "COO", updated: "2 days ago" },
];

const memoryHighlights = [
  { agent: "CSO", content: "Key decision: Expand to APAC market in Q2", type: "decision" },
  { agent: "CFO", content: "Risk flag: Currency exposure increased 15%", type: "risk" },
  { agent: "COO", content: "Task completed: Supply chain audit", type: "task" },
];

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Dashboard"
        description="Overview of your AI agents, memory, and knowledge base"
        actions={
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Last 7 days
          </Button>
        }
      />

      {/* KPI Strip */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Active Agents"
          value={4}
          change="+1 from last week"
          changeType="positive"
          icon={Bot}
        />
        <StatCard
          title="Conversations Today"
          value={127}
          change="+23% vs yesterday"
          changeType="positive"
          icon={MessageSquare}
        />
        <StatCard
          title="Docs in Knowledge Base"
          value={342}
          change="12 added this week"
          changeType="neutral"
          icon={BookOpen}
        />
        <StatCard
          title="Sync Status"
          value="Connected"
          change="Google Drive active"
          changeType="positive"
          icon={Cloud}
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Agent Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-base font-semibold">Recent Agent Activity</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {agents.map((agent) => (
                <div
                  key={agent.name}
                  className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {agent.name.split(" ")[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{agent.name}</span>
                        <StatusBadge status={agent.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">{agent.lastMessage}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{agent.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Documents */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-base font-semibold">Recent Documents</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                      <th className="pb-3">Title</th>
                      <th className="pb-3">Tags</th>
                      <th className="pb-3">Assigned Agent</th>
                      <th className="pb-3 text-right">Updated</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {recentDocs.map((doc) => (
                      <tr
                        key={doc.title}
                        className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        <td className="py-3 font-medium text-foreground">{doc.title}</td>
                        <td className="py-3">
                          <div className="flex gap-1.5">
                            {doc.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 text-muted-foreground">{doc.agent}</td>
                        <td className="py-3 text-right text-muted-foreground">{doc.updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Memory Highlights */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Memory Highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {memoryHighlights.map((memory, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border p-3 transition-colors hover:bg-muted/30"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-medium text-primary">{memory.agent}</span>
                    <span className="text-xs text-muted-foreground capitalize">• {memory.type}</span>
                  </div>
                  <p className="text-sm text-foreground">{memory.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* User Invites Widget */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Team Access</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex -space-x-2">
                  {["JD", "SM", "AK", "RB"].map((initials, i) => (
                    <div
                      key={i}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-primary/10 text-primary text-xs font-medium"
                    >
                      {initials}
                    </div>
                  ))}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-muted text-muted-foreground text-xs font-medium">
                    +3
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">2 pending invites</span>
                <Button size="sm" className="h-8">
                  <UserPlus className="mr-1.5 h-4 w-4" />
                  Invite
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
