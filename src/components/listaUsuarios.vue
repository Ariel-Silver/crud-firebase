<template>
  <v-container class="my-10">
    <v-chip class="ma-2" color="primary" label>
      Lista de usuarios
      <v-icon right class="mr-2">  mdi-account-circle-outline </v-icon>
    </v-chip>

    <v-list two-line v-for="(usuario, i) in usuarios" :key="i">
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="green"> mdi-account-circle </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ usuario.data.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ usuario.data.email }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1" @click="getDocument(usuario)">
              mdi-pencil
            </v-icon>
          </v-btn>
        </v-list-item-action>

        <v-list-item-action>
          <v-btn icon @click="deleteDoc(usuario.id)">
            <v-icon color="grey lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>

        <v-dialog v-model="dialog" max-width="500px" :retain-focus="false">
          <v-card>
            <v-card-title>
              <span>Editar datos</span>
              <v-spacer></v-spacer>
            </v-card-title>

            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              class="my-1 pa-10"
            >
              <v-text-field
                v-model="userEdit.data.name"
                :counter="20"
                :rules="nameRules"
                label="Nombre"
                required
                outlined
              ></v-text-field>

              <v-text-field
                v-model="userEdit.data.email"
                :rules="emailRules"
                label="Correo"
                required
                outlined
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                color="primary"
                class="my-4"
                @click="validate()"
              >
                Aceptar
              </v-btn>
            </v-form>
            
            <v-card-actions> </v-card-actions>
          </v-card>
        </v-dialog>

        <div class="text-center">
          <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            top
            app
            color="success"
          >
            {{ text }}
          </v-snackbar>
        </div>
      </v-list-item>
      <v-divider inset></v-divider>
    </v-list>
  </v-container>
</template>

<script>
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";

export default {
  name: "listaUsuarios",

  data() {
    return {
      snackbar: false,
      text: "Update user .",
      timeout: 800,

      usuarios: [],
      dialog: false,
      userEdit: {
        id: "",
        data: "",
      },

      valid: true,
      nameRules: [
        (v) => !!v || "Se necesita un nombre",
        (v) => (v && v.length <= 20) || "El nombre debe contener menos de 20 caracteres",
      ],
      emailRules: [
         (v) => !!v || "Se necesita un correo",
        (v) => /.+@.+\..+/.test(v) || "El correo debe ser valido",
      ],
    };
  },

  mounted() {
    this.getDocuments();
  },

  methods: {
    async getDocuments() {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      this.usuarios = users;
    },

    async deleteDoc(userID) {
      const db = getFirestore();
      await deleteDoc(doc(db, "usuarios", userID));
      this.getDocuments();
    },

    async getDocument(user) {
      this.dialog = true;
      const db = getFirestore();
      const docRef = doc(db, "usuarios", user.id);
      const docSnap = await getDoc(docRef);
      const usuario = {
        id: docSnap.id,
        data: docSnap.data(),
      };
      this.userEdit = usuario;
    },

    validate() {
      if (this.$refs.form[0].validate()) {
        this.editDoc();
      }
    },

    async editDoc() {
      const db = getFirestore();
      const id = this.userEdit.id;
      const data = this.userEdit.data;
      await setDoc(doc(db, "usuarios", id), {
        name: data.name,
        email: data.email,
      });
      this.getDocuments();
      this.close();
    },

    close() {
      this.snackbar = true;
      setTimeout(() => (this.dialog = false), 1000);
    },
  },
};
</script>
