<template>
  <v-app-bar app color="dark" dark>
    <v-spacer></v-spacer>
    <v-tabs left>
      <v-tab
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        v-text="item.text"
      ></v-tab>

      <v-tabs-slider color="blue"></v-tabs-slider>
    </v-tabs>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    items: [
      { text: "Crear usuario", to: "/" },
      { text: "Ver usuarios", to: "/view" },
    ],
  }),
};
</script>
