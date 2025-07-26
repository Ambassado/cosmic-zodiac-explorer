import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X, Calendar, Moon, Ruler } from 'lucide-react';
import { planetData, sunData } from '../data/planetData';

interface PlanetInfoProps {
  planetName: string;
  onClose: () => void;
}

export const PlanetInfo = ({ planetName, onClose }: PlanetInfoProps) => {
  const planetInfo = planetName === 'sun' 
    ? { ...sunData, type: 'star' as const, moons: 0, discoveryYear: undefined }
    : planetData.find(p => p.name === planetName);

  if (!planetInfo) return null;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'terrestrial': return 'bg-nebula-blue/20 text-nebula-blue border-nebula-blue/50';
      case 'gas-giant': return 'bg-nebula-purple/20 text-nebula-purple border-nebula-purple/50';
      case 'star': return 'bg-cosmic-gold/20 text-cosmic-gold border-cosmic-gold/50';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="bg-card/90 backdrop-blur-md border-border shadow-cosmic">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {planetInfo.name}
            </h2>
            {'type' in planetInfo && (
              <Badge className={`mt-2 ${getTypeColor(planetInfo.type)}`}>
                {planetInfo.type === 'gas-giant' ? 'Gas Giant' : 
                 planetInfo.type === 'terrestrial' ? 'Terrestrial Planet' : 'Star'}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Stats */}
        {'moons' in planetInfo && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Moon className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Moons:</span>
              <span className="font-medium">{planetInfo.moons}</span>
            </div>
            
            {planetInfo.discoveryYear && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Discovered:</span>
                <span className="font-medium">
                  {planetInfo.discoveryYear < 0 ? 'Ancient' : planetInfo.discoveryYear}
                </span>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-sm">
              <Ruler className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Type:</span>
              <span className="font-medium capitalize">
                {planetInfo.type.replace('-', ' ')}
              </span>
            </div>
          </div>
        )}

        {/* Interesting Facts */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            Fascinating Facts
          </h3>
          <div className="space-y-2">
            {planetInfo.facts.map((fact, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {fact}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Card>
  );
};