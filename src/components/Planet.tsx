import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group, RingGeometry, MeshBasicMaterial } from 'three';
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
  const orbitRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (groupRef.current && meshRef.current) {
      // Orbit around the sun
      groupRef.current.rotation.y += data.orbitSpeed * animationSpeed;
      
      // Planet rotation
      meshRef.current.rotation.y += data.rotationSpeed * animationSpeed;
      
      // Subtle floating animation for selection
      if (isSelected && meshRef.current) {
        const float = Math.sin(state.clock.elapsedTime * 3) * 0.1;
        meshRef.current.position.y = float;
      } else if (meshRef.current) {
        meshRef.current.position.y = 0;
      }
    }
  });

  // Create orbit ring geometry
  const orbitGeometry = new RingGeometry(data.distance - 0.02, data.distance + 0.02, 128);
  const orbitMaterial = new MeshBasicMaterial({ 
    color: data.color, 
    transparent: true, 
    opacity: showOrbit ? 0.3 : 0,
    side: 2 // DoubleSide
  });

  return (
    <group ref={groupRef}>
      {/* Orbit path */}
      <mesh 
        ref={orbitRef}
        rotation={[Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        geometry={orbitGeometry}
        material={orbitMaterial}
      />
      
      {/* Orbit glow effect */}
      {showOrbit && (
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <ringGeometry args={[data.distance - 0.1, data.distance + 0.1, 64]} />
          <meshBasicMaterial 
            color={data.color} 
            transparent 
            opacity={0.1}
            side={2}
          />
        </mesh>
      )}
      
      {/* Planet group */}
      <group position={[data.distance, 0, 0]}>
        {/* Planet atmosphere/glow */}
        <mesh>
          <sphereGeometry args={[data.radius * 1.1, 32, 32]} />
          <meshBasicMaterial 
            color={data.color}
            transparent 
            opacity={0.2}
          />
        </mesh>
        
        {/* Main planet */}
        <mesh 
          ref={meshRef}
          onClick={onClick}
          scale={isSelected ? 1.2 : 1}
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
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[data.radius * 1.3, data.radius * 1.5, 32]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.8}
              side={2}
            />
          </mesh>
        )}
        
        {/* Planet name label when selected */}
        {isSelected && (
          <group position={[0, data.radius + 0.8, 0]}>
            <mesh>
              <planeGeometry args={[2, 0.4]} />
              <meshBasicMaterial 
                color="#000000" 
                transparent 
                opacity={0.7}
              />
            </mesh>
          </group>
        )}
        
        {/* Special features for specific planets */}
        {data.name === 'Saturn' && (
          <>
            {/* Saturn's rings */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[data.radius * 1.2, data.radius * 2.2, 64]} />
              <meshLambertMaterial 
                color="#FAD5A5" 
                transparent 
                opacity={0.8}
                side={2}
              />
            </mesh>
            {/* Additional ring detail */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[data.radius * 1.5, data.radius * 1.8, 64]} />
              <meshLambertMaterial 
                color="#E6C79C" 
                transparent 
                opacity={0.6}
                side={2}
              />
            </mesh>
          </>
        )}
        
        {data.name === 'Jupiter' && (
          /* Jupiter's Great Red Spot effect */
          <mesh position={[0, 0, data.radius * 0.9]}>
            <sphereGeometry args={[data.radius * 0.2, 16, 16]} />
            <meshLambertMaterial 
              color="#FF6B6B"
              transparent
              opacity={0.8}
            />
          </mesh>
        )}
        
        {data.name === 'Earth' && (
          /* Earth's moon */
          <group>
            <mesh position={[data.radius * 2, 0, 0]}>
              <sphereGeometry args={[data.radius * 0.27, 16, 16]} />
              <meshLambertMaterial color="#C0C0C0" />
            </mesh>
          </group>
        )}
        
        {data.name === 'Mars' && (
          <>
            {/* Mars polar ice caps */}
            <mesh position={[0, data.radius * 0.8, 0]}>
              <sphereGeometry args={[data.radius * 0.3, 8, 8]} />
              <meshLambertMaterial color="#FFFFFF" transparent opacity={0.7} />
            </mesh>
            <mesh position={[0, -data.radius * 0.8, 0]}>
              <sphereGeometry args={[data.radius * 0.2, 8, 8]} />
              <meshLambertMaterial color="#FFFFFF" transparent opacity={0.7} />
            </mesh>
          </>
        )}
      </group>
    </group>
  );
};