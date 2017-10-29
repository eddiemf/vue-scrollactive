<template>
  <nav class="scrollactive-nav" ref="scrollactive-nav-wrapper">
    <slot></slot>
  </nav>
</template>

<script>
import bezierEasing from 'bezier-easing';

export default {
  props: {
    /**
    * Class that will be applied in the menu item.
    *
    * @default  'is-active'
    * @type {String}
    */
    activeClass: {
      type: String,
      default: 'is-active',
    },

    /**
    * Amount of space between top of screen and the section to
    * highlight. (Usually your fixed header's height)
    *
    * @default 20
    * @type {Number}
    */
    offset: {
      type: Number,
      default: 20,
    },

    /**
    * Enables/disables the scrolling when clicking in a menu item.
    * Disable if you'd like to handle the scrolling by your own.
    *
    * @default true
    * @type {Boolean}
    */
    clickToScroll: {
      type: Boolean,
      default: true,
    },

    /**
    * The duration of the scroll animation when clicking to scroll
    * is activated.
    *
    * @default 600
    * @type {Number}
    */
    duration: {
      type: Number,
      default: 600,
    },

    /**
    * Defines if the plugin should track the section change when
    * clicking an item to scroll to its section. If set to true,
    * it will always keep track and change the active class to the
    * current section while scrolling, if false, the active class
    * will be immediately applied to the clicked menu item, ignoring
    * the passed sections until the scrolling is over.
    *
    * @default false
    * @type {Boolean}
    */
    alwaysTrack: {
      type: Boolean,
      default: false,
    },

    /**
    * Your custom easing value for the click to scroll functionality.
    * It must be a string with 4 values separated by commas in a
    * cubic bezier format.
    *
    * @default '.5,0,.35,1'
    * @type {String}
    */
    bezierEasingValue: {
      type: String,
      default: '.5,0,.35,1',
    },
  },

  data() {
    return {
      observer: null,
      scrollactiveItems: [],
      bezierEasing,
      currentItem: null,
      lastActiveItem: null,
    };
  },

  computed: {
    /**
    * Computes the bezier easing string value into an array.
    *
    * @return {Array.<string>}
    */
    cubicBezierArray() {
      return this.bezierEasingValue.split(',');
    },
  },

  mounted() {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    if (!this.observer) {
      // Watch for DOM changes in the scrollactive element wrapper
      this.observer = new MutationObserver(this.initScrollactiveItems);
      this.observer.observe(this.$refs['scrollactive-nav-wrapper'], {
        childList: true,
        subtree: true,
      });
    }

    this.initScrollactiveItems();
    this.removeActiveClass();
    this.currentItem = this.getItemInsideWindow();

    if (this.currentItem) this.currentItem.classList.add(this.activeClass);

    window.addEventListener('scroll', this.onScroll);
  },

  updated() {
    this.initScrollactiveItems();
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
    window.cancelAnimationFrame(window.AFRequestID);
  },

  methods: {
    /**
    * Will be called when scrolling event is triggered to handle the addition of the active class
    * in the current section item and fire the change event.
    *
    * @param {Object} event Scroll event.
    */
    onScroll(event) {
      this.currentItem = this.getItemInsideWindow();

      if (this.currentItem !== this.lastActiveItem) {
        this.removeActiveClass();
        this.$emit('itemchanged', event, this.currentItem, this.lastActiveItem);
        this.lastActiveItem = this.currentItem;
      }

      // Current item might be null if not inside any section
      if (this.currentItem) this.currentItem.classList.add(this.activeClass);
    },

    /**
     * Gets the scrollactive item that corresponds to the current section inside the window
     *
     * @return {node} Scrollactive item node.
     */
    getItemInsideWindow() {
      let currentItem;

      [].forEach.call(this.scrollactiveItems, (node) => {
        const target = document.getElementById(node.hash.substr(1));

        if (window.pageYOffset >= this.getOffsetTop(target) - this.offset) {
          currentItem = node;
        }
      });

      return currentItem;
    },

    /**
    * Sets the list of menu items, adding or removing the click listener depending on the
    * clickToScroll prop.
    */
    initScrollactiveItems() {
      this.scrollactiveItems = this.$el.querySelectorAll('.scrollactive-item');

      if (this.clickToScroll) {
        [].forEach.call(this.scrollactiveItems, (scrollactiveItem) => {
          scrollactiveItem.addEventListener('click', this.scrollToTargetElement);
        });
        return;
      }

      [].forEach.call(this.scrollactiveItems, (scrollactiveItem) => {
        scrollactiveItem.removeEventListener('click', this.scrollToTargetElement);
      });
    },

    /**
     * Keep the old setScrollactiveItems method in order to avoid breaking existing projects that
     * used the previous version and upgraded to this one.
     *
     * @deprecated
     */
    setScrollactiveItems() {
      this.initScrollactiveItems();
    },

    /**
    * Handles the scrolling when clicking a menu item.
    *
    * @param {Object} event The click event.
    */
    scrollToTargetElement(event) {
      event.preventDefault();

      const { hash } = event.currentTarget;
      const target = document.getElementById(hash.substr(1));

      if (!target) {
        console.warn(`[vue-scrollactive] Element '${hash}' was not found. Make sure it is set in the DOM.`);
        return;
      }

      /**
       *  Temporarily removes the scroll listener and the request animation frame so the active
       *  class will only be applied to the clicked element, and not all elements while the window
       *  is scrolling.
       */
      if (!this.alwaysTrack) {
        window.removeEventListener('scroll', this.onScroll);
        window.cancelAnimationFrame(window.AFRequestID);

        this.removeActiveClass();
        event.currentTarget.classList.add(this.activeClass);
      }

      const targetDistanceFromTop = this.getOffsetTop(target);
      const startingY = window.pageYOffset;
      const difference = targetDistanceFromTop - startingY;
      const easing = this.bezierEasing(
        this.cubicBezierArray[0],
        this.cubicBezierArray[1],
        this.cubicBezierArray[2],
        this.cubicBezierArray[3],
      );
      let start = null;

      const step = (timestamp) => {
        if (!start) start = timestamp;

        let progress = timestamp - start;
        let progressPercentage = progress / this.duration;

        if (progress >= this.duration) progress = this.duration;
        if (progressPercentage >= 1) progressPercentage = 1;

        const perTick = startingY + (easing(progressPercentage) * (difference - this.offset));

        window.scrollTo(0, perTick);

        if (progress < this.duration) {
          window.AFRequestID = window.requestAnimationFrame(step);
        } else {
          window.addEventListener('scroll', this.onScroll);
          // Update the location hash after we've finished animating
          if (window.history.pushState) {
            window.history.pushState(null, null, hash);
          } else {
            window.location.hash = hash;
          }
        }
      };

      window.requestAnimationFrame(step);
    },

    /**
    * Gets the top offset position of an element in the document.
    *
    * @param  {Element} element
    * @return {number}
    */
    getOffsetTop(element) {
      let yPosition = 0;
      let nextElement = element;

      while (nextElement) {
        yPosition += (nextElement.offsetTop);
        nextElement = nextElement.offsetParent;
      }

      return yPosition;
    },

    /**
     * Removes the active class from all scrollactive items.
     */
    removeActiveClass() {
      [].forEach.call(this.scrollactiveItems, (node) => {
        node.classList.remove(this.activeClass);
      });
    },
  },
};
</script>
