import React from 'react';
import { Card } from "@/components/ui/card";

interface Props {
  currentSection: string;
  sections: string[];
}

export default function ProgressBar({ currentSection, sections }: Props) {
  const getCurrentIndex = () => sections.indexOf(currentSection) + 1;

  const formatSectionName = (name: string) => {
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  return (
    <Card className="p-4 mb-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Progress</span>
          <span>Step {getCurrentIndex()} of {sections.length}</span>
        </div>
        
        <div className="relative">
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
              style={{ 
                width: `${(getCurrentIndex() / sections.length) * 100}%`
              }}
            />
          </div>
          
          <div className="mt-2 grid grid-cols-6 gap-2">
            {sections.map((section, index) => (
              <div 
                key={section}
                className={`text-xs text-center ${
                  index <= sections.indexOf(currentSection)
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-400'
                }`}
              >
                {formatSectionName(section)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}