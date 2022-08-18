import { ScrollView } from "react-native";
import Form from "./src/form/Form";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <ScrollView>
        <Form />
      </ScrollView>
    </Provider>
  );
}
