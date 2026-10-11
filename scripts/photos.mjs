// Photo manifest: output id -> original (relative to PORT 26/) + alt text written from the actual photo.
// Originals are read-only; optimised copies go to site/public/img/.
const P = '02/PHOTOSHOOT', O = '02/OTHERS';
export const photos = {
  // Cover
  'cover-ca-1': [`${O}/CA at work/prefer/IMG_1478.HEIC`, 'Cam Anh in a grey shirt raising a camera to photograph a framed painting in a dark navy gallery.'],
  'cover-ca-2': [`${O}/CA at work/prefer/IMG_7528.heic`, 'Cam Anh in profile, hair in a clip, looking closely at a silver balloon-like sculpture.'],
  // 02: moodboards
  'ch02-moodboard-1': [`${O}/Moodboard/IMG_4211.jpg`, 'A moodboard print: a bright living room with a large orange portrait painting above a cream sofa.'],
  'ch02-moodboard-2': [`${O}/Moodboard/IMG_4198.JPG`, 'A moodboard print: a reclining-figure painting above a white sideboard with two decorated vases.'],
  'ch02-moodboard-3': [`${O}/Moodboard/IMG_4213.jpg`, 'A moodboard print: a grid of small framed pictures on a wall behind a long table with laptops and pink flowers.'],
  'ch02-moodboard-4': [`${O}/Moodboard/IMG_4218.JPG`, 'A moodboard print: a bronze seated figure on a marble base beside a blue-and-white jar.'],
  'ch02-moodboard-5': [`${O}/Moodboard/IMG_4224.jpg`, 'A moodboard print: a dining table with two painted vases in front of a dark shelving wall.'],
  'ch02-moodboard-6': [`${O}/Moodboard/IMG_0325.jpg`, 'A moodboard print: a sofa under a painting, with a yellow hand-drawn arrow marking where the artwork should hang.'],
  // 02: on the shoots
  'ch02-shoot-1': [`${O}/CA at work/prefer/IMG_3341.heic`, 'Black-and-white photo of Cam Anh crouching to shoot beside a pierced paper lantern.'],
  'ch02-shoot-2': [`${O}/CA at work/prefer/IMG_3292.HEIC`, 'A photographer at work in a navy gallery, lit by a single beam, tripod and gilded frames around her.'],
  'ch02-shoot-3': [`${O}/CA at work/prefer/IMG_3341 2.HEIC`, 'Cam Anh shooting beside a glowing yellow pierced lantern against a deep blue wall.'],
  'ch02-shoot-4': [`${O}/CA at work/prefer/IMG_1931.HEIC`, 'Silhouette of Cam Anh from behind, one hand at her ear, before a wall of vertical painted stripes.'],
  'ch02-shoot-5': [`${O}/CA at work/prefer/IMG_7529.heic`, 'Cam Anh looking up at a mirror-polished silver sculpture in a pale gallery.'],
  // 02: studio visits
  'ch02-studio-1': [`${O}/Studio Visit/IMG_2791.HEIC`, 'A painter sitting in front of a huge, dark, many-figured canvas, holding a brush.'],
  'ch02-studio-2': [`${O}/Studio Visit/IMG_2804.HEIC`, 'Close view of a painter\'s palette and brush beside a canvas of a girl in a white dress.'],
  'ch02-studio-3': [`${O}/Studio Visit/IMG_2894.HEIC`, 'A studio wall of shelves lined with paint tubes, bottles and brushes.'],
  'ch02-studio-4': [`${O}/Studio Visit/IMG_2899.HEIC`, 'Cam Anh and a colleague listening to an artist in his cluttered studio.'],
  'ch02-studio-5': [`${O}/Studio Visit/IMG_5406.jpg`, 'An artist in a bandana and dark t-shirt, eyes closed, gesturing as he talks.'],
  'ch02-studio-6': [`${O}/Studio Visit/IMG_7733.HEIC`, 'An artist sitting cross-legged on the floor leafing through a book, with tea cups and fruit beside him.'],
  'ch02-studio-7': [`${O}/Studio Visit/IMG_7736.HEIC`, 'An artist holding up a colourful crowded painting on an orange panel.'],
  'ch02-studio-8': [`${O}/Studio Visit/Screenshot 2026-10-10 at 11.40.40.png`, 'Brushes standing in a jug and a jar on a small wooden table in a studio.'],
  // 02: the villa
  'ch02-villa-1': [`${P}/Indochine Villa/2606.webp`, 'A white porcelain Guanyin figure seated on a lotus base, on a black lacquer table with gold motifs.'],
  'ch02-villa-2': [`${P}/Indochine Villa/2606-18.webp`, 'A tall painted lidded jar standing by a green pool, hibiscus flowers behind it.'],
  'ch02-villa-3': [`${P}/Indochine Villa/Untitled_Artwork+1+(1).webp`, 'A dark-wood Indochine villa sitting room with carved screens, a framed painting and a daybed.'],
  'ch02-villa-4': [`${P}/Indochine Villa/2606-6.webp`, 'Two slim vases on the edge of a tiled pool under the eaves of a tiled-roof house.'],
  'ch02-villa-5': [`${P}/Indochine Villa/716.webp`, 'A rocking chair and a painted jar on a shaded wooden veranda among green leaves.'],
  // 02: the modern apartment
  'ch02-apartment-1': [`${P}/Morden House/1M2A4038-2.webp`, 'A large orange abstract portrait painting on a white wall under copper ring lights.'],
  'ch02-apartment-2': [`${P}/Morden House/1M2A4019-2.webp`, 'A modern living room: cream sofa, black round table and an orange painting by tall windows.'],
  'ch02-apartment-3': [`${P}/Morden House/1M2A4164.webp`, 'A bright living room with a pink-and-green painting, sofa and a bouquet on the coffee table.'],
  'ch02-apartment-4': [`${P}/Morden House/1M2A4158.webp`, 'Pink roses and dahlias in a silver vase on a coffee table beside a bronze figure.'],
  'ch02-apartment-5': [`${P}/Morden House/1M2A4110-3.webp`, 'A tall painted porcelain vase on a marble table in front of dark shelves.'],
  // 02: in the gallery
  'ch02-gallery-1': [`${P}/Gallery/1M2A5133.webp`, 'The long white gallery hall with large paintings on both walls and a silver sculpture at the end.'],
  'ch02-gallery-2': [`${P}/Gallery/1M2A5125.webp`, 'A deep-blue gallery corner with shelves of porcelain vases and a plate.'],
  'ch02-gallery-3': [`${P}/Gallery/1M2A5092.webp`, 'A bronze incense burner on a plinth between two flower arrangements in a navy room.'],
  'ch02-gallery-4': [`${P}/Gallery/1M2A5128.webp`, 'A fresh flower arrangement with white orchids in a dark vase against a blue wall.'],
  'ch02-gallery-5': [`${P}/Gallery/IMG_0667.heic`, 'A bronze vessel on a plinth in front of a glass-block window, flanked by two red framed works.'],
  'ch02-gallery-6': [`${P}/Gallery/1M2A5158.webp`, 'A framed painting of figures hanging in a sunlit gallery corridor, a plant in the foreground.'],
  // 02: catalogue 03 pages, in reading order
  'ch02-catalogue-1': [`${O}/Catalogue/3.webp`, 'The catalogue standing on a round table in front of a soft abstract painting.'],
  'ch02-catalogue-2': [`${O}/Catalogue/486683690_1576920043147267_4915887449049643581_n.jpg`, 'Catalogue page: a pair of lidded porcelain vases painted with birds, on white.'],
  'ch02-catalogue-3': [`${O}/Catalogue/486174934_1576920039813934_2521765499011313261_n.jpg`, 'Catalogue page: a lidded vase beside a pink-faced bird illustration and blossom branches.'],
  'ch02-catalogue-4': [`${O}/Catalogue/486802373_1576920046480600_3435783497284166043_n.jpg`, 'Catalogue page: a tall lidded vase and a colourful phoenix drawn in the same palette.'],
  'ch02-catalogue-5': [`${O}/Catalogue/486158747_1576920123147259_6533932761028221697_n.jpg`, 'Catalogue detail: a feathered bird with a pink face among peonies.'],
  'ch02-catalogue-6': [`${O}/Catalogue/486320569_1576920086480596_1119943215595773764_n.jpg`, 'Catalogue detail: a bird and a golden chrysanthemum among blossoms.'],
  'ch02-catalogue-7': [`${O}/Catalogue/486055323_1576919279814010_3832034009530042889_n.jpg`, 'Catalogue detail: a pink-and-teal bird perched on rockwork.'],
  'ch02-catalogue-8': [`${O}/Catalogue/486395996_1576920076480597_6366012815910816779_n.jpg`, 'Catalogue detail: a bird\'s orange legs among peonies and blue railings.'],
  'ch02-catalogue-9': [`${O}/Catalogue/484791892_1571843606988244_3707237402231189841_n.jpg`, 'The catalogue leaning on a table before a pale painting, with a pink cloth.'],
  'ch02-catalogue-10': [`${O}/Catalogue/IMG_6404.JPG`, 'A hand turning the pages of the open catalogue, with plant leaves in the foreground.'],
  'ch02-catalogue-11': [`${O}/Catalogue/IMG_6460.HEIC`, 'Copies of the catalogue stacked on a wooden stool beside a potted plant.'],
};
