import React, { useEffect, useRef } from 'react';

export function MagicParticles() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000, isMoving: false });
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor(x, y, isClick = false) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 4 + 1;
                this.baseSize = this.size;
                
                // Random velocity
                const angle = Math.random() * Math.PI * 2;
                const speed = isClick ? Math.random() * 4 + 1 : Math.random() * 1.5 + 0.3;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed - (isClick ? 0.5 : 0.2); // slight upwards drift
                
                this.alpha = 1;
                this.fadeSpeed = isClick ? Math.random() * 0.015 + 0.01 : Math.random() * 0.02 + 0.01;
                
                // Sparkle color palette: Pink, Rose, Soft Gold, Violet
                const colors = ['#f78fa7', '#ea4335', '#fecb00', '#c084fc', '#d65b79'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                
                // Particle type: 0 = circle, 1 = star/sparkle, 2 = heart
                this.type = Math.floor(Math.random() * 3);
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.alpha -= this.fadeSpeed;
                
                // shrink slightly
                if (this.size > 0.2) {
                    this.size -= 0.05;
                }
            }

            draw(c) {
                c.save();
                c.globalAlpha = this.alpha;
                c.fillStyle = this.color;
                c.shadowBlur = 6;
                c.shadowColor = this.color;

                if (this.type === 0) {
                    // Circle
                    c.beginPath();
                    c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    c.fill();
                } else if (this.type === 1) {
                    // Sparkle Star shape
                    const cx = this.x;
                    const cy = this.y;
                    const spikes = 4;
                    const outerRadius = this.size * 2;
                    const innerRadius = this.size * 0.6;
                    
                    let rot = (Math.PI / 2) * 3;
                    let x = cx;
                    let y = cy;
                    const step = Math.PI / spikes;

                    c.beginPath();
                    c.moveTo(cx, cy - outerRadius);
                    for (let i = 0; i < spikes; i++) {
                        x = cx + Math.cos(rot) * outerRadius;
                        y = cy + Math.sin(rot) * outerRadius;
                        c.lineTo(x, y);
                        rot += step;

                        x = cx + Math.cos(rot) * innerRadius;
                        y = cy + Math.sin(rot) * innerRadius;
                        c.lineTo(x, y);
                        rot += step;
                    }
                    c.lineTo(cx, cy - outerRadius);
                    c.closePath();
                    c.fill();
                } else {
                    // Heart shape
                    const size = this.size * 2.2;
                    c.beginPath();
                    c.moveTo(this.x, this.y + size / 4);
                    c.bezierCurveTo(this.x + size / 2, this.y - size / 2, this.x + size, this.y + size / 3, this.x, this.y + size);
                    c.bezierCurveTo(this.x - size, this.y + size / 3, this.x - size / 2, this.y - size / 2, this.x, this.y + size / 4);
                    c.closePath();
                    c.fill();
                }
                c.restore();
            }
        }

        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
            mouseRef.current.isMoving = true;
            
            // Spawn 1-2 particles on movement
            if (Math.random() < 0.6) {
                particlesRef.current.push(new Particle(e.clientX, e.clientY));
            }
        };

        const handleMouseLeave = () => {
            mouseRef.current.isMoving = false;
        };

        const handleClick = (e) => {
            // Spawn a burst of 15 sparkles on click
            for (let i = 0; i < 15; i++) {
                particlesRef.current.push(new Particle(e.clientX, e.clientY, true));
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('click', handleClick);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Filter and draw active particles
            particlesRef.current = particlesRef.current.filter(p => p.alpha > 0 && p.size > 0.2);
            particlesRef.current.forEach(p => {
                p.update();
                p.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 99999,
            }}
        />
    );
}
