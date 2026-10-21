# HANDOFF — PORT 26 (portfolio của Cam Anh)

Viết ngày 20/10/2026, cuối phiên làm việc dài. Đọc file này cùng `CLAUDE.md` (luật làm việc, vẫn đúng) và `site/DESIGN.md` (một số con số ở đó đã cũ; **code thắng**, sửa file khi chạm tới).
Bản sao có trong git: `site/HANDOFF.md` (thư mục `site/` là repo git duy nhất; `content/`, `*Photo/`, `*Design Style/`, file Word nằm ngoài git).

> **Cập nhật 21/10/2026 (phiên sau HANDOFF):** đã làm xong ghi chú **LAM YEN R3** (nội dung `content/ch02-becoming-whole-in-fb.md`, ảnh trong `*Photo/02`, `src/components/Ch02.astro`; chi tiết ở `DESIGN.md` §14). Mục "LAM YEN R3" ở §3 bên dưới **đã xong**; ô ảnh Lam Yên 4.1–9.1 (trừ video reel) đã có ảnh. Còn mở: cú pháp mới `{{tip:…}}` / `{{link:…}}`, link video nằm trong các dòng `BUILD NOTE: LINKS …`, câu hỏi chờ Cam Anh (dòng chú thích nhỏ dưới mục 03 của "What changed" chưa có chữ; cách trình bày các tên món Việt/Anh).

---

## 1. Mục tiêu hiện tại của trang web

Đơn **ứng tuyển mở vào phòng Marketing của Maison Marou**, kể như một **tạp chí dài** (không phải CV): sách ảnh in, nhiều trang, mỗi chương một nhịp. Người đọc là recruiter, mở bằng **điện thoại hoặc laptop**; Cam Anh đang duyệt từng chi tiết bằng mắt trên laptop và gõ ghi chú vào **sticky note** rồi nhờ Claude sửa lần lượt.

Trang hiện có (Astro, `output: 'static'`, tiếng Anh; **chưa push, chưa deploy**):

| URL | Nội dung | Component chính | Content |
|---|---|---|---|
| `/` | Cover, "I believe…", Get to know me (timeline), Core skills, How I work | `Cover`, `Believe`, `Contents`, `CoreSkills`, `HowIWork` | `cover.md`, `contents.md`, `intro-skills.md` |
| `/in-the-making/` | 01 culture (`Ch01`) · 02 Becoming whole in F&B = Lam Yên 9 trang (`Ch02`) · Different kitchens (`Ch03`: Golden Gate, Lam Yên & 123, Mono) | `Ch01/02/03.astro` | `ch01-it-started-with-culture.md`, `ch02-becoming-whole-in-fb.md`, `ch03-different-kitchens.md` |
| `/off-the-menu/` | Florist in me (01) rồi Gifting (02) | `OffMenu.astro` | `ch04-off-the-menu.md` |
| `/why-marou/` | đường + xe, values, story, vision, hộp quà, Contact | `WhyMarou.astro` | `ch05-why-marou.md` |

Việc đang làm: **đưa ảnh/video thật vào các ô trống** theo từng trang (đang ở Lam Yên, đã xong tới hết phần 3) và **chỉnh chữ/bố cục theo ghi chú**.

---

## 2. Đã hoàn thành (kèm file)

