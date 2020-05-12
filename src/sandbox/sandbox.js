import Scrollactive from '../index';
import './normalize.scss';
import './sandbox.scss';

Vue.use(Scrollactive);

const app = new Vue({
  el: '#app',
  data: {
    elements: [],
    alwaysTrack: false,
    duration: 600,
    clickToScroll: true,
    offset: 52,
    easing: '.5,0,.35,1',
  },
  computed: {
    numberOfElements() {
      return this.elements.length;
    },
  },
  mounted() {
    this.elements = this.$el.querySelectorAll('.scrollactive-item');
  },
  methods: {
    addNewElement() {
      const sectionNumber = this.numberOfElements + 1;
      const colorClass = this.numberOfElements % 2 === 0 ? 'is-primary' : 'is-danger';
      const menuItem = document.createElement('div');
      menuItem.innerHTML = `<a href="#section-${sectionNumber}" class="scrollactive-item nav-item">Section ${sectionNumber}</a>`;
      document.querySelector('.nav-center').appendChild(menuItem.firstChild);

      const section = document.createElement('div');
      section.innerHTML = `<section id="section-${sectionNumber}" class="section hero ${colorClass} is-fullheight">
      <div class="container">
      <h1 class="heading title is-1">Section ${sectionNumber}</h1>
      </div>
      </section>
      `;
      document.querySelector('main').appendChild(section.firstChild);
      this.elements = this.$el.querySelectorAll('.scrollactive-item');
    },
    removeElement() {
      if (this.numberOfElements >= 1) {
        const elementsIds = [].map.call(this.elements, (el) => el.hash);
        const lastElementId = elementsIds.slice(-1);

        document.querySelector(`.nav-center a[href="${lastElementId}"]`).remove();
        document.querySelector('main').removeChild(document.querySelector(lastElementId));

        this.elements = this.$el.querySelectorAll('.scrollactive-item');
      }
    },
  },
});

export default app;
