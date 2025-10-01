import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CookieCardProps {
  name: string;
  domain: string;
  isSecure: boolean;
  isHttpOnly: boolean;
  isThirdParty: boolean;
  onDelete: () => void;
}

export const CookieCard = ({
  name,
  domain,
  isSecure,
  isHttpOnly,
  isThirdParty,
  onDelete,
}: CookieCardProps) => {
  return (
    <div className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-3.5 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-primary/30">
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm text-foreground truncate mb-1">
          {name}
        </div>
        <div className="text-xs text-muted-foreground truncate mb-2.5">
          {domain}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {isSecure && (
            <Badge variant="outline" className="text-[10px] font-medium px-2 py-0.5 bg-secure-light text-secure border-secure/20 rounded-full">
              Secure
            </Badge>
          )}
          {isHttpOnly && (
            <Badge variant="outline" className="text-[10px] font-medium px-2 py-0.5 bg-secure-light text-secure border-secure/20 rounded-full">
              HttpOnly
            </Badge>
          )}
          {isThirdParty && (
            <Badge variant="outline" className="text-[10px] font-medium px-2 py-0.5 bg-warning-light text-warning border-warning/20 rounded-full">
              3rd Party
            </Badge>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 h-9 w-9 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
