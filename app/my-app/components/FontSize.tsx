import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const font = {fontSize: Math.round((width/700)*23)};

export default font;