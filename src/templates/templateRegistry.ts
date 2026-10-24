import type { TemplateDefinition, TemplateId } from '../types/wedding';

export const WEDDING_TEMPLATES: TemplateDefinition[] = [

  {
    id: 'sampoorna-hindi',
    name: 'Sampoorna Hindi Vivah',
    hindiName: 'संपूर्ण हिंदी विवाह',
    tagline: '100% शुद्ध हिंदी एवं संस्कृत श्लोक, सिंदूरी लाल एवं स्वर्ण सज्जा',
    description: 'पूर्णतः देवनागरी हिंदी एवं वैदिक संस्कृत श्लोकों में रचा गया पारंपरिक भारतीय विवाह निमंत्रण, सिंदूरी लाल, हल्दी केसरिया एवं २4K स्वर्ण सज्जा के साथ।',
    colorTheme: 'Sindoor Vermilion & Pure Gold',
    primaryColor: '#7A0A1F',
    secondaryColor: '#D4AF37',
    accentColor: '#FFB800',
    bgGradient: 'radial-gradient(circle at center, #780B1E 0%, #460611 65%, #200208 100%)',
    category: 'Traditional',
    previewBadge: '100% शुद्ध हिंदी',
    features: ['100% शुद्ध देवनागरी हिंदी', 'वैदिक गणेश वंदना एवं श्लोक', 'मांगलिक कलश एवं फेरे दर्शन', 'पारंपरिक स्नेह निमंत्रण'],
  },
];

export function getTemplateById(id: TemplateId): TemplateDefinition {
  return WEDDING_TEMPLATES.find((t) => t.id === id) || WEDDING_TEMPLATES[0];
}
