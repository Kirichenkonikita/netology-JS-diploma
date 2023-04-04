/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    document.querySelector(`.sidebar-toggle`).addEventListener(`click`, event => {
      event.preventDefault();
      document.body.classList.toggle(`sidebar-open`);
      document.body.classList.toggle(`sidebar-collapse`);
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регистрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    // Войти
    document.querySelector(`.menu-item_login > a`).addEventListener(`click`, event => {
      event.preventDefault();
      App.getModal(`login`).open();
    });
    // Выйти
    document.querySelector(`.menu-item_logout > a`).addEventListener(`click`, event => {
      event.preventDefault();
      User.logout((error, response) => {
        if (response && response.success) {
          console.log(`inner`);
          App.setState('init');
        }
      })
    });
    // Регистрация
    document.querySelector(`.menu-item_register > a`).addEventListener(`click`, event => {
      event.preventDefault();
      App.getModal(`register`).open();
    })
  }
}