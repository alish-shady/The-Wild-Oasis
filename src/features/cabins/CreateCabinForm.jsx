import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateUpdateCabin } from "./useCreateUpdateCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editId === undefined ? {} : editValues,
  });
  const { errors } = formState;
  const { isPending, mutate } = useCreateUpdateCabin(editId);
  function onError(err) {
    console.log(err);
  }
  return (
    <Form
      onSubmit={handleSubmit((data) => {
        mutate(data, {
          onSuccess: () => reset(),
          onSettled: () => onCloseModal?.(),
        });
      }, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "The name field should be filled.",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "The max capacity field should be filled.",
            min: {
              value: 1,
              message: "The max capacity should be at least 1.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "The regular price field should be filled.",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "The discount field should be filled.",
            validate: (discount) => {
              if (
                getValues().regularPrice &&
                Number(discount) > Number(getValues().regularPrice)
              )
                return "The discount can't be greater than the real price of the cabin.";
              return true;
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "The description field should be filled.",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required:
              editId === undefined
                ? "The image field should be filled."
                : false,
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isPending
            ? "..."
            : editId === undefined
            ? "Create a new cabin"
            : "Edit cabin"}
        </Button>
      </FormRow>
      {editId !== undefined && (
        <Input type="hidden" {...register("id")} value={editId} />
      )}
    </Form>
  );
}

export default CreateCabinForm;
