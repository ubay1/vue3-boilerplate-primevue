<script setup lang="ts">
import "vue-sonner/style.css";
import { RouterLink } from "vue-router";
import z from "zod";
import Button from "primevue/button";
import Card from "primevue/card";
import { Form, FormField, type FormSubmitEvent } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import FloatLabel from "primevue/floatlabel";
import Checkbox from "primevue/checkbox";

// PrimeVue Form Example
const toast = useToast();
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const props = defineProps<{
  initialTodos?: Todo[];
}>();

const todos = ref<Todo[]>(props.initialTodos ?? []);
const initialValues = reactive({
  input: "",
});

const schema = z.object({
  input: z
    .string()
    .nonempty("Input wajib diisi")
    .min(3, "Input minimal 3 karakter"),
});
const resolver = zodResolver(schema);

const onFormSubmit = (e: FormSubmitEvent) => {
  if (e.valid) {
    todos.value.push({
      id: todos.value.length + 1,
      text: e.values.input,
      completed: false,
    });
    initialValues.input = "";
    toast.add({
      severity: "success",
      summary: "Add todo success.",
      life: 3000,
    });
    e.reset();
  }
};
</script>

<template>
  <div>
    <Toast position="bottom-center" />
    <Card class="w-full max-w-md md:w-[400px]">
      <template #title>
        <div data-test="title">Unit Test With Vitest + Vue Test Utils</div>
      </template>
      <template #content>
        <Form
          :initialValues
          :resolver
          @submit="onFormSubmit"
          class="flex flex-col gap-4 w-full mt-4"
        >
          <FormField
            v-slot="$field"
            name="input"
            initialValue
            class="flex flex-col gap-1"
          >
            <FloatLabel variant="on">
              <InputText
                data-test="input-todo"
                id="input"
                name="input"
                aria-label="input"
                type="text"
                :autofocus="false"
                fluid
              />
              <label for="input">Enter Todo</label>
            </FloatLabel>
            <Message
              v-if="$field?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $field.error?.message }}</Message
            >
          </FormField>
          <Button
            label="Submit"
            type="submit"
            size="small"
            raised
            data-test="add-todo"
          />
        </Form>

        <ul class="list-none flex flex-col gap-2 mt-4">
          <template v-if="todos.length === 0">
            <li data-test="todo-list">No todos yet</li>
          </template>
          <template v-else>
            <li
              data-test="todo-list"
              v-for="(todo, index) in todos"
              :key="index"
            >
              <div class="flex items-center space-x-2">
                <!-- <input
                  :id="String(todo.id)"
                  type="checkbox"
                  v-model="todo.completed"
                  data-test="todo-checkbox"
                /> -->
                <Checkbox
                  v-model="todo.completed"
                  :inputId="String(todo.id)"
                  data-test="todo-checkbox"
                  binary
                />
                <label
                  data-test="text-todo"
                  :for="String(todo.id)"
                  :class="[todo.completed ? 'line-through' : '']"
                >
                  {{ todo.text }}
                </label>
              </div>
            </li>
          </template>
        </ul>
      </template>
      <template #footer>
        <div class="text-center text-sm flex flex-col justify-center gap-2">
          <RouterLink to="/" class="underline"> Go to Home Page </RouterLink>
        </div>
      </template>
    </Card>
  </div>
</template>
