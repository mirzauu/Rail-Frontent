import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Search,
  Globe,
  PanelLeft,
  PanelRight,
  Info,
  SlidersHorizontal,
  MoreVertical,
  Pin,
  Copy,
  ThumbsUp,
  ThumbsDown,
  FileText,
  Sparkles,
  ArrowRight,
  ChevronDown,
  CheckSquare,
  Send,
  Paperclip,
  Mic,
  DollarSign,
  Settings,
  Users,
  TrendingUp,
  Code,
  Plus,
  Check,
  Zap,
  Bot,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define AI agents with their details
const aiAgents: Record<string, { name: string; role: string; icon: any; color: string; textColor: string }> = {
  cso: {
    name: "Michael Chen",
    role: "CSO",
    icon: Shield,
    color: "bg-red-500",
    textColor: "text-red-500"
  },
  cfo: {
    name: "Elena Rodriguez",
    role: "CFO",
    icon: DollarSign,
    color: "bg-orange-500",
    textColor: "text-orange-500"
  },
  coo: {
    name: "David Kumar",
    role: "COO",
    icon: Settings,
    color: "bg-purple-500",
    textColor: "text-purple-500"
  },
  chro: {
    name: "Amelia Foster",
    role: "CHRO",
    icon: Users,
    color: "bg-pink-500",
    textColor: "text-pink-500"
  },
  cmo: {
    name: "Sarah Chen",
    role: "CMO",
    icon: TrendingUp,
    color: "bg-blue-500",
    textColor: "text-blue-500"
  },
  cto: {
    name: "Marcus Johnson",
    role: "CTO",
    icon: Code,
    color: "bg-green-500",
    textColor: "text-green-500"
  }
};

// Agent-specific conversations
const agentConversations: Record<string, { id: number; type: string; agent?: string; content: string; time: string }[]> = {
  cso: [
    { id: 1, type: "user", content: "What are the key security risks we should address this quarter?", time: "09:30" },
    { id: 2, type: "agent", agent: "cso", content: "Based on my analysis, we have three critical areas to address: 1) Cloud infrastructure security gaps that need immediate patching, 2) Employee security awareness training is overdue for 40% of staff, and 3) Third-party vendor access controls need strengthening. I recommend prioritizing the cloud security patches this week.", time: "09:35" },
    { id: 3, type: "user", content: "What's the estimated budget for these security improvements?", time: "09:40" },
    { id: 4, type: "agent", agent: "cso", content: "For comprehensive coverage: Cloud security upgrades ($180K), Security awareness program ($45K), Vendor management platform ($75K). Total investment: $300K. This will reduce our risk exposure by approximately 60% and bring us into full compliance with SOC 2 requirements.", time: "09:45" },
  ],
  cfo: [
    { id: 1, type: "user", content: "Can you provide a budget breakdown for these initiatives?", time: "10:07" },
    { id: 2, type: "agent", agent: "cfo", content: "I've prepared a comprehensive financial model. The total investment required is $2.4M spread across Q1-Q2. Expected ROI is 180% within 18 months. Here's the breakdown: Digital transformation ($950K), Customer experience ($800K), Strategic partnerships ($650K). We have adequate runway and can finance this through existing reserves.", time: "10:15" },
    { id: 3, type: "user", content: "What's our current cash position?", time: "10:20" },
    { id: 4, type: "agent", agent: "cfo", content: "Our current cash reserves stand at $8.2M with a monthly burn rate of $420K. We have 19 months of runway. The proposed $2.4M investment would reduce this to 14 months, which is still within our comfortable threshold. Revenue projections show break-even on these initiatives by month 8.", time: "10:25" },
  ],
  coo: [
    { id: 1, type: "user", content: "How can we improve our operational efficiency?", time: "11:00" },
    { id: 2, type: "agent", agent: "coo", content: "From an operational standpoint, I've identified three key opportunities: 1) Automating our order processing could reduce fulfillment time by 35%, 2) Consolidating our warehouse locations would save $200K annually, 3) Implementing predictive maintenance would reduce equipment downtime by 50%. I recommend starting with order automation.", time: "11:08" },
    { id: 3, type: "user", content: "What's the timeline for the automation project?", time: "11:15" },
    { id: 4, type: "agent", agent: "coo", content: "The automation project would take 12 weeks: Phase 1 (weeks 1-4) - System integration and testing, Phase 2 (weeks 5-8) - Pilot with 20% of orders, Phase 3 (weeks 9-12) - Full rollout and optimization. We can run this parallel to current operations with minimal disruption.", time: "11:20" },
  ],
  cmo: [
    { id: 1, type: "user", content: "What marketing strategies should we focus on for Q2?", time: "14:00" },
    { id: 2, type: "agent", agent: "cmo", content: "Based on our Q1 performance data, I recommend three priority strategies: 1) Double down on LinkedIn content - it's driving 45% of our qualified leads, 2) Launch a customer referral program - our NPS of 72 indicates strong advocacy potential, 3) Invest in video marketing - video content has 3x engagement vs. static posts. Budget allocation: Content (40%), Referral program (30%), Video production (30%).", time: "14:10" },
    { id: 3, type: "user", content: "How do we measure success for these campaigns?", time: "14:18" },
    { id: 4, type: "agent", agent: "cmo", content: "Key metrics by initiative: LinkedIn - target 500 MQLs/month (currently 320), Referral program - aim for 15% of new customers from referrals, Video content - 10K views per video average with 8% CTR. I'll set up a weekly dashboard tracking pipeline impact, cost per lead, and conversion rates at each funnel stage.", time: "14:25" },
  ],
  cto: [
    { id: 1, type: "user", content: "What's the status of our cloud migration project?", time: "15:30" },
    { id: 2, type: "agent", agent: "cto", content: "We're 65% complete on the migration to AWS. Core services are live in production. Remaining work: Database migration (2 weeks), Legacy API modernization (3 weeks), and final security hardening (1 week). We've already seen 40% improvement in API response times and 25% reduction in infrastructure costs.", time: "15:38" },
    { id: 3, type: "user", content: "Any technical debt we should address?", time: "15:45" },
    { id: 4, type: "agent", agent: "cto", content: "Critical technical debt items: 1) Monolithic auth service needs to be split into microservices - blocking scalability, 2) Test coverage is at 45%, should be 80%+, 3) CI/CD pipeline needs optimization - builds taking 25 mins, target is 8 mins. I propose dedicating 20% of sprint capacity to debt reduction over the next 3 sprints.", time: "15:52" },
  ],
};

