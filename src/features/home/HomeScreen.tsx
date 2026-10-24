import { Button, Text, View } from "react-native"

export const HomeScreen = ({ navigation }: { navigation: any }) => {

    return <View style={{ flex: 1, backgroundColor: "white" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginTop: 20 }}>Home Screen</Text>

        <Button title="Go to Todo" onPress={() => navigation.navigate("Todo")} />

    </View>
}