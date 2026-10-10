import React, { useState, useEffect, useMemo } from 'react';
import styles from './Crea_tu_Box.module.css';
import { useSEO } from '../hooks/useSEO';
import { useCart } from './context/CartContext';
import { PRODUCTS_DB, breakLabLogo } from '../data/products';
import { ARMA_TU_BOX_PRODUCTS, ARMA_TU_BOX_CATEGORIES } from '../data/armaTuBoxProducts';
import boxIcon from '../assets/box.png';

// Box bases options
const BOX_BASES = [
    {
        id: 'base-madera-pino',
        name: 'Caja de Madera Pino Luxury',
        price: 25000,
        icon: '🪵',
        badge: 'Más Popular ⭐',
        description: 'Caja artesanal en madera de pino con viruta decorativa, moño de satín de lujo y tarjeta de regalo personalizada.'
    },
    {
        id: 'base-box-tematica',
        name: 'Box Sorpresa Temática',
        price: 20000,
        icon: '🎁',
        badge: 'Colorida ✨',
        description: 'Caja decorada con temática de tu personaje o evento favorito, confeti y lazo especial.'
    },
    {
        id: 'base-canasta-ancheta',
        name: 'Ancheta Canasta Rústica',
        price: 22000,
        icon: '🧺',
        badge: 'Elegante 🌿',
        description: 'Canasta artesanal tejida con forro en tela delicada, moño de regalo y empaque transparente.'
    },
    {
        id: 'base-kraft-eco',
        name: 'Caja Kraft Ecológica con Visor',
        price: 15000,
        icon: '📦',
        badge: 'Eco Friendly 🍃',
        description: 'Empaque minimalista en cartón kraft de alta resistencia con ventana transparente y cordón rústico.'
    },
    {
        id: 'base-sin-caja',
        name: 'Sin Caja Base (Solo Productos)',
        price: 0,
        icon: '✨',
        badge: 'Directo',
        description: 'Elige solo los productos y detalles individuales que deseas ordenar sin costo de empaque base.'
    }
];

// High-level category tab definitions for web store catalog option
const WEB_CATEGORY_TABS = [
    { id: 'all', name: 'Todo el Catálogo Web', icon: '🌟' },
    {
        id: 'mugs',
        name: 'Mugs y Vasos',
        icon: '☕',
        matchKeys: ['mugs-personalizados', 'Amarillo', 'Azul', 'Rojo', 'Verde', 'vasos-personalizados', 'combo-mugs-one-piece']
    },
    {
        id: 'puzzles',
        name: 'Rompecabezas',
        icon: '🧩',
        matchKeys: [
            'rompecabezas-one-piece',
            'rompecabezas-caballeros-del-zodiaco',
            'rompecabezas-dragon-ball-z',
            'rompecabezas-pokemon',
            'rompecabezas-sailor-moon',
            'rompecabezas-mario-bros',
            'rompecabezas-yugi-oh',
            'rompecabezas-carton',
            'rompecabezas-mdf'
        ]
    },
    {
        id: 'geek_3d',
        name: 'Figuras 3D Geek',
        icon: '👾',
        matchKeys: [
            'figuras-3d-mario-bros',
            'figuras-3d-bowser',
            'figuras-3d-gengar',
            'figuras-3d-pokebola',
            'figuras-3d-mewtwo',
            'figuras-3d-mapache',
            'figuras-3d-t-rex',
            'figuras-3d-personalizadas',
            'soportes'
        ]
    },
    {
        id: 'delicias',
        name: 'Gelatortas Web',
        icon: '🍰',
        matchKeys: ['gelatortas_mascota', 'gelatorta_tematica']
    },
    {
        id: 'llaveros_categoria',
        name: 'Llaveros Web',
        icon: '🔑',
        matchKeys: ['llaveros']
    },
    {
        id: 'detalles',
        name: 'Variedades',
        icon: '🎁',
        matchKeys: ['variedades']
    },
    {
        id: 'desayunos_base',
        name: 'Kits y Desayunos',
        icon: '🥞',
        matchKeys: [
            'desayuno-luxury',
            'desayuno-premium',
            'desayuno-clasico',
            'baby-shower',
            'san-valentin',
            'box-tematicas',
            'kit-escolar',
            'reyes',
            'dia-mujer',
            'dia-hombre',
            'semana-santa',
            'dia-nino',
            'dia-madre',
            'dia-padre'
        ]
    }
];

