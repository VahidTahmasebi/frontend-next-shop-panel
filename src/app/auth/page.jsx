import SendOTPForm from "./SendOTPForm";

function AuthPage() {
  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">
        <SendOTPForm />
      </div>
    </div>
  );
}

export default AuthPage;
