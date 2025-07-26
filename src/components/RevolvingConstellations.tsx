import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Group } from 'three';
import { Constellation } from './Constellation';
import { constellations, ConstellationData } from '../data/constellationData';

interface RevolvingConstellationsProps {
  showOrbits: boolean;
  animationSpeed: number;
  selectedConstellation: ConstellationData | null;
  onConstellationClick: (constellation: ConstellationData) => void;
}

export const RevolvingConstellations = ({ 
  showOrbits, 
  animationSpeed, 
  selectedConstellation, 
  onConstellationClick 
}: RevolvingConstellationsProps) => {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005 * animationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      {constellations.map((constellation, index) => {
        const angle = (index / constellations.length) * Math.PI * 2;
        const radius = 30;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <group key={constellation.name} position={[x, 0, z]}>
            <Constellation
              constellation={constellation}
              isVisible={showOrbits}
              onClick={() => onConstellationClick(constellation)}
              isSelected={selectedConstellation?.name === constellation.name}
            />
          </group>
        );
      })}
    </group>
  );
};