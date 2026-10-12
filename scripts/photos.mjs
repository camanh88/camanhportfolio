// Photo manifest: output id -> [original (relative to PORT 26/), alt text written from the actual photo, options].
// Originals are read-only; optimised copies go to site/public/img/.
const C = 'Photo/* Cover & Introduction'; // Cam Anh renamed this folder (with a "* " prefix)
const W = 'Photo/02/OTHERS';
const P = 'Photo/02/PHOTOSHOOT';
export const photos = {
  // Cover: Cam Anh's own collage (6000x3375), shown whole at 16:9, no cropping
  'cover-1': [`${C}/COVER.jpg`, 'A collage: Cam Anh in a blue shirt stands between red temple pillars with gold tops, in front of a wall of thick vertical stripes of colourful paint, on a green woven mat, against a red-to-green gradient.', { hero: true }],
  // Get to know me: one photo per timeline entry, cropped to the proportions Cam Anh laid out
  'know-1': [`${C}/Get to know me/1.heic`, 'Cam Anh in profile, hair in a clip, looking closely at a mirror-polished silver sculpture in a pale gallery.', { crop: { aspect: 1.5 } }],
  'know-2-1': [`${C}/Get to know me/2.1.jpg`, 'Cam Anh in a pink shirt and apron photographing her reflection with a camera, between shelves of green gift boxes and dried flowers.', { crop: { aspect: 0.625, x: 0.43 } }],
  'know-2-2': [`${C}/Get to know me/2.2.PNG`, 'Cam Anh in a peach t-shirt styling a table of plated dishes beside a large softbox light and a camera on a tripod.', { trim: true, crop: { aspect: 1.65, zoom: 1.25, x: 0.55, y: 0.5 } }],
  'know-3': [`${C}/Get to know me/3.heic`, 'A parcel wrapped in kraft paper with a cream satin ribbon and an illustrated card, held in front of a shopfront.', {}],
  'know-4': [`${C}/Get to know me/4.heic`, 'A hand opening gold foil to reveal a dark chocolate bar stamped with an M, on a wooden table.', {}],
  // Core skills
  'skill-1': [`${C}/Core Skills/IMG_0259-2.jpg`, 'A woman in a yellow ao dai holding a green Cốm Mùa Trăng gift box above a bamboo basket of leaf-wrapped cakes.'],
  'skill-2': [`${C}/Core Skills/11.PNG`, 'An open gift box whose lid is printed with an illustrated Cốm Mùa Trăng story, lit by a slanting beam of light on a dark green ground.'],
  'skill-3': [`${C}/Core Skills/1M2A1390 2.jpg`, 'Baked mooncakes on a pale plate, one broken open to show a golden egg-yolk and green cốm filling.'],
  'skill-4': [`${C}/Core Skills/1M2A6891.jpg`, 'Cam Anh in a pink shirt and dark apron arranging flowers at a shop counter, with green shelves of gift boxes behind her.'],
  // ---- Chapter 01: It started with culture ----
  'c1-open': [`${W}/CA at work/prefer/IMG_1478.HEIC`, 'Cam Anh in a grey shirt, hair in a clip, raising a camera to photograph a framed painting of a seated woman on a deep navy gallery wall.', { crop: { aspect: 0.8, x: 0.2 } }],
  'c1-intro': [`${W}/CA at work/prefer/IMG_3341.heic`, 'Black-and-white photo of Cam Anh crouching to shoot beside a tall lantern pierced with small holes.'],
  'c1-big': [`${P}/Gallery/1M2A5092.webp`, 'A dark navy gallery room: a bronze incense burner on a plinth in front of a bright doorway, a flower arrangement on a column at each side.'],
  'c1-mood-1': [`${W}/Moodboard/IMG_4211.jpg`, 'A moodboard print: a living room with a large orange portrait painting above a cream sofa and a round black table.'],
  'c1-shoot-1': [`${W}/CA at work/prefer/IMG_3292.HEIC`, 'A photographer working in a navy gallery, a single beam of light and a tripod among gilded frames and porcelain.'],
  'c1-mood-2': [`${W}/Moodboard/IMG_4224.jpg`, 'A moodboard print: a dining table with two painted vases in front of a wall of dark shelving.'],
  'c1-studio-1': [`${W}/Studio Visit/IMG_2791.HEIC`, 'A painter seated before a huge dark canvas of many figures, a brush in his hand.'],
  'c1-studio-2': [`${W}/Studio Visit/IMG_2804.HEIC`, 'A painter holding a palette in front of a canvas of a girl in a white dress with a chessboard.'],
  'c1-studio-3': [`${W}/Studio Visit/IMG_2894.HEIC`, 'A studio wall of shelves lined with paint tubes, bottles and brushes.'],
  'c1-studio-4': [`${W}/Studio Visit/IMG_5406.jpg`, 'An artist in a bandana and dark t-shirt, eyes closed, gesturing as he talks.'],
  'c1-studio-5': [`${W}/Studio Visit/IMG_7736.HEIC`, 'An artist holding up a crowded, colourful painting on an orange panel.'],
  'c1-studio-6': [`${W}/Studio Visit/IMG_7733.HEIC`, 'An artist sitting cross-legged on the floor leafing through a book, tea cups and fruit beside him.'],
  'c1-studio-7': [`${W}/Studio Visit/Screenshot 2026-10-10 at 11.41.02.png`, 'Hands squeezing a tube of red paint and a tube of blue paint at a small wooden table.'],
  'c1-studio-8': [`${W}/Studio Visit/IMG_2899.HEIC`, 'Cam Anh and a colleague listening to an artist in his cluttered studio.'],
  // album 1: the Indochine villa
  'c1-villa-1': [`${P}/Indochine Villa/2606.webp`, 'A white porcelain Guanyin figure seated on a lotus base, on a black lacquer table with gold motifs.'],
  'c1-villa-2': [`${P}/Indochine Villa/Untitled_Artwork+1+(1).webp`, 'A dark-wood Indochine villa sitting room with carved screens, a framed painting and a daybed.'],
  'c1-villa-3': [`${P}/Indochine Villa/2606-18.webp`, 'A tall painted lidded jar on a pedestal by a green pool, hibiscus flowers behind it.'],
  'c1-villa-4': [`${P}/Indochine Villa/2606-6.webp`, 'Two slim vases on the edge of a tiled pool under the eaves of a tiled-roof house.'],
  'c1-villa-5': [`${P}/Indochine Villa/716.webp`, 'A rocking chair and a painted jar on a shaded wooden veranda among green leaves.'],
  'c1-villa-6': [`${P}/Indochine Villa/2606-2.webp`, 'A porcelain Guanyin on a lacquer chest beside a tall green-glazed vase.'],
  'c1-villa-7': [`${P}/Indochine Villa/Untitled_Artwork+3+(1).webp`, 'A carved wooden console with two lidded vases and a framed painting of figures.'],
  'c1-villa-8': [`${P}/Indochine Villa/2606-21.webp`, 'A porcelain dish painted with an orange fish among flowers, dappled in shadow.'],
  // album 2: the modern apartment
  'c1-apt-1': [`${P}/Morden House/1M2A4038-2.webp`, 'A large orange abstract portrait painting on a white wall under copper ring lights.'],
  'c1-apt-2': [`${P}/Morden House/1M2A4164.webp`, 'A bright living room with a pink-and-green painting, a cream sofa and a bouquet on a round table.'],
  'c1-apt-3': [`${P}/Morden House/1M2A4019-2.webp`, 'A modern living room: cream sofa, black round table and an orange painting by tall windows.'],
  'c1-apt-4': [`${P}/Morden House/1M2A4158.webp`, 'Pink roses and dahlias in a silver vase on a coffee table beside a bronze figure.'],
  'c1-apt-5': [`${P}/Morden House/1M2A4110-3.webp`, 'A tall painted porcelain vase on a marble table in front of dark shelves.'],
  'c1-apt-6': [`${P}/Morden House/1M2A4078-3.webp`, 'A porcelain vase holding a leafy branch below a framed still-life painting.'],
  'c1-apt-7': [`${P}/Morden House/1M2A4172.webp`, 'A pink painting above a sofa, a bouquet and a bronze figure on the round table.'],
  // Catalogue 03 (one representative photo)
  'c1-catalogue': [`${W}/Catalogue/3.webp`, 'The Indochine House catalogue standing on a round table in front of a soft abstract painting.'],
  // in the gallery
  'c1-gal-1': [`${P}/Gallery/1M2A5133.webp`, 'The long white gallery hall with large paintings on both walls and a silver sculpture at the end.'],
  'c1-gal-2': [`${P}/Gallery/1M2A5128.webp`, 'A flower arrangement with white orchids in a dark vase against a deep blue wall.'],
  'c1-gal-3': [`${P}/Gallery/1M2A5158.webp`, 'A framed painting of figures hanging on a sunlit gallery wall, a plant in the foreground.'],
};
