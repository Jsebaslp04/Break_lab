import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './CategoriaProductos.module.css';
import { getCategoryProducts } from '../data/products';
import { useSEO } from '../hooks/useSEO';

function ProductCard({ product }) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const images = product.images && product.images.length > 0 ? product.images : [product.image];
    const hasMultipleImages = images.length > 1;

    const nextSlide = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIdx(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIdx(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const selectSlide = (idx, e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIdx(idx);
    };

    return (
        <Link to={`/producto/${product.id}`} className={styles.productCard}>
            <div className={styles.cardImageWrapper}>
                <div className={styles.sliderContainer}>
                    {images.map((img, idx) => (
                        img.endsWith('.mp4') ? (
                            <video
                                key={idx}
                                src={img}
                                className={`${styles.productImage} ${idx === currentIdx ? styles.imageActive : ''}`}
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        ) : (
                            <img
                                key={idx}
                                src={img}
                                alt={`Detalle de ${product.name} - Imagen ${idx + 1}`}
                                className={`${styles.productImage} ${idx === currentIdx ? styles.imageActive : ''}`}
                                loading="lazy"
                            />
                        )
                    ))}
                </div>
                
                {hasMultipleImages && (
                    <>
                        <button className={`${styles.sliderArrow} ${styles.arrowLeft}`} onClick={prevSlide} aria-label="Imagen anterior">
                            ❮
                        </button>
                        <button className={`${styles.sliderArrow} ${styles.arrowRight}`} onClick={nextSlide} aria-label="Siguiente imagen">
                            ❯
                        </button>
                        <div className={styles.sliderBullets}>
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`${styles.sliderBullet} ${idx === currentIdx ? styles.bulletActive : ''}`}
                                    onClick={(e) => selectSlide(idx, e)}
                                    aria-label={`Ir a imagen ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
                {product.isNew && <span className={styles.newBadge}>Nuevo</span>}
            </div>
            
            <div className={styles.cardBody}>
                <h2 className={styles.productName}>{product.name}</h2>
                
                <p className={styles.productSubtitle}>{product.subtitle}</p>
                
                <hr className={styles.cardDivider} />
                
                <div className={styles.cardFooter}>
                    <span className={styles.productPrice}>
                        ${product.price.toLocaleString()}
                    </span>
                    
                    <span className={styles.verDetalleBtn}>
                        Ver Detalles
                    </span>
                </div>
            </div>
        </Link>
    );
}

const SUBCATEGORIES_CONFIG = {
    'rompecabezas': [
        { id: 'rompecabezas-magneticos', label: '🧲 Rompecabezas Magnéticos' },
        { id: 'rompecabezas-carton', label: '🧩 Rompecabezas de Cartón' },
        { id: 'rompecabezas-mdf', label: '🪵 Rompecabezas MDF' }
    ],
    'gelatortas': [
        { id: 'gelatortas_mascota', label: '🐶 Gelatortas de Mascotas' },
        { id: 'gelatorta_tematica', label: '🎂 Gelatortas Temáticas' }
    ],
    'figuras-3d': [
        { id: 'figuras-3d-mario-bros', label: '💣 Bomb Mario Bros' },
        { id: 'figuras-3d-bowser', label: '🐢 Bowser 3D' },
        { id: 'figuras-3d-gengar', label: '😈 Gengar 3D' },
        { id: 'figuras-3d-pokebola', label: '🔴 Pokebola Gengar' },
        { id: 'figuras-3d-personalizadas', label: '⚙️ Diseños Varios' }
    ],
    'combos': [
        { id: 'combo-avengers', label: '🦸 Combo Avengers' },
        { id: 'combo-batman', label: '🦇 Combo Batman' },
        { id: 'combo-bob-esponja', label: '🧽 Combo Bob Esponja' },
        { id: 'combo-caballeros-del-zodiaco', label: '🌌 Combo Caballeros' },
        { id: 'combo-friends', label: '☕ Combo Friends' },
        { id: 'combo-looney-tunes', label: '🐰 Combo Looney Tunes' },
        { id: 'combo-los-simpson', label: '🍩 Combo Simpson' },
        { id: 'combo-mugs-one-piece', label: '🏴‍☠️ Combo One Piece' }
    ],
    'crea-tu-box': [
        /*
        { id: 'reyes', label: '👑 Reyes' },
        { id: 'kit-escolar', label: '🎒 Kit Escolar' },
        { id: 'san-valentin', label: '💘 San Valentín' },
        { id: 'box-tematicas', label: '📦 Box Temáticas' },
        { id: 'dia-mujer', label: '🌸 Día de la Mujer' },
        { id: 'dia-hombre', label: '👔 Día del Hombre' },
        { id: 'semana-santa', label: '🕊️ Semana Santa' },
        { id: 'dia-nino', label: '🧸 Día del Niño' },
        { id: 'dia-madre', label: '🤱 Día de la Madre' },
        { id: 'dia-padre', label: '👨‍👦 Día del Padre' }
        */
        { id: 'desayuno-luxury', label: '✨ Desayuno Luxury' },
        { id: 'desayuno-premium', label: '🌟 Desayuno Premium' },
        { id: 'desayuno-clasico', label: '🍳 Desayuno Clásico' }
    ],
    'personalizamos': [
        { id: 'mugs-personalizados', label: '☕ Mugs Personalizados' },
        { id: 'vasos-personalizados', label: '🥤 Vasos Personalizados' },
        { id: 'llaveros', label: '🔑 Llaveros' },
        { id: 'rompecabezas', label: '🧩 Rompecabezas' },
        { id: 'gelatortas', label: '🎂 Gelatortas' },
        { id: 'arte-resina', label: '🎨 Arte en Resina' },
        { id: 'miyuki', label: '💎 Miyuki' },
        { id: 'globo-mensaje', label: '🎈 Globo Mensaje' },
        { id: 'vino', label: '🍷 Vino' },
        { id: 'figuras-3d', label: '👾 Figuras 3D' },
        { id: 'amigurumis', label: '🧶 Amigurumis' },
        { id: 'su-flor-especial', label: '🌹 Su Flor Especial' },
        { id: 'variedades', label: '🎁 Variedades' }
    ]
};

export function CategoriaProductos() {
    const { id } = useParams();
    const categoriaId = id || 'kit-escolar';

    // Determine if the current category is a parent category
    const isParentCategory = !!SUBCATEGORIES_CONFIG[categoriaId];
    const subcategories = isParentCategory ? SUBCATEGORIES_CONFIG[categoriaId] : [];

    const formatCategoryName = (str) => {
        if (str === 'crea-tu-box') return 'Boxs';
        return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const displayCategoryName = formatCategoryName(categoriaId);

    const allProductsCombined = isParentCategory 
        ? subcategories.flatMap(sub => getCategoryProducts(sub.id))
        : getCategoryProducts(categoriaId);

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `${displayCategoryName} - BreakLab`,
        "description": `Colección de regalos personalizados y desayunos sorpresa en la categoría ${displayCategoryName}.`,
        "url": window.location.href,
        "numberOfItems": allProductsCombined.length,
        "itemListElement": allProductsCombined.map((prod, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "url": `${window.location.origin}/producto/${prod.id}`,
            "name": prod.name,
            "image": prod.image.startsWith('http') ? prod.image : `${window.location.origin}${prod.image.startsWith('/') ? prod.image : '/' + prod.image}`
        }))
    };

    useSEO({
        title: `${displayCategoryName} | Cajas de Regalo y Detalles | BreakLab`,
        description: `Descubre nuestra colección de ${displayCategoryName}. Cajas de regalo sorpresa y detalles personalizados de alta calidad para celebrar cualquier ocasión especial.`,
        keywords: `${categoriaId.replace(/-/g, ' ')}, regalos ${categoriaId.replace(/-/g, ' ')}, breaklab ${categoriaId.replace(/-/g, ' ')}, detalles personalizados bogota`,
        ogImage: allProductsCombined[0]?.image,
        schema: itemListSchema
    });
    
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id, categoriaId]);

    return (
        <div className={styles.categoryContainer}>
            <h1 className={styles.categoryTitle}>{displayCategoryName}</h1>

            <div className={styles.productsGrid}>
                {allProductsCombined.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                    />
                ))}
            </div>
        </div>
    );
}
