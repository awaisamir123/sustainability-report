import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle } from 'lucide-react';

export interface ReportTemplateProps {
  id: string;
  title: string;
  description: string;
  framework: string;
  coverImage?: string;
  color?: string;
  onClick: (id: string) => void;
  isSelected?: boolean;
}

export function ReportTemplateCard({
  id,
  title,
  description,
  framework,
  coverImage,
  color,
  onClick,
  isSelected = false
}: ReportTemplateProps) {
  
  return (
    <Card 
      className={`overflow-hidden h-full flex flex-col transition-all duration-200 ${
        isSelected ? 'border-primary ring-2 ring-primary' : 'hover:border-primary/50'
      }`}
    >
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline" style={color ? { backgroundColor: `${color}20`, color: color } : {}} className="font-medium">
            {framework}
          </Badge>
          {isSelected && (
            <CheckCircle className="h-5 w-5" style={color ? { color } : { color: 'var(--primary)' }} />
          )}
        </div>
      </CardHeader>
      <div className="relative h-40 bg-muted">
        {coverImage ? (
          <img 
            src={coverImage} 
            alt={`${title} template preview`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={color ? { backgroundColor: `${color}10` } : {}}>
            <FileText className="h-12 w-12" style={color ? { color: `${color}80` } : { color: 'var(--muted-foreground)' }} />
          </div>
        )}
      </div>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-lg mb-2">{title}</CardTitle>
        <CardDescription className="text-sm line-clamp-3">{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          variant={isSelected ? "default" : "outline"} 
          className="w-full" 
          onClick={() => onClick(id)}
          style={color && isSelected ? { backgroundColor: color, borderColor: color } : color ? { borderColor: color, color: color } : {}}
        >
          {isSelected ? 'Selected' : 'Select Template'}
        </Button>
      </CardFooter>
    </Card>
  );
}