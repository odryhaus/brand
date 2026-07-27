# .BRAND Capabilities Page — Final Pre-Launch Audit

Date: 2026-07-27  
Scope: UA `/brand/capabilities.html` and EN `/brand/en/capabilities.html`  
Status: Ready for visual review. Not deployed.

## Files Reviewed / Updated

- `capabilities.html`
- `en/capabilities.html`
- `style.css`
- `script.js`
- `PRODUCTION_FINAL_AUDIT.md`

## Summary Of Changes

- Kept the existing editorial visual concept, neutral background, monochrome typography and structural INDEX.
- Added category labels to the four Finishing groups in UA and EN.
- Fixed approved UA copy issues: `використовується кілька технологій друку` and `відповідно до завдання`.
- Polished EN copy terms: `Production in plain sight`, `Bookbinding board`, `Screw-post Binding`, and shortened `From short runs of 20...`.
- Moved Google Fonts loading from CSS `@import` into HTML `<link>` tags with `preconnect`.
- Added inline favicon to remove the `/favicon.ico` 404 warning.
- Improved small-label contrast for accessibility while keeping the same muted editorial look.
- Added visible keyboard focus styles.
- Added reduced-motion support.
- Improved direct anchor handling and active INDEX state via `IntersectionObserver`.
- Hid the vertical INDEX on tablet/mobile and on narrower desktop widths where it squeezes content.

## Design / Layout Audit

### Hero

- H1 remains the primary editorial object.
- Hero copy remains intentionally narrower than H1, as specified.
- Hero copy max width was increased slightly from `64ch` to `68ch`, within the requested 5–10% range.
- Desktop hero copy measures approximately `686px`.
- The text still reads as an editorial paragraph, not a full-width block.

### INDEX

- Desktop INDEX remains in the editorial grid.
- INDEX is sticky on wide desktop.
- INDEX is hidden at `1120px` and below to avoid compressing the main content.
- Active INDEX state is managed with `IntersectionObserver`.
- Active links receive `aria-current="location"`.
- Direct URLs were tested:
  - `/brand/capabilities.html#materials`
  - `/brand/en/capabilities.html#binding`
  - `/brand/en/capabilities.html#contact`

### Responsive Checks

Tested widths:

- `1440px`
- `1280px`
- `1120px`
- `1024px`
- `768px`
- `430px`
- `390px`

Results:

- No horizontal overflow detected.
- Desktop fact block: 4 columns.
- Tablet fact block: 2–3 columns.
- Mobile fact block: 1 column.
- INDEX visible on wide desktop and hidden on narrower screens.
- Contact anchor remains functional.

## SEO Audit

### UA

- One H1 present.
- Canonical present.
- `uk`, `en`, and `x-default` hreflang links present.
- Title updated for commercial printing intent.
- Meta description supports commercial printing, digital, offset, UV, Pantone, white ink, finishing, binding and delivery.
- Open Graph and Twitter metadata added.

### EN

- One H1 present.
- Canonical present.
- `uk`, `en`, and `x-default` hreflang links present.
- Title updated for commercial printing intent in Kyiv.
- Meta description supports digital, offset, UV, white ink, Pantone, print finishing, bookbinding, packing and delivery.
- Open Graph and Twitter metadata added.

## Accessibility Audit

Lighthouse after final polish:

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| UA | 99 | 100 | 100 | 100 |
| EN | 99 | 100 | 100 | 100 |

Key fixes:

- Small editorial labels now meet contrast requirements.
- Keyboard focus is visible.
- Menu button keeps an accessible label.
- Direct anchor navigation remains keyboard/browser friendly.
- Reduced motion is respected.

## Performance Audit

Local file sizes:

- `capabilities.html`: 26.4 KB
- `en/capabilities.html`: 20.5 KB
- `style.css`: 16.3 KB
- `script.js`: 5.9 KB
- Total local page assets before fonts/images: 69.1 KB

Lighthouse lab metrics:

| Page | FCP | LCP | TBT | CLS | Speed Index |
|---|---:|---:|---:|---:|---:|
| UA | 1.6 s | 1.6 s | 0 ms | 0.048 | 1.6 s |
| EN | 1.6 s | 1.6 s | 0 ms | 0.013 | 1.6 s |

Current image weight is effectively zero because real production photos have not been added yet.

Main future performance risk:

- Production photos must be optimized before launch.
- Google Fonts remain an external render-blocking dependency. Current performance is still strong.

## Image Guidance

Create this folder if it does not exist:

`/Users/alla/Documents/site/brand/assets/images/`

Recommended source workflow:

- Keep original photos separately as high-quality JPG/HEIC masters.
- For website use, provide AVIF first and WebP fallback.
- If AVIF/WebP export is inconvenient, place high-quality JPG files in the folder and convert later.

Recommended proportions:

- Main hero / large production photo: `16:9`
- Small production photos: `4:3`
- Existing Instagram `4:5` photos can be cropped to `4:3` for small modules.
- Avoid forcing all photos to `1:1`; it will make the page feel more like a feed than a production page.

Recommended sizes:

- Large photo: `2400 × 1350` master export, plus `1600 × 900` display version.
- Small 4:3 photos: `1600 × 1200` master export, plus `1000 × 750` display version.
- Target weights:
  - large AVIF: under `250–350 KB`
  - small AVIF: under `120–180 KB`
  - WebP fallback: under `250 KB` where possible

Suggested filenames:

- `production-hero.avif`
- `production-space-01.avif`
- `production-space-02.avif`
- `digital-printing.avif`
- `offset-printing.avif`
- `uv-printing.avif`
- `finishing-detail.avif`
- `binding-01.avif`
- `delivery-01.avif`

Photo direction:

- Real production space, not stock-style images.
- Show open-space scale, street-facing glass, equipment, materials and people working.
- Use natural light where possible.
- No heavy filters, no fake mockups, no text baked into photos.
- Detail shots should show material texture, finishing, binding, packing or machine operation.

## Factual Items To Confirm Before Final Publication

These were not removed because they are currently part of the approved capability content, but they should be confirmed internally:

- `Grooving / Грувінг`
- `Epoxy Dome Coating / Заливка смолою (шильди)`
- `Anti-scuff Lamination / Anti-scuff ламінація`
- `Holographic Lamination / Holographic ламінація`
- `Laser Cutting / Лазерна порізка`
- `Raised UV Varnish / Об'ємний УФ-лак`
- `Screw-post Binding / Скріплення на болти`
- Hero claim that every listed stage is completed in-house.

If any listed process is outsourced or only available through a partner, the copy should say that clearly before launch.

## Notes

- No deployment was performed.
- No new visual system was introduced.
- Footer/contact structure was preserved.
- Real production images are still the main missing launch asset.
