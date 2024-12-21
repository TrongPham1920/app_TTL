import React, { useState } from "react";
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const Dropdown = ({ label, placeholder, items, value, setValue }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ marginBottom: 10, width: "100%" }}>
      {label && (
        <Text style={{ color: "black", marginBottom: 10 }}>{label}</Text>
      )}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        theme="LIGHT"
        multiple={false}
        placeholder={placeholder}
        style={{
          borderColor: "gray",
        }}
      />
    </View>
  );
};

export default Dropdown;
