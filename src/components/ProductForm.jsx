import { TagsInput } from "react-tag-input-component";
import Select from "react-select";

import TextField from "@/common/TextField";
import Loading from "@/common/Loading";

const productsFormData = [
  {
    id: 1,
    label: "عنوان",
    name: "title",
  },
  {
    id: 2,
    label: "توضیحات",
    name: "description",
  },
  {
    id: 3,
    label: "اسلاگ",
    name: "slug",
  },
  {
    id: 4,
    label: "برند",
    name: "brand",
  },
  {
    id: 5,
    label: "قیمت",
    name: "price",
  },
  {
    id: 6,
    label: "تخفیف",
    name: "discount",
  },
  {
    id: 7,
    label: "قیمت روی تخفیف",
    name: "offPrice",
  },
  {
    id: 8,
    label: "موجودی",
    name: "countInStock",
  },
  {
    id: 9,
    label: "لینک عکس محصول",
    name: "imageLink",
  },
];

function ProductForm({
  productData,
  productDataOnChange,
  tags,
  setTags,
  categories,
  selectedCategory = "",
  setSelectedCategory,
  submitHandler,
  isLoading,
}) {
  return (
    <div className="max-w-sm">
      <form onSubmit={submitHandler} className="space-y-4">
        {productsFormData.map((item) => {
          return (
            <TextField
              key={item.id}
              label={item.label}
              name={item.name}
              value={productData[item.name] ?? ""}
              onChange={productDataOnChange}
            />
          );
        })}
        <div>
          <label htmlFor="tags" className="mb-2">
            تگ محصولات
          </label>
          <TagsInput id="tags" name="tags" value={tags} onChange={setTags} />
        </div>

        <div>
          <label htmlFor="category" className="mb-2">
            دسته بندی
          </label>
          <Select
            id="category"
            defaultValue={selectedCategory}
            options={categories}
            onChange={setSelectedCategory}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option._id}
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

export default ProductForm;
