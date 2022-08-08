import {observable, action, makeObservable, computed} from 'mobx';

class MainStore {
  @observable markers = ['', '', '', '', '', '', '', '', ''];
  @observable active_player = 'X';
  @observable user = '';

  constructor() {
    makeObservable(this);
  }
}

const store = new MainStore();

export default store;
