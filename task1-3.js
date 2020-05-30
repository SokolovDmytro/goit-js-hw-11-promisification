'use strict';

// ================task-01=====================

// Напиши функцию delay(ms),
// которая возвращает промис,
// переходящий в состояние "resolved" через ms миллисекунд.
// Значением исполнившегося промиса должно быть то кол-во миллисекунд
//  которое передали во время вызова функции delay.

const delay = ms => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms);
        }, ms);
    });
    return promise
};

const logger = time => console.log(`Resolved after ${time}ms`);

// Вызовы функции для проверки
delay(2000).then(logger); // Resolved after 2000ms
delay(1000).then(logger); // Resolved after 1000ms
delay(1500).then(logger); // Resolved after 1500ms

// ================task-02=====================

// Перепиши функцию toggleUserState() так,
// чтобы она не использовала callback-функцию callback,
// а принимала всего два параметра allUsers и userName и возвращала промис.

const users = [{
        name: 'Mango',
        active: true
    },
    {
        name: 'Poly',
        active: false
    },
    {
        name: 'Ajax',
        active: true
    },
    {
        name: 'Lux',
        active: false
    },
];

// before:
// const toggleUserState = (allUsers, userName, callback) => {
//   const updatedUsers = allUsers.map(user =>
//     user.name === userName ? { ...user, active: !user.active } : user,
//   );

//   callback(updatedUsers);
// };

// and now:
const toggleUserState = (allUsers, userName) => {
    const promise = new Promise((resolve, reject) => {
        const updatedUsers = allUsers.map(user =>
            user.name === userName ? {
                ...user,
                active: !user.active
            } : user,
        );
        resolve(updatedUsers);
    });
    return promise;
};

const logger1 = updatedUsers => console.table(updatedUsers);

/*
 * Сейчас работает так
 */
// toggleUserState(users, 'Mango', logger);
// toggleUserState(users, 'Lux', logger);

/*
 * Должно работать так
 */
toggleUserState(users, 'Mango').then(logger1);
toggleUserState(users, 'Lux').then(logger1);

// ================task-03=====================
