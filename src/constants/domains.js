export const DOMAIN_LIST = [
    { key: "arcanes", label: "Arcanes anciennes", delay: 1000 },
    { key: "alchemy", label: "Alchimie élémentaire", delay: 1000 },
    { key: "shaping", label: "Arts de la Transmutation", delay: 1000 },
  ];
  
  export const getDomainByKey = (key) => DOMAIN_LIST.find(d => d.key === key);
  export const getLabel = (key) => getDomainByKey(key)?.label || "Inconnu";
  