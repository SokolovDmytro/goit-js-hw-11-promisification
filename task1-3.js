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

// Перепиши функцию makeTransaction() так,
// чтобы она не использовала callback-функции onSuccess и onError,
// а принимала всего один параметр transaction и возвращала промис.

const randomIntegerFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// ! =============ИСХОДНАЯ ФУНКЦИЯ
// const makeTransaction = (transaction, onSuccess, onError) => {
//   const delay = randomIntegerFromInterval(200, 500);

//   setTimeout(() => {
//     const canProcess = Math.random() > 0.3;

//     if (canProcess) {
//       onSuccess(transaction.id, delay);
//     } else {
//       onError(transaction.id);
//     }
//   }, delay);
// };

//! =============НОВАЯ ФУНКЦИЯ
const makeTransaction = (transaction) => {
    const delay = randomIntegerFromInterval(200, 500);
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const canProcess = Math.random() > 0.3;

            if (canProcess) {
                resolve({
                    id: transaction.id,
                    time: delay
                });
            } else {
                reject(transaction.id);
            }
        }, delay);
    });
    return promise;
};

const logSuccess = ({
    id,
    time
}) => {
    console.log(`Transaction ${id} processed in ${time}ms`);
};

const logError = id => {
    console.warn(`Error processing transaction ${id}. Please try again later.`);
};

/*
 * Работает так
 */
// makeTransaction({ id: 70, amount: 150 }, logSuccess, logError);
// makeTransaction({ id: 71, amount: 230 }, logSuccess, logError);
// makeTransaction({ id: 72, amount: 75 }, logSuccess, logError);
// makeTransaction({ id: 73, amount: 100 }, logSuccess, logError);
/*
 * Должно работать так
 */
makeTransaction({
        id: 70,
        amount: 150
    })
    .then(logSuccess)
    .catch(logError);

makeTransaction({
        id: 71,
        amount: 230
    })
    .then(logSuccess)
    .catch(logError);

makeTransaction({
        id: 72,
        amount: 75
    })
    .then(logSuccess)
    .catch(logError);

makeTransaction({
        id: 73,
        amount: 100
    })
    .then(logSuccess)
    .catch(logError);