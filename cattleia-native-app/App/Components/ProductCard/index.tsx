import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, Modal} from 'react-native';
import {ModalInfo} from '../ModalInfo';
import {Product} from './interfaces';
import {theme, icons} from '../../utils';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {
  Container,
  ImgPriceContainer,
  Img,
  PriceInfo,
  Price,
  Txt,
  InfoContainer,
} from './Elements';

export const ProductCard: React.FC<Product> = props => {
  const [show, setShow] = useState(false);
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  return (
    <Container onPress={() => props.handler()}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => {
          setShow(c => !c);
        }}>
        <ModalInfo show={setShow} info={props.description} />
      </Modal>
      <ImgPriceContainer>
        <Img source={{uri: 'asset:/images/base-3.png'}} />
      </ImgPriceContainer>
      <InfoContainer>
        <PriceInfo>
          <Txt colors={colors}>{props.name}</Txt>
          <Price style={{color: colors.fontPrimary}}>${props.price}</Price>
          <TouchableOpacity onPress={() => setShow(true)}>
            <Ionicons
              name={icons.information.filled}
              color={colors.secondary}
              size={20}
            />
          </TouchableOpacity>
        </PriceInfo>
      </InfoContainer>
    </Container>
  );
};
