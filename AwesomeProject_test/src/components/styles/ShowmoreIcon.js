import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts } from '../../utils/Fonts';

export default class ShowmoreIcon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isShown: false
        };
    }

    
ShowHideTextComponentView = () =>{
 
    if(this.state.isShown == true)
    {
      this.setState({isShown: false})
    }
    else
    {
      this.setState({isShown: true})
    }
  }


  render() {
    const { isShown } = this.state;
    return (
        <View>
        <LinearGradient colors={['#f94560', '#d1213b', '#870c1e']} style = {styles.container}>
        <TouchableHighlight onPress={this.ShowHideTextComponentView} style = {{borderRadius: 10}} underlayColor = 'transparent'>
        <View style = {{flexDirection: 'row', alignItems: 'baseline',justifyContent: 'space-between', marginTop:10, marginBottom:10}}>
        <Text style={styles.questionTitle}>{this.props.title}</Text>
        <Icon
        name= 'caret-down'
        color={isShown ? '#fff' : '#383a3d'}
        size={19}
        style={{ flex:1, alignSelf:'center', marginBottom: 3, paddingRight:10, paddingLeft:15,justifyContent: 'center' }}
        />
        </View>
        </TouchableHighlight>
    </LinearGradient>
    {
        this.state.isShown ? <LinearGradient colors={['#7fbc1c','#7fbc1c','#398918']} style = {{marginTop: 2, justifyContent: 'center', alignSelf: 'center', borderRadius: 10, marginHorizontal: 20}}>
        <View style = {{alignSelf: 'flex-start', marginTop:10, marginLeft:20, marginBottom:13, marginRight:20}}>
        <Text style={styles.questionText}>{this.props.text}</Text>
        </View>
    </LinearGradient> : null
    }
    </View>
  );
  }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10, 
        justifyContent: 'center', 
        flex:1, 
        borderRadius: 10, 
        marginHorizontal: 20,
    },
    questionTitle:{
        flex:10, 
        alignSelf:'flex-start',
        color: '#fff', 
        marginLeft: 15, 
        lineHeight: 15,
        padding: 5, 
        fontFamily: Fonts.MosseThai_Medium,
        fontSize: 15
    },
    questionText:{
        alignSelf:'flex-start',
        color: '#fff',
        lineHeight: 23,
        padding: 5,
        fontFamily: Fonts.MosseThai_Medium,
        fontSize: 15
    },
  });

