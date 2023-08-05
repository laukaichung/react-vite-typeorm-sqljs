import * as React from "react";
import { FunctionComponent } from "react";
import { Character } from "../entities/character";
import { CharacterListItem } from "../components/character-list-item";
import { useAppDataSource } from "../components/database-provider";
import {useAsync} from "react-use";

export const Component: FunctionComponent = () => {
  const AppDataSource = useAppDataSource();
  const { loading, value: characters } = useAsync(() => {
    return AppDataSource.getRepository(Character).find();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        {
            characters?.map((character) => {
            return (
                <CharacterListItem character={character} key={character.id} />
            );
          })
        }
    </div>
  );
};