// AI Models
const aiModels = [
  { id: "auto", name: "Auto", description: "Automatically select the best model", icon: Zap },
  { id: "claude", name: "Claude", description: "Anthropic Claude 3.5 Sonnet", icon: Bot },
  { id: "gpt", name: "GPT", description: "OpenAI GPT-4o", icon: Bot },
  { id: "perplexity", name: "Perplexity", description: "Perplexity Sonar", icon: Globe },
];

// Chat history for each agent
const agentChatHistory: Record<string, { title: string; hasMenu: boolean; isActive: boolean }[]> = {
  cso: [
    { title: "Q1 Security audit review", hasMenu: true, isActive: false },
    { title: "Risk assessment framework", hasMenu: false, isActive: true },
    { title: "Compliance policy update", hasMenu: false, isActive: false },
    { title: "Strategic roadmap 2025", hasMenu: false, isActive: false },
    { title: "Cybersecurity budget", hasMenu: false, isActive: false },
    { title: "Vendor risk analysis", hasMenu: false, isActive: false },
    { title: "Data protection strategy", hasMenu: false, isActive: false },
    { title: "Incident response plan", hasMenu: false, isActive: false },
  ],
  cfo: [
    { title: "Q4 Financial report", hasMenu: true, isActive: false },
    { title: "Budget allocation 2025", hasMenu: false, isActive: true },
    { title: "Revenue forecast analysis", hasMenu: false, isActive: false },
    { title: "Cost optimization plan", hasMenu: false, isActive: false },
    { title: "Investment portfolio review", hasMenu: false, isActive: false },
    { title: "Cash flow projections", hasMenu: false, isActive: false },
    { title: "Tax strategy planning", hasMenu: false, isActive: false },
    { title: "Quarterly earnings call", hasMenu: false, isActive: false },
  ],
  coo: [
    { title: "Operations efficiency review", hasMenu: true, isActive: false },
    { title: "Supply chain optimization", hasMenu: false, isActive: true },
    { title: "Process automation plan", hasMenu: false, isActive: false },
    { title: "Facility expansion", hasMenu: false, isActive: false },
    { title: "Vendor management", hasMenu: false, isActive: false },
    { title: "Quality assurance metrics", hasMenu: false, isActive: false },
    { title: "Logistics improvement", hasMenu: false, isActive: false },
    { title: "Operational KPIs dashboard", hasMenu: false, isActive: false },
  ],
  cmo: [
    { title: "Brand strategy 2025", hasMenu: true, isActive: false },
    { title: "Marketing campaign ROI", hasMenu: false, isActive: true },
    { title: "Social media analytics", hasMenu: false, isActive: false },
    { title: "Customer acquisition plan", hasMenu: false, isActive: false },
    { title: "Content marketing strategy", hasMenu: false, isActive: false },
    { title: "Product launch timeline", hasMenu: false, isActive: false },
    { title: "Competitor analysis", hasMenu: false, isActive: false },
    { title: "Customer feedback review", hasMenu: false, isActive: false },
  ],
  cto: [
    { title: "Tech stack modernization", hasMenu: true, isActive: false },
    { title: "Cloud migration strategy", hasMenu: false, isActive: true },
    { title: "API architecture review", hasMenu: false, isActive: false },
    { title: "DevOps pipeline setup", hasMenu: false, isActive: false },
    { title: "Security infrastructure", hasMenu: false, isActive: false },
    { title: "AI/ML implementation", hasMenu: false, isActive: false },
    { title: "Technical debt reduction", hasMenu: false, isActive: false },
    { title: "Engineering team scaling", hasMenu: false, isActive: false },
  ],
};

