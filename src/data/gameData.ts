import {
  AdjectiveCategory,
  AvatarItem,
  Stage1Word,
  Stage2Question,
  Stage3Question,
} from '../types/game';

const asset = (filename: string) =>
  `${import.meta.env.BASE_URL}src/assets/images/${filename}`;

export const MEDAN_PENDEKAR_SECRET_CODE = 'MJB-RM-2026-MUSTAFAR';

export const SCENE_IMAGES = {
  tropicalBackdrop: asset('pixel_tropical_backdrop_1795018818194.jpg'),
  worldMap: asset('pixel_world_map_1795018820107.jpg'),
};
export const AVATARS: AvatarItem[] = [
  {
    id: 'orang_kampung',
    name: 'Orang Kampung',
    price: 0,
    strength: 1,
    statusLabel: 'Avatar Permulaan',
    attire: 'Baju Melayu tradisional, kain pelikat dan tengkolok.',
    specialTrait: 'Tekun, mesra dan bersemangat tinggi.',
    description: 'Penduduk kampung yang memulakan pengembaraan menjelajah warisan budaya.',
    imageUrl: asset('avatar_orang_kampung_1795018821111.jpg'),
    accentColor: '#0F766E',
  },
  {
    id: 'awang_kenit',
    name: 'Awang Kenit',
    price: 50,
    strength: 2,
    statusLabel: 'Wira Cerita Rakyat',
    attire: 'Pakaian pengembaraan berwarna merah, kain samping dan tanjak merah.',
    specialTrait: 'Kecil tetapi berani dan bijak.',
    description: 'Wira kecil daripada cerita rakyat yang mempunyai semangat pengembaraan yang membara.',
    imageUrl: asset('avatar_awang_kenit_1795018821635.jpg'),
    accentColor: '#B91C1C',
  },
  {
    id: 'badang',
    name: 'Badang',
    price: 100,
    strength: 3,
    statusLabel: 'Pendekar Perkasa',
    attire: 'Pakaian pendekar tradisional bersama keris dan ikat pinggang emas.',
    specialTrait: 'Kuat dan gagah.',
    description: 'Pendekar legenda yang mempunyai kekuatan luar biasa untuk menjaga keamanan kampung.',
    imageUrl: asset('avatar_badang_1795018822132.jpg'),
    accentColor: '#1E3A8A',
  },
  {
    id: 'raksasa',
    name: 'Raksasa',
    price: 180,
    strength: 4,
    statusLabel: 'Penjaga Rimba',
    attire: 'Makhluk fantasi besar berwarna hijau berhias dedaun dan perisai rimba.',
    specialTrait: 'Kuat, garang tetapi boleh menjadi pelindung.',
    description: 'Penjaga kawasan hutan tropika dan khazanah warisan Nusantara yang setia.',
    imageUrl: asset('avatar_raksasa_1795018822742.jpg'),
    accentColor: '#15803D',
  },
  {
    id: 'raja_mustafar',
    name: 'Raja Mustafar',
    price: 300,
    strength: 5,
    statusLabel: 'Raja Nusantara',
    attire: 'Busana diraja Melayu, tengkolok emas, keris diraja dan songket mewah.',
    specialTrait: 'Avatar paling hebat dan paling berprestij.',
    description: 'Raja bijaksana yang memerintah kerajaan budaya Nusantara dengan adil.',
    imageUrl: asset('avatar_raja_mustafar_1795018822926.jpg'),
    accentColor: '#B45309',
  },
];

export const ADJECTIVE_CATEGORIES: AdjectiveCategory[] = [
  {
    id: 'sifat',
    name: 'Kata Adjektif Sifat',
    shortName: 'Sifat',
    definition: 'Menerangkan sifat atau keadaan sesuatu benda, manusia atau haiwan.',
    examples: ['Gagah', 'Rajin', 'Baik', 'Bijak'],
    colorClass: 'bg-emerald-50 border-emerald-700',
  },
  {
    id: 'warna',
    name: 'Kata Adjektif Warna',
    shortName: 'Warna',
    definition: 'Menerangkan warna sesuatu benda sebagai unsur keterangan.',
    examples: ['Merah', 'Keemasan', 'Biru', 'Hijau'],
    colorClass: 'bg-rose-50 border-rose-700',
  },
  {
    id: 'ukuran',
    name: 'Kata Adjektif Ukuran',
    shortName: 'Ukuran',
    definition: 'Menerangkan saiz atau ukuran panjang, pendek, tinggi atau tebal sesuatu.',
    examples: ['Tinggi', 'Tebal', 'Panjang', 'Rendah'],
    colorClass: 'bg-sky-50 border-sky-700',
  },
  {
    id: 'bentuk',
    name: 'Kata Adjektif Bentuk',
    shortName: 'Bentuk',
    definition: 'Menerangkan rupa bentuk sesuatu objek atau benda.',
    examples: ['Bulat', 'Lonjong', 'Melengkung', 'Segi empat'],
    colorClass: 'bg-amber-50 border-amber-700',
  },
  {
    id: 'waktu',
    name: 'Kata Adjektif Waktu',
    shortName: 'Waktu',
    definition: 'Menerangkan konsep masa atau tempoh sesuatu kejadian.',
    examples: ['Awal', 'Lewat', 'Lama', 'Baharu'],
    colorClass: 'bg-orange-50 border-orange-700',
  },
  {
    id: 'jarak',
    name: 'Kata Adjektif Jarak',
    shortName: 'Jarak',
    definition: 'Menerangkan ruang atau jarak antara dua tempat atau benda.',
    examples: ['Jauh', 'Dekat', 'Hampir', 'Nyaris'],
    colorClass: 'bg-teal-50 border-teal-700',
  },
  {
    id: 'cara',
    name: 'Kata Adjektif Cara',
    shortName: 'Cara',
    definition: 'Menerangkan keadaan kelakuan atau cara sesuatu perbuatan dilakukan.',
    examples: ['Pantas', 'Perlahan', 'Lincah', 'Cermat'],
    colorClass: 'bg-indigo-50 border-indigo-700',
  },
  {
    id: 'perasaan',
    name: 'Kata Adjektif Perasaan',
    shortName: 'Perasaan',
    definition: 'Menerangkan emosi atau perasaan yang dialami oleh seseorang.',
    examples: ['Gembira', 'Bangga', 'Sedih', 'Rindu'],
    colorClass: 'bg-yellow-50 border-yellow-700',
  },
  {
    id: 'pancaindera',
    name: 'Kata Adjektif Pancaindera',
    shortName: 'Pancaindera',
    definition: 'Menerangkan sesuatu berdasarkan deria lihat, dengar, sentuh, rasa dan bau.',
    examples: ['Harum', 'Merdu', 'Manis', 'Berkilau'],
    colorClass: 'bg-lime-50 border-lime-700',
  },
];

