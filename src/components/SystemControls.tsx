import { Button } from './ui/button';
import { Card } from './ui/card';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface SystemControlsProps {
  animationSpeed: number;
  showOrbits: boolean;
  onSpeedChange: (speed: number) => void;
  onOrbitToggle: (show: boolean) => void;
}

export const SystemControls = ({ 
  animationSpeed, 
  showOrbits, 
  onSpeedChange, 
  onOrbitToggle 
}: SystemControlsProps) => {
  const isPaused = animationSpeed === 0;

  const togglePlayPause = () => {
    onSpeedChange(isPaused ? 1 : 0);
  };

  const resetSpeed = () => {
    onSpeedChange(1);
  };

  return (
    <Card className="p-4 bg-card/80 backdrop-blur-sm border-border shadow-glow">
      <div className="space-y-4 min-w-[200px]">
        {/* Play/Pause Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={togglePlayPause}
            className="flex items-center gap-2"
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            {isPaused ? 'Play' : 'Pause'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={resetSpeed}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        {/* Speed Control */}
        <div className="space-y-2">
          <Label className="text-sm text-foreground">
            Animation Speed: {animationSpeed.toFixed(1)}x
          </Label>
          <Slider
            value={[animationSpeed]}
            onValueChange={(value) => onSpeedChange(value[0])}
            max={5}
            min={0}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Orbit Toggle */}
        <div className="flex items-center justify-between">
          <Label htmlFor="show-orbits" className="text-sm text-foreground">
            Show Orbits
          </Label>
          <Switch
            id="show-orbits"
            checked={showOrbits}
            onCheckedChange={onOrbitToggle}
          />
        </div>
      </div>
    </Card>
  );
};