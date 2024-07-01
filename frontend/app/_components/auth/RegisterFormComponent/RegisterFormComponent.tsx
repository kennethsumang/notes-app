import { useForm } from "@mantine/form";
import { Button, Group, TextInput } from "@mantine/core";
import RequestLibrary from "@/app/_libraries/request.library";
import { getCurrentDomain } from "@/app/_utils/http.util";
import { useRouter } from "next/navigation";
import { RegisterForm } from "@/app/_types/auth";
import useNotification from "@/app/_hooks/useNotification";
import classes from "./RegisterFormComponent.module.css";

/**
 * RegisterForm component
 * @author Kenneth Sumang
 */
export default function RegisterFormComponent() {
  const router = useRouter();
  const notify = useNotification();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      retype_password: "",
    },
    validate: {
      name: (value: string) => {
        const trimmed = value.trim();
        const isValid = trimmed.length >= 2 && trimmed.length <= 20;
        return isValid ? null : "Invalid Last Name.";
      },
      email: (value: string) => {
        // SOURCE: https://stackoverflow.com/a/46181
        const isValid = String(value)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          );

        return isValid ? null : "Invalid email.";
      },
      password: (value: string) => {
        const isValid = value && value.length > 0;
        return isValid ? null : "Missing password.";
      },
      retype_password: (value: string, values) => {
        return value === values.password ? null : "Passwords do not match.";
      }
    },
  });

  /**
   * Handles register form submit
   * @param {RegisterForm} credentials
   */
  async function handleRegisterFormSubmit(credentials: RegisterForm) {
    const result = await requestRegister(credentials);
    if (result.success === false) {
      notify.error(result.message);
      return;
    }

    notify.success("Register successful!");
    router.push("/");
  }

  /**
   * Requests register API
   * @param   {RegisterForm} formData
   * @returns {Promise<{ success: boolean, message: string, data?: RegisterForm }>}
   */
  async function requestRegister(
    formData: RegisterForm,
  ): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const response = await RequestLibrary.request<{ data: any }>(
        `${getCurrentDomain()}/api/auth/register`,
        {
          method: "POST",
          data: formData as unknown as Record<string, unknown>,
        },
      );

      return {
        success: true,
        message: "OK",
        data: response.data,
      };
    } catch (e) {
      return {
        success: false,
        message: (e as Error).message,
      };
    }
  }

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) => handleRegisterFormSubmit(values))}
      >
        <TextInput
          className={classes.form_input}
          withAsterisk
          label="Name"
          type="text"
          required
          {...form.getInputProps("name")}
        />
        <TextInput
          className={classes.form_input}
          withAsterisk
          label="Email"
          type="email"
          required
          {...form.getInputProps("email")}
        />
        <TextInput
          className={classes.form_input}
          withAsterisk
          label="Password"
          type="password"
          required
          {...form.getInputProps("password")}
        />
        <TextInput
          className={classes.form_input}
          withAsterisk
          label="Retype Password"
          type="password"
          required
          {...form.getInputProps("retype_password")}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Register</Button>
        </Group>
      </form>
    </>
  );
}
