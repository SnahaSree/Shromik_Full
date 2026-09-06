import AuthLayout from "@/components/auth/AuthLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset your password"
      description="Enter your registered email or phone to begin account recovery."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}