export const STAGE_1_WORDS: Stage1Word[] = [
  {
    id: 'w-gagah',
    word: 'Gagah',
    categoryId: 'sifat',
    explanation: '"Gagah" menerangkan sifat keberanian dan kekuatan seseorang pahlawan.',
  },
  {
    id: 'w-rajin',
    word: 'Rajin',
    categoryId: 'sifat',
    explanation: '"Rajin" menerangkan sifat atau sikap tekun seseorang.',
  },
  {
    id: 'w-merah',
    word: 'Merah',
    categoryId: 'warna',
    explanation: '"Merah" menerangkan warna seperti warna bunga raya dan tanjak Awang Kenit.',
  },
  {
    id: 'w-keemasan',
    word: 'Keemasan',
    categoryId: 'warna',
    explanation: '"Keemasan" menerangkan warna kilauan seperti benang songket diraja.',
  },
  {
    id: 'w-tinggi',
    word: 'Tinggi',
    categoryId: 'ukuran',
    explanation: '"Tinggi" menerangkan ukuran menegak seperti tiang rumah kampung.',
  },
  {
    id: 'w-tebal',
    word: 'Tebal',
    categoryId: 'ukuran',
    explanation: '"Tebal" menerangkan ukuran ketebalan sesuatu benda seperti buku cerita rakyat.',
  },
  {
    id: 'w-bulat',
    word: 'Bulat',
    categoryId: 'bentuk',
    explanation: '"Bulat" menerangkan rupa bentuk melingkar seperti bingkai gendang atau kompang.',
  },
  {
    id: 'w-lonjong',
    word: 'Lonjong',
    categoryId: 'bentuk',
    explanation: '"Lonjong" menerangkan bentuk bujur memanjang seperti gasing tradisional.',
  },
  {
    id: 'w-awal',
    word: 'Awal',
    categoryId: 'waktu',
    explanation: '"Awal" menerangkan konsep masa yang tiba sebelum waktunya.',
  },
  {
    id: 'w-lewat',
    word: 'Lewat',
    categoryId: 'waktu',
    explanation: '"Lewat" menerangkan konsep masa yang sudah melepasi waktu yang ditetapkan.',
  },
  {
    id: 'w-jauh',
    word: 'Jauh',
    categoryId: 'jarak',
    explanation: '"Jauh" menerangkan jarak yang panjang antara dua tempat.',
  },
  {
    id: 'w-dekat',
    word: 'Dekat',
    categoryId: 'jarak',
    explanation: '"Dekat" menerangkan jarak yang hampir antara satu tempat dengan tempat lain.',
  },
  {
    id: 'w-pantas',
    word: 'Pantas',
    categoryId: 'cara',
    explanation: '"Pantas" menerangkan cara pergerakan yang sangat cepat.',
  },
  {
    id: 'w-perlahan',
    word: 'Perlahan',
    categoryId: 'cara',
    explanation: '"Perlahan" menerangkan cara pergerakan yang lembut dan tidak laju.',
  },
  {
    id: 'w-gembira',
    word: 'Gembira',
    categoryId: 'perasaan',
    explanation: '"Gembira" menerangkan perasaan suka hati dan ceria.',
  },
  {
    id: 'w-bangga',
    word: 'Bangga',
    categoryId: 'perasaan',
    explanation: '"Bangga" menerangkan perasaan megah terhadap warisan budaya negara.',
  },
  {
    id: 'w-harum',
    word: 'Harum',
    categoryId: 'pancaindera',
    explanation: '"Harum" menerangkan deria bau yang wangi seperti bunga melur.',
  },
  {
    id: 'w-merdu',
    word: 'Merdu',
    categoryId: 'pancaindera',
    explanation: '"Merdu" menerangkan deria pendengaran bagi bunyi atau alunan muzik yang sedap didengar.',
  },
];

