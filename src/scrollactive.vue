<script>
import bezierEasing from 'bezier-easing';
import { ScrollContainer } from './ScrollContainer';
import {
  forEach,
  find,
  getIdFromHash,
  pushHashToUrl,
  getSectionSelector,
  getSectionIdFromElement,
} from './utils';

export default {
  props: {
    /**
     * Active class that will be applied to the active item.
     */
    activeClass: {
      type: String,
      default: 'is-active',
    },

    /**
     * Amount of space between top of screen and the section to highlight. (Usually your fixed
     * header's height).
     */
    offset: {
      type: Number,
      default: 20,
    },

    /**
     * Amount of space between the top of the screen and the section to highlight when clicking a
     * scrollactive item to scroll. It will use the value of the `offset` prop if none is provided
     * here. Useful when you want to use the `offset` prop to make an item be active as soon as
     * it shows on the screen but still scroll to the top of the section when clicking the item.
     */
    scrollOffset: {
      type: Number,
      default: null,
    },

    /**
     * The selector string of the scroll container element you'd like to use. It defaults to the
     * window object (most common), but you might want to change in case you're using an element
     * as container with overflow.
     */
    scrollContainerSelector: {
      type: String,
      default: '',
    },

    /**
     * Enables/disables the scrolling when clicking in a menu item.
     * Disable if you'd like to handle the scrolling by your own.
     */
    clickToScroll: {
      type: Boolean,
      default: true,
    },

    /**
     * The duration of the scroll animation when clicking to scroll is activated.
     */
    duration: {
      type: Number,
      default: 600,
    },

    /**
     * Defines if the plugin should track the section change when clicking an item to scroll to
     * its section. If set to true, it will always keep track and change the active class to the
     * current section while scrolling, if false, the active class will be immediately applied to
     * the clicked menu item, ignoring the passed sections until the scrolling is over.
     */
    alwaysTrack: {
      type: Boolean,
      default: false,
    },

    /**
     * Your custom easing value for the click to scroll functionality.
     * It must be a string with 4 values separated by commas in a cubic bezier format.
     */
    bezierEasingValue: {
      type: String,
      default: '.5,0,.35,1',
    },

    /**
     * Decides if the URL should be modified with the section id when clicking a scrollactive
     * item.
     */
    modifyUrl: {
      type: Boolean,
      default: true,
    },

    /**
     * If true the active class will only be applied when a section matches exactly one of the
     * scrollactive items, meaning it will be highlighted when scrolling exactly inside the
     * section. If false (default) it will always highlight the last item which was matched
     * in a section, even if it is already outside that section (and not inside another that's
     * being tracked).
     */
    exact: {
      type: Boolean,
      default: false,
    },

    /**
     * If true the active class will be applied to the first scrollactive-item before you scroll
     * past it (even if you didn't reach it yet).
     */
    highlightFirstItem: {
      type: Boolean,
      default: false,
    },

    /**
     * Changes the scrollactive container component html tag.
     */
    tag: {
      type: String,
      default: 'nav',
    },

    /**
     * If true the screen will scroll down to the element in the URL when the component is mounted.
     */
    scrollOnStart: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      observer: null,
      items: [],
      currentItem: null,
      lastActiveItem: null,
      scrollAnimationFrame: null,
      bezierEasing,
    };
  },

  computed: {
    /**
     * Computes the bezier easing string value into an array.
     */
    cubicBezierArray() {
      return this.bezierEasingValue.split(',');
    },

    scrollContainer() {
      return new ScrollContainer(this.scrollContainerSelector);
    },
  },

  mounted() {
    this.resetOnDOMChange();
    this.initScrollactiveItems();
    this.removeActiveClass();
    this.currentItem = this.getItemInsideWindow();

    if (this.currentItem) this.currentItem.classList.add(this.activeClass);

    if (this.scrollOnStart) this.scrollToHashElement();

    this.scrollContainer.addScrollListener(this.onScroll);
  },

  updated() {
    this.initScrollactiveItems();
  },

  beforeDestroy() {
    this.scrollContainer.removeScrollListener();
    window.cancelAnimationFrame(this.scrollAnimationFrame);
  },

  methods: {
    /**
     * Makes sure the component is recalculated whenever the DOM tree changes inside of the
     * scrollactive wrapper.
     */
    resetOnDOMChange() {
      const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

      if (!this.observer) {
        this.observer = new MutationObserver(this.initScrollactiveItems);
        // Calls this.initScrollactiveItems() whenever the DOM tree is changed inside of the wrapper
        this.observer.observe(this.$refs['scrollactive-nav-wrapper'], {
          childList: true,
          subtree: true,
        });
      }
    },

    /**
     * Sets the list of menu items, adding or removing the click listener depending on the
     * clickToScroll prop.
     */
    initScrollactiveItems() {
      const elements = this.$el.querySelectorAll('.scrollactive-item');
      const items = [];

      forEach(elements, (menuElement) => {
        const section = document.querySelector(getSectionSelector(menuElement));
        if (!section) return;

        items.push({ section, menuElement });
      });

      this.items = items;

      if (this.clickToScroll) {
        forEach(elements, (element) => element.addEventListener('click', this.onMenuItemClick));
      } else {
        forEach(elements, (element) => element.removeEventListener('click', this.onMenuItemClick));
      }
    },

    /**
     * Will be called when scrolling event is triggered to handle the addition of the active class
     * in the current section item and fire the change event.
     */
    onScroll(event) {
      this.currentItem = this.getItemInsideWindow();
      const sectionHasChanged = this.currentItem !== this.lastActiveItem;

      if (sectionHasChanged) {
        this.removeActiveClass();
        this.$emit('itemchanged', event, this.currentItem, this.lastActiveItem);
        this.lastActiveItem = this.currentItem;
      }

      // Check first because item might be null if not inside any section
      if (this.currentItem) this.currentItem.classList.add(this.activeClass);
    },

    /**
     * Gets the scrollactive item that corresponds to the current section inside the window
     */
    getItemInsideWindow() {
      let currentItem;

      forEach(this.items, ({ menuElement, section }, index) => {
        const isFirstItem = index === 0;
        const distanceFromTop = this.scrollContainer.getDistanceFromTop();
        const targetOffsetTop = this.getOffsetTop(section) - this.offset;
        const isScreenPastSectionStart = distanceFromTop >= targetOffsetTop;
        const isScreenBeforeSectionEnd = distanceFromTop < targetOffsetTop + section.offsetHeight;
        const isScreenInsideSection = isScreenPastSectionStart && isScreenBeforeSectionEnd;

        if (isFirstItem && this.highlightFirstItem) {
          if (isScreenBeforeSectionEnd) currentItem = menuElement;
        }

        if (this.exact && isScreenInsideSection) currentItem = menuElement;
        if (!this.exact && isScreenPastSectionStart) currentItem = menuElement;
      });

      return currentItem;
    },

    /**
     * Handles the scrolling when clicking a menu item.
     */
    async onMenuItemClick(event) {
      event.preventDefault();

      const menuItem = event.target;
      const sectionSelector = getSectionSelector(menuItem);
      const section = document.querySelector(sectionSelector);

      if (!section) {
        console.warn(
          `[vue-scrollactive] Element '${sectionSelector}' was not found. Make sure it is set in the DOM.`
        );

        return;
      }

      /**
       *  Temporarily removes the scroll listener and the request animation frame so the active
       *  class will only be applied to the clicked element, and not all elements while the window
       *  is scrolling.
       */
      if (!this.alwaysTrack) {
        this.scrollContainer.removeScrollListener();
        window.cancelAnimationFrame(this.scrollAnimationFrame);

        this.removeActiveClass();
        menuItem.classList.add(this.activeClass);
      }

      await this.scrollTo(section);

      if (!this.alwaysTrack) {
        this.scrollContainer.addScrollListener(this.onScroll);
        this.currentItem = menuItem;

        if (this.currentItem !== this.lastActiveItem) {
          this.$emit('itemchanged', event, this.currentItem, this.lastActiveItem);
          this.lastActiveItem = this.currentItem;
        }
      }

      if (this.modifyUrl) {
        pushHashToUrl(getSectionIdFromElement(menuItem));
      }
    },

    /**
     * Scrolls the page to the given target element.
     */
    scrollTo(target) {
      return new Promise((resolve) => {
        const targetDistanceFromTop = this.getOffsetTop(target);
        const startingY = this.scrollContainer.getDistanceFromTop();
        const distanceFromTarget = targetDistanceFromTop - startingY;
        const easing = this.bezierEasing(...this.cubicBezierArray);
        let startingTime = null;

        const step = (currentTime) => {
          if (!startingTime) startingTime = currentTime;

          let progress = currentTime - startingTime;
          let progressPercentage = progress / this.duration;

          if (progress >= this.duration) progress = this.duration;
          if (progressPercentage >= 1) progressPercentage = 1;

          const offset = this.scrollOffset || this.offset;
          const perTick = startingY + easing(progressPercentage) * (distanceFromTarget - offset);

          this.scrollContainer.scrollTo(0, perTick);

          if (progress < this.duration) {
            this.scrollAnimationFrame = window.requestAnimationFrame(step);
          } else {
            resolve();
          }
        };

        window.requestAnimationFrame(step);
      });
    },

    /**
     * Gets the top offset position of an element in the document.
     */
    getOffsetTop(element) {
      let yPosition = 0;
      let nextElement = element;

      while (nextElement) {
        yPosition += nextElement.offsetTop;
        nextElement = nextElement.offsetParent;
      }

      if (this.scrollContainer.getOffsetTop()) {
        yPosition -= this.scrollContainer.getOffsetTop();
      }

      return yPosition;
    },

    /**
     * Removes the active class from all scrollactive items.
     */
    removeActiveClass() {
      // Must be called with 'call' to prevent bugs on some devices
      forEach(this.items, ({ menuElement }) => {
        menuElement.classList.remove(this.activeClass);
      });
    },

    /**
     * Scrolls the page to the element passed as a hash in URL, preventing weird native scroll
     * jumps while maintaining the hash in the URL.
     */
    scrollToHashElement() {
      const { hash } = window.location;
      if (!hash) return;

      const hashElement = document.getElementById(getIdFromHash(hash));
      if (!hashElement) return;

      window.location.hash = ''; // Clears the hash to prevent scroll from jumping

      setTimeout(() => {
        const yPos = hashElement.offsetTop - this.offset;

        this.scrollContainer.scrollTo(0, yPos);
        // Sets the hash back with pushState so it won't jump to the element ignoring the offset
        pushHashToUrl(hash);
      }, 0);
    },
  },
};
</script>

<template>
  <component :is="tag" ref="scrollactive-nav-wrapper" class="scrollactive-nav">
    <slot />
  </component>
</template>
