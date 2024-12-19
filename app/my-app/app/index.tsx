import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Month from "@/components/Month";
import React, { useEffect, useState } from "react";
import ScheduleList from "@/components/ScheduleList";
import font from "@/components/FontSize";
import { Dropdown } from "react-native-element-dropdown";

export default function Index() {
  const [data, setData] = React.useState<boolean[]>([]);
  const [text, onChangeText] = React.useState('');
  const [title, onChangeTitle] = React.useState('');
  const [sched, setSched] = React.useState([]);
  const [mValue, setMValue] = React.useState<string>("");
  const [mIsFocus, setMIsFocus] = React.useState(false);
  const [yValue, setYValue] = React.useState<string>("");
  const [yIsFocus, setYIsFocus] = React.useState(false);
  
  const months = [
    { label: 'January', value: '1' },
    { label: 'February', value: '2' },
    { label: 'March', value: '3' },
    { label: 'April', value: '4' },
    { label: 'May', value: '5' },
    { label: 'June', value: '6' },
    { label: 'July', value: '7' },
    { label: 'August', value: '8' },
    { label: 'September', value: '9' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];
  let years: Array<{label: string, value: string}> = [];

  for(let i = 1990; i < 2050; i++) {
    years.push(
      {
        label: i.toString(),
        value: i.toString()
      }
    )
  }

  const setDisplay = (scheds: {data: Array<boolean>, year: string, month: string}) => {
    setData(scheds.data);
    setYValue(scheds.year);
    setMValue(scheds.month);
  };

  const handleSubmit = async () => {
    if(title === "") {
      Alert.alert('Please enter a title for your event!', '', [{text: 'ok', style: 'default'}])
    } else if(text === "") {
      Alert.alert('Please enter a description for your event!', '', [{text: 'ok', style: 'default'}])
    } else if(yValue === "") {
      Alert.alert('Please select a year for your event!', '', [{text: 'ok', style: 'default'}])
    } else if(mValue === "") {
      Alert.alert('Please select a month for your event!', '', [{text: 'ok', style: 'default'}])
    } else if(data.every((value: boolean) => (value === false))) {
      Alert.alert('Please select a some days for your event!', '', [{text: 'ok', style: 'default'}])
    } else {
      try {
        console.log(mValue);
        const response = await fetch('http://10.0.2.2:3000/sched', {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "data": data,
            "text": text,
            "title": title,
            "year": yValue,
            "month": mValue,
            })
          }
        )
  
        if (response.ok) {
          handleFetchSched();
          onChangeText("");
          onChangeTitle("");
          handleMonth();
        } else {
            console.error('Error posting data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleFetchSched = async () => {
    try {
        const response = await fetch('http://10.0.2.2:3000/sched', {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const result = await response.json();
        setSched(result.sched);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };


  const handleMonth = () => {
    let a = new Array<boolean>(31).fill(false);

    if(mValue == '2') {
      a = new Array<boolean>(28).fill(false);
    } else if(mValue == '4') {
      a = new Array<boolean>(30).fill(false);
    } else if(mValue == '6') {
      a = new Array<boolean>(30).fill(false);
    } else if(mValue == '9') {
      a = new Array<boolean>(30).fill(false);
    } else if(mValue == '11') {
      a = new Array<boolean>(30).fill(false);
    } 

    setData(a);
  };

  useEffect(() => {
    handleMonth();
    handleFetchSched();
  }, [mValue]);


  return (
    <ScrollView style={styles.main}>
      <View>
        <View style={styles.cal}>
          <View style={styles.date}>
            <Dropdown data={months}
              onFocus={() => setMIsFocus(true)}
              onBlur={() => setMIsFocus(false)}
              labelField="label"
              valueField="value"
              placeholder={'Select Month'}
              value={mIsFocus ? 'Select Month' : mValue}
              onChange={(item) => {
                setMValue(item.value);
              }}
              style={styles.dropdown}
            />
            <Dropdown data={years}
              onFocus={() => setYIsFocus(true)}
              onBlur={() => setYIsFocus(false)}
              labelField="label"
              valueField="value"
              placeholder={'Select Year'}
              value={yIsFocus ? 'Select Year' : yValue}
              onChange={(item) => {
                setYValue(item.value);
                setYIsFocus(false);
              }}
              style={styles.dropdown}
            />
          </View>
          <Month data={data} setData={setData}/>
          <TextInput style={{...styles.title, ...font}} placeholder="Add Event Title" value={title} onChangeText={onChangeTitle}/>
          <TextInput style={{...styles.input, ...font}} placeholder="Add Event Description" value={text} onChangeText={onChangeText}/>
          <Button title="submit" onPress={handleSubmit}></Button>
        </View>
        <View style={styles.sched}>
          <ScheduleList sched={sched} setDisplay={setDisplay}/>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 15,
  },
  title: {
    borderStyle: "solid",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    textAlign: "center",
    flex: 1
  },
  input: {
    borderStyle: "solid",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    textAlign: "center",
  },
  sched: {
    flex: 0.5,
    alignSelf: 'stretch',
  },
  cal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropdown: {
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    maxHeight: '40%',
    minHeight: '10%',
    height: 60,
    minWidth: '50%'
  },
  date: {
    flexDirection: "row",

  },
});

