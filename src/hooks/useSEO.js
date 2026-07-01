import { useEffect } from 'react';

/**
 * Hook para optimizar dinámicamente el SEO en cada ruta de una SPA React.
 * Admite metatítulos, descripciones, palabras clave, URL canónicas, Open Graph, Twitter Cards y JSON-LD.
 */
export function useSEO({
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    canonical,
    schema
}) {
    useEffect(() => {
        // Helper para convertir rutas relativas a URLs absolutas (esencial para buscadores y redes sociales)
        const getAbsoluteUrl = (path) => {
            if (!path) return '';
            if (/^https?:\/\//i.test(path)) return path;
            const cleanPath = path.startsWith('/') ? path : `/${path}`;
            return `${window.location.origin}${cleanPath}`;
        };

        // 1. Título de la página
        if (title) {
            document.title = title;
        }

        // Helper para crear o actualizar etiquetas meta
        const updateOrCreateMeta = (attrName, attrVal, contentVal) => {
            if (contentVal === undefined || contentVal === null) return;
            let meta = document.querySelector(`meta[${attrName}="${attrVal}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute(attrName, attrVal);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', contentVal);
        };

        // 2. Metadatos Estándar
        updateOrCreateMeta('name', 'description', description);
        updateOrCreateMeta('name', 'keywords', keywords);

        // 3. Open Graph (Para redes sociales y mensajería como WhatsApp)
        updateOrCreateMeta('property', 'og:title', ogTitle || title);
        updateOrCreateMeta('property', 'og:description', ogDescription || description);
        updateOrCreateMeta('property', 'og:image', getAbsoluteUrl(ogImage || '/break_lab_logo.png'));
        updateOrCreateMeta('property', 'og:url', getAbsoluteUrl(ogUrl || (window.location.origin + window.location.pathname)));
        updateOrCreateMeta('property', 'og:type', 'website');

        // 4. Twitter Cards
        updateOrCreateMeta('name', 'twitter:card', 'summary_large_image');
        updateOrCreateMeta('name', 'twitter:title', ogTitle || title);
        updateOrCreateMeta('name', 'twitter:description', ogDescription || description);
        updateOrCreateMeta('name', 'twitter:image', getAbsoluteUrl(ogImage || '/break_lab_logo.png'));

        // 5. Enlace Canónico (Evita penalizaciones por contenido duplicado, limpia query parameters y hash)
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        const hrefVal = canonical ? getAbsoluteUrl(canonical) : (window.location.origin + window.location.pathname);
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', hrefVal);

        // 6. Esquema de Datos Estructurados JSON-LD
        let schemaScript = document.getElementById('jsonld-schema');
        if (schema) {
            if (!schemaScript) {
                schemaScript = document.createElement('script');
                schemaScript.setAttribute('type', 'application/ld+json');
                schemaScript.setAttribute('id', 'jsonld-schema');
                document.head.appendChild(schemaScript);
            }
            schemaScript.innerHTML = JSON.stringify(schema);
        } else {
            if (schemaScript) {
                schemaScript.remove();
            }
        }

        // Cleanup al desmontar el componente
        return () => {
            // El esquema se elimina o actualiza al cambiar de ruta, pero limpiamos el script si no se provee
            const currentSchema = document.getElementById('jsonld-schema');
            if (currentSchema && !schema) {
                currentSchema.remove();
            }
        };
    }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, canonical, schema]);
}
