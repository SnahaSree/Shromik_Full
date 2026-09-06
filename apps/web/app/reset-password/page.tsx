import AuthLayout from "@/components/auth/AuthLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Create a new password"
      description="Choose a strong password for your SHROMIK account."
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}