// src/data/armaTuBoxProducts.js
// Catálogo exclusivo de artículos personalizables para el constructor "Arma tu Box" (Sin precios directos, para cotización)

// Import eager de todas las imágenes de la carpeta Crea_tu_box_articulos / arma_tu_box
const rawImages = import.meta.glob('../assets/Crea_tu_box_articulos/**/*.{jpeg,jpg,png,webp}', { eager: true });

import breakLabLogo from '../assets/break_lab_logo.png';

// Helper para obtener el url de la imagen dado el relative path dentro de Crea_tu_box_articulos
const getImg = (relPath) => {
    // Normalizar separadores a '/'
    const cleanRel = relPath.replace(/\\/g, '/');
    const exactKey = `../assets/Crea_tu_box_articulos/${cleanRel}`;
    if (rawImages[exactKey]) {
        return rawImages[exactKey].default || rawImages[exactKey];
    }
    // Búsqueda flexible por nombre de archivo
    const fileName = cleanRel.split('/').pop().toLowerCase();
    for (const [key, mod] of Object.entries(rawImages)) {
        if (key.toLowerCase().endsWith(fileName)) {
            return mod.default || mod;
        }
    }
    return breakLabLogo;
};

export const ARMA_TU_BOX_CATEGORIES = [
    { id: 'all', name: 'Todas las Categorías', icon: '🌟', description: 'Todos los artículos organizados por categoría' },
    { id: 'vasos_mugs', name: 'Vasos y Mugs', icon: '☕', description: 'Mugs glitter, mágicos termosensibles, cerámica y vasos en vidrio esmerilado con tapa bambú' },
    { id: 'gelatortas', name: 'Gelatortas', icon: '🍰', description: 'Gelatortas artesanales en capas, mosaico frutal, tres leches, tentación de baileys y tortas' },
    { id: 'gelapaletas', name: 'Gelapaletas', icon: '🍭', description: 'Paletas individuales de gelatina temática con diseños divertidos' },
    { id: 'portarretratos', name: 'Portarretratos y Retablos', icon: '🖼️', description: 'Retablos MDF, mini caballetes en madera con retablo fotográfico y portaretratos con luz LED' },
    { id: 'llaveros', name: 'Llaveros', icon: '🔑', description: 'Llaveros destapador, placas metálicas escudo, acrílico transparente y MDF en diversas formas' },
    { id: 'accesorios', name: 'Accesorios', icon: '🛋️', description: 'Cojines mágicos de lentejuelas con foto, mouse pads ergonómicos y reloj digital cubo LED' },
    { id: 'lamparas', name: 'Lámparas', icon: '💡', description: 'Cúpula de cristal rosa galáctica eterna con luces micro LED y lámpara espejo infinito corazón' },
    { id: 'rompecabezas', name: 'Rompecabezas', icon: '🧩', description: 'Puzzles sublimados en forma de corazón y rectangulares para fotos familiares y de pareja' },
    { id: 'termos_caramanolas', name: 'Termos y Caramañolas', icon: '🍶', description: 'Botellas infantiles en aluminio con boquilla y botellas térmicas deportivas en acero inoxidable' },
    { id: 'impresiones_3d', name: 'Impresiones 3D', icon: '👾', description: 'Figuras coleccionables esculpidas en resina/filamento y llaveros mecánicos articulados' }
];

