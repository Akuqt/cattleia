import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {theme} from '../../../../utils';
import {Container, Txt, Header, HeaderBtn} from '../Elements';
import {DropDawnPicker} from '../../../../Components';

interface Props {
  handler: (a: {filter: string; type: string}) => void;
}

export const Filter: React.FC<Props> = ({handler}) => {
  const darkTheme = useSelector((state: RootState) => state.themeReducer.dark);
  const colors = darkTheme ? theme.dark : theme.light;
  const [filter, setFilter] = useState({
    filter: 'id',
    type: '0',
  });
  const handleChange = (prop: keyof typeof filter) => (value: string) => {
    setFilter({...filter, [prop]: value});
  };
  return (
    <Container
      direction="column"
      justify="center"
      align="center"
      pt="30px"
      full>
      <Header>
        <HeaderBtn
          margin="10px 0px 10px 20px"
          onPress={() => {
            handleChange('filter')('id');
            handleChange('type')('0');
            handler(filter);
          }}>
          <Txt color={colors.fontPrimary} fs="16px" bold>
            Clear
          </Txt>
        </HeaderBtn>
      </Header>
      <DropDawnPicker
        margin="0px"
        placeholder="Sort by"
        theme={colors}
        options={[
          {name: 'Price', value: 'price'},
          {name: 'Name', value: 'name'},
        ]}
        onChange={handleChange('filter')}
      />
      {filter.filter !== 'id' && (
        <DropDawnPicker
          margin="0px"
          placeholder={
            filter.filter.charAt(0).toUpperCase() + filter.filter.slice(1)
          }
          theme={colors}
          options={
            filter.filter === 'price'
              ? [
                  {name: 'Low to High', value: '1'},
                  {name: 'High to Low', value: '2'},
                ]
              : [
                  {name: 'Forward', value: '1'},
                  {name: 'Backward', value: '2'},
                ]
          }
          onChange={handleChange('type')}
        />
      )}

      <HeaderBtn
        margin="10px 0px 10px 20px"
        onPress={() => {
          handler(filter);
        }}>
        <Txt color={colors.fontPrimary} fs="14px" bold>
          Apply
        </Txt>
      </HeaderBtn>
    </Container>
  );
};
