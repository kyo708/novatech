import React, { useEffect, useState } from 'react';
import './Confetti.css';

interface ConfettiParticle {
  id: number;
  color: string;
  size: number;
  left: number;
  delay: number;
  duration: number;
  isCircle: boolean;
}

export const Confetti: React.FC = () => {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    const colors = ['#3b82f6', '#6366f1', '#f97316', '#10b981', '#ec4899', '#facc15'];
    const list: ConfettiParticle[] = [];
    
    for (let i = 0; i < 80; i++) {
      list.push({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.floor(Math.random() * 8) + 6, // 6px to 14px
        left: Math.floor(Math.random() * 100), // 0% to 100%
        delay: Math.random() * 2, // 0s to 2s
        duration: Math.random() * 1.5 + 1.5, // 1.5s to 3s
        isCircle: Math.random() > 0.5
      });
    }
    setParticles(list);
  }, []);

  return (
    <div className="confetti-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti"
          style={{
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            borderRadius: p.isCircle ? '50%' : '0%'
          }}
        />
      ))}
    </div>
  );
};
export default Confetti;
