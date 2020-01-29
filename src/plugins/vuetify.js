import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#33691E',
          secondary: '#B78708',
          secprimary: '#2E7D32',
          secsecondary: '#6F581A',
          accent: '#FDD835',
          error: '#D50000',
          info: '#2196F3',
          success: '#76FF03',
          warning: '#FFC107'
        },
      },
    },
  });
