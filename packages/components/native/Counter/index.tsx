import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  initial?: number;
}

export const Counter: React.FC<Props> = (props) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(props.initial || 0);
  }, [props.initial]);
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{count}</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setCount((c) => c + 1)}
        >
          <Text style={styles.btn_txt}>Increment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setCount(props.initial || 0)}
        >
          <Text style={styles.btn_txt}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setCount((c) => c - 1)}
        >
          <Text style={styles.btn_txt}>Decrement</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#0080f0",
    width: "30%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  btn_txt: { fontWeight: "bold", color: "#fff", fontSize: 15 },
  txt: { fontWeight: "bold", color: "#000", fontSize: 30, marginBottom: 10 },
  container: { justifyContent: "center", alignItems: "center" },
});
