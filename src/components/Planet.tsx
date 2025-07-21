import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import { PlanetData } from '../data/planetData';

interface PlanetProps {
  data: PlanetData;
  animationSpeed: number;
  showOrbit: boolean;
  onClick: () => void;
  isSelected: boolean;
}

export const Planet = ({ data, animationSpeed, showOrbit, onClick, isSelected }: PlanetProps) => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (groupRef.current && meshRef.current) {
      // Orbit around the sun
      groupRef.current.rotation.y += data.orbitSpeed * animationSpeed;
      
      // Planet rotation
      meshRef.current.rotation.y += data.rotationSpeed * animationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Orbit line */}
      {showOrbit && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[data.distance - 0.05, data.distance + 0.05, 64]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.1}
          />
        </mesh>
      )}
      
      {/* Planet */}
      <mesh 
        ref={meshRef}
        position={[data.distance, 0, 0]}
        onClick={onClick}
        scale={isSelected ? 1.3 : 1}
      >
        <sphereGeometry args={[data.radius, 32, 32]} />
        <meshLambertMaterial 
          color={data.color}
          emissive={data.color}
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Selection ring */}
      {isSelected && (
        <mesh position={[data.distance, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[data.radius * 1.2, data.radius * 1.4, 32]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.8}
          />
        </mesh>
      )}
      
      {/* Planet label for easier identification */}
      {isSelected && (
        <mesh position={[data.distance, data.radius + 1, 0]}>
          {/* We'll add text rendering here later if needed */}
        </mesh>
      )}
      
      {/* Special rings for Saturn */}
      {data.name === 'Saturn' && (
        <mesh position={[data.distance, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[data.radius * 1.2, data.radius * 2, 64]} />
          <meshLambertMaterial 
            color="#FAD5A5" 
            transparent 
            opacity={0.6}
          />
        </mesh>
      )}
    </group>
  );
};