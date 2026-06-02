import { computed, defineComponent, ref, useAttrs } from "vue";

export const MagneticLink = defineComponent({
  name: "MagneticLink",
  props: {
    href: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(props, { slots }) {
    const attrs = useAttrs();
    const elementRef = ref<HTMLAnchorElement | null>(null);
    const x = ref(0);
    const y = ref(0);
    const isHovering = ref(false);

    const linkStyle = computed(() => ({
      transform: `translate3d(${x.value}px, ${y.value}px, 0)`,
      transition: isHovering.value
        ? "transform 90ms linear"
        : "transform 240ms cubic-bezier(0.16, 1, 0.3, 1)",
      willChange: "transform",
    }));

    const handleMouseMove = (event: MouseEvent) => {
      if (!elementRef.value) return;

      const { left, top, width, height } = elementRef.value.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      isHovering.value = true;
      x.value = (event.clientX - centerX) * 0.35;
      y.value = (event.clientY - centerY) * 0.35;
    };

    const handleMouseLeave = () => {
      isHovering.value = false;
      x.value = 0;
      y.value = 0;
    };

    return () => (
      <a
        ref={elementRef}
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        onMousemove={handleMouseMove}
        onMouseleave={handleMouseLeave}
        style={linkStyle.value}
        class={["relative inline-flex items-center justify-center", attrs.class, props.className]}
      >
        <span class="relative z-10 flex h-full w-full items-center justify-center">
          {slots.default?.()}
        </span>
      </a>
    );
  },
});
