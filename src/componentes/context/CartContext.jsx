import React, { createContext, useState, useContext } from 'react';
import { getProductById } from '../../data/products';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (products) => {
        // products can be a single product or an array of products
        const itemsToAdd = Array.isArray(products) ? products : [products];
        
        setCartItems(prev => {
            let newItems = [...prev];
            itemsToAdd.forEach(product => {
                const existingIndex = newItems.findIndex(item => item.id === product.id);
                if (existingIndex >= 0) {
                    newItems[existingIndex].quantity += product.quantity;
                } else {
                    newItems.push(product);
                }
            });
            return newItems;
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, amount) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + amount);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const updateCartItemOptions = (id, newOptions) => {
        setCartItems(prev => {
            const idx = prev.findIndex(item => item.id === id);
            if (idx === -1) return prev;
            
            const item = prev[idx];
            const product = getProductById(item.productId);
            if (!product) return prev;
            
            const optString = Object.values(newOptions).join(', ');
            const optId = Object.values(newOptions).join('-');
            const newId = `${item.productId}-${optId}`;

            let newImage = item.image;
            if (newOptions.color && product.colorImageMap && product.images) {
                const imgIdx = product.colorImageMap[newOptions.color];
                if (imgIdx !== undefined && product.images[imgIdx]) {
                    newImage = product.images[imgIdx];
                }
            }

            const updatedItem = {
                ...item,
                id: newId,
                name: `${product.name} (${optString})`,
                image: newImage,
                selectedOptions: newOptions
            };

            const existingIdx = prev.findIndex(other => other.id === newId);
            let newItems = [...prev];
            if (existingIdx !== -1 && existingIdx !== idx) {
                // If a product with the new options already exists, merge quantities
                newItems[existingIdx].quantity += item.quantity;
                newItems.splice(idx, 1);
            } else {
                newItems[idx] = updatedItem;
            }
            return newItems;
        });
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, updateCartItemOptions, isCartOpen, setIsCartOpen, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
