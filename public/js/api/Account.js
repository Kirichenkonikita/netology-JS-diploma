/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
/**
 * Получает информацию о счёте
 * */
class Account extends Entity {
  static URL = `/account`;
  
  static get(id = '', callback){
    createRequest({
      url: this.URL + `/${id}`,
      method: `GET`,
      callback,
    })
  }
}
