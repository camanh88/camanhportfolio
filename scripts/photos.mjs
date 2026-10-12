// Photo manifest: output id -> [original (relative to PORT 26/), alt text written from the actual photo, options].
// Originals are read-only; optimised copies go to site/public/img/.
const C = 'Photo/Cover & Introduction';
export const photos = {
  // Cover: one photo, shown whole
  'cover-main': [`${C}/Cover/Cover Opt 1.heic`, 'Cam Anh in a blue shirt and cream trousers, seen from behind, looking up at a large gong between red temple pillars patterned in gold.'],
  // Get to know me: one photo per chapter
  'know-01': [`${C}/Get to know me/IMG_7528.heic`, 'Cam Anh in profile, hair in a clip, looking closely at a mirror-polished silver sculpture in a pale gallery.'],
  'know-02': [`${C}/Get to know me/1M2A6839 2.jpg`, 'Cam Anh in a pink shirt and apron photographing her reflection with a camera, between shelves of green gift boxes and dried flowers.'],
  'know-03': [`${C}/Get to know me/IMG_7801 copy.HEIC`, 'A parcel wrapped in kraft paper with a cream ribbon and an illustrated card, held in front of a shopfront.'],
  'know-04': [`${C}/Get to know me/IMG_4472.heic`, 'A hand opening gold foil to reveal a dark chocolate bar stamped with an M, on a wooden table.'],
  'know-05': [`${C}/Get to know me/IMG_0637.PNG`, 'Cam Anh in a peach t-shirt styling a table of plated dishes beside a large softbox light and a camera on a tripod.', { trim: true }],
  // Core skills
  'skill-1': [`${C}/Core Skills/IMG_0259-2.jpg`, 'A woman in a yellow ao dai holding a green Cốm Mùa Trăng gift box above a bamboo basket of leaf-wrapped cakes.'],
  'skill-2': [`${C}/Core Skills/11.PNG`, 'An open gift box whose lid is printed with an illustrated Cốm Mùa Trăng story, lit by a slanting beam of light on a dark green ground.'],
  'skill-3': [`${C}/Core Skills/1M2A1390 2.jpg`, 'Baked mooncakes on a pale plate, one broken open to show a golden egg-yolk and green cốm filling.'],
  'skill-4': [`${C}/Core Skills/1M2A6891.jpg`, 'Cam Anh in a pink shirt and dark apron arranging flowers at a shop counter, with green shelves of gift boxes behind her.'],
};
