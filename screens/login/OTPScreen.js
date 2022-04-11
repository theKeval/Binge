import { StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native'
import React , {useState,useRef,useContext} from 'react'
import { auth, appFB } from '../../firebase/config'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import * as fbOperations from '../../firebase/operations';
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';

const OTPScreen = () => {
    const { user, setUser } = useContext(AuthenticatedUserContext);

    const recaptchaVerifier = useRef(null);
    const [verificationId, setVerificationId] = useState();
    const attemptInvisibleVerification = false;
    const [phoneNumber, phoneNumberSet] = useState('');
    const {height, width} = useWindowDimensions();
    const [codeNumber, codeNumberSet] = useState('');
    const loginOTP = async()=>{

        try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
              "+1"+phoneNumber,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            alert('The verification code has been sent to your phone.')
   
          } catch (err) {
            console.log({ text: `Error: ${err.message}`, color: 'red' });
          }
    }
    const  OtpVerify = async () => {

        try {
            const credential = PhoneAuthProvider.credential(
              verificationId,
              codeNumber
            );
            signInWithCredential(auth, credential).then(async (userCredentials)=> {
                const userFound = await fbOperations.GetUserInfo(phoneNumber)
                if(userFound){
                    await setUser(userFound);
                    alert('Phone authentication successful 👍');
                    if(userFound.finishedProfile){
                        navigation.replace("Home")
                    }else{
                        navigation.replace("AboutMe")
                    }
                }else{
                    const uid = userCredentials.user.uid;
                    const userObj = {
                        "email": phoneNumber.toString(),
                        "id":uid ,
                        "firstName": "",
                        "lastName": "",
                        "dob": "",
                        "gender": "",
                        "orientation": "",
                        "minAge": 20,
                        "maxAge": 49,
                        "maxLocation":50,
                        "profilePicture": "",
                        "lastLocationLon":0,
                        "lastLocationLat":0,
                        "userPhotos":[],
                        "interests": [],
                        "finishedProfile": false,
                      }
                      await fbOperations.Signup(phoneNumber.toString(), userObj)
                      await setUser(userObj);
                      navigation.replace("AboutMe")
                }
                


            })
          } catch (err) {
              alert(`Error: ${err.message}`)
          }
    }
  return (
    <View style={[styles.container,{ height: height, width: '100%', flex: 1, justifyContent: 'center' }]}>
                <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={appFB.options}
        // attemptInvisibleVerification
      />
        {!verificationId ?  
            <View>
                <View  style={styles.row}>
                    <Text style={styles.label}>Phone Number:</Text>
                    <TextInput
                        placeholder='Enter 10 digit Mobile Number'
                        keyboardType="phone-pad"
                        textContentType="telephoneNumber"
                        onChangeText={(value) => phoneNumberSet(value)}
                        value={phoneNumber}
                        maxLength={10}
                        style={[styles.textField]}
                    />
                </View>
                
                <View  style={styles.row}>

                    <TouchableOpacity
                    onPress={loginOTP}
                        style={styles.btnSave}
                        disabled={ phoneNumber.length == 10 ? false : true}

                        >
                        <Text style={styles.buttonText}>Send Code</Text>
                        </TouchableOpacity>
                </View>
            </View>
        :
            <View>
                <View  style={styles.row}>
                    <Text style={styles.label}>Verification Code:</Text>
                    <TextInput
                        placeholder='Enter 6 digit code'
                        keyboardType="number-pad"
                        onChangeText={(value) => codeNumberSet(value)}
                        value={codeNumber}
                        maxLength={6}
                        style={[styles.textField]}
                    />
                </View>
                <View  style={styles.row}>

                    <TouchableOpacity
                    onPress={OtpVerify}
                        style={styles.btnSave}
                        disabled={ codeNumber.length == 6 ? false : true}

                        >
                        <Text style={styles.buttonText}>Verify</Text>
                        </TouchableOpacity>
                </View>
            </View>
        }
        <View  style={styles.row}>
            <TouchableOpacity onPress={()=>{navigation.replace("Login")}} style={[styles.btnSave,{backgroundColor: 'grey'}]}>
                <Text style={styles.buttonText}>Return to Login</Text>
            </TouchableOpacity>
        </View>
        {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
</View>
  )
}

export default OTPScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFAEE',
        paddingHorizontal: '5%',
        paddingTop: 10
    },
    row: {
        justifyContent: 'center',
        marginTop: 10,
    },
    label: {
        textAlign: 'left',
        fontWeight: '700',
        marginBottom: 5,
        fontSize: 16,

    },
    searchBtn: {
        marginHorizontal: 10,
        padding: 5
      },
    textField: {
        backgroundColor: 'white',
        borderColor: '#009B81',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    field:{
        backgroundColor: 'white',
        borderColor: '#009B81',
        borderWidth: 2,
        borderRadius: 10,
    },
    btnSave: {
      marginTop:20,
      backgroundColor: '#FFBE27',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
})