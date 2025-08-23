import { Button } from "@/components/ui/button";

interface Props {
  isPending: boolean;
  text: string;
}

export const SubmitButton = ({ isPending, text }: Props) => {
  return (
    <Button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg transition-all duration-200 transform hover:scale-105"
      disabled={isPending}
    >
      {isPending ? "Вход..." : "Войти"}
    </Button>
  );
};
