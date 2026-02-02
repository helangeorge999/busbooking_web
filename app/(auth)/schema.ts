import { z } from "zod";

/* REGISTER */
export const registerSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    username: z.string().min(2, "Username is required"), // NEW
    email: z.string().email("Invalid email"),
    dob: z.string().min(1, "Date of birth required"),
    gender: z.enum(["male", "female"]).refine((val) => val, { message: "Gender is required" }),
    phone: z.string().min(10, "Phone number required"),
    password: z.string().min(6, "Password too short"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterData = z.infer<typeof registerSchema>;

/* LOGIN */
export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password is required"),
});

export type LoginData = z.infer<typeof loginSchema>;
