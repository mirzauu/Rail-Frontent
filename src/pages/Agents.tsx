import { useState } from "react";
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
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

// Define AI agents with their details
const aiAgents = {
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

// Sample conversation with multiple agents
const conversation = [
  {
    id: 1,
    type: "user",
    content: "Can you provide a budget breakdown for these initiatives?",
    time: "10:07"
  },
  {
    id: 2,
    type: "agent",
    agent: "cfo",
    content: "I've prepared a comprehensive financial model. The total investment required is $2.4M spread across Q1-Q2. Expected ROI is 180% within 18 months. Here's the breakdown: Digital transformation ($950K), Customer experience ($800K), Strategic partnerships ($650K). We have adequate runway and can finance this through existing reserves.",
    time: "10:15"
  },
  {
    id: 3,
    type: "agent",
    agent: "coo",
    content: "From an operational standpoint, we can execute this plan with our current infrastructure. However, I recommend establishing a dedicated project management office to ensure seamless coordination across departments. Timeline: 6-8 weeks for setup, full deployment by March.",
    time: "10:17"
  },
  {
    id: 4,
    type: "user",
    content: "What about talent requirements?",
    time: "10:19"
  },
  {
    id: 5,
    type: "agent",
    agent: "chro",
    content: "Excellent question. We'll need to hire 12 specialists across AI/ML, customer success, and partnership development. I've already identified top candidates through our talent network. Additionally, we should upskill 25 existing employees through targeted training programs. Estimated timeline: 8 weeks for hiring, 4 weeks for onboarding.",
    time: "10:21"
  }
];

export default function Agents() {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  return (
    <div className="flex h-full w-full bg-background overflow-hidden border-t border-border">
      {/* Left Sidebar - Chat History */}
      <div
        className={cn(
          "flex flex-col border-border bg-card/30 transition-all duration-300 ease-in-out",
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
              {[
                { title: "Client calendar issues", hasMenu: true, isActive: false },
                { title: "Improve prompt architecture", hasMenu: false, isActive: true },
                { title: "Feature explanation", hasMenu: false, isActive: false },
                { title: "Improve email clarity", hasMenu: false, isActive: false },
                { title: "kimberly", hasMenu: false, isActive: false },
                { title: "Gmail and Drive setup", hasMenu: false, isActive: false },
                { title: "Email reply draft", hasMenu: false, isActive: false },
                { title: "HTML email format fix", hasMenu: false, isActive: false },
                { title: "Rework conversation code", hasMenu: false, isActive: false },
                { title: "Image quality improvement", hasMenu: false, isActive: false },
                { title: "Image editing request", hasMenu: false, isActive: false }
              ].map((chat, i) => (
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
      <div className="flex-1 flex flex-col min-w-0 bg-background relative transition-all duration-300">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50 h-[60px]">
          <div className="flex items-center gap-2">
            {!isLeftSidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground mr-2"
                onClick={() => setIsLeftSidebarOpen(true)}
              >
                <PanelLeft className="h-4 w-4" />
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
            {conversation.map((message) => {
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
                const AgentIcon = agent.icon;

                return (
                  <div key={message.id} className="flex items-start gap-3">
                    <Avatar className={cn("h-8 w-8 flex-shrink-0", agent.color)}>
                      <AvatarFallback className={cn(agent.color, "text-white")}>
                        <AgentIcon className="h-4 w-4" />
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
        <div className="p-4 border-t border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-4xl mx-auto relative">
            <div className="relative flex items-end gap-2 bg-muted/30 border border-border rounded-xl p-2 focus-within:ring-1 focus-within:ring-ring focus-within:border-ring transition-all">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground flex-shrink-0 mb-0.5">
                <Paperclip className="h-5 w-5" />
              </Button>
              <textarea
                placeholder="Ask anything..."
                className="flex-1 bg-transparent border-0 focus:ring-0 resize-none max-h-32 min-h-[2.5rem] py-2.5 text-sm scrollbar-thin outline-none"
                rows={1}
                style={{ height: '44px' }}
              />
              <div className="flex items-center gap-1 mb-0.5">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button size="icon" className="h-9 w-9 rounded-lg">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-center mt-2">
              <p className="text-[10px] text-muted-foreground">
                AI can make mistakes. Check important info.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Context */}
      <div
        className={cn(
          "flex flex-col border-border bg-card/30 transition-all duration-300 ease-in-out",
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