export const STAGE_2_QUESTIONS: Stage2Question[] = [
  {
    id: 's2-q1',
    title: 'Soalan 1: Wau Bulan',
    imageUrl: asset('pixel_wau_bulan_1795018822666.jpg'),
    imageAlt: 'Ilustrasi Pixel Art Wau Bulan tradisional Malaysia terbang di langit biru',
    sentence: 'Wau bulan itu mempunyai bentuk yang ______.',
    options: ['Merdu', 'Melengkung', 'Harum'],
    correctIndex: 1,
    adjectiveType: 'Kata Adjektif Bentuk',
    explanationCorrect:
      '"Melengkung" ialah Kata Adjektif Bentuk yang tepat untuk menggambarkan bahagian bawah wau bulan yang menyerupai bulan sabit.',
    explanationWrong:
      'Jawapan yang betul ialah "Melengkung" (Kata Adjektif Bentuk). "Merdu" ialah bunyi dan "Harum" ialah bau, jadi tidak menggambarkan bentuk wau.',
  },
  {
    id: 's2-q2',
    title: 'Soalan 2: Kain Songket',
    imageUrl: asset('pixel_kain_songket_1795018823995.jpg'),
    imageAlt: 'Ilustrasi Pixel Art Kain Songket tenunan benang emas di atas rak kayu berukir',
    sentence: 'Kain songket itu kelihatan ______ apabila terkena cahaya.',
    options: ['Berkilau', 'Jauh', 'Masam'],
    correctIndex: 0,
    adjectiveType: 'Kata Adjektif Pancaindera',
    explanationCorrect:
      '"Berkilau" ialah Kata Adjektif Pancaindera (penglihatan) yang tepat kerana benang emas pada songket memantulkan cahaya.',
    explanationWrong:
      'Jawapan yang betul ialah "Berkilau" (Kata Adjektif Pancaindera penglihatan). "Jauh" menerangkan jarak dan "Masam" menerangkan rasa.',
  },
  {
    id: 's2-q3',
    title: 'Soalan 3: Persembahan Kompang',
    imageUrl: asset('pixel_kompang_1795018824262.jpg'),
    imageAlt: 'Ilustrasi Pixel Art sekumpulan pemain kompang memakai baju Melayu di halaman kampung',
    sentence: 'Bunyi kompang yang dimainkan oleh kumpulan itu sangat ______.',
    options: ['Pahit', 'Tinggi', 'Merdu'],
    correctIndex: 2,
    adjectiveType: 'Kata Adjektif Pancaindera',
    explanationCorrect:
      '"Merdu" ialah Kata Adjektif Pancaindera (pendengaran) yang sesuai untuk menggambarkan bunyi paluan kompang yang sedap didengar.',
    explanationWrong:
      'Jawapan yang betul ialah "Merdu" (Kata Adjektif Pancaindera pendengaran). "Pahit" ialah rasa dan "Tinggi" ialah ukuran.',
  },
  {
    id: 's2-q4',
    title: 'Soalan 4: Makanan Tradisional',
    imageUrl: asset('pixel_kuih_dodol_1795018824285.jpg'),
    imageAlt: 'Ilustrasi Pixel Art kuih dodol di atas daun pisang dan pinggan seramik warisan',
    sentence: 'Dodol merupakan makanan tradisional yang mempunyai rasa ______.',
    options: ['Manis', 'Kasar', 'Jauh'],
    correctIndex: 0,
    adjectiveType: 'Kata Adjektif Pancaindera',
    explanationCorrect:
      '"Manis" ialah Kata Adjektif Pancaindera (rasa) yang tepat kerana dodol diperbuat daripada gula melaka dan santan.',
    explanationWrong:
      'Jawapan yang betul ialah "Manis" (Kata Adjektif Pancaindera rasa). "Kasar" ialah sentuhan manakala "Jauh" ialah jarak.',
  },
  {
    id: 's2-q5',
    title: 'Soalan 5: Rumah Tradisional Melayu',
    imageUrl: asset('pixel_rumah_melayu_1795018824560.jpg'),
    imageAlt: 'Ilustrasi Pixel Art rumah kayu tradisional Melayu bertiang tinggi dengan tangga berukir',
    sentence: 'Rumah tradisional Melayu itu mempunyai tiang yang ______.',
    options: ['Harum', 'Tinggi', 'Gembira'],
    correctIndex: 1,
    adjectiveType: 'Kata Adjektif Ukuran',
    explanationCorrect:
      '"Tinggi" ialah Kata Adjektif Ukuran yang menerangkan ketinggian tiang rumah tradisional Melayu.',
    explanationWrong:
      'Jawapan yang betul ialah "Tinggi" (Kata Adjektif Ukuran). "Harum" ialah bau dan "Gembira" ialah perasaan.',
  },
];

export const STAGE_3_QUESTIONS: Stage3Question[] = [
  {
    id: 's3-q1',
    title: 'Soalan 1: Persembahan Zapin',
    sentence: 'Para penari zapin bergerak dengan ______ mengikut rentak muzik tradisional.',
    options: ['Lincah', 'Masam', 'Tebal'],
    correctIndex: 0,
    adjectiveType: 'Kata Adjektif Cara',
    explanationCorrect:
      '"Lincah" ialah Kata Adjektif Cara yang menggambarkan gerak tari zapin yang pantas, tangkas dan teratur.',
    optionReasons: [
      'Betul! "Lincah" ialah Kata Adjektif Cara yang menerangkan pergerakan tarian yang tangkas.',
      '"Masam" ialah Kata Adjektif Pancaindera (rasa) dan tidak boleh menerangkan cara pergerakan.',
      '"Tebal" ialah Kata Adjektif Ukuran yang sesuai untuk benda seperti buku atau kain, bukan cara menari.',
    ],
  },
  {
    id: 's3-q2',
    title: 'Soalan 2: Bunga Melur',
    sentence: 'Bunga melur yang menghiasi halaman rumah nenek mengeluarkan bau yang ______.',
    options: ['Jauh', 'Harum', 'Rendah'],
    correctIndex: 1,
    adjectiveType: 'Kata Adjektif Pancaindera',
    explanationCorrect:
      '"Harum" ialah Kata Adjektif Pancaindera (bau) yang tepat untuk menerangkan bau bunga melur yang wangi.',
    optionReasons: [
      '"Jauh" ialah Kata Adjektif Jarak dan tidak menerangkan bau bunga.',
      'Betul! "Harum" ialah Kata Adjektif Pancaindera (deria bau) yang bermaksud wangi.',
      '"Rendah" ialah Kata Adjektif Ukuran, bukan bau.',
    ],
  },
  {
    id: 's3-q3',
    title: 'Soalan 3: Pakaian Tradisional',
    sentence: 'Penari itu memakai baju tradisional berwarna ______ semasa persembahan kebudayaan.',
    options: ['Merdu', 'Kasar', 'Biru'],
    correctIndex: 2,
    adjectiveType: 'Kata Adjektif Warna',
    explanationCorrect:
      '"Biru" ialah Kata Adjektif Warna yang tepat untuk melengkapkan frasa "berwarna ______".',
    optionReasons: [
      '"Merdu" ialah Kata Adjektif Pancaindera (pendengaran) bagi bunyi, bukan warna baju.',
      '"Kasar" ialah Kata Adjektif Pancaindera (sentuhan) bagi permukaan, bukan warna.',
      'Betul! "Biru" ialah Kata Adjektif Warna yang menerangkan warna pakaian tradisional.',
    ],
  },
  {
    id: 's3-q4',
    title: 'Soalan 4: Perayaan Kampung',
    sentence: 'Penduduk kampung berasa sangat ______ apabila dapat menyambut perayaan bersama-sama.',
    options: ['Gembira', 'Pahit', 'Panjang'],
    correctIndex: 0,
    adjectiveType: 'Kata Adjektif Perasaan',
    explanationCorrect:
      '"Gembira" ialah Kata Adjektif Perasaan yang menggambarkan rasa riang penduduk kampung ketika menyambut perayaan.',
    optionReasons: [
      'Betul! "Gembira" ialah Kata Adjektif Perasaan yang menunjukkan emosi gembira dan riang.',
      '"Pahit" ialah Kata Adjektif Pancaindera (rasa makanan), bukan emosi manusia.',
      '"Panjang" ialah Kata Adjektif Ukuran, bukan perasaan.',
    ],
  },
  {
    id: 's3-q5',
    title: 'Soalan 5: Makanan Warisan',
    sentence: 'Kuih tradisional yang disediakan oleh nenek mempunyai rasa yang sangat ______.',
    options: ['Tinggi', 'Manis', 'Lewat'],
    correctIndex: 1,
    adjectiveType: 'Kata Adjektif Pancaindera',
    explanationCorrect:
      '"Manis" ialah Kata Adjektif Pancaindera (rasa) yang sesuai untuk menggambarkan keenakan rasa kuih tradisional.',
    optionReasons: [
      '"Tinggi" ialah Kata Adjektif Ukuran, tidak menerangkan rasa makanan.',
      'Betul! "Manis" ialah Kata Adjektif Pancaindera (deria rasa) yang menerangkan rasa kuih.',
      '"Lewat" ialah Kata Adjektif Waktu, bukan rasa makanan.',
    ],
  },
];

