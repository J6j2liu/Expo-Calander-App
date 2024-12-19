import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Day from './Day';
import font from './FontSize';

type monthProps = {
    data: Array<boolean>,
    setData: (data : Array<boolean>) => void,
}

const Month = ({data, setData}: monthProps) => {
    const handleChange = async (val: number) => {
        setData(data.map((value, i) => i == val ? !value : value));
    };

    return(
        <View style={styles.main}>
            {data.map((value: boolean, index: number) => {
            return (
                <Day key={index} day_num={index+1} filled={value} handleChange={handleChange} style={{...styles.gridItem, ...font}}/>
            );
          }
        )}
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
      flexDirection: 'row', // Row direction for grid items
      flexWrap: 'wrap', // Allow items to wrap to the next line
      justifyContent: 'center', // Align items horizontally
      alignItems: 'center', // Align items vertically
      display: "flex",
      margin: 0,
      width: '75%',
    },
    gridItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: '10%', // Each item takes 30% of the container's width
        aspectRatio: 1, // Makes each item square (1:1 aspect ratio)
        margin: 1, // Add space between items
        backgroundColor: '#ccc', // Example background color
        borderStyle: "solid",
        padding: 0,
        borderWidth: 2,
    },
  });

export default Month;