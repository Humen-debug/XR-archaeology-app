import { Text } from "react-native-paper";
import { useAppTheme } from "../../styles";
import MainBody from "../../components/main_body";

export default function Home() {
  const theme = useAppTheme();
  return (
    <MainBody>
      <Text>Home</Text>
    </MainBody>
  );
}