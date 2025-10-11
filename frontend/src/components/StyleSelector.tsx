import React from 'react';
import { CheckCircleIcon } from 'lucide-react';
type StyleOption = 'general' | 'professional' | 'friendly' | 'creative';
interface StyleSelectorProps {
  selectedStyle: StyleOption;
  onStyleChange: (style: StyleOption) => void;
}
export function StyleSelector({
  selectedStyle,
  onStyleChange
}: StyleSelectorProps) {
  const styles: {
    value: StyleOption;
    label: string;
    description: string;
  }[] = [{
    value: 'general',
    label: 'General',
    description: 'Standard paraphrasing suitable for most contexts'
  }, {
    value: 'professional',
    label: 'Professional',
    description: 'Formal language ideal for business and academic contexts'
  }, {
    value: 'friendly',
    label: 'Friendly',
    description: 'Casual and approachable tone for everyday communication'
  }, {
    value: 'creative',
    label: 'Creative',
    description: 'Expressive and imaginative language for engaging content'
  }];
  return <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Select Paraphrasing Style
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {styles.map(style => <div key={style.value} onClick={() => onStyleChange(style.value)} className={`
              relative border rounded-lg p-4 cursor-pointer transition-all
              ${selectedStyle === style.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 shadow-sm' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'}
            `}>
            {selectedStyle === style.value && <span className="absolute top-2 right-2">
                <CheckCircleIcon className="h-4 w-4 text-blue-500" />
              </span>}
            <h4 className="font-medium text-gray-900 dark:text-white">{style.label}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{style.description}</p>
          </div>)}
      </div>
    </div>;
}