import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { planetData } from '../data/planetData';
import { PlanetInfo } from './PlanetInfo';
import { SystemControls } from './SystemControls';

export const SolarSystem = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showOrbits, setShowOrbits] = useState(true);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Three.js Canvas */}
      <Canvas 
        camera={{ 
          position: [0, 30, 45], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        className="bg-space-deep"
      >
        <Suspense fallback={null}>
          {/* Enhanced Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 0, 0]} intensity={3} decay={0.8} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={0.5} 
            castShadow 
          />
          
          {/* Background stars */}
          <Stars 
            radius={500} 
            depth={100} 
            count={8000} 
            factor={6} 
            saturation={0.1} 
            fade 
            speed={0.5}
          />
          
          {/* Sun */}
          <Sun 
            onClick={() => setSelectedPlanet('sun')}
            isSelected={selectedPlanet === 'sun'}
          />
          
          {/* Planets with staggered rendering for performance */}
          {planetData.map((planet, index) => (
            <Planet
              key={planet.name}
              data={planet}
              animationSpeed={animationSpeed}
              showOrbit={showOrbits}
              onClick={() => setSelectedPlanet(planet.name)}
              isSelected={selectedPlanet === planet.name}
            />
          ))}
          
          {/* Camera controls with better settings */}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={15}
            maxDistance={120}
            autoRotate={false}
            autoRotateSpeed={0.5}
            dampingFactor={0.05}
            enableDamping={true}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />
        </Suspense>
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Header */}
        <div className="pointer-events-auto absolute top-6 left-6 right-6">
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-4 shadow-glow">
            <h1 className="text-2xl font-bold bg-gradient-nebula bg-clip-text text-transparent">
              🌌 AI Solar System Explorer
            </h1>
            <p className="text-muted-foreground mt-1">
              Click planets to explore • Drag to orbit • Scroll to zoom
            </p>
          </div>
        </div>
        
        {/* Controls */}
        <div className="pointer-events-auto absolute top-6 right-6">
          <SystemControls
            animationSpeed={animationSpeed}
            showOrbits={showOrbits}
            onSpeedChange={setAnimationSpeed}
            onOrbitToggle={setShowOrbits}
          />
        </div>
        
        {/* Planet Information Panel */}
        {selectedPlanet && (
          <div className="pointer-events-auto absolute bottom-6 left-6 right-6">
            <PlanetInfo
              planetName={selectedPlanet}
              onClose={() => setSelectedPlanet(null)}
            />
          </div>
        )}
        
        {/* Instructions for first-time users */}
        {!selectedPlanet && (
          <div className="pointer-events-none absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-card/60 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
              <p className="text-sm text-muted-foreground text-center">
                ✨ Click any celestial body to learn more about it
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};