**Hạ tầng và công cụ** (`site/`)
- `src/components/ReviewNote.astro`: sticky note vàng (nền `#FFF1A6`, viền `#E9D676`) ở góc dưới phải, chỉ hiện trong `npm run dev` hoặc build với `PUBLIC_REVIEW=1`, **không bao giờ vào build thường**. Kéo thả, đổi cỡ (góc trên trái), phóng to một chạm, B / I / U (cũng Ctrl/Cmd+B/I/U), Copy ra `**đậm** *nghiêng* <u>gạch chân</u>`. Tự chuyển vào `<dialog>` đang mở. Lưu trong `localStorage` khóa `port26-review-note`.
- `astro.config.mjs`: plugin Vite (chỉ dev) nhận POST `/__review-note` và ghi **`site/review-note.md`** (git-ignored). **Claude đọc ghi chú của Cam Anh ở file này**; cần Cam Anh tải lại trang Chrome một lần để note gửi nội dung. Khi review xong: xoá dòng `<ReviewNote />` và import trong `src/layouts/Base.astro`, xoá file component, xoá plugin trong `astro.config.mjs`.
- `src/lib/md.ts` (cú pháp trong `content/`): `{{Tên}}` sidepath · `{{vi: …}}` ghi chú tay tiếng Việt · `[text]` placeholder (chip nâu `#8A4B2A` trên `#F6EDE6`) · `**đậm**` · `_nghiêng_` · `++gạch chân++` (class `.ul`) · `[chữ](https://…)` link ngoài (class `.xl`, mở tab mới, có ↗; chữ "opens in a new tab" lấy từ `ui.md`) · `BUILD NOTE:` không hiển thị. Hàm `phrases()` còn trong file nhưng **không dùng ngắt dòng ép nữa**.
- `scripts/photos.mjs` (manifest ảnh: id → [đường dẫn gốc, alt tả đúng ảnh, tuỳ chọn]); tuỳ chọn: `crop {aspect,x,y,zoom}`, `alpha` (cắt sát viền trong suốt cho ảnh cắt rời PNG), `knockout` (xoá nền trắng screenshot), `hero`, `max`. Chạy `node scripts/optimize-images.mjs` → `public/img/<id>-480|960|1600.webp` + `src/data/images.json` (~30 giây, xử lý lại tất cả, ổn định).
- Video: `ffmpeg-static` (dev dep). `scripts/video-f1.mjs` → `public/video/f1-1080.mp4`, `f1-540.mp4` (không tiếng, 30 fps, crf 27/29, 4 MB / 0,8 MB) + poster `public/img/f1-poster-*.webp`. `scripts/video-florist.mjs` → `fv-bouquet|window|drum|hydrangea-{hd,sd}.mp4` (clip HDR iPhone được tone-map). Video chỉ tải khi cuộn tới, tự phát tắt tiếng lặp lại; `prefers-reduced-motion` → poster + nút điều khiển.
- `.claude/launch.json` (ở `PORT 26/`, ngoài git) gắn trình duyệt trong app vào `http://localhost:4321`.

