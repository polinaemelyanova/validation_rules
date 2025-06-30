<template>
  <div class="center-screen">
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">Имя пользователя</label>
        <input
            id="username"
            type="text"
            name="username"
            :value="formValues.username"
            @input="(e: Event) => setValidateField('username', (e.target as HTMLInputElement).value)"
            class="input"
        />
        <div v-if="touched.username && errors.username.length" class="error">
          <div v-for="err in errors.username" :key="err">{{ err }}</div>
        </div>
      </div>

      <div>
        <label>Email</label>
        <input
            type="email"
            :value="formValues.email"
            @input="(e: Event) => setValidateField('email', (e.target as HTMLInputElement).value)"
            class="input"
        />
        <div v-if="touched.email && errors.email.length" class="error">
          <div v-for="err in errors.email" :key="err">{{ err }}</div>
        </div>
      </div>

      <button type="submit" :disabled="!isValid" class="button">Отправить</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { useFormValidation } from '../composables/useFormValidation'

const config = {
  username: {
    value: '',
    rules: ['required', { type: 'minLength', value: 5 }]
  },

  email: {
    value: '',
    rules: ['required', 'email']
  }
}

const {
  formValues,
  errors,
  touched,
  isValid,
  setValidateField,
  setFieldTouched,
  validateAllFields,
} = useFormValidation(config)


function submitForm() {
  validateAllFields()
  if (isValid.value) {
    alert('Форма отправлена!')
  }
}

</script>
