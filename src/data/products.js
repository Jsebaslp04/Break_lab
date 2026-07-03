import imgFigura3d from '../assets/Swiper/impresion-3d-personajes-videojuegos.png.png';
import imgRompecabezasLuffy from '../assets/Swiper/rompecabezas-magnetico-one-piece-luffy.png.png';
import imgVasoMascotas from '../assets/Swiper/vaso-frost-personalizado-mascotas.png.png';
import imgGengarBox from '../assets/Swiper/desayuno-sorpresa-tematico-pokemon-gengar-breaklab.png.png';
import breakLabLogo from '../assets/break_lab_logo.png';

export { breakLabLogo };

export const PRODUCTS_DB = {
    'san-valentin': [
        { 
            id: 'san-valentin-premium', 
            name: 'Box San Valentín Premium', 
            subtitle: 'El amor se celebra con detalles',
            description: 'Un desayuno sorpresa premium decorado con amor. Incluye peluche temático, taza personalizada, jugo natural, sándwich gourmet y globos decorativos 💕', 
            price: 85000, 
            isNew: true, 
            image: imgGengarBox, 
            images: [imgGengarBox, breakLabLogo] 
        },
        { 
            id: 'san-valentin-dulce', 
            name: 'Box Dulce San Valentín', 
            subtitle: 'Endulza su día especial 🍫',
            description: 'La combinación perfecta de fresas con chocolate, golosinas importadas y un mensaje personalizado en una caja de madera decorativa.', 
            price: 65000, 
            isNew: false, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        }
    ],
    'kit-escolar': [
        { 
            id: 'kit-escolar-sorpresa', 
            name: 'Box Kit Escolar', 
            subtitle: '¡A aprender con alegría!',
            description: '¡Regresa a clases con toda la energía! Caja decorada que incluye cartuchera personalizada, termo para agua, set de colores y snacks deliciosos.', 
            price: 38000, 
            isNew: true, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        },
        { 
            id: 'kit-escolar-basico', 
            name: 'Kit Escolar Básico', 
            subtitle: 'Listos para el regreso a clases 📚',
            description: 'Práctico y funcional. Libreta de notas con diseño a elegir, bolígrafo temático y galletas artesanales para acompañar la jornada escolar.', 
            price: 25000, 
            isNew: false, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        }
    ],
    'reyes': [
        { 
            id: 'reyes-magos-box', 
            name: 'Box Día de Reyes', 
            subtitle: '¡Que la magia te acompañe!',
            description: 'Celebra la magia de los Reyes con este box gourmet. Rosca de reyes individual, chocolate caliente artesanal y figuritas de reyes en resina coleccionables.', 
            price: 45000, 
            isNew: true, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        },
        { 
            id: 'reyes-magos-dulce', 
            name: 'Caja Regalo Carbón Dulce', 
            subtitle: 'Momentos mágicos de Reyes ✨',
            description: 'Caja temática con "carbón dulce" comestible, chocolates finos y una carta personalizada de los Reyes Magos para divertir y consentir.', 
            price: 38000, 
            isNew: false, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        }
    ],
    'dia-mujer': [
        { 
            id: 'dia-mujer-premium', 
            name: 'Box Día de la Mujer Flores & Café', 
            subtitle: 'Flores, aromas y dulzura 🌹',
            description: 'Consiente a esa mujer especial. Hermosa cúpula con rosa eterna, taza personalizada de cerámica, café premium colombiano y galletas gourmet.', 
            price: 90000, 
            isNew: true, 
            image: breakLabLogo, 
            images: [breakLabLogo, imgVasoMascotas] 
        },
        { 
            id: 'dia-mujer-spa', 
            name: 'Box Día de la Mujer Relajación Spa', 
            subtitle: 'Un momento de relajación único 💆‍♀️',
            description: 'Caja de madera con sales de baño, vela aromática de cera de soja, jabón artesanal de avena y miel, y un amigurumi decorativo en forma de flor.', 
            price: 72000, 
            isNew: false, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        }
    ],
    'dia-hombre': [
        { 
            id: 'dia-hombre-cervecero', 
            name: 'Box Día del Hombre Cervecero', 
            subtitle: 'Brindemos por los buenos tiempos 🍺',
            description: 'Caja rústica con cervezas artesanales premium, mix de frutos secos salados, vaso cervecero grabado y un llavero en resina personalizado con sus iniciales.', 
            price: 78000, 
            isNew: true, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        },
        { 
            id: 'dia-hombre-ejecutivo', 
            name: 'Box Día del Hombre Elegante', 
            subtitle: 'Estilo y sabor en su escritorio 💼',
            description: 'Ideal para la oficina. Mug térmico de acero inoxidable personalizado, libreta ejecutiva de cuero sintético y chocolates gourmet.', 
            price: 65000, 
            isNew: false, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        }
    ],
    'semana-santa': [
        { 
            id: 'semana-santa-pascua', 
            name: 'Box de Pascua Familiar', 
            subtitle: 'Celebración de pascua en familia 🐣',
            description: 'Caja de pascua decorada con conejo tejido a mano, huevos de chocolate rellenos y set de decoración para que los niños pinten en casa.', 
            price: 49000, 
            isNew: true, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        },
        { 
            id: 'semana-santa-espiritual', 
            name: 'Box Meditación & Paz', 
            subtitle: 'Momentos de paz y reflexión 🕊️',
            description: 'Detalle sobrio y elegante. Vela aromática con aroma a sándalo, libreta de agradecimiento hecha a mano y llavero de resina con cruz encapsulada.', 
            price: 36000, 
            isNew: false, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        }
    ],
    'dia-nino': [
        { 
            id: 'dia-nino-gamer', 
            name: 'Box Día del Niño Gamer', 
            subtitle: '¡Para los pequeños campeones! 🎮',
            description: '¡Diversión garantizada! Taza con diseño de consola retro, chocolates con forma de control, snacks surtidos y una figura 3D pintada a mano.', 
            price: 62000, 
            isNew: true, 
            image: imgGengarBox, 
            images: [imgGengarBox, breakLabLogo] 
        },
        { 
            id: 'dia-nino-amigurumi', 
            name: 'Box Día del Niño Juguetón', 
            subtitle: 'Ternura tejida con amor 🧸',
            description: 'Incluye un tierno oso de peluche tejido a mano (amigurumi), vaso frost con pitillo personalizado con su nombre y dulces variados.', 
            price: 54000, 
            isNew: false, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        }
    ],
    'dia-madre': [
        { 
            id: 'dia-madre-rosa-gourmet', 
            name: 'Box Día de la Madre Desayuno de la Reina', 
            subtitle: 'El desayuno de la reina de casa 👑',
            description: 'Haz que empiece su día con una sonrisa. Waffles con fresas y chocolate, jugo de naranja en botella decorada, taza premium y un ramo de flores tejidas.', 
            price: 95000, 
            isNew: true, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        },
        { 
            id: 'dia-madre-joyas-flores', 
            name: 'Box Día de la Madre Amor Eterno', 
            subtitle: 'Un detalle eterno para mamá 💖',
            description: 'Elegante regalo con cúpula de rosa preservada, pulsera Miyuki tejida a mano con diseño de corazón y chocolates finos.', 
            price: 88000, 
            isNew: false, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        }
    ],
    'dia-padre': [
        { 
            id: 'dia-padre-asador', 
            name: 'Box Día del Padre Parrillero', 
            subtitle: 'Para el mejor asador del mundo 🍖',
            description: 'Para los papás amantes de la cocina. Delantal de cuero personalizado con su nombre, salsa barbacoa artesanal, cerveza y snacks.', 
            price: 89000, 
            isNew: true, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        },
        { 
            id: 'dia-padre-cafetero', 
            name: 'Box Día del Padre Espresso', 
            subtitle: 'Café del bueno para el mejor papá ☕',
            description: 'Incluye prensa francesa pequeña, mug de cerámica de alta calidad personalizado y bolsa de café artesanal molido de origen.', 
            price: 75000, 
            isNew: false, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        }
    ],
    'mugs-personalizados': [
        { 
            id: 'mug-magico', 
            name: 'Mug Mágico Personalizado', 
            subtitle: 'Sorpresa de color al instante 🔮',
            description: 'Taza de cerámica negra que revela el diseño personalizado al verter líquidos calientes. Ideal para fotos familiares, de mascotas o textos ocultos.', 
            price: 25000, 
            isNew: true, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        },
        { 
            id: 'mug-blanco', 
            name: 'Mug Blanco Clásico', 
            subtitle: 'Diseños nítidos y duraderos 🎨',
            description: 'Taza de cerámica blanca premium brillante. Estampado de alta durabilidad apto para microondas y lavavajillas con tu diseño preferido.', 
            price: 15000, 
            isNew: false, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        }
    ],
    'arte-resina': [
        { 
            id: 'llavero-resina-letra', 
            name: 'Llavero de Inicial Personalizado', 
            subtitle: 'Iniciales con estilo encapsuladas 🌸',
            description: 'Llavero de inicial de resina epóxica hecha a mano con flores prensadas, hojilla de oro o purpurina según tu preferencia. Incluye borla decorativa.', 
            price: 12000, 
            isNew: false, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        },
        { 
            id: 'portavasos-resina', 
            name: 'Set de Portavasos Resina Epoxi', 
            subtitle: 'Arte epoxi para tu mesa 🥂',
            description: 'Set de 4 portavasos circulares hechos a mano con resina epoxi de alta resistencia. Diseños personalizados imitando geodas o marmolado.', 
            price: 35000, 
            isNew: true, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        }
    ],
    'miyuki': [
        { 
            id: 'pulsera-miyuki', 
            name: 'Pulsera Miyuki Tejida a Mano', 
            subtitle: 'Elegancia tejida a mano ✨',
            description: 'Pulsera fina tejida a mano con mostacillas japonesas Delica Miyuki de alta calidad, creando patrones geométricos elegantes y ajustables.', 
            price: 28000, 
            isNew: true, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        },
        { 
            id: 'collar-miyuki', 
            name: 'Collar Gargantilla Miyuki', 
            subtitle: 'Detalle sutil y moderno 💎',
            description: 'Delicado collar con dije central tejido en Miyuki en forma de corazón, estrella o inicial, montado en cadena de acero inoxidable hipoalergénico.', 
            price: 42000, 
            isNew: false, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        }
    ],
    'globo-mensaje': [
        { 
            id: 'globo-burbuja', 
            name: 'Globo Burbuja con Mensaje', 
            subtitle: 'Mensajes gigantes en el aire 🎈',
            description: 'Globo gigante transparente relleno de confeti metálico o plumas de colores, con mensaje personalizado en vinilo adhesivo y base de soporte.', 
            price: 30000, 
            isNew: false, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        },
        { 
            id: 'globo-metalizado-personalizado', 
            name: 'Ramo de Globos Metalizados', 
            subtitle: 'Bouquets festivos inflados con helio 🎉',
            description: 'Bouquet de globos con forma de estrella, corazón o números gigantes para cumpleaños, inflados con helio y rotulados con nombres.', 
            price: 45000, 
            isNew: true, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        }
    ],
    'vino': [
        { 
            id: 'vino-personalizado', 
            name: 'Vino Botella Grabada', 
            subtitle: 'Copas y dedicatorias grabadas 🍷',
            description: 'Botella de vino tinto Gato Negro personalizada con grabado láser en el vidrio con el mensaje o dedicatoria que prefieras.', 
            price: 45000, 
            isNew: true, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        },
        { 
            id: 'vino-caja-madera', 
            name: 'Estuche de Vino Gourmet', 
            subtitle: 'Estuches finos de madera 🍾',
            description: 'Botella de vino tinto grabada, presentada en una caja de madera personalizada con tapa deslizable y copas de cristal grabadas.', 
            price: 95000, 
            isNew: false, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        }
    ],
    'figuras-3d': [
        { 
            id: 'figura-3d-personalizada', 
            name: 'Figura Impresión 3D Pintada a Mano', 
            subtitle: 'Tus personajes favoritos en tus manos 👾',
            description: 'Modelado, impresión 3D en resina o PLA de alta definición y pintura artesanal a mano. Personajes de videojuegos, anime o retratos estilizados.', 
            price: 60000, 
            isNew: true, 
            image: imgFigura3d, 
            images: [imgFigura3d, breakLabLogo] 
        },
        { 
            id: 'soporte-celular-3d', 
            name: 'Soporte de Celular 3D Temático', 
            subtitle: 'Soportes geek y divertidos 📱',
            description: 'Práctico soporte para escritorio impreso en 3D con formas divertidas (astronautas, mandos de videojuegos, personajes populares).', 
            price: 24000, 
            isNew: false, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        }
    ],
    'amigurumis': [
        { 
            id: 'amigurumi-mascota', 
            name: 'Amigurumi de Mascota Personalizado', 
            subtitle: 'Tus peluditos replicados a mano 🐾',
            description: 'Mascota tejida a crochet a mano a partir de fotos de tu perrito o gatito. Hilos de algodón hipoalergénicos y acabados de gran fidelidad.', 
            price: 40000, 
            isNew: true, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        },
        { 
            id: 'amigurumi-llavero', 
            name: 'Llaveros Amigurumi Mini', 
            subtitle: 'Tiernos compañeros de viaje 👜',
            description: 'Pequeños animalitos, plantas u objetos geek tejidos a crochet para llevar en tus llaves o maleta. Rellenos con algodón siliconado.', 
            price: 15000, 
            isNew: false, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        }
    ],
    'su-flor-especial': [
        { 
            id: 'flor-eterna', 
            name: 'Cúpula de Rosa Eterna Preservada', 
            subtitle: 'Rosas eternas preservadas con luz LED 🌟',
            description: 'Rosa natural tratada técnicamente para durar años sin mantenimiento. Presentada en cúpula de vidrio de alta transparencia con luces LED cálidas.', 
            price: 75000, 
            isNew: true, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        },
        { 
            id: 'ramo-flores-tejido', 
            name: 'Ramo de Flores Tejido a Crochet', 
            subtitle: 'Flores tejidas que nunca se marchitan 🌸',
            description: 'Ramo de tulipanes, margaritas y rosas tejidas a crochet a mano. Un detalle floral que nunca se marchita y decora cualquier rincón.', 
            price: 68000, 
            isNew: false, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        }
    ],
    'rompecabezas': [
        { 
            id: 'rompecabezas-magnetico-one-piece-luffy', 
            name: 'Rompecabezas Magnético One Piece Luffy', 
            subtitle: 'Luffy Gear 5 en tu nevera ⚓',
            description: 'Rompecabezas imantado con diseño de Luffy en Wano. Ideal para decorar la nevera o pizarras magnéticas, fabricado en materiales resistentes de alta definición.', 
            price: 28000, 
            isNew: true, 
            image: imgRompecabezasLuffy, 
            images: [imgRompecabezasLuffy, breakLabLogo, imgGengarBox] 
        },
        { 
            id: 'rompecabezas-madera-personalizado', 
            name: 'Rompecabezas de Madera Personalizado', 
            subtitle: 'Tus mejores recuerdos en 120 piezas 🧩',
            description: 'Envíanos tu foto familiar o retrato favorito y crearemos un rompecabezas duradero de madera MDF de 120 piezas con corte de precisión.', 
            price: 35000, 
            isNew: false, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        }
    ],
    'vasos-personalizados': [
        { 
            id: 'vaso-frost-personalizado-mascotas', 
            name: 'Vaso Frost Personalizado Mascotas', 
            subtitle: 'Tu fiel amigo en tu bebida 🐶',
            description: 'Vaso de vidrio esmerilado con la ilustración de tu mascota a todo color. Incluye tapa de madera de bambú ecológica y pitillo transparente.', 
            price: 32000, 
            isNew: true, 
            image: imgVasoMascotas, 
            images: [imgVasoMascotas, breakLabLogo] 
        },
        { 
            id: 'vaso-frost-frase-personalizada', 
            name: 'Vaso Frost con Frase Especial', 
            subtitle: 'Tus bebidas con frases motivacionales 🥤',
            description: 'Vaso opalizado templado personalizado con frases motivacionales o nombres. Incluye pitillo y tapa de silicona antiderrame.', 
            price: 24000, 
            isNew: false, 
            image: breakLabLogo, 
            images: [breakLabLogo] 
        }
    ]
};