**Trang đã làm (và đã được Cam Anh duyệt nhiều vòng)**
- **Off the menu** (`OffMenu.astro`): Florist 01 trước, Gifting 02 sau (thứ tự theo `ch04-off-the-menu.md`; component tìm mục theo tên). Gifting: G1 gói quà kraft có **dải ruy-băng kem mờ `opacity .38` đè lên ảnh, đặt theo ruy-băng thật** (dọc ở 30%, nghiêng −1,2°; ngang ở 36%), ô vuông nhỏ G2 tối đa 12,8 rem, ảnh "Honestly" là **một file collage của Cam Anh** (`*Photo/04/Gifting/Page "Honest..".png`, rộng bằng video F1), ảnh sách bấm ra lightbox, hàng 3 ảnh cuối, câu cuối kết thúc `;)`. Florist: **một khối lime dài theo mock thứ 3** (ảnh hộp Lam Yên, bình lily cắt rời, video bó hoa, video cô gái bên cửa sổ, ảnh cô gái cắt rời, video F1 ở cuối), toạ độ phần trăm theo band `--ar: 352 / 1163.3`; lime lấn ra trên và dưới **bằng nhau** (12/1163.3 mỗi bên), khoảng trắng trên/dưới khối bằng nhau (`--gap: clamp(1rem, 2.5vw, 2.5rem)`).
- **Why Marou** (`WhyMarou.astro`): đường đồi vẽ bằng SVG (`viewBox` tính lại theo tỉ lệ khung, không bị zoom cắt), xe **dài thấp đối xứng** (thân kem, mái hồng, kính `--dark`, đèn lime, không chữ M), chữ **"BEYOND LOVING CHOCOLATE…" in hoa, nằm trên đường chữ riêng nâng cao hơn đường chấm, hiện dần sau xe bằng mặt nạ có mép mờ**; values: "It's easy…" chữ sans nhỏ với **"I do:" hồng cả dấu hai chấm**, "But loving…" hồng nghiêng, "What brought me here…" chữ lớn `clamp(2.04rem, 5.44vw, 5.27rem)`; story: nhấn bằng **màu chữ + xuống dòng có chủ đích** (cụm "a new “home” that shares my dream" thụt vào, nghiêng, hồng); vision: "360°" hồng nghiêng, kết bậc thang, câu cuối **plum**, to hơn; hộp quà: TASTING GOOD và CONNECTING GOOD mỗi cụm một dòng, song song; Contact: Gmail + Phone bằng biểu tượng nét mảnh trong vòng tròn, cỡ `clamp(1.53rem, 3.06vw, 2.72rem)`; ảnh Cam Anh bên xe đã bỏ (khung vòm để trống).
- **Different kitchens** (`Ch03.astro`): **chức danh = sans 1,02 rem, chỉ phần job title in đậm 600**, ngày tháng in hoa nhỏ phía trên; Golden Gate: heading link ra `https://ggg.com.vn/` không gạch chân, hai dòng "Golden Gate / JSC", chữ chạy dọc mờ `opacity .3`, chỉ "Sakura Yakiniku" là link Facebook; Lam Yên & 123: "123 Restaurant" là sidepath, **không còn sidepath Lam Yên từ chương này**, ô video L3 là link TikTok (URL nằm trong `BUILD NOTE` ở `ch03-…md`), hai đoạn 123 cùng kiểu, "That's where I started…" nghiêng; Mono: headline trắng `#fff` mở sidepath (ảnh bìa trống + Facebook + Instagram), 2 đoạn giới thiệu (đoạn chính serif xám mờ `rgb(200 192 200 / .62)`, `clamp(1.67rem, 2.88vw, 2.7rem)`; đoạn phụ sans nhỏ có vạch trái), THE BRIEF nối liền intro với **ánh sáng hồng/plum hắt từ chân khối** (không còn dải riêng), 01 On social nền kem `--cream` (Before → After, link gallery chưa có), 02 có 3 gạch đầu dòng, trang kết **nền trắng chữ plum**, hai **cạnh vát chữ V** (trước 01 và trước trang kết, `clip-path: polygon(0 21%, 25% 100%, 100% 21%, 100% 100%, 0 100%)`, cao `clamp(3rem, 6vw, 6rem)`), các khối màu **cạnh cứng** (gradient chuyển đã bị gỡ theo yêu cầu), dải hồng "next" cuối trang đã bỏ.
- **Chương 01** (`Ch01.astro`): Studio visits **dàn full trang** (khung `aspect-ratio: 100 / 62`, lề `clamp(.5rem, 1.2vw, 1.1rem)`, `max-width: 120rem`), ba ảnh dưới cùng (kệ màu, bảng pha màu, người vẽ) **chung một đường chân**, ảnh ống màu nhỏ nổi lên trên với viền trắng `.3rem`; nhãn "My part: **Imagery & Photography**"; dòng "But my true dream was…" **căn giữa, to nhất, tách xa** (`clamp(2.8rem, 11vw, 8.5rem)`, margin trên `clamp(5rem, 16vw, 11rem)`, `max-width: 14ch`, balance) đúng như bản đầu.
- **Lam Yên (Ch02)** (`Ch02.astro`, `ch02-becoming-whole-in-fb.md`): cập nhật cả 9 trang theo file Word **`Lam Yên.docx`** (kể cả 11 comment): trang 1 chức danh in đậm + sidepath "Full-stack Marketer" (đậm, plum), bỏ câu trích; "About Lam Yen" là ảnh bấm mở **panel từ bên trái** (`data-side="left"` trong `Base.astro`, đang trống); sub head nghiêng sau "The brief"; ảnh 3.1 & 3.2 **khung ngang 3:2, mũi tên dọc ↓**; trang túi giấy: **chữ bước thụt-thò**, nền **`Background page.png` chạy sau cả trang** (bag + dòng Marou căn phải); P4 dòng cuối **plum**; P5 cụm "break it, and pull it apart." chữ nghiêng hồng rất lớn; "That small gesture… our signature." highlight lime; P6 sidepath Cốm Milk Tea / Snow Skin Mooncake, video **1 chính 2 phụ**, mũi tên xanh `#7FB342` tới "We have led the way…", trang Gia nền `--blush`; P7 sidepath Store Opening, Cốm Đặc Sản, the packaging concept, the main photoshoot; P9 bỏ đoạn chuyến bay. **Ảnh thật đã vào các ô tới hết phần 3** (từ `*Photo/02`: ô 1.1, 2.1, 3.1–3.4 và 3 ảnh túi). Chữ **in đậm dùng weight 700** trong chương này (đã nạp Inter 700 và Cormorant 700).
- Tag git: `lamyen-v1` (bản Lam Yên đầu được duyệt), **`lamyen-before-oct19`** (trước đợt sửa 19/10), `kitchens-v1`, `pages-v1`. Bản sao nội dung cũ: `content/ch02-becoming-whole-in-fb.BEFORE-oct19.md`.

