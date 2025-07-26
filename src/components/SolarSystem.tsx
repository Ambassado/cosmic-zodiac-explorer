import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { planetData } from '../data/planetData';
import { PlanetInfo } from './PlanetInfo';
import { SystemControls } from './SystemControls';
import { Constellation } from './Constellation';
import { AstrologyPanel } from './AstrologyPanel';
import { ChatBot } from './ChatBot';
import { constellations, ConstellationData } from '../data/constellationData';

export const SolarSystem = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showOrbits, setShowOrbits] = useState(true);
  const [viewMode, setViewMode] = useState<'science' | 'astrology'>('science');
  const [selectedConstellation, setSelectedConstellation] = useState<ConstellationData | null>(null);
  const [showAstrologyPanel, setShowAstrologyPanel] = useState(false);

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
          
          {/* Planets - only shown in science mode */}
          {viewMode === 'science' && planetData.map((planet, index) => (
            <Planet
              key={planet.name}
              data={planet}
              animationSpeed={animationSpeed}
              showOrbit={showOrbits}
              onClick={() => setSelectedPlanet(planet.name)}
              isSelected={selectedPlanet === planet.name}
            />
          ))}

          {/* Constellations - arranged in circular pattern around sun */}
          {viewMode === 'astrology' && constellations.map((constellation, index) => {
            const angle = (index / constellations.length) * Math.PI * 2;
            const radius = 35;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            return (
              <group key={constellation.name} position={[x, 0, z]}>
                <Constellation
                  constellation={constellation}
                  isVisible={showOrbits}
                  onClick={() => {
                    setSelectedConstellation(constellation);
                    setShowAstrologyPanel(true);
                  }}
                  isSelected={selectedConstellation?.name === constellation.name}
                />
              </group>
            );
          })}

          {/* Sun - positioned at center of constellation circle */}
          {viewMode === 'astrology' && (
            <Sun 
              onClick={() => setSelectedPlanet('sun')}
              isSelected={selectedPlanet === 'sun'}
            />
          )}
          
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
              {viewMode === 'science' ? '🌌 AI Solar System Explorer' : '✨ Celestial Astrology Guide'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {viewMode === 'science' 
                ? 'Click planets to explore • Drag to orbit • Scroll to zoom'
                : 'Enter birth date • Click constellations • Discover your zodiac'
              }
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
            viewMode={viewMode}
            onViewModeChange={(mode) => {
              setViewMode(mode);
              setSelectedPlanet(null);
              setSelectedConstellation(null);
              setShowAstrologyPanel(false);
            }}
          />
        </div>
        
        {/* Planet Information Panel - Science Mode */}
        {viewMode === 'science' && selectedPlanet && (
          <div className="pointer-events-auto absolute bottom-6 left-6 right-6">
            <PlanetInfo
              planetName={selectedPlanet}
              onClose={() => setSelectedPlanet(null)}
            />
          </div>
        )}

        {/* Astrology Panel - Astrology Mode */}
        {viewMode === 'astrology' && showAstrologyPanel && (
          <div className="pointer-events-auto absolute bottom-6 left-6 right-6">
            <AstrologyPanel
              selectedConstellation={selectedConstellation}
              onClose={() => {
                setShowAstrologyPanel(false);
                setSelectedConstellation(null);
              }}
              onConstellationSelect={(constellation) => {
                setSelectedConstellation(constellation);
              }}
            />
          </div>
        )}
        
        {/* Instructions for first-time users */}
        {viewMode === 'science' && !selectedPlanet && (
          <div className="pointer-events-none absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-card/60 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
              <p className="text-sm text-muted-foreground text-center">
                🌍 Click any planet to learn fascinating facts
              </p>
            </div>
          </div>
        )}

        {viewMode === 'astrology' && !showAstrologyPanel && (
          <div className="pointer-events-auto absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div 
              className="bg-card/60 backdrop-blur-sm border border-border rounded-lg px-4 py-2 cursor-pointer hover:bg-card/80 transition-all"
              onClick={() => setShowAstrologyPanel(true)}
            >
              <p className="text-sm text-muted-foreground text-center">
                ✨ Click here to discover your zodiac sign
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* AI ChatBot */}
      <ChatBot />
    </div>
  );
};