# PHP.net homepage concept

Design by Jack McDade of Statamic.

Notes from Jack:
This concept gives the homepage a new story while keeping it visibly connected to the [approved PHP 8.5 release page](https://www.php.net/releases/8.5/en.php). These are the clearest points of continuity to show the committee.

## What carries over

- **PHP identity:** The familiar PHP wordmark, violet accents, and prominent version number remain central to the design.
- **Header conventions:** Downloads, Documentation, language selection, search, and a light/dark toggle retain the release page’s familiar navigation pattern.
- **The footer:** The PHP 8.5 footer is preserved as a whole, apart from its design-contest credit.
- **Card language:** Rounded cards, fine borders, generous padding, and little to no visible shadow follow the release page’s restrained approach. The small floating logo badges are a deliberate accent, not a new treatment for every card.
- **Texture and geometry:** Faint repeating patterns and understated technical details continue the release page’s background language. The new circuit texture uses [Hero Patterns](https://heropatterns.com/); it is not the same pattern used on the release page.
- **Icons and SVGs:** The PHP 8.5 feature icons follow the approved page directly. Other small interface icons use [Heroicons](https://heroicons.com/) and keep the same simple outline feel.
- **Type hierarchy:** Both pages use strong sans-serif headings, readable body copy, and monospace for code. This concept uses Inter Variable and IBM Plex Mono, while the release page uses a system sans stack. The visual difference is small; the homepage could use the same system sans with minimal layout changes if preferred.
- **Color and controls:** Violet primary actions, quiet secondary links, rounded controls, and light and dark themes keep the interface in the same visual family.
- **Release content:** URI Extension, Pipe Operator, and Clone With retain the approved names, descriptions, and icon ideas, with a link to the complete PHP 8.5 page.
- **Paths into PHP.net:** The homepage continues to send readers to the existing downloads, documentation, release, community, and Foundation destinations.

## What the homepage adds

The new content explains PHP’s role across the web, shows its package ecosystem, and gives visitors clear next steps. A larger hero illustration, interactive code editor, Foundation callout, and small release timeline extend the approved visual language for the broader job of a homepage.

## Sharing

The SVG icons are embedded into `index.html` so it can be opened directly after unzipping; the SVG files are also included for editing. Tailwind and the web fonts still load from online CDNs.