export const STAGE_1_WORD_SETS: Stage1Word[][] = [
  STAGE_1_WORDS,
  [
    {
      id: 'w2-bijak',
      word: 'Bijak',
      categoryId: 'sifat',
      explanation: '"Bijak" menerangkan sifat kepintaran dan kebijaksanaan seseorang.',
    },
    {
      id: 'w2-sopan',
      word: 'Sopan',
      categoryId: 'sifat',
      explanation: '"Sopan" menerangkan sifat budi pekerti yang baik dan beradab.',
    },
    {
      id: 'w2-hijau',
      word: 'Hijau',
      categoryId: 'warna',
      explanation: '"Hijau" menerangkan warna dedaunan hutan tropika dan sawah padi.',
    },
    {
      id: 'w2-kuning',
      word: 'Kuning',
      categoryId: 'warna',
      explanation: '"Kuning" menerangkan warna diraja pada payung dan kain kebesaran Melayu.',
    },
    {
      id: 'w2-panjang',
      word: 'Panjang',
      categoryId: 'ukuran',
      explanation: '"Panjang" menerangkan ukuran jarak memanjang seperti rumah panjang di Sarawak.',
    },
    {
      id: 'w2-nipis',
      word: 'Nipis',
      categoryId: 'ukuran',
      explanation: '"Nipis" menerangkan ukuran ketebalan yang kecil seperti helaian daun pisang.',
    },
    {
      id: 'w2-bujur',
      word: 'Bujur',
      categoryId: 'bentuk',
      explanation: '"Bujur" menerangkan rupa bentuk seperti telur atau bingkai cermin lama.',
    },
    {
      id: 'w2-leper',
      word: 'Leper',
      categoryId: 'bentuk',
      explanation: '"Leper" menerangkan bentuk permukaan yang rata dan tidak tebal.',
    },
    {
      id: 'w2-baharu',
      word: 'Baharu',
      categoryId: 'waktu',
      explanation: '"Baharu" menerangkan tempoh masa yang belum lama wujud atau masih segar.',
    },
    {
      id: 'w2-silam',
      word: 'Silam',
      categoryId: 'waktu',
      explanation: '"Silam" menerangkan masa lampau seperti kisah sejarah dan cerita rakyat.',
    },
    {
      id: 'w2-hampir',
      word: 'Hampir',
      categoryId: 'jarak',
      explanation: '"Hampir" menerangkan jarak yang sangat dekat antara dua kedudukan.',
    },
    {
      id: 'w2-rapat',
      word: 'Rapat',
      categoryId: 'jarak',
      explanation: '"Rapat" menerangkan jarak yang berdekatan tanpa ruang luas di antara benda.',
    },
    {
      id: 'w2-cermat',
      word: 'Cermat',
      categoryId: 'cara',
      explanation: '"Cermat" menerangkan cara melakukan kerja dengan teliti seperti mengukir kayu.',
    },
    {
      id: 'w2-laju',
      word: 'Laju',
      categoryId: 'cara',
      explanation: '"Laju" menerangkan cara pergerakan yang sangat cepat.',
    },
    {
      id: 'w2-teruja',
      word: 'Teruja',
      categoryId: 'perasaan',
      explanation: '"Teruja" menerangkan perasaan penuh semangat apabila memulakan pengembaraan.',
    },
    {
      id: 'w2-tenang',
      word: 'Tenang',
      categoryId: 'perasaan',
      explanation: '"Tenang" menerangkan perasaan aman dan tenteram di suasana kampung.',
    },
    {
      id: 'w2-lembut',
      word: 'Lembut',
      categoryId: 'pancaindera',
      explanation: '"Lembut" menerangkan deria sentuhan seperti tekstur kain sutera dan kuih tradisional.',
    },
    {
      id: 'w2-masin',
      word: 'Masin',
      categoryId: 'pancaindera',
      explanation: '"Masin" menerangkan deria rasa seperti rasa garam dalam masakan kampung.',
    },
  ],
  [
    {
      id: 'w3-berani',
      word: 'Berani',
      categoryId: 'sifat',
      explanation: '"Berani" menerangkan sifat tidak gentar menghadapi cabaran.',
    },
    {
      id: 'w3-amanah',
      word: 'Amanah',
      categoryId: 'sifat',
      explanation: '"Amanah" menerangkan sifat jujur dan boleh dipercayai.',
    },
    {
      id: 'w3-biru',
      word: 'Biru',
      categoryId: 'warna',
      explanation: '"Biru" menerangkan warna langit cerah dan air sungai yang jernih.',
    },
    {
      id: 'w3-ungu',
      word: 'Ungu',
      categoryId: 'warna',
      explanation: '"Ungu" menerangkan warna pada corak kain batik tradisional.',
    },
    {
      id: 'w3-besar',
      word: 'Besar',
      categoryId: 'ukuran',
      explanation: '"Besar" menerangkan saiz sesuatu benda seperti istana dan pokok tualang.',
    },
    {
      id: 'w3-kecil',
      word: 'Kecil',
      categoryId: 'ukuran',
      explanation: '"Kecil" menerangkan saiz yang halus atau tidak besar seperti Awang Kenit.',
    },
    {
      id: 'w3-lurus',
      word: 'Lurus',
      categoryId: 'bentuk',
      explanation: '"Lurus" menerangkan bentuk garisan atau laluan yang tidak bengkang-bengkok.',
    },
    {
      id: 'w3-bengkok',
      word: 'Bengkok',
      categoryId: 'bentuk',
      explanation: '"Bengkok" menerangkan bentuk yang melengkung atau berkelok seperti lok keris.',
    },
    {
      id: 'w3-segera',
      word: 'Segera',
      categoryId: 'waktu',
      explanation: '"Segera" menerangkan waktu yang cepat tanpa berlengah.',
    },
    {
      id: 'w3-lama',
      word: 'Lama',
      categoryId: 'waktu',
      explanation: '"Lama" menerangkan tempoh masa yang panjang atau warisan zaman dahulu.',
    },
    {
      id: 'w3-nyaris',
      word: 'Nyaris',
      categoryId: 'jarak',
      explanation: '"Nyaris" menerangkan jarak yang amat dekat hampir bersentuhan.',
    },
    {
      id: 'w3-renggang',
      word: 'Renggang',
      categoryId: 'jarak',
      explanation: '"Renggang" menerangkan jarak yang berjauhan atau mempunyai ruang di antara dua benda.',
    },
    {
      id: 'w3-tangkas',
      word: 'Tangkas',
      categoryId: 'cara',
      explanation: '"Tangkas" menerangkan cara pergerakan pesilat yang cepat dan cekap.',
    },
    {
      id: 'w3-cekap',
      word: 'Cekap',
      categoryId: 'cara',
      explanation: '"Cekap" menerangkan cara melakukan sesuatu tugas dengan mahir dan pantas.',
    },
    {
      id: 'w3-rindu',
      word: 'Rindu',
      categoryId: 'perasaan',
      explanation: '"Rindu" menerangkan perasaan ingin bertemu kampung halaman atau keluarga.',
    },
    {
      id: 'w3-syukur',
      word: 'Syukur',
      categoryId: 'perasaan',
      explanation: '"Syukur" menerangkan perasaan berterima kasih atas nikmat dan kejayaan.',
    },
    {
      id: 'w3-wangi',
      word: 'Wangi',
      categoryId: 'pancaindera',
      explanation: '"Wangi" menerangkan deria bau yang menyenangkan seperti bunga cempaka.',
    },
    {
      id: 'w3-enak',
      word: 'Enak',
      categoryId: 'pancaindera',
      explanation: '"Enak" menerangkan deria rasa makanan warisan yang lazat.',
    },
  ],
];

