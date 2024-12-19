import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

type dayProps = {
    day_num: number
    filled: boolean
    handleChange: (val : number) => void,
    style: any,
}

const Day = ({day_num, filled, handleChange, style} : dayProps) => {
    const colorStyles = filled ? {
        backgroundColor: "#BBB"
    } : { backgroundColor: "#FFF" };
    
    const handleClick = () => {
        handleChange(day_num-1);
    };

    return (
        <TouchableWithoutFeedback onPress={handleClick}>
            <View style={{ ...style, ...colorStyles}}>
                <Text>{day_num}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default Day;