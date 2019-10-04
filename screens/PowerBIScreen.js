import axios from 'axios';
import * as React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { connect } from 'react-redux';
// import PowerBIEmbed from 'react-native-powerbi';
import PowerBIEmbed from '../components/PowerBIEmbed';
import Constants from 'expo-constants';

class PowerBIScreen extends React.Component {
  componentDidMount() {
    let config = {};
    config['headers'] = {
      SecurityToken: this.props.token,
      UserToken: this.props.userToken,
    };
    this.setState({ isLoading: true });
    axios.get(`${Constants.manifest.extra.apiUrl}/api/powerbi/1.0/AccessToken`, config)
    .then(response => {
      const report = response.data;
      if (!report.IsSucceed) {
        this.setState({ errorMessage: report.ErrorMessage });
        return;
      }
      this.setState({
        errorMessage: null,
        accessToken: report.EmbedToken,
        embedUrl: report.EmbedUrl,
        id: report.ReportId,
        pageName: 'defaultPageName',
      });
    })
    .catch(err => {
      this.setState({ errorMessage: err.response.data.Description });
    })
    .finally(() => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    if (!this.state || this.state.isLoading) {
      return (<ActivityIndicator size="large" color="#0000ff" />);
    }

    const config = {
      type: 'report',
      tokenType: 1,
      accessToken: this.state.accessToken,
      embedUrl: this.state.embedUrl,
      id: this.state.id,
      pageName: this.state.pageName,
    }

    return (
      <View style={styles.container}>
        {
          this.state.errorMessage ? <Text style={styles.errorMsgText}>{this.state.errorMessage}</Text> : <PowerBIEmbed embedConfiguration={config} />
        }
      </View>
    )
  }
}

export default connect(
  (state) => ({
    token: state.auth.token,
    userToken: state.auth.userToken
  }),
  null
)(PowerBIScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  errorMsgText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
