import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import CheckBoxItem from "shared/CheckBoxItem";
import EmptyList from "shared/EmptyList";
import NavBottom from "shared/NavBottom";

const ChooseRoundList = ({ rounds, selectedRound, onPress, onRefresh, onNextScreen }) => (
  <>
    {rounds.length === 0 && <EmptyList message={"There are no current rounds."} onRefresh={onRefresh} />}
    {rounds.length > 0 && (
      <>
        <ScrollView style={styles.listView}>
          <View>
            {rounds.map(({ round }) => (
              <CheckBoxItem
                key={round.rounddeliveryid}
                title={round.roundname}
                titleProps={{ numberOfLines: 2, ellipsizeMode: "tail" }}
                isSelected={round.rounddeliveryid === selectedRound?.round.rounddeliveryid}
                onPress={() => onPress(round)}
              />
            ))}
          </View>
        </ScrollView>
        <NavBottom nextBtn={onNextScreen} disabled={!selectedRound} />
      </>
    )}
  </>
);

const styles = StyleSheet.create({
  listView: {
    marginTop: 30,
    marginHorizontal: 25,
  },
});

export default ChooseRoundList;
