import { Platform, TouchableOpacity } from 'react-native';
import { Icon, NativeBase, View } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Title from '../atoms/text/Title';
import SearchInput from '../atoms/input/SearchInput';
import Post from '../../models/Post';

interface Props {
  items: Post[];
  onSearch: Function;
}

const HeaderContainer: React.FC<NativeBase.View> = styled(View)`
  padding-left: 20px;
  padding-right: 20px;
`;

const Content: React.FC<NativeBase.View> = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SearchHeader: React.FC<Props> = (props) => {
  const { items, onSearch } = props;
  const [isSearch, setIsSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const filterItems = useCallback(() => {
    const fixedText = searchValue.toLocaleLowerCase().trim();

    // eslint-disable-next-line max-len
    const filteredPost: Post[] = items.filter((post) => (
      post.title.toLocaleLowerCase().trim().includes(fixedText)
      || post.author.name.toLocaleLowerCase().trim().includes(fixedText)
      || post.author.lastname.toLocaleLowerCase().trim().includes(fixedText)
      || post.category.value.toLocaleLowerCase().trim().includes(fixedText)
      || post.author.username.includes(`${fixedText}`)
    )) as Post[];

    onSearch(filteredPost);
  }, [searchValue, onSearch, items]);

  const onPressHandler = useCallback(() => {
    setIsSearch((current) => !current);
  }, [setIsSearch]);

  const onInputTextChangeHandler = useCallback((text: string) => {
    setSearchValue(text);
  }, [setSearchValue]);

  useEffect(() => {
    filterItems();
  }, [searchValue]);

  useEffect(() => {
    filterItems();
  }, [items]);

  return (
    <HeaderContainer>
      {!isSearch && (
        <Content>
          <Title>{props.children}</Title>
          <TouchableOpacity activeOpacity={0.6} onPress={onPressHandler}>
            <Icon type="Ionicons" fontSize={20} name={Platform.OS === 'android' ? 'md-search' : 'ios-search'} />
          </TouchableOpacity>
        </Content>
      )}
      {isSearch && (
        <Content>
          <SearchInput label={props.children} onInputChange={onInputTextChangeHandler} />
          <TouchableOpacity activeOpacity={0.6} onPress={onPressHandler}>
            <Icon type="Ionicons" fontSize={20} name={Platform.OS === 'android' ? 'md-close' : 'ios-close'} />
          </TouchableOpacity>
        </Content>
      )}

    </HeaderContainer>
  );
};

export default SearchHeader;
