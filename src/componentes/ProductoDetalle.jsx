import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext';
import { getProductById, PRODUCTS_DB, getIncludedItems, getProductOptions } from '../data/products';
import styles from './ProductoDetalle.module.css';
import { useSEO } from '../hooks/useSEO';

export function ProductoDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedSug, setSelectedSug] = useState({});
    const [activeImageIdx, setActiveImageIdx] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxImageIdx, setLightboxImageIdx] = useState(0);
    const { addToCart } = useCart();

    const product = getProductById(id || 'kit-escolar-sorpresa');
    const options = getProductOptions(product);

    const [selectedOptions, setSelectedOptions] = useState(() => {
        const initial = {};
        options.forEach(opt => {
            initial[opt.name] = opt.default;
        });
        return initial;
    });

    const schemaImages = (product.images && product.images.length > 0 ? product.images : [product.image || "/break_lab_logo.png"])
        .map(img => img.startsWith('http') ? img : `${window.location.origin}${img.startsWith('/') ? img : '/' + img}`);

    const nextYear = new Date().getFullYear() + 1;
    const priceValidUntil = `${nextYear}-12-31`;

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": schemaImages,
        "sku": product.id,
        "mpn": product.id,
        "brand": {
            "@type": "Brand",
            "name": "BreakLab"
        },
        "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "COP",
            "price": product.price,
            "priceValidUntil": priceValidUntil,
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "BreakLab"
            }
        }
    };

    useSEO({
        title: `${product.name} | Desayunos y Regalos BreakLab`,
        description: `${product.description}. Caja sorpresa con empaque premium, tarjeta de regalo y personalización incluida. ¡Sorprende en Bogotá!`,
        keywords: `${product.name.toLowerCase()}, comprar ${product.name.toLowerCase()}, desayuno sorpresa bogota, regalo breaklab`,
        ogImage: product.images?.[0] || product.image,
        schema: productSchema
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        setActiveImageIdx(0);
        const newOptions = getProductOptions(product);
        const initial = {};
        newOptions.forEach(opt => {
            initial[opt.name] = opt.default;
        });
        setSelectedOptions(initial);
    }, [id]);

    const handleClose = () => {
        let categoryId = 'mugs-personalizados';
        for (const cat in PRODUCTS_DB) {
            if (PRODUCTS_DB[cat].some(p => p.id === product.id)) {
                categoryId = cat;
                break;
            }
        }
        navigate(`/categoria/${categoryId}`);
    };

    const suggestedItems = [
        { id: 'mug', name: 'Mug Personalizado', icon: '☕', price: 15000 },
        { id: 'llavero', name: 'Llavero Especial', icon: '🔑', price: 8000 },
        { id: 'chocolates', name: 'Caja Chocolates', icon: '🍫', price: 12000 }
    ];

    const toggleSuggestion = (id) => {
        setSelectedSug(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSelectOption = (optionName, choice) => {
        setSelectedOptions(prev => ({
            ...prev,
            [optionName]: choice
        }));
    };

    const handleAddSelected = () => {
        const optString = Object.values(selectedOptions).join(', ');
        const optId = Object.values(selectedOptions).join('-');

        const productsToAdd = [{
            id: `${product.id}-${optId}`,
            name: `${product.name} (${optString})`,
            price: product.price,
            quantity: 1,
            image: product.image
        }];

        suggestedItems.forEach(sug => {
            if (selectedSug[sug.id]) {
                productsToAdd.push({
                    id: sug.id,
                    name: sug.name,
                    price: sug.price,
                    quantity: 1
                });
            }
        });

        addToCart(productsToAdd);
        setShowModal(false);
        setSelectedSug({});
    };

    const handleAddOnlyMainProduct = () => {
        const optString = Object.values(selectedOptions).join(', ');
        const optId = Object.values(selectedOptions).join('-');

        addToCart([{
            id: `${product.id}-${optId}`,
            name: `${product.name} (${optString})`,
            price: product.price,
            quantity: 1,
            image: product.image
        }]);
        setShowModal(false);
        setSelectedSug({});
    };

    const hasSelection = Object.values(selectedSug).some(Boolean);

    const getTheme = (productId) => {
        const idLower = productId?.toLowerCase() || '';
        if (idLower.includes('valentin') || idLower.includes('mujer') || idLower.includes('madre') || idLower.includes('amor') || idLower.includes('miyuki') || idLower.includes('flor')) {
            return styles.themeRomantic;
        }
        if (idLower.includes('escolar') || idLower.includes('nino') || idLower.includes('figura')) {
            return styles.themePlayful;
        }
        if (idLower.includes('hombre') || idLower.includes('padre') || idLower.includes('vino')) {
            return styles.themeMasculine;
        }
        if (idLower.includes('reyes') || idLower.includes('santa') || idLower.includes('resina')) {
            return styles.themeFestive;
        }
        return styles.themeDefault;
    };

    let categoryId = 'mugs-personalizados';
    for (const cat in PRODUCTS_DB) {
        if (PRODUCTS_DB[cat].some(p => p.id === product.id)) {
            categoryId = cat;
            break;
        }
    }
    const formatCategoryName = (str) => {
        return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
    const categoryName = formatCategoryName(categoryId);
    const included = getIncludedItems(product);

    return (
        <div className={`${styles.pageWrapper} ${getTheme(id)}`}>
            <div className={styles.detailContainer}>
                {/* Botón de cerrar rosa */}
                <button className={styles.closeCircleBtn} onClick={handleClose} aria-label="Volver a la categoría">
                    &times;
                </button>

                <div className={styles.splitView}>
                    <div className={styles.imageSection}>
                        {product.images && product.images.length > 1 && (
                            <div className={styles.thumbnailList}>
                                {product.images.map((img, idx) => (
                                    <button 
                                        key={idx} 
                                        className={`${styles.thumbnailBtn} ${idx === activeImageIdx ? styles.thumbnailActive : ''}`}
                                        onClick={() => setActiveImageIdx(idx)}
                                        aria-label={`Ver imagen ${idx + 1}`}
                                    >
                                        <img 
                                            src={img} 
                                            alt={`Vista alternativa ${idx + 1}`} 
                                            className={styles.thumbnailImg} 
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className={styles.mainImage} onClick={() => {
                            setLightboxImageIdx(activeImageIdx);
                            setIsLightboxOpen(true);
                        }}>
                            <img 
                                src={product.images[activeImageIdx] || product.image} 
                                alt={`Fotografía de ${product.name} - Detalle de regalo de BreakLab`} 
                                className={styles.detailImage} 
                                loading="eager" 
                            />
                            {product.isNew && <span className={styles.newBadge}>NUEVO</span>}
                            <div className={styles.zoomHoverOverlay}>
                                <span>🔍 Ampliar</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.infoSection}>
                        <span className={styles.categoryLabel}>{categoryName.toUpperCase()}</span>
                        <h1 className={styles.title}>{product.name}</h1>
                        <p className={styles.description}>{product.description}</p>
                        
                        <div className={styles.includedSection}>
                            <p className={styles.includedTitle}>Este detalle incluye:</p>
                            <ul className={styles.includedList}>
                                {included.map((item, idx) => (
                                    <li key={idx} className={styles.includedItem}>
                                        <span className={styles.includedIcon}>✨</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {product.subtitle && (
                            <p className={styles.tagline}>💝 {product.subtitle}</p>
                        )}
                        
                        <div className={styles.priceTag}>
                            ${product.price.toLocaleString()}
                        </div>

                        {options.map(opt => (
                            <div key={opt.name} className={styles.optionsSection}>
                                <p className={styles.optionsTitle}>{opt.label}</p>
                                <div className={styles.pillsRow}>
                                    {opt.choices.map(choice => {
                                        const isSelected = selectedOptions[opt.name] === choice;
                                        return (
                                            <button 
                                                key={choice}
                                                className={`${styles.optionPill} ${isSelected ? styles.activePill : ''}`}
                                                onClick={() => handleSelectOption(opt.name, choice)}
                                            >
                                                {choice}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        <button className={styles.addToCartBtn} onClick={() => setShowModal(true)}>
                            Añadir al Carrito
                        </button>
                    </div>
                </div>

                {showModal && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <h2>✨ ¡Has añadido un producto al carrito! 🎉</h2>
                            <p>Sugerimos añadir más productos para complementar tu regalo:</p>
                            <div className={styles.suggestedItems}>
                                {suggestedItems.map(sug => (
                                    <div 
                                        key={sug.id} 
                                        className={`${styles.suggestedBox} ${selectedSug[sug.id] ? styles.selected : ''}`}
                                        onClick={() => toggleSuggestion(sug.id)}
                                    >
                                        <span className={styles.sugIcon}>{sug.icon}</span> 
                                        <strong>{sug.name}</strong><br/>
                                        <span className={styles.sugPrice}>+${sug.price.toLocaleString()}</span>
                                        {selectedSug[sug.id] && <div className={styles.checkIcon}>✓</div>}
                                    </div>
                                ))}
                            </div>
                            <div className={styles.modalActions}>
                                <button className={styles.btnSecondary} onClick={handleAddOnlyMainProduct}>
                                    No, gracias (Ver carrito)
                                </button>
                                <button 
                                    className={`${styles.btnPrimary} ${!hasSelection ? styles.btnDisabled : ''}`} 
                                    onClick={handleAddSelected}
                                >
                                    {hasSelection ? 'Sí, agregar seleccionados' : 'Selecciona una sugerencia'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {isLightboxOpen && (
                <div className={styles.lightboxOverlay} onClick={() => setIsLightboxOpen(false)}>
                    <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                        <button 
                            className={styles.lightboxClose} 
                            onClick={() => setIsLightboxOpen(false)}
                            aria-label="Cerrar ampliación"
                        >
                            &times;
                        </button>
                        
                        {product.images.length > 1 && (
                            <button 
                                className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLightboxImageIdx(prev => (prev === 0 ? product.images.length - 1 : prev - 1));
                                }}
                                aria-label="Imagen anterior"
                            >
                                &#10094;
                            </button>
                        )}

                        <img 
                            src={product.images[lightboxImageIdx] || product.image} 
                            alt={`Ampliación de ${product.name} - Imagen ${lightboxImageIdx + 1}`} 
                            className={styles.lightboxImage} 
                        />

                        {product.images.length > 1 && (
                            <button 
                                className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLightboxImageIdx(prev => (prev === product.images.length - 1 ? 0 : prev + 1));
                                }}
                                aria-label="Siguiente imagen"
                            >
                                &#10095;
                            </button>
                        )}

                        {product.images.length > 1 && (
                            <div className={styles.lightboxBullets}>
                                {product.images.map((_, idx) => (
                                    <button 
                                        key={idx}
                                        className={`${styles.lightboxBullet} ${idx === lightboxImageIdx ? styles.lightboxBulletActive : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setLightboxImageIdx(idx);
                                        }}
                                        aria-label={`Ir a imagen ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
