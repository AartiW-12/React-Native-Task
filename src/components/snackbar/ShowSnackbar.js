import { Snackbar } from "react-native-snackbar"
import Colors from '../style/Colors'

export const showSnackbar = ({
  msg,
  duration = Snackbar.LENGTH_SHORT,
  backgroundColor = Colors.primary,
  textColor = Colors.white,
}) => {
  Snackbar.show({
    text: msg,
    duration,
    backgroundColor,
    textColor,
  });
}