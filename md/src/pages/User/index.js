import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {ActivityIndicator, View} from 'react-native';
import api from '../../services/api';
import {
  Container,
  Avatar,
  Name,
  Bio,
  Header,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loader,
  ContainerList,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    page: 0,
    refreshing: false,
    loading: false,
  };

  async componentDidMount() {
    this.loadData(1);
  }

  moreItens = () => {
    const {page} = this.state;
    this.loadData(page + 1);
  };

  onRefresh = () => {
    this.setState({
      stars: [],
      page: 1,
      refreshing: true,
      loading: false,
    });

    console.tron.log(this.state);
    this.loadData(1);
  };

  async loadData(nextPage) {
    if (nextPage === undefined) {
      this.nextPage = 1;
    }

    this.setState({loading: true});

    const {stars} = this.state;
    const {navigation} = this.props;

    const user = navigation.getParam('user');
    const response = await api.get(
      `/users/${user.login}/starred?page=${nextPage}`,
    );

    this.setState({
      stars: nextPage >= 2 ? [...stars, ...response.data] : response.data,
      page: nextPage,
      loading: false,
      refreshing: false,
    });
  }

  render() {
    const {navigation} = this.props;
    const {stars} = this.state;
    const {loading, refreshing} = this.state;
    const user = navigation.getParam('user');

    return (
      <>
        <Container>
          <Header>
            <Avatar source={{uri: user.avatar}} />
            <Name>{user.name}</Name>
            <Bio>{user.bio}</Bio>
          </Header>

          <Stars
            data={stars}
            scrollEnabled={!loading}
            onRefresh={this.onRefresh}
            refreshing={this.state.refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.moreItens}
            keyExtractor={star => String(star.id)}
            renderItem={({item}) => (
              <Starred loading={loading}>
                <OwnerAvatar source={{uri: item.owner.avatar_url}} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />

          {loading && !refreshing ? <Loader color="#7159c5" /> : <></>}
        </Container>
      </>
    );
  }
}
