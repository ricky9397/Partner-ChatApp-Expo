import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from '@expo/vector-icons'; 

export default () => {
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
            <Text style={{ fontSize: 15, color: "gray" }}>메시지</Text>

            {/* flexDirection 가로 배치 */}
            <View style={{ flexDirection: "row" }}>
            </View>
        </View>
    )
}


