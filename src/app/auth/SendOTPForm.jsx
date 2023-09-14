import TextField from "@/common/TextField";

function SendOTPForm({ phoneNumber, onChange, onSubmit }) {
  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-10">
        <TextField
          label="شماره موبایل"
          name="phoneNumber"
          value={phoneNumber}
          onChange={onChange}
        />
        <button type="submit" className="w-full btn btn--primary">
          ارسال کد تایید
        </button>
      </form>
    </div>
  );
}

export default SendOTPForm;
