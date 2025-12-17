<script setup lang="ts">
import { reactive, computed } from "vue"

const form = reactive({
  name: "",
  email: "",
  message: "",
})

const touched = reactive({
  name: false,
  email: false,
  message: false,
})

const errors = computed(() => ({
  name: form.name.trim().length < 2 ? "Name must be at least 2 characters" : "",
  email: !/^\S+@\S+\.\S+$/.test(form.email.trim()) ? "Please enter a valid email" : "",
  message: form.message.trim().length < 10 ? "Message must be at least 10 characters" : "",
}))

const isValid = computed(() =>
  !errors.value.name && !errors.value.email && !errors.value.message
)

function submit() {
  touched.name = touched.email = touched.message = true
  if (!isValid.value) return

  alert("Thanks! Feedback submitted ✅")

  form.name = ""
  form.email = ""
  form.message = ""
  touched.name = touched.email = touched.message = false
}
</script>

<template>
  <div class="page">
    <h1 class="title">Feedback</h1>
    <p class="subtitle">Send a short message to the team.</p>

    <form class="card" @submit.prevent="submit">
      <label class="label">Name</label>
      <input
        class="input"
        v-model="form.name"
        @blur="touched.name = true"
        placeholder="Your name"
      />
      <p v-if="touched.name && errors.name" class="err">{{ errors.name }}</p>

      <label class="label">Email</label>
      <input
        class="input"
        v-model="form.email"
        @blur="touched.email = true"
        placeholder="you@example.com"
      />
      <p v-if="touched.email && errors.email" class="err">{{ errors.email }}</p>

      <label class="label">Message</label>
      <textarea
        class="textarea"
        v-model="form.message"
        @blur="touched.message = true"
        placeholder="Write at least 10 characters..."
        rows="5"
      />
      <p v-if="touched.message && errors.message" class="err">{{ errors.message }}</p>

      <button class="btn" :disabled="!isValid">Send</button>
    </form>
  </div>
</template>

<style scoped>
.page { padding: 16px; max-width: 720px; margin: 0 auto; }
.title { margin: 8px 0 6px 0; font-size: 24px; font-weight: 700; }
.subtitle { margin: 0 0 16px 0; color: var(--muted); }

.card {
  display: grid;
  gap: 10px;
  padding: 16px;
  border-radius: 16px;
  background: var(--card);
  border: 1px solid rgba(255,255,255,0.06);
}

.label { font-size: 13px; color: var(--muted); }
.input, .textarea {
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.04);
  color: var(--text);
  padding: 10px 12px;
  outline: none;
}
.input:focus, .textarea:focus { border-color: rgba(100,181,246,0.55); }

.err { margin: 0; font-size: 12px; color: #ef5350; }

.btn {
  margin-top: 8px;
  border: none;
  border-radius: 12px;
  padding: 10px 14px;
  background: rgba(100, 181, 246, 0.18);
  color: #64b5f6;
  cursor: pointer;
  font-weight: 600;
}
.btn:disabled { opacity: 0.45; cursor: not-allowed; }
</style>