export const ARMA_TU_BOX_PRODUCTS = [
    // ==================== VASOS Y MUGS ====================
    {
        id: 'box-mug-purpurina-dorada',
        name: 'Mug Cerámica Purpurina Dorada Glitter',
        category: 'vasos_mugs',
        categoryName: 'Vasos y Mugs',
        badge: 'Glitter Lujo ✨',
        subtitle: 'Acabado brillante escarchado dorado personalizable',
        description: 'Mug de cerámica con textura brillante escarchada en tono dorado. Ideal para fotos o mensajes especiales.',
        image: getImg('Vasos_mugs/taza-ceramica-acabado-purpurina-dorada-glitter-escarchado.jpeg'),
        tags: ['mug', 'glitter', 'dorado', 'taza', 'brillante']
    },
    {
        id: 'box-mug-magico-corazon',
        name: 'Mug Mágico Asa Corazón Termosensible',
        category: 'vasos_mugs',
        categoryName: 'Vasos y Mugs',
        badge: 'Sorpresa 💖',
        subtitle: 'Revela tu foto o diseño al verter bebida caliente',
        description: 'Taza negra termosensible con asa en forma de corazón que revela el diseño personalizado al contacto con líquidos calientes.',
        image: getImg('Vasos_mugs/taza-ceramica-mug-magico-asa-oreja-corazon.jpeg'),
        tags: ['mug magico', 'corazon', 'termosensible', 'sorpresa']
    },
    {
        id: 'box-mug-magico-clasico',
        name: 'Mug Mágico Negro Termocromático',
        category: 'vasos_mugs',
        categoryName: 'Vasos y Mugs',
        badge: 'Mágico ☕',
        subtitle: 'Cambio de color térmico con imagen oculta',
        description: 'Mug cerámico negro que cambia a blanco revelando la foto o dedicatoria cuando se llena de café o té caliente.',
        image: getImg('Vasos_mugs/taza-ceramica-mug-magico.jpeg'),
        tags: ['mug magico', 'termico', 'negro']
    },
    {
        id: 'box-set-tazas-pareja-mate',
        name: 'Set Tazas Pareja Negro Mate Asa Corazón',
        category: 'vasos_mugs',
        categoryName: 'Vasos y Mugs',
        badge: 'Dúo Romántico 💑',
        subtitle: 'Set de 2 mugs entrelazados para enamorados',
        description: 'Par de tazas en acabado negro mate elegante con asas de corazón diseñadas para compartir momentos especiales.',
        image: getImg('Vasos_mugs/set-tazas-parejas-negro-mate-asa-corazon-mug-magico.jpeg'),
        tags: ['pareja', 'set tazas', 'negro mate', 'amor']
    },
    {
        id: 'box-set-vasos-vidrio-lata-bambu',
        name: 'Set Vasos Vidrio Esmerilado Tipo Lata con Tapa Bambú',
        category: 'vasos_mugs',
        categoryName: 'Vasos y Mugs',
        badge: 'Eco Chic 🌿',
        subtitle: 'Vidrio opalizado con tapa hermética de bambú y pitillo',
        description: 'Elegante vaso cilíndrico en vidrio esmerilado con tapa de madera bambú natural, perfecto para café frío y bebidas frescas.',
        image: getImg('Vasos_mugs/set-vasos-vidrio-esmerilado-forma-lata-bambu.jpeg'),
        tags: ['vaso', 'lata', 'bambu', 'esmerilado', 'vidrio']
    },
    {
        id: 'box-mason-jar-esmerilada',
        name: 'Jarra Mason Jar Esmerilada Degradé con Pitillo',
        category: 'vasos_mugs',
        categoryName: 'Vasos y Mugs',
        badge: 'Degradé Pastel 🌸',
        subtitle: 'Tarro vintage esmerilado con tapa y pitillo reutilizable',
        description: 'Jarra tipo Mason Jar con difuminado degradé en tonos pastel y textura esmerilada, personalizable con nombres o ilustraciones.',
        image: getImg('Vasos_mugs/jarra-mason-jar-esmerilada-degrade-rosa-pitillo.jpeg'),
        tags: ['mason jar', 'tarro', 'pitillo', 'esmerilada', 'rosa']
    },
    {
        id: 'box-mug-blanco-clasico',
        name: 'Mug Cerámica Blanco Clásico 11oz',
        category: 'vasos_mugs',
        categoryName: 'Vasos y Mugs',
        badge: 'Clásico Esencial ⭐',
        subtitle: 'Sublimación fotográfica nítida a full color',
        description: 'Taza de cerámica blanca brillante de alta resistencia. El lienzo perfecto para cualquier fotografía, frase o ilustración.',
        image: getImg('Vasos_mugs/taza-ceramica-blanca-clasica-sublimacion-mug.jpeg'),
        tags: ['mug clasico', 'blanco', '11oz', 'sublimacion']
    },
    {
        id: 'box-mug-panel-fotografico',
        name: 'Mug Blanco con Panel Fotográfico Sublimado',
        category: 'vasos_mugs',
        categoryName: 'Vasos y Mugs',
        badge: 'Alta Definición 📸',
        subtitle: 'Enmarcado fotográfico especial de máxima resolución',
        description: 'Mug cerámico con marco panorámico para resaltar tus mejores recuerdos fotográficos familiares o en pareja.',
        image: getImg('Vasos_mugs/taza-blanca-panel-fotografico-sublimacion-magico.jpeg'),
        tags: ['panel', 'foto', 'mug', 'personalizado']
    },
    {
        id: 'box-mug-interior-asa-roja-corazon',
        name: 'Mug Blanco Interior y Asa Roja Forma Corazón',
        category: 'vasos_mugs',
        categoryName: 'Vasos y Mugs',
        badge: 'Detalle Amor ❤️',
        subtitle: 'Contraste vivo en rojo pasión con asa especial',
        description: 'Mug cerámico con interior rojo vibrante y asa ergonómica en forma de corazón, ideal para aniversarios y San Valentín.',
        image: getImg('Vasos_mugs/taza-blanca-interior-asa-roja-corazon-mug.jpeg'),
        tags: ['rojo', 'corazon', 'asa corazon', 'mug']
    },
    {
        id: 'box-mug-verde-neon',
        name: 'Mug Cerámico Verde Neón Flúor',
        category: 'vasos_mugs',
        categoryName: 'Vasos y Mugs',
        badge: 'Vibrante Neón ⚡',
        subtitle: 'Color fluorescente moderno de alto impacto visual',
        description: 'Mug con acabado verde neón brillante. Llama la atención y resalta textos y siluetas en color oscuro.',
        image: getImg('Vasos_mugs/taza-ceramica-acabado-verde-neon-brillante.jpeg'),
        tags: ['neon', 'verde', 'fluor', 'mug']
    },
    {
        id: 'box-mug-gris-menta-neon',
        name: 'Mug Bicolor Gris con Panel Menta Neón',
        category: 'vasos_mugs',
        categoryName: 'Vasos y Mugs',
        badge: 'Estilo Urbano 🍃',
        subtitle: 'Combinación vanguardista verde menta luminoso y gris',
        description: 'Taza con franja central menta luminosa sobre cuerpo gris grafito moderno, para gustos sobrios y modernos.',
        image: getImg('Vasos_mugs/taza-ceramica-gris-panel-central-verde-menta-neon-luminoso.jpeg'),
        tags: ['menta', 'gris', 'bicolor', 'mug']
    },
    {
        id: 'box-mug-interior-color-personalizable',
        name: 'Mug Cerámico con Interior y Asa de Color',
        category: 'vasos_mugs',
        categoryName: 'Vasos y Mugs',
        badge: 'Multicolor 🎨',
        subtitle: 'Elige tu tono favorito de interior y asa a juego',
        description: 'Mug blanco con asa e interior pintados en tonos vivos para armonizar con el diseño de tu regalo.',
        image: getImg('Vasos_mugs/taza-ceramica-interior-asa-color-fondo-color-sublimacion.jpeg'),
        tags: ['color', 'interior color', 'mug']
    },
    {
        id: 'box-mug-interior-asa-verde',
        name: 'Mug Interior y Asa Verde Lima',
        category: 'vasos_mugs',
        categoryName: 'Vasos y Mugs',
        badge: 'Fresco 🌿',
        subtitle: 'Toque natural y vivo con borde y asa verde',
        description: 'Taza clásica con interior y agarradera en verde natural vibrante.',
        image: getImg('Vasos_mugs/taza-ceramica-interior-asa-verde-fondo-color-mug.jpeg'),
        tags: ['verde', 'lima', 'mug']
    },
    {
        id: 'box-mug-peltre-vintage',
        name: 'Mug Vintage Estilo Peltre Borde Negro',
        category: 'vasos_mugs',
        categoryName: 'Vasos y Mugs',
        badge: 'Retro Campestre ⛺',
        subtitle: 'Apariencia de peltre esmaltado tradicional con labio negro',
        description: 'Mug de estilo nostálgico vintage, perfecto para amantes del café de campo, aventuras y diseños rústicos.',
        image: getImg('Vasos_mugs/taza-estilo-peltre-esmaltada-borde-negro.jpeg'),
        tags: ['peltre', 'vintage', 'retro', 'campestre']
    },
    {
        id: 'box-mug-viajero-espejo',
        name: 'Mug Térmico Viajero Tapa Espejo',
        category: 'vasos_mugs',
        categoryName: 'Vasos y Mugs',
        badge: 'Para Llevar 🚗',
        subtitle: 'Vaso térmico hermético con tapa de acabado espejo',
        description: 'Termo personal portable con cierre antifugas y tapa superior reflectiva tipo espejo para llevar café al trabajo o estudio.',
        image: getImg('Vasos_mugs/taza-viaje-personalizado-espejo-mug.jpeg'),
        tags: ['viajero', 'termo', 'tapa espejo', 'cafe']
    },
    {
        id: 'box-vaso-vidrio-esmerilado-neon',
        name: 'Vaso Vidrio Esmerilado Degradé Neón Opalizado',
        category: 'vasos_mugs',
        categoryName: 'Vasos y Mugs',
        badge: 'Opalizado 🍹',
        subtitle: 'Cristal traslúcido suave al tacto con degradé luminoso',
        description: 'Vaso de cristal esmerilado con gradiente neón suave. Da un efecto traslúcido fascinante con bebidas frías.',
        image: getImg('Vasos_mugs/taza-vidrio-esmerilado-degrade-verde-neón-opalizada.jpeg'),
        tags: ['vidrio', 'esmerilado', 'neon', 'opalizado']
    },

    // ==================== GELATORTAS Y DULCES ====================
    {
        id: 'box-gelagurt-fresas',
        name: 'Gelagurt Cremoso con Fresas Naturales',
        category: 'gelatortas',
        categoryName: 'Gelatortas y Dulces',
        badge: 'Delicia Artesanal 🍓',
        subtitle: 'Suave fusión de yogur cremoso y fresas seleccionadas',
        description: 'Postre estrella artesanal BreakLab preparado con base de yogur suave y trozos de fresa fresca en capas.',
        image: getImg('Gelatortas/Gelatortas_desayuno/Gelagurt_gelatorta_cremosa_con_fresas_naturales.png'),
        tags: ['gelagurt', 'fresas', 'yogur', 'postre']
    },
    {
        id: 'box-gelatina-mosaico-tropical',
        name: 'Gelatina Mosaico con Frutas Tropicales',
        category: 'gelatortas',
        categoryName: 'Gelatortas y Dulces',
        badge: 'Frutas Tropicales 🍍',
        subtitle: 'Cubitos frutales multicolores en crema de leche',
        description: 'Deliciosa gelatina mosaico con cubos de sabores frutales y textura cremosa.',
        image: getImg('Gelatortas/Gelatortas_desayuno/gelatina_mosaico_frutas_tropicales_delivery.png'),
        tags: ['mosaico', 'frutas', 'tropical', 'gelatina']
    },
    {
        id: 'box-gelatorta-arcoiris-multicapa',
        name: 'Gelatorta Arcoíris Multicapa con Detalles Azules',
        category: 'gelatortas',
        categoryName: 'Gelatortas y Dulces',
        badge: 'Colorida 🌈',
        subtitle: 'Capas artesanales de colores vivos y sabor refrescante',
        description: 'Pastel artesanal de gelatina construido capa por capa en una armoniosa paleta de colores.',
        image: getImg('Gelatortas/Gelatortas_desayuno/gelatorta_arcoiris_multicapa_con_detalles_azules.jpeg'),
        tags: ['arcoiris', 'multicapa', 'colores', 'gelatorta']
    },
    {
        id: 'box-gelatorta-cremosa-fresa',
        name: 'Gelatorta Cremosa de Fresa Especial',
        category: 'gelatortas',
        categoryName: 'Gelatortas y Dulces',
        badge: 'Favorita ⭐',
        subtitle: 'Textura extra cremosa coronada con fresas naturales',
        description: 'Suave gelatorta con sabor a fresa y leche condensada con fresas enteras frescas.',
        image: getImg('Gelatortas/Gelatortas_desayuno/gelatorta_cremosa_de_fresa_con_fresas_naturales.jpeg'),
        tags: ['fresa', 'cremosa', 'postre', 'gelatorta']
    },
    {
        id: 'box-gelatorta-esponjosa-mosaico',
        name: 'Gelatorta Esponjosa con Cubitos de Gelatina',
        category: 'gelatortas',
        categoryName: 'Gelatortas y Dulces',
        badge: 'Textura Única 🍰',
        subtitle: 'Bizcochuelo esponjoso combinado con mosaico cremoso',
        description: 'El balance perfecto entre suavidad de ponqué y la frescura de la gelatina mosaico.',
        image: getImg('Gelatortas/Gelatortas_desayuno/gelatorta_esponjosa_multicapa_con_cubitos_de_gelatina.jpeg'),
        tags: ['esponjosa', 'bizcochuelo', 'mosaico', 'torta']
    },
    {
        id: 'box-gelatorta-frutos-rojos',
        name: 'Gelatorta Fresca de Frutos Rojos',
        category: 'gelatortas',
        categoryName: 'Gelatortas y Dulces',
        badge: 'Gourmet 🫐',
        subtitle: 'Mora, frambuesa y fresa en fina gelatina artesanal',
        description: 'Sabor agridulce sofisticado con reducción de frutos del bosque naturales.',
        image: getImg('Gelatortas/Gelatortas_desayuno/gelatorta_fresca_frutos_rojos_personalizada.png'),
        tags: ['frutos rojos', 'gourmet', 'berries', 'gelatorta']
    },
    {
        id: 'box-gelatorta-mosaico-festiva',
        name: 'Gelatorta Mosaico Cremosa Festiva',
        category: 'gelatortas',
        categoryName: 'Gelatortas y Dulces',
        badge: 'Celebración 🎉',
        subtitle: 'Mosaico de cubos gelatinosos multicolor en crema dulce',
        description: 'Colorida y alegre, ideal para cumpleaños infantiles y celebraciones familiares.',
        image: getImg('Gelatortas/Gelatortas_desayuno/gelatorta_mosaico_cremosa_con_cubos_de_colores.jpeg'),
        tags: ['mosaico', 'fiesta', 'cumpleaños', 'gelatorta']
    },
    {
        id: 'box-gelatorta-tematica-futbol',
        name: 'Gelatorta Temática Fútbol / Deportes',
        category: 'gelatortas',
        categoryName: 'Gelatortas y Dulces',
        badge: 'Deportiva ⚽',
        subtitle: 'Personalizada para hinchas y fanáticos del fútbol',
        description: 'Decorada con detalles del equipo favorito y mensaje de feliz día.',
        image: getImg('Gelatortas/Gelatortas_desayuno/gelatorta_tematica_futbol_feliz_dia_papa.png'),
        tags: ['futbol', 'papa', 'deporte', 'gelatorta']
    },
    {
        id: 'box-gelatorta-tres-leches-pina',
        name: 'Gelatorta Tres Leches con Piña y Frutas',
        category: 'gelatortas',
        categoryName: 'Gelatortas y Dulces',
        badge: 'Tres Leches 🍍',
        subtitle: 'Sabor tradicional tres leches con toque dulce de piña',
        description: 'Húmeda, refrescante y con un balance dulce tropical irresistible.',
        image: getImg('Gelatortas/Gelatortas_desayuno/gelatorta_tres_leches_pina_personalizada.png'),
        tags: ['tres leches', 'piña', 'cremosa', 'gelatorta']
    },
    {
        id: 'box-gela-mosaico-surtida',
        name: 'Gela-Mosaico Surtida Artesanal de la Casa',
        category: 'gelatortas',
        categoryName: 'Gelatortas y Dulces',
        badge: 'Tradicional 🍮',
        subtitle: 'Receta clásica de gelatina mosaico dulce y suave',
        description: 'La gelatina consentida de todos, preparada con leche entera, condensada y gelatina surtida.',
        image: getImg('Gelatortas/Gelatortas_desayuno/Gela_mosaico_gelatorta_mosaico_cremosa_surtida.png'),
        tags: ['mosaico', 'tradicional', 'casera']
    },
    {
        id: 'box-gelatorta-baileys',
        name: 'Gelatorta Tentación de Baileys, Café Moka y Chocolate',
        category: 'gelatortas',
        categoryName: 'Gelatortas y Dulces',
        badge: 'Exclusiva Adultos 🍸',
        subtitle: 'Toque de crema irlandesa con café moka y cacao selecto',
        description: 'Gourmet para paladares exigentes: notas de crema de whisky Baileys, café colombiano y chocolate.',
        image: getImg('Gelatortas/Gelatortas_desayuno/Tentacion_de_baileysgelatina_cafe_moka_chocolate_artesanal.png'),
        tags: ['baileys', 'moka', 'cafe', 'chocolate', 'gourmet']
    },
    {
        id: 'box-mini-torta-artesanal',
        name: 'Mini Torta Artesanal Especial para Box',
        category: 'gelatortas',
        categoryName: 'Gelatortas y Dulces',
        badge: 'Repostería Fina 🎂',
        subtitle: 'Pastel individual esponjoso decorado con cobertura',
        description: 'El tamaño perfecto para incluir dentro de tu caja de ancheta o desayuno sorpresa.',
        image: getImg('Gelatortas/Gelatortas_desayuno/Torta_6.png'),
        tags: ['mini torta', 'ponque', 'pastel', 'reposteria']
    },
    {
        id: 'box-gelatorta-cerveza-corona',
        name: 'Gelatorta Temática Cerveza y Limón',
        category: 'gelatortas',
        categoryName: 'Gelatortas y Dulces',
        badge: 'Celebración 🍻',
        subtitle: 'Divertido diseño cervecero con rodajas de limón',
        description: 'El regalo más original para celebrar cumpleaños de amigos, novios o papás cerveceros.',
        image: getImg('Gelatortas/Gelatortas_desayuno/Torta_gelatorta_tematica_cer_corona_con_limon.png'),
        tags: ['cerveza', 'corona', 'amigos', 'fiesta']
    },
    {
        id: 'box-gelatorta-caramelo-kiwi',
        name: 'Gelatorta Tres Leches Caramelo, Fresas y Kiwi',
        category: 'gelatortas',
        categoryName: 'Gelatortas y Dulces',
        badge: 'Frutas Frescas 🥝',
        subtitle: 'Caramelo líquido con rodajas de kiwi fresco y fresas',
        description: 'Armonía visual y de sabor con frutas frescas contrastadas y caramelo artesanal.',
        image: getImg('Gelatortas/Gelatortas_desayuno/Torta_gelatorta_tres_leches_con_caramelo_y_fresasgelatorta_mosaico_frutal_kiwi_durazno.png'),
        tags: ['kiwi', 'caramelo', 'fresas', 'tres leches']
    },
    {
        id: 'box-torta-tematica-familiar',
        name: 'Torta Temática Personalizada Familiar',
        category: 'gelatortas',
        categoryName: 'Gelatortas y Dulces',
        badge: 'Familiar 👨‍👩‍👧‍👦',
        subtitle: 'Diseño adaptable a aniversarios y reuniones especiales',
        description: 'Ponqué temático decorado con los colores y mensajes preferidos por la familia.',
        image: getImg('Gelatortas/Gelatortas_desayuno/Torta_torta_tematica_personalizada_familiar.png'),
        tags: ['torta familiar', 'aniversario', 'decorada']
    },
    {
        id: 'box-gelapaletas-futbol',
        name: 'Gelapaletas Temáticas Fútbol y Paletas Dulces',
        category: 'gelapaletas',
        categoryName: 'Gelapaletas',
        badge: 'Paleta Divertida 🍭',
        subtitle: 'Gelatina en paleta individual con motivos futboleros',
        description: 'Prácticas y deliciosas paletas de gelatina con palo de madera, perfectas para picar.',
        image: getImg('Gelatortas/Gela_paletas/Gelapaleta_1gelatorta_tematica_futbol_con_gelapaletas.png'),
        tags: ['gelapaleta', 'paleta', 'futbol', 'dulce']
    },
    {
        id: 'box-gelapaleta-unicornio',
        name: 'Gelapaleta Unicornio Mágico Infantil',
        category: 'gelapaletas',
        categoryName: 'Gelapaletas',
        badge: 'Fantasía 🦄',
        subtitle: 'Paleta de gelatina en capas arcoíris con figura mágica',
        description: 'Un detalle tierno y dulce para niñas, cumpleaños y baby showers.',
        image: getImg('Gelatortas/Gela_paletas/gelatorta_arcoiris_unicornio_con_gelapaleta.png'),
        tags: ['unicornio', 'paleta', 'niños', 'fantasia']
    },

    // ==================== PORTARRETRATOS Y RETABLOS ====================
    {
        id: 'box-caballete-foto-pareja',
        name: 'Mini Caballete de Madera con Foto Retablo Pareja',
        category: 'portarretratos',
        categoryName: 'Portarretratos y Retablos',
        badge: 'Romántico 💖',
        subtitle: 'Atril de madera natural con fotografía en miniatura',
        description: 'Elegante caballete tipo artista en madera pulida con foto sublimada de alta fidelidad, perfecto para mesa de noche.',
        image: getImg('Portarretratos y retablos/caballete_decorativo_con_fotografia_pareja.jpeg'),
        tags: ['caballete', 'madera', 'retablo', 'pareja', 'foto']
    },
    {
        id: 'box-caballete-love-forever',
        name: 'Caballete Portarretratos Madera "Love Forever"',
        category: 'portarretratos',
        categoryName: 'Portarretratos y Retablos',
        badge: 'Love Forever ❤️',
        subtitle: 'Marco de madera grabado con dedicatoria de amor eterno',
        description: 'Soporte rústico con grabado en madera y fotografía enmarcada de tus momentos más memorables.',
        image: getImg('Portarretratos y retablos/caballete_portarretratos_madera_love_forever.jpeg'),
        tags: ['love', 'caballete', 'amor', 'madera']
    },
    {
        id: 'box-retablo-mdf-soporte-madera',
        name: 'Cuadro Retablo MDF Blanco con Soporte de Madera',
        category: 'portarretratos',
        categoryName: 'Portarretratos y Retablos',
        badge: 'Moderno 🖼️',
        subtitle: 'Panel rígido blanco con pie de apoyo en madera maciza',
        description: 'Retablo moderno minimalista con foto nítida brillante y base independiente para exhibir en cualquier espacio.',
        image: getImg('Portarretratos y retablos/cuadro-portaretrato-mdf-blanco-soporte-madera-retablo.jpeg'),
        tags: ['retablo', 'mdf', 'soporte madera', 'cuadro']
    },
    {
        id: 'box-portarretrato-luz-led',
        name: 'Portarretratos Iluminado con Luz LED y Marco de Madera',
        category: 'portarretratos',
        categoryName: 'Portarretratos y Retablos',
        badge: 'Iluminado ✨',
        subtitle: 'Luz cálida interior que realza la foto en la oscuridad',
        description: 'Cuadro de madera con tira LED integrada que ilumina suavemente la imagen, funcionando como lámpara de escritorio.',
        image: getImg('Portarretratos y retablos/porrta_retrato_luz_decorativo_marco_madera_mandalas.jpeg'),
        tags: ['luz led', 'iluminado', 'lampara foto', 'madera']
    },
    {
        id: 'box-soporte-fotografico-geometrico',
        name: 'Soporte Fotográfico Madera Geométrica y Acrílico',
        category: 'portarretratos',
        categoryName: 'Portarretratos y Retablos',
        badge: 'Diseño Nórdico 📐',
        subtitle: 'Base geométrica en madera con placa fotográfica de acrílico',
        description: 'Acabado contemporáneo con base poligonal en madera natural y soporte acrílico de alta transparencia.',
        image: getImg('Portarretratos y retablos/soporte_fotografico_madera_formas_geometricas_acrilico.jpeg'),
        tags: ['geometrico', 'nordico', 'acrilico', 'madera']
    },

    // ==================== LLAVEROS PERSONALIZADOS ====================
    {
        id: 'box-llavero-destapador-metalico',
        name: 'Llavero Destapador Metálico Rectangular',
        category: 'llaveros',
        categoryName: 'Llaveros Personalizados',
        badge: 'Destapador 🍺',
        subtitle: 'Acero inoxidable resistente con foto o logo y abrebotellas',
        description: 'Llavero robusto 2 en 1: lleva tu diseño o foto favorita y funciona como destapador de botellas en cualquier ocasión.',
        image: getImg('Llaveros/llavero-destapador-cerveza-metalico-rectangular.jpeg'),
        tags: ['llavero', 'destapador', 'metalico', 'acero']
    },
    {
        id: 'box-llavero-metalico-escudo',
        name: 'Llavero Metálico con Placa Frontal Tipo Escudo',
        category: 'llaveros',
        categoryName: 'Llaveros Personalizados',
        badge: 'Elegante 🛡️',
        subtitle: 'Cuerpo cromado brillante con placa de grabado o sublimación',
        description: 'Llavero macizo en aleación de zinc cromada, perfecto para regalos corporativos, iniciales o escudos.',
        image: getImg('Llaveros/llavero-metalico-placa-frontal-escudo.jpeg'),
        tags: ['llavero metalico', 'escudo', 'cromado']
    },
    {
        id: 'box-llavero-acrilico-transparente',
        name: 'Llavero en Acrílico Transparente Personalizado',
        category: 'llaveros',
        categoryName: 'Llaveros Personalizados',
        badge: 'Doble Faz 🔑',
        subtitle: 'Acrílico cristal de alto impacto con foto por ambas caras',
        description: 'Llavero transparente ligero que protege la foto por ambos lados con anillo reforzado.',
        image: getImg('Llaveros/llavero_acrilico_transparente_personalizable_formas.jpeg'),
        tags: ['acrilico', 'transparente', 'llavero']
    },
    {
        id: 'box-llavero-mdf-formas-variadas',
        name: 'Llavero MDF en Formas Variadas (Corazón, Círculo, Placa)',
        category: 'llaveros',
        categoryName: 'Llaveros Personalizados',
        badge: 'Formas Creativas 🌟',
        subtitle: 'Madera MDF blanca con sublimación brillante a full color',
        description: 'Elige entre forma de corazón, círculo o gota. Liviano, duradero y con colores vivos.',
        image: getImg('Llaveros/llavero_mdf_blanco_sublimacion_formas_variadas.jpeg'),
        tags: ['mdf', 'corazon', 'formas', 'llavero']
    },
    {
        id: 'box-llavero-mdf-rectangular',
        name: 'Llavero MDF Rectangular Clásico Sublimado',
        category: 'llaveros',
        categoryName: 'Llaveros Personalizados',
        badge: 'Práctico 🏷️',
        subtitle: 'Formato ideal para códigos de Spotify, fechas o nombres',
        description: 'Llavero rectangular en madera prensada sublimada con esquinas redondeadas suaves.',
        image: getImg('Llaveros/llavero_mdf_rectangular_ovalado_circular_sublimacion.jpeg'),
        tags: ['rectangular', 'spotify', 'llavero mdf']
    },

    // ==================== ACCESORIOS Y COJINES ====================
    {
        id: 'box-cojin-lentejuelas-magico',
        name: 'Cojín Mágico de Lentejuelas Reversibles con Foto',
        category: 'accesorios',
        categoryName: 'Accesorios y Cojines',
        badge: 'Top Regalo 🌟',
        subtitle: 'Desliza tu mano y descubre la foto oculta tras las lentejuelas',
        description: 'Cojín interactivo con lentejuelas brillantes reversibles que revelan la imagen o texto personalizado al frotarlas.',
        image: getImg('Accesorios/cojín_lentejuelas_magico_personalizado_con_foto.jpeg'),
        tags: ['cojin', 'lentejuelas', 'magico', 'almohada', 'foto']
    },
    {
        id: 'box-mouse-pad-ergonomico',
        name: 'Mouse Pad Ergonómico con Reposamuñecas Blanco Sublimado',
        category: 'accesorios',
        categoryName: 'Accesorios y Cojines',
        badge: 'Home Office 💻',
        subtitle: 'Almohadilla de gel ergonómica con estampado de alta fidelidad',
        description: 'Mouse pad acolchado que cuida tu muñeca mientras disfrutas de tu diseño, anime o foto favorita en tu escritorio.',
        image: getImg('Accesorios/mouse_pad_ergonomico_con_reposamuñecas_blanco.jpeg'),
        tags: ['mouse pad', 'ergonomico', 'oficina', 'gamer']
    },
    {
        id: 'box-reloj-digital-led-cubo',
        name: 'Reloj Digital Cubo LED Cambia Color + Posavasos',
        category: 'accesorios',
        categoryName: 'Accesorios y Cojines',
        badge: 'Luces LED ⏰',
        subtitle: 'Alarma despertador con fotos en 4 caras y posavasos a juego',
        description: 'Reloj despertador en forma de cubo con retroiluminación LED en 7 colores suaves y paneles con tus fotos preferidas.',
        image: getImg('Accesorios/reloj_digital_cubo_led_con_posavasos_sublimados.jpeg'),
        tags: ['reloj', 'despertador', 'cubo led', 'posavasos']
    },

    // ==================== LÁMPARAS DECORATIVAS ====================
    {
        id: 'box-cupula-rosa-galactica',
        name: 'Cúpula de Cristal Rosa Galáctica Eterna con Marco Foto',
        category: 'lamparas',
        categoryName: 'Lámparas Decorativas',
        badge: 'Eterna 🌹',
        subtitle: 'Rosa holográfica brillante con microluces LED de hadas',
        description: 'Cúpula transparente de vidrio con rosa eterna tornasolada, guirnalda de micro LED cálida y espacio para fotografía.',
        image: getImg('Lamparas/cupula-cristal-rosa-galactica-marco-fotografico-rosa-eterna.jpeg'),
        tags: ['rosa eterna', 'cupula', 'luz led', 'galactica', 'romantico']
    },
    {
        id: 'box-lampara-espejo-corazon',
        name: 'Lámpara Espejo Infinito LED Corazón con Base Madera',
        category: 'lamparas',
        categoryName: 'Lámparas Decorativas',
        badge: 'Efecto Infinito 💖',
        subtitle: 'De día es un elegante espejo y de noche un túnel de luz infinito',
        description: 'Dispositivo 2 en 1: apagado luce como espejo de vanidad con forma de corazón, encendido crea una hipnotizante ilusión de luces infinitas.',
        image: getImg('Lamparas/lampara-espejo-led-forma-corazon-base-madera.jpeg'),
        tags: ['espejo', 'infinito', 'corazon', 'lampara led']
    },

    // ==================== ROMPECABEZAS ====================
    {
        id: 'box-puzzle-corazon',
        name: 'Rompecabezas Sublimado Forma Corazón Romántico',
        category: 'rompecabezas',
        categoryName: 'Rompecabezas',
        badge: 'Romántico 🧩',
        subtitle: 'Puzzle en forma de corazón con acabado brillante para parejas',
        description: 'Divertido y emotivo detalle para armar juntos. Las piezas encajan para revelar tu fotografía o dedicatoria de aniversario.',
        image: getImg('Rompecabezas/rompecabezas_sublimacion_forma_corazon.jpeg'),
        tags: ['rompecabezas', 'puzzle', 'corazon', 'pareja']
    },
    {
        id: 'box-puzzle-rectangular',
        name: 'Rompecabezas Sublimado Rectangular Personalizado',
        category: 'rompecabezas',
        categoryName: 'Rompecabezas',
        badge: 'Clásico 🧩',
        subtitle: 'Piezas resistentes de cartón prensado con brillo fotográfico',
        description: 'Rompecabezas personalizado con cualquier imagen, cartel de película, anime, mascota o foto familiar.',
        image: getImg('Rompecabezas/rompecabezas_sublimacion_rectangular_blanco.jpeg'),
        tags: ['puzzle rectangular', 'rompecabezas', 'familiar']
    },

    // ==================== TERMOS Y CARAMAÑOLAS ====================
    {
        id: 'box-botella-aluminio-infantil',
        name: 'Botella Infantil de Aluminio con Tapa Silicona Animalitos',
        category: 'termos_caramanolas',
        categoryName: 'Termos y Caramañolas',
        badge: 'Infantil 🐰',
        subtitle: 'Caramañola liviana con boquilla antiderrame y diseño tierno',
        description: 'Botella de agua en aluminio ligera y segura para el colegio y salidas, con tapa ergonómica de animalitos tiernos.',
        image: getImg('Termos_caramañolas/botella-aluminio-infantil-tapa-silicona-animales-termo-caramañola.jpeg'),
        tags: ['botella', 'infantil', 'aluminio', 'caramañola', 'niños']
    },
    {
        id: 'box-botella-termica-deportiva',
        name: 'Botella Térmica Deportiva Acero Inoxidable Blanca',
        category: 'termos_caramanolas',
        categoryName: 'Termos y Caramañolas',
        badge: 'Acero Inox ❄️🔥',
        subtitle: 'Doble pared térmica que conserva temperatura fría o caliente',
        description: 'Termo deportivo blanco de alto rendimiento en acero inoxidable, personalizable con nombres, monogramas o logos.',
        image: getImg('Termos_caramañolas/botella-termica-deportiva-acero-inoxidable-blanca.jpeg'),
        tags: ['botella termica', 'acero', 'deportiva', 'termo']
    },

    // ==================== IMPRESIONES 3D ====================
    {
        id: 'box-figura-personalizada-3d',
        name: 'Figura Coleccionable Personalizada Impresión 3D',
        category: 'impresiones_3d',
        categoryName: 'Impresiones 3D',
        badge: 'Esculpido 3D 👾',
        subtitle: 'Piezas personalizadas, figuras geek y personajes coleccionables',
        description: 'Impresión tridimensional de alta precisión en filamento o resina, ideal para personajes favoritos y detalles exclusivos.',
        image: getImg('Impresiones_3d/Gemini_Generated_Image_by7hipby7hipby7h.jpeg'),
        tags: ['figura 3d', 'impresion 3d', 'geek', 'coleccionable']
    },
    {
        id: 'box-llaveros-articulados-3d',
        name: 'Llaveros y Figuras Articuladas en Impresión 3D',
        category: 'impresiones_3d',
        categoryName: 'Impresiones 3D',
        badge: 'Articulados ⚙️',
        subtitle: 'Modelos mecánicos móviles, logotipos tridimensionales y tags',
        description: 'Llaveros interactivos impresos en 3D con movimiento flexible o relieve personalizado con el nombre que desees.',
        image: getImg('Impresiones_3d/llaveros_impresion_3d.jpeg'),
        tags: ['llaveros 3d', 'articulado', 'impresion 3d']
    }
];
