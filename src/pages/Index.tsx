import { useState } from "react";
import { Shield, Cookie, Lock, Globe, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { StatCard } from "@/components/StatCard";
import { CookieCard } from "@/components/CookieCard";
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
];

const Index = () => {
  const [cookies, setCookies] = useState(generateMockCookies());
  const [mockMode, setMockMode] = useState(true);

  const totalCookies = cookies.length;
  const secureCookies = cookies.filter((c) => c.isSecure).length;
  const httpOnlyCookies = cookies.filter((c) => c.isHttpOnly).length;
  const thirdPartyCookies = cookies.filter((c) => c.isThirdParty).length;
  const securePercentage = Math.round((secureCookies / totalCookies) * 100);
  const httpOnlyPercentage = Math.round((httpOnlyCookies / totalCookies) * 100);
  const riskScore = Math.round((thirdPartyCookies / totalCookies) * 10) / 10;

  const handleDelete = (id: string) => {
    setCookies(cookies.filter((c) => c.id !== id));
    toast.success("Cookie deleted");
  };

  const handleRefresh = () => {
    setCookies(generateMockCookies());
    toast.success("Cookies refreshed");
  };

  return (
    <div className="w-[400px] h-[600px] bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-border">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Cookie className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">GuardMyCookies</h1>
          <p className="text-xs text-muted-foreground">Privacy Guardian</p>
        </div>
        <Shield className="h-5 w-5 text-secure ml-auto" />
      </div>

      {/* Summary Stats */}
      <div className="px-4 py-3 space-y-2 border-b border-border">
        <div className="grid grid-cols-2 gap-2">
          <StatCard
            icon={Cookie}
            label="Total Cookies"
            value={totalCookies}
            trend="good"
          />
          <StatCard
            icon={AlertTriangle}
            label="Risk Score"
            value={riskScore}
            trend={riskScore > 0.5 ? "warning" : "good"}
            subtitle="ML assessed"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <StatCard
            icon={Lock}
            label="Secure"
            value={`${securePercentage}%`}
            trend={securePercentage > 70 ? "good" : "warning"}
          />
          <StatCard
            icon={Shield}
            label="HttpOnly"
            value={`${httpOnlyPercentage}%`}
            trend={httpOnlyPercentage > 50 ? "good" : "warning"}
          />
          <StatCard
            icon={Globe}
            label="3rd Party"
            value={thirdPartyCookies}
            trend={thirdPartyCookies > 3 ? "bad" : "good"}
          />
        </div>
      </div>

      {/* Cookie List */}
      <div className="flex-1 min-h-0">
        <div className="px-4 py-2 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Cookies ({totalCookies})</h2>
        </div>
        <ScrollArea className="h-full">
          <div className="p-4 space-y-2">
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
        </ScrollArea>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border bg-card">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="flex-1 gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <div className="flex items-center gap-2">
            <Switch
              id="mock-mode"
              checked={mockMode}
              onCheckedChange={setMockMode}
            />
            <Label htmlFor="mock-mode" className="text-xs text-muted-foreground cursor-pointer">
              Mock Mode
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