export default function Agents() {
  const { agentId } = useParams<{ agentId: string }>();
  
  // Check if mobile on initial render
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(!isMobile);
  const [selectedModel, setSelectedModel] = useState("auto");

  // Get chat history and conversation based on current agent
  const currentChatHistory = agentChatHistory[agentId || "cso"] || agentChatHistory.cso;
  const currentConversation = agentConversations[agentId || "cso"] || agentConversations.cso;

  return (
    <div className="flex h-full w-full bg-background overflow-hidden border-t border-border">
      {/* Left Sidebar - Chat History */}
      <div
        className={cn(
          "flex flex-col border-border bg-[#f8fafc] dark:bg-card/30 transition-all duration-300 ease-in-out",
          isLeftSidebarOpen
            ? "w-[280px] lg:w-[320px] flex-shrink-0 border-r"
            : "w-0 overflow-hidden opacity-0"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border/50 min-w-[280px]">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <span>Chat History</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            onClick={() => setIsLeftSidebarOpen(false)}
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col min-w-[280px]">
          {/* Search Bar */}
          <div className="p-3 space-y-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-9 bg-background border-border h-9"
              />
            </div>

            {/* New Chat Button */}
            <Button
              variant="outline"
              className="w-full justify-start gap-2 h-9"
            >
              <Plus className="h-4 w-4" />
              New chat
            </Button>
          </div>

          {/* Chat History List */}
          <div className="flex-1 overflow-auto">
            {/* Your chats header */}
            <div className="px-3 py-2 flex items-center justify-between group">
              <span className="text-sm text-muted-foreground font-medium">Your chats</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>

            {/* Chat list */}
            <div className="space-y-0.5">
              {currentChatHistory.map((chat, i) => (
                <div
                  key={i}
                  className={cn(
                    "px-3 py-2.5 flex items-center justify-between group cursor-pointer transition-colors relative",
                    chat.isActive
                      ? "bg-muted/70"
                      : "hover:bg-muted/50"
                  )}
                >
                  <span className={cn(
                    "text-sm truncate pr-2",
                    chat.isActive ? "text-foreground font-medium" : "text-foreground/80"
                  )}>
                    {chat.title}
                  </span>
                  {chat.isActive && (
                    <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  )}
                  {chat.hasMenu && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    >
                      <MoreVertical className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#fefcf8] dark:bg-background relative transition-all duration-300">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50 h-[60px]">
          <div className="flex items-center gap-2">
            {!isLeftSidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground mr-2"
                onClick={() => setIsLeftSidebarOpen(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
            <h2 className="font-semibold text-lg">Chat</h2>
            <Info className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
            {!isRightSidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground ml-2"
                onClick={() => setIsRightSidebarOpen(true)}
              >
                <PanelRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Chat Content */}
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6 pb-4">
            {/* Conversation Messages */}
            {currentConversation.map((message) => {
              if (message.type === "user") {
                return (
                  <div key={message.id} className="flex justify-end items-start gap-3">
                    <div className="flex flex-col items-end max-w-[70%]">
                      <div className="bg-primary text-primary-foreground px-4 py-3 rounded-2xl rounded-tr-sm">
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">{message.time}</span>
                    </div>
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        You
                      </AvatarFallback>
                    </Avatar>
                  </div>
                );
              } else {
                const agent = aiAgents[message.agent as keyof typeof aiAgents];

                return (
                  <div key={message.id} className="flex items-start gap-3">
                    <Avatar className={cn("h-8 w-8 flex-shrink-0", agent.color)}>
                      <AvatarFallback className={cn(agent.color, "text-white")}>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col flex-1 max-w-[85%]">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-foreground">{agent.name}</span>
                        <span className={cn("text-xs font-medium", agent.textColor)}>{agent.role}</span>
                      </div>
                      <div className="bg-muted/50 border border-border/50 px-4 py-3 rounded-2xl rounded-tl-sm">
                        <p className="text-sm leading-relaxed text-foreground/90">{message.content}</p>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">{message.time}</span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 bg-[#fefcf8] dark:bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#f8fafc] dark:bg-muted/50 border border-border rounded-xl overflow-hidden">
              {/* Input Field */}
              <div className="px-4 pt-3">
                <input
                  type="text"
                  placeholder="Ask a follow-up"
                  className="w-full bg-transparent text-foreground placeholder-muted-foreground text-sm outline-none"
                />
              </div>

              {/* Toolbar */}
              <div className="flex items-center justify-between px-3 py-2">
                {/* Left side icons */}
                <div className="flex items-center gap-1">
                  {/* <Button
                    size="icon"
                    className="h-8 w-8 rounded-lg bg-primary hover:bg-primary/90"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </Button>
                  <div className="w-px h-5 bg-border mx-1" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <Sparkles className="h-4 w-4" />
                  </Button> */}
                </div>

                {/* Right side icons */}
                <div className="flex items-center gap-1">
                  {/* <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <Globe className="h-4 w-4" />
                  </Button> */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="7" height="7" rx="1" />
                          <rect x="14" y="3" width="7" height="7" rx="1" />
                          <rect x="3" y="14" width="7" height="7" rx="1" />
                          <rect x="14" y="14" width="7" height="7" rx="1" />
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-52">
                      {aiModels.map((model) => (
                        <DropdownMenuItem
                          key={model.id}
                          onClick={() => setSelectedModel(model.id)}
                          className="flex items-center gap-2 py-2 cursor-pointer"
                        >
                          <div className="flex-1">
                            <div className="font-medium text-sm">{model.name}</div>
                            <div className="text-xs text-muted-foreground">{model.description}</div>
                          </div>
                          {selectedModel === model.id && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    className="h-8 w-8 rounded-lg bg-muted hover:bg-muted/80 text-foreground"
                  >
                    <ArrowRight className="h-4 w-4 -rotate-90" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Context */}
      <div
        className={cn(
          "flex flex-col border-border bg-[#f8fafc] dark:bg-card/30 transition-all duration-300 ease-in-out",
          isRightSidebarOpen
            ? "w-[300px] lg:w-[350px] flex-shrink-0 border-l"
            : "w-0 overflow-hidden opacity-0"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border/50 h-[60px] min-w-[300px]">
          <h2 className="font-semibold text-lg">Context</h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            onClick={() => setIsRightSidebarOpen(false)}
          >
            <PanelRight className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4 min-w-[300px]">
          <div className="space-y-6">
            {/* Context Note */}
            <div className="bg-secondary/30 rounded-lg p-3 text-sm text-foreground/80 leading-relaxed">
              Discussion focusing on budget breakdown and resource allocation for Q1-Q2 initiatives across digital transformation, customer experience, and strategic partnerships.
            </div>

            {/* Docs Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-semibold text-sm">Docs</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 py-1 text-muted-foreground hover:text-foreground cursor-pointer">
                  <ChevronDown className="h-4 w-4" />
                  <span className="text-sm font-medium">Thread Summary</span>
                </div>

                <div className="pl-2 space-y-2 mt-2">
                  {[
                    { name: "Q1-Q2 Financial Model.xlsx", type: "spreadsheet" },
                    { name: "Talent Acquisition Strategy.pdf", type: "pdf" },
                    { name: "Project Timeline.doc", type: "doc" }
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-foreground/80 truncate">{doc.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Related Memory */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-semibold text-sm">Related Memory</span>
              </div>
              <div className="space-y-2">
                {[
                  "Budget Planning Session (Dec 1)",
                  "Talent Network Review (Nov 28)",
                  "Infrastructure Assessment (Nov 25)"
                ].map((memory, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <FileText className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground/80 leading-tight line-clamp-2">
                      {memory}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
