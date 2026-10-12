// Photo manifest: output id -> [original (relative to PORT 26/), alt text written from the actual photo, options].
// Originals are read-only; optimised copies go to site/public/img/.
const C = 'Photo/Cover & Introduction';
export const photos = {
  // Cover: four options, all cropped to a landscape 3:2 master for a full-width hero (?cover=1..4 previews them)
  'cover-1': [`${C}/Cover/Cover Opt 1.heic`, 'Cam Anh in a blue shirt and cream trousers, seen from behind, looking up at a large gong between red temple pillars patterned in gold.', { crop: { aspect: 1.5, y: 0.89 }, hero: true }],
  'cover-2': [`${C}/Cover/Cover Opt 2.JPG`, 'The silhouette of Cam Anh in profile against a low sun over the sea, a small swimmer in the water behind her.', { crop: { aspect: 1.5 }, hero: true }],
  'cover-3': [`${C}/Cover/Cover Opt 3.heic`, 'Cam Anh in a white t-shirt arranging glazed ceramic bowls on a dark wooden table in a pottery shop with shelves of bowls behind her.', { crop: { aspect: 1.5, y: 0.8 }, hero: true }],
  'cover-4': [`${C}/Cover/Cover Opt 4.HEIC`, 'The silhouette of Cam Anh from behind, one hand at her ear, against a wall of thick vertical stripes of colourful paint.', { crop: { aspect: 1.5, y: 0.74 }, hero: true }],
  // Get to know me: one photo per timeline entry, cropped to the proportions Cam Anh laid out (3:2, 5:8, 33:20, 1:1, 0.46)
  'know-01': [`${C}/Get to know me/1.heic`, 'Cam Anh in profile, hair in a clip, looking closely at a mirror-polished silver sculpture in a pale gallery.', { crop: { aspect: 1.5 } }],
  'know-02': [`${C}/Get to know me/2.jpg`, 'Cam Anh in a pink shirt and apron photographing her reflection with a camera, between shelves of green gift boxes and dried flowers.', { crop: { aspect: 0.625, x: 0.43 } }],
  'know-03': [`${C}/Get to know me/3.PNG`, 'Cam Anh in a peach t-shirt styling a table of plated dishes beside a large softbox light and a camera on a tripod.', { trim: true, crop: { aspect: 1.65, y: 0.2 } }],
  'know-04': [`${C}/Get to know me/4.HEIC`, 'A parcel wrapped in kraft paper with a cream ribbon and an illustrated card, held in front of a shopfront.', { crop: { aspect: 1.0, y: 0.3 } }],
  'know-05': [`${C}/Get to know me/5.heic`, 'A hand opening gold foil to reveal a dark chocolate bar stamped with an M, on a wooden table.', { crop: { aspect: 0.46, x: 0.2 } }],
  // Core skills
  'skill-1': [`${C}/Core Skills/IMG_0259-2.jpg`, 'A woman in a yellow ao dai holding a green Cốm Mùa Trăng gift box above a bamboo basket of leaf-wrapped cakes.'],
  'skill-2': [`${C}/Core Skills/11.PNG`, 'An open gift box whose lid is printed with an illustrated Cốm Mùa Trăng story, lit by a slanting beam of light on a dark green ground.'],
  'skill-3': [`${C}/Core Skills/1M2A1390 2.jpg`, 'Baked mooncakes on a pale plate, one broken open to show a golden egg-yolk and green cốm filling.'],
  'skill-4': [`${C}/Core Skills/1M2A6891.jpg`, 'Cam Anh in a pink shirt and dark apron arranging flowers at a shop counter, with green shelves of gift boxes behind her.'],
};
