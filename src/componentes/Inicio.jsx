import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Inicio.module.css'
import { useSEO } from '../hooks/useSEO'
import { getProductById } from '../data/products'
import img1 from '../assets/Swiper/impresion-3d-personajes-videojuegos.png.png'
import img2 from '../assets/Swiper/rompecabezas-magnetico-one-piece-luffy.png.png'
import img3 from '../assets/Swiper/vaso-frost-personalizado-mascotas.png.png'
import img4 from '../assets/Swiper/desayuno-sorpresa-tematico-pokemon-gengar-breaklab.png.png'

export function Banner() {
    const slides = [
        {
            image: img1,
            title: "Figuras 3D Personalizadas",
            description: "Damos vida a tus personajes de anime y videojuegos favoritos con impresión 3D.",
            link: "/categoria/figuras-3d",
            btnText: "Explorar Figuras 3D 👾",
            alt: "Modelado e impresión 3D de personajes y figuras personalizadas en Bogotá"
        },
        {
            image: img2,
            title: "Rompecabezas a tu Medida",
            description: "Inmortaliza tus mejores fotos y series en rompecabezas magnéticos y tradicionales totalmente personalizados.",
            link: "/categoria/rompecabezas",
            btnText: "Ver Rompecabezas 🧩",
            alt: "Rompecabezas magnético personalizado de One Piece Luffy y fotos de regalo"
        },
        {
            image: img3,
            title: "Vasos Frost y Mugs",
            description: "Lleva tu bebida favorita con estilo en vasos opalizados y pocillos personalizados con la ilustración de tu mascota.",
            link: "/categoria/vasos-personalizados",
            btnText: "Personalizar Mi Vaso ☕",
            alt: "Vaso frost y mug térmico personalizado con ilustración de mascotas"
        },
        {
            image: img4,
            title: "Desayunos Sorpresa Temáticos",
            description: "Sorprende con desayunos y boxes de tus personajes favoritos, como este espectacular Box de Pokémon Gengar.",
            link: "/Crea_tu_Box",
            btnText: "Ver Desayunos Sorpresa 🥞",
            alt: "Desayuno sorpresa temático de Pokémon Gengar personalizado en Bogotá"
        }
    ];

    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isPaused || isHovered) return;

        const timer = setInterval(() => {
            setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(timer);
    }, [slides.length, isPaused, isHovered]);

    const prevSlide = () => {
        setCurrent(prev => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <div
            className={styles.swiper_container}
            role="region"
            aria-label="Carrusel de productos destacados"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button className={`${styles.swiper_arrow} ${styles.arrow_left}`} onClick={prevSlide} aria-label="Diapositiva anterior">
                ❮
            </button>
            <button className={`${styles.swiper_arrow} ${styles.arrow_right}`} onClick={nextSlide} aria-label="Siguiente diapositiva">
                ❯
            </button>

            {slides.map((slide, idx) => (
                <div
                    key={idx}
                    className={`${styles.swiper_slide} ${idx === current ? styles.slide_active : ''}`}
                    style={{ transform: `translateX(${(idx - current) * 100}%)` }}
                >
                    <Link to={slide.link} className={styles.swiper_image_link}>
                        <img src={slide.image} alt={slide.alt} className={styles.swiper_image} loading={idx === 0 ? "eager" : "lazy"} />
                    </Link>
                    <div className={styles.swiper_overlay}>
                        <div className={styles.swiper_content}>
                            <h2 className={styles.swiper_title}>{slide.title}</h2>
                            <p className={styles.swiper_desc}>{slide.description}</p>
                            <Link to={slide.link} className={styles.swiper_btn}>
                                {slide.btnText}
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            <div className={styles.swiper_bullets}>
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        className={`${styles.swiper_bullet} ${idx === current ? styles.bullet_active : ''}`}
                        onClick={() => setCurrent(idx)}
                        aria-label={`Ir a la diapositiva ${idx + 1}`}
                        aria-current={idx === current ? "true" : "false"}
                    />
                ))}
                <button
                    className={styles.swiper_play_pause}
                    onClick={() => setIsPaused(!isPaused)}
                    aria-label={isPaused ? "Reanudar reproducción automática" : "Pausar reproducción automática"}
                >
                    {isPaused ? "▶" : "⏸"}
                </button>
            </div>
        </div>
    );
}

