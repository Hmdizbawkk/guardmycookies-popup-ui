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
    <div className="group flex items-start justify-between gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:shadow-md hover:border-primary/20">
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm text-foreground truncate mb-1">
          {name}
        </div>
        <div className="text-xs text-muted-foreground truncate mb-2">
          {domain}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {isSecure && (
            <Badge variant="outline" className="text-xs bg-secure-light text-secure border-secure/20">
              Secure
            </Badge>
          )}
          {isHttpOnly && (
            <Badge variant="outline" className="text-xs bg-secure-light text-secure border-secure/20">
              HttpOnly
            </Badge>
          )}
          {isThirdParty && (
            <Badge variant="outline" className="text-xs bg-warning-light text-warning border-warning/20">
              3rd Party
            </Badge>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
