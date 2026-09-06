import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      description="Join SHROMIK as a worker or contractor."
    >
      <RegisterForm />
    </AuthLayout>
  );
}