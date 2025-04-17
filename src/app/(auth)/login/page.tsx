"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";

// shadcan
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// icons
import { AlertCircle, LoaderCircle, Github } from "lucide-react";

export default function Login() {
  const router = useRouter();

  // state
  const [pendingGitHubLogin, setPendingGitHubLogin] = useState(false);

  // define form
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // define function to call on submit
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
            console.error("Error logging in:", ctx.error);
            form.setError("root", {
              type: "server",
              message: "Your email or password aren't valid.",
            });
          } else if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
            console.error("Error logging in:", ctx.error);
            form.setError("root", {
              type: "server",
              message: "Email address not validated. Please check your email.",
            });
          }
        },
      }
    );
  }

  async function handleGitHubLogin() {
    await authClient.signIn.social(
      {
        provider: "github",
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          setPendingGitHubLogin(true);
        },
        onError: (ctx) => {
          console.error("Error logging in with GitHub:", ctx.error);
          form.setError("root", {
            type: "server",
            message: "Something went wrong signing in with GitHub.",
          });
        },
        onResponse: () => {
          setPendingGitHubLogin(false);
        },
      }
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-12">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold px-6 mb-4">
          Login
        </CardTitle>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors.root && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {form.formState.errors.root.message}
                  </AlertDescription>
                </Alert>
              )}
              <Button
                className="w-full"
                type="submit"
                disabled={form.formState.isSubmitting || pendingGitHubLogin}
              >
                {form.formState.isSubmitting ? (
                  <>
                    Processing <LoaderCircle className="animate-spin" />
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
          <Button
            className="w-full mt-2"
            onClick={handleGitHubLogin}
            disabled={form.formState.isSubmitting || pendingGitHubLogin}
          >
            {pendingGitHubLogin ? (
              <>
                Processing <LoaderCircle className="animate-spin" />
              </>
            ) : (
              <>
                <Github />
                Continue With Github
              </>
            )}
          </Button>
          <div className="mt-4 text-center text-sm">
            <Link href="/forgot-password">Forgot password?</Link>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
