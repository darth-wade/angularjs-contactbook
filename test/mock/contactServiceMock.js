var contactsServiceMock = {
  getContacts: function() {
    return [
      {
        id: 0,
        name: 'Mark',
        surname: 'Zuckerberg',
        phone: '+380937823428',
        group: 'Friends'
      },
      {
        id: 1,
        name: 'Larry',
        surname: 'Page',
        phone: '+380 (93) 782-34-28',
        group: 'Friends'
      },
      {
        id: 2,
        name: 'Sergey',
        surname: 'Brin',
        phone: '+1 123 234-43-43',
        group: 'Acquaintances'
      }
    ];
  }
};