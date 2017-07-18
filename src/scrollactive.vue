<template>
	<nav class="scrollactive-nav">
		<slot></slot>
	</nav>
</template>

<script>
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
				default: 'is-active'
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
				default: 20
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
				default: true
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
				default: 600
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
				default: false
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
				default: '.5,0,.35,1'
			}
		},

		data() {
			return {
				scrollactiveItems: null,
				bezierEasing: require('bezier-easing'),
				lastActiveItem: null
			}
		},

		computed: {
			/**
			 * Transforms the bezier easing string value into an array.
			 *
			 * @return {Array}
			 */
			cubicBezierArray() {
				return this.bezierEasingValue.split(',');
			}
		},

		methods: {
			/**
			 * Will be called when scrolling event is triggered to handle
			 * the addition of the active class in the current section item
			 * and fire the change event.
			 */
			onScroll() {
				let distanceFromTop = window.scrollY;
				let currentItem;

				for (let scrollactiveItem of this.scrollactiveItems) {
					scrollactiveItem.classList.remove(this.activeClass);
					let target = document.getElementById(scrollactiveItem.hash.substr(1));

					if (distanceFromTop >= target.offsetTop - this.offset) {
						currentItem = scrollactiveItem;
					}
				}

				if (currentItem != this.lastActiveItem) {
					// Makes sure to not fire when it's mounted
					if (this.lastActiveItem) this.$emit('itemchanged', event, currentItem, this.lastActiveItem);
					this.lastActiveItem = currentItem;
				}

				if (currentItem) currentItem.classList.add(this.activeClass);
			},

			/**
			 * Sets the initial list of menu items, validating if there's none
			 * or if its hash corresponds to a valid element ID.
			 */
			setScrollactiveItems() {
				let scrollactiveItems = document.querySelectorAll('.scrollactive-item');

				if (scrollactiveItems.length < 1) {
					throw new Error("You must give your menu items a class of 'scrollactive-item' in order to track them.");
				}

				for (let scrollactiveItem of scrollactiveItems) {
					if (!document.getElementById(scrollactiveItem.hash.substr(1))) {
						throw new Error("Element '" + scrollactiveItem.hash + "' was not found. Make sure it is set in the DOM.");
					}
				}

				this.scrollactiveItems = scrollactiveItems;

				if (this.clickToScroll) {
					for (let scrollactiveItem of scrollactiveItems) {
						scrollactiveItem.addEventListener('click', this.scrollToTargetElement);
					}
				} else {
					for (let scrollactiveItem of scrollactiveItems) {
						scrollactiveItem.removeEventListener('click', this.scrollToTargetElement);
					}
				}
			},

			/**
			 * Handles the scrolling when clicking a menu item.
			 */
			scrollToTargetElement(event) {
				event.preventDefault();

				if (!this.alwaysTrack) {
					window.removeEventListener('scroll', this.onScroll);
					window.cancelAnimationFrame(window.AFRequestID);

					for (let scrollactiveItem of this.scrollactiveItems) {
						scrollactiveItem.classList.remove(this.activeClass);
					}

					event.target.classList.add(this.activeClass);
				}

				let vm = this;
				let targetDistanceFromTop = document.getElementById(event.target.hash.substr(1)).offsetTop;
				let startingY = window.pageYOffset;
				let difference = targetDistanceFromTop - startingY;
				let start = null;
				let easing = vm.bezierEasing(this.cubicBezierArray[0], this.cubicBezierArray[1],this.cubicBezierArray[2],this.cubicBezierArray[3]);

				function step(timestamp) {
					if (!start) start = timestamp;

					let progress = timestamp - start;
					let progressPercentage = progress / vm.duration;
					let distanceFromTop = window.scrollY;

					if (progress >= vm.duration) progress = vm.duration;
					if (progressPercentage >= 1) progressPercentage = 1;

					let perTick = startingY + easing(progressPercentage) * (difference - vm.offset);

					window.scrollTo(0, perTick);

					if (progress < vm.duration) {
						window.AFRequestID = window.requestAnimationFrame(step);
					} else {
						window.addEventListener('scroll', vm.onScroll);
					}
				}

				window.requestAnimationFrame(step);
			}
		},

		mounted() {
			this.setScrollactiveItems();
			this.onScroll();
			window.addEventListener('scroll', this.onScroll);
		},

		updated() {
			this.setScrollactiveItems();
		},

		beforeDestroy() {
			window.removeEventListener('scroll', this.onScroll);
			window.cancelAnimationFrame(window.AFRequestID);
		}
	}
</script>
