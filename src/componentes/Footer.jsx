import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer_content}>
                <div className={styles.col}>
                    <h3 className={styles.logo}>🎁 BreakLab</h3>
                    <p className={styles.desc}>Sorpresas que enamoran desde 2020</p>
                    <div className={styles.info_item}>
                        <span>📍</span> <p>Bogotá, Colombia</p>
                    </div>
                    <div className={styles.info_item}>
                        <span>📞</span> <p>+57 320 873 8961</p>
                    </div>
                    <div className={styles.info_item}>
                        <span>✉️</span> <p>breaklab.colombia@gmail.com</p>
                    </div>
                </div>
                <div className={styles.col}>
                    <h3>Categorías</h3>
                    <ul>
                        <li><Link to="/Crea_tu_Box" className={styles.footer_link}>Crea tu Box</Link></li>
                        <li><Link to="/Personalizamos" className={styles.footer_link}>Personalizamos</Link></li>
                        <li><Link to="/" className={styles.footer_link}>Productos Destacados</Link></li>
                        <li><Link to="/" className={styles.footer_link}>Los Más Vendidos</Link></li>
                    </ul>
                </div>
                <div className={styles.col}>
                    <h3>Información</h3>
                    <ul>
                        <li><Link to="/info/sobre-nosotros" className={styles.footer_link}>Sobre Nosotros</Link></li>
                        <li><Link to="/info/envios-entregas" className={styles.footer_link}>Envíos y Entregas</Link></li>
                        <li><Link to="/info/medios-pago" className={styles.footer_link}>Medios de Pago</Link></li>
                        <li><Link to="/info/terminos-condiciones" className={styles.footer_link}>Términos y Condiciones</Link></li>
                        <li><Link to="/info/politica-privacidad" className={styles.footer_link}>Política de Privacidad</Link></li>
                    </ul>
                </div>
                <div className={styles.col}>
                    <h3>Síguenos</h3>
                    <ul className={styles.social_list}>
                        <li><a href="https://wa.me/573208738961" target="_blank" rel="noreferrer" className={styles.footer_link}><span>📱</span> WhatsApp</a></li>
                        <li><a href="https://www.facebook.com/profile.php?id=61573469891570&locale=es_LA" target="_blank" rel="noreferrer" className={styles.footer_link}><span>📘</span> Facebook</a></li>
                        <li><a href="https://www.tiktok.com/@breaklab6" target="_blank" rel="noreferrer" className={styles.footer_link}><span>🎵</span> TikTok</a></li>
                        <li><a href="https://www.instagram.com/breaklab_factory/" target="_blank" rel="noreferrer" className={styles.footer_link}><span>📸</span> Instagram</a></li>
                    </ul>
                </div>
            </div>
            <div className={styles.footer_bottom}>
                <p>© 2026 BreakLab - Todos los derechos reservados | Hecho con 💝 para sorprender</p>
            </div>
        </footer>
    )
}
