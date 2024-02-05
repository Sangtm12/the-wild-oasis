import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "./FormRow";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin added");
      reset();
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" errors={errors}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Pls this field",
          })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" errors={errors}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Pls this field",
            min: {
              value: 1,
              message: "Room for at least 1 u stupid",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" errors={errors}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Pls this field",
          })}
        />
      </FormRow>

      <FormRow label="Discount" errors={errors}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Pls this field",
            validate: (value) =>
              value <= getValues().regularPrice || "negative price u dumb fk",
          })}
        />
      </FormRow>

      <FormRow label="Description for cabin" errors={errors}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Pls this field",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" errors={errors}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "How tf am i supposed to know how the cabin looks?",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