export const STAGE_2_QUESTION_SETS: Stage2Question[][] = [
  STAGE_2_QUESTIONS,
  [
    {
      id: 's2-b-q1',
      title: 'Soalan 1: Wau Bulan di Angkasa',
      imageUrl: asset('pixel_wau_bulan_1795018822666.jpg'),
      imageAlt: 'Ilustrasi Pixel Art Wau Bulan tradisional Malaysia terbang di langit biru',
      sentence: 'Langit di belakang wau bulan itu berwarna ______.',
      options: ['Merdu', 'Manis', 'Biru'],
      correctIndex: 2,
      adjectiveType: 'Kata Adjektif Warna',
      explanationCorrect:
        '"Biru" ialah Kata Adjektif Warna yang tepat menggambarkan warna langit cerah ketika wau bulan diterbangkan.',
      explanationWrong:
        'Jawapan yang betul ialah "Biru" (Kata Adjektif Warna). "Merdu" ialah bunyi dan "Manis" ialah rasa.',
    },
    {
      id: 's2-b-q2',
      title: 'Soalan 2: Tenunan Kain Songket',
      imageUrl: asset('pixel_kain_songket_1795018823995.jpg'),
      imageAlt: 'Ilustrasi Pixel Art Kain Songket tenunan benang emas di atas rak kayu berukir',
      sentence: 'Benang pada kain songket diraja itu ditenun menggunakan warna ______.',
      options: ['Masam', 'Keemasan', 'Perlahan'],
      correctIndex: 1,
      adjectiveType: 'Kata Adjektif Warna',
      explanationCorrect:
        '"Keemasan" ialah Kata Adjektif Warna yang tepat untuk benang logam emas pada kain songket.',
      explanationWrong:
        'Jawapan yang betul ialah "Keemasan" (Kata Adjektif Warna). "Masam" ialah rasa dan "Perlahan" ialah cara.',
    },
    {
      id: 's2-b-q3',
      title: 'Soalan 3: Pesta Kompang Kampung',
      imageUrl: asset('pixel_kompang_1795018824262.jpg'),
      imageAlt: 'Ilustrasi Pixel Art sekumpulan pemain kompang memakai baju Melayu di halaman kampung',
      sentence: 'Suasana di halaman kampung semasa persembahan kompang kelihatan sangat ______.',
      options: ['Meriah', 'Pahit', 'Lonjong'],
      correctIndex: 0,
      adjectiveType: 'Kata Adjektif Sifat',
      explanationCorrect:
        '"Meriah" menerangkan suasana yang riang dan gembira ketika penduduk kampung berkumpul menyaksikan persembahan kompang.',
      explanationWrong:
        'Jawapan yang betul ialah "Meriah" (Kata Adjektif Sifat/Keadaan). "Pahit" ialah rasa dan "Lonjong" ialah bentuk.',
    },
    {
      id: 's2-b-q4',
      title: 'Soalan 4: Kuih Dodol Warisan',
      imageUrl: asset('pixel_kuih_dodol_1795018824285.jpg'),
      imageAlt: 'Ilustrasi Pixel Art kuih dodol di atas daun pisang dan pinggan seramik warisan',
      sentence: 'Tekstur kuih dodol yang baru dimasak itu terasa ______ apabila disentuh.',
      options: ['Jauh', 'Lembut', 'Merdu'],
      correctIndex: 1,
      adjectiveType: 'Kata Adjektif Pancaindera',
      explanationCorrect:
        '"Lembut" ialah Kata Adjektif Pancaindera (sentuhan) yang menggambarkan tekstur dodol yang kenyal dan lembut.',
      explanationWrong:
        'Jawapan yang betul ialah "Lembut" (Kata Adjektif Pancaindera sentuhan). "Jauh" ialah jarak dan "Merdu" ialah bunyi.',
    },
    {
      id: 's2-b-q5',
      title: 'Soalan 5: Rumah Kayu Melayu',
      imageUrl: asset('pixel_rumah_melayu_1795018824560.jpg'),
      imageAlt: 'Ilustrasi Pixel Art rumah kayu tradisional Melayu bertiang tinggi dengan tangga berukir',
      sentence: 'Rumah kayu tradisional Melayu itu dibina daripada papan yang ______ dan kukuh.',
      options: ['Tebal', 'Manis', 'Lewat'],
      correctIndex: 0,
      adjectiveType: 'Kata Adjektif Ukuran',
      explanationCorrect:
        '"Tebal" ialah Kata Adjektif Ukuran yang menerangkan ketebalan kayu jati dan cengal yang digunakan untuk membina rumah.',
      explanationWrong:
        'Jawapan yang betul ialah "Tebal" (Kata Adjektif Ukuran). "Manis" ialah rasa dan "Lewat" ialah waktu.',
    },
  ],
  [
    {
      id: 's2-c-q1',
      title: 'Soalan 1: Awan dan Wau Bulan',
      imageUrl: asset('pixel_wau_bulan_1795018822666.jpg'),
      imageAlt: 'Ilustrasi Pixel Art Wau Bulan tradisional Malaysia terbang di langit biru',
      sentence: 'Awan putih yang melintasi wau bulan di langit itu kelihatan sangat ______.',
      options: ['Pahit', 'Gebu', 'Pantas'],
      correctIndex: 1,
      adjectiveType: 'Kata Adjektif Pancaindera',
      explanationCorrect:
        '"Gebu" ialah Kata Adjektif Pancaindera (penglihatan/sentuhan) yang sesuai menggambarkan awan putih yang lembut.',
      explanationWrong:
        'Jawapan yang betul ialah "Gebu". "Pahit" ialah rasa dan "Pantas" ialah cara pergerakan.',
    },
    {
      id: 's2-c-q2',
      title: 'Soalan 2: Permukaan Kain Songket',
      imageUrl: asset('pixel_kain_songket_1795018823995.jpg'),
      imageAlt: 'Ilustrasi Pixel Art Kain Songket tenunan benang emas di atas rak kayu berukir',
      sentence: 'Permukaan kain songket tenunan tangan itu berasa sedikit ______ kerana sulaman benang emas.',
      options: ['Awal', 'Jauh', 'Kasar'],
      correctIndex: 2,
      adjectiveType: 'Kata Adjektif Pancaindera',
      explanationCorrect:
        '"Kasar" ialah Kata Adjektif Pancaindera (sentuhan) yang dirasai pada bahagian timbul sulaman benang logam songket.',
      explanationWrong:
        'Jawapan yang betul ialah "Kasar" (deria sentuhan). "Awal" ialah waktu dan "Jauh" ialah jarak.',
    },
    {
      id: 's2-c-q3',
      title: 'Soalan 3: Rentak Pemain Kompang',
      imageUrl: asset('pixel_kompang_1795018824262.jpg'),
      imageAlt: 'Ilustrasi Pixel Art sekumpulan pemain kompang memakai baju Melayu di halaman kampung',
      sentence: 'Pemain kompang itu memukul kompang dengan rentak yang ______.',
      options: ['Masin', 'Pantas', 'Bulat'],
      correctIndex: 1,
      adjectiveType: 'Kata Adjektif Cara',
      explanationCorrect:
        '"Pantas" ialah Kata Adjektif Cara yang menerangkan tempo paluan kompang yang rancak dan laju.',
      explanationWrong:
        'Jawapan yang betul ialah "Pantas" (Kata Adjektif Cara). "Masin" ialah rasa dan "Bulat" ialah bentuk.',
    },
    {
      id: 's2-c-q4',
      title: 'Soalan 4: Potongan Kuih Dodol',
      imageUrl: asset('pixel_kuih_dodol_1795018824285.jpg'),
      imageAlt: 'Ilustrasi Pixel Art kuih dodol di atas daun pisang dan pinggan seramik warisan',
      sentence: 'Kuih dodol itu dipotong menjadi bentuk ______ di atas daun pisang.',
      options: ['Segi empat', 'Merdu', 'Harum'],
      correctIndex: 0,
      adjectiveType: 'Kata Adjektif Bentuk',
      explanationCorrect:
        '"Segi empat" ialah Kata Adjektif Bentuk yang tepat menggambarkan potongan kuih dodol di atas pinggan.',
      explanationWrong:
        'Jawapan yang betul ialah "Segi empat" (Kata Adjektif Bentuk). "Merdu" ialah bunyi dan "Harum" ialah bau.',
    },
    {
      id: 's2-c-q5',
      title: 'Soalan 5: Bunga Raya di Halaman Rumah',
      imageUrl: asset('pixel_rumah_melayu_1795018824560.jpg'),
      imageAlt: 'Ilustrasi Pixel Art rumah kayu tradisional Melayu bertiang tinggi dengan tangga berukir',
      sentence: 'Bunga raya yang mekar di hadapan rumah kampung itu berwarna ______.',
      options: ['Lewat', 'Merdu', 'Merah'],
      correctIndex: 2,
      adjectiveType: 'Kata Adjektif Warna',
      explanationCorrect:
        '"Merah" ialah Kata Adjektif Warna yang menggambarkan kelopak bunga raya, bunga kebangsaan Malaysia.',
      explanationWrong:
        'Jawapan yang betul ialah "Merah" (Kata Adjektif Warna). "Lewat" ialah waktu dan "Merdu" ialah bunyi.',
    },
  ],
];

