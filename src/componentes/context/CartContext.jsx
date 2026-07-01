import React, { createContext, useState, useContext } from 'react';

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

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
