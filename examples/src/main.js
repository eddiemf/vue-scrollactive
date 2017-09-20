import Scrollactive from '../../dist/vue-scrollactive';

Vue.use(Scrollactive);

const app = new Vue({
  el: '#app',
  data: {
    numberOfElements: document.querySelectorAll('#site-header a').length,
    alwaysTrack: false,
    duration: 600,
    clickToScroll: true,
    offset: 52,
    easing: '.5,0,.35,1',
  },
  methods: {
    addNewElement() {
      this.numberOfElements += this.numberOfElements;
      const colorClass = this.numberOfElements % 2 === 0 ? 'is-primary' : 'is-danger';
      const menuItem = document.createElement('div');
      menuItem.innerHTML = `<a href="#section-${this.numberOfElements}" class="scrollactive-item nav-item">Section ${this.numberOfElements}</a>`;
      document.querySelector('.nav-center').appendChild(menuItem.firstChild);

      const section = document.createElement('div');
      section.innerHTML = `<section id="section-${this.numberOfElements}" class="section hero ${colorClass} is-fullheight">
      <div class="container">
      <h1 class="heading title is-1">Section ${this.numberOfElements}</h1>
      </div>
      </section>
      `;
      document.querySelector('main').appendChild(section.firstChild);

      this.$refs.scrollactive.setScrollactiveItems();
    },
  },
});

export default app;
