import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); // зашли на сайт
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки забыли пароль
          });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); // есть крестик и он виден пользователю
          });

    it('Верный пароль и верный логин', function () {
         cy.get(main_page.email).type(data.login); // ввели верный логин
         cy.get(main_page.password).type(data.password); // ввели верный пароль
         cy.get(main_page.login_button).click(); // нажать войти
         cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяю, что после авт. вижу текст
         cy.get(result_page.title).should('be.visible'); // текст виден пользователю
     })

     it('Проверка на восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // нажимаю восстановить пароль
        cy.get(recovery_password_page.email).type(data.login); // ввести почту для восстановления
        cy.get(recovery_password_page.send_button).click(); // нажать отправить код
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // проверяю на совпадение текст
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

     it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login); // ввели верный логин
        cy.get(main_page.password).type('iLoveqastudio7'); // ввели неверный пароль
        cy.get(main_page.login_button).click(); // нажать войти
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю,что после авт. вижу текст
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

    it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('geman@dolnikov.ru'); // ввели неверный логин
        cy.get(main_page.password).type(data.password); // ввели верный пароль
        cy.get(main_page.login_button).click(); // нажать войти
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю,что после авт. вижу текст
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

    it('Проверка, что в логине есть @', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // ввели логин без @
        cy.get(main_page.password).type(data.password); // ввели верный пароль
        cy.get(main_page.login_button).click(); // нажать войти
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // проверяю,что после авт. вижу текст
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

    it('Проверка на строчные буквы в логине', function () {
        cy.get(main_page.email).type('gerMandolnikov.ru'); // ввели логин с строчной буквой
        cy.get(main_page.password).type(data.password); // ввели верный пароль
        cy.get(main_page.login_button).click(); // нажать войти
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяю,что после авт. вижу текст
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })
 })
 