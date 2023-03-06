import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class Store {
  isHydrated = false;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "Store",
      properties: [],
      storage: AsyncStorage,
      stringify: true,
    })
      .then((e) => this.setIsHydrated(e.isHydrated))
      .catch((e) => console.warn(e));
  }

  setIsHydrated = (value: boolean) => (this.isHydrated = value);
}

export default new Store();
