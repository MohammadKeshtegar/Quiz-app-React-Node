import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useCreateCategory } from "./useCreateCategory";
import { useUpdateCategory } from "./useUpdateCategory";

function CreateCategory({ onCloseModal, categoryId, category }) {
  const isCategory = Boolean(category);
  const { register, handleSubmit } = useForm({ defaultValues: isCategory ? { category } : {} });
  const { isCreating, createCategory } = useCreateCategory();
  const { isUpdating, updateCategory } = useUpdateCategory();

  function onSubmit(categoryData) {
    if (isCategory) updateCategory({ categoryData, categoryId });
    else createCategory(categoryData);
    onCloseModal();
  }

  return (
    <div className="mt-2">
      <Form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 items-center">
        <input
          type="text"
          {...register("category")}
          placeholder="Category name"
          className="bg-neutral-700 rounded p-2 text-neutral-300 border-none outline-none focus:ring-1 ring-blue-400 transition-all placeholder:text-neutral-500"
        />
        <Button styleType="fill" type="submit" disable={isCreating || isUpdating}>
          {isCategory ? "Update" : "Create"}
        </Button>
      </Form>
    </div>
  );
}

export default CreateCategory;
