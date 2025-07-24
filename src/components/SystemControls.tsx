import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Play, Pause, RotateCcw, Eye, EyeOff, Telescope, Sparkles } from 'lucide-react';

interface SystemControlsProps {
  animationSpeed: number;
  showOrbits: boolean;
  onSpeedChange: (speed: number) => void;
  onOrbitToggle: (show: boolean) => void;
  viewMode: 'science' | 'astrology';
  onViewModeChange: (mode: 'science' | 'astrology') => void;
}

export const SystemControls = ({ 
  animationSpeed, 
  showOrbits, 
  onSpeedChange, 
  onOrbitToggle,
  viewMode,
  onViewModeChange
}: SystemControlsProps) => {
  const isPaused = animationSpeed === 0;

  return (
    <Card className="bg-card/80 backdrop-blur-sm border border-border shadow-glow">
      <CardContent className="p-4 space-y-4">
        {/* View Mode Toggle */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">View Mode</Label>
          <div className="flex gap-1 p-1 bg-background/50 rounded-md">
            <Button
              variant={viewMode === 'science' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('science')}
              className="flex-1 h-8"
            >
              <Telescope className="w-3 h-3 mr-1" />
              Science
            </Button>
            <Button
              variant={viewMode === 'astrology' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('astrology')}
              className="flex-1 h-8"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Astrology
            </Button>
          </div>
        </div>

        {/* Speed Control */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            {isPaused ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            Speed: {animationSpeed}x
          </Label>
          <Slider
            value={[animationSpeed]}
            onValueChange={(value) => onSpeedChange(value[0])}
            min={0}
            max={5}
            step={0.1}
            className="w-full"
          />
        </div>
        
        {/* Orbit Toggle */}
        <div className="flex items-center justify-between">
          <Label htmlFor="orbits" className="text-sm font-medium flex items-center gap-2">
            {showOrbits ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            Show {viewMode === 'science' ? 'Orbits' : 'Constellations'}
          </Label>
          <Switch
            id="orbits"
            checked={showOrbits}
            onCheckedChange={onOrbitToggle}
          />
        </div>
        
        {/* Reset Button */}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onSpeedChange(1)}
          className="w-full"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </CardContent>
    </Card>
  );
};