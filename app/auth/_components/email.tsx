import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

export const EmailField = () => {
  return (
    <div className="space-y-2">
      <Label htmlFor="email" className="text-gray-700">
        Email
      </Label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="ваш@email.com"
          className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-blue-400 bg-white/80"
          required
        />
      </div>
    </div>
  );
};
