import styled from 'styled-components/native';
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Category from '../../models/Category';
import Colors from '../../constants/Colors';

interface Props {
  category: Category;
  onPress: Function;
  selectedCategory: number;
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
  const { category, onPress, selectedCategory } = props;

  const onPressHandler = useCallback(() => {
    onPress(category.id);
  }, [category, onPress]);

  return (
    <CategoryPostItemView>
      <TouchableOpacity activeOpacity={0.6} onPress={onPressHandler}>
        <CategoryPostItemText active={selectedCategory === category.id}>
          {category.value}
        </CategoryPostItemText>
      </TouchableOpacity>
    </CategoryPostItemView>
  );
};

export default CategoryPostItem;
