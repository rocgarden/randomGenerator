// theme/colors.js

const Colors = {
  // Primary brand color (headers, icons, CTA)
  primary: '#6f42c1', // Deep Purple
  primaryDark: '#5e35b1',

  // Backgrounds
  background: '#fdfdfd', // Light background
  backgroundAlt: '#e0f7fa', // Alt screen bg (Setup)
  backgroundSoft: '#d0f0fd', // Softer alt bg
  card: '#d6c8ff', // Card background
  cardAlt: '#ffeaa7', // Alt card bg

  // Accents
  accentYellow: '#fdcb6e',
  accentAqua: '#00d2d3',
  accentPeach: '#f8c291',
  accentMint: '#d4f4dd',

  // Text
  textPrimary: '#2d3436',
  textLight: '#ffffff',
  textMuted: '#636e72',

  // Buttons
  buttonPrimary: '#18dcff',
  buttonSecondary: '#fdcb6e',
  buttonDanger: '#ff6b6b',
};

export default Colors;

import Colors from '../theme/colors';

// ...

// <Text style={{ color: Colors.textPrimary }}>Add Players</Text>

// <View style={{ backgroundColor: Colors.card }} />
// <TouchableOpacity style={{ backgroundColor: Colors.buttonPrimary }} />

// .first-color { 
// 	background: #f4eeff; 
// }
	
// .second-color { 
// 	background: #dcd6f7; 
// }

// .third-color { 
// 	background: #a6b1e1; 
// }

// .fourth-color { 
// 	background: #424874; 
// }