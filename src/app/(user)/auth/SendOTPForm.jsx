import TextField from "@/common/TextField";
import Loading from "@/common/Loading";

function SendOTPForm({ phoneNumber, onChange, onSubmit, isLoading }) {
  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-10">
        <TextField
          label="شماره موبایل"
          name="phoneNumber"
          value={phoneNumber}
          onChange={onChange}
        />
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <button type="submit" className="w-full btn btn--primary">
              ارسال کد تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SendOTPForm;
