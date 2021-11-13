import faker from 'faker';

describe('register scenario', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('register with email address', () => {
    const email = faker.internet.email();

    cy.get('.logo').should('be.visible');
    cy.get('label').should('contain', 'Nomor handphone atau email')
    cy.get('input').type(email);
    cy.get('button')
      .contains('Daftar')
      .should('be.visible')
      .click();

    cy.get('.bl-card').should('be.visible');
    cy.get('.bl-modal__header').should('contain', 'Verifikasi Pendaftaran');
    cy.get('.mb-16').should('contain', 'Email kamu sudah benar?');
    cy.get('.bl-flex-item')
      .children('p')
      .contains(
        'Kode Rahasia akan dikirimkan ke ' + email + ' untuk proses verifikasi.'
      )
      .should('be.visible');
    cy.get('button')
      .contains('Bukan, ganti email')
      .should('be.visible');
    cy.get('button')
      .contains('Ya, kirim kode')
      .should('be.visible')
      .click();

    cy.get('.bl-card').should('be.visible');
    cy.get('.mb-16').should('contain', 'Masukkan Kode Rahasia yang diterima via email di:');
    cy.get('.bl-flex-item')
      .children('p')
      .contains(email)
      .should('be.visible');
    cy.get('label')
      .contains('Kode rahasia')
      .should('be.visible');
    cy.get('button')
      .should('be.disabled');
  });

  it('register with phone number', () => {
    const phone_number = '083' + faker.random
      .number({ min: 1000000, max: 9999999999 })
      .toString();

    cy.get('.logo').should('be.visible');
    cy.get('label').should('contain', 'Nomor handphone atau email')
    cy.get('input').type(phone_number);
    cy.get('button')
      .contains('Daftar')
      .should('be.visible')
      .click();

    cy.get('.bl-card').should('be.visible');
    cy.get('.bl-modal__header').should('contain', 'Verifikasi Pendaftaran');
    cy.get('.mb-16').should('contain', 'No. HP kamu sudah benar?');
    cy.get('button')
      .contains('Bukan, ganti nomor')
      .should('be.visible');
    cy.get('button')
      .contains('Ya, kirim kode')
      .should('be.visible')
      .click();

    cy.get('.bl-card').should('be.visible');
    cy.get('.mb-16').should('contain', 'Masukkan Kode Rahasia yang diterima via SMS di:');
    cy.get('label')
      .contains('Kode rahasia')
      .should('be.visible');
    cy.get('button')
      .should('be.disabled');
  });

  it('verify email and phone number validation', () => {
    cy.get('input').type(faker.internet.userName());
    cy.get('button')
      .contains('Daftar')
      .click();
    cy.get('.bl-text--error')
      .should('contain', 'Format nomor handphone atau email tidak sesuai.')
      .and('be.visible');

    cy.get('input')
      .clear()
      .should('be.empty');
    cy.get('input').type('12345678');
    cy.get('button')
      .contains('Daftar')
      .click();
    cy.get('.bl-text--error')
      .should('contain', 'Format nomor handphone atau email tidak sesuai.')
      .and('be.visible');
  });

  it('register with registered email', () => {
    cy.fixture('users').then(users => {
      const user = users;
      cy.get('input').type(user.email);
      cy.get('button')
        .contains('Daftar')
        .click();

      cy.get('.bl-card').should('be.visible');
      cy.get('.bl-modal__header').should('contain', 'Verifikasi Pendaftaran');
      cy.get('button')
        .contains('Ya, kirim kode')
        .should('be.visible')
        .click();

      cy.get('.mb-24').should('contain', 'Login');
      cy.get('.mb-8').should('contain', 'Akun sudah terdaftar');
      cy.get('.bl-text')
        .contains('Kamu bisa langsung login ke akun Bukalapak.')
        .should('be.visible');
      cy.get('.mb-8.bl-button')
        .should(
          'have.attr',
          'href',
          'https://accounts.bukalapak.com/login?username=diaselfatih%40gmail.com'
        ).and('be.visible');
      cy.get('button')
        .contains('Ganti email')
        .should('be.visible');
    });
  });

  it('register with registered phone number', () => {
    cy.fixture('users').then(users => {
      const user = users;
      cy.get('input').type(user.phone_number);
      cy.get('button')
        .contains('Daftar')
        .click();

      cy.get('.bl-card').should('be.visible');
      cy.get('.bl-modal__header').should('contain', 'Verifikasi Pendaftaran');
      cy.get('button')
        .contains('Ya, kirim kode')
        .should('be.visible')
        .click();

      cy.get('.mb-24').should('contain', 'Login');
      cy.get('.mb-8').should('contain', 'Akun sudah terdaftar');
      cy.get('.bl-text')
        .contains('Kamu bisa langsung login ke akun Bukalapak.')
        .should('be.visible');
      cy.get('.mb-8.bl-button')
        .should(
          'have.attr',
          'href',
          'https://accounts.bukalapak.com/login?username=081325184684'
        ).and('be.visible');
      cy.get('button')
        .contains('Ganti no. hp')
        .should('be.visible');
    });
  });
});
