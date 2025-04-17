import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email must be a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, {
        message: "First name must be at least 2 characters.",
      })
      .max(30, { message: "First name must be no more than 30 characters." }),
    lastName: z
      .string()
      .min(2, {
        message: "Last name must be at least 2 characters.",
      })
      .max(30, { message: "Last name must be no more than 30 characters." }),
    email: z
      .string()
      .email({ message: "Email must be a valid email address." }),
    password: z.string().min(6, {
      message: "Password must be at least 10 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Passwords must match.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Email must be a valid email address." }),
});

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Password must be at least 10 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Passwords must match.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });
