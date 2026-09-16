import React from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import Login from "../screens/Login";
import Register from "../screens/Register";
import Dashboard from "../screens/Dashboard";
import EditProfile from "../screens/EditProfile";

const Stack =
  createNativeStackNavigator();

export default function Navigation() {

  return (

    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Login"
      >

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Inicio de sesión",
          }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: "Registro",
          }}
        />

        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: "Mi perfil",
            headerBackVisible: false,
          }}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            title: "Editar perfil",
          }}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}