"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/common/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/shadcn/card";
import { Input } from "@/common/shadcn/input";
import { Label } from "@/common/shadcn/label";
import Link from "next/link";
import React, { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  registerAction,
  registerDto,
  registerSchema,
} from "@/services/authService";
import { toast } from "sonner";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [register, setRegister] = React.useState<registerDto>(
    {} as registerDto
  );
  const [error, setError] = React.useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const parse = registerSchema.safeParse(register);
    if (!parse.success) {
      setError(parse.error.errors[0].message);
      return;
    }
    try {
      const res = await registerAction(register);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      router.push("/login");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Register Account</CardTitle>
          <CardDescription>Register to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="grid gap-6">
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Name</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="Jhon Doe"
                    required
                    name="name"
                    onChange={(e) =>
                      setRegister({ ...register, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">User Name</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="johndoe"
                    required
                    name="user_name"
                    onChange={(e) =>
                      setRegister({ ...register, user_name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    name="email"
                    onChange={(e) =>
                      setRegister({ ...register, email: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    name="password"
                    onChange={(e) =>
                      setRegister({ ...register, password: e.target.value })
                    }
                  />
                </div>
                <Button type="submit" className="w-full">
                  Continue
                </Button>
                <div className="flex items-center justify-center">
                  {error && (
                    <p className="text-red-500/65 italic text-sm">{error}</p>
                  )}
                </div>
              </div>
              <div className="text-center text-sm">
                have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