---

## 3. Việc còn dở và lỗi đang gặp

**Ghi chú Cam Anh chưa xử lý** (nằm cuối `site/review-note.md`, mục "LAM YEN R3"):
- **Trang Brand's Image (P4 Lam Yên)**: viết lại 3 ý: "We started with an Indochine mood: rich and elegant, aming at a mid-to-high price." → "It is good for big campaigns, brand building, making it “a gift worth owning" → "But its hard for selling them daily…". (Chép nguyên văn, kể cả "aming" và thiếu dấu ” cuối; **báo lỗi chính tả, không sửa**.) Nhớ: dòng cuối vẫn màu plum, "Indochine-styled imagery" cần đậm nếu còn.

**Ảnh/video chưa có (ô để trống có nhãn Slot)**
- Lam Yên: 4.1–4.6, 5.1 (mooncake tách đôi, ô tròn), 5.2–5.4, 5.5–5.9 (reel dọc), 5.10–5.12, 6.1–6.5 (video dọc 9:16), 7.1–7.3, 8.1–8.3, 9.1. Chưa dùng: `*Photo/02/Signature bag/Seasonal bag.1.png` và `Seasonal bag.2.png` (không có ô trong bố cục; gợi ý: một hàng thêm dưới giai đoạn 2 của "The wrap"). Ảnh "this illustration" (sidepath) và "About Lam Yen" (panel) đang trống.
- Different kitchens: G1–G2, L1–L3 (L3 đã là link TikTok), M1 (hero video), M2/M3 (Before/After), M6–M11, ảnh bìa sidepath Mono.
- Why Marou: W1–W7, khung vòm trống. Off the menu florist: các ảnh chưa dùng (`IMG_0776/0779/0951/0955/1251/3983/4087`, `1M2A9403-3` cắt rời, video `IMG_0844/3940/3985/4690/9672/9709/9959`, clip trống đồng và cẩm tú cầu đã nén nhưng bỏ khỏi bố cục).
- Chương 01: các ô ảnh theo trang vẫn đang theo manifest cũ (xem `scripts/photos.mjs`).

**Placeholder đang mở** (`site/PLACEHOLDERS.md`, 16 chỗ, tự sinh khi `dev`/`build`): `[…]` (P7 Lam Yên, chủ đề 2024), `[Gallery link]` (Mono, link cho Before → After), các side page "[coming soon]" (Lam Yên, Golden Gate JSC, 123 Restaurant, About Lam Yen, this illustration, Cốm Milk Tea ×2, Snow Skin Mooncake ×2), `[in Hanoi]` và `[One line on what the gallery stands for.]` (Indochine House), `[Creative process × Illustrator]`, `[Gallery]`.

