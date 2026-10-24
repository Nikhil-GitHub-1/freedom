import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeScreen } from '../features/home/HomeScreen';
import { ProfileScreen } from '../features/profile/ProfileScreen';
import { SettingsScreen } from '../features/settings/SettingsScreen';
import type { BottomTabParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const ACCENT = '#6D5AE6';
const MUTED = '#858A9B';

function TabIcon({ name, color }: { name: string; color: string }) {
  const borderColor = color;

  return (
    <View
      style={styles.icon}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      {name === 'Home' ? (
        <>
          <View style={[styles.homeRoof, { borderColor }]} />
          <View style={[styles.homeBase, { borderColor }]} />
          <View style={[styles.homeDoor, { backgroundColor: color }]} />
        </>
      ) : name === 'Profile' ? (
        <>
          <View style={[styles.personHead, { borderColor }]} />
          <View style={[styles.personBody, { borderColor }]} />
        </>
      ) : (
        <>
          {[5, 12, 19].map((top, index) => (
            <View
              key={top}
              style={[styles.sliderLine, { top, backgroundColor: color }]}>
              <View
                style={[
                  styles.sliderKnob,
                  { borderColor },
                  index === 1 && styles.sliderKnobRight,
                ]}
              />
            </View>
          ))}
        </>
      )}
    </View>
  );
}

function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.tabArea,
        {
          paddingBottom: Math.max(insets.bottom, 14),
          paddingLeft: Math.max(insets.left, 20),
          paddingRight: Math.max(insets.right, 20),
        },
      ]}>
      <View style={styles.dock}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : options.title ?? route.name;
          const color = focused ? ACCENT : MUTED;

          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
              testID={options.tabBarButtonTestID}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!focused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params);
                }
              }}
              onLongPress={() =>
                navigation.emit({ type: 'tabLongPress', target: route.key })
              }
              style={({ pressed }) => [
                styles.tab,
                focused && styles.activeTab,
                pressed && styles.pressedTab,
              ]}>
              <TabIcon name={route.name} color={color} />
              <Text
                style={[
                  styles.label,
                  { color },
                  focused && styles.activeLabel,
                ]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function renderFloatingTabBar(props: BottomTabBarProps) {
  return <FloatingTabBar {...props} />;
}

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={renderFloatingTabBar}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabArea: {
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
  },
  dock: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
    maxWidth: 480,
    padding: 8,
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#EDEDF5',
    shadowColor: '#25204D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 8,
  },
  tab: {
    flex: 1,
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    gap: 5,
    borderRadius: 21,
  },
  activeTab: { backgroundColor: '#F0EDFF' },
  pressedTab: { opacity: 0.65, transform: [{ scale: 0.96 }] },
  label: { fontSize: 11, fontWeight: '500', letterSpacing: 0.2 },
  activeLabel: { fontWeight: '700' },
  icon: { width: 24, height: 24 },
  homeRoof: {
    position: 'absolute',
    width: 14,
    height: 14,
    left: 5,
    top: 3,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderTopLeftRadius: 3,
    transform: [{ rotate: '45deg' }],
  },
  homeBase: {
    position: 'absolute',
    left: 4,
    top: 10,
    width: 16,
    height: 12,
    borderWidth: 2,
    borderTopWidth: 0,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  homeDoor: {
    position: 'absolute',
    left: 10,
    top: 15,
    width: 4,
    height: 6,
    borderRadius: 1,
  },
  personHead: {
    position: 'absolute',
    left: 8,
    top: 2,
    width: 9,
    height: 9,
    borderWidth: 2,
    borderRadius: 5,
  },
  personBody: {
    position: 'absolute',
    left: 4,
    top: 14,
    width: 17,
    height: 9,
    borderWidth: 2,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  sliderLine: {
    position: 'absolute',
    left: 2,
    width: 20,
    height: 2,
    borderRadius: 1,
  },
  sliderKnob: {
    position: 'absolute',
    left: 3,
    top: -2,
    width: 6,
    height: 6,
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  sliderKnobRight: { left: 11 },
});

export { BottomTabs };
