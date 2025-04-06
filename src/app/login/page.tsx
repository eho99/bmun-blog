import { login, signup } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50">
      <Card className="w-[350px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            BMUN Blog
          </CardTitle>
          <CardDescription className="text-center">
            Login or create an account to start writing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="space-y-2">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                formAction={login}
              >
                Log in
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-slate-500">Or</span>
            </div>
          </div>
          <form>
            <Button
              type="submit"
              className="w-full bg-slate-800 hover:bg-slate-900"
              formAction={signup}
            >
              Create an account
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
