import React, { useState }  from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

type scheduleListProps = {
    sched: Array<Sched>,
    setDisplay: (sched: Sched) => void,
}

type Sched = {data: Array<boolean>, text: string, title: string, year: string, month: string};

const ScheduleList = ({sched, setDisplay} : scheduleListProps) => {
    const [desc, setDesc] = React.useState("");

    return (
        <View style={styles.main}>
            <View style={styles.sched}>
                {sched.map((set: Sched, index: number) => {
                    return (
                        <View key={index} style={styles.button}>
                            <Button title={set.title} onPress={() => {
                                setDesc(set.text);
                                setDisplay(set);
                            }}/>
                        </View>
                    )})}
            </View>
            <Text style={styles.desc}>{desc}</Text>
        </View>
);
};

const styles = StyleSheet.create({
    sched: {
      flexDirection: 'row', // Row direction for grid items
      flexWrap: 'wrap', // Allow items to wrap to the next line
      padding: 10,
    },
    main: {
        flexDirection: 'column',
        justifyContent: 'center', // Align items horizontally
        alignItems: 'center', // Align items vertically
    },
    desc: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderStyle: "solid",
        padding: 0,
        borderWidth: 2,
        flex: 1,
        width: '80%',
    },
    button: {
        paddingHorizontal: 3,
    },
  });

export default ScheduleList;