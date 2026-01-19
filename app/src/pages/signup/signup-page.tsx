import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toastManager } from "@/components/ui/toast";
import { useAuthState } from "@/hooks/use-auth";
import { AuthService } from "@/services/auth.service";
import { setAuth } from "@/store/slices/auth.slice";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Signup04() {

    const navigate = useNavigate()
    const { dispatch } = useAuthState()
    const id = useId()
    const [fullName, setFullName] = useState<string>("Rishi Rathore");
    const [email, setEmail] = useState<string>("rishi.rathore@liseinfotech.com");
    const [password, setPassword] = useState<string>("Rishi@123");
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

    const isValid = useMemo(() => {
        return (fullName?.length ?? 0) > 0 && (email?.length ?? 0) > 0 && (password?.length ?? 0) > 0
    }, [fullName, email, password])

    const handleSubmit = async () => {
        return AuthService.SignupService({
            name: fullName,
            email,
            password
        })
    }

    const { mutate: signup, isPending, data, error } = useMutation({
        mutationFn: handleSubmit,
        onSuccess: (data) => {
            const nestedValues = data.data
            console.log(nestedValues, 'nestedValues')
            localStorage.setItem("token", nestedValues.token)
            localStorage.setItem("user", JSON.stringify(nestedValues.u))
            dispatch(setAuth({ user: nestedValues.u, token: nestedValues.token }))
            toastManager.add({
                title: "Success",
                description: "Signup Successfully",
                type: "success",
            })
            navigate("/create-organization")
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

    console.log(isPending, data, error, 'isPending,data,error')

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
                                Full Name
                            </Label>
                            <Input
                                maxLength={30}
                                minLength={3}
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                type="email"
                                id="email-login-04"
                                name="email-login-04"
                                autoComplete="email"
                                placeholder="Enter your full name"
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="email-login-04"
                                className="text-sm font-medium text-foreground dark:text-foreground"
                            >
                                Email
                            </Label>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email-login-04"
                                name="email-login-04"
                                autoComplete="email"
                                placeholder="Enter your email"
                                className="mt-2"
                            />
                        </div>
                        <div className="*:not-first:mt-2">
                            <Label htmlFor={id}>Password</Label>
                            <div className="relative">
                                <Input
                                    className="pe-9"
                                    id={id}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    type={isVisible ? "text" : "password"}
                                />
                                <button
                                    aria-controls="password"
                                    aria-label={isVisible ? "Hide password" : "Show password"}
                                    aria-pressed={isVisible}
                                    className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                    onClick={toggleVisibility}
                                    type="button"
                                >
                                    {isVisible ? (
                                        <EyeOffIcon aria-hidden="true" size={16} />
                                    ) : (
                                        <EyeIcon aria-hidden="true" size={16} />
                                    )}
                                </button>
                            </div>
                        </div>
                        <Button
                            disabled={!isValid}
                            onClick={() => {
                                signup()
                                //navigate("/create-workspace")
                            }}
                            className="mt-4 w-full py-2 font-medium">
                            Sign in
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