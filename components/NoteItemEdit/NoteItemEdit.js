import React, { useState } from "react";
import { TextInput, TouchableOpacity, Text } from "react-native";

const NoteItemEdit = ({ styles, item, onTextChange, quitEdit }) => {
  const [text, setText] = useState(item.content);
  return (
    <TouchableOpacity style={styles.note}>
      <TextInput
        style={styles.noteContentEdit}
        value={text}
        onSubmitEditing={() => {
          onTextChange(text);
        }}
        onChangeText={(t) => setText(t)}
      ></TextInput>
      <TouchableOpacity
        style={styles.quitEdit}
        onPress={() => quitEdit(item.id)}
      >
        <Text style={styles.quitEditIcon}>></Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default NoteItemEdit;
