import React from "react";
import { Text, TouchableOpacity } from "react-native";

const NoteItem = ({ styles, item, onDelete, press }) => (
  <TouchableOpacity style={styles.note} onPress={() => press(item.id)}>
    <Text style={styles.noteContent}>{item.content}</Text>
    <TouchableOpacity style={styles.delete} onPress={() => onDelete(item.id)}>
      <Text style={styles.deleteIcon}>X</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

export default NoteItem;
