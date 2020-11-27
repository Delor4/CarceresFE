<template>
  <div>
    <h4>Ustawienia</h4>
    <div v-if="client != null">
      <div class="user_settings">
        <span>Imię: <span class="user_data">{{ client.name }}</span></span>
        <span>Nazwisko: <span class="user_data">{{ client.surname }}</span></span>
        <span>Adres: <span class="user_data">{{ client.address || "-" }}</span></span>
        <span>Miasto: <span class="user_data">{{ client.city || "-" }}</span></span>
        <span>Telefon: <span class="user_data">{{ client.phone || "-" }}</span></span>
        <span>Data urodzenia: <span class="user_data">{{ client.birthday || "-" }}</span></span>
        <span>Email: <span class="user_data">{{ client.user && client.user.email ? client.user.email : "-" }}</span></span>
      </div>
      <h6>Zmiana Hasła</h6>
      <b-form @submit.prevent="onSubmit" class="user_password">
        <b-form-input
          type="password"
          v-model="form.pass_old"
          placeholder="Poprzednie hasło"
          class="pass"
        />
        <b-form-input
          type="password"
          v-model="form.pass_new"
          placeholder="Nowe hasło"
          class="pass"
        />
        <b-form-input
          type="password"
          v-model="form.pass_new_second"
          placeholder="Powtórz hasło"
          class="pass"
        />
        <b-button type="submit" variant="primary">Zmień hasło</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      client: null,
      form: {
        pass_old: null,
        pass_new: null,
        pass_new_second: null,
      },
    };
  },
  methods: {
    async onSubmit() {
      //TODO: show alerts
      if (!this.form.pass_old) {
        alert('Previous password not provided.');
        return;
      }
      if (
        !this.form.pass_new ||
        this.form.pass_new !== this.form.pass_new_second
      ) {
        alert('New passwords not match or not provided.')
        return;
      }
      if (!(await this.api.checkPass(this.form.pass_old))) {
        alert('Password checking failed.')
        return;
      }
      this.form.pass_old = null;
      await this.api.updateCurrUser({ password: this.form.pass_new });
      this.form.pass_new = this.form.pass_new_second = null;
      alert('Password updated.')
    },
    async loadResources() {
      this.loading = true;
      this.client = await this.api.getCurrClient();
      this.loading = false;
    },
  },
  mounted() {
    this.loadResources();
  },
  components: {},
};
</script>

<style scoped>
</style>
