import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RadioButton } from 'react-native-paper';
import kakaoRegister from '../../hooks/kakaoRegister';
import Colors from '../../modules/Colors';
import { RootStackParamList } from '../types';

const KakaoLoginSignup = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'KakaoSignup'>>();
  const id = route.params?.id;
  const userEmail = route.params?.userEmail;
  const userPhone = route.params?.userPhone;

  const [userName, setName] = useState('');
  const [userBirthDay, setBirthDay] = useState('');
  const [gender, setGender] = useState('M');

  // DateTimePickerModal
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const {mutate: register, isLoading: registerLoading} = kakaoRegister();
  const isLoading = registerLoading;

  const onPress = () => {
    if(isLoading) {
      return;
    }

    register({
      id,
      userEmail,
      userName,
      userPhone,
      userBirthDay,
      gender
    });
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (data: Date) => {
      hideDatePicker();
      onChangeBirthDayText(new Date(data).toLocaleDateString());
  };

  const nameErrorText = useMemo(() => {
    if (userName.length === 0) {
      return '이름을 입력해주세요.';
    }
    return null;
  }, [userName.length]);
  
  const birthDayErrorText = useMemo(() => {
    if (userBirthDay.length === 0) {
      return '생년월일을 선택하세요.';
    }
    return null;
  }, [userBirthDay]);

  const genderErrorText = useMemo(() => {
    if(gender.length === 0) {
      return '성별을 선택하세요.';
    }
    return null;
  }, [gender]);

  const onChangeNameText = useCallback((text: string) => {
    setName(text);
  }, [userName]);

  const onChangeBirthDayText = useCallback((text: string) => {
    setBirthDay(text);
  }, [userBirthDay]);

  const signupButtonEnabled = useMemo(() => {
    return (
      nameErrorText == null &&
      birthDayErrorText == null &&
      genderErrorText == null
    );
  }, [
    nameErrorText,
    birthDayErrorText,
    genderErrorText,
  ]);

  const signupButtonStyle = useMemo(() => {
    if (signupButtonEnabled) {
      return styles.signupButton;
    }
    return [styles.signupButton, styles.disabledSignupButton];
  }, [signupButtonEnabled]);

  
  return (
    <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding', android: undefined})}
          style={styles.avoid}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.title}>이름</Text>
          <TextInput
            value={userName}
            style={styles.input}
            onChangeText={onChangeNameText}
          />
          {nameErrorText && (
            <Text style={styles.errorText}>{nameErrorText}</Text>
          )}
        </View>
        <View>
          <Text style={styles.title}>성별</Text>
          <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
            <View style={styles.selectBtnText}>
              <RadioButton.Item value="M" label='남자' style={styles.raidoBtn}/>
              <RadioButton.Item value="F" label='여자' style={styles.raidoBtn}/>
            </View>
          </RadioButton.Group>
          {nameErrorText && (
              <Text style={styles.errorText}>{genderErrorText}</Text>
          )}
        </View>
        <View style={styles.section}>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.title}>생년월일</Text>
            <TextInput
              pointerEvents="none"
              value={userBirthDay}
              style={styles.input}
              onPressIn={showDatePicker}
            />
            {nameErrorText && (
              <Text style={styles.errorText}>{birthDayErrorText}</Text>
            )}
            <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={signupButtonStyle}
            onPress={onPress}
            disabled={!signupButtonEnabled}>
            <Text style={styles.signupButtonText}>회원 가입</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
    </View>
  );
};

export default KakaoLoginSignup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  avoid: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c8c8c8',
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#dcdcdc',
    fontSize: 16,
  },
  errorText: {
    fontSize: 15,
    color: Colors.RED,
    marginTop: 4,
  },
  signupButton: {
    backgroundColor: '#FF9100',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
  },
  signupButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledSignupButton: {
    backgroundColor: '#dcdcdc',
  },
  signinTextButton: {
    marginTop: 5,
    alignItems: 'center',
    padding: 10,
  },
  signinButtonText: {
    fontSize: 16,
    color: Colors.BLACK,
  },
  signingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectBtnText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  raidoBtn: {
    flex: 1,
    marginRight: 15,
    margin: 5
  },
});