**Chờ Cam Anh trả lời**
- Link cho chữ "One reel" (P6 Lam Yên, "gắn link trực tiếp"): chưa có URL, đang là chữ thường.
- Ghi chú "keep confirming… -> chuyển sang" (P6) bị cụt: Claude đã in đậm cụm đó, cần hỏi "chuyển sang" đâu.
- Cụm in đậm ở trang cuối Mono (Claude đoán: "a shelf of products", "a part of my marketing approach that was missing."); chữ đậm ở đoạn 123 ("social media marketing").
- Số "3" của "Keep the season going" (Word bỏ số; Claude giữ "3").
- Câu "marketing thinking" đã đổi thành "marketing approach" theo ý Cam Anh.
- **Việc nhạc** (xem memory `background-music-todo.md`): nhắc Cam Anh sau khi xong chỉnh nội dung; 3 câu còn mở: trang nào hay cả site + file nhạc ở đâu; vị trí nút (gợi ý dưới trái, vì note ở dưới phải); bản quyền (nhạc phải của cô ấy hoặc miễn phí bản quyền). Đừng làm trước khi cô ấy trả lời.

**Chưa kiểm tra / chưa chụp**
- Nhiều chỉnh sửa gần đây chỉ được xem ở **1440 px** hoặc khung trình duyệt app ~600–800 px; **390 px và 768 px chưa chụp lại** cho: Why Marou vòng 2–3, Mono (intro, brief, vát V), Studio visits, toàn bộ Lam Yên mới. Cần một lượt kiểm tra 390 / 768 / 1440, đồng thời `scrollWidth === innerWidth`.
- Lighthouse chưa chạy; chưa kiểm tra dấu tiếng Việt trong heading sau các sửa đổi; sidepath P6–P7 Lam Yên mới chỉ kiểm tra bằng build, chưa bấm từng cái.

**Lỗi/đặc điểm đã biết**
- **Máy chủ dev không nạp lại khi chỉ sửa `content/*.md`** (nội dung đọc lúc import): sau khi sửa `.md` hãy `touch site/src/lib/data.ts`. Khi vừa khởi động hoặc `touch`, trang có thể cần 3–5 giây.
- Ảnh `loading="lazy"`: khi chụp màn hình phải đặt `loading='eager'` và chờ vài giây, nếu không ô trông trống.
- Khung trình duyệt trong app đôi khi đổi cỡ giữa chừng và chụp lệch (chỉ thấy một phần trang): không phải lỗi site; đặt lại bằng `resize_window` rồi tải lại.
- Có một đường kẻ mờ ~1 px ở mép trên khối THE BRIEF (Mono) và có thể ở chỗ nối cạnh vát; chấp nhận được, đã thử che một phần bằng `box-shadow`.
- `content/` có file thừa không được dùng: `ch01-short-version.md`, `ch02-it-started-with-culture.md`, `ch02-becoming-whole-in-fb.BEFORE-oct19.md` (bản sao an toàn, giữ tới khi Cam Anh duyệt xong Lam Yên).
- Máy từng sập nguồn một lần: dev server tắt, git và file không mất. Chạy lại: `cd site && npm run dev` (cổng 4321; nếu bận, `astro dev` báo; đừng tắt server của người dùng).
- `DESIGN.md` có vài đoạn cũ (ví dụ bảng màu Contact, danh sách slot); sửa khi chạm.

---

## 4. Quyết định cần giữ nguyên (và lý do)

**Luật bất biến** (`CLAUDE.md`): mọi chữ nằm trong `content/*.md`; **không viết/sửa/dịch chữ** (chỉ chép đúng, lỗi chính tả để nguyên và báo); `[ngoặc vuông]` = placeholder hiện chip nâu; không đụng ảnh gốc trong `*Photo/`, `*Design Style/` và file Word; không push/deploy tới khi Cam Anh nói; commit từng mục (kèm dòng `Co-Authored-By: Claude …`). **Hỏi/cảnh báo trước khi đổi cấu trúc Lam Yên** (đã được duyệt: tag `lamyen-v1`; lần sửa 19/10 là do Cam Anh yêu cầu rõ).

