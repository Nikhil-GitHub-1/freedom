import { NavigationContainer } from "@react-navigation/native"
import AppNavigator from "./AppNavigator"

export const NavigationWrapper = () => {
    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    )
}