
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AuthButton = () => {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="border-amber-600 text-amber-600 hover:bg-amber-50">
            <User className="h-4 w-4 mr-2" />
            Account
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={signOut} className="text-red-600">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link to="/auth">
      <Button variant="outline" size="sm" className="border-amber-600 text-amber-600 hover:bg-amber-50">
        Sign In
      </Button>
    </Link>
  );
};

export default AuthButton;
