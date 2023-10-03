import Select from "react-select";

import TextField from "@/common/TextField";
import Loading from "@/common/Loading";

const categoriesFormData = [
  {
    id: 1,
    label: "عنوان",
    name: "title",
  },
  {
    id: 2,
    label: "عنوان انگلیسی",
    name: "englishTitle",
  },
  {
    id: 3,
    label: "توضیحات",
    name: "description",
  },
];

export const categoryTypes = [
  {
    id: 1,
    label: "محصول",
    value: "product",
  },
  {
    id: 2,
    label: "پست",
    value: "post",
  },
  {
    id: 3,
    label: "تیکت",
    value: "ticket",
  },
  {
    id: 4,
    label: "نظرات",
    value: "comment",
  },
];

function CategoryForm({
  categoryData,
  categoryDataOnChange,
  selectedType = "",
  setSelectedType,
  submitHandler,
  isLoading,
}) {
  return (
    <div className="max-w-sm">
      <form onSubmit={submitHandler} className="space-y-4">
        {categoriesFormData.map((item) => {
          return (
            <TextField
              key={item.id}
              label={item.label}
              name={item.name}
              value={categoryData[item.name] ?? ""}
              onChange={categoryDataOnChange}
            />
          );
        })}

        <div>
          <label htmlFor="type" className="mb-2">
            نوع
          </label>
          <Select
            id="type"
            defaultValue={selectedType}
            options={categoryTypes}
            onChange={setSelectedType}
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

export default CategoryForm;
