<template>
  <v-container class="my-10">
    <div class="text-center">
      <v-snackbar v-model="snackbar" :timeout="timeout" top app color="success">
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>

    <v-chip class="ma-2" color="primary" label>
      Crea un usuario
      <v-icon right class="mr-1"> mdi-account-plus-outline </v-icon>
    </v-chip>

    <v-form ref="form" v-model="valid" lazy-validation class="my-5">
      <v-text-field
        v-model="name"
        :counter="20"
        :rules="nameRules"
        label="Nombre"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Correo"
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="primary"
        class="my-4"
        @click="validate(name, email)"
      >
        Crear
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { collection, getFirestore, addDoc } from "firebase/firestore";

export default {
  data() {
    return {
      snackbar: false,
      text: "Usuario registrado",
      timeout: 2000,

      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Se necesita un nombre",
        (v) => (v && v.length <= 20) || "El nombre debe contener menos de 20 caracteres",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "Se necesita un correo",
        (v) => /.+@.+\..+/.test(v) || "El correo debe ser valido",
      ],
    };
  },

  methods: {
    validate(name, email) {
      if (this.$refs.form.validate()) {
        this.crear(name, email);
      }
    },

    async crear(name, email) {
      const db = getFirestore();
      await addDoc(collection(db, "usuarios"), {
        name: name,
        email: email,
      });

      this.reset();
      this.snackbar = true;
    },

    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
