# FootWare Template

Responsive e-commerce landing template using Tailwind CDN utilities.

## Section Spacing Convention
- Mobile (<768px): 50px top + bottom (`py-[50px]`)
- Tablet (≥768px): 80px top + bottom (`md:py-[80px]`)
- Desktop (≥1024px): 120px top + bottom (`lg:py-[120px]`)

Applied directly as utility classes on each major section/container (hero, category, deals/products block, CTA banner, features/video block, footer). Internal element paddings remain as originally designed for fine layout control.

## How To Add A New Section
Wrap the section root element with: `class="py-[50px] md:py-[80px] lg:py-[120px]"`.
Keep horizontal container constraints with: `w-full max-w-[1736px] mx-auto px-4 sm:px-6 lg:px-8` inside if needed.

## Tailwind Breakpoints Used
- `md` = 768px (tablet)
- `lg` = 1024px (desktop)

These match the spacing tiers required from the design spec.

## Development Notes
Because Tailwind is loaded via CDN, no custom `@apply` or build step is required. Arbitrary value utilities (`py-[50px]`) are supported by the CDN JIT engine.

## Future Enhancements (Optional)
- Extract repeated spacing into a custom component class once moving to a build pipeline.
- Add dark mode toggle using Tailwind `dark:` variants.
- Implement dynamic product loading via a JSON feed and JS.

## License
Internal project asset; no external license header added per instructions.