export const Crea_tu_Box = () => {
    useSEO({
        title: "Arma tu Box o Ancheta a Tu Medida | BreakLab Bogotá",
        description: "Diseña y crea tu propia caja de regalos sorpresa o desayuno en Bogotá. Elige la base, mugs, figuras 3D, rompecabezas, comida y detalles para armar el regalo perfecto a tu medida.",
        keywords: "armar box personalizada, crear desayuno sorpresa, anchetas personalizadas bogota, diseñar regalo bogota, breaklab box"
    });

    const { addToCart } = useCart();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // State for Box builder
    const [selectedBase, setSelectedBase] = useState(BOX_BASES[0]);

    // Catalog source: 'box_custom' (default: Arma tu box folder without prices) OR 'web_catalog' (web store products with prices)
    const [catalogSource, setCatalogSource] = useState('box_custom');

    // Category filters
    const [selectedBoxCategory, setSelectedBoxCategory] = useState('all');
    const [selectedWebCategory, setSelectedWebCategory] = useState('all');

    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('default');

    // Selected items map: { [id]: { item, quantity, isWebProduct } }
    const [selectedItems, setSelectedItems] = useState({});

    // Client form state
    const [recipientName, setRecipientName] = useState('');
    const [dedicationMessage, setDedicationMessage] = useState('');
    const [clientNotes, setClientNotes] = useState('');

    const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);
    const [addedToast, setAddedToast] = useState(null);
    const [previewProduct, setPreviewProduct] = useState(null);
    const [isImageZoomed, setIsImageZoomed] = useState(false);

    const handleOpenPreview = (product) => {
        setIsImageZoomed(false);
        setPreviewProduct(product);
    };

    const handleClosePreview = () => {
        setPreviewProduct(null);
        setIsImageZoomed(false);
    };

    // Close preview on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleClosePreview();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Flatten all products from PRODUCTS_DB into unique array for web catalog mode
    const allWebProducts = useMemo(() => {
        const productMap = new Map();

        Object.entries(PRODUCTS_DB).forEach(([categoryKey, items]) => {
            if (Array.isArray(items)) {
                items.forEach(item => {
                    if (!productMap.has(item.id)) {
                        productMap.set(item.id, {
                            ...item,
                            categoryKey,
                            image: item.image || breakLabLogo,
                            subtitle: item.subtitle || 'Detalle especial BreakLab',
                            price: item.price || 0
                        });
                    }
                });
            }
        });

        return Array.from(productMap.values());
    }, []);

    // Filter products depending on active catalog source
    const currentDisplayProducts = useMemo(() => {
        if (catalogSource === 'box_custom') {
            let list = ARMA_TU_BOX_PRODUCTS.filter(prod => {
                // Category filter
                if (selectedBoxCategory !== 'all' && prod.category !== selectedBoxCategory) {
                    return false;
                }

                // Search query filter
                if (searchQuery.trim()) {
                    const q = searchQuery.toLowerCase().trim();
                    const matchName = prod.name?.toLowerCase().includes(q);
                    const matchSub = prod.subtitle?.toLowerCase().includes(q);
                    const matchDesc = prod.description?.toLowerCase().includes(q);
                    const matchCat = prod.categoryName?.toLowerCase().includes(q);
                    const matchBadge = prod.badge?.toLowerCase().includes(q);
                    const matchTags = prod.tags?.some(t => t.toLowerCase().includes(q));
                    if (!matchName && !matchSub && !matchDesc && !matchCat && !matchBadge && !matchTags) return false;
                }

                return true;
            });

            // Sorting
            if (sortBy === 'name_asc') {
                list = [...list].sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortBy === 'name_desc') {
                list = [...list].sort((a, b) => b.name.localeCompare(a.name));
            }

            return list;
        } else {
            // Web store catalog
            const activeTabObj = WEB_CATEGORY_TABS.find(t => t.id === selectedWebCategory);

            let list = allWebProducts.filter(prod => {
                if (selectedWebCategory !== 'all' && activeTabObj && activeTabObj.matchKeys) {
                    if (!activeTabObj.matchKeys.includes(prod.categoryKey)) {
                        return false;
                    }
                }

                if (searchQuery.trim()) {
                    const q = searchQuery.toLowerCase().trim();
                    const matchName = prod.name?.toLowerCase().includes(q);
                    const matchSub = prod.subtitle?.toLowerCase().includes(q);
                    const matchDesc = prod.description?.toLowerCase().includes(q);
                    if (!matchName && !matchSub && !matchDesc) return false;
                }

                return true;
            });

            if (sortBy === 'price_asc') {
                list = [...list].sort((a, b) => a.price - b.price);
            } else if (sortBy === 'price_desc') {
                list = [...list].sort((a, b) => b.price - a.price);
            } else if (sortBy === 'name_asc') {
                list = [...list].sort((a, b) => a.name.localeCompare(b.name));
            }

            return list;
        }
    }, [catalogSource, selectedBoxCategory, selectedWebCategory, searchQuery, sortBy, allWebProducts]);

    // Group box products by category with full section information
    const groupedBoxProducts = useMemo(() => {
        const categoriesToDisplay = selectedBoxCategory === 'all'
            ? ARMA_TU_BOX_CATEGORIES.filter(c => c.id !== 'all')
            : ARMA_TU_BOX_CATEGORIES.filter(c => c.id === selectedBoxCategory);

        return categoriesToDisplay.map(cat => {
            const catProducts = currentDisplayProducts.filter(p => p.category === cat.id);
            return {
                ...cat,
                products: catProducts
            };
        }).filter(group => group.products.length > 0);
    }, [selectedBoxCategory, currentDisplayProducts]);

    // Group web products by category with full section information
    const groupedWebProducts = useMemo(() => {
        const tabsToDisplay = selectedWebCategory === 'all'
            ? WEB_CATEGORY_TABS.filter(t => t.id !== 'all')
            : WEB_CATEGORY_TABS.filter(t => t.id === selectedWebCategory);

        return tabsToDisplay.map(tab => {
            const tabProducts = currentDisplayProducts.filter(p => tab.matchKeys?.includes(p.categoryKey));
            return {
                ...tab,
                products: tabProducts
            };
        }).filter(group => group.products.length > 0);
    }, [selectedWebCategory, currentDisplayProducts]);

    // Group calculations
    const itemsList = useMemo(() => Object.values(selectedItems), [selectedItems]);
    const boxItemsList = useMemo(() => itemsList.filter(it => !it.isWebProduct), [itemsList]);
    const webItemsList = useMemo(() => itemsList.filter(it => it.isWebProduct), [itemsList]);

    const totalItemsCount = useMemo(() => itemsList.reduce((sum, it) => sum + it.quantity, 0), [itemsList]);
    const boxItemsCount = useMemo(() => boxItemsList.reduce((sum, it) => sum + it.quantity, 0), [boxItemsList]);
    const webItemsCount = useMemo(() => webItemsList.reduce((sum, it) => sum + it.quantity, 0), [webItemsList]);

    const webSubtotal = useMemo(() => webItemsList.reduce((sum, it) => sum + ((it.item.price || 0) * it.quantity), 0), [webItemsList]);
    const basePrice = selectedBase ? selectedBase.price : 0;
    const totalPrice = basePrice + webSubtotal;

    // Handlers
    const handleAddItem = (product, isWeb = false) => {
        setSelectedItems(prev => {
            const existing = prev[product.id];
            const newQty = existing ? existing.quantity + 1 : 1;
            return {
                ...prev,
                [product.id]: {
                    item: product,
                    quantity: newQty,
                    isWebProduct: isWeb
                }
            };
        });

        setAddedToast(`+ Agregado: ${product.name}`);
        setTimeout(() => setAddedToast(null), 2200);
    };

    const handleRemoveItem = (productId) => {
        setSelectedItems(prev => {
            const existing = prev[productId];
            if (!existing) return prev;
            if (existing.quantity > 1) {
                return {
                    ...prev,
                    [productId]: {
                        ...existing,
                        quantity: existing.quantity - 1
                    }
                };
            }
            const updated = { ...prev };
            delete updated[productId];
            return updated;
        });
    };

    const handleDeleteItem = (productId) => {
        setSelectedItems(prev => {
            const updated = { ...prev };
            delete updated[productId];
            return updated;
        });
    };

    const handleResetBox = () => {
        if (window.confirm('¿Deseas reiniciar tu selección de Box/Ancheta?')) {
            setSelectedItems({});
            setDedicationMessage('');
            setRecipientName('');
            setClientNotes('');
        }
    };

    // Add custom box to main web cart
    const handleAddBoxToCart = () => {
        if (totalItemsCount === 0 && (!selectedBase || selectedBase.price === 0)) {
            alert('¡Selecciona al menos un artículo o una base para tu Box!');
            return;
        }

        const itemsSummary = itemsList.map(it => `${it.quantity}x ${it.item.name}`).join(', ');
        const boxTitle = `Box Personalizada (${selectedBase.name})${itemsSummary ? ': ' + itemsSummary : ''}`;

        const cartBoxItem = {
            id: `custom-box-${Date.now()}`,
            productId: 'custom-box',
            name: boxTitle,
            price: totalPrice,
            quantity: 1,
            image: selectedBase.id !== 'base-sin-caja' ? boxIcon : (itemsList[0]?.item.image || breakLabLogo),
            selectedOptions: {
                base: selectedBase.name,
                para: recipientName.trim() || 'No especificado',
                dedicatoria: dedicationMessage.trim() || 'Sin dedicatoria',
                indicacionesCotizacion: clientNotes.trim() || 'Sin recomendaciones especiales',
                articulosBoxCotizar: boxItemsList.map(it => `${it.quantity}x ${it.item.name} (${it.item.categoryName || 'Personalizable'})`),
                productosWebTienda: webItemsList.map(it => `${it.quantity}x ${it.item.name} ($${it.item.price?.toLocaleString('es-CO')})`)
            }
        };

        addToCart(cartBoxItem);
        setIsMobileSummaryOpen(false);
        setAddedToast('🛒 ¡Box agregada al carrito con éxito!');
        setTimeout(() => setAddedToast(null), 3000);
    };

    // Send order / quote request via WhatsApp
    const handleOrderWhatsApp = () => {
        if (totalItemsCount === 0 && (!selectedBase || selectedBase.price === 0)) {
            alert('¡Selecciona al menos un artículo o una base para tu Box!');
            return;
        }

        let msg = `🎁 *SOLICITUD DE COTIZACIÓN - ARMA TU BOX BREAKLAB* 🎁\n\n`;
        msg += `¡Hola BreakLab! 👋 Quiero cotizar mi *Box / Ancheta Personalizada* con los siguientes productos elegidos a mi medida:\n\n`;

        if (selectedBase) {
            msg += `📦 *Base de Empaque:* ${selectedBase.name} (${selectedBase.price === 0 ? 'Sin costo adicional' : '$' + selectedBase.price.toLocaleString('es-CO') + ' COP'})\n\n`;
        }

        // Artículos de Box para cotizar (sin precio)
        if (boxItemsList.length > 0) {
            msg += `✨ *Artículos para Box Seleccionados (${boxItemsCount} unid. - Para Cotizar):*\n`;
            boxItemsList.forEach(it => {
                msg += `  • ${it.quantity}x ${it.item.name} [${it.item.categoryName || 'Personalizable'}]\n`;
            });
            msg += `\n`;
        }

        // Productos de la tienda web si incluyó alguno
        if (webItemsList.length > 0) {
            msg += `🌐 *Productos de la Tienda Web Agregados (${webItemsCount} unid.):*\n`;
            webItemsList.forEach(it => {
                msg += `  • ${it.quantity}x ${it.item.name} - $${((it.item.price || 0) * it.quantity).toLocaleString('es-CO')} COP\n`;
            });
            msg += `\n`;
        }

        if (recipientName.trim()) {
            msg += `👤 *Para:* ${recipientName.trim()}\n`;
        }

        if (dedicationMessage.trim()) {
            msg += `💌 *Dedicatoria para tarjeta:* "${dedicationMessage.trim()}"\n`;
        }

        if (clientNotes.trim()) {
            msg += `\n📝 *Recomendaciones e Indicaciones especiales para la cotización:*\n"${clientNotes.trim()}"\n`;
        } else {
            msg += `\n📝 *Recomendaciones / Personalización:* (Pendiente por coordinar fotos y detalles de diseño)\n`;
        }

        msg += `\n📊 *Resumen:* ${totalItemsCount} artículo${totalItemsCount > 1 ? 's' : ''} en total.\n`;
        if (totalPrice > 0) {
            msg += `💰 *Subtotal base y tienda:* $${totalPrice.toLocaleString('es-CO')} COP (+ cotización de artículos personalizados)\n`;
        } else {
            msg += `💰 *Valor:* Pendiente por cotizar según las personalizaciones indicadas.\n`;
        }

        msg += `\n¿Me podrían confirmar el valor total de la cotización, opciones de personalización y tiempos de entrega en Bogotá? 😊✨`;

        const encoded = encodeURIComponent(msg);
        window.open(`https://wa.me/573208738961?text=${encoded}`, '_blank');
    };

    // Card renderer for consistent appearance across categories
    const renderProductCard = (product, isWeb = false) => {
        const inBoxItem = selectedItems[product.id];
        const inBoxQty = inBoxItem ? inBoxItem.quantity : 0;
        const isVideo = product.image?.endsWith?.('.mp4');

        return (
            <div
                key={product.id}
                className={`${styles.productCard} ${inBoxQty > 0 ? styles.productCardInBox : ''}`}
            >
                {/* Card Image */}
                <div
                    className={styles.productImgWrapper}
                    onClick={() => handleOpenPreview(product)}
                    title="Clic para ampliar y ver en detalle"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleOpenPreview(product);
                        }
                    }}
                >
                    {isVideo ? (
                        <video
                            src={product.image}
                            className={styles.productImg}
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    ) : (
                        <img
                            src={product.image || breakLabLogo}
                            alt={product.name}
                            className={styles.productImg}
                            loading="lazy"
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = breakLabLogo;
                            }}
                        />
                    )}

                    {/* Zoom Hint Badge */}
                    <span className={styles.zoomOverlayBadge}>
                        🔍 Ampliar
                    </span>

                    {/* Top Badges */}
                    {product.badge && (
                        <span className={styles.itemCustomBadge}>{product.badge}</span>
                    )}
                    {product.isNew && (
                        <span className={styles.newBadge}>Nuevo</span>
                    )}
                    {inBoxQty > 0 && (
                        <span className={styles.inBoxBadge}>
                            ✓ En tu Box ({inBoxQty})
                        </span>
                    )}
                </div>

                {/* Card Content */}
                <div className={styles.productContent}>
                    {product.categoryName && (
                        <span className={styles.categoryChip}>
                            {product.categoryName}
                        </span>
                    )}
                    <h3
                        className={styles.productName}
                        title={`Clic para ampliar: ${product.name}`}
                        onClick={() => handleOpenPreview(product)}
                        style={{ cursor: 'pointer' }}
                    >
                        {product.name}
                    </h3>
                    <p className={styles.productSubtitle} title={product.subtitle}>
                        {product.subtitle}
                    </p>

                    <div className={styles.productPriceRow}>
                        {/* Price or Quote Tag */}
                        {isWeb ? (
                            <span className={styles.productPrice}>
                                ${product.price?.toLocaleString('es-CO')}
                            </span>
                        ) : (
                            <span className={styles.quoteStatusTag}>
                                ✨ Para Cotizar
                            </span>
                        )}

                        {/* Add / Quantity Controls */}
                        {inBoxQty === 0 ? (
                            <button
                                className={styles.addBtn}
                                onClick={() => handleAddItem(product, isWeb)}
                                aria-label={`Elegir ${product.name} para mi box`}
                            >
                                <span>+</span> Elegir
                            </button>
                        ) : (
                            <div className={styles.qtyControls}>
                                <button
                                    className={styles.qtyBtn}
                                    onClick={() => handleRemoveItem(product.id)}
                                    aria-label="Disminuir cantidad"
                                >
                                    -
                                </button>
                                <span className={styles.qtyDisplay}>{inBoxQty}</span>
                                <button
                                    className={styles.qtyBtn}
                                    onClick={() => handleAddItem(product, isWeb)}
                                    aria-label="Aumentar cantidad"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.builderContainer}>
            {/* Notification Toast */}
            {addedToast && (
                <div className={styles.toastNotification}>
                    {addedToast}
                </div>
            )}

            {/* Header / Intro */}
            <div className={styles.builderHeader}>
                <div className={styles.badgeTop}>Personalización Exclusiva BreakLab ✨</div>
                <h1 className={styles.mainTitle}>Arma tu Box o Ancheta a Tu Medida 🎁</h1>
                <p className={styles.mainSubtitle}>
                    Elige la base de tu regalo, escoge libremente los artículos personalizados de nuestro catálogo y escribe tus especificaciones. Te enviaremos la cotización detallada de inmediato por WhatsApp.
                </p>

                {/* Steps Visual Tracker */}
                <div className={styles.stepsTracker}>
                    <div className={`${styles.stepItem} ${styles.stepActive}`}>
                        <span className={styles.stepNumber}>1</span>
                        <span className={styles.stepText}>Elige la Base</span>
                    </div>
                    <div className={styles.stepDivider}></div>
                    <div className={`${styles.stepItem} ${totalItemsCount > 0 ? styles.stepActive : ''}`}>
                        <span className={styles.stepNumber}>2</span>
                        <span className={styles.stepText}>Agrega Artículos ({totalItemsCount})</span>
                    </div>
                    <div className={styles.stepDivider}></div>
                    <div className={`${styles.stepItem} ${clientNotes || dedicationMessage || recipientName ? styles.stepActive : ''}`}>
                        <span className={styles.stepNumber}>3</span>
                        <span className={styles.stepText}>Indicaciones y Cotización</span>
                    </div>
                </div>
            </div>

            {/* Main Builder Grid */}
            <div className={styles.builderLayout}>
                {/* Left Column: Bases + Products Catalog */}
                <div className={styles.catalogColumn}>
                    
                    {/* Step 1: Base Selection */}
                    <section className={styles.sectionBlock}>
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionNumber}>Paso 1</span>
                            <h2 className={styles.sectionTitle}>Selecciona la Base o Presentación</h2>
                        </div>
                        <div className={styles.basesGrid}>
                            {BOX_BASES.map(base => {
                                const isSelected = selectedBase.id === base.id;
                                return (
                                    <div
                                        key={base.id}
                                        className={`${styles.baseCard} ${isSelected ? styles.baseCardActive : ''}`}
                                        onClick={() => setSelectedBase(base)}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <div className={styles.baseCardTop}>
                                            <span className={styles.baseIcon}>{base.icon}</span>
                                            <span className={styles.baseBadge}>{base.badge}</span>
                                        </div>
                                        <h3 className={styles.baseName}>{base.name}</h3>
                                        <p className={styles.baseDesc}>{base.description}</p>
                                        <div className={styles.basePriceRow}>
                                            <span className={styles.basePrice}>
                                                {base.price === 0 ? 'Sin costo adicional' : `$${base.price.toLocaleString('es-CO')}`}
                                            </span>
                                            <span className={styles.baseRadioCheck}>
                                                {isSelected ? '✓ Seleccionada' : 'Elegir'}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Step 2: Category Tabs & Products Selection */}
                    <section className={styles.sectionBlock}>
                        <div className={styles.sectionHeader}>
                            <span className={styles.sectionNumber}>Paso 2</span>
                            <div>
                                <h2 className={styles.sectionTitle}>Explora y Elige los Artículos para Tu Box</h2>
                            </div>
                        </div>

                        {/* Catalog Source Switcher */}
                        <div className={styles.catalogSourceNav}>
                            <button
                                type="button"
                                className={`${styles.catalogSourceBtn} ${catalogSource === 'box_custom' ? styles.catalogSourceBtnActive : ''}`}
                                onClick={() => {
                                    setCatalogSource('box_custom');
                                    setSearchQuery('');
                                    setSortBy('default');
                                }}
                            >
                                <span className={styles.catalogSourceIcon}>🎁</span>
                                <div className={styles.catalogSourceText}>
                                    <strong>Artículos Arma tu Box</strong>
                                    <span>Catálogo exclusivo para cotizar (sin precio)</span>
                                </div>
                                <span className={styles.catalogSourceBadge}>
                                    {ARMA_TU_BOX_PRODUCTS.length} productos
                                </span>
                            </button>

                            <button
                                type="button"
                                className={`${styles.catalogSourceBtn} ${catalogSource === 'web_catalog' ? styles.catalogSourceBtnActive : ''}`}
                                onClick={() => {
                                    setCatalogSource('web_catalog');
                                    setSearchQuery('');
                                    setSortBy('default');
                                }}
                            >
                                <span className={styles.catalogSourceIcon}>🌐</span>
                                <div className={styles.catalogSourceText}>
                                    <strong>Productos de la Tienda Web</strong>
                                    <span>Mugs, Puzzles y Geek con precio de lista</span>
                                </div>
                                <span className={styles.catalogSourceBadge}>
                                    {allWebProducts.length} productos
                                </span>
                            </button>
                        </div>

                        {/* Informative notice banner based on catalog mode */}
                        {catalogSource === 'box_custom' ? (
                            <div className={styles.sourceNoticeBanner}>
                                <span className={styles.sourceNoticeIcon}>✨</span>
                                <div className={styles.sourceNoticeContent}>
                                    <h4>Catálogo Exclusivo para Armar tu Box</h4>
                                    <p>
                                        Elige cualquiera y los que quieras de estos productos. <strong>No tienen precio fijo</strong>: agrégalos a tu lista, escribe al final tus indicaciones o recomendaciones de lo que deseas (fotos, frases, colores o sabores) y te enviaremos la cotización detallada por WhatsApp como carrito de compras.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className={`${styles.sourceNoticeBanner} ${styles.sourceNoticeBannerWeb}`}>
                                <span className={styles.sourceNoticeIcon}>🛒</span>
                                <div className={styles.sourceNoticeContent}>
                                    <h4>Catálogo General de la Tienda Web</h4>
                                    <p>
                                        ¿Quieres sumar a tu box artículos listos de nuestra tienda online? Aquí puedes elegir mugs temáticos, rompecabezas y figuras 3D con su precio habitual.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Search & Sort Row */}
                        <div className={styles.filterBar}>
                            <div className={styles.searchWrapper}>
                                <span className={styles.searchIcon}>🔍</span>
                                <input
                                    type="text"
                                    className={styles.searchInput}
                                    placeholder={
                                        catalogSource === 'box_custom'
                                            ? "Buscar en artículos de Box (mugs, gelatortas, retablos, llaveros, cojines...)"
                                            : "Buscar en catálogo web..."
                                    }
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button className={styles.clearSearchBtn} onClick={() => setSearchQuery('')}>
                                        ✕
                                    </button>
                                )}
                            </div>

                            <div className={styles.sortWrapper}>
                                <label htmlFor="sort-select" className={styles.sortLabel}>Ordenar:</label>
                                <select
                                    id="sort-select"
                                    className={styles.sortSelect}
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="default">Recomendados</option>
                                    <option value="name_asc">Nombre (A-Z)</option>
                                    {catalogSource === 'box_custom' ? (
                                        <option value="name_desc">Nombre (Z-A)</option>
                                    ) : (
                                        <>
                                            <option value="price_asc">Menor precio</option>
                                            <option value="price_desc">Mayor precio</option>
                                        </>
                                    )}
                                </select>
                            </div>
                        </div>

                        {/* Category Navigation Bar (Pills with Item Count Badges) */}
                        <div className={styles.categoryTabsContainer}>
                            <div className={styles.categoryTabsHeader}>
                                <span className={styles.categoryTabsLabel}>
                                    🏷️ Categorías disponibles:
                                </span>
                                {catalogSource === 'box_custom' && selectedBoxCategory !== 'all' && (
                                    <button
                                        type="button"
                                        className={styles.resetCategoryFilterBtn}
                                        onClick={() => setSelectedBoxCategory('all')}
                                    >
                                        Ver todas las categorías ({ARMA_TU_BOX_PRODUCTS.length}) ✕
                                    </button>
                                )}
                                {catalogSource === 'web_catalog' && selectedWebCategory !== 'all' && (
                                    <button
                                        type="button"
                                        className={styles.resetCategoryFilterBtn}
                                        onClick={() => setSelectedWebCategory('all')}
                                    >
                                        Ver todo el catálogo ({allWebProducts.length}) ✕
                                    </button>
                                )}
                            </div>

                            <div className={styles.tabsGrid}>
                                {catalogSource === 'box_custom'
                                    ? ARMA_TU_BOX_CATEGORIES.map(cat => {
                                        const isActive = selectedBoxCategory === cat.id;
                                        const count = cat.id === 'all'
                                            ? ARMA_TU_BOX_PRODUCTS.length
                                            : ARMA_TU_BOX_PRODUCTS.filter(p => p.category === cat.id).length;

                                        return (
                                            <button
                                                key={cat.id}
                                                className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
                                                onClick={() => setSelectedBoxCategory(cat.id)}
                                            >
                                                <span className={styles.tabIcon}>{cat.icon}</span>
                                                <span className={styles.tabText}>{cat.name}</span>
                                                <span className={styles.tabBadge}>{count}</span>
                                            </button>
                                        );
                                    })
                                    : WEB_CATEGORY_TABS.map(tab => {
                                        const isActive = selectedWebCategory === tab.id;
                                        const count = tab.id === 'all'
                                            ? allWebProducts.length
                                            : allWebProducts.filter(p => tab.matchKeys?.includes(p.categoryKey)).length;

                                        return (
                                            <button
                                                key={tab.id}
                                                className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
                                                onClick={() => setSelectedWebCategory(tab.id)}
                                            >
                                                <span className={styles.tabIcon}>{tab.icon}</span>
                                                <span className={styles.tabText}>{tab.name}</span>
                                                <span className={styles.tabBadge}>{count}</span>
                                            </button>
                                        );
                                    })
                                }
                            </div>
                        </div>

                        {/* Products Counter */}
                        <div className={styles.resultsInfo}>
                            <span>
                                Mostrando <strong>{currentDisplayProducts.length}</strong> productos disponibles {catalogSource === 'box_custom' ? 'para cotizar' : 'en la web'}
                            </span>
                            {searchQuery && (
                                <span className={styles.searchTag}>
                                    Filtro: "{searchQuery}"
                                    <button onClick={() => setSearchQuery('')}>✕</button>
                                </span>
                            )}
                        </div>

                        {/* Products Display (Organized and Grouped by Category with Titles) */}
                        {currentDisplayProducts.length === 0 ? (
                            <div className={styles.emptyResults}>
                                <span className={styles.emptyIcon}>🔎</span>
                                <h3>No encontramos artículos con ese criterio</h3>
                                <p>Prueba buscando con otra palabra o selecciona otra categoría.</p>
                                <button
                                    className={styles.resetFilterBtn}
                                    onClick={() => {
                                        setSearchQuery('');
                                        if (catalogSource === 'box_custom') setSelectedBoxCategory('all');
                                        else setSelectedWebCategory('all');
                                    }}
                                >
                                    Ver todas las categorías
                                </button>
                            </div>
                        ) : (
                            <div className={styles.categorySectionsContainer}>
                                {catalogSource === 'box_custom' ? (
                                    groupedBoxProducts.map(group => (
                                        <div key={group.id} className={styles.categorySectionGroup} id={`cat-${group.id}`}>
                                            <div className={styles.categorySectionHeader}>
                                                <div className={styles.categoryTitleWrapper}>
                                                    <span className={styles.categoryHeaderIcon}>{group.icon}</span>
                                                    <div>
                                                        <h3 className={styles.categorySectionTitle}>{group.name}</h3>
                                                        <p className={styles.categorySectionDesc}>
                                                            {group.description || `${group.products.length} artículos disponibles para cotizar`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className={styles.categoryCountBadge}>
                                                    {group.products.length} {group.products.length === 1 ? 'artículo' : 'artículos'}
                                                </span>
                                            </div>

                                            <div className={styles.productsGrid}>
                                                {group.products.map(product => renderProductCard(product, false))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    groupedWebProducts.map(group => (
                                        <div key={group.id} className={styles.categorySectionGroup} id={`web-cat-${group.id}`}>
                                            <div className={styles.categorySectionHeader}>
                                                <div className={styles.categoryTitleWrapper}>
                                                    <span className={styles.categoryHeaderIcon}>{group.icon}</span>
                                                    <div>
                                                        <h3 className={styles.categorySectionTitle}>{group.name}</h3>
                                                        <p className={styles.categorySectionDesc}>
                                                            Productos oficiales de la tienda web BreakLab
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className={styles.categoryCountBadge}>
                                                    {group.products.length} {group.products.length === 1 ? 'artículo' : 'artículos'}
                                                </span>
                                            </div>

                                            <div className={styles.productsGrid}>
                                                {group.products.map(product => renderProductCard(product, true))}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </section>
                </div>

                {/* Right Column: Live Box Summary Sidebar (Desktop) */}
                <aside className={styles.summarySidebar}>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryHeader}>
                            <div className={styles.summaryTitleRow}>
                                <span className={styles.summaryIcon}>🎁</span>
                                <h2>Tu Ancheta / Box</h2>
                            </div>
                            {totalItemsCount > 0 && (
                                <button className={styles.resetSummaryBtn} onClick={handleResetBox} title="Reiniciar selección">
                                    ↺ Limpiar
                                </button>
                            )}
                        </div>

                        {/* Selected Base Indicator */}
                        <div className={styles.summaryBaseBadge}>
                            <div className={styles.summaryBaseInfo}>
                                <span className={styles.summaryBaseIcon}>{selectedBase.icon}</span>
                                <div>
                                    <div className={styles.summaryBaseLabel}>Base de regalo:</div>
                                    <div className={styles.summaryBaseName}>{selectedBase.name}</div>
                                </div>
                            </div>
                            <span className={styles.summaryBasePrice}>
                                {selectedBase.price === 0 ? 'Sin costo' : `$${selectedBase.price.toLocaleString('es-CO')}`}
                            </span>
                        </div>

                        {/* Selected Items List */}
                        <div className={styles.summaryItemsList}>
                            {itemsList.length === 0 ? (
                                <div className={styles.summaryEmptyState}>
                                    <div className={styles.emptyBoxIcon}>📦</div>
                                    <p className={styles.emptyBoxTitle}>Tu Box está vacía</p>
                                    <p className={styles.emptyBoxText}>Selecciona artículos del catálogo para armar tu regalo a medida.</p>
                                </div>
                            ) : (
                                <>
                                    {/* Exclusive Box customizable items (No predefined price) */}
                                    {boxItemsList.length > 0 && (
                                        <>
                                            <div className={styles.summaryGroupTitle}>
                                                🎁 Artículos para Box ({boxItemsCount} unid. - A Cotizar)
                                            </div>
                                            {boxItemsList.map(({ item, quantity }) => (
                                                <div key={item.id} className={styles.summaryItemRow}>
                                                    <img src={item.image || breakLabLogo} alt={item.name} className={styles.summaryItemImg} />
                                                    <div className={styles.summaryItemInfo}>
                                                        <div className={styles.summaryItemName}>{item.name}</div>
                                                        <div className={styles.summaryItemMeta}>
                                                            <span className={styles.summaryItemQuoteTag}>Para Cotizar</span>
                                                            <div className={styles.miniQtyControls}>
                                                                <button onClick={() => handleRemoveItem(item.id)}>-</button>
                                                                <span>{quantity}</span>
                                                                <button onClick={() => handleAddItem(item, false)}>+</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        className={styles.deleteItemBtn}
                                                        onClick={() => handleDeleteItem(item.id)}
                                                        title="Eliminar de la box"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            ))}
                                        </>
                                    )}

                                    {/* Web store products (with predefined prices) */}
                                    {webItemsList.length > 0 && (
                                        <>
                                            <div className={styles.summaryGroupTitle}>
                                                🌐 Productos Web ({webItemsCount} unid.)
                                            </div>
                                            {webItemsList.map(({ item, quantity }) => (
                                                <div key={item.id} className={styles.summaryItemRow}>
                                                    <img src={item.image || breakLabLogo} alt={item.name} className={styles.summaryItemImg} />
                                                    <div className={styles.summaryItemInfo}>
                                                        <div className={styles.summaryItemName}>{item.name}</div>
                                                        <div className={styles.summaryItemMeta}>
                                                            <span>${item.price?.toLocaleString('es-CO')} c/u</span>
                                                            <div className={styles.miniQtyControls}>
                                                                <button onClick={() => handleRemoveItem(item.id)}>-</button>
                                                                <span>{quantity}</span>
                                                                <button onClick={() => handleAddItem(item, true)}>+</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.summaryItemSubtotal}>
                                                        ${((item.price || 0) * quantity).toLocaleString('es-CO')}
                                                        <button
                                                            className={styles.deleteItemBtn}
                                                            onClick={() => handleDeleteItem(item.id)}
                                                            title="Eliminar de la box"
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Step 3: Card Dedication & Client Indications / Recommendations */}
                        <div className={styles.personalizationBlock}>
                            <div className={styles.personalizationTitle}>
                                💌 Destinatario y Tarjeta
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="recipient-name">¿Para quién es? (Opcional):</label>
                                <input
                                    id="recipient-name"
                                    type="text"
                                    className={styles.inputField}
                                    placeholder="Ej: Mamá, Pareja, Laura, Carlos..."
                                    value={recipientName}
                                    onChange={(e) => setRecipientName(e.target.value)}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="card-dedication">Dedicatoria para la tarjeta:</label>
                                <textarea
                                    id="card-dedication"
                                    rows="2"
                                    className={styles.textareaField}
                                    placeholder="Mensaje especial para imprimir en la tarjeta..."
                                    value={dedicationMessage}
                                    onChange={(e) => setDedicationMessage(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Recommendations & Specific Instructions Box */}
                        <div className={styles.recommendationsBlock}>
                            <div className={styles.recommendationsTitle}>
                                <span>📝</span> Recomendaciones para Cotizar
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="client-notes">
                                    Indicaciones especiales de lo que deseas:
                                </label>
                                <textarea
                                    id="client-notes"
                                    rows="3"
                                    className={styles.textareaFieldNotes}
                                    placeholder="Cuéntanos aquí cómo imaginas tu regalo: fotos que enviarás para sublimar, colores o temáticas (anime, series, amor...), nombres o fechas especiales, sabores preferidos..."
                                    value={clientNotes}
                                    onChange={(e) => setClientNotes(e.target.value)}
                                />
                                <p className={styles.notesHelpText}>
                                    💡 Llegará directo a WhatsApp con tu lista tipo carrito para darte la cotización exacta y opciones de diseño.
                                </p>
                            </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className={styles.priceBreakdown}>
                            <div className={styles.priceRow}>
                                <span>Base de empaque</span>
                                <span>{basePrice === 0 ? 'Sin costo adicional' : `$${basePrice.toLocaleString('es-CO')}`}</span>
                            </div>
                            {boxItemsCount > 0 && (
                                <div className={styles.priceRow}>
                                    <span>Artículos para Box ({boxItemsCount})</span>
                                    <span className={styles.summaryItemQuoteTag}>A Cotizar por WhatsApp</span>
                                </div>
                            )}
                            {webItemsCount > 0 && (
                                <div className={styles.priceRow}>
                                    <span>Productos Web ({webItemsCount})</span>
                                    <span>${webSubtotal.toLocaleString('es-CO')}</span>
                                </div>
                            )}
                            <div className={`${styles.priceRow} ${styles.priceRowTotal}`}>
                                <span>Total Box</span>
                                <span className={styles.totalPriceValue}>
                                    {totalPrice > 0 ? `$${totalPrice.toLocaleString('es-CO')} COP*` : 'A Cotizar*'}
                                </span>
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#8d6e63', textAlign: 'right', marginTop: '-4px' }}>
                                *Artículos personalizados sujetos a cotización
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className={styles.summaryActions}>
                            <button
                                className={styles.orderWhatsAppBtn}
                                onClick={handleOrderWhatsApp}
                            >
                                💬 Cotizar Box por WhatsApp (Carrito e Indicaciones)
                            </button>
                            <button
                                className={styles.addToCartBtn}
                                onClick={handleAddBoxToCart}
                            >
                                🛒 Agregar Box al Carrito Web
                            </button>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Mobile Bottom Sticky Bar */}
            <div className={styles.mobileBottomBar}>
                <div className={styles.mobileBarInfo}>
                    <div className={styles.mobileBarCount}>
                        🎁 <strong>{totalItemsCount}</strong> items ({boxItemsCount} a cotizar)
                    </div>
                    <div className={styles.mobileBarPrice}>
                        {totalPrice > 0 ? `Subtotal: $${totalPrice.toLocaleString('es-CO')}` : 'Cotización WhatsApp'}
                    </div>
                </div>
                <button
                    className={styles.mobileViewSummaryBtn}
                    onClick={() => setIsMobileSummaryOpen(true)}
                >
                    Ver Lista y Cotizar →
                </button>
            </div>

            {/* Mobile Drawer / Sheet Modal */}
            {isMobileSummaryOpen && (
                <div className={styles.mobileModalBackdrop} onClick={() => setIsMobileSummaryOpen(false)}>
                    <div className={styles.mobileModalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.mobileModalHeader}>
                            <div className={styles.summaryTitleRow}>
                                <span className={styles.summaryIcon}>🎁</span>
                                <h2>Tu Box ({totalItemsCount} items)</h2>
                            </div>
                            <button className={styles.closeModalBtn} onClick={() => setIsMobileSummaryOpen(false)}>
                                ✕
                            </button>
                        </div>

                        <div className={styles.mobileModalBody}>
                            {/* Selected Base Indicator */}
                            <div className={styles.summaryBaseBadge}>
                                <div className={styles.summaryBaseInfo}>
                                    <span className={styles.summaryBaseIcon}>{selectedBase.icon}</span>
                                    <div>
                                        <div className={styles.summaryBaseLabel}>Base seleccionada:</div>
                                        <div className={styles.summaryBaseName}>{selectedBase.name}</div>
                                    </div>
                                </div>
                                <span className={styles.summaryBasePrice}>
                                    {selectedBase.price === 0 ? 'Sin costo' : `$${selectedBase.price.toLocaleString('es-CO')}`}
                                </span>
                            </div>

                            {/* Items list */}
                            <div className={styles.summaryItemsList}>
                                {itemsList.length === 0 ? (
                                    <div className={styles.summaryEmptyState}>
                                        <p className={styles.emptyBoxTitle}>Aún no has agregado productos</p>
                                    </div>
                                ) : (
                                    <>
                                        {boxItemsList.length > 0 && (
                                            <>
                                                <div className={styles.summaryGroupTitle}>
                                                    🎁 Artículos para Box ({boxItemsCount} unid. - A Cotizar)
                                                </div>
                                                {boxItemsList.map(({ item, quantity }) => (
                                                    <div key={item.id} className={styles.summaryItemRow}>
                                                        <img src={item.image || breakLabLogo} alt={item.name} className={styles.summaryItemImg} />
                                                        <div className={styles.summaryItemInfo}>
                                                            <div className={styles.summaryItemName}>{item.name}</div>
                                                            <div className={styles.summaryItemMeta}>
                                                                <span className={styles.summaryItemQuoteTag}>Para Cotizar</span>
                                                                <div className={styles.miniQtyControls}>
                                                                    <button onClick={() => handleRemoveItem(item.id)}>-</button>
                                                                    <span>{quantity}</span>
                                                                    <button onClick={() => handleAddItem(item, false)}>+</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className={styles.deleteItemBtn}
                                                            onClick={() => handleDeleteItem(item.id)}
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                ))}
                                            </>
                                        )}

                                        {webItemsList.length > 0 && (
                                            <>
                                                <div className={styles.summaryGroupTitle}>
                                                    🌐 Productos Web ({webItemsCount} unid.)
                                                </div>
                                                {webItemsList.map(({ item, quantity }) => (
                                                    <div key={item.id} className={styles.summaryItemRow}>
                                                        <img src={item.image || breakLabLogo} alt={item.name} className={styles.summaryItemImg} />
                                                        <div className={styles.summaryItemInfo}>
                                                            <div className={styles.summaryItemName}>{item.name}</div>
                                                            <div className={styles.summaryItemMeta}>
                                                                <span>${item.price?.toLocaleString('es-CO')} c/u</span>
                                                                <div className={styles.miniQtyControls}>
                                                                    <button onClick={() => handleRemoveItem(item.id)}>-</button>
                                                                    <span>{quantity}</span>
                                                                    <button onClick={() => handleAddItem(item, true)}>+</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={styles.summaryItemSubtotal}>
                                                            ${((item.price || 0) * quantity).toLocaleString('es-CO')}
                                                            <button
                                                                className={styles.deleteItemBtn}
                                                                onClick={() => handleDeleteItem(item.id)}
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Dedication Form */}
                            <div className={styles.personalizationBlock}>
                                <div className={styles.personalizationTitle}>
                                    💌 Tarjeta y Destinatario
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="mobile-recipient-name">¿Para quién es? (Opcional):</label>
                                    <input
                                        id="mobile-recipient-name"
                                        type="text"
                                        className={styles.inputField}
                                        placeholder="Ej: Mamá, Pareja, Laura..."
                                        value={recipientName}
                                        onChange={(e) => setRecipientName(e.target.value)}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="mobile-card-dedication">Dedicatoria para la tarjeta:</label>
                                    <textarea
                                        id="mobile-card-dedication"
                                        rows="2"
                                        className={styles.textareaField}
                                        placeholder="Escribe el mensaje emotivo que imprimiremos..."
                                        value={dedicationMessage}
                                        onChange={(e) => setDedicationMessage(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Recommendations Form */}
                            <div className={styles.recommendationsBlock}>
                                <div className={styles.recommendationsTitle}>
                                    <span>📝</span> Indicaciones y Recomendaciones
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="mobile-client-notes">
                                        Detalles de lo que deseas para cotizar:
                                    </label>
                                    <textarea
                                        id="mobile-client-notes"
                                        rows="3"
                                        className={styles.textareaFieldNotes}
                                        placeholder="Fotos a incluir, colores, nombres, sabores de gelatorta o detalles especiales..."
                                        value={clientNotes}
                                        onChange={(e) => setClientNotes(e.target.value)}
                                    />
                                    <p className={styles.notesHelpText}>
                                        💡 Se enviará a WhatsApp en formato carrito de compras para cotizarte.
                                    </p>
                                </div>
                            </div>

                            {/* Total and Actions */}
                            <div className={styles.priceBreakdown}>
                                <div className={`${styles.priceRow} ${styles.priceRowTotal}`}>
                                    <span>Total Box</span>
                                    <span className={styles.totalPriceValue}>
                                        {totalPrice > 0 ? `$${totalPrice.toLocaleString('es-CO')} COP*` : 'A Cotizar*'}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.72rem', color: '#8d6e63', textAlign: 'right', marginTop: '-4px' }}>
                                    *Artículos de box sujetos a cotización personalizada
                                </div>
                            </div>

                            <div className={styles.summaryActions}>
                                <button
                                    className={styles.orderWhatsAppBtn}
                                    onClick={handleOrderWhatsApp}
                                >
                                    💬 Cotizar Box por WhatsApp (Carrito e Indicaciones)
                                </button>
                                <button
                                    className={styles.addToCartBtn}
                                    onClick={handleAddBoxToCart}
                                >
                                    🛒 Agregar Box al Carrito Web
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Preview Lightbox Modal */}
            {previewProduct && (
                <div
                    className={styles.lightboxBackdrop}
                    onClick={handleClosePreview}
                >
                    <div
                        className={`${styles.lightboxCard} ${isImageZoomed ? styles.lightboxCardZoomMode : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={styles.lightboxCloseBtn}
                            onClick={handleClosePreview}
                            aria-label="Cerrar vista ampliada"
                            title="Cerrar (Esc)"
                        >
                            ✕
                        </button>

                        <div
                            className={`${styles.lightboxImgWrapper} ${isImageZoomed ? styles.lightboxImgWrapperZoomed : ''}`}
                            onClick={() => setIsImageZoomed(prev => !prev)}
                            title={isImageZoomed ? 'Clic para reducir' : 'Clic para ampliar imagen al máximo'}
                        >
                            {previewProduct.image?.endsWith?.('.mp4') ? (
                                <video
                                    src={previewProduct.image}
                                    className={styles.lightboxImg}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    controls
                                />
                            ) : (
                                <img
                                    src={previewProduct.image || breakLabLogo}
                                    alt={previewProduct.name}
                                    className={`${styles.lightboxImg} ${isImageZoomed ? styles.lightboxImgZoomed : ''}`}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = breakLabLogo;
                                    }}
                                />
                            )}

                            <div className={styles.lightboxZoomHint}>
                                {isImageZoomed ? '🔍 Clic para reducir' : '🔍 Clic para zoom extra'}
                            </div>
                        </div>

                        <div className={styles.lightboxInfo}>
                            <div>
                                {previewProduct.categoryName && (
                                    <div className={styles.lightboxCategory}>
                                        📂 {previewProduct.categoryName}
                                    </div>
                                )}
                                <h2 className={styles.lightboxTitle}>
                                    {previewProduct.name}
                                </h2>
                                {previewProduct.subtitle && (
                                    <p className={styles.lightboxSubtitle}>
                                        {previewProduct.subtitle}
                                    </p>
                                )}
                                {previewProduct.description && (
                                    <div className={styles.lightboxDescription}>
                                        <p style={{ margin: 0 }}>{previewProduct.description}</p>
                                    </div>
                                )}
                            </div>

                            <div className={styles.lightboxActionRow}>
                                {previewProduct.price ? (
                                    <span className={styles.lightboxPriceTag}>
                                        ${previewProduct.price.toLocaleString('es-CO')} COP
                                    </span>
                                ) : (
                                    <span className={styles.quoteStatusTag}>
                                        ✨ Para Cotizar
                                    </span>
                                )}

                                {/* Add / Quantity controls inside modal */}
                                {(() => {
                                    const inBoxItem = selectedItems[previewProduct.id];
                                    const inBoxQty = inBoxItem ? inBoxItem.quantity : 0;
                                    const isWeb = catalogSource === 'web_catalog';

                                    return inBoxQty === 0 ? (
                                        <button
                                            className={styles.addBtn}
                                            onClick={() => handleAddItem(previewProduct, isWeb)}
                                        >
                                            <span>+</span> Elegir para mi Box
                                        </button>
                                    ) : (
                                        <div className={styles.qtyControls}>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => handleRemoveItem(previewProduct.id)}
                                                aria-label="Disminuir cantidad"
                                            >
                                                -
                                            </button>
                                            <span className={styles.qtyDisplay}>{inBoxQty}</span>
                                            <button
                                                className={styles.qtyBtn}
                                                onClick={() => handleAddItem(previewProduct, isWeb)}
                                                aria-label="Aumentar cantidad"
                                            >
                                                +
                                            </button>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};