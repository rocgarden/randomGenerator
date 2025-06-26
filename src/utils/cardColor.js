export const getColorForRole = roleName => {
  const colors = [
    '#ffeaa7',
    '#81ecec',
    '#fab1a0',
    '#a29bfe',
    '#fd79a8',
    '#74b9ff',
    '#55efc4',
  ];
  const index = roleName?.charCodeAt(0) % colors.length;
  return colors[index];
};
