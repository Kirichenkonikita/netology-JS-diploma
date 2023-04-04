/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error(`Передан пустой элемент!`);  
    }

    this.element = element;
    this.update();
  }


  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createAccountButton = this.element.querySelector(`.create-account`);
    createAccountButton.onclick = event => {
      event.preventDefault();
      App.getModal(`createAccount`).open();
    }
    
    this.element.querySelectorAll(`.account`).forEach(accountElement => accountElement.onclick = event => {
      event.preventDefault();
      accountElement.classList.remove(`.active`);
      this.onSelectAccount(event.currentTarget);
    })

    this.element.querySelectorAll(`.active`).forEach(activeElement => activeElement.classList.remove(`active`));      
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const user = User.current();
    if (user) {
      Account.list(null,(error, response) => {
        if (response && response.success) {
          this.clear();
          response.data.forEach(account => this.renderItem(account));
          this.registerEvents();
        }
      })
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    this.element.querySelectorAll(`.account`).forEach(accountElement => accountElement.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    this.element.querySelectorAll(`.active`).forEach(activeElement => activeElement.classList.remove(`active`));      
    element.classList.add(`active`);
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return `<li class="active account" data-id="${item.id}">
                <a href="#">
                    <span>${item.name}</span>
                    <span>${item.sum}</span>
                </a>
            </li>`
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    this.element.insertAdjacentHTML(`beforeend`, this.getAccountHTML(data));
  }
}
