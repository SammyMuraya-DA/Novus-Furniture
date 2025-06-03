
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const PasswordChange = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    const storedPassword = localStorage.getItem("adminPassword") || "12345";

    if (currentPassword !== storedPassword) {
      toast({
        title: "Error",
        description: "Current password is incorrect",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 4) {
      toast({
        title: "Error",
        description: "Password must be at least 4 characters long",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("adminPassword", newPassword);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    toast({
      title: "Success",
      description: "Password changed successfully",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Settings</h2>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Admin Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <Label>Username:</Label>
              <p className="text-sm text-gray-600">Samuel</p>
            </div>
            <div>
              <Label>Current Password:</Label>
              <p className="text-sm text-gray-600">
                {localStorage.getItem("adminPassword") || "12345"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordChange;
