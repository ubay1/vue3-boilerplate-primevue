<script setup lang="ts">
import "vue-sonner/style.css";
import { RouterLink } from "vue-router";
import Button from "primevue/button";
import Card from "primevue/card";
import { Form, FormField, type FormSubmitEvent } from "@primevue/forms";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import FloatLabel from "primevue/floatlabel";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import z from "zod";
import Password from "primevue/password";

// const schema = z.object({
//   username: z
//     .string({
//       required_error: "Username wajib diisi",
//     })
//     .min(3, "Username minimal 3 karakter"),
//   password: z
//     .string({
//       required_error: "Password wajib diisi",
//     })
//     .min(6, "Password minimal 6 karakter"),
// });

// // wrap ke typed schema buat vee-validate
// const formSchema = toTypedSchema(schema);
// // ambil type dari schema asli
// export type FormValues = z.infer<typeof schema>;
// // bikin form instance
// const { handleSubmit } = useForm({
//   validationSchema: formSchema,
// });

// // typing values langsung dapet dari Zod
// const onSubmit = handleSubmit((values: FormValues) => {
//   toast.success(`Form submitted!`, {
//     description: `Username: ${values.username}, Password: ${values.password}`,
//   });
// });

// PrimeVue Form Example
const toast = useToast();
const initialValues = reactive({
  username: "",
  password: "",
});

const schema = z.object({
  username: z
    .string()
    .nonempty("Username wajib diisi")
    .min(3, "Username minimal 3 karakter"),
  password: z
    .string()
    .nonempty("Password wajib diisi")
    .min(3, "Password minimal 3 karakter"),
});
const resolver = zodResolver(schema);
const onFormSubmit = (e: FormSubmitEvent) => {
  if (e.valid) {
    toast.add({
      severity: "info",
      summary: "Form is submitted.",
      life: 3000,
    });
  }
};
</script>

<template>
  <div>
    <Toast />
    <Card class="w-full max-w-md md:w-[400px]">
      <template #title>Vue 3 + VeeValidate + Zod</template>
      <template #content>
        <Form
          :initialValues
          :resolver
          @submit="onFormSubmit"
          class="flex flex-col gap-4 w-full mt-4"
        >
          <FormField
            v-slot="$field"
            name="username"
            initialValue=""
            class="flex flex-col gap-1"
          >
            <FloatLabel variant="on">
              <InputText
                id="username"
                name="username"
                aria-label="username"
                type="text"
                :autofocus="false"
                fluid
              />
              <label for="username">Username</label>
            </FloatLabel>
            <Message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $field.error?.message }}</Message
            >
          </FormField>

          <FormField
            v-slot="$field"
            name="password"
            initialValue=""
            class="flex flex-col gap-1"
          >
            <FloatLabel variant="on">
              <Password
                id="password"
                name="password"
                aria-label="Password"
                :feedback="false"
                fluid
                toggleMask
              />
              <label for="password">Password</label>
            </FloatLabel>
            <Message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $field.error?.message }}</Message
            >
          </FormField>
          <Button label="Submit" type="submit" size="small" raised />
        </Form>
      </template>
      <template #footer>
        <div class="text-center text-sm flex flex-col justify-center gap-2">
          <RouterLink to="/unit-test" class="underline">
            Go to Unit Test Page
          </RouterLink>
          <RouterLink to="/e2e" class="underline">
            Go to E2E Test Page
          </RouterLink>
        </div>
      </template>
    </Card>
  </div>
</template>
