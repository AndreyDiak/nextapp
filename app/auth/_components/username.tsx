import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

export const UsernameField = () => {
  return (
    <div className="space-y-2">
      <Label htmlFor="username" className="text-gray-700">
        Имя
      </Label>
      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Ваше имя"
          className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-blue-400 bg-white/80 active:outline-none"
          required
        />
      </div>
    </div>
  );
};