export const STAGE_3_QUESTION_SETS: Stage3Question[][] = [
  STAGE_3_QUESTIONS,
  [
    {
      id: 's3-b-q1',
      title: 'Soalan 1: Gasing Tradisional',
      sentence: 'Gasing kayu yang dipusingkan oleh Pak Mail berputar dengan sangat ______.',
      options: ['Harum', 'Pantas', 'Masam'],
      correctIndex: 1,
      adjectiveType: 'Kata Adjektif Cara',
      explanationCorrect:
        '"Pantas" ialah Kata Adjektif Cara yang menerangkan kelajuan putaran gasing tradisional.',
      optionReasons: [
        '"Harum" ialah Kata Adjektif Pancaindera (bau) dan tidak menerangkan putaran gasing.',
        'Betul! "Pantas" ialah Kata Adjektif Cara yang bermaksud laju atau cepat.',
        '"Masam" ialah Kata Adjektif Pancaindera (rasa), bukan cara berputar.',
      ],
    },
    {
      id: 's3-b-q2',
      title: 'Soalan 2: Seni Ukiran Kayu',
      sentence: 'Ukiran bunga pada pintu kayu istana itu mempunyai garisan yang ______.',
      options: ['Halus', 'Pahit', 'Awal'],
      correctIndex: 0,
      adjectiveType: 'Kata Adjektif Pancaindera',
      explanationCorrect:
        '"Halus" ialah Kata Adjektif Pancaindera/Sifat yang menggambarkan ketelitian seni ukiran kayu Melayu.',
      optionReasons: [
        'Betul! "Halus" menunjukkan ukiran kayu dibuat dengan penuh ketelitian dan kemas.',
        '"Pahit" ialah Kata Adjektif Pancaindera (rasa makanan), bukan seni ukiran.',
        '"Awal" ialah Kata Adjektif Waktu, bukan sifat garisan ukiran.',
      ],
    },
    {
      id: 's3-b-q3',
      title: 'Soalan 3: Pahlawan Kampung',
      sentence: 'Pendekar Badang berasa amat ______ apabila berjaya melindungi penduduk kampung.',
      options: ['Bulat', 'Jauh', 'Bangga'],
      correctIndex: 2,
      adjectiveType: 'Kata Adjektif Perasaan',
      explanationCorrect:
        '"Bangga" ialah Kata Adjektif Perasaan yang menggambarkan emosi gembira dan megah atas kejayaan.',
      optionReasons: [
        '"Bulat" ialah Kata Adjektif Bentuk, bukan perasaan manusia.',
        '"Jauh" ialah Kata Adjektif Jarak, bukan emosi.',
        'Betul! "Bangga" ialah Kata Adjektif Perasaan yang menerangkan emosi wira.',
      ],
    },
    {
      id: 's3-b-q4',
      title: 'Soalan 4: Sungai Tropika',
      sentence: 'Air sungai yang mengalir dari gunung ke kawasan perkampungan itu sangat ______.',
      options: ['Lewat', 'Sejuk', 'Lonjong'],
      correctIndex: 1,
      adjectiveType: 'Kata Adjektif Pancaindera',
      explanationCorrect:
        '"Sejuk" ialah Kata Adjektif Pancaindera (deria sentuh/suhu) bagi air sungai pergunungan yang segar.',
      optionReasons: [
        '"Lewat" ialah Kata Adjektif Waktu, tidak menerangkan suhu air.',
        'Betul! "Sejuk" ialah Kata Adjektif Pancaindera yang menerangkan rasa suhu air.',
        '"Lonjong" ialah Kata Adjektif Bentuk, bukan sifat air.',
      ],
    },
    {
      id: 's3-b-q5',
      title: 'Soalan 5: Laluan ke Puncak Istana',
      sentence: 'Jarak antara kampung di lembah dengan puncak gunung istana agak ______.',
      options: ['Jauh', 'Manis', 'Merdu'],
      correctIndex: 0,
      adjectiveType: 'Kata Adjektif Jarak',
      explanationCorrect:
        '"Jauh" ialah Kata Adjektif Jarak yang tepat untuk menerangkan kedudukan antara lembah dan puncak gunung.',
      optionReasons: [
        'Betul! "Jauh" ialah Kata Adjektif Jarak yang menerangkan jarak antara dua tempat.',
        '"Manis" ialah Kata Adjektif Pancaindera (rasa), bukan jarak.',
        '"Merdu" ialah Kata Adjektif Pancaindera (pendengaran), bukan jarak.',
      ],
    },
  ],
  [
    {
      id: 's3-c-q1',
      title: 'Soalan 1: Batik Canting',
      sentence: 'Kain batik canting itu dilukis menggunakan warna ______ yang terang dan menarik.',
      options: ['Pantas', 'Merdu', 'Kuning'],
      correctIndex: 2,
      adjectiveType: 'Kata Adjektif Warna',
      explanationCorrect:
        '"Kuning" ialah Kata Adjektif Warna yang tepat untuk menerangkan warna lukisan batik.',
      optionReasons: [
        '"Pantas" ialah Kata Adjektif Cara, bukan warna.',
        '"Merdu" ialah Kata Adjektif Pancaindera (pendengaran), bukan warna.',
        'Betul! "Kuning" ialah Kata Adjektif Warna yang melengkapkan ayat tersebut.',
      ],
    },
    {
      id: 's3-c-q2',
      title: 'Soalan 2: Rebana Ubi',
      sentence: 'Rebana ubi tradisional mempunyai bentuk bingkai yang ______.',
      options: ['Bulat', 'Sedih', 'Awal'],
      correctIndex: 0,
      adjectiveType: 'Kata Adjektif Bentuk',
      explanationCorrect:
        '"Bulat" ialah Kata Adjektif Bentuk yang menggambarkan bentuk melingkar alat muzik rebana ubi.',
      optionReasons: [
        'Betul! "Bulat" ialah Kata Adjektif Bentuk bagi bingkai rebana ubi.',
        '"Sedih" ialah Kata Adjektif Perasaan, bukan bentuk.',
        '"Awal" ialah Kata Adjektif Waktu, bukan bentuk.',
      ],
    },
    {
      id: 's3-c-q3',
      title: 'Soalan 3: Keris Pusaka',
      sentence: 'Hulu keris pusaka milik raja itu kelihatan ______ kerana disalut emas tulen.',
      options: ['Masin', 'Berkilau', 'Lewat'],
      correctIndex: 1,
      adjectiveType: 'Kata Adjektif Pancaindera',
      explanationCorrect:
        '"Berkilau" ialah Kata Adjektif Pancaindera (penglihatan) bagi permukaan emas yang bersinar.',
      optionReasons: [
        '"Masin" ialah Kata Adjektif Pancaindera (rasa), tidak dapat dilihat pada emas.',
        'Betul! "Berkilau" menerangkan pantulan cahaya pada hulu keris emas.',
        '"Lewat" ialah Kata Adjektif Waktu, bukan penglihatan.',
      ],
    },
    {
      id: 's3-c-q4',
      title: 'Soalan 4: Pagi di Lebuh Nusantara',
      sentence: 'Para peniaga di Lebuh Nusantara membuka gerai mereka pada waktu ______ pagi.',
      options: ['Manis', 'Tebal', 'Awal'],
      correctIndex: 2,
      adjectiveType: 'Kata Adjektif Waktu',
      explanationCorrect:
        '"Awal" ialah Kata Adjektif Waktu yang menerangkan masa permulaan hari.',
      optionReasons: [
        '"Manis" ialah Kata Adjektif Pancaindera (rasa), bukan masa.',
        '"Tebal" ialah Kata Adjektif Ukuran, bukan masa.',
        'Betul! "Awal" ialah Kata Adjektif Waktu yang tepat untuk waktu pagi.',
      ],
    },
    {
      id: 's3-c-q5',
      title: 'Soalan 5: Pustaka Warisan',
      sentence: 'Buku cerita rakyat Nusantara yang tersusun di istana itu sangat ______.',
      options: ['Tebal', 'Harum', 'Gembira'],
      correctIndex: 0,
      adjectiveType: 'Kata Adjektif Ukuran',
      explanationCorrect:
        '"Tebal" ialah Kata Adjektif Ukuran yang menerangkan ketebalan buku cerita rakyat.',
      optionReasons: [
        'Betul! "Tebal" ialah Kata Adjektif Ukuran bagi buku yang banyak halaman.',
        '"Harum" ialah Kata Adjektif Pancaindera (bau), bukan ukuran buku.',
        '"Gembira" ialah Kata Adjektif Perasaan manusia, bukan sifat buku.',
      ],
    },
  ],
];


