import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const { signup, isSigningUp } = useSignup();

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" errors={errors}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "Pls fill" })}
        />
      </FormRow>

      <FormRow label="Email address" errors={errors}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "Pls fill",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "invalid email",
            },
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" errors={errors}>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "Pls fill",
            minLength: {
              value: 8,
              message: "password needs at least 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" errors={errors}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Pls fill",
            validate: (value) =>
              value === getValues().password || "passwords doesn't match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset" disabled={isSigningUp}>
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
