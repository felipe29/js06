import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';
import {Loading} from './styles';

export default class Main extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('item').name,
  });

  state = {
    loading: true,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  handleLoading = () => {
    console.tron.log('Start');
    this.setState({loading: true});
  };

  handleEndLoading = () => {
    console.tron.log('END');
    this.setState({loading: false});
  };

  render() {
    const {navigation} = this.props;
    const {loading} = this.state;
    const url = navigation.getParam('item').html_url;
    console.tron.log(url);
    return (
      <>
        {loading ? <Loading color="#8159c1" /> : <></>}
        <WebView
          onLoadStart={this.handleLoading}
          onLoadEnd={this.handleEndLoading}
          source={{uri: url}}
        />
      </>
    );
  }
}
