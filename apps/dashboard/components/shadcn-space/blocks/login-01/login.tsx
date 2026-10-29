"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SyntheticEvent } from "react";
import { signIn, signUp } from "@/lib/auth-client";

const LoginForm = () => {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = ((formData.get("email") as string) || "").trim();
    const password = (formData.get("password") as string) || "";
    const name = ((formData.get("name") as string) || "").trim();

    if (!email) {
      setError("Please enter your email address");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        const res = await signUp.email({
          email,
          password,
          name: name || email.split("@")[0] || "Developer",
        });

        if (res.error) {
          setError(res.error.message || "Failed to create account");
          setLoading(false);
          return;
        }
      } else {
        const res = await signIn.email({
          email,
          password,
        });

        if (res.error) {
          setError(res.error.message || "Invalid email or password");
          setLoading(false);
          return;
        }
      }

      window.location.href = "/";
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    try {
      await signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (err: any) {
      setError(err?.message || `Failed to sign in with ${provider}`);
    }
  };

  return (
    <section className="bg-foreground dark:bg-background min-h-screen flex items-center justify-center relative">
      <div className="pointer-events-none absolute inset-0 right-0 overflow-hidden md:block hidden">
        <div className="absolute left-1/1 top-0 h-650 w-650 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10" />
        <div className="absolute left-1/1 top-0 h-175 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground dark:bg-background" />
      </div>

      <div className="py-10 md:py-20 max-w-lg px-4 sm:px-0 mx-auto w-full">
        <Card className="max-w-lg px-6 py-8 sm:p-12 relative gap-6">
          <CardHeader className="text-center gap-6 p-0">
            <div className="mx-auto">
              <Link href="/">
                <Image
                  src="https://images.shadcnspace.com/assets/logo/logo-icon-black.svg"
                  alt="shadcnspace"
                  width={40}
                  height={40}
                  className="dark:hidden h-10 w-10"
                />
                <Image
                  src="https://images.shadcnspace.com/assets/logo/logo-icon-white.svg"
                  alt="shadcnspace"
                  width={40}
                  height={40}
                  className="hidden dark:block h-10 w-10"
                />
              </Link>
            </div>
            <div className="flex flex-col gap-1">
              <CardTitle className="text-2xl font-medium text-card-foreground">
                {isSignup ? "Create an Account" : "Welcome Back"}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground font-normal">
                {isSignup
                  ? "Sign up to access your API gateway dashboard"
                  : "Login to manage your API keys and analytics"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit}>
              <FieldGroup className="gap-6">
                {error && (
                  <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md">
                    {error}
                  </div>
                )}
                <Field className="grid md:grid-cols-2 md:gap-6 gap-3">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => handleOAuth("google")}
                    className="text-sm text-medium text-card-foreground gap-2 dark:bg-background rounded-lg h-9 shadow-xs cursor-pointer"
                  >
                    <Image
                      src="https://images.shadcnspace.com/assets/svgs/icon-google.svg"
                      alt="google icon"
                      width={16}
                      height={16}
                      className="h-4 w-4"
                    />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => handleOAuth("github")}
                    className="text-sm text-medium text-card-foreground gap-2 dark:bg-background rounded-lg h-9 shadow-xs cursor-pointer"
                  >
                    <Image
                      src="https://images.shadcnspace.com/assets/svgs/icon-github.svg"
                      alt="github icon"
                      width={16}
                      height={16}
                      className="dark:hidden h-4 w-4"
                    />
                    <Image
                      src="https://images.shadcnspace.com/assets/svgs/icon-github-white.svg"
                      alt="github icon"
                      width={16}
                      height={16}
                      className="hidden dark:block h-4 w-4"
                    />
                    Github
                  </Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card text-sm text-muted-foreground bg-transparent">
                  <span className="px-4">or sign in with</span>
                </FieldSeparator>

                <div className="flex flex-col gap-4">
                  {isSignup && (
                    <Field className="gap-1.5">
                      <FieldLabel
                        htmlFor="name"
                        className="text-sm text-muted-foreground font-normal"
                      >
                        Name*
                      </FieldLabel>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        required
                        className="dark:bg-background h-9 shadow-xs"
                      />
                    </Field>
                  )}

                  <Field className="gap-1.5">
                    <FieldLabel
                      htmlFor="email"
                      className="text-sm text-muted-foreground font-normal"
                    >
                      Email*
                    </FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="developer@example.com"
                      required
                      className="dark:bg-background h-9 shadow-xs"
                    />
                  </Field>
                  <Field className="gap-1.5">
                    <FieldLabel
                      htmlFor="password"
                      className="text-sm text-muted-foreground font-normal"
                    >
                      Password*
                    </FieldLabel>

                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      className="dark:bg-background h-9 shadow-xs"
                    />
                  </Field>
                </div>

                {!isSignup && (
                  <Field orientation="horizontal" className="justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="terms"
                        defaultChecked
                        className="cursor-pointer"
                      />
                      <FieldLabel
                        htmlFor="terms"
                        className="text-sm text-primary font-normal cursor-pointer"
                      >
                        Remember this device
                      </FieldLabel>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-card-foreground font-medium text-end"
                    >
                      Forgot password?
                    </a>
                  </Field>
                )}

                <Field>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="rounded-lg h-10 hover:bg-primary/80 cursor-pointer"
                  >
                    {loading
                      ? "Processing..."
                      : isSignup
                      ? "Create account"
                      : "Sign in"}
                  </Button>
                  <FieldDescription className="text-center text-sm font-normal text-muted-foreground">
                    {isSignup ? (
                      <>
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setIsSignup(false);
                            setError(null);
                          }}
                          className="font-medium text-card-foreground underline cursor-pointer"
                        >
                          Sign in
                        </button>
                      </>
                    ) : (
                      <>
                        Don&apos;t have an account?{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setIsSignup(true);
                            setError(null);
                          }}
                          className="font-medium text-card-foreground underline cursor-pointer"
                        >
                          Create an account
                        </button>
                      </>
                    )}
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LoginForm;