// Helper to determine what the product includes based on its name/category
export const getIncludedItems = (product) => {
    const name = product.name.toLowerCase();
    if (name.includes('box') || name.includes('kit') || name.includes('desayuno') || name.includes('estuche')) {
        return [
            'Caja de regalo decorada premium con cinta y moño.',
            'Tarjeta de dedicatoria personalizada con tu mensaje.',
            'Detalles y sorpresas temáticas según la ocasión.',
            'Globo metalizado y empaque especial BreakLab.'
        ];
    } else if (name.includes('mug') || name.includes('vaso') || name.includes('taza')) {
        return [
            'Taza/Vaso de alta calidad premium.',
            'Estampado full color de alta durabilidad y nitidez.',
            'Diseño 100% personalizado a tu gusto.',
            'Apto para microondas y lavavajillas (Mugs).'
        ];
    } else if (name.includes('pulsera') || name.includes('collar') || name.includes('miyuki') || name.includes('llavero') || name.includes('portavasos')) {
        return [
            'Elaborado a mano con técnicas de alta costura artesanal.',
            'Materiales resistentes de excelente calidad.',
            'Personalización especial incluida.',
            'Empaque listo para regalar.'
        ];
    } else if (name.includes('globo')) {
        return [
            'Globo gigante de látex o burbuja premium.',
            'Marcado personalizado en vinilo de alta definición.',
            'Cintas, confeti interno y base decorativa.',
            'Inflado con aire de larga duración o helio certificado.'
        ];
    } else if (name.includes('figura') || name.includes('soporte') || name.includes('3d')) {
        return [
            'Impresión de alta resolución y fidelidad de detalle.',
            'Pintura y acabados 100% artesanales a mano.',
            'Material eco-amigable de alta resistencia.',
            'Diseño coleccionable único.'
        ];
    } else if (name.includes('amigurumi')) {
        return [
            'Tejido a mano a crochet con hilos hipoalergénicos.',
            'Relleno siliconado suave y de gran durabilidad.',
            'Detalles de alta fidelidad personalizados.',
            'Llavero o colgador opcional incluido.'
        ];
    } else if (name.includes('flor') || name.includes('rosa')) {
        return [
            'Flor preservada/eterna natural o tejida a mano.',
            'Cúpula de vidrio de alta claridad con base de madera.',
            'Instalación de luces LED micro (cálidas).',
            'Tarjeta de regalo personalizada.'
        ];
    } else if (name.includes('vino')) {
        return [
            'Botella de vino seleccionada con grabado directo en vidrio.',
            'Grabado de alta precisión inalterable en el tiempo.',
            'Copas o accesorios adicionales personalizados.',
            'Presentación en estuche de madera de lujo.'
        ];
    } else {
        return [
            'Diseño exclusivo 100% personalizado.',
            'Materiales seleccionados de primera calidad.',
            'Empaque especial decorativo.',
            'Garantía de satisfacción BreakLab.'
        ];
    }
};

