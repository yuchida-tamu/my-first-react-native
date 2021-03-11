import { StatusBar } from "expo-status-bar";
import keygen from "keygenerator";
import NoteItem from "./components/NoteItem/NoteItem";
import NoteItemEdit from "./components/NoteItemEdit/NoteItemEdit";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";

export default function App() {
  const [note, setNote] = useState("");
  const [noteList, setNoteList] = useState([]);

  const onTextInputHandler = (text) => {
    setNote(text);
  };
  const onTextInputReturnedHandler = () => {
    const key = keygen._();
    const text = note;
    const obj = { id: key, content: text, isEdit: false };
    const updatedList = [...noteList, obj];
    setNoteList(updatedList);
  };

  const onPressDeleteHandler = (id) => {
    const updatedList = noteList.filter((item) => item.id !== id);
    setNoteList(updatedList);
  };

  const onPressToEditHandler = (id) => {
    const updatedList = noteList.map((item) => {
      if (item.id === id) {
        return { ...item, isEdit: true };
      }
      return { ...item, isEdit: false };
    });
    setNoteList(updatedList);
  };

  const onEditCompleteHandler = (text) => {
    const updatedList = noteList.map((item) => {
      if (item.isEdit) {
        return { ...item, content: text, isEdit: false };
      }

      return item;
    });
    setNoteList(updatedList);
  };

  const onQuitEditHandler = () => {
    const updatedList = noteList.map((item) => {
      if (item.isEdit) {
        return { ...item, isEdit: false };
      }
      return item;
    });
    setNoteList(updatedList);
  };

  const renderNote = ({ item }) =>
    item.isEdit ? (
      <NoteItemEdit
        item={item}
        styles={styles}
        note={note}
        onTextChange={onEditCompleteHandler}
        quitEdit={onQuitEditHandler}
      />
    ) : (
      <NoteItem
        item={item}
        styles={styles}
        onDelete={onPressDeleteHandler}
        press={onPressToEditHandler}
      />
    );

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.textTitle}>Simple ToDo List</Text>
        <TextInput
          style={{
            height: 40,
            width: 280,
            borderColor: "#767D7C",
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 5,
          }}
          placeholder="Make a new note"
          onSubmitEditing={onTextInputReturnedHandler}
          onChangeText={(t) => onTextInputHandler(t)}
        />
        <FlatList
          data={noteList}
          renderItem={renderNote}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  subcontainer: {
    marginBottom: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textTitle: {
    color: "#888",
    fontSize: 24,
    marginBottom: 16,
  },
  counter: {
    color: "#DE573B",
    fontSize: 25,
  },
  textDisplay: {
    width: 150,
    height: 40,
    color: "#DE573B",
    fontSize: 25,
  },
  note: {
    flexDirection: "row",
    width: 300,
    height: 60,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 5,

    backgroundColor: "#FFE3DF",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  noteContent: {
    color: "#767D7C",
    fontSize: 18,
  },
  noteContentEdit: {
    width: 240,
    color: "#767D7C",
    borderBottomColor: "#767D7C",
    borderBottomWidth: 1,
    fontSize: 18,
  },
  delete: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "red",

    justifyContent: "center",
    alignItems: "center",
  },
  deleteIcon: { color: "white" },
  quitEdit: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  list: { width: 300 },
});
