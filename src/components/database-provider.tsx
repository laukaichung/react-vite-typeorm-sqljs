import {useAsync} from "react-use";
import {DataSource} from "typeorm";
import {Character} from "../entities/character";
import initSqlJs from "sql.js";
import localforage from "localforage";
import {createContext, FunctionComponent, PropsWithChildren, useContext} from "react";
import {defaultData} from "../data/default-data";
// @ts-ignore
import wasm from "sql.js/dist/sql-wasm.wasm?url";

//Reference: https://github.com/sql-js/react-sqljs-demo/blob/master/src/App.js

(window as any).localforage = localforage;

interface DatabaseContextProps {
  AppDataSource: DataSource;
}

const DatabaseContext = createContext<DatabaseContextProps>({
  AppDataSource: {} as DataSource,
});

let AppDataSource: DataSource;
export const DatabaseProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { value, loading } = useAsync(async () => {
    const SQL = await initSqlJs({
      locateFile: (file: string) => wasm,
    });
    AppDataSource = new DataSource({
      type: "sqljs",
      driver: SQL,
      autoSave: true,
      entities: [Character],
      location: "example_db",
      logging: ["query", "schema"],
      useLocalForage: true,
      synchronize: true,
    });
    try {
      await AppDataSource.initialize();
    } catch (e) {
      console.error(e);
    }
    const repo = AppDataSource.getRepository(Character);
    const existed = await repo.find();
    if (existed.length === 0) {
      // populate default data
      const defaultCharacters = defaultData.map(dc=>{
        const character = new Character();
        character.firstName = dc.firstName!
        character.lastName = dc.lastName!
        character.country = dc.country!;
        return character
      })
      await repo.save(defaultCharacters);
    }
    return AppDataSource;
  }, []);

  return (
    <DatabaseContext.Provider
      value={{
        AppDataSource: value!,
      }}
    >
      {!loading && children}
    </DatabaseContext.Provider>
  );
};

export const useAppDataSource = () => {
  const { AppDataSource } = useContext(DatabaseContext);
  return AppDataSource;
};

/**
 * Used outside the provider or in functions.
 */
export { AppDataSource };
