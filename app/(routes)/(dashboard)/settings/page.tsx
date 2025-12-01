"use client";
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Bell, Shield, User } from "lucide-react";
import Header from "../_common/header";
import { useState } from "react";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <>
      <Header title="Settings" />
      <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
        {/* Appearance Section */}
        <Card>
          <CardHeader>
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>Customize your app's look and feel</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme" className="text-sm font-medium">
                Theme
              </Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger id="theme" className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Email notifications</Label>
                <p className="text-sm text-muted-foreground">Receive emails for important updates</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
                id="notifications"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
              <CardDescription>Enhance your account security</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch
                checked={twoFactor}
                onCheckedChange={setTwoFactor}
                id="two-factor"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Settings;