export function Inicio() {
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "BreakLab",
        "image": window.location.origin + "/break_lab_logo.png",
        "@id": window.location.origin + "/#localbusiness",
        "url": window.location.origin,
        "telephone": "+573208738961",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Bogotá, Colombia",
            "addressLocality": "Bogotá",
            "addressRegion": "Bogotá D.C.",
            "addressCountry": "CO"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 4.7110,
            "longitude": -74.0721
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "06:00",
            "closes": "20:00"
        },
        "sameAs": [
            "https://wa.me/573208738961"
        ]
    };

    useSEO({
        title: "Desayunos Sorpresa y Regalos Personalizados en Bogotá | BreakLab",
        description: "Sorprende con amor en BreakLab. Ofrecemos los mejores desayunos sorpresa, cajas de regalos personalizadas, amigurumis, mugs y detalles únicos en Bogotá con entrega a domicilio.",
        keywords: "desayunos sorpresa bogota, regalos personalizados bogota, cajas de regalo, breaklab regalos, desayunos a domicilio bogota",
        schema: localBusinessSchema
    });

    const [finderRecipient, setFinderRecipient] = useState(null);
    const [finderVibe, setFinderVibe] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [searchStepText, setSearchStepText] = useState("");
    const [finderResult, setFinderResult] = useState(null);

    const handleFindGift = () => {
        if (!finderRecipient || !finderVibe) return;

        setIsSearching(true);
        const currentResultId = finderResult?.id;
        setFinderResult(null);

        const steps = [
            "Buscando en nuestro catálogo de sorpresas... 🔍",
            "Midiendo los niveles de dulzura y originalidad... 📏",
            "Añadiendo una pizca de magia BreakLab... ✨",
            "¡Envoltura virtual completada! 🎁"
        ];

        let stepIdx = 0;
        setSearchStepText(steps[0]);

        const interval = setInterval(() => {
            stepIdx++;
            if (stepIdx < steps.length) {
                setSearchStepText(steps[stepIdx]);
            } else {
                clearInterval(interval);

                const mapping = {
                    'pareja_gamer': [
                        'san-valentin-premium', 
                        'rompecabezas-magnetico-one-piece-luffy', 
                        'dia-nino-gamer',
                        'box-tematica-one-piece',
                        'rompecabezas-one-piece',
                        'mug-tematico-anime-gamer',
                        'llavero-luffy-redondo'
                    ],
                    'pareja_gourmet': [
                        'san-valentin-dulce', 
                        'vino-caja-madera', 
                        'vino-personalizado',
                        'gelatorta-huella-perro'
                    ],
                    'pareja_amigurumi': ['amigurumi-mascota', 'amigurumi-llavero', 'dia-nino-amigurumi'],
                    'pareja_eterno': [
                        'flor-eterna', 
                        'pulsera-miyuki', 
                        'collar-miyuki',
                        'rompecabezas-carton-personalizado',
                        'mug-blanco'
                    ],

                    'mama_gamer': [
                        'mug-magico', 
                        'rompecabezas-madera-personalizado', 
                        'figura-3d-personalizada',
                        'rompecabezas-sailor-moon',
                        'reloj-despertador-cubo'
                    ],
                    'mama_gourmet': ['dia-madre-rosa-gourmet', 'dia-mujer-premium', 'dia-mujer-spa'],
                    'mama_amigurumi': ['ramo-flores-tejido', 'amigurumi-mascota', 'amigurumi-llavero'],
                    'mama_eterno': [
                        'dia-madre-joyas-flores', 
                        'flor-eterna', 
                        'portavasos-resina',
                        'rompecabezas-carton-personalizado'
                    ],

                    'papa_gamer': [
                        'soporte-celular-3d', 
                        'rompecabezas-magnetico-one-piece-luffy', 
                        'dia-nino-gamer',
                        'mouse-pad-gamer-wow',
                        'rompecabezas-dragon-ball',
                        'mug-neon',
                        'llavero-one-piece-destapador'
                    ],
                    'papa_gourmet': ['dia-padre-asador', 'dia-hombre-cervecero', 'dia-hombre-ejecutivo'],
                    'papa_amigurumi': ['dia-padre-cafetero', 'amigurumi-mascota', 'amigurumi-llavero'],
                    'papa_eterno': ['vino-caja-madera', 'vino-personalizado', 'llavero-resina-letra'],

                    'nino_gamer': [
                        'dia-nino-gamer', 
                        'soporte-celular-3d', 
                        'rompecabezas-magnetico-one-piece-luffy',
                        'rompecabezas-pokemon',
                        'rompecabezas-super-mario',
                        'llavero-pikachu-rectangular',
                        'llavero-mario-luigi'
                    ],
                    'nino_gourmet': [
                        'kit-escolar-sorpresa', 
                        'kit-escolar-basico', 
                        'dia-nino-amigurumi'
                    ],
                    'nino_amigurumi': ['dia-nino-amigurumi', 'amigurumi-llavero', 'amigurumi-mascota'],
                    'nino_eterno': ['figura-3d-personalizada', 'globo-burbuja', 'globo-metalizado-personalizado'],

                    'amigo_gamer': [
                        'rompecabezas-magnetico-one-piece-luffy', 
                        'mug-magico', 
                        'soporte-celular-3d',
                        'rompecabezas-yugioh',
                        'mouse-pad-gel-crash',
                        'mug-tematico-anime-gamer',
                        'reloj-despertador-cubo'
                    ],
                    'amigo_gourmet': [
                        'mug-interior-color', 
                        'dia-hombre-ejecutivo', 
                        'kit-escolar-basico',
                        'tarro-mason-jar'
                    ],
                    'amigo_amigurumi': ['amigurumi-llavero', 'amigurumi-mascota', 'dia-nino-amigurumi'],
                    'amigo_eterno': ['llavero-resina-letra', 'portavasos-resina', 'pulsera-miyuki']
                };

                const key = `${finderRecipient}_${finderVibe}`;
                const candidates = mapping[key] || ['san-valentin-premium'];

                let filtered = candidates.filter(id => id !== currentResultId);
                if (filtered.length === 0) filtered = candidates;

                const randomId = filtered[Math.floor(Math.random() * filtered.length)];
                const product = getProductById(randomId);

                setFinderResult(product);
                setIsSearching(false);
            }
        }, 800);
    };

    const resetFinder = () => {
        setFinderRecipient(null);
        setFinderVibe(null);
        setFinderResult(null);
    };

    return (
        <div className={styles.page_container}>
            <section className={styles.hero_section}>
                <Banner />
                <div className={styles.hero_content}>
                    {/* Elementos decorativos animados en segundo plano */}
                    <div className={styles.blob_decorator_1}></div>
                    <div className={styles.blob_decorator_2}></div>

                    <div className={styles.hero_glass_card}>

                        <span className={styles.hero_tag}>Regalos que cuentan tu historia</span>

                        <h1 className={styles.title}>
                            Transformamos tus ideas en
                            <span className={styles.gradient_text}> experiencias únicas</span>
                            <span className={styles.heart_icon}>
                                <svg width="70" height="70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#heartGrad)" />
                                    <defs>
                                        <linearGradient id="heartGrad" x1="0" y1="0" x2="1" y2="1">
                                            <stop offset="0%" stopColor="#a64342" />
                                            <stop offset="100%" stopColor="#ba8c87" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                        </h1>
                        <p className={styles.description}>
                            En Breaklab no entregamos objetos, entregamos recuerdos de un momento inolvidable.
                            Personalización, tecnología 3D, productos artesanales y pasión en cada detalle
                        </p>

                        <div className={styles.specialties_grid}>
                            <div className={styles.specialty_card}>
                                <div className={`${styles.specialty_icon} ${styles.bg_purple}`}>👾</div>
                                <p className={styles.specialty_title}>Coleccionables impresos en 3D</p>
                                <p>Damos vida a tus personajes favoritos de videojuegos y anime.</p>
                            </div>
                            <div className={styles.specialty_card}>
                                <div className={`${styles.specialty_icon} ${styles.bg_pink}`}>🎁</div>
                                <p className={styles.specialty_title}>Desayunos sorpresa que enamoran</p>
                                <p>Cajas gourmet diseñadas a medida, con detalles únicos y mensajes que transforman cualquier día en una celebración inolvidable.</p>
                            </div>
                            <div className={styles.specialty_card}>
                                <div className={`${styles.specialty_icon} ${styles.bg_cyan}`}>🎨</div>
                                <p className={styles.specialty_title}>Regalos hechos a mano con alma</p>
                                <p>Desde piezas en 3D hasta detalles personalizados que cuentan tu historia.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.gift_finder_section}>
                <div className={styles.finder_glass_card}>
                    <span className={styles.finder_tag}>¿No sabes qué regalar?</span>
                    <h2 className={styles.finder_title}>Asistente Mágico de Regalos 🪄</h2>
                    <p className={styles.finder_subtitle}>
                        Responde dos preguntas rápidas y nuestro laboratorio elegirá la sorpresa perfecta que lo dejará con la boca abierta.
                    </p>

                    {!finderResult && !isSearching && (
                        <div className={styles.finder_questions}>
                            {/* Question 1 */}
                            <div className={styles.question_group}>
                                <p className={styles.question_label}>1. ¿Para quién es el regalo especial?</p>
                                <div className={styles.options_row}>
                                    {[
                                        { id: 'pareja', label: 'Mi Pareja 💖' },
                                        { id: 'mama', label: 'Mamá 🤱' },
                                        { id: 'papa', label: 'Papá 👔' },
                                        { id: 'nino', label: 'Niño 🧸' },
                                        { id: 'amigo', label: 'Amig@ ☕' }
                                    ].map(opt => (
                                        <button
                                            key={opt.id}
                                            className={`${styles.finder_option} ${finderRecipient === opt.id ? styles.option_active : ''}`}
                                            onClick={() => setFinderRecipient(opt.id)}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Question 2 */}
                            <div className={styles.question_group}>
                                <p className={styles.question_label}>2. ¿Qué estilo o vibra le gustaría más?</p>
                                <div className={styles.options_row}>
                                    {[
                                        { id: 'gamer', label: 'Gamer 🎮' },
                                        { id: 'gourmet', label: 'Gourmet 🥞' },
                                        { id: 'amigurumi', label: 'Amigurumi 🧶' },
                                        { id: 'eterno', label: ' Flores 🌹' }
                                    ].map(opt => (
                                        <button
                                            key={opt.id}
                                            className={`${styles.finder_option} ${finderVibe === opt.id ? styles.option_active : ''}`}
                                            onClick={() => setFinderVibe(opt.id)}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                className={`${styles.finder_btn} ${(!finderRecipient || !finderVibe) ? styles.btn_disabled : ''}`}
                                onClick={handleFindGift}
                                disabled={!finderRecipient || !finderVibe}
                            >
                                ¡Revelar Regalo Ideal ✨!
                            </button>
                        </div>
                    )}

                    {isSearching && (
                        <div className={styles.finder_loading}>
                            <div className={styles.magic_wand_spinner}>
                                🪄
                                <div className={styles.magic_sparkle_1}>✨</div>
                                <div className={styles.magic_sparkle_2}>⭐</div>
                                <div className={styles.magic_sparkle_3}>🌸</div>
                            </div>
                            <p className={styles.loading_text}>{searchStepText}</p>
                        </div>
                    )}

                    {finderResult && (
                        <div className={styles.finder_result_container}>
                            <div className={styles.result_celebration}>🎉 ¡Tenemos la coincidencia perfecta! 🎉</div>
                            <div className={styles.result_card}>
                                <div className={styles.result_image_wrapper}>
                                    <img src={finderResult.image} alt={finderResult.name} className={styles.result_image} />
                                    {finderResult.isNew && <span className={styles.new_badge}>Nuevo</span>}
                                </div>
                                <div className={styles.result_info}>
                                    <span className={styles.result_label}>RECOMENDADO PARA TI</span>
                                    <h3>{finderResult.name}</h3>
                                    <p className={styles.result_subtitle_text}>{finderResult.subtitle}</p>
                                    <p className={styles.result_description}>{finderResult.description}</p>
                                    <div className={styles.result_price}>${finderResult.price.toLocaleString("es-CO")}</div>

                                    <div className={styles.result_actions}>
                                        <Link to={`/producto/${finderResult.id}`} className={styles.view_gift_btn}>
                                            Ver Detalles del Regalo 💝
                                        </Link>
                                        <button className={styles.retry_btn} onClick={handleFindGift}>
                                            Buscar otro 🪄
                                        </button>
                                        <button className={styles.reset_btn} onClick={resetFinder}>
                                            Cambiar opciones ↺
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className={styles.proceso_compra}>
                <div className={styles.proceso_container}>
                    <h2 className={styles.section_title}>Proceso de Compra <span className={styles.underline}></span></h2>
                    <div className={styles.grid_steps}>
                        <div className={styles.step_card}>
                            <div className={styles.step_badge}>Paso 1</div>
                            <div className={styles.step_icon}>📦</div>
                            <p className={styles.step_title}>Elige tu experiencia</p>
                            <p>Selecciona la ocasión perfecta o diseña desde cero una box que capture exactamente lo que quieres decir.</p>
                        </div>
                        <div className={styles.step_card}>
                            <div className={styles.step_badge}>Paso 2</div>
                            <div className={styles.step_icon}>🎨</div>
                            <p className={styles.step_title}>Hazlo único</p>
                            <p>Añade detalles con alma: chocolates, globos, amigurumis o piezas impresas en 3D. ¡Tú diriges la personalización!</p>
                        </div>
                        <div className={styles.step_card}>
                            <div className={styles.step_badge}>Paso 3</div>
                            <div className={styles.step_icon}>🛒</div>
                            <p className={styles.step_title}>Confirma tu pedido</p>
                            <p>Revisa tu selección, completa tus datos de envío en nuestro checkout seguro y despreocúpate.</p>
                        </div>
                        <div className={styles.step_card}>
                            <div className={styles.step_badge}>Paso 4</div>
                            <div className={styles.step_icon}>🛵</div>
                            <p className={styles.step_title}>¡Recibe y enamora!</p>
                            <p>Coordinamos la entrega en Bogotá y te mantenemos al tanto por WhatsApp hasta que tu sorpresa llegue a su destino.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.por_que_elegirnos}>
                <h2 className={styles.section_title}>¿Por Qué Elegirnos? <span className={styles.underline}></span></h2>
                <div className={styles.grid_reasons}>
                    <div className={styles.reason_card}>
                        <div className={styles.icon_wrapper}>🎨</div>
                        <p className={styles.reason_title}>Diseño a Tu Medida</p>
                        <p>Cada detalle es pensado especialmente para ti y tus seres queridos</p>
                    </div>
                    <div className={styles.reason_card}>
                        <div className={styles.icon_wrapper}>🚚</div>
                        <p className={styles.reason_title}>Envío Seguro y Puntual</p>
                        <p>Gestionamos tu sorpresa con logística optimizada para que llegue al lugar y momento exactos.</p>
                    </div>
                    <div className={styles.reason_card}>
                        <div className={styles.icon_wrapper}>💝</div>
                        <p className={styles.reason_title}>Acabados de Precisión</p>
                        <p>Combinamos materiales de alta calidad con procesos técnicos para resultados impecables.</p>
                    </div>
                    <div className={styles.reason_card}>
                        <div className={styles.icon_wrapper}>⭐</div>
                        <p className={styles.reason_title}>Garantía Breaklab</p>
                        <p>Tu tranquilidad es nuestra meta; cientos de clientes felices avalan nuestra dedicación.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
