"use client";

import ProductsFilter from "./ProductsFilter";

function CategorySidebar({ categories }) {
  return (
    <div className="col-span-1">
      <ProductsFilter categories={categories} />
    </div>
  );
}

export default CategorySidebar;
