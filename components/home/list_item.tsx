import { getThumb } from "@/plugins/utils";
import { useAppTheme, AppTheme } from "@/providers/style_provider";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import IconBtn from "../icon_btn";
import { Href } from "expo-router/build/link/href";

export interface Props {
  name: string;
  briefDesc?: string;
  images?: string[];
  href?: Href;
  onPress?: () => void;
  actions?: React.ReactNode[];
  showNavigate?: boolean;
  latitude?: number;
  longitude?: number;
}

export default function ListItem({ name, briefDesc, images, href, showNavigate, latitude, longitude, ...props }: Props) {
  const { theme } = useAppTheme();
  const style = useStyle({ theme });

  async function onPress() {
    if (href) {
      router.push(href);
    } else {
      props.onPress?.();
    }
  }

  const getActions = () => {
    const actions = props.actions || [];
    if (showNavigate && latitude && longitude) {
      actions.push(
        <IconBtn
          key={"map"}
          icon="location"
          iconProps={{ fill: theme.colors.text }}
          onPress={() =>
            router.replace({
              pathname: "/map",
              params: { latitude, longitude },
            })
          }
        />
      );
    }
    return actions;
  };

  const actions = getActions();

  function render1() {
    const image: string | undefined = images?.[0];
    return (
      <TouchableRipple onPress={onPress}>
        <View style={style.card}>
          <View style={{ flexDirection: "row", alignContent: "center", justifyContent: "center" }}>
            {image && (
              <View style={style.circle}>
                <Image source={{ uri: getThumb(image) }} style={style.image} />
              </View>
            )}
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                rowGap: theme.spacing.xs,
                marginLeft: theme.spacing.lg,
                marginRight: theme.spacing.xs,
              }}
            >
              <Text variant="labelLarge" style={{ color: theme.colors.text }}>
                {name}
              </Text>
              {briefDesc && (
                <Text variant="bodyMedium" style={{ color: theme.colors.text }}>
                  {briefDesc}
                </Text>
              )}
            </View>
            <View style={{ flexDirection: "row", alignContent: "center", justifyContent: "center", height: "100%" }}>{actions}</View>
          </View>
        </View>
      </TouchableRipple>
    );
  }

  return render1();
}

const useStyle = ({ theme }: { theme: AppTheme }) =>
  StyleSheet.create({
    card: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      backgroundColor: theme.colors.container,
      elevation: 2,
    },
    circle: {
      borderRadius: 9999,
      overflow: "hidden",
      height: 100,
      width: 100,
    },
    image: {
      resizeMode: "cover",
      width: "100%",
      height: "100%",
    },
  });