**Tone và mood**: tạp chí tối giản, "sang và nghiêm túc", một ý lớn mỗi màn hình, nhiều khoảng trắng, **màu đến theo cả khối, không làm trang trí**. Giọng là của Cam Anh, không giống thương hiệu Marou (không copy hình/chữ của Marou; chiếc xe và đường đồi chỉ lấy ý). Bị từ chối: kiểu scrapbook (băng dính, polaroid xoay, chữ script khắp nơi), thẻ có bóng, gradient "stock", emoji trang trí, kiểu SaaS/dark-tech. (Lý do: Cam Anh nói bản đầu "rời rạc và chưa sang".)

**Màu** (`src/styles/tokens.css`, bảng "Girly Shimmer" Cam Anh chọn, **không đổi**): `--paper #FFFFFF` (nền trang trắng, "trơn, sạch"), `--ink #141312`, `--ink-soft #57524B`, `--pink #F33F71`, `--blush #EBDBD7`, `--cream #FCEFDB`, `--lime #BDCC30`, `--plum #61216A`, `--dark #2B1030`, `--paper-2 #F6F5F2`; chip placeholder `--ph-bg #F6EDE6` / `--ph-ink #8A4B2A`. Màu cũ (`--tomato/oxblood/mustard/teal/forest`) chỉ là alias. Chữ trên hồng/plum/dark = trắng hoặc kem; trên lime/blush/cream/trắng = `--ink`; **lime nhạt không dùng làm chữ trên nền sáng** (không đọc được). Xanh `#7FB342` chỉ dùng cho mũi tên P6; vàng `#FFF1A6` chỉ cho note. Ảnh có chữ phủ thì làm tối bằng `filter: brightness(.42–.52)`, không phủ màu.

**Chữ**: Cormorant Garamond (`--display`, weights 300/400/600/700 + nghiêng 300/400) cho tiếng nói và tiêu đề, **tiêu đề dùng tracking âm `-.02em` tới `-.05em`, `line-height .84–1.05`**; Inter (`--sans`, 400/500/600/700) cho thông tin/nhãn (`.label`: 500, `.72rem`, `letter-spacing .16em`, in hoa); Allura (`--script`) chỉ cho một câu ở cover; Mynerve (`--hand`) chỉ cho `{{vi: …}}`. Tất cả nạp đủ subset `latin`, `latin-ext`, `vietnamese`, `font-display: swap`. Thân bài `clamp(1rem, .96rem + .2vw, 1.0625rem)`, `line-height 1.65`. **Chữ in đậm phải đậm rõ** (700 ở Lam Yên). Chữ nhấn: ưu tiên **đổi màu + xuống dòng có chủ đích** (kiểu tham khảo "Terra di Luce"), **không dùng highlight bút dạ** trừ chỗ Cam Anh đã duyệt (P5 Lam Yên "small gesture / our signature").

**Khoảng cách và lưới**: `--gutter clamp(1.25rem, 5vw, 4rem)`; `--section clamp(6rem, 14vw, 13rem)`; mỗi component có `--pad: clamp(1.25rem, 4vw, 4rem)`; `.wrap = min(100% - 2*var(--pad), 88rem)`; lưới 12 cột từ **900 px** (mốc chính; còn 700, 760, 800, 1200), header chuyển drawer ≤ 800 px; `--ease: cubic-bezier(.22, .7, .2, 1)`; nút/link ≥ 44 px. **Mobile first**; kiểm tra 390 / 768 / 1440. Mọi animation có nhánh `prefers-reduced-motion`.

**Flow và nhịp**: chương 01 yên tĩnh; Lam Yên bận nhất và sáng tạo nhất (P5 là "hero": mooncake tách đôi khi cuộn); Different kitchens đều nhau, Mono là ngôi sao; Off the menu vui (menu card, ruy-băng); Why Marou phiêu lưu (đường, xe, hộp quà). Mỗi phần cho **một ý to, tiêu đề đứng một mình**. Header kiểu helly-tống.com, trang hiện tại gạch chân hồng; "↑ Contents" dính phía trên bên phải mỗi chương.

