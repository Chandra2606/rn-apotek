import React from 'react';
import {View, ScrollView, Image, Text, TouchableOpacity} from 'react-native';

const UIUserProfile = () => {
  const styles = {
    flexA: {
      flex: 1,
      padding: 20,
    },
    base: {
      flexGrow: 1,
    },
    userProfile: {
      flex: 1,
    },
    userProfileTop: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 120,
      minHeight: 380,
    },
    userProfileTopBg: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: null,
      height: null,
    
    },
    userProfileTopOverlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: null,
      height: null,
      backgroundColor: '#000000',
      opacity: 0.2,
    },
    avatar: {
      flexShrink: 0,
      width: 128,
      height: 128,
    },
    avatarContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 3,
      borderStyle: 'solid',
      borderColor: '#ffffff',
      borderRadius: 64,
      backgroundColor: '#a8bac1',
      overflow: 'hidden',
    },
    avatarImg: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    avatarStatus: {
      position: 'absolute',
      right: 10.1,
      bottom: 10.1,
      width: 20,
      height: 20,
      borderWidth: 3,
      borderStyle: 'solid',
      borderColor: '#ffffff',
      borderRadius: 10,
      backgroundColor: '#67ab5b',
    },
    userProfileInfo: {
      paddingHorizontal: 24,
    },
    userProfileInfoName: {
      marginTop: 16,
      color: '#ffffff',
      fontSize: 22,
      textAlign: 'center',
    },
    userProfileInfoJobTitle: {
      marginTop: 4,
      color: '#ffffff',
      fontSize: 16,
      textAlign: 'center',
      opacity: 0.7,
    },
    userProfileWidget: {
      alignSelf: 'stretch',
      margin: 24,
      marginTop: 24,
      marginBottom: 24,
    },
    widget: {
      flexDirection: 'row',
      flexGrow: 1,
      flexShrink: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderRadius: 8,
      paddingVertical: 8,
      minHeight: 60,
    },
    widgetItem: {
      flex: 1,
      justifyContent: 'center',
      minWidth: 0,
      paddingVertical: 4,
      borderRightWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    widgetItemLast: {
      borderRightWidth: 0,
    },
    widgetItemLabel: {
      color: '#ffffff',
      fontSize: 14,
      textAlign: 'center',
      opacity: 0.5,
    },
    widgetItemValue: {
      marginTop: 4,
      color: '#ffffff',
      fontSize: 16,
      textAlign: 'center',
    },
    userProfileBody: {
      flexGrow: 1,
      paddingTop: 24,
      paddingBottom: 60,
    },
    flexB: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
      paddingHorizontal: 24,
    },
    btnA: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 46,
      minWidth: 130,
      maxWidth: '100%',
      paddingHorizontal: 24,
      backgroundColor: '#299cd1',
      borderRadius: 8,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#299cd1',
      overflow: 'hidden',
    },
    btnTextA: {
      color: '#ffffff',
      fontSize: 20,
    },
    btnB: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 46,
      minWidth: 130,
      maxWidth: '100%',
      paddingHorizontal: 24,
      backgroundColor: '#ffffff00',
      borderRadius: 8,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#032535',
      overflow: 'hidden',
    },
    btnTextB: {
      color: '#032535',
      fontSize: 20,
    },
    typography: {
      fontSize: 16,
    },
    section: {},
    sectionHeading: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: 30,
      paddingHorizontal: 24,
    },
    sectionHeadingMain: {
      flexShrink: 1,
    },
    sectionHeadingText: {
      fontSize: 26,
      color: '#1c1c1c',
    },
    sectionContent: {
      paddingHorizontal: 24,
      paddingVertical: 8,
    },
    hStack: {
      overflow: 'hidden',
    },
    hStackContent: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginVertical: -4,
      marginHorizontal: -4,
    },
    hStackItemWrap: {
      paddingVertical: 4,
      paddingHorizontal: 4,
      minWidth: 0,
      flexShrink: 0,
    },
    tag: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 28,
      maxWidth: 140,
      paddingLeft: 8,
      paddingRight: 8,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#a8bac1',
      borderRadius: 14,
      overflow: 'hidden',
    },
    tagText: {
      fontSize: 16,
      color: '#1c1c1c',
      flexShrink: 1,
    },
    grid: {
      overflow: 'hidden',
      flexShrink: 0,
    },
    gridContent: {
      flexShrink: 0,
      flexWrap: 'nowrap',
      marginVertical: -8,
    },
    gridItem: {
      paddingVertical: 8,
      minWidth: 0,
      minHeight: 0,
      flexShrink: 0,
    },
  };

  return (
    <View style={styles.flexA}>
      <ScrollView
        contentContainerStyle={styles.base}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Text
          style={{
            fontSize: 30,
            marginTop: 20,
            marginBottom: 20,
            fontWeight: 'bold',
            color: 'black',
            fontFamily: '',
          }}>
          App Created By
        </Text>
        <View style={styles.userProfile}>
          <View style={styles.userProfileTop}>
            <Image
              style={styles.userProfileTopBg}
              source={require('./img/laptop.jpg')}
            />
            <View style={styles.userProfileTopOverlay} />
            <View style={styles.avatar}>
              <View style={styles.avatarContainer}>
                <Image
                  style={styles.avatarImg}
                  source={require('./img/me.jpg')}
                />
              </View>
            </View>
            <View style={styles.userProfileInfo}>
              <Text style={styles.userProfileInfoName}>Rafi Chandra</Text>
              <Text style={styles.userProfileInfoJobTitle}>2010039</Text>
            </View>
            <View style={[styles.userProfileWidget, styles.widget]}>
              <View style={styles.widgetItem}>
                <Text style={styles.widgetItemLabel}>Bio</Text>
                <Text style={styles.widgetItemValue}>
                  "Coding is not just about building things, it's about building
                  dreams"
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.userProfileBody}></View>
        </View>
        <View style={styles.userProfile}>
          <View style={styles.userProfileTop}>
            <Image
              style={styles.userProfileTopBg}
              source={require('./img/sky2.jpg')}
            />
            <View style={styles.userProfileTopOverlay} />
            <View style={styles.avatar}>
              <View style={styles.avatarContainer}>
                <Image
                  style={styles.avatarImg}
                  source={require('./img/tiwi.jpg')}
                />
              </View>
            </View>
            <View style={styles.userProfileInfo}>
              <Text style={styles.userProfileInfoName}>Tiwi Sri Wahyuni</Text>
              <Text style={styles.userProfileInfoJobTitle}>2010013</Text>
            </View>
            <View style={[styles.userProfileWidget, styles.widget]}>
              <View style={styles.widgetItem}>
                <Text style={styles.widgetItemLabel}>Bio</Text>
                <Text style={styles.widgetItemValue}>
                  "Setiap langkah kecil adalah progres menuju impian besar."
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.userProfileBody}></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UIUserProfile;