// Helper to determine product configuration options based on name/category
export const getProductOptions = (product) => {
    const name = product.name.toLowerCase();
    
    if (name.includes('mug') || name.includes('vaso') || name.includes('taza')) {
        return [
            {
                name: 'color',
                label: 'Colores disponibles:',
                choices: ['Blanco', 'Negro', 'Rosa', 'Azul', 'Amarillo'],
                default: 'Blanco'
            },
            {
                name: 'size',
                label: 'Tamaños disponibles:',
                choices: ['8oz', '12oz', '18oz'],
                default: '12oz'
            }
        ];
    } else if (name.includes('box') || name.includes('kit') || name.includes('desayuno') || name.includes('estuche')) {
        return [
            {
                name: 'boxColor',
                label: 'Colores de caja:',
                choices: ['Kraft', 'Blanco', 'Rosa', 'Celeste'],
                default: 'Kraft'
            },
            {
                name: 'theme',
                label: 'Temática del regalo:',
                choices: ['Cumpleaños', 'Amor', 'Aniversario', 'Graduación'],
                default: 'Cumpleaños'
            }
        ];
    } else if (name.includes('pulsera') || name.includes('collar') || name.includes('miyuki') || name.includes('llavero') || name.includes('portavasos')) {
        return [
            {
                name: 'color',
                label: 'Tonos disponibles:',
                choices: ['Dorado', 'Plateado', 'Rosa Pastel', 'Turquesa'],
                default: 'Dorado'
            },
            {
                name: 'design',
                label: 'Diseños disponibles:',
                choices: ['Inicial', 'Corazón', 'Estrella'],
                default: 'Inicial'
            }
        ];
    } else if (name.includes('globo')) {
        return [
            {
                name: 'balloonColor',
                label: 'Colores de globo:',
                choices: ['Dorado', 'Plateado', 'Rosa Gold', 'Azul Rey'],
                default: 'Dorado'
            },
            {
                name: 'fontStyle',
                label: 'Estilo de mensaje:',
                choices: ['Elegante', 'Moderno', 'Cursiva'],
                default: 'Elegante'
            }
        ];
    } else if (name.includes('figura') || name.includes('soporte') || name.includes('3d')) {
        return [
            {
                name: 'finish',
                label: 'Tipo de acabado:',
                choices: ['Pintado a mano', 'Base natural'],
                default: 'Pintado a mano'
            },
            {
                name: 'size',
                label: 'Tamaños disponibles:',
                choices: ['Pequeño (10cm)', 'Mediano (15cm)', 'Grande (20cm)'],
                default: 'Mediano (15cm)'
            }
        ];
    } else if (name.includes('amigurumi')) {
        return [
            {
                name: 'color',
                label: 'Colores principales:',
                choices: ['Beige', 'Rosa', 'Gris', 'Café'],
                default: 'Beige'
            },
            {
                name: 'extra',
                label: 'Detalles extra:',
                choices: ['Con llavero', 'Con moño', 'Clásico'],
                default: 'Clásico'
            }
        ];
    } else if (name.includes('flor') || name.includes('rosa')) {
        return [
            {
                name: 'flowerColor',
                label: 'Color de flores:',
                choices: ['Roja', 'Rosa', 'Amarilla', 'Azul'],
                default: 'Roja'
            },
            {
                name: 'additionals',
                label: 'Adicionales:',
                choices: ['Con luces LED', 'Con tarjeta premium', 'Ninguno'],
                default: 'Ninguno'
            }
        ];
    } else if (name.includes('vino')) {
        return [
            {
                name: 'engraving',
                label: 'Tipo de grabado:',
                choices: ['Iniciales', 'Fecha especial', 'Frase corta'],
                default: 'Iniciales'
            },
            {
                name: 'woodenBox',
                label: 'Caja de madera:',
                choices: ['Sí (incluida)', 'No (estuche estándar)'],
                default: 'Sí (incluida)'
            }
        ];
    } else if (name.includes('rompecabezas')) {
        return [
            {
                name: 'material',
                label: 'Material disponible:',
                choices: ['MDF Madera', 'Imantado Nevera'],
                default: 'MDF Madera'
            },
            {
                name: 'pieces',
                label: 'Piezas:',
                choices: ['48 piezas', '120 piezas'],
                default: '120 piezas'
            }
        ];
    } else {
        return [
            {
                name: 'color',
                label: 'Colores disponibles:',
                choices: ['Blanco', 'Negro', 'Rosa', 'Azul'],
                default: 'Blanco'
            }
        ];
    }
};

