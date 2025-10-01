import { useState } from "react";
import { Shield, Cookie, Lock, Globe, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MetricCard } from "@/components/MetricCard";
import { CookieCard } from "@/components/CookieCard";
import { RiskGauge } from "@/components/RiskGauge";
import { toast } from "sonner";

// Mock data
const generateMockCookies = () => [
  { id: "1", name: "_ga", domain: "google-analytics.com", isSecure: true, isHttpOnly: false, isThirdParty: true },
  { id: "2", name: "session_id", domain: "example.com", isSecure: true, isHttpOnly: true, isThirdParty: false },
  { id: "3", name: "fbp", domain: "facebook.com", isSecure: false, isHttpOnly: false, isThirdParty: true },
  { id: "4", name: "auth_token", domain: "example.com", isSecure: true, isHttpOnly: true, isThirdParty: false },
  { id: "5", name: "tracking_id", domain: "tracker.com", isSecure: false, isHttpOnly: false, isThirdParty: true },
  { id: "6", name: "preferences", domain: "example.com", isSecure: true, isHttpOnly: false, isThirdParty: false },
  { id: "7", name: "ad_id", domain: "doubleclick.net", isSecure: true, isHttpOnly: false, isThirdParty: true },
  { id: "8", name: "csrf_token", domain: "example.com", isSecure: true, isHttpOnly: true, isThirdParty: false },
];

const Index = () => {
  const [cookies, setCookies] = useState(generateMockCookies());
  const [mockMode, setMockMode] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const totalCookies = cookies.length;
  const secureCookies = cookies.filter((c) => c.isSecure).length;
  const httpOnlyCookies = cookies.filter((c) => c.isHttpOnly).length;
  const thirdPartyCookies = cookies.filter((c) => c.isThirdParty).length;
  const securePercentage = Math.round((secureCookies / totalCookies) * 100);
  const httpOnlyPercentage = Math.round((httpOnlyCookies / totalCookies) * 100);
  const riskScore = Math.round((thirdPartyCookies / totalCookies) * 100) / 10;

  const handleDelete = (id: string) => {
    setCookies(cookies.filter((c) => c.id !== id));
    toast.success("Cookie deleted", {
      description: "Cookie has been removed from your browser",
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCookies(generateMockCookies());
      setIsRefreshing(false);
      toast.success("Cookies refreshed", {
        description: "Cookie data has been updated",
      });
    }, 600);
  };

  return (
    <div className="w-[420px] h-[640px] bg-background flex flex-col overflow-hidden">
      {/* Header with gradient */}
      <div className="relative bg-gradient-primary px-5 pt-4 pb-5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-md">
            <Cookie className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white tracking-tight">GuardMyCookies</h1>
            <p className="text-xs text-white/80 font-medium">Privacy Guardian</p>
          </div>
          <Shield className="h-6 w-6 text-white/90" />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {/* Risk Score Gauge + Total Cookies */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-center p-4 rounded-2xl bg-card border border-border shadow-md">
                <RiskGauge score={riskScore} size={110} />
              </div>
              <MetricCard
                icon={Cookie}
                label="Total Cookies"
                value={totalCookies}
                trend="good"
                gradient="primary"
              />
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-3 gap-3">
              <MetricCard
                icon={Lock}
                label="Secure"
                value={`${securePercentage}%`}
                trend={securePercentage > 70 ? "good" : "warning"}
              />
              <MetricCard
                icon={Shield}
                label="HttpOnly"
                value={`${httpOnlyPercentage}%`}
                trend={httpOnlyPercentage > 50 ? "good" : "warning"}
              />
              <MetricCard
                icon={Globe}
                label="3rd Party"
                value={thirdPartyCookies}
                trend={thirdPartyCookies > 3 ? "bad" : "good"}
              />
            </div>

            {/* Cookies Section Header */}
            <div className="flex items-center justify-between pt-2">
              <h2 className="text-sm font-bold text-foreground">
                Active Cookies <span className="text-muted-foreground font-normal">({totalCookies})</span>
              </h2>
            </div>

            {/* Cookie List */}
            <div className="space-y-2.5 pb-4">
              {cookies.map((cookie) => (
                <CookieCard
                  key={cookie.id}
                  name={cookie.name}
                  domain={cookie.domain}
                  isSecure={cookie.isSecure}
                  isHttpOnly={cookie.isHttpOnly}
                  isThirdParty={cookie.isThirdParty}
                  onDelete={() => handleDelete(cookie.id)}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Footer */}
      <div className="px-4 py-3.5 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex-1 gap-2 rounded-xl h-10 font-medium shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 bg-white border-border hover:border-primary/50"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-secondary/50 border border-border">
            <Switch
              id="mock-mode"
              checked={mockMode}
              onCheckedChange={setMockMode}
              className="data-[state=checked]:bg-primary"
            />
            <Label htmlFor="mock-mode" className="text-xs font-medium text-foreground cursor-pointer">
              Mock Mode
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
