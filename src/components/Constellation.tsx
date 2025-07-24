import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { ConstellationData } from '../data/constellationData';

interface ConstellationProps {
  constellation: ConstellationData;
  isVisible: boolean;
  onClick?: () => void;
  isSelected?: boolean;
}

export const Constellation = ({ constellation, isVisible, onClick, isSelected }: ConstellationProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && isVisible) {
      // Gentle rotation to show the constellation from different angles
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  if (!isVisible) return null;

  const getElementColor = (element: string) => {
    switch (element) {
      case 'fire': return '#ff6b35';
      case 'earth': return '#8b5a3c';
      case 'air': return '#87ceeb';
      case 'water': return '#4682b4';
      default: return '#ffffff';
    }
  };

  const elementColor = getElementColor(constellation.element);

  return (
    <group ref={groupRef} onClick={onClick}>
      {/* Render stars */}
      {constellation.stars.map((star, index) => (
        <Sphere
          key={star.id}
          args={[0.1 + (5 - star.magnitude) * 0.05, 8, 8]}
          position={[star.x, star.y, star.z]}
        >
          <meshBasicMaterial 
            color={elementColor}
            transparent
            opacity={isSelected ? 1 : 0.8}
          />
          {/* Star glow effect */}
          <Sphere args={[0.3 + (5 - star.magnitude) * 0.1, 8, 8]}>
            <meshBasicMaterial 
              color={elementColor}
              transparent
              opacity={0.2}
            />
          </Sphere>
        </Sphere>
      ))}
      
      {/* Render constellation lines */}
      {constellation.connections.map((connection, index) => {
        const start = constellation.stars[connection[0]];
        const end = constellation.stars[connection[1]];
        
        const points = [
          new THREE.Vector3(start.x, start.y, start.z),
          new THREE.Vector3(end.x, end.y, end.z)
        ];

        return (
          <Line
            key={`line-${index}`}
            points={points}
            color={elementColor}
            transparent
            opacity={isSelected ? 0.8 : 0.5}
            lineWidth={isSelected ? 3 : 2}
          />
        );
      })}
      
      {/* Constellation name label (floating text) */}
      {isSelected && (
        <group position={[constellation.stars[0].x, constellation.stars[0].y + 3, constellation.stars[0].z]}>
          <mesh>
            <planeGeometry args={[6, 1]} />
            <meshBasicMaterial 
              transparent 
              opacity={0.8}
              color="#000000"
            />
          </mesh>
        </group>
      )}
    </group>
  );
};