# Lumi Landing Project Rules

## Local Preview And Build Rules

- The app at `http://127.0.0.1:3000/` may be serving the production bundle from `dist/public`, not the Vite dev server source files.
- Before claiming a visual CSS/React change is visible in the browser, verify which asset the page is loading by checking the HTML for `/assets/index-*.css` or Vite dev paths such as `/src/main.tsx`.
- If the page references `/assets/index-*.css`, edits in `client/src` will not appear until the frontend is rebuilt.
- For frontend visual changes, prefer this verification sequence:
  1. Edit source files under `client/src`.
  2. Run `node_modules/.bin/vite.CMD build` from the project root.
  3. Confirm `dist/public/index.html` references the newly generated CSS/JS asset names.
  4. Reload `http://127.0.0.1:3000/` and verify the visible page.
- If `pnpm run build` fails because pnpm tries to write outside the workspace, use the local binaries directly: `node_modules/.bin/vite.CMD build` for the frontend bundle and `node_modules/.bin/esbuild.CMD server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist` only when the server bundle is needed.
- Do not assume Hot Module Reload applies on port 3000. Prove the active serving mode first.

## Narrative Visual Asset Rules

- For story-critical scenes, especially the third act background layer, do not reuse existing project images just because they are available.
- The third act first layer must be generated from the current narrative intent: memory resurfacing, scattered self-clues, warm quiet light, and the feeling that saved fragments are becoming visible again.
- Existing assets such as the hero image, Lumi character image, subway scene, or previous background images may be used only as broad style references, not as substitutes for a newly generated scene.
- If a required scene image is missing, generate a new raster asset with the image generation workflow before implementing the HTML/CSS layer.
- The third act should not visually imply a workplace assistant, task assistant, or chat companion. Its imagery should express self-recognition, remembered attraction, and future-self clues.
- Lumi's character appearance must stay consistent with the approved warm-gold Chinese anime / illustrated references: high bun with loose strands, soft youthful face, black high-neck inner layer, loose warm taupe outer cardigan or robe, gentle golden light, refined hand-painted texture. Do not generate Lumi as a photorealistic person, Western fashion model, generic 3D avatar, office assistant, or unrelated character style.
