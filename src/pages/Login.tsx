import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Mail, Lock, Sun, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("farmer@smartfarm.io");
  const [password, setPassword] = useState("demo1234");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("smartfarm_user", email);
      toast.success("Welcome back, farmer!");
      navigate("/dashboard");
    }, 700);
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background">
      {/* Left – brand panel */}
      <div className="hidden lg:flex relative overflow-hidden gradient-primary text-primary-foreground p-12 flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
            <Leaf className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">SmartFarm</span>
        </div>
        <div className="space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-sm">
            <Sun className="h-4 w-4" /> Solar-Powered • AI-Driven
          </div>
          <h1 className="text-5xl font-bold leading-tight text-balance">
            Grow more.<br /> Waste less.<br /> Farm smarter.
          </h1>
          <p className="text-lg text-primary-foreground/85 max-w-md">
            Self-optimizing irrigation, real-time sensor analytics, and AI recommendations — all powered by the sun.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/70">© {new Date().getFullYear()} SmartFarm Systems</p>
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-primary-glow/30 blur-3xl" />
      </div>

      {/* Right – form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md animate-fade-in">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="h-11 w-11 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">SmartFarm</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight">Farmer Login</h2>
          <p className="text-muted-foreground mt-2 mb-8">
            Sign in to access your smart farm dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                  placeholder="farmer@smartfarm.io"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox checked={remember} onCheckedChange={(v) => setRemember(!!v)} />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => toast.info("Reset link sent to your email")}
                className="text-primary font-medium hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition-smooth"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