export const getCategoryProducts = (categoryId) => {
    const products = PRODUCTS_DB[categoryId] || [
        { 
            id: `${categoryId}-special`, 
            name: `Box/Producto de ${categoryId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`, 
            subtitle: 'Detalle único y especial',
            description: 'Un detalle único y personalizado', 
            price: 45000, 
            isNew: true,
            image: breakLabLogo,
            images: [breakLabLogo]
        }
    ];
    return products.map(p => {
        const mainImg = p.image || breakLabLogo;
        let pImages = p.images && p.images.length > 0 ? [...p.images] : [mainImg];
        if (pImages.length === 1) {
            const fallback = mainImg === breakLabLogo ? imgGengarBox : breakLabLogo;
            pImages.push(fallback);
        }
        return { 
            ...p, 
            image: mainImg,
            images: pImages,
            subtitle: p.subtitle || 'Detalle único y especial'
        };
    });
};

export const getProductById = (productId) => {
    for (const category in PRODUCTS_DB) {
        const product = PRODUCTS_DB[category].find(p => p.id === productId);
        if (product) {
            const mainImg = product.image || breakLabLogo;
            let pImages = product.images && product.images.length > 0 ? [...product.images] : [mainImg];
            if (pImages.length === 1) {
                const fallback = mainImg === breakLabLogo ? imgGengarBox : breakLabLogo;
                pImages.push(fallback);
            }
            return { 
                ...product, 
                image: mainImg,
                images: pImages,
                subtitle: product.subtitle || 'Detalle único y especial'
            };
        }
    }
    // Fallback if dynamically generated
    return {
        id: productId,
        name: productId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        subtitle: 'Detalle único y especial',
        description: 'Personalizado y creado con amor',
        price: 45000,
        isNew: false,
        image: breakLabLogo,
        images: [breakLabLogo, imgGengarBox]
    };
};
