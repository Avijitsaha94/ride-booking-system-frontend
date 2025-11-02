import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthPage() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-12">
      <LoginForm />
      <RegisterForm />
    </div>
  );
}
