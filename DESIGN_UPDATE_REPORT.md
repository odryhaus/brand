# Production Page Visual System Update

## 1. Files Changed

- `capabilities.html`
- `style.css`
- `script.js`
- `DESIGN_UPDATE_REPORT.md`

## 2. Color Tokens

Added the requested reusable tokens:

- `--canvas: #F4F4F0`
- `--ink: #151515`
- `--signal: #3155FF`
- `--inverse-bg: #151515`
- `--inverse-text: #F4F4F0`

The old warmer page background was replaced with the neutral canvas color. The signal blue is used for interaction states, active INDEX state, focus outlines and selected navigation details.

## 3. INDEX Implementation

Old behavior:

- INDEX was part of the structural content grid.
- It reserved a left column and reduced the usable article width.

New behavior:

- INDEX is now a fixed editorial overlay on large desktop.
- It no longer participates in the article grid.
- The article uses a wider editorial content area.
- INDEX is hidden while the hero is active, then becomes visible once the production sections begin.
- Active section state uses signal blue.

Responsive behavior:

- Large desktop: floating INDEX is visible.
- 1280px range: INDEX footprint is reduced.
- 1024px and below: full vertical INDEX is hidden so content is not squeezed.
- Mobile: no persistent INDEX sidebar.

## 4. Typography Changes

- Existing typefaces were preserved.
- Section headings were strengthened.
- Meta labels and INDEX text were kept small and editorial.
- Body copy remains constrained for readable line length.
- Technology headings were adjusted to sit between body text and large section H2 scale.

## 5. Spacing / Rhythm Changes

Introduced spacing modes through section classes:

- `secAir`
- `secMedium`
- `secDense`

The page now follows a more varied rhythm instead of equal spacing on every section:

- Hero: large neutral opening
- Production space: air
- Printing technologies: dense
- Materials: air
- Finishing: dense / inverse contrast
- Binding: air
- Delivery: medium
- Workflow: dense
- Contact: air / strong ending

## 6. Inverse Section

The `Післядрукарська обробка` section now uses the inverse treatment:

- background: `#151515`
- text: `#F4F4F0`
- subtle light rules and placeholder treatment

The dark background is implemented with a full-viewport extension using the section background, not a separate card or container.

The inversion is isolated through the `secInverse` class so it can be removed or reused later without changing the section content.

## 7. Accessibility Checks

Checked:

- `#151515` on `#F4F4F0`
- `#F4F4F0` on `#151515`
- visible keyboard focus via `:focus-visible`
- no horizontal overflow in tested viewports

Signal blue is used mainly for active/interactive states. On the inverse section, the INDEX can switch to light inactive text with signal blue active text.

## 8. Responsive Checks

Tested locally at:

- 1440px
- 1280px
- 1024px
- 768px
- 390px

Observed:

- no horizontal overflow;
- INDEX visible only on desktop ranges;
- INDEX hidden on tablet/mobile;
- hero facts remain responsive;
- one H1 remains on the page;
- section anchors remain present.

Local review route:

- `http://localhost:4177/brand/capabilities.html`

## 9. Intentionally Left Unchanged

- Page copy was not rewritten.
- EN page HTML was not edited in this step.
- Existing photography placeholders and aspect ratios were preserved.
- Header, footer and contact content were preserved.
- Product/content hierarchy was preserved.

## 10. Global Style Impact

Global styles were changed in `style.css`.

Potentially affected pages:

- `/brand/capabilities.html`
- `/brand/en/capabilities.html`
- any other page that currently reuses `style.css`

The UA page received the new section rhythm classes and the inverse finishing section. The EN page may inherit global color, typography, link and responsive style token changes from the shared stylesheet, but its HTML structure was not updated in this pass.

## 11. Anchor Links

Existing section anchors remain:

- `#facility`
- `#printing`
- `#materials`
- `#finishing`
- `#binding`
- `#logistics`
- `#workflow`
- `#contact`

The header contact link still points to `#contact`.

## 12. Deployment

No production deployment was performed. This update is ready for local visual review first.
