import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { sunData } from '../data/planetData';

interface SunProps {
  onClick: () => void;
  isSelected: boolean;
}

export const Sun = ({ onClick, isSelected }: SunProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      
      // Pulsing effect for the sun
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Sun Corona Effect */}
      <mesh>
        <sphereGeometry args={[sunData.radius * 1.2, 32, 32]} />
        <meshBasicMaterial 
          color={sunData.color} 
          transparent 
          opacity={0.3}
        />
      </mesh>
      
      {/* Main Sun */}
      <mesh 
        ref={meshRef}
        onClick={onClick}
        scale={isSelected ? 1.2 : 1}
      >
        <sphereGeometry args={[sunData.radius, 32, 32]} />
        <meshBasicMaterial 
          color={sunData.color}
        />
      </mesh>
      
      {/* Selection glow */}
      {isSelected && (
        <mesh>
          <sphereGeometry args={[sunData.radius * 1.5, 32, 32]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.2}
          />
        </mesh>
      )}
    </group>
  );
};