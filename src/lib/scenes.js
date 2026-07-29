const ASSET_BASE = '/assets'

/**
 * Each scene has:
 * - cardImage / leftImage: clean original
 * - rightImage: modified version (actual visual differences, no answer circles)
 * - differences: 5 normalized hitboxes derived from the annotated answer images
 */
export const SCENES = [
  {
    id: 'airport',
    title: 'Airport Lounge',
    cardImage: `${ASSET_BASE}/Airport_lounge-12f865cd-951b-496c-b4c6-32436cf0139f.png`,
    leftImage: `${ASSET_BASE}/Airport_lounge-12f865cd-951b-496c-b4c6-32436cf0139f.png`,
    rightImage: `${ASSET_BASE}/WhatsApp_Image_2026-07-29_at_15.04.47-3c266579-dde1-4d82-9e3a-94b2a42dda22.png`,
    differences: [
      { id: 'd1', x: 0.25, y: 0.42, w: 0.08, h: 0.12 }, // flight monitor
      { id: 'd2', x: 0.41, y: 0.48, w: 0.11, h: 0.14 }, // brown bag
      { id: 'd3', x: 0.54, y: 0.53, w: 0.14, h: 0.18 }, // ottoman
      { id: 'd4', x: 0.71, y: 0.28, w: 0.05, h: 0.28 }, // window frame
      { id: 'd5', x: 0.78, y: 0.4, w: 0.08, h: 0.12 }, // airplane tail
    ],
  },
  {
    id: 'mona',
    title: 'Mona Lisa Room',
    cardImage: `${ASSET_BASE}/Mona_Lisa-4465d8be-6c0a-44c3-99e6-957004e13be0.png`,
    leftImage: `${ASSET_BASE}/Mona_Lisa-4465d8be-6c0a-44c3-99e6-957004e13be0.png`,
    rightImage: `${ASSET_BASE}/WhatsApp_Image_2026-07-29_at_15.04.47__1_-b9837881-5958-4ef4-bb62-015353c473e6.png`,
    differences: [
      { id: 'd1', x: 0.34, y: 0.06, w: 0.1, h: 0.14 }, // yellow wall object
      { id: 'd2', x: 0.08, y: 0.38, w: 0.1, h: 0.16 }, // windowsill plant
      { id: 'd3', x: 0.7, y: 0.27, w: 0.1, h: 0.14 }, // bookshelf picture
      { id: 'd4', x: 0.9, y: 0.3, w: 0.09, h: 0.16 }, // red plant leaf
      { id: 'd5', x: 0.25, y: 0.48, w: 0.1, h: 0.14 }, // desk toy
    ],
  },
  {
    id: 'gateway',
    title: 'Gateway of India',
    cardImage: `${ASSET_BASE}/Gateway_of_India-8544491b-1b3e-4b0e-86fb-e254537e0677.png`,
    leftImage: `${ASSET_BASE}/Gateway_of_India-8544491b-1b3e-4b0e-86fb-e254537e0677.png`,
    rightImage: `${ASSET_BASE}/WhatsApp_Image_2026-07-29_at_15.04.48__1_-8d47e71e-c157-482f-9d95-cc019ead39ad.png`,
    differences: [
      { id: 'd1', x: 0.4, y: 0.1, w: 0.07, h: 0.1 }, // bird in sky
      { id: 'd2', x: 0.36, y: 0.38, w: 0.09, h: 0.12 }, // small dome
      { id: 'd3', x: 0.86, y: 0.42, w: 0.11, h: 0.18 }, // far-right building
      { id: 'd4', x: 0.46, y: 0.84, w: 0.1, h: 0.14 }, // people
      { id: 'd5', x: 0.82, y: 0.8, w: 0.14, h: 0.18 }, // auto-rickshaw
    ],
  },
  {
    id: 'popcorn',
    title: 'Popcorn & Clapperboard',
    cardImage: `${ASSET_BASE}/Popcorn___clapperboard_setup-00c325c5-b2d3-4bc2-ac4d-096d0a9a0339.png`,
    leftImage: `${ASSET_BASE}/Popcorn___clapperboard_setup-00c325c5-b2d3-4bc2-ac4d-096d0a9a0339.png`,
    rightImage: `${ASSET_BASE}/WhatsApp_Image_2026-07-29_at_15.04.48-d7ea67f2-61c1-4b22-8146-4edc9eb5a993.png`,
    differences: [
      { id: 'd1', x: 0.44, y: 0.22, w: 0.12, h: 0.14 }, // boombox sticker
      { id: 'd2', x: 0.79, y: 0.25, w: 0.1, h: 0.15 }, // hourglass
      { id: 'd3', x: 0.86, y: 0.55, w: 0.12, h: 0.2 }, // vinyl records
      { id: 'd4', x: 0.06, y: 0.6, w: 0.14, h: 0.18 }, // cake slice
      { id: 'd5', x: 0.48, y: 0.88, w: 0.1, h: 0.1 }, // confetti
    ],
  },
  {
    id: 'ferris',
    title: 'Ferris Wheel Park',
    cardImage: `${ASSET_BASE}/Ferris_wheel-6a3a3b93-68fc-477b-9932-e3f98baa149f.png`,
    leftImage: `${ASSET_BASE}/Ferris_wheel-6a3a3b93-68fc-477b-9932-e3f98baa149f.png`,
    rightImage: `${ASSET_BASE}/WhatsApp_Image_2026-07-29_at_15.04.48__2_-a4f70ce2-f71e-40a3-87f0-001fbb42feec.png`,
    differences: [
      { id: 'd1', x: 0.16, y: 0.1, w: 0.14, h: 0.16 }, // cloud
      { id: 'd2', x: 0.4, y: 0.08, w: 0.12, h: 0.16 }, // gondola
      { id: 'd3', x: 0.82, y: 0.2, w: 0.1, h: 0.14 }, // flag / spire
      { id: 'd4', x: 0.2, y: 0.6, w: 0.14, h: 0.22 }, // mid-left tree
      { id: 'd5', x: 0.9, y: 0.55, w: 0.09, h: 0.2 }, // far-right foliage
    ],
  },
]

export const BACKGROUND = `${ASSET_BASE}/Memory_game_1920x1080px_Back-926e4707-4ab5-483b-a13c-e1082dd88189.png`
export const THANK_YOU = `${ASSET_BASE}/Memory_game_1920x1080px_Thank_you-67e6eee5-3fa5-4a2d-bf68-ae62fa7bc4c3.png`
export const BETTER_LUCK = `${ASSET_BASE}/Memory_game_1920x1080px_Next_time-bae52b4f-e894-4fc2-be7d-939cca2f4451.png`

export const GAME_DURATION_SECONDS = 45

export function getSceneById(sceneId) {
  return SCENES.find((s) => s.id === sceneId) || null
}
