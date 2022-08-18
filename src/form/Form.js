import axios from "axios";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  setName,
  setEmail,
  setPhone,
  setMessage,
  setLoading,
  clearNow,
} from "../redux/slices/dataSlice";

const Form = () => {
  const info = useSelector((state) => {
    return state.data;
  });

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(info?.email) &&
      info?.name !== "" &&
      info?.phone !== "" &&
      info?.message !== "" &&
      info?.email !== ""
    ) {
      dispatch(setLoading(true));
      const information = {
        name: info.name,
        email: info.email,
        phone: info.phone,
        message: info.message,
      };

      try {
        const data = await axios.post(
          "https://react-native-form-submit.herokuapp.com/send-email",
          information,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        if (data.data === "Email sent") {
          alert("Email sent");
          dispatch(setLoading(false));
          dispatch(clearNow());
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please fill all the fields with valid types");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headings}>Welcome to my App!</Text>
      <Text style={styles.subHeadings}>Please type your info to send!</Text>
      <View
        style={{
          display: "flex",
          width: "80%",
        }}
      >
        <View style={styles.inputView}>
          <TextInput
            value={info?.name}
            onChangeText={(e) => {
              dispatch(setName(e));
            }}
            placeholder="Type Your Name"
            style={styles.inputStyle}
            keyboardType="default"
          ></TextInput>
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={info?.phone}
            onChangeText={(e) => dispatch(setPhone(e))}
            placeholder="Type Your Number"
            style={styles.inputStyle}
            keyboardType="number-pad"
            maxLength={15}
          ></TextInput>
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={info?.email}
            onChangeText={(e) => dispatch(setEmail(e))}
            placeholder="Type Your Email"
            style={styles.inputStyle}
            keyboardType="email-address"
          ></TextInput>
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={info?.message}
            onChangeText={(e) => dispatch(setMessage(e))}
            placeholder="Type Your Message"
            multiline={true}
            numberOfLines={10}
            style={styles.textArea}
            keyboardType="default"
          />
        </View>

        {info?.loading ? (
          <View style={styles.buttonDiv}>
            <Text style={styles.buttonText}>Loading...</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.buttonDiv} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 120,
  },
  headings: {
    fontSize: 20,
    color: "green",
    fontWeight: "bold",
    marginBottom: 15,
  },
  subHeadings: {
    fontSize: 15,
    marginBottom: 15,
    color: "gray",
  },
  inputStyle: {
    borderColor: "darkgray",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    paddingStart: 15,
  },
  inputView: {
    width: "100%",
    padding: 3,
  },
  textArea: {
    borderColor: "darkgray",
    borderWidth: 1,
    borderRadius: 5,
    paddingStart: 15,
    paddingTop: 10,
    height: 200,
    textAlignVertical: "top",
  },
  buttonDiv: {
    borderRadius: 10,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#3B9AE1",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
});
