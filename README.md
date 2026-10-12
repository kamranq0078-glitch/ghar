# A Day at Home

A small five-scene walk through a Kashmir home, from dawn in the courtyard to a snowy night on the balcony. The noindex setting discourages search engines but does not password-protect a hosted site.

## Preview

Open index.html directly, or run a local server from this folder with python3 -m http.server 8000 and visit http://localhost:8000.

## Scenes and editing

- Dawn courtyard and chinar: scripts/scenes/dawn.js
- Morning kitchen: scripts/scenes/kitchen.js
- Sitting room: scripts/scenes/sitting-room.js
- Mairah’s room and Chunnu’s cradle: scripts/scenes/nursery.js
- Snowy balcony: scripts/scenes/balcony.js

Shared layout and styling are in styles/main.css. scripts/main.js mounts the selected scene, applies the time palette, adds ambient particles, handles taps and swipes, and fades between scenes. The five dots jump to a time; arrows and keyboard arrows move one scene at a time.

The earlier chats identify Kamran and Ainain as a couple. A family keepsake named Mairah as her sister, Chunnu as Mairah’s baby boy, and Duha, Mama, Abbu, and Dadyy as family. No exact house details were available, so the illustrations avoid claiming specific furniture, windows, or plants.

Reduced-motion preferences stop drifting and minimize rocking while leaving each scene visible. Artwork is original inline SVG and CSS. There are no photos, trackers, or analytics. Google Fonts is the optional font CDN, with local fallbacks.

A public static link is viewable by anyone who has it even with the noindex setting. Use an access-controlled host for a genuinely private share.
