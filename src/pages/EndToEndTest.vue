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

// PrimeVue Form Example
const toast = useToast();
const initialValues = reactive({
  username: "",
});

const schema = z.object({
  username: z
    .string()
    .nonempty("Username wajib diisi")
    .min(3, "Username minimal 3 karakter"),
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
                data-testid="home-example-form-input"
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
              data-testid="home-example-error-msg"
              >{{ $field.error?.message }}</Message
            >
          </FormField>

          <Button
            label="Submit"
            type="submit"
            size="small"
            raised
            data-testid="home-example-btn-submit"
          />
        </Form>
      </template>
      <template #footer>
        <div class="text-center text-sm flex flex-col justify-center gap-2">
          <RouterLink to="/" class="underline"> Go to Home Page </RouterLink>
        </div>
      </template>
    </Card>
  </div>
</template>
