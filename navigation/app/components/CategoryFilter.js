import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { theme } from '../../../helpers/styles';
import CategoryButton from './CategoryButton';
import Reactotron from 'reactotron-react-native';
import PropTypes from 'prop-types';

const categoryData = [
  {
    category: 'ofertas',
    label: 'Ofertas',
    image: require('../../../assets/category/icono-ofertas.png'),
    imageActive: require('../../../assets/category/icono-ofertas-hover.png')
  },
  {
    category: 'almacen',
    label: 'Almacen',
    image: require('../../../assets/category/icono-almacen.png'),
    imageActive: require('../../../assets/category/icono-almacen-hover.png')
  },
  {
    category: 'fiambres',
    label: 'Fiambres y Pastas',
    image: require('../../../assets/category/icono-fiambres-pastas.png'),
    imageActive: require('../../../assets/category/icono-fiambres-pastas-hover.png')
  },
  {
    category: 'congelados',
    label: 'Frescos y Congelados',
    image: require('../../../assets/category/icono-frescos-congelados.png'),
    imageActive: require('../../../assets/category/icono-frescos-congelados-hover.png')
  }
];

export default class CategoryFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: null
    };
  }

  _selectCategory = (category, label) => {
    this.props.onPress(category, label);
    this.setState({
      category: category
    });
  };

  render() {
    const selectedCategory = this.state.category;
    return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>¿QUE ESTAS BUSCANDO?</Text>
          {this.state.category && (
            <IconButton
              style={styles.filterNone}
              icon="close"
              color={'#AAAAAA'}
              size={moderateScale(22, 0.7)}
              onPress={() => this._selectCategory()}
            />
          )}
        </View>
        <View style={styles.categoryContainer}>
          {categoryData.map((category, index) => {
            return (
              <CategoryButton
                backgroundColor={'#FFF'}
                borderColor={'#AAA'}
                elevation={2}
                size={moderateScale(70, 0.7)}
                image={
                  selectedCategory === category.category
                    ? category.imageActive
                    : category.image
                }
                label={category.label}
                category={category.category}
                onPress={this._selectCategory}
                key={index}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    paddingVertical: '12@ms0.3',
    backgroundColor: '#EEE'
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '10@ms0.3'
  },
  title: {
    paddingHorizontal: '20@ms0.3',
    marginBottom: '10@ms0.3',
    fontSize: '16@ms0.3',
    color: 'grey'
  },
  filterNone: {
    margin: 0,
    marginRight: '12@ms0.3'
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

CategoryFilter.propTypes = {
  onPress: PropTypes.func.isRequired
};
