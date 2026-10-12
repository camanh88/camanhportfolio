// Photo manifest: output id -> [original (relative to PORT 26/), alt text written from the actual photo, options].
// Originals are read-only; optimised copies go to site/public/img/.
const C = 'Photo/Cover & Introduction';
export const photos = {
  // Cover: Cam Anh chose option 4; cropped to a 3:2 master for the full-width hero
  'cover-4': [`${C}/Cover/Cover Opt 4.HEIC`, 'The silhouette of Cam Anh from behind, one hand at her ear, against a wall of thick vertical stripes of colourful paint.', { crop: { aspect: 1.5, y: 0.74 }, hero: true }],
  // Get to know me: one photo per timeline entry, cropped to the proportions Cam Anh laid out
  'know-1': [`${C}/Get to know me/1.heic`, 'Cam Anh in profile, hair in a clip, looking closely at a mirror-polished silver sculpture in a pale gallery.', { crop: { aspect: 1.5 } }],
  'know-2-1': [`${C}/Get to know me/2.1.jpg`, 'Cam Anh in a pink shirt and apron photographing her reflection with a camera, between shelves of green gift boxes and dried flowers.', { crop: { aspect: 0.625, x: 0.43 } }],
  'know-2-2': [`${C}/Get to know me/2.2.PNG`, 'Cam Anh in a peach t-shirt styling a table of plated dishes beside a large softbox light and a camera on a tripod.', { trim: true, crop: { aspect: 1.65, zoom: 1.25, x: 0.55, y: 0.5 } }],
  'know-3': [`${C}/Get to know me/3.HEIC`, 'A parcel wrapped in kraft paper with a cream ribbon and an illustrated card, held in front of a shopfront.', { crop: { aspect: 1.0, zoom: 1.8, x: 0.13, y: 0.55 } }],
  'know-4': [`${C}/Get to know me/4.heic`, 'A hand opening gold foil to reveal a dark chocolate bar stamped with an M, on a wooden table.', { crop: { aspect: 0.46, zoom: 1.1, x: 0.6, y: 0.1 } }],
  // Core skills
  'skill-1': [`${C}/Core Skills/IMG_0259-2.jpg`, 'A woman in a yellow ao dai holding a green Cốm Mùa Trăng gift box above a bamboo basket of leaf-wrapped cakes.'],
  'skill-2': [`${C}/Core Skills/11.PNG`, 'An open gift box whose lid is printed with an illustrated Cốm Mùa Trăng story, lit by a slanting beam of light on a dark green ground.'],
  'skill-3': [`${C}/Core Skills/1M2A1390 2.jpg`, 'Baked mooncakes on a pale plate, one broken open to show a golden egg-yolk and green cốm filling.'],
  'skill-4': [`${C}/Core Skills/1M2A6891.jpg`, 'Cam Anh in a pink shirt and dark apron arranging flowers at a shop counter, with green shelves of gift boxes behind her.'],
};
