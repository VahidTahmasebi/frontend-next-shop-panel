import OTPInput from "react-otp-input";

function CheckOTPForm({
  otp,
  setOtp,
  time,
  otpResponse,
  onSubmit,
  onBack,
  onResendOtp,
  isCheckingOtp,
}) {
  return (
    <div>
      <button onClick={onBack} className="mb-4">
        برگشت
      </button>
      {otpResponse && (
        <p>
          {otpResponse?.message}
          <button onClick={onBack}>ویرایش</button>
        </p>
      )}
      <div className="mb-4">
        {time > 0 ? (
          <p>{time} ثانیه تا ارسال مجدد کد</p>
        ) : (
          <button onClick={onResendOtp}>ارسال مجدد کد</button>
        )}
      </div>
      <form onSubmit={onSubmit} className="space-y-10">
        <p>کد تایید را وارد کنید</p>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
          containerStyle="flex flex-row-reverse justify-center gap-x-2"
          inputStyle={{
            width: "2.5rem",
            padding: ".5rem .2rem",
            border: "1px solid rgb(var(--color-primary-300))",
            borderRadius: ".5rem",
          }}
        />
        <div>
          {isCheckingOtp ? (
            <p>Loading...</p>
          ) : (
            <button type="submit" className="w-full btn btn--primary">
              تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CheckOTPForm;
