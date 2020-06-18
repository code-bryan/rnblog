import styled from 'styled-components/native';
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Category from '../../models/Category';
import Colors from '../../constants/Colors';

interface Props {
  category: Category;
  onPress: Function;
  active: boolean;
}

interface CategoryPostItemTextProps {
  active: boolean;
}

const CategoryPostItemView = styled.View`
  padding: 25px 20px;
`;

const CategoryPostItemText: React.FC<CategoryPostItemTextProps> = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${(props: CategoryPostItemTextProps) => (props.active ? Colors.primary : '#ccc')};
`;

const CategoryPostItem: React.FC<Props> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { category, onPress, active } = props;

  const onPressHandler = useCallback(() => {
    // eslint-disable-next-line react/prop-types
    onPress(category.id);
  }, [category, onPress]);

  return (
    <CategoryPostItemView>
      <TouchableOpacity activeOpacity={0.6} onPress={onPressHandler}>
        <CategoryPostItemText active={active}>
          {/* eslint-disable-next-line react/prop-types */}
          {category.value}
        </CategoryPostItemText>
      </TouchableOpacity>
    </CategoryPostItemView>
  );
};

export default CategoryPostItem;
