import { Bell, Leaf, LogOut, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Navbar = ({ email }: { email: string }) => {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const logout = () => {
    localStorage.removeItem("smartfarm_user");
    toast.success("Logged out");
    navigate("/");
  };

  const initials = email
    ? email
        .split("@")[0]
        .split(/[._-]/)
        .map((s) => s[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "FA";

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/75 border-b border-border/60 shadow-soft">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-bold tracking-tight leading-none">SmartFarm</p>
            <p className="text-[11px] text-muted-foreground hidden sm:block mt-0.5 uppercase tracking-wider">
              AI · IoT · Solar
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full relative"
            aria-label="Notifications"
            onClick={() => toast.info("3 new field alerts")}
          >
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-destructive text-destructive-foreground border-2 border-background">
              3
            </Badge>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDark(!dark)}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-full hover:bg-secondary transition-smooth">
                <span className="hidden sm:block text-right leading-tight">
                  <span className="block text-sm font-medium max-w-[140px] truncate">
                    {email.split("@")[0]}
                  </span>
                  <span className="block text-[11px] text-muted-foreground">Farm Owner</span>
                </span>
                <Avatar className="h-9 w-9 ring-2 ring-primary/20">
                  <AvatarFallback className="gradient-primary text-primary-foreground font-semibold text-sm">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">Farmer account</span>
                  <span className="text-xs text-muted-foreground truncate">{email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
