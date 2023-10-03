import Select from "react-select";
import DatePicker from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/jalali";

import TextField from "@/common/TextField";
import RadioInput from "@/common/RadioInput";
import Loading from "@/common/Loading";

const couponsFormData = [
  {
    id: 1,
    label: "کد",
    name: "code",
  },
  {
    id: 2,
    label: "مقدار",
    name: "amount",
  },
  {
    id: 3,
    label: "ظرفیت",
    name: "usageLimit",
  },
];

function CouponsForm({
  couponsData,
  couponsDataOnChange,
  type,
  setType,
  products,
  productIds = "",
  setProductIds,
  expireDate,
  setExpireDate,
  submitHandler,
  isLoading,
}) {
  return (
    <div className="max-w-sm">
      <form onSubmit={submitHandler} className="space-y-4">
        {couponsFormData.map((item) => {
          return (
            <TextField
              key={item.id}
              label={item.label}
              name={item.name}
              value={couponsData[item.name] ?? ""}
              onChange={couponsDataOnChange}
            />
          );
        })}

        <div>
          <span className="block mb-2">نوع کد تخفیف</span>
          <div className="flex justify-between items-center">
            <RadioInput
              name="coupon-type"
              id="percent-type"
              label="درصد"
              checked={type === "percent"}
              value="percent"
              onChange={(e) => setType(e.target.value)}
            />
            <RadioInput
              name="coupon-type"
              id="fixedProduct-type"
              label="قیمت ثابت"
              checked={type === "fixedProduct"}
              value="fixedProduct"
              onChange={(e) => setType(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="products" className="block mb-2">
            شامل محصول
          </label>
          <Select
            id="products"
            isMulti
            defaultValue={productIds}
            options={products}
            onChange={setProductIds}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option._id}
          />
        </div>

        <div>
          <span className="block mb-2">تاریخ انقضا</span>
          <DatePicker
            format="YYYY/MM/DD"
            locale={persian_fa}
            calendar={persian}
            showOtherDays
            mapDays={({ date }) => {
              let props = {};
              let isWeekend = date.weekDay.index === 6;

              if (isWeekend) props.className = "highlight highlight-red";

              return props;
            }}
            inputClass="textField__input"
            containerStyle={{
              width: "100%",
            }}
            monthYearSeparator="|"
            value={expireDate}
            onChange={(date) => setExpireDate(date)}
          />
        </div>
        <div>
          {isLoading ? (
            <Loading />
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

export default CouponsForm;
