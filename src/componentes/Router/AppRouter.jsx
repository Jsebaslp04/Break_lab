import React from "react";
import { Routes, Route } from "react-router-dom";
import { Inicio } from "../Inicio";
import { Crea_tu_Box } from "../Crea_tu_Box";
import { Personalizamos } from "../Personalizamos";
import { Contacto } from "../Contacto";
import { Informacion } from "../Informacion";
import { CategoriaProductos } from "../CategoriaProductos";
import { ProductoDetalle } from "../ProductoDetalle";
import { Cart } from "../Cart";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/Crea_tu_Box" element={<Crea_tu_Box />} />
            <Route path="/Personalizamos" element={<Personalizamos />} />
            <Route path="/Envios" element={<Inicio />} />
            <Route path="/Contacto" element={<Contacto />} />
            <Route path="/info/:seccion" element={<Informacion />} />
            <Route path="/categoria/:id" element={<CategoriaProductos />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/carrito" element={<Cart />} />
        </Routes>
    )
}