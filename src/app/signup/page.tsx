import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {signup} from "./actions"
const Signup = () => {
    return ( 
        <div className="flex items-center justify-center min-h-screen p-4 bg-background">
            <Card className="mx-auto w-full max-w-sm sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
                name="email"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input name="password" id="password" type="password" required />
          </div>
          <Button formAction={signup} className="w-full bg-green-600 hover:bg-green-700">
            
          </Button>
        
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
        </div>
     );
}
 
export default Signup;