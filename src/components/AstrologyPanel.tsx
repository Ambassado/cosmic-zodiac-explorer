import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Calendar, Star, Sparkles, X } from 'lucide-react';
import { getZodiacSign, ConstellationData } from '../data/constellationData';

interface AstrologyPanelProps {
  selectedConstellation: ConstellationData | null;
  onClose: () => void;
  onConstellationSelect: (constellation: ConstellationData | null) => void;
}

export const AstrologyPanel = ({ selectedConstellation, onClose, onConstellationSelect }: AstrologyPanelProps) => {
  const [birthDate, setBirthDate] = useState('');
  const [userSign, setUserSign] = useState<ConstellationData | null>(null);

  const handleBirthDateSubmit = () => {
    if (!birthDate) return;
    
    const date = new Date(birthDate);
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();
    
    const sign = getZodiacSign(month, day);
    setUserSign(sign);
    onConstellationSelect(sign);
  };

  const getElementColor = (element: string) => {
    switch (element) {
      case 'fire': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'earth': return 'bg-amber-600/20 text-amber-400 border-amber-600/50';
      case 'air': return 'bg-sky-500/20 text-sky-400 border-sky-500/50';
      case 'water': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Card className="bg-card/90 backdrop-blur-md border-border shadow-glow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="flex items-center gap-2 text-lg bg-gradient-mystic bg-clip-text text-transparent">
          <Sparkles className="w-5 h-5 text-primary" />
          Astrology Mode
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Birth Date Input */}
        <div className="space-y-2">
          <Label htmlFor="birthdate" className="flex items-center gap-2 text-sm font-medium">
            <Calendar className="w-4 h-4" />
            Enter Your Birth Date
          </Label>
          <div className="flex gap-2">
            <Input
              id="birthdate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleBirthDateSubmit}
              size="sm"
              className="px-4"
            >
              Find Sign
            </Button>
          </div>
        </div>

        {/* Current Selection */}
        {(selectedConstellation || userSign) && (
          <div className="space-y-3 p-4 rounded-lg bg-background/50 border border-border">
            {userSign && userSign === selectedConstellation && (
              <div className="flex items-center gap-2 text-sm text-primary">
                <Star className="w-4 h-4" />
                This is your zodiac sign!
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {(selectedConstellation || userSign)?.name}
              </h3>
              <Badge 
                variant="outline" 
                className={getElementColor((selectedConstellation || userSign)?.element || '')}
              >
                {(selectedConstellation || userSign)?.element}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {(selectedConstellation || userSign)?.dates}
            </p>
            
            <p className="text-sm leading-relaxed">
              {(selectedConstellation || userSign)?.description}
            </p>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Key Traits:</h4>
              <div className="flex flex-wrap gap-1">
                {(selectedConstellation || userSign)?.traits.map((trait, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs bg-secondary/50"
                  >
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!selectedConstellation && !userSign && (
          <div className="text-center p-4 rounded-lg bg-background/30 border border-dashed border-border">
            <p className="text-sm text-muted-foreground">
              Enter your birth date or click on a constellation in the sky to explore zodiac signs
            </p>
          </div>
        )}
        
        {/* Disclaimer */}
        <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
          ✨ For entertainment purposes only
        </div>
      </CardContent>
    </Card>
  );
};