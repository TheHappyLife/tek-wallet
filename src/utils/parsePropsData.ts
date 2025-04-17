const parsePropsData = <T>(stringData?: string): T | undefined => {
  if (!stringData) {
    return undefined;
  }
  const data = JSON.parse(stringData);

  return data;
};

export default parsePropsData;
