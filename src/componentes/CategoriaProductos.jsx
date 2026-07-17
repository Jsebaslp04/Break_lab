import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './CategoriaProductos.module.css';
import { getCategoryProducts, getIncludedItems, getProductOptions } from '../data/products';
import { useSEO } from '../hooks/useSEO';
import { useCart } from './context/CartContext';

function ProductCard({ product, handleOpenAddToCartModal }) {
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
        <div className={styles.productCard}>
            <div className={styles.cardImageWrapper}>
                <Link to={`/producto/${product.id}`} className={styles.imageLink}>
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
                </Link>
                
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
                <Link to={`/producto/${product.id}`} className={styles.productNameLink}>
                    <h2 className={styles.productName}>{product.name}</h2>
                </Link>
                
                <p className={styles.productSubtitle}>{product.subtitle}</p>
                
                <hr className={styles.cardDivider} />
                
                <div className={styles.cardFooter}>
                    <span className={styles.productPrice}>
                        ${product.price.toLocaleString()}
                    </span>
                    
                    <button 
                        className={styles.addBtnMini}
                        onClick={() => handleOpenAddToCartModal(product)}
                    >
                        + Agregar
                    </button>
                </div>
            </div>
        </div>
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
    ]
};

export function CategoriaProductos() {
    const { id } = useParams();
    const categoriaId = id || 'kit-escolar';

    // Determine parent category and active subcategory
    let parentCategory = null;
    let matchedSubId = null;

    for (const parent in SUBCATEGORIES_CONFIG) {
        const found = SUBCATEGORIES_CONFIG[parent].find(sub => sub.id === categoriaId);
        if (found) {
            parentCategory = parent;
            matchedSubId = found.id;
            break;
        }
    }

    if (!parentCategory && SUBCATEGORIES_CONFIG[categoriaId]) {
        parentCategory = categoriaId;
    }

    const hasSubcategories = !!parentCategory;
    const subcategories = hasSubcategories ? SUBCATEGORIES_CONFIG[parentCategory] : [];

    const getInitialTab = () => {
        if (matchedSubId) return matchedSubId;
        if (hasSubcategories) return subcategories[0].id;
        return null;
    };

    const [activeTab, setActiveTab] = useState(getInitialTab());
    const [selectedOptions, setSelectedOptions] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [activeProductForModal, setActiveProductForModal] = useState(null);
    const [selectedSug, setSelectedSug] = useState({});
    const { addToCart } = useCart();

    const products = hasSubcategories ? getCategoryProducts(activeTab) : getCategoryProducts(categoriaId);

    const formatCategoryName = (str) => {
        return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const displayCategoryName = parentCategory ? formatCategoryName(parentCategory) : formatCategoryName(categoriaId);

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `${displayCategoryName} - BreakLab`,
        "description": `Colección de regalos personalizados y desayunos sorpresa en la categoría ${displayCategoryName}.`,
        "url": window.location.href,
        "numberOfItems": products.length,
        "itemListElement": products.map((prod, idx) => ({
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
        ogImage: products[0]?.image,
        schema: itemListSchema
    });
    
    useEffect(() => {
        window.scrollTo(0, 0);
        setSelectedOptions({});
        setShowModal(false);
        setActiveProductForModal(null);
        setSelectedSug({});
        
        if (matchedSubId) {
            setActiveTab(matchedSubId);
        } else if (hasSubcategories) {
            setActiveTab(subcategories[0].id);
        } else {
            setActiveTab(null);
        }
    }, [id, categoriaId, matchedSubId, hasSubcategories]);

    const getSelectedOption = (productId, optionName, defaultValue) => {
        return selectedOptions[`${productId}_${optionName}`] || defaultValue;
    };

    const handleSelectOption = (productId, optionName, choice) => {
        setSelectedOptions(prev => ({
            ...prev,
            [`${productId}_${optionName}`]: choice
        }));
    };

    const handleOpenAddToCartModal = (product) => {
        const options = getProductOptions(product);
        const selected = {};
        options.forEach(opt => {
            selected[opt.name] = getSelectedOption(product.id, opt.name, opt.default);
        });

        setActiveProductForModal({ product, selected });
        setShowModal(true);
    };

    const suggestedItems = [
        { id: 'mug', name: 'Mug Personalizado', icon: '☕', price: 15000 },
        { id: 'llavero', name: 'Llavero Especial', icon: '🔑', price: 8000 },
        { id: 'chocolates', name: 'Caja Chocolates', icon: '🍫', price: 12000 }
    ];

    const toggleSuggestion = (sugId) => {
        setSelectedSug(prev => ({ ...prev, [sugId]: !prev[sugId] }));
    };

    const handleAddSelected = () => {
        if (!activeProductForModal) return;

        const { product, selected } = activeProductForModal;
        const optString = Object.values(selected).join(', ');
        const optId = Object.values(selected).join('-');

        let selectedImage = product.image;
        if (selected.color && product.colorImageMap && product.images) {
            const imgIdx = product.colorImageMap[selected.color];
            if (imgIdx !== undefined && product.images[imgIdx]) {
                selectedImage = product.images[imgIdx];
            }
        }

        const productsToAdd = [{
            id: `${product.id}-${optId}`,
            productId: product.id,
            name: `${product.name} (${optString})`,
            price: product.price,
            quantity: 1,
            image: selectedImage,
            selectedOptions: { ...selected }
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
        setActiveProductForModal(null);
    };

    const handleAddOnlyMainProduct = () => {
        if (!activeProductForModal) return;

        const { product, selected } = activeProductForModal;
        const optString = Object.values(selected).join(', ');
        const optId = Object.values(selected).join('-');

        let selectedImage = product.image;
        if (selected.color && product.colorImageMap && product.images) {
            const imgIdx = product.colorImageMap[selected.color];
            if (imgIdx !== undefined && product.images[imgIdx]) {
                selectedImage = product.images[imgIdx];
            }
        }

        addToCart([{
            id: `${product.id}-${optId}`,
            productId: product.id,
            name: `${product.name} (${optString})`,
            price: product.price,
            quantity: 1,
            image: selectedImage,
            selectedOptions: { ...selected }
        }]);
        setShowModal(false);
        setSelectedSug({});
        setActiveProductForModal(null);
    };

    const hasSelection = Object.values(selectedSug).some(Boolean);

    return (
        <div className={styles.categoryContainer}>
            <h1 className={styles.categoryTitle}>{displayCategoryName}</h1>

            {hasSubcategories && (
                <div className={styles.tabContainer}>
                    {subcategories.map(sub => (
                        <button 
                            key={sub.id}
                            className={`${styles.tabBtn} ${activeTab === sub.id ? styles.tabActive : ''}`}
                            onClick={() => setActiveTab(sub.id)}
                        >
                            {sub.label}
                        </button>
                    ))}
                </div>
            )}
            
            <div className={styles.productsGrid}>
                {products.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        handleOpenAddToCartModal={handleOpenAddToCartModal} 
                    />
                ))}
            </div>


            {showModal && activeProductForModal && (
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
    );
}
