import Scrollactive from '../../dist/vue-scrollactive';

Vue.use(Scrollactive);

var app = new Vue({
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
    addNewElement: function () {
      this.numberOfElements += 1;
      var colorClass = this.numberOfElements % 2 === 0 ? 'is-primary' : 'is-danger';
      var menuItem = document.createElement('div');
      menuItem.innerHTML = `<a href="#section-${this.numberOfElements}" class="scrollactive-item nav-item">Section ${this.numberOfElements}</a>`;
      document.querySelector('.nav-center').appendChild(menuItem.firstChild);

      var section = document.createElement('div');
      section.innerHTML = `<section id="section-${this.numberOfElements}" class="section hero ${colorClass} is-fullheight">
      <div class="container">
      <h1 class="heading title is-1">Section ${this.numberOfElements}</h1>
      </div>
      </section>
      `;
      document.querySelector('main').appendChild(section.firstChild);
    },
  },
});

export default app;
