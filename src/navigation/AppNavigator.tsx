import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OfflineFirstTodoEntry } from "../features/offline-first-todo-app";
import { BottomTabs } from "./BottomTabs";

const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >

            <Stack.Screen name="Main" component={BottomTabs} />
            <Stack.Screen name="Todo" component={OfflineFirstTodoEntry} />
        </Stack.Navigator>
    );
}

export default AppNavigator;
