import { describe, it, expect } from "vitest";

import { mount, RouterLinkStub } from "@vue/test-utils";
import UnitTestPage from "../../../pages/UnitTest.vue";
import ToastService from "primevue/toastservice";
import PrimeVue from "primevue/config";

/**
 * Kalau butuh test router beneran, kita harus masukkan routernya seperti di file router contohnya dibawah ini.
 * ------------------------------------------------------------- *
  import { createRouter, createWebHistory } from 'vue-router';
  const routes = [
    { path: '/unit-test-v2', component: UnitTestPage },
  ]
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })
 * ------------------------------------------------------------- *
 */

/**
 * Vue Test Utils First
   1. Use mount() to render a component.
   2. Use get() and findAll() to query the DOM.
   3. trigger() and setValue() are helpers to simulate user input.
   4. Updating the DOM is an async operation, so make sure to use async and await.
   5. Testing usually consists of 3 phases; arrange, act and assert.
 */
const props = {
  initialTodos: [{ id: 1, text: "Belajar Vitest", completed: false }],
};
const global = {
  /**
   * Jadi kalau cuma butuh unit test jalan tanpa peduli router, pakai stub RouterLink.
   * Kalau butuh test router beneran, inject router ke dalam render.
   * plugins: [router], // kalau butuh test router beneran
   */
  plugins: [PrimeVue, ToastService],
  stubs: {
    RouterLink: RouterLinkStub,
  },
};
const wrapper = mount(UnitTestPage, { global });
const wrapper2 = mount(UnitTestPage, { props, global });

describe("Unit Test Page", () => {
  it("mounts render & get title", () => {
    const getText = wrapper.get('[data-test="title"]');
    expect(getText.text()).toBe("Unit Test With Vitest + Vue Test Utils");
  });

  it("mount render todo", () => {
    const getAllTodo = wrapper.get('[data-test="todo-list"]');
    expect(getAllTodo.text()).toBe("No todos yet");
  });

  it("create todo", async () => {
    const findAllTodo = wrapper2.findAll('[data-test="todo-list"]');
    await wrapper2.get('[data-test="input-todo"]').setValue("New todo");
    await wrapper2.get('[data-test="add-todo"]').trigger("submit");
    expect(findAllTodo).toHaveLength(1);
  });

  it("complete todo", async () => {
    // for input checkbox
    // await wrapper2.get('[data-test="todo-checkbox"]').setValue(true)

    // for primevue checkbox
    await wrapper2.get('[data-test="todo-checkbox"] input').setValue(true);

    expect(wrapper2.get('[data-test="text-todo"]').classes()).toContain(
      "line-through",
    );
  });
});

/**
 * For more advanced testing scenarios, refer to the official documentation:
 * - Vue Test Utils: https://test-utils.vuejs.org/
 * - Vitest: https://vitest.dev/
 */
