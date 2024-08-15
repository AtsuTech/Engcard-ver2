//このコンテキストはカテゴリを使うページで共用にしている。

import { createContext } from 'react';

//孫コンポーネントにコンテキストでカテゴリのデータ渡す
export const CategoryContext = createContext({});