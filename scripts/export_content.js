import { officialSiteContent } from '../src/data/officialSiteContent.js';
import fs from 'fs';

const sections = [
  'footer', 'contacts', 'applicants', 'citizens', 'foreign',
  'committee', 'procedure', 'scholarships', 'campusEvents'
];

const structuredData = {};

sections.forEach(sec => {
  structuredData[sec] = {
    ru: officialSiteContent.ru[sec],
    en: officialSiteContent.en[sec],
    kg: officialSiteContent.kg[sec]
  };
});

fs.writeFileSync('../SU_back_back/official_content.json', JSON.stringify(structuredData, null, 2));
console.log('Successfully exported content to official_content.json');
