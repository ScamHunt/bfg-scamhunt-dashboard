import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { redirect } from 'next/navigation'
import { urlParams } from "@/types/message"
import { login } from './actions'
import FormMessage from "@/components/formMessage" 

const Login = ({searchParams}:{searchParams:urlParams}) => {
    return ( 
<div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-sm sm:max-w-md">
        <form>

        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">Login</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input name="email" id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input name="password" id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button formAction={login} className="w-full bg-green-600 hover:bg-green-700 text-white">
            Sign in
          </Button>
          <FormMessage message={searchParams} />

            
        </CardFooter>
          </form>

      </Card>
    </div>

     );
}
 
export default Login;