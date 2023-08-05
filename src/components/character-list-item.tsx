import * as React from "react";
import {FunctionComponent} from "react";
import {Character} from "../entities/character";
import {useAppDataSource} from "./database-provider";

interface Props{
  character: Character;
}
export const CharacterListItem: FunctionComponent<Props> = ({
  character,
}) => {
  const AppDataSource = useAppDataSource();
  return (
    <div style={{display: "flex", justifyContent: "space-around"}}>
      <div>{character.firstName} {character.lastName}</div>
      <div>{character.country}</div>
    </div>
  );
};