export const STAGE_METADATA = [
  {
    id: 1 as const,
    name: 'Tapak Warisan',
    difficulty: 'MUDAH',
    concept: 'Klasifikasi Kata Adjektif',
    description: 'Perkampungan tradisional Melayu dengan rumah kayu, sawah padi dan kraftangan.',
    rewardText: '+5 kupang setiap jawapan · +20 kupang bonus (Maksimum 110)',
    mapPosition: { left: '19%', top: '65%' },
    badgeColor: '#15803D',
  },
  {
    id: 2 as const,
    name: 'Lebuh Nusantara',
    difficulty: 'SEDERHANA',
    concept: 'Pilih Kata Adjektif Bergambar',
    description: 'Pekan budaya dengan pasar tradisional, persembahan seni, pakaian dan makanan warisan.',
    rewardText: '+10 kupang setiap jawapan · +20 kupang bonus (Maksimum 70)',
    mapPosition: { left: '49%', top: '51%' },
    badgeColor: '#D97706',
  },
  {
    id: 3 as const,
    name: 'Puncak Karyawan',
    difficulty: 'SUKAR',
    concept: 'Lengkapkan Ayat Konteks Budaya',
    description: 'Istana diraja di atas gunung yang dihiasi seni ukiran kayu dan gerbang berdaulat.',
    rewardText: '+15 kupang setiap jawapan · +30 kupang bonus (Maksimum 105)',
    mapPosition: { left: '79%', top: '26%' },
    badgeColor: '#B91C1C',
  },
];