**Link và sidepath**: mọi thứ bấm được phải **có dấu hiệu rõ**: sidepath = gạch chân chấm + ↗ nhỏ; link ngoài = gạch chân đặc + ↗ nhỏ (trừ heading Golden Gate: bỏ gạch chân theo yêu cầu, giữ ↗); sidepath dùng một `<dialog>` chung (sheet phải ≥ 760 px, sheet dưới ở mobile; `data-side="left"` mở từ trái). **Chức danh luôn nổi bật** (đậm) trong mọi tóm tắt dự án. Một cụm "một nghĩa" nên cùng một dòng; sau dấu phẩy có thể xuống dòng (thử rồi **Cam Anh yêu cầu trả về xuống dòng tự nhiên**, nên chỉ làm khi bố cục cần).

**Ảnh**: gốc đọc-chỉ; chỉ ghi bản tối ưu vào `site/public/img/` (WebP, tối đa 1600 px cạnh dài, srcset 480/960/1600, `loading="lazy"`, có `width/height`, alt tả đúng nội dung ảnh). Ảnh cắt rời PNG của Cam Anh dùng `alpha: true`. Ảnh có người (bạn bè, cả team, story/chat của người khác) **cần xin phép trước khi public**, nhắc trong báo cáo.

---

## 5. Bước tiếp theo cụ thể

1. Mở `site/review-note.md`: nhờ Cam Anh tải lại trang Chrome nếu file cũ (xem dòng đầu có ngày giờ). Làm mục **LAM YEN R3 (Brand's Image, P4)** trong `content/ch02-becoming-whole-in-fb.md` (mục `## P4`) và `Ch02.astro` (`.p4-items`, `.i3` đang `color: var(--plum)`). Sau đó `touch site/src/lib/data.ts`.
2. Tiếp tục **đưa ảnh Lam Yên vào P4 trở đi** khi Cam Anh để ảnh vào `*Photo/02`: thêm id vào `scripts/photos.mjs` (hằng `L = '*Photo/02'`), chạy `node scripts/optimize-images.mjs`, thay `<Slot tag="4.1" …/>` bằng `<Photo id="…" sizes="…" />` (xem cách làm ở `Ch02.astro` P1–P3). Hỏi nếu có file video: nén bằng cách mở rộng `scripts/video-florist.mjs`.
3. Hỏi Cam Anh các điểm chờ ở mục 3 (link "One reel", "chuyển sang", cụm in đậm, link gallery Mono, địa chỉ ảnh cho sidepath).
4. Chạy **kiểm tra 390 / 768 / 1440** cho toàn bộ trang (đặc biệt các mục "chưa kiểm tra"), sửa lỗi tràn ngang và chỗ ô trống.
5. Khi Cam Anh nói xong chỉnh nội dung: **nhắc việc nhạc** (3 câu hỏi ở mục 3); rồi gỡ sticky note (cách gỡ ở mục 2); chạy Lighthouse; cập nhật `DESIGN.md` và `PLACEHOLDERS.md`; viết `DEPLOY.md` (đã có bản nháp: tải `dist/` lên Hostinger Business `public_html` hoặc Git deploy; repo phải chứa cả `content/` và `site/` vì build đọc `../content`) và **hỏi Cam Anh dùng gói Hostinger nào** và muốn bố cục repo ra sao. **Không push/deploy tới khi cô ấy nói.**
6. Lệnh hay dùng: `cd "/Users/nguyencamanh/Documents/PORT 26/site" && npm run dev` (http://localhost:4321) · `npx astro build --outDir "$TMPDIR/x"` (thử build không ghi đè `dist/`) · `node scripts/placeholders.mjs` · `node scripts/contact.mjs "<thư mục>" <out.jpg>` (bảng xem trước ảnh) · `git tag` để xem các điểm khôi phục.
