import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toastManager } from "@/components/ui/toast";
import { useAuthState } from "@/hooks/use-auth";
import { AuthService } from "@/services/auth.service";
import { setAuth } from "@/store/slices/auth.slice";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Login04() {
  const navigate = useNavigate()
  const {dispatch} = useAuthState()
  const [email, setEmail] = useState<string>("rishi.rathore@liseinfotech.com");
  const [password, setPassword] = useState<string>("Rishi@123");
  const handleSubmit = async () => {
    return AuthService.LoginService({
      email,
      password
    })
  }

  const { mutate: Login, isPending, data, error } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: (data) => {
      const nestedValues = data.data

      localStorage.setItem("token", nestedValues.token)
      localStorage.setItem("user", JSON.stringify(nestedValues.u))
      localStorage.setItem("organizations", JSON.stringify(nestedValues.org))
      if (!nestedValues.org) {
        console.log(nestedValues.org,'nestedValues.org')
        dispatch(setAuth({ user: nestedValues.u, token: nestedValues.token }))
        navigate("/create-organization")
        toastManager.add({
          title: "Please Create Organization",
          description: "Create Organization First",
          type: "success",
        })
      } else {
        dispatch(setAuth({ user: nestedValues.u, token: nestedValues.token, organizations: nestedValues.org }))
        toastManager.add({
          title: "Welcome Back!",
          description: "Login Successfully",
          type: "success",
        })
      }
    },
    onError: (error: any) => {
      const errorValue = error?.response?.data
      toastManager.add({
        title: errorValue?.message || "Error",
        description: errorValue?.description || "Signup Failed",
        type: "error",
      })
    },
  })



  return (
    <div className="flex items-center w-full justify-center ">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h3 className="mt-6 text-lg font-semibold text-foreground dark:text-foreground">
            Sign in to your account
          </h3>
          <p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to={"/signup"}
              className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90"
            >
              Sign up
            </Link>
          </p>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <Label
                htmlFor="email-login-04"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                Email
              </Label>
              <Input
                type="email"
                id="email-login-04"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email-login-04"
                autoComplete="email"
                placeholder="ephraim@blocks.so"
                className="mt-2"
              />
            </div>
            <div>
              <Label
                htmlFor="password-login-04"
                className="text-sm font-medium text-foreground dark:text-foreground"
              >
                Password
              </Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password-login-04"
                name="password-login-04"
                autoComplete="password"
                placeholder="********"
                className="mt-2"
              />
            </div>
            <Button
              onClick={() => {
                Login()
              }}
              className="mt-4 w-full py-2 font-medium">
              {isPending ? "Loading..." : "Sign in"}
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground dark:text-muted-foreground">
            Forgot your password?{" "}
            <a
              href="#"
              className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90"
            >
              Reset password
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}