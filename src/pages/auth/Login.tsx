// src/pages/Login.tsx
import React from "react";
import { CardContent } from "../../components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { login } from "../../api/auth";
import { toast } from "../../hooks/use-toast";
import { useAuth } from "../../contexts/AuthContext";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [error, setError] = React.useState<string | null>(null);
  const { setTokens } = useAuth();

  const { mutate } = useMutation(login, {
    onSuccess: (data) => {
      // Handle successful login
      setTokens({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
      toast({
        title: "Success",
        type: "foreground",
      });
    },
    onError: (error: any) => {
      // Handle login error
      console.log(error.response.data.message);
      setError(error.response.data.message);
      toast({
        title: "Error",
        type: "background",
      });
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    mutate(data);
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </CardContent>
  );
};

export default Login;
