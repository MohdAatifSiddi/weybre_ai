"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { useEffect, useMemo, useState } from "react"
import { Loader2 } from "lucide-react"
import { authClient } from "@/lib/auth-client" // adjust if you use different reset function
import { useRouter, useSearchParams } from "next/navigation"

// Schema for setting a new password
const formSchema = z
  .object({
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string().min(8, { message: "Confirm your new password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  })

export function ResetPassword({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  // Read token or code from URL
  const token = useMemo(() => {
    const t = searchParams?.get("token") || searchParams?.get("code") || ""
    return t
  }, [searchParams])

  useEffect(() => {
    if (!token) {
      // Show a gentle notice if no token found
      toast.error("Invalid or missing reset token. Please request a new link.")
    }
  }, [token])

  // Submit new password
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!token) {
      toast.error("Missing reset token. Please use the link from your email.")
      return
    }

    setIsLoading(true)
    try {
      // better-auth client typically exposes resetPassword; adjust if different
      const { data, error } = await authClient.resetPassword({
        token,
        newPassword: values.password,
      } as any)

      if (error) {
        toast.error(error.message || "Failed to reset password")
      } else {
        toast.success("Password updated successfully. Please log in.")
        router.push("/login")
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong. Try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Set a New Password</CardTitle>
          <CardDescription>
            Enter your new password below to complete the reset.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input placeholder="********" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input placeholder="********" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting || isLoading || !token}
              >
                {form.formState.isSubmitting || isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </Button>

              <div className="text-center text-sm">
                Remember your password?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Go back to login
                </a>
              </div>
              {!token && (
                <div className="text-center text-xs text-destructive">
                  No reset token detected. Please use the link from your email or request a new one on the
                  {" "}
                  <a href="/forgot-password" className="underline underline-offset-4">
                    forgot password
                  </a>{" "}
                  page.
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
