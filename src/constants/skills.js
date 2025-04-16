export const SKILLS = [
    { key: 'mining', label: 'Minage', delay: 3000 }
  ];
  
  export const getSkillByKey = (key) => SKILLS.find(s => s.key === key);
  